-- 1. Create beat_licenses table
create table if not exists public.beat_licenses (
  id uuid primary key default gen_random_uuid(),
  beat_id uuid not null references public.beats(id) on delete cascade,
  license_key text not null, -- 'basic', 'premium', 'exclusive', or custom string
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'BRL',
  is_default boolean not null default false,
  is_custom boolean not null default false,
  is_active boolean not null default true,
  is_exclusive boolean not null default false,
  included_mp3 boolean not null default false,
  included_wav boolean not null default false,
  included_stems boolean not null default false,
  buyer_royalty_percentage numeric not null check (buyer_royalty_percentage between 0 and 100),
  producer_royalty_percentage numeric not null check (producer_royalty_percentage between 0 and 100),
  stream_limit integer,
  unlimited_streams boolean not null default false,
  music_video_limit integer,
  unlimited_music_videos boolean not null default false,
  commercial_use boolean not null default true,
  monetization_allowed boolean not null default true,
  live_performance_allowed boolean not null default true,
  content_id_allowed boolean not null default false,
  credit_required boolean not null default true,
  credit_text text,
  duration text default 'lifetime',
  territory text default 'worldwide',
  custom_terms text,
  sort_order integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint royalty_sum_check check (buyer_royalty_percentage + producer_royalty_percentage = 100)
);

-- 2. Add columns to public.beats table
alter table public.beats add column if not exists sold_exclusively boolean not null default false;
alter table public.beats add column if not exists exclusive_buyer_id uuid references auth.users(id) on delete set null;
alter table public.beats add column if not exists mp3_url text;
alter table public.beats add column if not exists mp3_path text;
alter table public.beats add column if not exists wav_url text;
alter table public.beats add column if not exists wav_path text;

-- Update SELECT policy on beats to allow reading sold beats
drop policy if exists "Published or owned beats are readable" on public.beats;
create policy "Published or owned beats are readable"
on public.beats
for select
to anon, authenticated
using (
  ((status = 'published' or status = 'sold') and is_public is true)
  or (select auth.uid()) = user_id
);

-- Enable RLS on beat_licenses
alter table public.beat_licenses enable row level security;

-- Policies for beat_licenses
create policy "Beat licenses are readable by anyone if active, or owner if not"
on public.beat_licenses
for select
using (
  is_active is true
  or (select user_id from public.beats where id = beat_id) = auth.uid()
);

create policy "Users can manage own beat licenses"
on public.beat_licenses
for all
to authenticated
using ((select user_id from public.beats where id = beat_id) = auth.uid())
with check ((select user_id from public.beats where id = beat_id) = auth.uid());

-- Trigger for beat_licenses updated_at
drop trigger if exists beat_licenses_set_updated_at on public.beat_licenses;
create trigger beat_licenses_set_updated_at
before update on public.beat_licenses
for each row execute function public.set_updated_at();

-- 3. Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references auth.users(id) on delete set null,
  total_cents integer not null check (total_cents >= 0),
  status text not null default 'completed' check (status in ('pending', 'completed', 'refunded')),
  buyer_name text not null,
  buyer_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS on orders
alter table public.orders enable row level security;

-- Policies for orders
create policy "Users can read their own orders"
on public.orders
for select
to authenticated
using (buyer_id = auth.uid());

create policy "Users can insert their own orders"
on public.orders
for insert
to authenticated
with check (buyer_id = auth.uid());

-- Trigger for orders updated_at
drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- 4. Create order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  beat_id uuid references public.beats(id) on delete set null,
  license_id uuid references public.beat_licenses(id) on delete set null,
  license_name_snapshot text not null,
  license_terms_snapshot text,
  price_cents_snapshot integer not null,
  buyer_royalty_snapshot numeric,
  producer_royalty_snapshot numeric,
  files_included_snapshot text not null,
  accepted_contract_at timestamptz not null default now(),
  accepted_contract_version text not null default '1.0',
  created_at timestamptz not null default now()
);

-- Enable RLS on order_items
alter table public.order_items enable row level security;

-- Policies for order_items
create policy "Users can read their own order items as buyer or seller"
on public.order_items
for select
to authenticated
using (
  (select buyer_id from public.orders where id = order_id) = auth.uid()
  or (select user_id from public.beats where id = beat_id) = auth.uid()
);

create policy "Users can insert their own order items"
on public.order_items
for insert
to authenticated
with check (
  (select buyer_id from public.orders where id = order_id) = auth.uid()
);

-- 5. Create storage bucket for secure beat files
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'beat-secure-files',
  'beat-secure-files',
  false,
  524288000,
  array['audio/mpeg', 'audio/wav', 'audio/x-wav', 'application/zip', 'application/x-zip-compressed']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Storage policies for beat-secure-files
drop policy if exists "Users can upload their own secure files" on storage.objects;
create policy "Users can upload their own secure files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can update their own secure files" on storage.objects;
create policy "Users can update their own secure files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
)
with check (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can delete their own secure files" on storage.objects;
create policy "Users can delete their own secure files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can read their own secure files" on storage.objects;
create policy "Users can read their own secure files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (
    (storage.foldername(name))[1] = (auth.uid())::text
    -- Or they bought the beat
    or exists (
      select 1 
      from public.order_items oi
      join public.orders o on o.id = oi.order_id
      where oi.beat_id = ((storage.foldername(name))[3])::uuid -- folder format is {user_id}/beat-secure-files/{beat_id}/{file}
      and o.buyer_id = auth.uid()
      and o.status = 'completed'
    )
  )
);

-- 6. RPC function to process checkout securely and concurrent-safe
create or replace function public.process_checkout(
  p_buyer_id uuid,
  p_buyer_name text,
  p_buyer_email text,
  p_cart_items jsonb -- array of {"beat_id": "...", "license_id": "..."}
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_item jsonb;
  v_beat_id uuid;
  v_license_id uuid;
  v_beat_status text;
  v_sold_exclusively boolean;
  v_title text;
  v_total_cents integer := 0;
  v_license_name text;
  v_license_desc text;
  v_license_price_cents integer;
  v_is_exclusive boolean;
  v_buyer_royalty numeric;
  v_producer_royalty numeric;
  v_included_mp3 boolean;
  v_included_wav boolean;
  v_included_stems boolean;
  v_files_snapshot text;
  v_custom_terms text;
begin
  -- First lock all beats involved in the order to prevent concurrent updates or race conditions
  perform id, status, sold_exclusively, title
  from public.beats
  where id in (
    select (value->>'beat_id')::uuid
    from jsonb_array_elements(p_cart_items)
  )
  for update;

  -- Validate each item and sum the total cost
  for v_item in select * from jsonb_array_elements(p_cart_items) loop
    v_beat_id := (v_item->>'beat_id')::uuid;
    v_license_id := (v_item->>'license_id')::uuid;

    select status, sold_exclusively, title
    into v_beat_status, v_sold_exclusively, v_title
    from public.beats
    where id = v_beat_id;

    if not found then
      raise exception 'Beat % nao encontrado.', v_beat_id;
    end if;

    if v_sold_exclusively then
      raise exception 'O beat "%" ja foi vendido exclusivamente.', v_title;
    end if;

    if v_beat_status <> 'published' then
      raise exception 'O beat "%" nao esta mais disponivel para venda.', v_title;
    end if;

    select name, description, price_cents, is_exclusive, buyer_royalty_percentage, producer_royalty_percentage, included_mp3, included_wav, included_stems, custom_terms
    into v_license_name, v_license_desc, v_license_price_cents, v_is_exclusive, v_buyer_royalty, v_producer_royalty, v_included_mp3, v_included_wav, v_included_stems, v_custom_terms
    from public.beat_licenses
    where id = v_license_id and beat_id = v_beat_id and is_active = true;

    if not found then
      raise exception 'Licenca % nao encontrada ou inativa para o beat "%".', v_license_id, v_title;
    end if;

    v_total_cents := v_total_cents + v_license_price_cents;
  end loop;

  -- Insert order record
  insert into public.orders (buyer_id, total_cents, status, buyer_name, buyer_email)
  values (p_buyer_id, v_total_cents, 'completed', p_buyer_name, p_buyer_email)
  returning id into v_order_id;

  -- Insert order items and process exclusive sales
  for v_item in select * from jsonb_array_elements(p_cart_items) loop
    v_beat_id := (v_item->>'beat_id')::uuid;
    v_license_id := (v_item->>'license_id')::uuid;

    select name, description, price_cents, is_exclusive, buyer_royalty_percentage, producer_royalty_percentage, included_mp3, included_wav, included_stems, custom_terms
    into v_license_name, v_license_desc, v_license_price_cents, v_is_exclusive, v_buyer_royalty, v_producer_royalty, v_included_mp3, v_included_wav, v_included_stems, v_custom_terms
    from public.beat_licenses
    where id = v_license_id;

    v_files_snapshot := concat_ws(', ', 
      case when v_included_mp3 then 'MP3' end,
      case when v_included_wav then 'WAV' end,
      case when v_included_stems then 'Stems' end
    );

    -- Insert order item
    insert into public.order_items (
      order_id, beat_id, license_id, license_name_snapshot, license_terms_snapshot,
      price_cents_snapshot, buyer_royalty_snapshot, producer_royalty_snapshot, files_included_snapshot
    )
    values (
      v_order_id, v_beat_id, v_license_id, v_license_name, coalesce(v_custom_terms, v_license_desc),
      v_license_price_cents, v_buyer_royalty, v_producer_royalty, v_files_snapshot
    );

    -- If this is an exclusive license purchase, execute exclusive logic
    if v_is_exclusive then
      update public.beats
      set sold_exclusively = true,
          exclusive_buyer_id = p_buyer_id,
          status = 'sold'
      where id = v_beat_id;

      -- Deactivate all licenses for this beat so no one can purchase it anymore
      update public.beat_licenses
      set is_active = false
      where beat_id = v_beat_id;
    end if;
  end loop;

  return jsonb_build_object(
    'order_id', v_order_id,
    'total_cents', v_total_cents,
    'status', 'completed'
  );
end;
$$;

revoke execute on function public.process_checkout(uuid, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.process_checkout(uuid, text, text, jsonb) to authenticated;
