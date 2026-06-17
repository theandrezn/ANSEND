create or replace function public.validate_beat_storage_paths()
returns trigger
language plpgsql
set search_path = public, pg_temp
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
