revoke execute on function public.sync_public_profile() from public, anon, authenticated;

drop policy if exists "Public can read beat audio" on storage.objects;
drop policy if exists "Public can read beat covers" on storage.objects;
drop policy if exists "Public can read profile avatars" on storage.objects;
drop policy if exists "Public can read profile banners" on storage.objects;
