do $$
begin
  if exists (
    select 1 from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'public_profiles' and c.relkind = 'v'
  ) then
    execute 'drop view public.public_profiles';
  end if;
end;
$$;

create table if not exists public.public_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  display_name text,
  username text,
  full_name text,
  artistic_name text,
  account_role text,
  bio text,
  avatar_url text,
  banner_url text,
  website_url text,
  instagram_url text,
  youtube_url text,
  spotify_url text,
  soundcloud_url text,
  music_styles text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.public_profiles enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.sync_public_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.public_profiles (
    id, display_name, username, full_name, artistic_name, account_role, bio,
    avatar_url, banner_url, website_url, instagram_url, youtube_url, spotify_url,
    soundcloud_url, music_styles, created_at, updated_at
  ) values (
    new.id, new.display_name, new.username, new.full_name, new.artistic_name, new.account_role, new.bio,
    new.avatar_url, new.banner_url, new.website_url, new.instagram_url, new.youtube_url, new.spotify_url,
    new.soundcloud_url, new.music_styles, new.created_at, new.updated_at
  )
  on conflict (id) do update set
    display_name = excluded.display_name,
    username = excluded.username,
    full_name = excluded.full_name,
    artistic_name = excluded.artistic_name,
    account_role = excluded.account_role,
    bio = excluded.bio,
    avatar_url = excluded.avatar_url,
    banner_url = excluded.banner_url,
    website_url = excluded.website_url,
    instagram_url = excluded.instagram_url,
    youtube_url = excluded.youtube_url,
    spotify_url = excluded.spotify_url,
    soundcloud_url = excluded.soundcloud_url,
    music_styles = excluded.music_styles,
    updated_at = excluded.updated_at;
  return new;
end;
$$;

drop trigger if exists profiles_sync_public on public.profiles;
create trigger profiles_sync_public
after insert or update on public.profiles
for each row execute function public.sync_public_profile();

insert into public.public_profiles (
  id, display_name, username, full_name, artistic_name, account_role, bio,
  avatar_url, banner_url, website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, created_at, updated_at
)
select
  id, display_name, username, full_name, artistic_name, account_role, bio,
  avatar_url, banner_url, website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, created_at, updated_at
from public.profiles
on conflict (id) do nothing;

drop policy if exists "Public profiles are readable" on public.public_profiles;
create policy "Public profiles are readable"
on public.public_profiles for select to anon, authenticated using (true);

grant select on public.public_profiles to anon, authenticated;
revoke insert, update, delete on public.public_profiles from anon, authenticated;

revoke execute on function public.handle_new_auth_user() from public, anon, authenticated;

drop policy if exists "Published catalog is public" on public.catalog_items;
drop policy if exists "Users can read their catalog" on public.catalog_items;
drop policy if exists "Published or owned catalog is readable" on public.catalog_items;
create policy "Published or owned catalog is readable"
on public.catalog_items for select to anon, authenticated
using (status = 'published' or (select auth.uid()) = user_id);

drop policy if exists "Published beats are public" on public.beats;
drop policy if exists "Users can read their own beats" on public.beats;
drop policy if exists "Published or owned beats are readable" on public.beats;
create policy "Published or owned beats are readable"
on public.beats for select to anon, authenticated
using (status = 'published' or (select auth.uid()) = user_id);

drop policy if exists "Profile avatars are public" on storage.objects;
drop policy if exists "Profile banners are public" on storage.objects;
drop policy if exists "Public Access Covers" on storage.objects;
drop policy if exists "Public Access Audio" on storage.objects;
