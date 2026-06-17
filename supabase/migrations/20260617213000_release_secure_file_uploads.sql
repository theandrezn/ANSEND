alter table public.beats add column if not exists audio_original_name text;
alter table public.beats add column if not exists audio_mime_type text;
alter table public.beats add column if not exists audio_size_bytes bigint;
alter table public.beats add column if not exists audio_duration_seconds numeric;
alter table public.beats add column if not exists mp3_original_name text;
alter table public.beats add column if not exists mp3_mime_type text;
alter table public.beats add column if not exists mp3_size_bytes bigint;
alter table public.beats add column if not exists mp3_duration_seconds numeric;
alter table public.beats add column if not exists wav_original_name text;
alter table public.beats add column if not exists wav_mime_type text;
alter table public.beats add column if not exists wav_size_bytes bigint;
alter table public.beats add column if not exists wav_duration_seconds numeric;
alter table public.beats add column if not exists stems_original_name text;
alter table public.beats add column if not exists stems_mime_type text;
alter table public.beats add column if not exists stems_size_bytes bigint;

alter table public.release_upload_drafts add column if not exists audio_original_name text;
alter table public.release_upload_drafts add column if not exists audio_mime_type text;
alter table public.release_upload_drafts add column if not exists audio_size_bytes bigint;
alter table public.release_upload_drafts add column if not exists audio_duration_seconds numeric;
alter table public.release_upload_drafts add column if not exists mp3_url text;
alter table public.release_upload_drafts add column if not exists mp3_path text;
alter table public.release_upload_drafts add column if not exists mp3_original_name text;
alter table public.release_upload_drafts add column if not exists mp3_mime_type text;
alter table public.release_upload_drafts add column if not exists mp3_size_bytes bigint;
alter table public.release_upload_drafts add column if not exists mp3_duration_seconds numeric;
alter table public.release_upload_drafts add column if not exists wav_url text;
alter table public.release_upload_drafts add column if not exists wav_path text;
alter table public.release_upload_drafts add column if not exists wav_original_name text;
alter table public.release_upload_drafts add column if not exists wav_mime_type text;
alter table public.release_upload_drafts add column if not exists wav_size_bytes bigint;
alter table public.release_upload_drafts add column if not exists wav_duration_seconds numeric;
alter table public.release_upload_drafts add column if not exists stems_original_name text;
alter table public.release_upload_drafts add column if not exists stems_mime_type text;
alter table public.release_upload_drafts add column if not exists stems_size_bytes bigint;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'beat-secure-files',
  'beat-secure-files',
  false,
  524288000,
  array['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'application/zip', 'application/x-zip-compressed']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can upload their own secure files" on storage.objects;
create policy "Users can upload their own secure files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
  and coalesce((storage.foldername(name))[3], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

drop policy if exists "Users can update their own secure files" on storage.objects;
create policy "Users can update their own secure files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
)
with check (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
  and coalesce((storage.foldername(name))[3], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

drop policy if exists "Users can delete their own secure files" on storage.objects;
create policy "Users can delete their own secure files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (storage.foldername(name))[1] = (auth.uid())::text
  and (storage.foldername(name))[2] = 'beat-secure-files'
);

drop policy if exists "Users can read their own secure files" on storage.objects;
create policy "Users can read their own secure files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'beat-secure-files'
  and (
    (
      (storage.foldername(name))[1] = (auth.uid())::text
      and (storage.foldername(name))[2] = 'beat-secure-files'
    )
    or exists (
      select 1
      from public.order_items oi
      join public.orders o on o.id = oi.order_id
      where coalesce((storage.foldername(name))[3], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        and oi.beat_id = ((storage.foldername(name))[3])::uuid
        and o.buyer_id = auth.uid()
        and o.status = 'completed'
    )
  )
);

create or replace function public.validate_beat_storage_paths()
returns trigger
language plpgsql
as $$
declare
  owner_prefix text := new.user_id::text || '/';
  beat_segment text := '/' || new.id::text || '/';
begin
  if new.cover_path is not null
    and not (
      new.cover_path like owner_prefix || 'beat-covers' || beat_segment || '%'
      or new.cover_path like owner_prefix || 'covers' || beat_segment || '%'
    )
  then
    raise exception 'cover_path must belong to the beat owner and beat id';
  end if;

  if new.audio_path is not null
    and new.audio_path not like owner_prefix || 'beat-audio' || beat_segment || '%'
  then
    raise exception 'audio_path must belong to the beat owner and beat id';
  end if;

  if new.mp3_path is not null
    and new.mp3_path not like owner_prefix || 'beat-secure-files' || beat_segment || '%'
  then
    raise exception 'mp3_path must belong to the beat owner and beat id';
  end if;

  if new.wav_path is not null
    and new.wav_path not like owner_prefix || 'beat-secure-files' || beat_segment || '%'
  then
    raise exception 'wav_path must belong to the beat owner and beat id';
  end if;

  if new.stems_path is not null
    and not (
      new.stems_path like owner_prefix || 'beat-secure-files' || beat_segment || '%'
      or new.stems_path like owner_prefix || 'beat-stems' || beat_segment || '%'
    )
  then
    raise exception 'stems_path must belong to the beat owner and beat id';
  end if;

  return new;
end;
$$;

drop trigger if exists beats_validate_storage_paths on public.beats;
create trigger beats_validate_storage_paths
before insert or update on public.beats
for each row execute function public.validate_beat_storage_paths();
