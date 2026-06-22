-- Phase 2 diagnostics. Read-only queries; do not run as a mutation script.

-- Objects and ownership.
select tgname, tgrelid::regclass as table_name, tgenabled
from pg_trigger
where tgname = 'manage_purchase_entitlements_trigger';

select proname, pg_get_functiondef(oid)
from pg_proc
where proname in (
  'process_checkout',
  'finalize_checkout_payment',
  'provision_purchase_delivery',
  'manage_purchase_entitlements',
  'backfill_purchase_delivery'
);

select schemaname, tablename, policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in ('orders', 'order_items', 'payment_attempts', 'purchase_entitlements', 'license_documents', 'download_logs');

-- Paid/completed orders without complete delivery.
select
  o.id as order_id,
  count(distinct oi.id) as item_count,
  count(distinct pe.id) filter (where pe.status = 'active') as active_entitlement_count,
  count(distinct ld.id) as document_count
from public.orders o
left join public.order_items oi on oi.order_id = o.id
left join public.purchase_entitlements pe on pe.order_item_id = oi.id
left join public.license_documents ld on ld.order_item_id = oi.id
where o.status = 'completed'
group by o.id
having count(distinct oi.id) = 0
   or count(distinct pe.id) filter (where pe.status = 'active') <> count(distinct oi.id)
   or count(distinct ld.id) <> count(distinct oi.id);

-- Duplicate delivery candidates.
select order_item_id, count(*) as active_entitlements
from public.purchase_entitlements
where order_item_id is not null and status = 'active'
group by order_item_id
having count(*) > 1;

select order_item_id, count(*) as documents
from public.license_documents
where order_item_id is not null
group by order_item_id
having count(*) > 1;

-- Snapshot completeness for completed orders.
select oi.id as order_item_id, oi.order_id
from public.order_items oi
join public.orders o on o.id = oi.order_id
where o.status = 'completed'
  and (
    oi.beat_title_snapshot is null
    or oi.producer_id_snapshot is null
    or oi.producer_name_snapshot is null
    or oi.license_key_snapshot is null
    or oi.currency_snapshot is null
    or oi.license_rights_snapshot = '{}'::jsonb
    or oi.file_manifest_snapshot = '{}'::jsonb
  );

-- Dry-run backfill summary.
select public.backfill_purchase_delivery(false);

