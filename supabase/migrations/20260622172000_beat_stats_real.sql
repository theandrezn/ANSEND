-- Add columns if they don't exist
alter table public.beats add column if not exists likes_count integer not null default 0;
alter table public.beats add column if not exists plays_count integer not null default 0;

alter table public.catalog_items add column if not exists likes_count integer not null default 0;
alter table public.catalog_items add column if not exists plays_count integer not null default 0;

-- Create play_events table
create table if not exists public.play_events (
  id uuid primary key default gen_random_uuid(),
  beat_id uuid not null,
  user_id uuid references auth.users(id) on delete cascade,
  session_id text not null,
  listened_seconds numeric not null default 0,
  progress numeric not null default 0,
  created_at timestamptz not null default now()
);

-- Index for performance
create index if not exists idx_play_events_beat_id on public.play_events(beat_id);

-- Enable RLS on play_events
alter table public.play_events enable row level security;

-- Policies for play_events
drop policy if exists "Allow inserts to play_events" on public.play_events;
create policy "Allow inserts to play_events"
on public.play_events
for insert
to anon, authenticated
with check (
  (auth.uid() is null and user_id is null) or
  (auth.uid() is not null and user_id = auth.uid())
);

drop policy if exists "Allow select own play_events" on public.play_events;
create policy "Allow select own play_events"
on public.play_events
for select
using (
  (auth.uid() is null) or
  (auth.uid() is not null and user_id = auth.uid())
);

-- Trigger function for plays count increment
create or replace function public.update_plays_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.beats
  set plays_count = coalesce(plays_count, 0) + 1
  where id = new.beat_id;

  update public.catalog_items
  set plays_count = coalesce(plays_count, 0) + 1
  where id = new.beat_id;

  return null;
end;
$$;

drop trigger if exists tr_play_events_count on public.play_events;
create trigger tr_play_events_count
after insert on public.play_events
for each row execute function public.update_plays_count();

-- Trigger function for likes count increment/decrement
create or replace function public.update_likes_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.source_type = 'beats' then
      update public.beats
      set likes_count = coalesce(likes_count, 0) + 1
      where id = new.source_id;
    elsif new.source_type = 'catalog_items' then
      update public.catalog_items
      set likes_count = coalesce(likes_count, 0) + 1
      where id = new.source_id;
    end if;
  elsif tg_op = 'DELETE' then
    if old.source_type = 'beats' then
      update public.beats
      set likes_count = greatest(0, coalesce(likes_count, 0) - 1)
      where id = old.source_id;
    elsif old.source_type = 'catalog_items' then
      update public.catalog_items
      set likes_count = greatest(0, coalesce(likes_count, 0) - 1)
      where id = old.source_id;
    end if;
  end if;
  return null;
end;
$$;

drop trigger if exists tr_nexo_feed_likes_count on public.nexo_feed_likes;
create trigger tr_nexo_feed_likes_count
after insert or delete on public.nexo_feed_likes
for each row execute function public.update_likes_count();

-- Backfill likes count
update public.beats b
set likes_count = (
  select count(*)
  from public.nexo_feed_likes
  where source_type = 'beats' and source_id = b.id
);

update public.catalog_items c
set likes_count = (
  select count(*)
  from public.nexo_feed_likes
  where source_type = 'catalog_items' and source_id = c.id
);

-- Grants
grant select, insert on public.play_events to anon, authenticated;
