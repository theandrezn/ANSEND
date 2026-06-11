drop view if exists public.public_profiles;

create view public.public_profiles
with (security_barrier = true)
as
select
  id,
  display_name,
  username,
  full_name,
  artistic_name,
  account_role,
  bio,
  avatar_url,
  banner_url,
  website_url,
  instagram_url,
  youtube_url,
  spotify_url,
  soundcloud_url,
  music_styles,
  created_at,
  updated_at
from public.profiles;

grant select on public.public_profiles to anon, authenticated;
