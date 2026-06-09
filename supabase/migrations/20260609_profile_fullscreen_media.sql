alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists avatar_path text;
alter table public.profiles add column if not exists banner_url text;
alter table public.profiles add column if not exists banner_path text;
alter table public.profiles add column if not exists website_url text;
alter table public.profiles add column if not exists instagram_url text;
alter table public.profiles add column if not exists youtube_url text;
alter table public.profiles add column if not exists spotify_url text;
alter table public.profiles add column if not exists soundcloud_url text;

create unique index if not exists profiles_username_unique_idx
on public.profiles (lower(username))
where username is not null and username <> '';

insert into storage.buckets (id, name, public)
values
  ('profile-avatars', 'profile-avatars', true),
  ('profile-banners', 'profile-banners', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Profile avatars are public" on storage.objects;
create policy "Profile avatars are public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'profile-avatars');

drop policy if exists "Profile banners are public" on storage.objects;
create policy "Profile banners are public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'profile-banners');

drop policy if exists "Users can manage own profile avatars" on storage.objects;
create policy "Users can manage own profile avatars"
on storage.objects
for all
to authenticated
using (bucket_id = 'profile-avatars' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'profile-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can manage own profile banners" on storage.objects;
create policy "Users can manage own profile banners"
on storage.objects
for all
to authenticated
using (bucket_id = 'profile-banners' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'profile-banners' and (storage.foldername(name))[1] = auth.uid()::text);
