alter table public.beat_licenses
  add column if not exists terms_config jsonb not null default '{}'::jsonb;

comment on column public.beat_licenses.terms_config is
  'Granular distribution, playback, performance, radio and contract-summary limits for the license editor.';
