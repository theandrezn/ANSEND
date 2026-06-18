alter table public.hiring_posts
  add column if not exists tags text[] not null default '{}',
  add column if not exists location text null,
  add column if not exists scheduled_at timestamptz null,
  add column if not exists published_at timestamptz not null default now(),
  add column if not exists poll_question text null,
  add column if not exists poll_options jsonb not null default '[]'::jsonb,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create table if not exists public.hiring_attachments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  bucket_id text not null,
  storage_path text not null,
  public_url text not null,
  file_name text not null,
  mime_type text not null,
  file_size_bytes bigint not null,
  attachment_type text not null,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  constraint hiring_attachments_type_check check (attachment_type in ('image', 'audio', 'link')),
  constraint hiring_attachments_bucket_check check (
    (attachment_type = 'image' and bucket_id = 'community-images')
    or (attachment_type = 'audio' and bucket_id = 'community-audio')
    or (attachment_type = 'link')
  ),
  constraint hiring_attachments_file_size_check check (
    (attachment_type = 'image' and file_size_bytes <= 10485760)
    or (attachment_type = 'audio' and file_size_bytes <= 104857600)
    or (attachment_type = 'link')
  )
);

create table if not exists public.hiring_poll_votes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  option_index integer not null check (option_index >= 0 and option_index <= 20),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(post_id, user_id)
);

create table if not exists public.hiring_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null default 'community_post',
  details text null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  unique(post_id, reporter_id),
  constraint hiring_reports_status_check check (status in ('open', 'reviewing', 'closed'))
);

create index if not exists hiring_posts_public_schedule_recent_idx
on public.hiring_posts (scheduled_at, created_at desc)
where visibility = 'public';

create index if not exists hiring_posts_tags_idx
on public.hiring_posts using gin (tags);

create index if not exists hiring_attachments_post_idx
on public.hiring_attachments (post_id, sort_order);

create index if not exists hiring_poll_votes_post_idx
on public.hiring_poll_votes (post_id, option_index);

create index if not exists hiring_reports_post_idx
on public.hiring_reports (post_id, created_at desc);

alter table public.hiring_attachments enable row level security;
alter table public.hiring_poll_votes enable row level security;
alter table public.hiring_reports enable row level security;

grant select on public.hiring_attachments to anon, authenticated;
grant insert, update, delete on public.hiring_attachments to authenticated;
grant select on public.hiring_poll_votes to anon, authenticated;
grant insert, update, delete on public.hiring_poll_votes to authenticated;
grant insert on public.hiring_reports to authenticated;

drop policy if exists "Public hiring posts are readable" on public.hiring_posts;
create policy "Public hiring posts are readable"
on public.hiring_posts
for select
to anon, authenticated
using (
  user_id = (select auth.uid())
  or (
    visibility = 'public'
    and (scheduled_at is null or scheduled_at <= now())
  )
);

drop policy if exists "Readable hiring attachments are visible" on public.hiring_attachments;
create policy "Readable hiring attachments are visible"
on public.hiring_attachments
for select
to anon, authenticated
using (exists (
  select 1 from public.hiring_posts p
  where p.id = hiring_attachments.post_id
    and (
      p.user_id = (select auth.uid())
      or (p.visibility = 'public' and (p.scheduled_at is null or p.scheduled_at <= now()))
    )
));

drop policy if exists "Authors can create hiring attachments" on public.hiring_attachments;
create policy "Authors can create hiring attachments"
on public.hiring_attachments
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.hiring_posts p
    where p.id = post_id
      and p.user_id = (select auth.uid())
  )
);

drop policy if exists "Authors can update hiring attachments" on public.hiring_attachments;
create policy "Authors can update hiring attachments"
on public.hiring_attachments
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "Authors can delete hiring attachments" on public.hiring_attachments;
create policy "Authors can delete hiring attachments"
on public.hiring_attachments
for delete
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Readable hiring poll votes are visible" on public.hiring_poll_votes;
create policy "Readable hiring poll votes are visible"
on public.hiring_poll_votes
for select
to anon, authenticated
using (exists (
  select 1 from public.hiring_posts p
  where p.id = hiring_poll_votes.post_id
    and (
      p.user_id = (select auth.uid())
      or (p.visibility = 'public' and (p.scheduled_at is null or p.scheduled_at <= now()))
    )
));

drop policy if exists "Users can vote once on public hiring polls" on public.hiring_poll_votes;
create policy "Users can vote once on public hiring polls"
on public.hiring_poll_votes
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.hiring_posts p
    where p.id = post_id
      and p.visibility = 'public'
      and jsonb_array_length(p.poll_options) > option_index
      and (p.scheduled_at is null or p.scheduled_at <= now())
  )
);

drop policy if exists "Users can update own hiring poll vote" on public.hiring_poll_votes;
create policy "Users can update own hiring poll vote"
on public.hiring_poll_votes
for update
to authenticated
using (user_id = (select auth.uid()))
with check (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.hiring_posts p
    where p.id = post_id
      and jsonb_array_length(p.poll_options) > option_index
  )
);

drop policy if exists "Users can report other hiring posts" on public.hiring_reports;
create policy "Users can report other hiring posts"
on public.hiring_reports
for insert
to authenticated
with check (
  reporter_id = (select auth.uid())
  and exists (
    select 1 from public.hiring_posts p
    where p.id = post_id
      and p.user_id <> (select auth.uid())
  )
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('community-images', 'community-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('community-audio', 'community-audio', true, 104857600, array['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read community image objects" on storage.objects;
create policy "Public can read community image objects"
on storage.objects
for select
to anon, authenticated
using (bucket_id in ('community-images', 'community-audio'));

drop policy if exists "Users can upload own community media" on storage.objects;
create policy "Users can upload own community media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('community-images', 'community-audio')
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users can update own community media" on storage.objects;
create policy "Users can update own community media"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('community-images', 'community-audio')
  and owner = (select auth.uid())
)
with check (
  bucket_id in ('community-images', 'community-audio')
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Users can delete own community media" on storage.objects;
create policy "Users can delete own community media"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('community-images', 'community-audio')
  and owner = (select auth.uid())
);
