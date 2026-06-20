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
