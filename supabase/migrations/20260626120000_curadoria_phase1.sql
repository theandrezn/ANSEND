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
