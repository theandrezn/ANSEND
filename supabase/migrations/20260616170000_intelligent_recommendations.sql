create extension if not exists vector with schema extensions;

create table if not exists public.user_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null check (event_type = any (array[
    'view', 'click', 'save', 'like', 'comment', 'share', 'follow', 'message',
    'hire', 'buy', 'skip', 'report', 'search', 'nexo_intent'
  ])),
  target_type text not null check (target_type = any (array[
    'post', 'beat', 'professional', 'service', 'user_interest'
  ])),
  target_id uuid,
  weight numeric not null default 1,
  duration_seconds numeric,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.content_embeddings (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type = any (array[
    'post', 'beat', 'professional', 'service', 'user_interest'
  ])),
  target_id uuid not null,
  text_content text not null,
  embedding extensions.vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (target_type, target_id)
);

create table if not exists public.user_interest_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  summary text not null default '',
  embedding extensions.vector(1536),
  genres text[] not null default '{}',
  roles_interested text[] not null default '{}',
  budget_min numeric,
  budget_max numeric,
  intent_tags text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.recommendation_impressions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type = any (array[
    'post', 'beat', 'professional', 'service', 'user_interest'
  ])),
  target_id uuid not null,
  score numeric not null default 0,
  reason text not null default '',
  shown_at timestamptz not null default now(),
  clicked_at timestamptz
);

create index if not exists user_events_user_created_idx on public.user_events (user_id, created_at desc);
create index if not exists user_events_target_idx on public.user_events (target_type, target_id, created_at desc);
create index if not exists recommendation_impressions_user_shown_idx on public.recommendation_impressions (user_id, shown_at desc);
create index if not exists content_embeddings_target_idx on public.content_embeddings (target_type, target_id);
create index if not exists content_embeddings_embedding_idx on public.content_embeddings
using ivfflat (embedding extensions.vector_cosine_ops)
with (lists = 100);
create index if not exists user_interest_profiles_embedding_idx on public.user_interest_profiles
using ivfflat (embedding extensions.vector_cosine_ops)
with (lists = 100);

alter table public.user_events enable row level security;
alter table public.content_embeddings enable row level security;
alter table public.user_interest_profiles enable row level security;
alter table public.recommendation_impressions enable row level security;

drop policy if exists "Users can read own events" on public.user_events;
create policy "Users can read own events"
on public.user_events for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can insert own events" on public.user_events;
create policy "Users can insert own events"
on public.user_events for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can read own interest profile" on public.user_interest_profiles;
create policy "Users can read own interest profile"
on public.user_interest_profiles for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can upsert own interest profile" on public.user_interest_profiles;
create policy "Users can upsert own interest profile"
on public.user_interest_profiles for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can update own interest profile" on public.user_interest_profiles;
create policy "Users can update own interest profile"
on public.user_interest_profiles for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "Users can read own recommendation impressions" on public.recommendation_impressions;
create policy "Users can read own recommendation impressions"
on public.recommendation_impressions for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can insert own recommendation impressions" on public.recommendation_impressions;
create policy "Users can insert own recommendation impressions"
on public.recommendation_impressions for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can update own recommendation impressions" on public.recommendation_impressions;
create policy "Users can update own recommendation impressions"
on public.recommendation_impressions for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "Authenticated users can read content embeddings" on public.content_embeddings;
create policy "Authenticated users can read content embeddings"
on public.content_embeddings for select
to authenticated
using (true);

create or replace function public.recommendation_event_weight(
  p_event_type text,
  p_duration_seconds numeric default null
) returns numeric
language sql
immutable
set search_path = public
as $$
  select case
    when p_event_type = 'view' and coalesce(p_duration_seconds, 0) >= 12 then 3
    when p_event_type = 'view' then 1
    when p_event_type = 'click' then 4
    when p_event_type = 'like' then 5
    when p_event_type = 'save' then 7
    when p_event_type = 'follow' then 8
    when p_event_type = 'comment' then 9
    when p_event_type = 'share' then 4
    when p_event_type = 'message' then 12
    when p_event_type = 'hire' then 25
    when p_event_type = 'buy' then 30
    when p_event_type = 'skip' then -5
    when p_event_type = 'report' then -50
    when p_event_type = 'search' then 2
    when p_event_type = 'nexo_intent' then 14
    else 1
  end;
$$;

create or replace function public.track_user_event(
  p_event_type text,
  p_target_type text,
  p_target_id uuid default null,
  p_duration_seconds numeric default null,
  p_metadata jsonb default '{}'::jsonb
) returns public.user_events
language plpgsql
security invoker
set search_path = public
as $$
declare
  inserted public.user_events;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.user_events (
    user_id,
    event_type,
    target_type,
    target_id,
    weight,
    duration_seconds,
    metadata
  )
  values (
    auth.uid(),
    p_event_type,
    p_target_type,
    p_target_id,
    public.recommendation_event_weight(p_event_type, p_duration_seconds),
    p_duration_seconds,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning * into inserted;

  return inserted;
end;
$$;

create or replace function public.upsert_content_embedding(
  p_target_type text,
  p_target_id uuid,
  p_text_content text,
  p_embedding extensions.vector(1536)
) returns void
language sql
security invoker
set search_path = public, extensions
as $$
  insert into public.content_embeddings (target_type, target_id, text_content, embedding, updated_at)
  values (p_target_type, p_target_id, p_text_content, p_embedding, now())
  on conflict (target_type, target_id)
  do update set
    text_content = excluded.text_content,
    embedding = excluded.embedding,
    updated_at = now();
$$;

create or replace function public.update_user_interest_profile(
  p_summary text,
  p_embedding extensions.vector(1536) default null,
  p_genres text[] default '{}',
  p_roles_interested text[] default '{}',
  p_budget_min numeric default null,
  p_budget_max numeric default null,
  p_intent_tags text[] default '{}'
) returns public.user_interest_profiles
language plpgsql
security invoker
set search_path = public
as $$
declare
  updated public.user_interest_profiles;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.user_interest_profiles (
    user_id,
    summary,
    embedding,
    genres,
    roles_interested,
    budget_min,
    budget_max,
    intent_tags,
    updated_at
  )
  values (
    auth.uid(),
    coalesce(p_summary, ''),
    p_embedding,
    coalesce(p_genres, '{}'),
    coalesce(p_roles_interested, '{}'),
    p_budget_min,
    p_budget_max,
    coalesce(p_intent_tags, '{}'),
    now()
  )
  on conflict (user_id)
  do update set
    summary = excluded.summary,
    embedding = coalesce(excluded.embedding, user_interest_profiles.embedding),
    genres = excluded.genres,
    roles_interested = excluded.roles_interested,
    budget_min = excluded.budget_min,
    budget_max = excluded.budget_max,
    intent_tags = excluded.intent_tags,
    updated_at = now()
  returning * into updated;

  return updated;
end;
$$;

create or replace function public.get_recommended_professionals(
  p_user_id uuid default auth.uid(),
  p_limit integer default 12
) returns table (
  target_id uuid,
  score numeric,
  reason text,
  professional jsonb
)
language sql
security invoker
set search_path = public, extensions
as $$
with interest as (
  select *
  from public.user_interest_profiles
  where user_id = auth.uid()
),
events as (
  select
    target_id,
    sum(weight) filter (where event_type <> 'report') as engagement_score,
    count(*) filter (where event_type = 'skip') as skips,
    count(*) filter (where event_type = 'report') as reports
  from public.user_events
  where user_id = auth.uid()
    and target_type = 'professional'
  group by target_id
),
candidates as (
  select
    p.*,
    ce.embedding,
    coalesce(e.engagement_score, 0) as engagement_score,
    coalesce(e.skips, 0) as skips,
    coalesce(e.reports, 0) as reports,
    case
      when i.embedding is not null and ce.embedding is not null then greatest(0, 1 - (ce.embedding <=> i.embedding))
      else 0.45
    end as semantic_similarity,
    case
      when coalesce(p.music_styles, '{}') && coalesce(i.genres, '{}') then 1
      else 0
    end as genre_match,
    case
      when coalesce(p.bio, '') <> '' and coalesce(p.avatar_url, '') <> '' then 1
      when coalesce(p.bio, '') <> '' or coalesce(p.avatar_url, '') <> '' then 0.65
      else 0.25
    end as quality_score,
    greatest(0, 1 - least(1, extract(epoch from (now() - coalesce(p.updated_at, p.created_at, now()))) / 2592000)) as recency_score
  from public.public_profiles p
  left join interest i on true
  left join public.content_embeddings ce
    on ce.target_type = 'professional'
   and ce.target_id = p.id
  left join events e on e.target_id = p.id
  where p.is_public is distinct from false
    and (auth.uid() is null or p.id <> auth.uid())
)
select
  id as target_id,
  round((
    semantic_similarity * 40
    + genre_match * 15
    + quality_score * 15
    + recency_score * 10
    + least(10, greatest(0, engagement_score))
    + case when array_length(coalesce(music_styles, '{}'), 1) > 0 then 5 else 0 end
    - skips * 5
    - reports * 50
    - case when coalesce(bio, '') = '' then 8 else 0 end
  )::numeric, 2) as score,
  case
    when genre_match = 1 then 'Recomendado porque seu interesse musical combina com os estilos deste profissional.'
    when semantic_similarity >= 0.58 then 'Recomendado porque o perfil tem contexto parecido com seu momento musical.'
    when quality_score >= 0.65 then 'Recomendado por ter perfil publico completo e atividade recente na ANSEND.'
    else 'Recomendado como descoberta inicial com base em perfis ativos da ANSEND.'
  end as reason,
  to_jsonb(candidates) - 'embedding' - 'engagement_score' - 'skips' - 'reports' - 'semantic_similarity' - 'genre_match' - 'quality_score' - 'recency_score' as professional
from candidates
order by score desc, updated_at desc nulls last
limit least(greatest(coalesce(p_limit, 12), 1), 50);
$$;

create or replace function public.get_recommended_feed(
  p_user_id uuid default auth.uid(),
  p_limit integer default 30
) returns table (
  target_type text,
  target_id uuid,
  score numeric,
  reason text
)
language sql
security invoker
set search_path = public, extensions
as $$
with interest as (
  select *
  from public.user_interest_profiles
  where user_id = auth.uid()
),
events as (
  select
    target_type,
    target_id,
    sum(weight) as engagement_score,
    count(*) filter (where event_type = 'skip') as skips,
    count(*) filter (where event_type = 'report') as reports
  from public.user_events
  where user_id = auth.uid()
  group by target_type, target_id
),
beat_candidates as (
  select
    'beat'::text as target_type,
    b.id as target_id,
    b.created_at,
    case
      when i.embedding is not null and ce.embedding is not null then greatest(0, 1 - (ce.embedding <=> i.embedding))
      else 0.45
    end as semantic_similarity,
    case when b.genre = any(coalesce(i.genres, '{}')) then 1 else 0 end as genre_match,
    coalesce(e.engagement_score, 0) as engagement_score,
    coalesce(e.skips, 0) as skips,
    coalesce(e.reports, 0) as reports
  from public.beats b
  left join interest i on true
  left join public.content_embeddings ce on ce.target_type = 'beat' and ce.target_id = b.id
  left join events e on e.target_type = 'beat' and e.target_id = b.id
  where b.status = 'published' and b.is_public is true
),
catalog_candidates as (
  select
    'beat'::text as target_type,
    c.id as target_id,
    c.created_at,
    case
      when i.embedding is not null and ce.embedding is not null then greatest(0, 1 - (ce.embedding <=> i.embedding))
      else 0.40
    end as semantic_similarity,
    case when c.genre = any(coalesce(i.genres, '{}')) then 1 else 0 end as genre_match,
    coalesce(e.engagement_score, 0) as engagement_score,
    coalesce(e.skips, 0) as skips,
    coalesce(e.reports, 0) as reports
  from public.catalog_items c
  left join interest i on true
  left join public.content_embeddings ce on ce.target_type = 'beat' and ce.target_id = c.id
  left join events e on e.target_type = 'beat' and e.target_id = c.id
  where c.status = 'published' and c.is_public is true
),
post_candidates as (
  select
    'post'::text as target_type,
    h.id as target_id,
    h.created_at,
    case
      when i.embedding is not null and ce.embedding is not null then greatest(0, 1 - (ce.embedding <=> i.embedding))
      else 0.38
    end as semantic_similarity,
    case when h.category = any(coalesce(i.roles_interested, '{}')) then 1 else 0 end as genre_match,
    coalesce(e.engagement_score, 0) as engagement_score,
    coalesce(e.skips, 0) as skips,
    coalesce(e.reports, 0) as reports
  from public.hiring_posts h
  left join interest i on true
  left join public.content_embeddings ce on ce.target_type = 'post' and ce.target_id = h.id
  left join events e on e.target_type = 'post' and e.target_id = h.id
  where h.visibility = 'public' and h.status in ('open', 'negotiating')
),
unioned as (
  select * from beat_candidates
  union all select * from catalog_candidates
  union all select * from post_candidates
)
select
  target_type,
  target_id,
  round((
    semantic_similarity * 40
    + genre_match * 15
    + greatest(0, 1 - least(1, extract(epoch from (now() - coalesce(created_at, now()))) / 1209600)) * 10
    + least(20, greatest(0, engagement_score))
    - skips * 5
    - reports * 50
  )::numeric, 2) as score,
  case
    when genre_match = 1 then 'Conteudo recomendado pelo seu estilo e intencao recente.'
    when semantic_similarity >= 0.55 then 'Conteudo com contexto parecido com seu perfil musical.'
    else 'Descoberta baseada em conteudos reais e recentes da ANSEND.'
  end as reason
from unioned
order by score desc, created_at desc nulls last
limit least(greatest(coalesce(p_limit, 30), 1), 80);
$$;

grant execute on function public.track_user_event(text, text, uuid, numeric, jsonb) to authenticated;
revoke execute on function public.upsert_content_embedding(text, uuid, text, extensions.vector(1536)) from public, anon, authenticated;
grant execute on function public.update_user_interest_profile(text, extensions.vector(1536), text[], text[], numeric, numeric, text[]) to authenticated;
revoke execute on function public.get_recommended_professionals(uuid, integer) from anon;
revoke execute on function public.get_recommended_feed(uuid, integer) from anon;
revoke execute on function public.get_recommended_professionals(uuid, integer) from public;
revoke execute on function public.get_recommended_feed(uuid, integer) from public;
grant execute on function public.get_recommended_professionals(uuid, integer) to authenticated;
grant execute on function public.get_recommended_feed(uuid, integer) to authenticated;
