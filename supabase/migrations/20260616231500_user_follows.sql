create table if not exists public.user_follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint user_follows_no_self_follow check (follower_id <> following_id),
  constraint user_follows_unique unique (follower_id, following_id)
);

create index if not exists idx_user_follows_follower_id on public.user_follows(follower_id);
create index if not exists idx_user_follows_following_id on public.user_follows(following_id);
create index if not exists idx_user_follows_pair on public.user_follows(follower_id, following_id);

alter table public.user_follows enable row level security;

drop policy if exists "Public can read follows" on public.user_follows;
create policy "Public can read follows"
on public.user_follows
for select
using (true);

drop policy if exists "Users can follow as themselves" on public.user_follows;
create policy "Users can follow as themselves"
on public.user_follows
for insert
to authenticated
with check ((select auth.uid()) = follower_id and follower_id <> following_id);

drop policy if exists "Users can unfollow as themselves" on public.user_follows;
create policy "Users can unfollow as themselves"
on public.user_follows
for delete
to authenticated
using ((select auth.uid()) = follower_id);

grant select on public.user_follows to anon, authenticated;
grant insert, delete on public.user_follows to authenticated;

create or replace function public.process_user_follow_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_name text;
  v_actor_username text;
  v_action_url text;
begin
  if new.follower_id = new.following_id then
    return new;
  end if;

  select
    coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), 'Alguem'),
    nullif(username, '')
  into v_actor_name, v_actor_username
  from public.profiles
  where id = new.follower_id;

  v_action_url := '#perfil-' || coalesce(v_actor_username, new.follower_id::text);

  perform public.upsert_notification(
    new.following_id,
    new.follower_id,
    'profile_follow',
    'profile',
    new.follower_id,
    'Novo seguidor',
    v_actor_name || ' começou a seguir você.',
    v_action_url
  );

  return new;
end;
$$;

drop trigger if exists tr_user_follows_notifications on public.user_follows;
create trigger tr_user_follows_notifications
after insert on public.user_follows
for each row execute function public.process_user_follow_notification();

do $$
begin
  alter publication supabase_realtime add table public.user_follows;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
