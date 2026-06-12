alter table public.profiles add column if not exists is_public boolean not null default true;
alter table public.public_profiles add column if not exists is_public boolean not null default true;
alter table public.catalog_items add column if not exists is_public boolean not null default true;
alter table public.beats add column if not exists is_public boolean not null default true;

update public.profiles set is_public = true where is_public is null;
update public.public_profiles set is_public = true where is_public is null;
update public.catalog_items set is_public = true where is_public is null;
update public.beats set is_public = true where is_public is null;

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
    avatar_url, banner_url, website_url, instagram_url, youtube_url, spotify_url,
    soundcloud_url, music_styles, is_public, created_at, updated_at
  ) values (
    new.id, new.display_name, new.username, new.full_name, new.artistic_name, new.account_role, new.bio,
    new.avatar_url, new.banner_url, new.website_url, new.instagram_url, new.youtube_url, new.spotify_url,
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
  avatar_url, banner_url, website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, is_public, created_at, updated_at
)
select
  id, display_name, username, full_name, artistic_name, account_role, bio,
  avatar_url, banner_url, website_url, instagram_url, youtube_url, spotify_url,
  soundcloud_url, music_styles, is_public, created_at, updated_at
from public.profiles
where is_public is true
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
  is_public = excluded.is_public,
  updated_at = excluded.updated_at;

delete from public.public_profiles
where id in (select id from public.profiles where is_public is false);

drop policy if exists "Published or owned catalog is readable" on public.catalog_items;
create policy "Published or owned catalog is readable"
on public.catalog_items for select to anon, authenticated
using (((status = 'published'::text) and (is_public is true)) or ((select auth.uid()) = user_id));

drop policy if exists "Published or owned beats are readable" on public.beats;
create policy "Published or owned beats are readable"
on public.beats for select to anon, authenticated
using (((status = 'published'::text) and (is_public is true)) or ((select auth.uid()) = user_id));
