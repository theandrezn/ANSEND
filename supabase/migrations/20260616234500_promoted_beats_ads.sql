create table if not exists public.promoted_beats (
  id uuid primary key default gen_random_uuid(),
  beat_id uuid null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  artist_name text,
  producer_name text,
  cover_url text,
  youtube_thumbnail_url text,
  target_url text,
  price numeric(10, 2),
  price_label text,
  tagline text,
  genre text,
  status text not null default 'draft',
  starts_at timestamptz,
  ends_at timestamptz,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promoted_beats_status_check check (status in ('draft', 'active', 'paused', 'ended', 'rejected')),
  constraint promoted_beats_valid_window check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create index if not exists promoted_beats_active_window_idx
on public.promoted_beats (status, starts_at, ends_at, created_at desc)
where status = 'active';

create index if not exists promoted_beats_user_recent_idx
on public.promoted_beats (user_id, created_at desc);

create or replace function public.touch_promoted_beats_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists promoted_beats_touch_updated_at on public.promoted_beats;
create trigger promoted_beats_touch_updated_at
before update on public.promoted_beats
for each row execute function public.touch_promoted_beats_updated_at();

alter table public.promoted_beats enable row level security;

drop policy if exists "Active promoted beats are readable" on public.promoted_beats;
create policy "Active promoted beats are readable"
on public.promoted_beats
for select
using (
  status = 'active'
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);

drop policy if exists "Users can read own promoted beats" on public.promoted_beats;
create policy "Users can read own promoted beats"
on public.promoted_beats
for select
to authenticated
using (user_id = (select auth.uid()) or public.is_current_user_admin());

drop policy if exists "Users can create own promoted beats" on public.promoted_beats;
create policy "Users can create own promoted beats"
on public.promoted_beats
for insert
to authenticated
with check (user_id = (select auth.uid()) or public.is_current_user_admin());

drop policy if exists "Users can update own promoted beats" on public.promoted_beats;
create policy "Users can update own promoted beats"
on public.promoted_beats
for update
to authenticated
using (user_id = (select auth.uid()) or public.is_current_user_admin())
with check (user_id = (select auth.uid()) or public.is_current_user_admin());

drop policy if exists "Admins can delete promoted beats" on public.promoted_beats;
create policy "Admins can delete promoted beats"
on public.promoted_beats
for delete
to authenticated
using (public.is_current_user_admin());

create or replace function public.increment_promoted_beat_impression(p_ad_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.promoted_beats
  set impressions = impressions + 1
  where id = p_ad_id
    and status = 'active'
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at >= now());
end;
$$;

create or replace function public.increment_promoted_beat_click(p_ad_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.promoted_beats
  set clicks = clicks + 1
  where id = p_ad_id
    and status = 'active'
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at >= now());
end;
$$;

revoke execute on function public.increment_promoted_beat_impression(uuid) from public;
revoke execute on function public.increment_promoted_beat_click(uuid) from public;
grant execute on function public.increment_promoted_beat_impression(uuid) to anon, authenticated;
grant execute on function public.increment_promoted_beat_click(uuid) to anon, authenticated;
