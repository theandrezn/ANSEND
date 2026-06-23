-- Keep purchased-file authorization centralized in the Worker download endpoint.
-- Buyers receive short-lived signed URLs after entitlement checks; direct
-- Supabase Storage reads remain limited to the producer who owns the file path.

drop policy if exists "Users can read their own secure files" on storage.objects;
create policy "Users can read their own secure files"
on storage.objects for select to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
);
