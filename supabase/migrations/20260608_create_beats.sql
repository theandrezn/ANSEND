create table if not exists public.beats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  producer_name text,
  genre text not null,
  subgenre text,
  bpm integer check (bpm is null or bpm between 40 and 240),
  musical_key text,
  mood text,
  tags text[] not null default '{}',
  description text,
  already_released boolean default false,
  license_type text not null default 'basic' check (license_type in ('basic', 'premium', 'exclusive', 'free')),
  price numeric(10,2) check (price is null or price >= 0),
  allow_tagged_download boolean default false,
  allow_commercial_use boolean default false,
  max_sales integer,
  license_terms text,
  delivery_mp3 boolean default false,
  delivery_wav boolean default false,
  delivery_stems boolean default false,
  delivery_contract boolean default false,
  delivery_notes text,
  cover_url text,
  cover_path text,
  audio_url text,
  audio_path text,
  stems_url text,
  stems_path text,
  duration_seconds numeric,
  file_size numeric,
  status text not null default 'draft' check (status in ('draft', 'published', 'sold', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

-- Enable RLS
alter table public.beats enable row level security;

-- Index definitions
create index if not exists beats_user_created_idx on public.beats (user_id, created_at desc);
create index if not exists beats_status_created_idx on public.beats (status, created_at desc);

-- Trigger for updated_at
drop trigger if exists beats_set_updated_at on public.beats;
create trigger beats_set_updated_at
before update on public.beats
for each row execute function public.set_updated_at();

-- Policies
-- SELECT: published beats are public
drop policy if exists "Published beats are public" on public.beats;
create policy "Published beats are public"
on public.beats
for select
to anon, authenticated
using (status = 'published');

-- SELECT: users can read their own beats (including drafts)
drop policy if exists "Users can read their own beats" on public.beats;
create policy "Users can read their own beats"
on public.beats
for select
to authenticated
using ((select auth.uid()) = user_id);

-- INSERT: users can insert their own beats
drop policy if exists "Users can insert their own beats" on public.beats;
create policy "Users can insert their own beats"
on public.beats
for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- UPDATE: users can update their own beats
drop policy if exists "Users can update their own beats" on public.beats;
create policy "Users can update their own beats"
on public.beats
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- DELETE: users can delete their own beats
drop policy if exists "Users can delete their own beats" on public.beats;
create policy "Users can delete their own beats"
on public.beats
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Grants
grant select on public.beats to anon;
grant select, insert, update, delete on public.beats to authenticated;

-- Storage buckets setup
insert into storage.buckets (id, name, public)
values 
  ('beat-covers', 'beat-covers', true),
  ('beat-audio', 'beat-audio', true),
  ('beat-stems', 'beat-stems', false)
on conflict (id) do nothing;

-- Policies for beat-covers
drop policy if exists "Public Access Covers" on storage.objects;
create policy "Public Access Covers" on storage.objects for select using (bucket_id = 'beat-covers');

drop policy if exists "Users can upload their own covers" on storage.objects;
create policy "Users can upload their own covers" on storage.objects for insert to authenticated with check (bucket_id = 'beat-covers' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can update their own covers" on storage.objects;
create policy "Users can update their own covers" on storage.objects for update to authenticated using (bucket_id = 'beat-covers' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can delete their own covers" on storage.objects;
create policy "Users can delete their own covers" on storage.objects for delete to authenticated using (bucket_id = 'beat-covers' and (storage.foldername(name))[1] = auth.uid()::text);

-- Policies for beat-audio
drop policy if exists "Public Access Audio" on storage.objects;
create policy "Public Access Audio" on storage.objects for select using (bucket_id = 'beat-audio');

drop policy if exists "Users can upload their own audio" on storage.objects;
create policy "Users can upload their own audio" on storage.objects for insert to authenticated with check (bucket_id = 'beat-audio' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can update their own audio" on storage.objects;
create policy "Users can update their own audio" on storage.objects for update to authenticated using (bucket_id = 'beat-audio' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can delete their own audio" on storage.objects;
create policy "Users can delete their own audio" on storage.objects for delete to authenticated using (bucket_id = 'beat-audio' and (storage.foldername(name))[1] = auth.uid()::text);

-- Policies for beat-stems
drop policy if exists "Owner Access Stems" on storage.objects;
create policy "Owner Access Stems" on storage.objects for select to authenticated using (bucket_id = 'beat-stems' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Owner Upload Stems" on storage.objects;
create policy "Owner Upload Stems" on storage.objects for insert to authenticated with check (bucket_id = 'beat-stems' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Owner Update Stems" on storage.objects;
create policy "Owner Update Stems" on storage.objects for update to authenticated using (bucket_id = 'beat-stems' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Owner Delete Stems" on storage.objects;
create policy "Owner Delete Stems" on storage.objects for delete to authenticated using (bucket_id = 'beat-stems' and (storage.foldername(name))[1] = auth.uid()::text);
