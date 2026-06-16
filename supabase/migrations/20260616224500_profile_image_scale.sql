alter table public.profiles
  add column if not exists banner_scale numeric not null default 1 check (banner_scale between 1 and 2.5),
  add column if not exists avatar_scale numeric not null default 1 check (avatar_scale between 1 and 2.5);

alter table public.public_profiles
  add column if not exists banner_scale numeric not null default 1,
  add column if not exists avatar_scale numeric not null default 1;

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
on conflict (id) do update set
  banner_scale = excluded.banner_scale,
  avatar_scale = excluded.avatar_scale,
  updated_at = excluded.updated_at;
