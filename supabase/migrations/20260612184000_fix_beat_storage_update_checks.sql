drop policy if exists "Users can update their own covers" on storage.objects;
create policy "Users can update their own covers"
on storage.objects for update to authenticated
using (
  bucket_id = 'beat-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'beat-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update their own audio" on storage.objects;
create policy "Users can update their own audio"
on storage.objects for update to authenticated
using (
  bucket_id = 'beat-audio'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'beat-audio'
  and (storage.foldername(name))[1] = auth.uid()::text
);
