create table if not exists public.nexo_feed_comments (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.nexo_feed_comments(id) on delete cascade,
  content text not null check (char_length(trim(content)) between 1 and 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexo_feed_likes (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (source_type, source_id, user_id)
);

create table if not exists public.nexo_feed_saves (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (source_type, source_id, user_id)
);

create table if not exists public.nexo_feed_comment_likes (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references public.nexo_feed_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (comment_id, user_id)
);

alter table public.nexo_feed_comments enable row level security;
alter table public.nexo_feed_likes enable row level security;
alter table public.nexo_feed_saves enable row level security;
alter table public.nexo_feed_comment_likes enable row level security;

create index if not exists nexo_feed_comments_source_idx on public.nexo_feed_comments (source_type, source_id, created_at desc);
create index if not exists nexo_feed_comments_user_idx on public.nexo_feed_comments (user_id, created_at desc);
create index if not exists nexo_feed_likes_source_idx on public.nexo_feed_likes (source_type, source_id);
create index if not exists nexo_feed_saves_source_idx on public.nexo_feed_saves (source_type, source_id);
create index if not exists nexo_feed_comment_likes_comment_idx on public.nexo_feed_comment_likes (comment_id);

drop trigger if exists nexo_feed_comments_set_updated_at on public.nexo_feed_comments;
create trigger nexo_feed_comments_set_updated_at
before update on public.nexo_feed_comments
for each row execute function public.set_updated_at();

drop policy if exists "NEXO feed comments are readable" on public.nexo_feed_comments;
create policy "NEXO feed comments are readable"
on public.nexo_feed_comments for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed comments" on public.nexo_feed_comments;
create policy "Users can insert own NEXO feed comments"
on public.nexo_feed_comments for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own NEXO feed comments" on public.nexo_feed_comments;
create policy "Users can update own NEXO feed comments"
on public.nexo_feed_comments for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed comments" on public.nexo_feed_comments;
create policy "Users can delete own NEXO feed comments"
on public.nexo_feed_comments for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "NEXO feed likes are readable" on public.nexo_feed_likes;
create policy "NEXO feed likes are readable"
on public.nexo_feed_likes for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed likes" on public.nexo_feed_likes;
create policy "Users can insert own NEXO feed likes"
on public.nexo_feed_likes for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed likes" on public.nexo_feed_likes;
create policy "Users can delete own NEXO feed likes"
on public.nexo_feed_likes for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "NEXO feed saves are readable" on public.nexo_feed_saves;
create policy "NEXO feed saves are readable"
on public.nexo_feed_saves for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed saves" on public.nexo_feed_saves;
create policy "Users can insert own NEXO feed saves"
on public.nexo_feed_saves for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed saves" on public.nexo_feed_saves;
create policy "Users can delete own NEXO feed saves"
on public.nexo_feed_saves for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "NEXO feed comment likes are readable" on public.nexo_feed_comment_likes;
create policy "NEXO feed comment likes are readable"
on public.nexo_feed_comment_likes for select
to anon, authenticated
using (true);

drop policy if exists "Users can insert own NEXO feed comment likes" on public.nexo_feed_comment_likes;
create policy "Users can insert own NEXO feed comment likes"
on public.nexo_feed_comment_likes for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own NEXO feed comment likes" on public.nexo_feed_comment_likes;
create policy "Users can delete own NEXO feed comment likes"
on public.nexo_feed_comment_likes for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select on public.nexo_feed_comments to anon, authenticated;
grant insert, update, delete on public.nexo_feed_comments to authenticated;
grant select on public.nexo_feed_likes to anon, authenticated;
grant insert, delete on public.nexo_feed_likes to authenticated;
grant select on public.nexo_feed_saves to anon, authenticated;
grant insert, delete on public.nexo_feed_saves to authenticated;
grant select on public.nexo_feed_comment_likes to anon, authenticated;
grant insert, delete on public.nexo_feed_comment_likes to authenticated;

create or replace function public.process_nexo_feed_like_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_actor_name text;
  v_title text;
begin
  select coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem')
    into v_actor_name
  from public.profiles
  where id = new.user_id;

  if new.source_type = 'beats' then
    select user_id, title into v_recipient_id, v_title from public.beats where id = new.source_id;
  elsif new.source_type = 'catalog_items' then
    select user_id, title into v_recipient_id, v_title from public.catalog_items where id = new.source_id;
  end if;

  if v_recipient_id is not null then
    perform public.upsert_notification(
      v_recipient_id,
      new.user_id,
      'beat_like',
      'beat',
      new.source_id,
      'Curtida no beat',
      v_actor_name || ' curtiu seu beat "' || coalesce(v_title, 'ANSEND') || '".',
      '#beat-' || new.source_id::text
    );
  end if;

  return new;
end;
$$;

drop trigger if exists tr_nexo_feed_likes_notifications on public.nexo_feed_likes;
create trigger tr_nexo_feed_likes_notifications
after insert on public.nexo_feed_likes
for each row execute function public.process_nexo_feed_like_notification();

create or replace function public.process_nexo_feed_comment_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_actor_name text;
  v_title text;
begin
  select coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem')
    into v_actor_name
  from public.profiles
  where id = new.user_id;

  if new.source_type = 'beats' then
    select user_id, title into v_recipient_id, v_title from public.beats where id = new.source_id;
  elsif new.source_type = 'catalog_items' then
    select user_id, title into v_recipient_id, v_title from public.catalog_items where id = new.source_id;
  end if;

  if v_recipient_id is not null then
    perform public.upsert_notification(
      v_recipient_id,
      new.user_id,
      'community_comment',
      'beat',
      new.source_id,
      'Novo comentario',
      v_actor_name || ' comentou em "' || coalesce(v_title, 'ANSEND') || '".',
      '#beat-' || new.source_id::text
    );
  end if;

  return new;
end;
$$;

drop trigger if exists tr_nexo_feed_comments_notifications on public.nexo_feed_comments;
create trigger tr_nexo_feed_comments_notifications
after insert on public.nexo_feed_comments
for each row execute function public.process_nexo_feed_comment_notification();

create or replace function public.process_nexo_feed_comment_like_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_actor_name text;
  v_source_id uuid;
begin
  select coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem')
    into v_actor_name
  from public.profiles
  where id = new.user_id;

  select user_id, source_id
    into v_recipient_id, v_source_id
  from public.nexo_feed_comments
  where id = new.comment_id;

  if v_recipient_id is not null then
    perform public.upsert_notification(
      v_recipient_id,
      new.user_id,
      'community_like',
      'feed_comment',
      new.comment_id,
      'Curtida no comentario',
      v_actor_name || ' curtiu seu comentario.',
      coalesce('#beat-' || v_source_id::text, '#nexo-feed')
    );
  end if;

  return new;
end;
$$;

drop trigger if exists tr_nexo_feed_comment_likes_notifications on public.nexo_feed_comment_likes;
create trigger tr_nexo_feed_comment_likes_notifications
after insert on public.nexo_feed_comment_likes
for each row execute function public.process_nexo_feed_comment_like_notification();
