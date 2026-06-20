alter table public.recommendation_impressions
  add column if not exists request_id uuid,
  add column if not exists rank integer,
  add column if not exists score_components jsonb not null default '{}'::jsonb,
  add column if not exists algorithm_version text not null default 'nexo-rank-2.0.0';

alter table public.nexo_conversations
  add column if not exists last_accessed_at timestamptz not null default now();

create unique index if not exists recommendation_impressions_request_rank_idx
  on public.recommendation_impressions (request_id, rank)
  where request_id is not null and rank is not null;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  user_id uuid references auth.users(id) on delete cascade,
  anonymous_id text,
  session_id text not null,
  event_name text not null,
  entity_type text,
  entity_id uuid,
  route_key text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint analytics_events_identity_check check (user_id is not null or nullif(anonymous_id, '') is not null),
  constraint analytics_events_name_check check (event_name = any (array[
    'NEXO_OPENED', 'NEXO_MESSAGE_SENT', 'NEXO_INTENT_CLASSIFIED',
    'RECOMMENDATION_IMPRESSION', 'RECOMMENDATION_CLICK', 'BEAT_PLAY',
    'BEAT_COMPLETED', 'PROFILE_OPENED', 'FOLLOW', 'SAVE', 'ADD_TO_CART',
    'CHECKOUT_STARTED', 'PURCHASE_COMPLETED', 'RECOMMENDATION_DISMISSED'
  ]))
);

create table if not exists public.recommendation_interactions (
  id uuid primary key default gen_random_uuid(),
  impression_id uuid not null references public.recommendation_impressions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  action text not null,
  dwell_ms integer check (dwell_ms is null or dwell_ms >= 0),
  idempotency_key text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.content_metrics_daily (
  entity_type text not null,
  entity_id uuid not null,
  date date not null,
  views integer not null default 0,
  unique_users integer not null default 0,
  plays integer not null default 0,
  completions integer not null default 0,
  saves integer not null default 0,
  follows integer not null default 0,
  cart_adds integer not null default 0,
  purchases integer not null default 0,
  revenue_cents bigint not null default 0,
  skips integer not null default 0,
  primary key (entity_type, entity_id, date)
);

create table if not exists public.content_trend_scores (
  entity_type text not null,
  entity_id uuid not null,
  score numeric not null default 0,
  metric_window text not null,
  sample_size integer not null default 0,
  calculated_at timestamptz not null default now(),
  primary key (entity_type, entity_id, metric_window)
);

create table if not exists public.user_preference_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  genres jsonb not null default '{}'::jsonb,
  moods jsonb not null default '{}'::jsonb,
  price_range jsonb not null default '{}'::jsonb,
  license_types jsonb not null default '{}'::jsonb,
  negative_signals jsonb not null default '{}'::jsonb,
  consented_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists analytics_events_user_created_idx on public.analytics_events (user_id, created_at desc);
create index if not exists analytics_events_session_created_idx on public.analytics_events (session_id, created_at desc);
create index if not exists analytics_events_entity_created_idx on public.analytics_events (entity_type, entity_id, created_at desc);
create index if not exists recommendation_interactions_impression_idx on public.recommendation_interactions (impression_id, created_at);
create index if not exists content_metrics_daily_entity_idx on public.content_metrics_daily (entity_type, entity_id, date desc);
create index if not exists content_trend_scores_window_idx on public.content_trend_scores (metric_window, score desc, calculated_at desc);

alter table public.analytics_events enable row level security;
alter table public.recommendation_interactions enable row level security;
alter table public.content_metrics_daily enable row level security;
alter table public.content_trend_scores enable row level security;
alter table public.user_preference_profiles enable row level security;

create policy "Users read own NEXO analytics" on public.analytics_events
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users insert own NEXO analytics" on public.analytics_events
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Users read own recommendation interactions" on public.recommendation_interactions
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users insert own recommendation interactions" on public.recommendation_interactions
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Authenticated users read aggregate content metrics" on public.content_metrics_daily
  for select to authenticated using (true);
create policy "Authenticated users read trend scores" on public.content_trend_scores
  for select to authenticated using (true);
create policy "Users manage own NEXO preferences" on public.user_preference_profiles
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

grant select, insert on public.analytics_events to authenticated;
grant select, insert on public.recommendation_interactions to authenticated;
grant select on public.content_metrics_daily, public.content_trend_scores to authenticated;
grant select, insert, update on public.user_preference_profiles to authenticated;

create or replace function public.reset_expired_nexo_history()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  expired boolean;
begin
  select exists (
    select 1 from public.nexo_conversations
    where user_id = (select auth.uid())
      and greatest(updated_at, last_accessed_at) < now() - interval '6 hours'
  ) into expired;

  if expired then
    delete from public.nexo_conversations
    where user_id = (select auth.uid());
  end if;
  update public.nexo_conversations
  set last_accessed_at = now()
  where user_id = (select auth.uid());
  return expired;
end;
$$;

revoke all on function public.reset_expired_nexo_history() from public, anon;
grant execute on function public.reset_expired_nexo_history() to authenticated;
