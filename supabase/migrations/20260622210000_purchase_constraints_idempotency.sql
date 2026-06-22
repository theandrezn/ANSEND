-- Phase 2 purchase lifecycle foundation: snapshot columns and safe uniqueness for new rows.

alter table public.orders
  add column if not exists buyer_identity_snapshot jsonb not null default '{}'::jsonb,
  add column if not exists completed_at timestamptz;

alter table public.order_items
  add column if not exists beat_title_snapshot text,
  add column if not exists beat_cover_url_snapshot text,
  add column if not exists producer_id_snapshot uuid,
  add column if not exists producer_name_snapshot text,
  add column if not exists license_key_snapshot text,
  add column if not exists currency_snapshot text not null default 'BRL',
  add column if not exists license_rights_snapshot jsonb not null default '{}'::jsonb,
  add column if not exists file_manifest_snapshot jsonb not null default '{}'::jsonb;

alter table public.purchase_entitlements
  add column if not exists phase2_enforce_unique boolean not null default false,
  add column if not exists source text not null default 'legacy';

alter table public.license_documents
  add column if not exists phase2_enforce_unique boolean not null default false,
  add column if not exists source text not null default 'legacy';

alter table public.purchase_entitlements
  alter column phase2_enforce_unique set default true,
  alter column source set default 'phase2';

alter table public.license_documents
  alter column phase2_enforce_unique set default true,
  alter column source set default 'phase2';

create unique index if not exists purchase_entitlements_order_item_phase2_unique
on public.purchase_entitlements (order_item_id)
where order_item_id is not null and phase2_enforce_unique is true;

create unique index if not exists license_documents_order_item_phase2_unique
on public.license_documents (order_item_id)
where order_item_id is not null and phase2_enforce_unique is true;

create unique index if not exists payment_attempts_provider_payment_phase2_unique
on public.payment_attempts (provider, provider_payment_id)
where provider_payment_id is not null;

create index if not exists order_items_order_created_phase2_idx
on public.order_items (order_id, created_at);

create index if not exists purchase_entitlements_order_item_status_phase2_idx
on public.purchase_entitlements (order_item_id, status);

