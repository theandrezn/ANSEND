alter table public.promoted_beats
  add column if not exists audio_url text,
  add column if not exists preview_url text,
  add column if not exists audio_preview_url text,
  add column if not exists track_url text;
