-- Authoritative checkout, coupons, provider reconciliation and seller receivables.

alter table public.orders add column if not exists subtotal_cents integer not null default 0 check (subtotal_cents >= 0);
alter table public.orders add column if not exists discount_cents integer not null default 0 check (discount_cents >= 0);
alter table public.orders add column if not exists service_fee_cents integer not null default 0 check (service_fee_cents >= 0);
alter table public.orders add column if not exists payment_provider text;
alter table public.orders add column if not exists payment_method text;
alter table public.orders add column if not exists provider_payment_id text;
create unique index if not exists orders_provider_payment_unique
on public.orders (payment_provider, provider_payment_id)
where provider_payment_id is not null;

create table if not exists public.checkout_coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code = upper(code) and length(code) between 3 and 40),
  seller_id uuid references auth.users(id) on delete cascade,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  discount_value integer not null check (discount_value > 0),
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions integer check (max_redemptions is null or max_redemptions > 0),
  per_user_limit integer not null default 1 check (per_user_limit > 0),
  redemption_count integer not null default 0 check (redemption_count >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint checkout_coupons_window check (ends_at is null or starts_at is null or ends_at > starts_at),
  constraint checkout_coupon_percent check (discount_type <> 'percent' or discount_value <= 100)
);

alter table public.checkout_coupons enable row level security;
drop policy if exists "Active coupons are not publicly enumerable" on public.checkout_coupons;
create policy "Active coupons are not publicly enumerable"
on public.checkout_coupons for select to authenticated
using (false);

create table if not exists public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  buyer_name text not null,
  buyer_email text not null,
  provider text not null default 'mercado_pago' check (provider in ('mercado_pago')),
  method text not null check (method in ('pix', 'card')),
  provider_payment_id text,
  external_reference text not null unique,
  idempotency_key text not null unique,
  cart_fingerprint text not null,
  cart_items jsonb not null check (jsonb_typeof(cart_items) = 'array'),
  coupon_id uuid references public.checkout_coupons(id) on delete set null,
  subtotal_cents integer not null check (subtotal_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  service_fee_cents integer not null default 0 check (service_fee_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  status text not null default 'created' check (status in ('created', 'pending', 'in_process', 'approved', 'rejected', 'cancelled', 'expired', 'refunded')),
  status_detail text,
  order_id uuid references public.orders(id) on delete set null,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payment_attempts_provider_payment_unique
on public.payment_attempts (provider, provider_payment_id)
where provider_payment_id is not null;
create index if not exists payment_attempts_buyer_created_idx on public.payment_attempts (buyer_id, created_at desc);
create index if not exists payment_attempts_status_idx on public.payment_attempts (status, updated_at desc);
alter table public.payment_attempts enable row level security;
drop policy if exists "Buyers can read own payment attempts" on public.payment_attempts;
create policy "Buyers can read own payment attempts"
on public.payment_attempts for select to authenticated
using (buyer_id = auth.uid());

create table if not exists public.coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references public.checkout_coupons(id) on delete restrict,
  buyer_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  discount_cents integer not null check (discount_cents >= 0),
  created_at timestamptz not null default now(),
  unique (coupon_id, order_id)
);
create index if not exists coupon_redemptions_user_idx on public.coupon_redemptions (coupon_id, buyer_id);
alter table public.coupon_redemptions enable row level security;
drop policy if exists "Buyers can read own coupon redemptions" on public.coupon_redemptions;
create policy "Buyers can read own coupon redemptions"
on public.coupon_redemptions for select to authenticated
using (buyer_id = auth.uid());

create table if not exists public.seller_ledger_entries (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references auth.users(id) on delete restrict,
  order_id uuid not null references public.orders(id) on delete cascade,
  order_item_id uuid references public.order_items(id) on delete cascade,
  gross_cents integer not null check (gross_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  net_cents integer not null check (net_cents >= 0),
  status text not null default 'available' check (status in ('pending', 'available', 'paid', 'reversed')),
  available_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (order_id, order_item_id)
);
create index if not exists seller_ledger_seller_idx on public.seller_ledger_entries (seller_id, status, created_at desc);
alter table public.seller_ledger_entries enable row level security;
drop policy if exists "Sellers can read own ledger" on public.seller_ledger_entries;
create policy "Sellers can read own ledger"
on public.seller_ledger_entries for select to authenticated
using (seller_id = auth.uid());

create or replace function public.finalize_checkout_payment(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt public.payment_attempts%rowtype;
  v_checkout_items jsonb;
  v_checkout_result jsonb;
  v_order_id uuid;
  v_item jsonb;
  v_order_item_id uuid;
  v_seller_id uuid;
  v_gross integer;
  v_discount integer;
begin
  select * into v_attempt
  from public.payment_attempts
  where id = p_attempt_id
  for update;

  if not found then raise exception 'Tentativa de pagamento nao encontrada.'; end if;
  if v_attempt.order_id is not null then
    return jsonb_build_object('order_id', v_attempt.order_id, 'status', 'completed', 'idempotent', true);
  end if;
  if v_attempt.status <> 'approved' then raise exception 'Pagamento ainda nao aprovado.'; end if;

  select jsonb_agg(jsonb_build_object('beat_id', value->>'beat_id', 'license_id', value->>'license_id'))
  into v_checkout_items
  from jsonb_array_elements(v_attempt.cart_items);

  v_checkout_result := public.process_checkout(v_attempt.buyer_id, v_attempt.buyer_name, v_attempt.buyer_email, v_checkout_items);
  v_order_id := (v_checkout_result->>'order_id')::uuid;

  update public.orders
  set subtotal_cents = v_attempt.subtotal_cents,
      discount_cents = v_attempt.discount_cents,
      service_fee_cents = v_attempt.service_fee_cents,
      total_cents = v_attempt.total_cents,
      payment_provider = v_attempt.provider,
      payment_method = v_attempt.method,
      provider_payment_id = v_attempt.provider_payment_id,
      status = 'completed'
  where id = v_order_id;

  for v_item in select * from jsonb_array_elements(v_attempt.cart_items) loop
    select oi.id, b.user_id into v_order_item_id, v_seller_id
    from public.order_items oi
    join public.beats b on b.id = oi.beat_id
    where oi.order_id = v_order_id and oi.beat_id = (v_item->>'beat_id')::uuid
    order by oi.created_at desc limit 1;
    v_gross := greatest(0, coalesce((v_item->>'price_cents')::integer, 0));
    v_discount := least(v_gross, greatest(0, coalesce((v_item->>'discount_cents')::integer, 0)));
    insert into public.seller_ledger_entries (seller_id, order_id, order_item_id, gross_cents, discount_cents, net_cents)
    values (v_seller_id, v_order_id, v_order_item_id, v_gross, v_discount, v_gross - v_discount)
    on conflict (order_id, order_item_id) do nothing;
  end loop;

  if v_attempt.coupon_id is not null then
    insert into public.coupon_redemptions (coupon_id, buyer_id, order_id, discount_cents)
    values (v_attempt.coupon_id, v_attempt.buyer_id, v_order_id, v_attempt.discount_cents)
    on conflict (coupon_id, order_id) do nothing;
    update public.checkout_coupons set redemption_count = redemption_count + 1, updated_at = now()
    where id = v_attempt.coupon_id;
  end if;

  update public.payment_attempts set order_id = v_order_id, updated_at = now() where id = p_attempt_id;
  return jsonb_build_object('order_id', v_order_id, 'status', 'completed', 'idempotent', false);
end;
$$;

revoke execute on function public.process_checkout(uuid, text, text, jsonb) from public, anon, authenticated;
revoke execute on function public.finalize_checkout_payment(uuid) from public, anon, authenticated;
grant execute on function public.finalize_checkout_payment(uuid) to service_role;
