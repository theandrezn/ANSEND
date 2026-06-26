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
