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

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'curator_playlists_spotify_connection_fk'
      and conrelid = 'public.curator_playlists'::regclass
  ) then
    alter table public.curator_playlists
      add constraint curator_playlists_spotify_connection_fk
      foreign key (spotify_connection_id) references public.spotify_connections(id) on delete set null;
  end if;
exception
  when undefined_table then
    null;
end $$;

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
