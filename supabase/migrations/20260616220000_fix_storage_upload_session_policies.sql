insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('beat-covers', 'beat-covers', true, 10485760, array['image/jpeg','image/png','image/webp']),
  ('beat-audio', 'beat-audio', true, 262144000, array['audio/mpeg','audio/wav','audio/x-wav','audio/flac','audio/mp4','audio/aac','audio/ogg','video/mp4']),
  ('beat-stems', 'beat-stems', false, 524288000, array['application/zip','application/x-zip-compressed']),
  ('profile-avatars', 'profile-avatars', true, 10485760, array['image/jpeg','image/png','image/webp']),
  ('profile-banners', 'profile-banners', true, 15728640, array['image/jpeg','image/png','image/webp'])
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
