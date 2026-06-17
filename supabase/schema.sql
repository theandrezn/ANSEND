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
  stems_url text,
  stems_path text,
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
  stems_url text,
  stems_path text,
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

-- Storage buckets setup
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('beat-covers', 'beat-covers', true, 10485760, array['image/jpeg','image/png','image/webp']),
  ('beat-audio', 'beat-audio', true, 262144000, array['audio/mpeg','audio/wav','audio/x-wav','audio/flac','audio/mp4','audio/aac','audio/ogg','video/mp4']),
  ('beat-stems', 'beat-stems', false, 524288000, array['application/zip','application/x-zip-compressed']),
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
