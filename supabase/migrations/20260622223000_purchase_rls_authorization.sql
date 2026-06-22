-- Phase 2 RLS and authorization hardening for purchase lifecycle.

drop policy if exists "Users can insert their own orders" on public.orders;
drop policy if exists "Users can insert their own order items" on public.order_items;

revoke insert, update, delete on public.orders from anon, authenticated;
revoke insert, update, delete on public.order_items from anon, authenticated;
revoke insert, update, delete on public.purchase_entitlements from anon, authenticated;
revoke insert, update, delete on public.license_documents from anon, authenticated;
revoke insert, update, delete on public.download_logs from anon, authenticated;

drop policy if exists "Users can read their own order items as buyer or seller" on public.order_items;
create policy "Users can read own purchased or sold order items"
on public.order_items for select to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and o.buyer_id = auth.uid()
  )
  or producer_id_snapshot = auth.uid()
);

drop policy if exists "Producers can read entitlements for their beats" on public.purchase_entitlements;
create policy "Producers can read entitlements for sold items"
on public.purchase_entitlements for select to authenticated
using (
  exists (
    select 1 from public.order_items oi
    where oi.id = order_item_id and oi.producer_id_snapshot = auth.uid()
  )
);

drop policy if exists "Producers can read own sold license documents" on public.license_documents;
create policy "Producers can read own sold license documents"
on public.license_documents for select to authenticated
using (producer_id = auth.uid());

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.purchase_entitlements enable row level security;
alter table public.license_documents enable row level security;
alter table public.download_logs enable row level security;

