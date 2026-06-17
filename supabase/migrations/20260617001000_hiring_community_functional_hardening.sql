grant usage on schema public to anon, authenticated;

grant select on public.hiring_posts to anon, authenticated;
grant insert, update, delete on public.hiring_posts to authenticated;

grant select on public.hiring_comments to anon, authenticated;
grant insert, update, delete on public.hiring_comments to authenticated;

grant select on public.hiring_likes to anon, authenticated;
grant insert, delete on public.hiring_likes to authenticated;

grant select on public.hiring_reposts to anon, authenticated;
grant insert, delete on public.hiring_reposts to authenticated;

grant select on public.hiring_saves to authenticated;
grant insert, delete on public.hiring_saves to authenticated;

alter table public.hiring_posts enable row level security;
alter table public.hiring_comments enable row level security;
alter table public.hiring_likes enable row level security;
alter table public.hiring_reposts enable row level security;
alter table public.hiring_saves enable row level security;

drop policy if exists "Public hiring posts are readable" on public.hiring_posts;
create policy "Public hiring posts are readable"
on public.hiring_posts
for select
to anon, authenticated
using (visibility = 'public' or user_id = (select auth.uid()));

drop policy if exists "Users can create hiring posts" on public.hiring_posts;
create policy "Users can create hiring posts"
on public.hiring_posts
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can update own hiring posts" on public.hiring_posts;
create policy "Users can update own hiring posts"
on public.hiring_posts
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "Users can delete own hiring posts" on public.hiring_posts;
create policy "Users can delete own hiring posts"
on public.hiring_posts
for delete
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Comments on readable posts are readable" on public.hiring_comments;
create policy "Comments on readable posts are readable"
on public.hiring_comments
for select
to anon, authenticated
using (exists (
  select 1 from public.hiring_posts p
  where p.id = hiring_comments.post_id
    and (p.visibility = 'public' or p.user_id = (select auth.uid()))
));

drop policy if exists "Users can create hiring comments" on public.hiring_comments;
create policy "Users can create hiring comments"
on public.hiring_comments
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (select 1 from public.hiring_posts p where p.id = post_id and p.visibility = 'public')
);

drop policy if exists "Users can delete own hiring comments" on public.hiring_comments;
create policy "Users can delete own hiring comments"
on public.hiring_comments
for delete
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Public can read hiring likes" on public.hiring_likes;
create policy "Public can read hiring likes"
on public.hiring_likes
for select
to anon, authenticated
using (true);

drop policy if exists "Users can create own hiring likes" on public.hiring_likes;
create policy "Users can create own hiring likes"
on public.hiring_likes
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can delete own hiring likes" on public.hiring_likes;
create policy "Users can delete own hiring likes"
on public.hiring_likes
for delete
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Public can read hiring reposts" on public.hiring_reposts;
create policy "Public can read hiring reposts"
on public.hiring_reposts
for select
to anon, authenticated
using (true);

drop policy if exists "Users can create own hiring reposts" on public.hiring_reposts;
create policy "Users can create own hiring reposts"
on public.hiring_reposts
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can delete own hiring reposts" on public.hiring_reposts;
create policy "Users can delete own hiring reposts"
on public.hiring_reposts
for delete
to authenticated
using (user_id = (select auth.uid()));

create index if not exists hiring_posts_public_recent_idx
on public.hiring_posts (created_at desc)
where visibility = 'public';

create index if not exists hiring_posts_author_recent_idx
on public.hiring_posts (user_id, created_at desc);

create index if not exists hiring_comments_post_recent_idx
on public.hiring_comments (post_id, created_at asc);

create index if not exists hiring_likes_post_idx
on public.hiring_likes (post_id);

create index if not exists hiring_reposts_post_idx
on public.hiring_reposts (post_id);

create index if not exists hiring_saves_post_idx
on public.hiring_saves (post_id);
