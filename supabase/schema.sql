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
  banner_position_x numeric not null default 50 check (banner_position_x between 0 and 100),
  banner_position_y numeric not null default 50 check (banner_position_y between 0 and 100),
  avatar_position_x numeric not null default 50 check (avatar_position_x between 0 and 100),
  avatar_position_y numeric not null default 50 check (avatar_position_y between 0 and 100),
  banner_scale numeric not null default 1 check (banner_scale between 1 and 2.5),
  avatar_scale numeric not null default 1 check (avatar_scale between 1 and 2.5),
  website_url text,
  instagram_url text,
  youtube_url text,
  spotify_url text,
  soundcloud_url text,
  auth_provider text,
  last_login_at timestamptz,
  quiz_completed boolean not null default false,
  quiz_completed_at timestamptz,
  is_public boolean not null default true,
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
alter table public.profiles add column if not exists banner_position_x numeric not null default 50 check (banner_position_x between 0 and 100);
alter table public.profiles add column if not exists banner_position_y numeric not null default 50 check (banner_position_y between 0 and 100);
alter table public.profiles add column if not exists avatar_position_x numeric not null default 50 check (avatar_position_x between 0 and 100);
alter table public.profiles add column if not exists avatar_position_y numeric not null default 50 check (avatar_position_y between 0 and 100);
alter table public.profiles add column if not exists banner_scale numeric not null default 1 check (banner_scale between 1 and 2.5);
alter table public.profiles add column if not exists avatar_scale numeric not null default 1 check (avatar_scale between 1 and 2.5);
alter table public.profiles add column if not exists website_url text;
alter table public.profiles add column if not exists instagram_url text;
alter table public.profiles add column if not exists youtube_url text;
alter table public.profiles add column if not exists spotify_url text;
alter table public.profiles add column if not exists soundcloud_url text;
alter table public.profiles add column if not exists auth_provider text;
alter table public.profiles add column if not exists last_login_at timestamptz;
alter table public.profiles add column if not exists quiz_completed boolean not null default false;
alter table public.profiles add column if not exists quiz_completed_at timestamptz;
alter table public.profiles add column if not exists is_public boolean not null default true;

create unique index if not exists profiles_username_unique_idx
on public.profiles (lower(username))
where username is not null and username <> '';

alter table public.profiles enable row level security;

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
  banner_position_x numeric not null default 50,
  banner_position_y numeric not null default 50,
  avatar_position_x numeric not null default 50,
  avatar_position_y numeric not null default 50,
  banner_scale numeric not null default 1,
  avatar_scale numeric not null default 1,
  website_url text,
  instagram_url text,
  youtube_url text,
  spotify_url text,
  soundcloud_url text,
  music_styles text[] not null default '{}',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.public_profiles add column if not exists is_public boolean not null default true;
alter table public.public_profiles add column if not exists banner_position_x numeric not null default 50;
alter table public.public_profiles add column if not exists banner_position_y numeric not null default 50;
alter table public.public_profiles add column if not exists avatar_position_x numeric not null default 50;
alter table public.public_profiles add column if not exists avatar_position_y numeric not null default 50;
alter table public.public_profiles add column if not exists banner_scale numeric not null default 1;
alter table public.public_profiles add column if not exists avatar_scale numeric not null default 1;

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
  if new.is_public is false then
    delete from public.public_profiles where id = new.id;
    return new;
  end if;

  insert into public.public_profiles (
    id, display_name, username, full_name, artistic_name, account_role, bio,
    avatar_url, banner_url, banner_position_x, banner_position_y,
    avatar_position_x, avatar_position_y, banner_scale, avatar_scale,
    website_url, instagram_url, youtube_url, spotify_url,
    soundcloud_url, music_styles, is_public, created_at, updated_at
  ) values (
    new.id, new.display_name, new.username, new.full_name, new.artistic_name, new.account_role, new.bio,
    new.avatar_url, new.banner_url, new.banner_position_x, new.banner_position_y,
    new.avatar_position_x, new.avatar_position_y, new.banner_scale, new.avatar_scale,
    new.website_url, new.instagram_url, new.youtube_url, new.spotify_url,
    new.soundcloud_url, new.music_styles, new.is_public, new.created_at, new.updated_at
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
    banner_position_x = excluded.banner_position_x,
    banner_position_y = excluded.banner_position_y,
    avatar_position_x = excluded.avatar_position_x,
    avatar_position_y = excluded.avatar_position_y,
    banner_scale = excluded.banner_scale,
    avatar_scale = excluded.avatar_scale,
    website_url = excluded.website_url,
    instagram_url = excluded.instagram_url,
    youtube_url = excluded.youtube_url,
    spotify_url = excluded.spotify_url,
    soundcloud_url = excluded.soundcloud_url,
    music_styles = excluded.music_styles,
    is_public = excluded.is_public,
    updated_at = excluded.updated_at;
  return new;
end;
$$;

revoke execute on function public.sync_public_profile() from public, anon, authenticated;

drop trigger if exists profiles_sync_public on public.profiles;
create trigger profiles_sync_public
after insert or update on public.profiles
for each row execute function public.sync_public_profile();

insert into public.public_profiles (
  id, display_name, username, full_name, artistic_name, account_role, bio,
  avatar_url, banner_url, banner_position_x, banner_position_y,
  avatar_position_x, avatar_position_y, banner_scale, avatar_scale,
  website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, is_public, created_at, updated_at
)
select
  id, display_name, username, full_name, artistic_name, account_role, bio,
  avatar_url, banner_url, banner_position_x, banner_position_y,
  avatar_position_x, avatar_position_y, banner_scale, avatar_scale,
  website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, is_public, created_at, updated_at
from public.profiles
where is_public is true
on conflict (id) do nothing;

drop policy if exists "Public profiles are readable" on public.public_profiles;
create policy "Public profiles are readable"
on public.public_profiles for select to anon, authenticated using (true);

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
grant select on public.public_profiles to anon, authenticated;
revoke insert, update, delete on public.public_profiles from anon, authenticated;

create table if not exists public.user_follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint user_follows_no_self_follow check (follower_id <> following_id),
  constraint user_follows_unique unique (follower_id, following_id)
);

create index if not exists idx_user_follows_follower_id on public.user_follows(follower_id);
create index if not exists idx_user_follows_following_id on public.user_follows(following_id);
create index if not exists idx_user_follows_pair on public.user_follows(follower_id, following_id);

alter table public.user_follows enable row level security;

drop policy if exists "Public can read follows" on public.user_follows;
create policy "Public can read follows"
on public.user_follows for select using (true);

drop policy if exists "Users can follow as themselves" on public.user_follows;
create policy "Users can follow as themselves"
on public.user_follows for insert to authenticated
with check ((select auth.uid()) = follower_id and follower_id <> following_id);

drop policy if exists "Users can unfollow as themselves" on public.user_follows;
create policy "Users can unfollow as themselves"
on public.user_follows for delete to authenticated
using ((select auth.uid()) = follower_id);

grant select on public.user_follows to anon, authenticated;
grant insert, delete on public.user_follows to authenticated;

create or replace function public.process_user_follow_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_name text;
  v_actor_username text;
  v_action_url text;
begin
  if new.follower_id = new.following_id then
    return new;
  end if;

  select
    coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem'),
    nullif(username, '')
  into v_actor_name, v_actor_username
  from public.profiles
  where id = new.follower_id;

  v_action_url := '#perfil-' || coalesce(v_actor_username, new.follower_id::text);

  perform public.upsert_notification(
    new.following_id,
    new.follower_id,
    'profile_follow',
    'profile',
    new.follower_id,
    'Novo seguidor',
    v_actor_name || ' começou a seguir você.',
    v_action_url
  );

  return new;
end;
$$;

drop trigger if exists tr_user_follows_notifications on public.user_follows;
create trigger tr_user_follows_notifications
after insert on public.user_follows
for each row execute function public.process_user_follow_notification();

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
    avatar_url,
    auth_provider,
    last_login_at,
    music_styles
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'account_role', 'artista'),
    nullif(new.raw_user_meta_data->>'artistic_name', ''),
    nullif(coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'name'), ''),
    nullif(new.raw_user_meta_data->>'username', ''),
    nullif(coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'), ''),
    nullif(new.raw_app_meta_data->>'provider', ''),
    now(),
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
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    auth_provider = coalesce(excluded.auth_provider, public.profiles.auth_provider),
    last_login_at = coalesce(public.profiles.last_login_at, excluded.last_login_at),
    music_styles = case
      when array_length(excluded.music_styles, 1) is null then public.profiles.music_styles
      else excluded.music_styles
    end,
    updated_at = now();

  return new;
end;
$$;

revoke execute on function public.handle_new_auth_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

insert into public.profiles (
  id,
  email,
  full_name,
  account_role,
  artistic_name,
  display_name,
  username,
  avatar_url,
  auth_provider,
  music_styles
)
select
  users.id,
  coalesce(users.email, ''),
  coalesce(users.raw_user_meta_data->>'full_name', users.raw_user_meta_data->>'name', ''),
  coalesce(users.raw_user_meta_data->>'account_role', 'artista'),
  nullif(users.raw_user_meta_data->>'artistic_name', ''),
  nullif(coalesce(users.raw_user_meta_data->>'display_name', users.raw_user_meta_data->>'name'), ''),
  nullif(users.raw_user_meta_data->>'username', ''),
  nullif(coalesce(users.raw_user_meta_data->>'avatar_url', users.raw_user_meta_data->>'picture'), ''),
  nullif(users.raw_app_meta_data->>'provider', ''),
  case
    when jsonb_typeof(users.raw_user_meta_data->'music_styles') = 'array'
      then array(select jsonb_array_elements_text(users.raw_user_meta_data->'music_styles'))
    else '{}'
  end
from auth.users as users
where not exists (
  select 1
  from public.profiles as profiles
  where profiles.id = users.id
)
on conflict (id) do nothing;

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
  is_public boolean not null default true,
  description text,
  audio_url text,
  cover_url text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalog_items add column if not exists is_public boolean not null default true;

alter table public.catalog_items enable row level security;

create index if not exists catalog_items_user_created_idx on public.catalog_items (user_id, created_at desc);
create index if not exists catalog_items_status_created_idx on public.catalog_items (status, created_at desc);
create index if not exists catalog_items_kind_genre_idx on public.catalog_items (kind, genre);

drop trigger if exists catalog_items_set_updated_at on public.catalog_items;
create trigger catalog_items_set_updated_at
before update on public.catalog_items
for each row execute function public.set_updated_at();

drop policy if exists "Published catalog is public" on public.catalog_items;
drop policy if exists "Users can read their catalog" on public.catalog_items;
create policy "Published or owned catalog is readable"
on public.catalog_items
for select
to anon, authenticated
using ((status = 'published' and is_public is true) or (select auth.uid()) = user_id);

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
  audio_original_name text,
  audio_mime_type text,
  audio_size_bytes bigint,
  audio_duration_seconds numeric,
  mp3_url text,
  mp3_path text,
  mp3_original_name text,
  mp3_mime_type text,
  mp3_size_bytes bigint,
  mp3_duration_seconds numeric,
  wav_url text,
  wav_path text,
  wav_original_name text,
  wav_mime_type text,
  wav_size_bytes bigint,
  wav_duration_seconds numeric,
  stems_url text,
  stems_path text,
  stems_original_name text,
  stems_mime_type text,
  stems_size_bytes bigint,
  duration_seconds numeric,
  file_size numeric,
  source_type text not null default 'upload' check (source_type in ('upload', 'youtube')),
  catalog_batch_id uuid null,
  import_source text,
  import_status text,
  original_file_name text,
  sort_order integer,
  youtube_url text,
  youtube_video_id text,
  youtube_embed_url text,
  youtube_thumbnail_url text,
  youtube_title text,
  youtube_channel_title text,
  status text not null default 'draft' check (status in ('draft', 'published', 'sold', 'archived')),
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.beats add column if not exists is_public boolean not null default true;
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
alter table public.beats add column if not exists audio_original_name text null;
alter table public.beats add column if not exists audio_mime_type text null;
alter table public.beats add column if not exists audio_size_bytes bigint null;
alter table public.beats add column if not exists audio_duration_seconds numeric null;
alter table public.beats add column if not exists mp3_url text null;
alter table public.beats add column if not exists mp3_path text null;
alter table public.beats add column if not exists mp3_original_name text null;
alter table public.beats add column if not exists mp3_mime_type text null;
alter table public.beats add column if not exists mp3_size_bytes bigint null;
alter table public.beats add column if not exists mp3_duration_seconds numeric null;
alter table public.beats add column if not exists wav_url text null;
alter table public.beats add column if not exists wav_path text null;
alter table public.beats add column if not exists wav_original_name text null;
alter table public.beats add column if not exists wav_mime_type text null;
alter table public.beats add column if not exists wav_size_bytes bigint null;
alter table public.beats add column if not exists wav_duration_seconds numeric null;
alter table public.beats add column if not exists stems_original_name text null;
alter table public.beats add column if not exists stems_mime_type text null;
alter table public.beats add column if not exists stems_size_bytes bigint null;

-- Enable RLS
alter table public.beats enable row level security;

-- Index definitions
create index if not exists beats_user_created_idx on public.beats (user_id, created_at desc);
create index if not exists beats_status_created_idx on public.beats (status, created_at desc);
create index if not exists beats_catalog_batch_idx on public.beats (catalog_batch_id);
create index if not exists beats_source_type_idx on public.beats (source_type);
create index if not exists beats_user_youtube_idx on public.beats (user_id, youtube_video_id) where youtube_video_id is not null;

-- Trigger for updated_at
drop trigger if exists beats_set_updated_at on public.beats;
create trigger beats_set_updated_at
before update on public.beats
for each row execute function public.set_updated_at();

create or replace function public.validate_beat_storage_paths()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  owner_prefix text := new.user_id::text || '/';
  beat_segment text := '/' || new.id::text || '/';
begin
  if new.cover_path is not null
    and not (
      new.cover_path like owner_prefix || 'beat-covers' || beat_segment || '%'
      or new.cover_path like owner_prefix || 'covers' || beat_segment || '%'
    )
  then
    raise exception 'cover_path must belong to the beat owner and beat id';
  end if;

  if new.audio_path is not null
    and new.audio_path not like owner_prefix || 'beat-audio' || beat_segment || '%'
  then
    raise exception 'audio_path must belong to the beat owner and beat id';
  end if;

  if new.mp3_path is not null
    and new.mp3_path not like owner_prefix || 'beat-secure-files' || beat_segment || '%'
  then
    raise exception 'mp3_path must belong to the beat owner and beat id';
  end if;

  if new.wav_path is not null
    and new.wav_path not like owner_prefix || 'beat-secure-files' || beat_segment || '%'
  then
    raise exception 'wav_path must belong to the beat owner and beat id';
  end if;

  if new.stems_path is not null
    and not (
      new.stems_path like owner_prefix || 'beat-secure-files' || beat_segment || '%'
      or new.stems_path like owner_prefix || 'beat-stems' || beat_segment || '%'
    )
  then
    raise exception 'stems_path must belong to the beat owner and beat id';
  end if;

  return new;
end;
$$;

drop trigger if exists beats_validate_storage_paths on public.beats;
create trigger beats_validate_storage_paths
before insert or update on public.beats
for each row execute function public.validate_beat_storage_paths();

-- Policies
-- SELECT: published beats are public
drop policy if exists "Published beats are public" on public.beats;
drop policy if exists "Users can read their own beats" on public.beats;
create policy "Published or owned beats are readable"
on public.beats
for select
to anon, authenticated
using ((status = 'published' and is_public is true) or (select auth.uid()) = user_id);

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

create index if not exists catalog_import_batches_user_created_idx on public.catalog_import_batches (user_id, created_at desc);

drop policy if exists "Users can read own catalog import batches" on public.catalog_import_batches;
create policy "Users can read own catalog import batches"
on public.catalog_import_batches for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create own catalog import batches" on public.catalog_import_batches;
create policy "Users can create own catalog import batches"
on public.catalog_import_batches for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own catalog import batches" on public.catalog_import_batches;
create policy "Users can update own catalog import batches"
on public.catalog_import_batches for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own catalog import batches" on public.catalog_import_batches;
create policy "Users can delete own catalog import batches"
on public.catalog_import_batches for delete to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.catalog_import_batches to authenticated;

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

create table if not exists public.release_upload_drafts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  beat_id uuid not null,
  cover_url text,
  cover_path text,
  audio_url text,
  audio_path text,
  audio_original_name text,
  audio_mime_type text,
  audio_size_bytes bigint,
  audio_duration_seconds numeric,
  mp3_url text,
  mp3_path text,
  mp3_original_name text,
  mp3_mime_type text,
  mp3_size_bytes bigint,
  mp3_duration_seconds numeric,
  wav_url text,
  wav_path text,
  wav_original_name text,
  wav_mime_type text,
  wav_size_bytes bigint,
  wav_duration_seconds numeric,
  stems_url text,
  stems_path text,
  stems_original_name text,
  stems_mime_type text,
  stems_size_bytes bigint,
  updated_at timestamptz not null default now()
);

alter table public.release_upload_drafts enable row level security;

drop trigger if exists release_upload_drafts_set_updated_at on public.release_upload_drafts;
create trigger release_upload_drafts_set_updated_at
before update on public.release_upload_drafts
for each row execute function public.set_updated_at();

drop policy if exists "Users can read own release upload draft" on public.release_upload_drafts;
create policy "Users can read own release upload draft"
on public.release_upload_drafts for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can upsert own release upload draft" on public.release_upload_drafts;
create policy "Users can upsert own release upload draft"
on public.release_upload_drafts for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own release upload draft" on public.release_upload_drafts;
create policy "Users can update own release upload draft"
on public.release_upload_drafts for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own release upload draft" on public.release_upload_drafts;
create policy "Users can delete own release upload draft"
on public.release_upload_drafts for delete to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.release_upload_drafts to authenticated;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.is_current_user_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users admins
    where admins.user_id = auth.uid()
  );
$$;

revoke execute on function public.is_current_user_admin() from public, anon;
grant execute on function public.is_current_user_admin() to authenticated;

create or replace function public.admin_list_profiles()
returns table (
  id uuid,
  email text,
  display_name text,
  full_name text,
  artistic_name text,
  account_role text,
  avatar_url text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_current_user_admin() then
    raise exception 'ANSEND admin permission required' using errcode = '42501';
  end if;

  return query
  select
    profiles.id,
    profiles.email,
    profiles.display_name,
    profiles.full_name,
    profiles.artistic_name,
    profiles.account_role,
    profiles.avatar_url,
    profiles.created_at
  from public.profiles
  order by profiles.created_at desc;
end;
$$;

revoke execute on function public.admin_list_profiles() from public, anon;
grant execute on function public.admin_list_profiles() to authenticated;

create or replace function public.admin_delete_professional_account(target_user_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  target_email text;
begin
  if not public.is_current_user_admin() then
    raise exception 'ANSEND admin permission required' using errcode = '42501';
  end if;

  if target_user_id is null then
    raise exception 'target_user_id is required' using errcode = '22004';
  end if;

  if target_user_id = auth.uid() then
    raise exception 'Admin cannot delete their own account here' using errcode = '42501';
  end if;

  select profiles.email
    into target_email
  from public.profiles
  where profiles.id = target_user_id;

  if target_email is null then
    select users.email
      into target_email
    from auth.users
    where users.id = target_user_id;
  end if;

  delete from public.beats where user_id = target_user_id;
  delete from public.catalog_items where user_id = target_user_id;
  delete from public.profiles where id = target_user_id;
  delete from auth.users where id = target_user_id;

  return jsonb_build_object(
    'deleted_user_id', target_user_id,
    'email', target_email
  );
end;
$$;

revoke execute on function public.admin_delete_professional_account(uuid) from public, anon;
grant execute on function public.admin_delete_professional_account(uuid) to authenticated;

create table if not exists public.nexo_feed_comments (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.nexo_feed_comments(id) on delete cascade,
  content text not null check (char_length(trim(content)) between 1 and 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexo_feed_likes (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (source_type, source_id, user_id)
);

create table if not exists public.nexo_feed_saves (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (source_type, source_id, user_id)
);

create table if not exists public.nexo_feed_comment_likes (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references public.nexo_feed_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (comment_id, user_id)
);

alter table public.nexo_feed_comments enable row level security;
alter table public.nexo_feed_likes enable row level security;
alter table public.nexo_feed_saves enable row level security;
alter table public.nexo_feed_comment_likes enable row level security;

create index if not exists nexo_feed_comments_source_idx on public.nexo_feed_comments (source_type, source_id, created_at desc);
create index if not exists nexo_feed_comments_user_idx on public.nexo_feed_comments (user_id, created_at desc);
create index if not exists nexo_feed_likes_source_idx on public.nexo_feed_likes (source_type, source_id);
create index if not exists nexo_feed_saves_source_idx on public.nexo_feed_saves (source_type, source_id);
create index if not exists nexo_feed_comment_likes_comment_idx on public.nexo_feed_comment_likes (comment_id);

drop trigger if exists nexo_feed_comments_set_updated_at on public.nexo_feed_comments;
create trigger nexo_feed_comments_set_updated_at
before update on public.nexo_feed_comments
for each row execute function public.set_updated_at();

drop policy if exists "NEXO feed comments are readable" on public.nexo_feed_comments;
create policy "NEXO feed comments are readable"
on public.nexo_feed_comments for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed comments" on public.nexo_feed_comments;
create policy "Users can insert own NEXO feed comments"
on public.nexo_feed_comments for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own NEXO feed comments" on public.nexo_feed_comments;
create policy "Users can update own NEXO feed comments"
on public.nexo_feed_comments for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed comments" on public.nexo_feed_comments;
create policy "Users can delete own NEXO feed comments"
on public.nexo_feed_comments for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "NEXO feed likes are readable" on public.nexo_feed_likes;
create policy "NEXO feed likes are readable"
on public.nexo_feed_likes for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed likes" on public.nexo_feed_likes;
create policy "Users can insert own NEXO feed likes"
on public.nexo_feed_likes for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed likes" on public.nexo_feed_likes;
create policy "Users can delete own NEXO feed likes"
on public.nexo_feed_likes for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "NEXO feed saves are readable" on public.nexo_feed_saves;
create policy "NEXO feed saves are readable"
on public.nexo_feed_saves for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed saves" on public.nexo_feed_saves;
create policy "Users can insert own NEXO feed saves"
on public.nexo_feed_saves for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed saves" on public.nexo_feed_saves;
create policy "Users can delete own NEXO feed saves"
on public.nexo_feed_saves for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "NEXO feed comment likes are readable" on public.nexo_feed_comment_likes;
create policy "NEXO feed comment likes are readable"
on public.nexo_feed_comment_likes for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed comment likes" on public.nexo_feed_comment_likes;
create policy "Users can insert own NEXO feed comment likes"
on public.nexo_feed_comment_likes for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed comment likes" on public.nexo_feed_comment_likes;
create policy "Users can delete own NEXO feed comment likes"
on public.nexo_feed_comment_likes for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select on public.nexo_feed_comments to anon, authenticated;
grant insert, update, delete on public.nexo_feed_comments to authenticated;
grant select on public.nexo_feed_likes to anon, authenticated;
grant insert, delete on public.nexo_feed_likes to authenticated;
grant select on public.nexo_feed_saves to anon, authenticated;
grant insert, delete on public.nexo_feed_saves to authenticated;
grant select on public.nexo_feed_comment_likes to anon, authenticated;
grant insert, delete on public.nexo_feed_comment_likes to authenticated;

create or replace function public.process_nexo_feed_like_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_actor_name text;
  v_title text;
begin
  select coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem')
    into v_actor_name
  from public.profiles
  where id = new.user_id;

  if new.source_type = 'beats' then
    select user_id, title into v_recipient_id, v_title from public.beats where id = new.source_id;
  elsif new.source_type = 'catalog_items' then
    select user_id, title into v_recipient_id, v_title from public.catalog_items where id = new.source_id;
  end if;

  if v_recipient_id is not null then
    perform public.upsert_notification(
      v_recipient_id,
      new.user_id,
      'beat_like',
      'beat',
      new.source_id,
      'Curtida no beat',
      v_actor_name || ' curtiu seu beat "' || coalesce(v_title, 'ANSEND') || '".',
      '#beat-' || new.source_id::text
    );
  end if;

  return new;
end;
$$;

drop trigger if exists tr_nexo_feed_likes_notifications on public.nexo_feed_likes;
create trigger tr_nexo_feed_likes_notifications
after insert on public.nexo_feed_likes
for each row execute function public.process_nexo_feed_like_notification();

create or replace function public.process_nexo_feed_comment_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_actor_name text;
  v_title text;
begin
  select coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem')
    into v_actor_name
  from public.profiles
  where id = new.user_id;

  if new.source_type = 'beats' then
    select user_id, title into v_recipient_id, v_title from public.beats where id = new.source_id;
  elsif new.source_type = 'catalog_items' then
    select user_id, title into v_recipient_id, v_title from public.catalog_items where id = new.source_id;
  end if;

  if v_recipient_id is not null then
    perform public.upsert_notification(
      v_recipient_id,
      new.user_id,
      'community_comment',
      'beat',
      new.source_id,
      'Novo comentario',
      v_actor_name || ' comentou em "' || coalesce(v_title, 'ANSEND') || '".',
      '#beat-' || new.source_id::text
    );
  end if;

  return new;
end;
$$;

drop trigger if exists tr_nexo_feed_comments_notifications on public.nexo_feed_comments;
create trigger tr_nexo_feed_comments_notifications
after insert on public.nexo_feed_comments
for each row execute function public.process_nexo_feed_comment_notification();

create or replace function public.process_nexo_feed_comment_like_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_actor_name text;
  v_source_id uuid;
begin
  select coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem')
    into v_actor_name
  from public.profiles
  where id = new.user_id;

  select user_id, source_id
    into v_recipient_id, v_source_id
  from public.nexo_feed_comments
  where id = new.comment_id;

  if v_recipient_id is not null then
    perform public.upsert_notification(
      v_recipient_id,
      new.user_id,
      'community_like',
      'feed_comment',
      new.comment_id,
      'Curtida no comentario',
      v_actor_name || ' curtiu seu comentario.',
      coalesce('#beat-' || v_source_id::text, '#nexo-feed')
    );
  end if;

  return new;
end;
$$;

drop trigger if exists tr_nexo_feed_comment_likes_notifications on public.nexo_feed_comment_likes;
create trigger tr_nexo_feed_comment_likes_notifications
after insert on public.nexo_feed_comment_likes
for each row execute function public.process_nexo_feed_comment_like_notification();

-- Storage buckets setup
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('beat-covers', 'beat-covers', true, 10485760, array['image/jpeg','image/png','image/webp']),
  ('beat-audio', 'beat-audio', true, 262144000, array['audio/mpeg','audio/wav','audio/x-wav','audio/flac','audio/mp4','audio/aac','audio/ogg','video/mp4']),
  ('beat-stems', 'beat-stems', false, 524288000, array['application/zip','application/x-zip-compressed']),
  ('beat-secure-files', 'beat-secure-files', false, 524288000, array['audio/mpeg','audio/mp3','audio/wav','audio/x-wav','application/zip','application/x-zip-compressed']),
  ('profile-avatars', 'profile-avatars', true, 10485760, array['image/jpeg','image/png','image/webp']),
  ('profile-banners', 'profile-banners', true, 15728640, array['image/jpeg','image/png','image/webp']),
  ('chat-attachments', 'chat-attachments', true, 104857600, array['image/jpeg','image/png','image/webp','audio/mpeg','audio/mp3','audio/wav','audio/x-wav','audio/flac','audio/mp4','audio/aac','audio/ogg','audio/x-m4a','video/mp4','video/webm','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain','application/zip','application/x-zip-compressed'])
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public Access Covers" on storage.objects;
drop policy if exists "Public Access Audio" on storage.objects;
drop policy if exists "Profile avatars are public" on storage.objects;
drop policy if exists "Profile banners are public" on storage.objects;
drop policy if exists "Public can read beat covers" on storage.objects;
create policy "Public can read beat covers"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'beat-covers');

drop policy if exists "Public can read profile avatars" on storage.objects;
create policy "Public can read profile avatars"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'profile-avatars');

drop policy if exists "Public can read profile banners" on storage.objects;
create policy "Public can read profile banners"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'profile-banners');

drop policy if exists "Users can upload their own covers" on storage.objects;
create policy "Users can upload their own covers"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'beat-covers'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can update their own covers" on storage.objects;
create policy "Users can update their own covers"
on storage.objects for update
to authenticated
using (
  bucket_id = 'beat-covers'
  and (storage.foldername(name))[1] = (auth.uid())::text
)
with check (
  bucket_id = 'beat-covers'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can delete their own covers" on storage.objects;
create policy "Users can delete their own covers"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'beat-covers'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can upload their own audio" on storage.objects;
create policy "Users can upload their own audio"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'beat-audio'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can update their own audio" on storage.objects;
create policy "Users can update their own audio"
on storage.objects for update
to authenticated
using (
  bucket_id = 'beat-audio'
  and (storage.foldername(name))[1] = (auth.uid())::text
)
with check (
  bucket_id = 'beat-audio'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can delete their own audio" on storage.objects;
create policy "Users can delete their own audio"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'beat-audio'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Owner Upload Stems" on storage.objects;
create policy "Owner Upload Stems"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'beat-stems'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Owner Update Stems" on storage.objects;
create policy "Owner Update Stems"
on storage.objects for update
to authenticated
using (
  bucket_id = 'beat-stems'
  and (storage.foldername(name))[1] = (auth.uid())::text
)
with check (
  bucket_id = 'beat-stems'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Owner Delete Stems" on storage.objects;
create policy "Owner Delete Stems"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'beat-stems'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Owner Access Stems" on storage.objects;
create policy "Owner Access Stems"
on storage.objects for select
to authenticated
using (
  bucket_id = 'beat-stems'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can upload their own secure files" on storage.objects;
create policy "Users can upload their own secure files"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
  and coalesce((storage.foldername(name))[3], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

drop policy if exists "Users can update their own secure files" on storage.objects;
create policy "Users can update their own secure files"
on storage.objects for update to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
)
with check (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
  and coalesce((storage.foldername(name))[3], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

drop policy if exists "Users can delete their own secure files" on storage.objects;
create policy "Users can delete their own secure files"
on storage.objects for delete to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
);

drop policy if exists "Users can read their own secure files" on storage.objects;
create policy "Users can read their own secure files"
on storage.objects for select to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (
    ((storage.foldername(name))[1] = (auth.uid())::text and (storage.foldername(name))[2] = 'beat-secure-files')
    or exists (
      select 1
      from public.order_items oi
      join public.orders o on o.id = oi.order_id
      where coalesce((storage.foldername(name))[3], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        and oi.beat_id = ((storage.foldername(name))[3])::uuid
        and o.buyer_id = auth.uid()
        and o.status = 'completed'
    )
  )
);

drop policy if exists "Users can manage own profile avatars" on storage.objects;
create policy "Users can manage own profile avatars"
on storage.objects for all
to authenticated
using (
  bucket_id = 'profile-avatars'
  and (storage.foldername(name))[1] = (auth.uid())::text
)
with check (
  bucket_id = 'profile-avatars'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

drop policy if exists "Users can manage own profile banners" on storage.objects;
create policy "Users can manage own profile banners"
on storage.objects for all
to authenticated
using (
  bucket_id = 'profile-banners'
  and (storage.foldername(name))[1] = (auth.uid())::text
)
with check (
  bucket_id = 'profile-banners'
  and (storage.foldername(name))[1] = (auth.uid())::text
);

alter table public.recommendation_impressions
  add column if not exists request_id uuid,
  add column if not exists rank integer,
  add column if not exists score_components jsonb not null default '{}'::jsonb,
  add column if not exists algorithm_version text not null default 'nexo-rank-2.0.0';

alter table public.nexo_conversations
  add column if not exists last_accessed_at timestamptz not null default now();

create unique index if not exists recommendation_impressions_request_rank_idx
  on public.recommendation_impressions (request_id, rank)
  where request_id is not null and rank is not null;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  user_id uuid references auth.users(id) on delete cascade,
  anonymous_id text,
  session_id text not null,
  event_name text not null,
  entity_type text,
  entity_id uuid,
  route_key text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint analytics_events_identity_check check (user_id is not null or nullif(anonymous_id, '') is not null),
  constraint analytics_events_name_check check (event_name = any (array[
    'NEXO_OPENED', 'NEXO_MESSAGE_SENT', 'NEXO_INTENT_CLASSIFIED',
    'RECOMMENDATION_IMPRESSION', 'RECOMMENDATION_CLICK', 'BEAT_PLAY',
    'BEAT_COMPLETED', 'PROFILE_OPENED', 'FOLLOW', 'SAVE', 'ADD_TO_CART',
    'CHECKOUT_STARTED', 'PURCHASE_COMPLETED', 'RECOMMENDATION_DISMISSED'
  ]))
);

create table if not exists public.recommendation_interactions (
  id uuid primary key default gen_random_uuid(),
  impression_id uuid not null references public.recommendation_impressions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  action text not null,
  dwell_ms integer check (dwell_ms is null or dwell_ms >= 0),
  idempotency_key text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.content_metrics_daily (
  entity_type text not null,
  entity_id uuid not null,
  date date not null,
  views integer not null default 0,
  unique_users integer not null default 0,
  plays integer not null default 0,
  completions integer not null default 0,
  saves integer not null default 0,
  follows integer not null default 0,
  cart_adds integer not null default 0,
  purchases integer not null default 0,
  revenue_cents bigint not null default 0,
  skips integer not null default 0,
  primary key (entity_type, entity_id, date)
);

create table if not exists public.content_trend_scores (
  entity_type text not null,
  entity_id uuid not null,
  score numeric not null default 0,
  metric_window text not null,
  sample_size integer not null default 0,
  calculated_at timestamptz not null default now(),
  primary key (entity_type, entity_id, metric_window)
);

create table if not exists public.user_preference_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  genres jsonb not null default '{}'::jsonb,
  moods jsonb not null default '{}'::jsonb,
  price_range jsonb not null default '{}'::jsonb,
  license_types jsonb not null default '{}'::jsonb,
  negative_signals jsonb not null default '{}'::jsonb,
  consented_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists analytics_events_user_created_idx on public.analytics_events (user_id, created_at desc);
create index if not exists analytics_events_session_created_idx on public.analytics_events (session_id, created_at desc);
create index if not exists analytics_events_entity_created_idx on public.analytics_events (entity_type, entity_id, created_at desc);
create index if not exists recommendation_interactions_impression_idx on public.recommendation_interactions (impression_id, created_at);
create index if not exists content_metrics_daily_entity_idx on public.content_metrics_daily (entity_type, entity_id, date desc);
create index if not exists content_trend_scores_window_idx on public.content_trend_scores (metric_window, score desc, calculated_at desc);

alter table public.analytics_events enable row level security;
alter table public.recommendation_interactions enable row level security;
alter table public.content_metrics_daily enable row level security;
alter table public.content_trend_scores enable row level security;
alter table public.user_preference_profiles enable row level security;

create policy "Users read own NEXO analytics" on public.analytics_events
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users insert own NEXO analytics" on public.analytics_events
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Users read own recommendation interactions" on public.recommendation_interactions
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users insert own recommendation interactions" on public.recommendation_interactions
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Authenticated users read aggregate content metrics" on public.content_metrics_daily
  for select to authenticated using (true);
create policy "Authenticated users read trend scores" on public.content_trend_scores
  for select to authenticated using (true);
create policy "Users manage own NEXO preferences" on public.user_preference_profiles
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

grant select, insert on public.analytics_events to authenticated;
grant select, insert on public.recommendation_interactions to authenticated;
grant select on public.content_metrics_daily, public.content_trend_scores to authenticated;
grant select, insert, update on public.user_preference_profiles to authenticated;

create table if not exists public.user_onboarding_quiz (
  user_id uuid primary key references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_onboarding_quiz enable row level security;

drop policy if exists "Users read own onboarding quiz" on public.user_onboarding_quiz;
create policy "Users read own onboarding quiz" on public.user_onboarding_quiz
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "Users insert own onboarding quiz" on public.user_onboarding_quiz;
create policy "Users insert own onboarding quiz" on public.user_onboarding_quiz
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "Users update own onboarding quiz" on public.user_onboarding_quiz;
create policy "Users update own onboarding quiz" on public.user_onboarding_quiz
  for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

grant select, insert, update on public.user_onboarding_quiz to authenticated;

create or replace function public.complete_onboarding_quiz(p_answers jsonb)
returns public.profiles
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_user_id uuid := (select auth.uid());
  completed_profile public.profiles;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  if p_answers is null
    or jsonb_typeof(coalesce(p_answers -> 'genres', 'null'::jsonb)) <> 'array'
    or jsonb_array_length(p_answers -> 'genres') = 0
    or nullif(trim(p_answers ->> 'objective'), '') is null
    or nullif(trim(p_answers ->> 'stage'), '') is null
    or jsonb_typeof(coalesce(p_answers -> 'vibes', 'null'::jsonb)) <> 'array'
    or jsonb_array_length(p_answers -> 'vibes') = 0
    or nullif(trim(p_answers ->> 'budget'), '') is null
    or nullif(trim(p_answers ->> 'userType'), '') is null
  then raise exception 'Required onboarding answers are missing';
  end if;

  insert into public.user_onboarding_quiz (user_id, answers, completed_at, updated_at)
  values (current_user_id, p_answers, now(), now())
  on conflict (user_id) do update set answers = excluded.answers, completed_at = excluded.completed_at, updated_at = excluded.updated_at;

  insert into public.user_preference_profiles (user_id, genres, moods, price_range, license_types, consented_at, updated_at)
  values (
    current_user_id,
    jsonb_build_object('selected', p_answers -> 'genres'),
    jsonb_build_object('selected', p_answers -> 'vibes'),
    jsonb_build_object('label', p_answers ->> 'budget'),
    jsonb_build_object('objective', p_answers ->> 'objective', 'stage', p_answers ->> 'stage', 'userType', p_answers ->> 'userType', 'references', coalesce(p_answers ->> 'references', '')),
    now(), now()
  )
  on conflict (user_id) do update set
    genres = excluded.genres, moods = excluded.moods, price_range = excluded.price_range,
    license_types = excluded.license_types,
    consented_at = coalesce(public.user_preference_profiles.consented_at, excluded.consented_at),
    updated_at = excluded.updated_at;

  update public.profiles set
    quiz_completed = true,
    quiz_completed_at = now(),
    music_styles = array(select jsonb_array_elements_text(p_answers -> 'genres')),
    onboarding_goal = p_answers ->> 'objective',
    updated_at = now()
  where id = current_user_id returning * into completed_profile;
  if completed_profile.id is null then raise exception 'Profile not found'; end if;
  return completed_profile;
end;
$$;

revoke execute on function public.complete_onboarding_quiz(jsonb) from public, anon;
grant execute on function public.complete_onboarding_quiz(jsonb) to authenticated;

create or replace function public.reset_expired_nexo_history()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  expired boolean;
begin
  select exists (
    select 1 from public.nexo_conversations
    where user_id = (select auth.uid())
      and greatest(updated_at, last_accessed_at) < now() - interval '6 hours'
  ) into expired;

  if expired then
    delete from public.nexo_conversations
    where user_id = (select auth.uid());
  end if;
  update public.nexo_conversations
  set last_accessed_at = now()
  where user_id = (select auth.uid());
  return expired;
end;
$$;

revoke all on function public.reset_expired_nexo_history() from public, anon;
grant execute on function public.reset_expired_nexo_history() to authenticated;

-- Beat licenses and order foundation (kept in sync with 20260617080000_beat_licenses.sql).

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
  terms_config jsonb not null default '{}'::jsonb,
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

-- Secure checkout payments (kept in sync with 20260620190000_secure_checkout_payments.sql).

-- Authoritative checkout, coupons, provider reconciliation and seller receivables.

alter table public.orders add column if not exists subtotal_cents integer not null default 0 check (subtotal_cents >= 0);
alter table public.orders add column if not exists discount_cents integer not null default 0 check (discount_cents >= 0);
alter table public.orders add column if not exists service_fee_cents integer not null default 0 check (service_fee_cents >= 0);
alter table public.orders add column if not exists payment_provider text;
alter table public.orders add column if not exists payment_method text;
alter table public.orders add column if not exists provider_payment_id text;
create unique index if not exists orders_provider_payment_unique
on public.orders (payment_provider, provider_payment_id)
where provider_payment_id is not null;

create table if not exists public.checkout_coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code = upper(code) and length(code) between 3 and 40),
  seller_id uuid references auth.users(id) on delete cascade,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  discount_value integer not null check (discount_value > 0),
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions integer check (max_redemptions is null or max_redemptions > 0),
  per_user_limit integer not null default 1 check (per_user_limit > 0),
  redemption_count integer not null default 0 check (redemption_count >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint checkout_coupons_window check (ends_at is null or starts_at is null or ends_at > starts_at),
  constraint checkout_coupon_percent check (discount_type <> 'percent' or discount_value <= 100)
);

alter table public.checkout_coupons enable row level security;
drop policy if exists "Active coupons are not publicly enumerable" on public.checkout_coupons;
create policy "Active coupons are not publicly enumerable"
on public.checkout_coupons for select to authenticated
using (false);

create table if not exists public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  buyer_name text not null,
  buyer_email text not null,
  provider text not null default 'mercado_pago' check (provider in ('mercado_pago', 'paypal')),
  method text not null check (method in ('pix', 'card', 'paypal', 'mercado_pago')),
  provider_payment_id text,
  external_reference text not null unique,
  idempotency_key text not null unique,
  cart_fingerprint text not null,
  cart_items jsonb not null check (jsonb_typeof(cart_items) = 'array'),
  coupon_id uuid references public.checkout_coupons(id) on delete set null,
  subtotal_cents integer not null check (subtotal_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  service_fee_cents integer not null default 0 check (service_fee_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  status text not null default 'created' check (status in ('created', 'pending', 'in_process', 'approved', 'rejected', 'cancelled', 'expired', 'refunded')),
  status_detail text,
  order_id uuid references public.orders(id) on delete set null,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payment_attempts_provider_payment_unique
on public.payment_attempts (provider, provider_payment_id)
where provider_payment_id is not null;
create index if not exists payment_attempts_buyer_created_idx on public.payment_attempts (buyer_id, created_at desc);
create index if not exists payment_attempts_status_idx on public.payment_attempts (status, updated_at desc);
alter table public.payment_attempts enable row level security;
drop policy if exists "Buyers can read own payment attempts" on public.payment_attempts;
create policy "Buyers can read own payment attempts"
on public.payment_attempts for select to authenticated
using (buyer_id = auth.uid());

create table if not exists public.coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references public.checkout_coupons(id) on delete restrict,
  buyer_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  discount_cents integer not null check (discount_cents >= 0),
  created_at timestamptz not null default now(),
  unique (coupon_id, order_id)
);
create index if not exists coupon_redemptions_user_idx on public.coupon_redemptions (coupon_id, buyer_id);
alter table public.coupon_redemptions enable row level security;
drop policy if exists "Buyers can read own coupon redemptions" on public.coupon_redemptions;
create policy "Buyers can read own coupon redemptions"
on public.coupon_redemptions for select to authenticated
using (buyer_id = auth.uid());

create table if not exists public.seller_ledger_entries (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references auth.users(id) on delete restrict,
  order_id uuid not null references public.orders(id) on delete cascade,
  order_item_id uuid references public.order_items(id) on delete cascade,
  gross_cents integer not null check (gross_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  net_cents integer not null check (net_cents >= 0),
  status text not null default 'available' check (status in ('pending', 'available', 'paid', 'reversed')),
  available_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (order_id, order_item_id)
);
create index if not exists seller_ledger_seller_idx on public.seller_ledger_entries (seller_id, status, created_at desc);
alter table public.seller_ledger_entries enable row level security;
drop policy if exists "Sellers can read own ledger" on public.seller_ledger_entries;
create policy "Sellers can read own ledger"
on public.seller_ledger_entries for select to authenticated
using (seller_id = auth.uid());

create or replace function public.finalize_checkout_payment(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt public.payment_attempts%rowtype;
  v_checkout_items jsonb;
  v_checkout_result jsonb;
  v_order_id uuid;
  v_item jsonb;
  v_order_item_id uuid;
  v_seller_id uuid;
  v_gross integer;
  v_discount integer;
begin
  select * into v_attempt
  from public.payment_attempts
  where id = p_attempt_id
  for update;

  if not found then raise exception 'Tentativa de pagamento nao encontrada.'; end if;
  if v_attempt.order_id is not null then
    return jsonb_build_object('order_id', v_attempt.order_id, 'status', 'completed', 'idempotent', true);
  end if;
  if v_attempt.status <> 'approved' then raise exception 'Pagamento ainda nao aprovado.'; end if;

  select jsonb_agg(jsonb_build_object('beat_id', value->>'beat_id', 'license_id', value->>'license_id'))
  into v_checkout_items
  from jsonb_array_elements(v_attempt.cart_items);

  v_checkout_result := public.process_checkout(v_attempt.buyer_id, v_attempt.buyer_name, v_attempt.buyer_email, v_checkout_items);
  v_order_id := (v_checkout_result->>'order_id')::uuid;

  update public.orders
  set subtotal_cents = v_attempt.subtotal_cents,
      discount_cents = v_attempt.discount_cents,
      service_fee_cents = v_attempt.service_fee_cents,
      total_cents = v_attempt.total_cents,
      payment_provider = v_attempt.provider,
      payment_method = v_attempt.method,
      provider_payment_id = v_attempt.provider_payment_id,
      status = 'completed'
  where id = v_order_id;

  for v_item in select * from jsonb_array_elements(v_attempt.cart_items) loop
    select oi.id, b.user_id into v_order_item_id, v_seller_id
    from public.order_items oi
    join public.beats b on b.id = oi.beat_id
    where oi.order_id = v_order_id and oi.beat_id = (v_item->>'beat_id')::uuid
    order by oi.created_at desc limit 1;
    v_gross := greatest(0, coalesce((v_item->>'price_cents')::integer, 0));
    v_discount := least(v_gross, greatest(0, coalesce((v_item->>'discount_cents')::integer, 0)));
    insert into public.seller_ledger_entries (seller_id, order_id, order_item_id, gross_cents, discount_cents, net_cents)
    values (v_seller_id, v_order_id, v_order_item_id, v_gross, v_discount, v_gross - v_discount)
    on conflict (order_id, order_item_id) do nothing;
  end loop;

  if v_attempt.coupon_id is not null then
    insert into public.coupon_redemptions (coupon_id, buyer_id, order_id, discount_cents)
    values (v_attempt.coupon_id, v_attempt.buyer_id, v_order_id, v_attempt.discount_cents)
    on conflict (coupon_id, order_id) do nothing;
    update public.checkout_coupons set redemption_count = redemption_count + 1, updated_at = now()
    where id = v_attempt.coupon_id;
  end if;

  update public.payment_attempts set order_id = v_order_id, updated_at = now() where id = p_attempt_id;
  return jsonb_build_object('order_id', v_order_id, 'status', 'completed', 'idempotent', false);
end;
$$;

revoke execute on function public.process_checkout(uuid, text, text, jsonb) from public, anon, authenticated;
revoke execute on function public.finalize_checkout_payment(uuid) from public, anon, authenticated;
grant execute on function public.finalize_checkout_payment(uuid) to service_role;

-- Secure checkout foreign-key indexes (20260620203000_secure_checkout_indexes.sql).
create index if not exists checkout_coupons_seller_idx on public.checkout_coupons (seller_id);
create index if not exists payment_attempts_coupon_idx on public.payment_attempts (coupon_id);
create index if not exists payment_attempts_order_idx on public.payment_attempts (order_id);
create index if not exists coupon_redemptions_buyer_idx on public.coupon_redemptions (buyer_id);
create index if not exists coupon_redemptions_order_idx on public.coupon_redemptions (order_id);
create index if not exists seller_ledger_order_idx on public.seller_ledger_entries (order_id);
create index if not exists seller_ledger_order_item_idx on public.seller_ledger_entries (order_item_id);

-- Purchases Member Area schema extensions
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

create index if not exists purchase_entitlements_buyer_status_idx on public.purchase_entitlements (buyer_id, status);
create index if not exists purchase_entitlements_beat_idx on public.purchase_entitlements (beat_id);

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

create index if not exists license_documents_buyer_idx on public.license_documents (buyer_id);
create index if not exists license_documents_producer_idx on public.license_documents (producer_id);
create index if not exists license_documents_order_item_idx on public.license_documents (order_item_id);

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

create index if not exists download_logs_buyer_idx on public.download_logs (buyer_id);
create index if not exists download_logs_beat_idx on public.download_logs (beat_id);

alter table public.purchase_entitlements enable row level security;
alter table public.license_documents enable row level security;
alter table public.download_logs enable row level security;

-- Policies for purchase_entitlements
drop policy if exists "Users can read own entitlements" on public.purchase_entitlements;
create policy "Users can read own entitlements"
on public.purchase_entitlements for select to authenticated
using (buyer_id = auth.uid());

drop policy if exists "Producers can read entitlements for their beats" on public.purchase_entitlements;
create policy "Producers can read entitlements for their beats"
on public.purchase_entitlements for select to authenticated
using (exists (
  select 1 from public.beats b
  where b.id = beat_id and b.user_id = auth.uid()
));

-- Policies for license_documents
drop policy if exists "Buyers can read own license documents" on public.license_documents;
create policy "Buyers can read own license documents"
on public.license_documents for select to authenticated
using (buyer_id = auth.uid());

drop policy if exists "Producers can read own sold license documents" on public.license_documents;
create policy "Producers can read own sold license documents"
on public.license_documents for select to authenticated
using (producer_id = auth.uid());

-- Policies for download_logs
drop policy if exists "Buyers can read own download logs" on public.download_logs;
create policy "Buyers can read own download logs"
on public.download_logs for select to authenticated
using (buyer_id = auth.uid());

grant select on public.purchase_entitlements to authenticated;
grant select on public.license_documents to authenticated;
grant select on public.download_logs to authenticated;

-- Function to generate contract text in SQL
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

-- Trigger to automatically create entitlements and generate contracts on completion, and revoke on refund
create or replace function public.manage_purchase_entitlements()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item record;
  v_producer_id uuid;
  v_beat_title text;
  v_producer_name text;
  v_contract_text text;
begin
  if new.status = 'completed' and (old.status is null or old.status <> 'completed') then
    for v_item in 
      select oi.id, oi.beat_id, oi.license_id, oi.license_name_snapshot, oi.files_included_snapshot, 
             oi.buyer_royalty_snapshot, oi.producer_royalty_snapshot, oi.license_terms_snapshot,
             b.user_id as producer_id, b.title as beat_title, 
             coalesce(b.producer_name, p.artistic_name, p.full_name, 'Produtor ANSEND') as producer_name
      from public.order_items oi
      join public.beats b on b.id = oi.beat_id
      left join public.profiles p on p.id = b.user_id
      where oi.order_id = new.id
    loop
      -- 1. Create access right / entitlement if it doesn't exist
      insert into public.purchase_entitlements (
        buyer_id, order_id, order_item_id, beat_id, license_id, status, allowed_files
      ) values (
        new.buyer_id, new.id, v_item.id, v_item.beat_id, v_item.license_id, 'active', v_item.files_included_snapshot
      ) on conflict do nothing;

      -- 2. Create contract document
      v_contract_text := public.generate_contract_text_sql(
        v_item.beat_title,
        v_item.producer_name,
        new.buyer_name,
        v_item.license_name_snapshot,
        coalesce(v_item.buyer_royalty_snapshot, 50),
        coalesce(v_item.producer_royalty_snapshot, 50),
        'Ilimitados',
        v_item.files_included_snapshot,
        to_char(new.created_at, 'DD/MM/YYYY'),
        new.id
      );

      insert into public.license_documents (
        buyer_id, producer_id, order_id, order_item_id, beat_id, license_id, contract_number, contract_text
      ) values (
        new.buyer_id, v_item.producer_id, new.id, v_item.id, v_item.beat_id, v_item.license_id,
        'CTR-' || to_char(new.created_at, 'YYYYMMDD') || '-' || substring(v_item.id::text from 1 for 8),
        v_contract_text
      ) on conflict do nothing;
    end loop;

  elsif new.status = 'refunded' and old.status = 'completed' then
    -- Revoke entitlements for this order
    update public.purchase_entitlements
    set status = 'revoked',
        revoked_at = now(),
        revocation_reason = 'Payment refunded'
    where order_id = new.id;
  end if;

  return new;
end;
$$;

drop trigger if exists manage_purchase_entitlements_trigger on public.orders;
create trigger manage_purchase_entitlements_trigger
after insert or update of status on public.orders
for each row
execute function public.manage_purchase_entitlements();


-- Phase 2 consolidated purchase lifecycle schema sync.

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


-- Phase 2 atomic purchase finalization.
-- The old order-status trigger no longer creates entitlements before order_items exist.

drop trigger if exists manage_purchase_entitlements_trigger on public.orders;

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
stable
set search_path = public
as $$
begin
  return 'CONTRATO DE LICENCA DE USO DE BEAT/PRODUCAO MUSICAL

Este contrato regula a licenca de exploracao comercial do Beat intitulado "' || coalesce(p_beat_title, 'Beat ANSEND') || '", produzido por ' || coalesce(p_producer_name, 'Produtor ANSEND') || ', doravante denominado "PRODUTOR", adquirido por ' || coalesce(p_buyer_name, 'Comprador ANSEND') || ', doravante denominado "LICENCIADO", nas condicoes estabelecidas sob a licenca "' || coalesce(p_license_name, 'Licenca ANSEND') || '".

1. CONCESSAO E USO
1.1. O PRODUTOR concede ao LICENCIADO uma licenca de uso do Beat conforme os termos historicos capturados no momento da compra.
1.2. Esta licenca e outorgada em carater ' || case when coalesce(p_license_name, '') ilike '%exclusive%' then 'EXCLUSIVO' else 'NAO EXCLUSIVO' end || '.

2. LIMITES E ROYALTIES
2.1. Royalties da Composicao/Master: ' || coalesce(p_royalty_buyer, 0) || '% para o LICENCIADO e ' || coalesce(p_royalty_producer, 0) || '% para o PRODUTOR.
2.2. Streams Digitais: ' || coalesce(nullif(p_stream_limit, ''), 'conforme snapshot da licenca') || '.

3. ARQUIVOS ENTREGUES
O PRODUTOR entrega os arquivos: ' || coalesce(nullif(p_included_files, ''), 'conforme licenca adquirida') || '.

4. DECLARACAO DE ACEITE
O LICENCIADO declara ter lido, compreendido e aceitado os termos deste contrato em ' || coalesce(p_date_string, to_char(now(), 'DD/MM/YYYY')) || '.

Identificador do Pedido: ' || p_order_id::text || '
Gerado eletronicamente na confirmacao do pagamento pela ANSEND.';
end;
$$;

create or replace function public.provision_purchase_delivery(p_order_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_item record;
  v_item_count integer := 0;
  v_entitlement_count integer := 0;
  v_document_count integer := 0;
  v_allowed_files text;
  v_stream_limit text;
  v_contract_text text;
begin
  select * into v_order
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Pedido nao encontrado.';
  end if;

  if v_order.status <> 'pending' then
    raise exception 'Pedido precisa estar pendente para provisionamento atomico.';
  end if;

  select count(*) into v_item_count
  from public.order_items
  where order_id = p_order_id;

  if v_item_count = 0 then
    raise exception 'Pedido sem itens nao pode gerar direitos.';
  end if;

  for v_item in
    select *
    from public.order_items
    where order_id = p_order_id
    order by created_at, id
  loop
    v_allowed_files := coalesce(nullif(v_item.files_included_snapshot, ''), '');
    v_stream_limit := case
      when coalesce((v_item.license_rights_snapshot->>'unlimited_streams')::boolean, false) then 'Ilimitados'
      when nullif(v_item.license_rights_snapshot->>'stream_limit', '') is not null then v_item.license_rights_snapshot->>'stream_limit'
      else 'conforme snapshot da licenca'
    end;

    insert into public.purchase_entitlements (
      buyer_id, order_id, order_item_id, beat_id, license_id, status,
      allowed_files, download_limit, phase2_enforce_unique, source
    ) values (
      v_order.buyer_id, v_order.id, v_item.id, v_item.beat_id, v_item.license_id, 'active',
      v_allowed_files, null, true, 'phase2'
    )
    on conflict (order_item_id) where order_item_id is not null and phase2_enforce_unique is true
    do update set
      status = 'active',
      revoked_at = null,
      revocation_reason = null,
      allowed_files = excluded.allowed_files,
      source = 'phase2';

    v_contract_text := public.generate_contract_text_sql(
      coalesce(v_item.beat_title_snapshot, 'Beat ANSEND'),
      coalesce(v_item.producer_name_snapshot, 'Produtor ANSEND'),
      v_order.buyer_name,
      v_item.license_name_snapshot,
      coalesce(v_item.buyer_royalty_snapshot, 0),
      coalesce(v_item.producer_royalty_snapshot, 0),
      v_stream_limit,
      v_allowed_files,
      to_char(coalesce(v_order.completed_at, v_order.created_at), 'DD/MM/YYYY'),
      v_order.id
    );

    insert into public.license_documents (
      buyer_id, producer_id, order_id, order_item_id, beat_id, license_id,
      contract_number, contract_text, contract_version, phase2_enforce_unique, source
    ) values (
      v_order.buyer_id,
      coalesce(v_item.producer_id_snapshot, '00000000-0000-0000-0000-000000000000'::uuid),
      v_order.id,
      v_item.id,
      v_item.beat_id,
      v_item.license_id,
      'CTR-' || to_char(coalesce(v_order.completed_at, v_order.created_at), 'YYYYMMDD') || '-' || substring(v_item.id::text from 1 for 8),
      v_contract_text,
      coalesce(v_item.accepted_contract_version, '1.0'),
      true,
      'phase2'
    )
    on conflict (order_item_id) where order_item_id is not null and phase2_enforce_unique is true
    do update set
      contract_text = excluded.contract_text,
      contract_version = excluded.contract_version,
      source = 'phase2',
      updated_at = now();
  end loop;

  select count(*) into v_entitlement_count
  from public.purchase_entitlements
  where order_id = p_order_id and status = 'active';

  select count(*) into v_document_count
  from public.license_documents
  where order_id = p_order_id;

  if v_entitlement_count <> v_item_count or v_document_count <> v_item_count then
    raise exception 'Provisionamento incompleto: itens %, direitos %, contratos %.', v_item_count, v_entitlement_count, v_document_count;
  end if;

  return jsonb_build_object(
    'order_id', p_order_id,
    'items', v_item_count,
    'entitlements', v_entitlement_count,
    'documents', v_document_count
  );
end;
$$;

create or replace function public.process_checkout(
  p_buyer_id uuid,
  p_buyer_name text,
  p_buyer_email text,
  p_cart_items jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_item jsonb;
  v_beat record;
  v_license record;
  v_total_cents integer := 0;
  v_files_snapshot text;
  v_file_manifest jsonb;
  v_rights_snapshot jsonb;
begin
  if jsonb_typeof(p_cart_items) <> 'array' or jsonb_array_length(p_cart_items) = 0 then
    raise exception 'Carrinho vazio.';
  end if;

  perform id
  from public.beats
  where id in (select (value->>'beat_id')::uuid from jsonb_array_elements(p_cart_items))
  order by id
  for update;

  for v_item in select * from jsonb_array_elements(p_cart_items) loop
    select * into v_beat
    from public.beats
    where id = (v_item->>'beat_id')::uuid
    for update;

    if not found then raise exception 'Beat nao encontrado.'; end if;
    if v_beat.sold_exclusively then raise exception 'O beat "%" ja foi vendido exclusivamente.', v_beat.title; end if;
    if v_beat.status <> 'published' then raise exception 'O beat "%" nao esta mais disponivel para venda.', v_beat.title; end if;

    select * into v_license
    from public.beat_licenses
    where id = (v_item->>'license_id')::uuid
      and beat_id = v_beat.id
      and is_active = true
    for update;

    if not found then raise exception 'Licenca indisponivel para "%".', v_beat.title; end if;
    v_total_cents := v_total_cents + v_license.price_cents;
  end loop;

  insert into public.orders (
    buyer_id, total_cents, status, buyer_name, buyer_email, buyer_identity_snapshot
  ) values (
    p_buyer_id,
    v_total_cents,
    'pending',
    p_buyer_name,
    p_buyer_email,
    jsonb_strip_nulls(jsonb_build_object('name', p_buyer_name, 'email', p_buyer_email))
  )
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_cart_items) loop
    select * into v_beat
    from public.beats
    where id = (v_item->>'beat_id')::uuid
    for update;

    select * into v_license
    from public.beat_licenses
    where id = (v_item->>'license_id')::uuid
      and beat_id = v_beat.id
      and is_active = true
    for update;

    v_files_snapshot := concat_ws(', ',
      case when v_license.included_mp3 then 'MP3' end,
      case when v_license.included_wav then 'WAV' end,
      case when v_license.included_stems then 'Stems' end
    );

    v_file_manifest := jsonb_strip_nulls(jsonb_build_object(
      'mp3', v_license.included_mp3,
      'wav', v_license.included_wav,
      'stems', v_license.included_stems,
      'formats', array_remove(array[
        case when v_license.included_mp3 then 'mp3' end,
        case when v_license.included_wav then 'wav' end,
        case when v_license.included_stems then 'stems' end
      ], null)
    ));

    v_rights_snapshot := jsonb_strip_nulls(jsonb_build_object(
      'stream_limit', v_license.stream_limit,
      'unlimited_streams', v_license.unlimited_streams,
      'music_video_limit', v_license.music_video_limit,
      'unlimited_music_videos', v_license.unlimited_music_videos,
      'commercial_use', v_license.commercial_use,
      'monetization_allowed', v_license.monetization_allowed,
      'live_performance_allowed', v_license.live_performance_allowed,
      'content_id_allowed', v_license.content_id_allowed,
      'credit_required', v_license.credit_required,
      'credit_text', v_license.credit_text,
      'duration', v_license.duration,
      'territory', v_license.territory,
      'custom_terms', v_license.custom_terms,
      'is_exclusive', v_license.is_exclusive
    ));

    insert into public.order_items (
      order_id, beat_id, license_id, license_name_snapshot, license_terms_snapshot,
      price_cents_snapshot, buyer_royalty_snapshot, producer_royalty_snapshot, files_included_snapshot,
      beat_title_snapshot, beat_cover_url_snapshot, producer_id_snapshot, producer_name_snapshot,
      license_key_snapshot, currency_snapshot, license_rights_snapshot, file_manifest_snapshot
    ) values (
      v_order_id, v_beat.id, v_license.id, v_license.name, coalesce(v_license.custom_terms, v_license.description),
      v_license.price_cents, v_license.buyer_royalty_percentage, v_license.producer_royalty_percentage, v_files_snapshot,
      v_beat.title, v_beat.cover_url, v_beat.user_id,
      coalesce(v_beat.producer_name, 'Produtor ANSEND'),
      v_license.license_key, v_license.currency, v_rights_snapshot, v_file_manifest
    );

    if v_license.is_exclusive then
      update public.beats
      set sold_exclusively = true,
          exclusive_buyer_id = p_buyer_id,
          status = 'sold'
      where id = v_beat.id;

      update public.beat_licenses
      set is_active = false
      where beat_id = v_beat.id;
    end if;
  end loop;

  return jsonb_build_object('order_id', v_order_id, 'total_cents', v_total_cents, 'status', 'pending');
end;
$$;

create or replace function public.finalize_checkout_payment(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt public.payment_attempts%rowtype;
  v_checkout_items jsonb;
  v_checkout_result jsonb;
  v_delivery_result jsonb;
  v_order_id uuid;
  v_item jsonb;
  v_order_item_id uuid;
  v_seller_id uuid;
  v_gross integer;
  v_discount integer;
  v_expected_items integer;
  v_actual_items integer;
begin
  select * into v_attempt
  from public.payment_attempts
  where id = p_attempt_id
  for update;

  if not found then raise exception 'Tentativa de pagamento nao encontrada.'; end if;
  if v_attempt.status <> 'approved' then raise exception 'Pagamento ainda nao aprovado.'; end if;

  if v_attempt.order_id is not null then
    select count(*) into v_actual_items from public.order_items where order_id = v_attempt.order_id;
    if v_actual_items = 0 then raise exception 'Pedido pago sem itens bloqueado para evitar entrega parcial.'; end if;
    return jsonb_build_object('order_id', v_attempt.order_id, 'status', 'completed', 'idempotent', true);
  end if;

  select jsonb_agg(jsonb_build_object('beat_id', value->>'beat_id', 'license_id', value->>'license_id'))
  into v_checkout_items
  from jsonb_array_elements(v_attempt.cart_items);

  v_expected_items := jsonb_array_length(v_checkout_items);
  v_checkout_result := public.process_checkout(v_attempt.buyer_id, v_attempt.buyer_name, v_attempt.buyer_email, v_checkout_items);
  v_order_id := (v_checkout_result->>'order_id')::uuid;

  select count(*) into v_actual_items from public.order_items where order_id = v_order_id;
  if v_actual_items <> v_expected_items then
    raise exception 'Pedido criado parcialmente: esperado %, criado %.', v_expected_items, v_actual_items;
  end if;

  for v_item in select * from jsonb_array_elements(v_attempt.cart_items) loop
    select oi.id, coalesce(oi.producer_id_snapshot, b.user_id) into v_order_item_id, v_seller_id
    from public.order_items oi
    left join public.beats b on b.id = oi.beat_id
    where oi.order_id = v_order_id and oi.beat_id = (v_item->>'beat_id')::uuid
    order by oi.created_at desc limit 1;

    if v_order_item_id is null or v_seller_id is null then
      raise exception 'Item do pedido sem produtor ou identificador.';
    end if;

    v_gross := greatest(0, coalesce((v_item->>'price_cents')::integer, 0));
    v_discount := least(v_gross, greatest(0, coalesce((v_item->>'discount_cents')::integer, 0)));

    insert into public.seller_ledger_entries (seller_id, order_id, order_item_id, gross_cents, discount_cents, net_cents)
    values (v_seller_id, v_order_id, v_order_item_id, v_gross, v_discount, v_gross - v_discount)
    on conflict (order_id, order_item_id) do nothing;
  end loop;

  update public.orders
  set subtotal_cents = v_attempt.subtotal_cents,
      discount_cents = v_attempt.discount_cents,
      service_fee_cents = v_attempt.service_fee_cents,
      total_cents = v_attempt.total_cents,
      payment_provider = v_attempt.provider,
      payment_method = v_attempt.method,
      provider_payment_id = v_attempt.provider_payment_id,
      completed_at = coalesce(completed_at, now())
  where id = v_order_id;

  v_delivery_result := public.provision_purchase_delivery(v_order_id);

  update public.orders
  set status = 'completed', updated_at = now()
  where id = v_order_id;

  if v_attempt.coupon_id is not null then
    insert into public.coupon_redemptions (coupon_id, buyer_id, order_id, discount_cents)
    values (v_attempt.coupon_id, v_attempt.buyer_id, v_order_id, v_attempt.discount_cents)
    on conflict (coupon_id, order_id) do nothing;

    update public.checkout_coupons
    set redemption_count = redemption_count + 1, updated_at = now()
    where id = v_attempt.coupon_id;
  end if;

  update public.payment_attempts
  set order_id = v_order_id, updated_at = now()
  where id = p_attempt_id;

  return jsonb_build_object('order_id', v_order_id, 'status', 'completed', 'idempotent', false, 'delivery', v_delivery_result);
end;
$$;

create or replace function public.manage_purchase_entitlements()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'refunded' and old.status = 'completed' then
    update public.purchase_entitlements
    set status = 'revoked',
        revoked_at = now(),
        revocation_reason = 'Payment refunded'
    where order_id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists manage_purchase_entitlements_trigger on public.orders;
create trigger manage_purchase_entitlements_trigger
after update of status on public.orders
for each row
when (new.status = 'refunded' and old.status = 'completed')
execute function public.manage_purchase_entitlements();

revoke execute on function public.process_checkout(uuid, text, text, jsonb) from public, anon, authenticated;
revoke execute on function public.finalize_checkout_payment(uuid) from public, anon, authenticated;
revoke execute on function public.provision_purchase_delivery(uuid) from public, anon, authenticated;
grant execute on function public.finalize_checkout_payment(uuid) to service_role;


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


create table if not exists public.curator_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  public_name text not null,
  bio text,
  avatar_url text,
  country text,
  languages text[] not null default '{}'::text[],
  accepted_genres text[] not null default '{}'::text[],
  preferred_genres text[] not null default '{}'::text[],
  rejected_genres text[] not null default '{}'::text[],
  reference_artists text[] not null default '{}'::text[],
  curator_type text not null default 'playlist_curator' check (curator_type in ('playlist_curator', 'label', 'blog', 'radio', 'music_channel', 'a_and_r')),
  availability_status text not null default 'open' check (availability_status in ('open', 'limited', 'paused')),
  expected_response_days integer check (expected_response_days is null or (expected_response_days between 1 and 60)),
  application_status text not null default 'draft' check (application_status in ('draft', 'pending', 'approved', 'rejected', 'paused')),
  no_payola_confirmed_at timestamptz,
  terms_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.curator_playlists (
  id uuid primary key default gen_random_uuid(),
  curator_profile_id uuid not null references public.curator_profiles(id) on delete cascade,
  spotify_playlist_id text not null,
  spotify_url text not null,
  name text not null,
  description text,
  cover_url text,
  spotify_owner_id text,
  spotify_owner_name text,
  track_count integer check (track_count is null or track_count >= 0),
  genres text[] not null default '{}'::text[],
  subgenres text[] not null default '{}'::text[],
  languages text[] not null default '{}'::text[],
  priority_countries text[] not null default '{}'::text[],
  reference_artists text[] not null default '{}'::text[],
  rejected_styles text[] not null default '{}'::text[],
  allows_explicit boolean not null default false,
  accepts_instrumental boolean not null default true,
  daily_limit integer check (daily_limit is null or (daily_limit between 1 and 500)),
  is_accepting_submissions boolean not null default false,
  editorial_description text,
  notes text,
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'pending', 'verified', 'failed')),
  moderation_status text not null default 'draft' check (moderation_status in ('draft', 'pending', 'approved', 'rejected', 'paused')),
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists curator_playlists_profile_spotify_unique
on public.curator_playlists (curator_profile_id, spotify_playlist_id);
create index if not exists curator_profiles_user_idx on public.curator_profiles (user_id);
create index if not exists curator_profiles_status_idx on public.curator_profiles (application_status, updated_at desc);
create index if not exists curator_playlists_profile_status_idx on public.curator_playlists (curator_profile_id, moderation_status, updated_at desc);

drop trigger if exists curator_profiles_updated_at on public.curator_profiles;
create trigger curator_profiles_updated_at
before update on public.curator_profiles
for each row execute function public.set_updated_at();

drop trigger if exists curator_playlists_updated_at on public.curator_playlists;
create trigger curator_playlists_updated_at
before update on public.curator_playlists
for each row execute function public.set_updated_at();

alter table public.curator_profiles enable row level security;
alter table public.curator_playlists enable row level security;

drop policy if exists "Users can read own or approved curator profiles" on public.curator_profiles;
create policy "Users can read own or approved curator profiles"
on public.curator_profiles for select to authenticated
using (user_id = (select auth.uid()) or application_status = 'approved');

drop policy if exists "Users can insert own curator profile" on public.curator_profiles;
create policy "Users can insert own curator profile"
on public.curator_profiles for insert to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can update own curator profile" on public.curator_profiles;
create policy "Users can update own curator profile"
on public.curator_profiles for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "Users can delete own curator profile" on public.curator_profiles;
create policy "Users can delete own curator profile"
on public.curator_profiles for delete to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can read own or approved curator playlists" on public.curator_playlists;
create policy "Users can read own or approved curator playlists"
on public.curator_playlists for select to authenticated
using (
  exists (
    select 1 from public.curator_profiles cp
    where cp.id = curator_playlists.curator_profile_id
      and (cp.user_id = (select auth.uid()) or (cp.application_status = 'approved' and curator_playlists.moderation_status = 'approved'))
  )
);

drop policy if exists "Users can insert own curator playlists" on public.curator_playlists;
create policy "Users can insert own curator playlists"
on public.curator_playlists for insert to authenticated
with check (
  exists (
    select 1 from public.curator_profiles cp
    where cp.id = curator_playlists.curator_profile_id
      and cp.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can update own curator playlists" on public.curator_playlists;
create policy "Users can update own curator playlists"
on public.curator_playlists for update to authenticated
using (
  exists (
    select 1 from public.curator_profiles cp
    where cp.id = curator_playlists.curator_profile_id
      and cp.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.curator_profiles cp
    where cp.id = curator_playlists.curator_profile_id
      and cp.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can delete own curator playlists" on public.curator_playlists;
create policy "Users can delete own curator playlists"
on public.curator_playlists for delete to authenticated
using (
  exists (
    select 1 from public.curator_profiles cp
    where cp.id = curator_playlists.curator_profile_id
      and cp.user_id = (select auth.uid())
  )
);

grant select, insert, update, delete on public.curator_profiles to authenticated;
grant select, insert, update, delete on public.curator_playlists to authenticated;

alter table public.curator_playlists
  drop constraint if exists curator_playlists_verification_status_check;

alter table public.curator_playlists
  add constraint curator_playlists_verification_status_check
  check (verification_status in ('unverified', 'pending', 'verified', 'failed', 'access_lost'));

alter table public.curator_playlists
  add column if not exists spotify_connection_id uuid,
  add column if not exists spotify_snapshot_id text,
  add column if not exists spotify_public boolean,
  add column if not exists spotify_collaborative boolean,
  add column if not exists ownership_type text not null default 'unverified' check (ownership_type in ('owner', 'collaborator', 'followed', 'unverified', 'unknown')),
  add column if not exists verified_spotify_user_id text,
  add column if not exists verification_method text check (verification_method is null or verification_method in ('owner', 'collaborator_access')),
  add column if not exists verification_checked_at timestamptz,
  add column if not exists verified_at timestamptz,
  add column if not exists sync_enabled boolean not null default true,
  add column if not exists last_sync_status text not null default 'never_synced' check (last_sync_status in ('never_synced', 'queued', 'syncing', 'synced', 'partial', 'failed', 'access_lost')),
  add column if not exists last_sync_error_code text,
  add column if not exists last_sync_at timestamptz;

create table if not exists public.spotify_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  spotify_user_id text not null,
  spotify_display_name text,
  spotify_avatar_url text,
  country text,
  connection_status text not null default 'connected' check (connection_status in ('disconnected', 'connecting', 'connected', 'reconnect_required', 'revoked', 'error')),
  granted_scopes text[] not null default '{}'::text[],
  authorized_at timestamptz,
  access_token_expires_at timestamptz,
  last_refreshed_at timestamptz,
  last_synced_at timestamptz,
  reconnect_required_at timestamptz,
  disconnected_at timestamptz,
  last_error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.curator_playlists
  drop constraint if exists curator_playlists_spotify_connection_fk;
alter table public.curator_playlists
  add constraint curator_playlists_spotify_connection_fk
  foreign key (spotify_connection_id) references public.spotify_connections(id) on delete set null;

create table if not exists public.spotify_connection_secrets (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null unique references public.spotify_connections(id) on delete cascade,
  encrypted_access_token text not null,
  encrypted_refresh_token text not null,
  encryption_version text not null default 'v1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.spotify_oauth_states (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  state_hash text not null unique,
  return_path text not null default '#curadoria',
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.curator_playlist_snapshots (
  id uuid primary key default gen_random_uuid(),
  curator_playlist_id uuid not null references public.curator_playlists(id) on delete cascade,
  spotify_snapshot_id text not null,
  track_count integer check (track_count is null or track_count >= 0),
  captured_at timestamptz not null default now(),
  sync_source text not null default 'manual' check (sync_source in ('manual', 'import', 'scheduled')),
  created_at timestamptz not null default now(),
  unique (curator_playlist_id, spotify_snapshot_id)
);

create table if not exists public.spotify_sync_runs (
  id uuid primary key default gen_random_uuid(),
  spotify_connection_id uuid references public.spotify_connections(id) on delete set null,
  sync_type text not null check (sync_type in ('playlist', 'all', 'import', 'scheduled')),
  status text not null default 'syncing' check (status in ('queued', 'syncing', 'synced', 'partial', 'failed', 'access_lost')),
  playlists_requested integer not null default 0,
  playlists_updated integer not null default 0,
  playlists_failed integer not null default 0,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  error_code text,
  created_at timestamptz not null default now()
);

create index if not exists spotify_connections_user_idx on public.spotify_connections (user_id);
create index if not exists spotify_connections_status_idx on public.spotify_connections (connection_status, updated_at desc);
create index if not exists spotify_oauth_states_lookup_idx on public.spotify_oauth_states (state_hash, expires_at) where consumed_at is null;
create index if not exists curator_playlists_spotify_connection_idx on public.curator_playlists (spotify_connection_id);
create index if not exists curator_playlists_verification_idx on public.curator_playlists (verification_status, moderation_status, updated_at desc);
create index if not exists spotify_sync_runs_connection_idx on public.spotify_sync_runs (spotify_connection_id, created_at desc);

drop trigger if exists spotify_connections_updated_at on public.spotify_connections;
create trigger spotify_connections_updated_at
before update on public.spotify_connections
for each row execute function public.set_updated_at();

drop trigger if exists spotify_connection_secrets_updated_at on public.spotify_connection_secrets;
create trigger spotify_connection_secrets_updated_at
before update on public.spotify_connection_secrets
for each row execute function public.set_updated_at();

alter table public.spotify_connections enable row level security;
alter table public.spotify_connection_secrets enable row level security;
alter table public.spotify_oauth_states enable row level security;
alter table public.curator_playlist_snapshots enable row level security;
alter table public.spotify_sync_runs enable row level security;

drop policy if exists "Users can read own Spotify connection" on public.spotify_connections;
create policy "Users can read own Spotify connection"
on public.spotify_connections for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Admins can read Spotify connections" on public.spotify_connections;
create policy "Admins can read Spotify connections"
on public.spotify_connections for select to authenticated
using (public.is_current_user_admin());

drop policy if exists "No client access to Spotify secrets" on public.spotify_connection_secrets;
drop policy if exists "No client access to OAuth states" on public.spotify_oauth_states;

drop policy if exists "Users can read own playlist snapshots" on public.curator_playlist_snapshots;
create policy "Users can read own playlist snapshots"
on public.curator_playlist_snapshots for select to authenticated
using (
  exists (
    select 1
    from public.curator_playlists cp
    join public.curator_profiles profile on profile.id = cp.curator_profile_id
    where cp.id = curator_playlist_snapshots.curator_playlist_id
      and profile.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can read own Spotify sync runs" on public.spotify_sync_runs;
create policy "Users can read own Spotify sync runs"
on public.spotify_sync_runs for select to authenticated
using (
  exists (
    select 1 from public.spotify_connections sc
    where sc.id = spotify_sync_runs.spotify_connection_id
      and sc.user_id = (select auth.uid())
  )
);

revoke all on public.spotify_connection_secrets from anon, authenticated;
revoke all on public.spotify_oauth_states from anon, authenticated;
grant select on public.spotify_connections to authenticated;
grant select on public.curator_playlist_snapshots to authenticated;
grant select on public.spotify_sync_runs to authenticated;

alter table public.spotify_oauth_states
  add column if not exists consumed_reason text;

create table if not exists public.curator_spotify_playlists (
  id uuid primary key default gen_random_uuid(),
  curator_id uuid not null references public.curator_profiles(id) on delete cascade,
  spotify_connection_id uuid references public.spotify_connections(id) on delete set null,
  spotify_playlist_id text not null,
  spotify_url text not null,
  name text not null,
  description text,
  cover_url text,
  spotify_owner_id text,
  spotify_owner_name text,
  track_count integer check (track_count is null or track_count >= 0),
  spotify_public boolean,
  spotify_collaborative boolean not null default false,
  spotify_snapshot_id text,
  ownership_type text not null default 'unverified' check (ownership_type in ('owner', 'collaborator', 'followed', 'unverified', 'unknown')),
  permission_status text not null default 'pending' check (permission_status in ('pending', 'verified', 'failed', 'access_lost')),
  verified_spotify_user_id text,
  verified_at timestamptz,
  last_checked_at timestamptz,
  last_error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (curator_id, spotify_playlist_id)
);

create table if not exists public.spotify_playlist_placements (
  id uuid primary key default gen_random_uuid(),
  curator_id uuid not null references public.curator_profiles(id) on delete cascade,
  playlist_id uuid not null references public.curator_spotify_playlists(id) on delete cascade,
  submission_id uuid,
  spotify_track_id text not null,
  spotify_track_uri text not null,
  added_at timestamptz,
  removed_at timestamptz,
  spotify_snapshot_id text,
  status text not null default 'pending' check (status in ('pending', 'added', 'failed', 'removed')),
  error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (playlist_id, spotify_track_uri)
);

create index if not exists curator_spotify_playlists_curator_idx
on public.curator_spotify_playlists (curator_id, updated_at desc);

create index if not exists curator_spotify_playlists_connection_idx
on public.curator_spotify_playlists (spotify_connection_id, updated_at desc);

create index if not exists spotify_playlist_placements_curator_idx
on public.spotify_playlist_placements (curator_id, created_at desc);

create index if not exists spotify_playlist_placements_submission_idx
on public.spotify_playlist_placements (submission_id)
where submission_id is not null;

drop trigger if exists curator_spotify_playlists_updated_at on public.curator_spotify_playlists;
create trigger curator_spotify_playlists_updated_at
before update on public.curator_spotify_playlists
for each row execute function public.set_updated_at();

drop trigger if exists spotify_playlist_placements_updated_at on public.spotify_playlist_placements;
create trigger spotify_playlist_placements_updated_at
before update on public.spotify_playlist_placements
for each row execute function public.set_updated_at();

alter table public.curator_spotify_playlists enable row level security;
alter table public.spotify_playlist_placements enable row level security;

drop policy if exists "Users can read own official Spotify playlists" on public.curator_spotify_playlists;
create policy "Users can read own official Spotify playlists"
on public.curator_spotify_playlists for select to authenticated
using (
  exists (
    select 1 from public.curator_profiles cp
    where cp.id = curator_spotify_playlists.curator_id
      and cp.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can read own Spotify placements" on public.spotify_playlist_placements;
create policy "Users can read own Spotify placements"
on public.spotify_playlist_placements for select to authenticated
using (
  exists (
    select 1 from public.curator_profiles cp
    where cp.id = spotify_playlist_placements.curator_id
      and cp.user_id = (select auth.uid())
  )
);

revoke all on public.curator_spotify_playlists from anon, authenticated;
revoke all on public.spotify_playlist_placements from anon, authenticated;
grant select on public.curator_spotify_playlists to authenticated;
grant select on public.spotify_playlist_placements to authenticated;

revoke insert, update on public.curator_playlists from authenticated;
grant insert (
  curator_profile_id,
  spotify_playlist_id,
  spotify_url,
  name,
  description,
  cover_url,
  spotify_owner_id,
  spotify_owner_name,
  track_count,
  genres,
  subgenres,
  languages,
  priority_countries,
  reference_artists,
  rejected_styles,
  allows_explicit,
  accepts_instrumental,
  daily_limit,
  is_accepting_submissions,
  editorial_description,
  notes,
  moderation_status
) on public.curator_playlists to authenticated;
grant update (
  curator_profile_id,
  spotify_playlist_id,
  spotify_url,
  name,
  description,
  cover_url,
  spotify_owner_id,
  spotify_owner_name,
  track_count,
  genres,
  subgenres,
  languages,
  priority_countries,
  reference_artists,
  rejected_styles,
  allows_explicit,
  accepts_instrumental,
  daily_limit,
  is_accepting_submissions,
  editorial_description,
  notes,
  moderation_status,
  updated_at
) on public.curator_playlists to authenticated;

create or replace function public.admin_list_curator_playlists()
returns table (
  id uuid,
  curator_profile_id uuid,
  curator_user_id uuid,
  curator_name text,
  spotify_playlist_id text,
  spotify_url text,
  name text,
  moderation_status text,
  verification_status text,
  verification_method text,
  ownership_type text,
  last_sync_status text,
  last_sync_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_current_user_admin() then
    raise exception 'ANSEND admin permission required' using errcode = '42501';
  end if;

  return query
  select
    cp.id,
    cp.curator_profile_id,
    profile.user_id,
    profile.public_name,
    cp.spotify_playlist_id,
    cp.spotify_url,
    cp.name,
    cp.moderation_status,
    cp.verification_status,
    cp.verification_method,
    cp.ownership_type,
    cp.last_sync_status,
    cp.last_sync_at,
    cp.updated_at
  from public.curator_playlists cp
  join public.curator_profiles profile on profile.id = cp.curator_profile_id
  order by cp.updated_at desc;
end;
$$;

revoke execute on function public.admin_list_curator_playlists() from public, anon;
grant execute on function public.admin_list_curator_playlists() to authenticated;

create or replace function public.admin_moderate_curator_playlist(
  p_playlist_id uuid,
  p_status text,
  p_internal_reason text default null,
  p_curator_message text default null
)
returns public.curator_playlists
language plpgsql
security definer
set search_path = public
as $$
declare
  v_playlist public.curator_playlists;
begin
  if not public.is_current_user_admin() then
    raise exception 'ANSEND admin permission required' using errcode = '42501';
  end if;

  if p_status not in ('approved', 'rejected', 'paused', 'pending') then
    raise exception 'Invalid moderation status' using errcode = '22023';
  end if;

  update public.curator_playlists
  set moderation_status = p_status,
      notes = coalesce(nullif(p_curator_message, ''), notes),
      updated_at = now()
  where id = p_playlist_id
  returning * into v_playlist;

  if v_playlist.id is null then
    raise exception 'Playlist not found' using errcode = '02000';
  end if;

  return v_playlist;
end;
$$;

revoke execute on function public.admin_moderate_curator_playlist(uuid, text, text, text) from public, anon;
grant execute on function public.admin_moderate_curator_playlist(uuid, text, text, text) to authenticated;


-- Phase 2 idempotent backfill tooling. Safe by default: dry-run only unless p_apply is true.

create table if not exists public.purchase_backfill_audit (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null,
  order_id uuid,
  order_item_id uuid,
  classification text not null check (classification in ('analyzed', 'corrected', 'skipped', 'ambiguous')),
  reason text not null,
  dry_run boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.purchase_backfill_audit enable row level security;
revoke all on public.purchase_backfill_audit from public, anon, authenticated;

create or replace function public.backfill_purchase_delivery(p_apply boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_run_id uuid := gen_random_uuid();
  v_order record;
  v_analyzed integer := 0;
  v_corrected integer := 0;
  v_skipped integer := 0;
  v_ambiguous integer := 0;
  v_items integer;
  v_active_entitlements integer;
  v_documents integer;
begin
  for v_order in
    select o.*
    from public.orders o
    where o.status = 'completed'
    order by o.created_at, o.id
  loop
    v_analyzed := v_analyzed + 1;
    select count(*) into v_items from public.order_items where order_id = v_order.id;
    select count(*) into v_active_entitlements from public.purchase_entitlements where order_id = v_order.id and status = 'active';
    select count(*) into v_documents from public.license_documents where order_id = v_order.id;

    insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
    values (v_run_id, v_order.id, 'analyzed', 'completed order inspected', not p_apply);

    if v_items = 0 then
      v_ambiguous := v_ambiguous + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, 'ambiguous', 'completed order has no order_items', not p_apply);
    elsif v_active_entitlements = v_items and v_documents = v_items then
      v_skipped := v_skipped + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, 'skipped', 'delivery already complete', not p_apply);
    elsif v_active_entitlements <= v_items and v_documents <= v_items then
      if p_apply then
        update public.orders set status = 'pending' where id = v_order.id;
        perform public.provision_purchase_delivery(v_order.id);
        update public.orders set status = 'completed', updated_at = now(), completed_at = coalesce(completed_at, now()) where id = v_order.id;
      end if;
      v_corrected := v_corrected + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, case when p_apply then 'corrected' else 'skipped' end, case when p_apply then 'delivery provisioned idempotently' else 'would provision delivery' end, not p_apply);
    else
      v_ambiguous := v_ambiguous + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, 'ambiguous', 'delivery cardinality exceeds order_items', not p_apply);
    end if;
  end loop;

  return jsonb_build_object(
    'run_id', v_run_id,
    'dry_run', not p_apply,
    'analyzed', v_analyzed,
    'corrected', case when p_apply then v_corrected else 0 end,
    'would_correct', case when p_apply then 0 else v_corrected end,
    'skipped', v_skipped,
    'ambiguous', v_ambiguous
  );
end;
$$;

revoke execute on function public.backfill_purchase_delivery(boolean) from public, anon, authenticated;
grant execute on function public.backfill_purchase_delivery(boolean) to service_role;
