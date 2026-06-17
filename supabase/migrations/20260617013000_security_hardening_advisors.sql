alter function public.touch_promoted_beats_updated_at()
set search_path = public;

revoke execute on function public.touch_promoted_beats_updated_at() from public, anon, authenticated;
revoke execute on function public.process_user_follow_notification() from public, anon, authenticated;

revoke execute on function public.increment_promoted_beat_impression(uuid) from public, anon, authenticated;
revoke execute on function public.increment_promoted_beat_click(uuid) from public, anon, authenticated;

drop policy if exists "Public Access Covers" on storage.objects;
drop policy if exists "Profile avatars are public" on storage.objects;
drop policy if exists "Profile banners are public" on storage.objects;
drop policy if exists "Public can read beat covers" on storage.objects;
drop policy if exists "Public can read profile avatars" on storage.objects;
drop policy if exists "Public can read profile banners" on storage.objects;

drop policy if exists "Users can read own beat covers" on storage.objects;
create policy "Users can read own beat covers"
on storage.objects for select
to authenticated
using (
  bucket_id = 'beat-covers'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
