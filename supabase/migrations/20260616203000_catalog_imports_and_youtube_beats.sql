alter table public.beats add column if not exists source_type text not null default 'upload' check (source_type in ('upload', 'youtube'));
alter table public.beats add column if not exists catalog_batch_id uuid null;
alter table public.beats add column if not exists import_source text null;
alter table public.beats add column if not exists import_status text null;
alter table public.beats add column if not exists original_file_name text null;
alter table public.beats add column if not exists sort_order integer null;
alter table public.beats add column if not exists youtube_url text null;
alter table public.beats add column if not exists youtube_video_id text null;
alter table public.beats add column if not exists youtube_embed_url text null;
alter table public.beats add column if not exists youtube_thumbnail_url text null;
alter table public.beats add column if not exists youtube_title text null;
alter table public.beats add column if not exists youtube_channel_title text null;

create table if not exists public.catalog_import_batches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Catalogo de beats',
  source_mode text not null check (source_mode in ('multi_upload', 'youtube_links')),
  total_items integer not null default 0,
  valid_items integer not null default 0,
  failed_items integer not null default 0,
  published_items integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'processing', 'partial', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalog_import_batches enable row level security;

drop trigger if exists catalog_import_batches_set_updated_at on public.catalog_import_batches;
create trigger catalog_import_batches_set_updated_at
before update on public.catalog_import_batches
for each row execute function public.set_updated_at();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'beats_catalog_batch_id_fkey'
      and conrelid = 'public.beats'::regclass
  ) then
    alter table public.beats
      add constraint beats_catalog_batch_id_fkey
      foreign key (catalog_batch_id)
      references public.catalog_import_batches(id)
      on delete set null;
  end if;
end;
$$;

create index if not exists beats_catalog_batch_idx on public.beats (catalog_batch_id);
create index if not exists beats_source_type_idx on public.beats (source_type);
create index if not exists beats_user_youtube_idx on public.beats (user_id, youtube_video_id) where youtube_video_id is not null;
create index if not exists catalog_import_batches_user_created_idx on public.catalog_import_batches (user_id, created_at desc);

drop policy if exists "Users can read own catalog import batches" on public.catalog_import_batches;
create policy "Users can read own catalog import batches"
on public.catalog_import_batches for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create own catalog import batches" on public.catalog_import_batches;
create policy "Users can create own catalog import batches"
on public.catalog_import_batches for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own catalog import batches" on public.catalog_import_batches;
create policy "Users can update own catalog import batches"
on public.catalog_import_batches for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own catalog import batches" on public.catalog_import_batches;
create policy "Users can delete own catalog import batches"
on public.catalog_import_batches for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.catalog_import_batches to authenticated;
