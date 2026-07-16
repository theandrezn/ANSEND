-- Ensure approved payments create durable download rights and license documents.

create table if not exists public.purchase_entitlements (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete cascade,
  order_item_id uuid references public.order_items(id) on delete cascade,
  beat_id uuid references public.beats(id) on delete cascade,
  license_id uuid references public.beat_licenses(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'revoked')),
  activated_at timestamptz not null default now(),
  revoked_at timestamptz,
  revocation_reason text,
  allowed_files text not null,
  download_limit integer,
  download_count integer not null default 0 check (download_count >= 0)
);

create table if not exists public.license_documents (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  producer_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  order_item_id uuid not null references public.order_items(id) on delete cascade,
  beat_id uuid references public.beats(id) on delete set null,
  license_id uuid references public.beat_licenses(id) on delete set null,
  contract_number text not null unique,
  contract_text text not null,
  contract_version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.download_logs (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete cascade,
  order_item_id uuid references public.order_items(id) on delete cascade,
  beat_id uuid references public.beats(id) on delete cascade,
  file_type text not null check (file_type in ('mp3', 'wav', 'stems')),
  ip_address text,
  user_agent text,
  success boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists purchase_entitlements_order_item_uidx
  on public.purchase_entitlements (order_item_id)
  where order_item_id is not null;
create unique index if not exists license_documents_order_item_uidx
  on public.license_documents (order_item_id);
create index if not exists purchase_entitlements_buyer_status_idx
  on public.purchase_entitlements (buyer_id, status);
create index if not exists purchase_entitlements_beat_idx
  on public.purchase_entitlements (beat_id);
create index if not exists license_documents_buyer_idx
  on public.license_documents (buyer_id);
create index if not exists license_documents_producer_idx
  on public.license_documents (producer_id);
create index if not exists download_logs_buyer_idx
  on public.download_logs (buyer_id);
create index if not exists download_logs_beat_idx
  on public.download_logs (beat_id);

alter table public.purchase_entitlements enable row level security;
alter table public.license_documents enable row level security;
alter table public.download_logs enable row level security;

drop policy if exists "Users can read own entitlements" on public.purchase_entitlements;
create policy "Users can read own entitlements"
on public.purchase_entitlements for select to authenticated
using (buyer_id = auth.uid());

drop policy if exists "Producers can read entitlements for their beats" on public.purchase_entitlements;
create policy "Producers can read entitlements for their beats"
on public.purchase_entitlements for select to authenticated
using (exists (
  select 1 from public.beats b where b.id = beat_id and b.user_id = auth.uid()
));

drop policy if exists "Buyers can read own license documents" on public.license_documents;
create policy "Buyers can read own license documents"
on public.license_documents for select to authenticated
using (buyer_id = auth.uid());

drop policy if exists "Producers can read own sold license documents" on public.license_documents;
create policy "Producers can read own sold license documents"
on public.license_documents for select to authenticated
using (producer_id = auth.uid());

drop policy if exists "Buyers can read own download logs" on public.download_logs;
create policy "Buyers can read own download logs"
on public.download_logs for select to authenticated
using (buyer_id = auth.uid());

grant select on public.purchase_entitlements to authenticated;
grant select on public.license_documents to authenticated;
grant select on public.download_logs to authenticated;

create or replace function public.generate_contract_text_sql(
  p_beat_title text,
  p_producer_name text,
  p_buyer_name text,
  p_license_name text,
  p_royalty_buyer numeric,
  p_royalty_producer numeric,
  p_stream_limit text,
  p_included_files text,
  p_date_string text,
  p_order_id uuid
) returns text
language plpgsql
set search_path = public
as $$
begin
  return 'CONTRATO DE LICENCA DE USO DE BEAT/PRODUCAO MUSICAL

Este contrato regula a licenca de exploracao comercial do Beat intitulado "' || p_beat_title || '", produzido por ' || p_producer_name || ', doravante denominado "PRODUTOR", adquirido por ' || p_buyer_name || ', doravante denominado "LICENCIADO", nas condicoes estabelecidas sob a licenca "' || p_license_name || '".

1. CONCESSAO E USO
1.1. O PRODUTOR concede ao LICENCIADO uma licenca de uso do Beat para fins de reproducao, distribuicao, apresentacoes ao vivo e monetizacao em plataformas de streaming e digitais.
1.2. Esta licenca e outorgada em carater ' || case when p_license_name ilike '%exclusive%' then 'EXCLUSIVO' else 'NAO EXCLUSIVO' end || '.

2. LIMITES E ROYALTIES
2.1. Royalties da Composicao/Master: As partes concordam com a divisao de royalties estabelecida em ' || p_royalty_buyer || '% para o LICENCIADO (Artista/Comprador) e ' || p_royalty_producer || '% para o PRODUTOR.
2.2. Streams Digitais: O limite de reproducoes acumuladas nas plataformas e de ' || p_stream_limit || '.
2.3. Videoclipes Oficiais: Fica permitida a gravacao e veiculacao de clipes promocionais/oficiais nas plataformas de compartilhamento de video.

3. ARQUIVOS ENTREGUES
O PRODUTOR entrega os arquivos: ' || p_included_files || '.

4. DECLARACAO DE ACEITE
O LICENCIADO declara ter lido, compreendido e aceitado todos os termos deste contrato em ' || p_date_string || '.

Identificador do Pedido: ' || p_order_id::text || '
Gerado eletronicamente na confirmacao do pagamento pela ANSEND.';
end;
$$;

create or replace function public.fulfill_completed_order(p_order_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_item record;
  v_contract_text text;
begin
  select * into v_order
  from public.orders
  where id = p_order_id and status = 'completed';

  if not found then return; end if;

  for v_item in
    select oi.id, oi.beat_id, oi.license_id, oi.license_name_snapshot,
           oi.files_included_snapshot, oi.buyer_royalty_snapshot,
           oi.producer_royalty_snapshot, b.user_id as producer_id,
           b.title as beat_title,
           coalesce(b.producer_name, p.artistic_name, p.full_name, 'Produtor ANSEND') as producer_name
    from public.order_items oi
    join public.beats b on b.id = oi.beat_id
    left join public.profiles p on p.id = b.user_id
    where oi.order_id = v_order.id
  loop
    insert into public.purchase_entitlements (
      buyer_id, order_id, order_item_id, beat_id, license_id, status, allowed_files
    ) values (
      v_order.buyer_id, v_order.id, v_item.id, v_item.beat_id, v_item.license_id,
      'active', v_item.files_included_snapshot
    )
    on conflict (order_item_id) where order_item_id is not null do update
    set status = 'active', revoked_at = null, revocation_reason = null,
        allowed_files = excluded.allowed_files;

    v_contract_text := public.generate_contract_text_sql(
      v_item.beat_title,
      v_item.producer_name,
      v_order.buyer_name,
      v_item.license_name_snapshot,
      coalesce(v_item.buyer_royalty_snapshot, 50),
      coalesce(v_item.producer_royalty_snapshot, 50),
      'Ilimitados',
      v_item.files_included_snapshot,
      to_char(v_order.created_at, 'DD/MM/YYYY'),
      v_order.id
    );

    insert into public.license_documents (
      buyer_id, producer_id, order_id, order_item_id, beat_id, license_id,
      contract_number, contract_text
    ) values (
      v_order.buyer_id, v_item.producer_id, v_order.id, v_item.id,
      v_item.beat_id, v_item.license_id,
      'CTR-' || to_char(v_order.created_at, 'YYYYMMDD') || '-' || substring(v_item.id::text from 1 for 8),
      v_contract_text
    )
    on conflict (order_item_id) do nothing;
  end loop;
end;
$$;

revoke execute on function public.fulfill_completed_order(uuid) from public, anon, authenticated;
grant execute on function public.fulfill_completed_order(uuid) to service_role;

create or replace function public.manage_purchase_entitlements()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'completed' and (tg_op = 'INSERT' or old.status <> 'completed') then
    perform public.fulfill_completed_order(new.id);
  elsif tg_op = 'UPDATE' and new.status = 'refunded' and old.status = 'completed' then
    update public.purchase_entitlements
    set status = 'revoked', revoked_at = now(), revocation_reason = 'Payment refunded'
    where order_id = new.id;
  end if;
  return new;
end;
$$;

create or replace function public.fulfill_purchase_after_order_item()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.fulfill_completed_order(new.order_id);
  return new;
end;
$$;

revoke execute on function public.manage_purchase_entitlements() from public, anon, authenticated;
revoke execute on function public.fulfill_purchase_after_order_item() from public, anon, authenticated;

drop trigger if exists manage_purchase_entitlements_trigger on public.orders;
create trigger manage_purchase_entitlements_trigger
after insert or update of status on public.orders
for each row execute function public.manage_purchase_entitlements();

drop trigger if exists fulfill_purchase_after_order_item_trigger on public.order_items;
create trigger fulfill_purchase_after_order_item_trigger
after insert on public.order_items
for each row execute function public.fulfill_purchase_after_order_item();

select public.fulfill_completed_order(id)
from public.orders
where status = 'completed';
