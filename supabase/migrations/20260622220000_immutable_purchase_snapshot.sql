-- Phase 2 immutable snapshot guardrails.

alter table public.order_items
  add constraint order_items_rights_snapshot_object_phase2
  check (jsonb_typeof(license_rights_snapshot) = 'object') not valid;

alter table public.order_items
  add constraint order_items_file_manifest_object_phase2
  check (jsonb_typeof(file_manifest_snapshot) = 'object') not valid;

create index if not exists order_items_producer_snapshot_phase2_idx
on public.order_items (producer_id_snapshot, created_at desc)
where producer_id_snapshot is not null;

