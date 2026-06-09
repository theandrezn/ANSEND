create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  account_role text not null default 'artista',
  artistic_name text,
  display_name text,
  username text,
  bio text,
  music_styles text[] not null default '{}',
  onboarding_goal text,
  avatar_url text,
  avatar_path text,
  banner_url text,
  banner_path text,
  website_url text,
  instagram_url text,
  youtube_url text,
  spotify_url text,
  soundcloud_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles alter column full_name set default '';
alter table public.profiles alter column account_role set default 'artista';
alter table public.profiles drop constraint if exists profiles_account_role_check;
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists avatar_path text;
alter table public.profiles add column if not exists banner_url text;
alter table public.profiles add column if not exists banner_path text;
alter table public.profiles add column if not exists website_url text;
alter table public.profiles add column if not exists instagram_url text;
alter table public.profiles add column if not exists youtube_url text;
alter table public.profiles add column if not exists spotify_url text;
alter table public.profiles add column if not exists soundcloud_url text;

create unique index if not exists profiles_username_unique_idx
on public.profiles (lower(username))
where username is not null and username <> '';

alter table public.profiles enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    account_role,
    artistic_name,
    display_name,
    username,
    music_styles
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'account_role', 'artista'),
    nullif(new.raw_user_meta_data->>'artistic_name', ''),
    nullif(new.raw_user_meta_data->>'display_name', ''),
    nullif(new.raw_user_meta_data->>'username', ''),
    case
      when jsonb_typeof(new.raw_user_meta_data->'music_styles') = 'array'
        then array(select jsonb_array_elements_text(new.raw_user_meta_data->'music_styles'))
      else '{}'
    end
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
    account_role = coalesce(nullif(excluded.account_role, ''), public.profiles.account_role),
    artistic_name = coalesce(excluded.artistic_name, public.profiles.artistic_name),
    display_name = coalesce(excluded.display_name, public.profiles.display_name),
    username = coalesce(excluded.username, public.profiles.username),
    music_styles = case
      when array_length(excluded.music_styles, 1) is null then public.profiles.music_styles
      else excluded.music_styles
    end,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create table if not exists public.catalog_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('beat', 'musica')),
  title text not null,
  artist_name text,
  producer_name text,
  genre text not null,
  bpm integer check (bpm is null or bpm between 40 and 240),
  musical_key text,
  price numeric(10,2) check (price is null or price >= 0),
  license_type text not null default 'basic' check (license_type in ('basic', 'premium', 'exclusive', 'free')),
  status text not null default 'draft' check (status in ('draft', 'published', 'sold', 'archived')),
  description text,
  audio_url text,
  cover_url text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalog_items enable row level security;

create index if not exists catalog_items_user_created_idx on public.catalog_items (user_id, created_at desc);
create index if not exists catalog_items_status_created_idx on public.catalog_items (status, created_at desc);
create index if not exists catalog_items_kind_genre_idx on public.catalog_items (kind, genre);

drop trigger if exists catalog_items_set_updated_at on public.catalog_items;
create trigger catalog_items_set_updated_at
before update on public.catalog_items
for each row execute function public.set_updated_at();

drop policy if exists "Published catalog is public" on public.catalog_items;
create policy "Published catalog is public"
on public.catalog_items
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Users can read their catalog" on public.catalog_items;
create policy "Users can read their catalog"
on public.catalog_items
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their catalog" on public.catalog_items;
create policy "Users can insert their catalog"
on public.catalog_items
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their catalog" on public.catalog_items;
create policy "Users can update their catalog"
on public.catalog_items
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their catalog" on public.catalog_items;
create policy "Users can delete their catalog"
on public.catalog_items
for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select on public.catalog_items to anon;
grant select, insert, update, delete on public.catalog_items to authenticated;

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
  ('beat-stems', 'beat-stems', false),
  ('profile-avatars', 'profile-avatars', true),
  ('profile-banners', 'profile-banners', true)
on conflict (id) do update set public = excluded.public;

-- Policies for profile media
drop policy if exists "Profile avatars are public" on storage.objects;
create policy "Profile avatars are public" on storage.objects for select to anon, authenticated using (bucket_id = 'profile-avatars');

drop policy if exists "Profile banners are public" on storage.objects;
create policy "Profile banners are public" on storage.objects for select to anon, authenticated using (bucket_id = 'profile-banners');

drop policy if exists "Users can manage own profile avatars" on storage.objects;
create policy "Users can manage own profile avatars" on storage.objects for all to authenticated using (bucket_id = 'profile-avatars' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = 'profile-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can manage own profile banners" on storage.objects;
create policy "Users can manage own profile banners" on storage.objects for all to authenticated using (bucket_id = 'profile-banners' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = 'profile-banners' and (storage.foldername(name))[1] = auth.uid()::text);

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

