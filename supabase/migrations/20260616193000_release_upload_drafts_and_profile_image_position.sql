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
on public.release_upload_drafts
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can upsert own release upload draft" on public.release_upload_drafts;
create policy "Users can upsert own release upload draft"
on public.release_upload_drafts
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own release upload draft" on public.release_upload_drafts;
create policy "Users can update own release upload draft"
on public.release_upload_drafts
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own release upload draft" on public.release_upload_drafts;
create policy "Users can delete own release upload draft"
on public.release_upload_drafts
for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.release_upload_drafts to authenticated;

alter table public.profiles add column if not exists banner_position_x numeric not null default 50 check (banner_position_x between 0 and 100);
alter table public.profiles add column if not exists banner_position_y numeric not null default 50 check (banner_position_y between 0 and 100);
alter table public.profiles add column if not exists avatar_position_x numeric not null default 50 check (avatar_position_x between 0 and 100);
alter table public.profiles add column if not exists avatar_position_y numeric not null default 50 check (avatar_position_y between 0 and 100);

alter table public.public_profiles add column if not exists banner_position_x numeric not null default 50;
alter table public.public_profiles add column if not exists banner_position_y numeric not null default 50;
alter table public.public_profiles add column if not exists avatar_position_x numeric not null default 50;
alter table public.public_profiles add column if not exists avatar_position_y numeric not null default 50;

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
    avatar_position_x, avatar_position_y,
    website_url, instagram_url, youtube_url, spotify_url,
    soundcloud_url, music_styles, is_public, created_at, updated_at
  ) values (
    new.id, new.display_name, new.username, new.full_name, new.artistic_name, new.account_role, new.bio,
    new.avatar_url, new.banner_url, new.banner_position_x, new.banner_position_y,
    new.avatar_position_x, new.avatar_position_y,
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

insert into public.public_profiles (
  id, display_name, username, full_name, artistic_name, account_role, bio,
  avatar_url, banner_url, banner_position_x, banner_position_y,
  avatar_position_x, avatar_position_y,
  website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, is_public, created_at, updated_at
)
select
  id, display_name, username, full_name, artistic_name, account_role, bio,
  avatar_url, banner_url, banner_position_x, banner_position_y,
  avatar_position_x, avatar_position_y,
  website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, is_public, created_at, updated_at
from public.profiles
where is_public is true
on conflict (id) do update set
  banner_position_x = excluded.banner_position_x,
  banner_position_y = excluded.banner_position_y,
  avatar_position_x = excluded.avatar_position_x,
  avatar_position_y = excluded.avatar_position_y,
  updated_at = excluded.updated_at;
