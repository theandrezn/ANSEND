drop policy if exists "Public hiring posts are readable" on public.hiring_posts;
create policy "Public hiring posts are readable"
on public.hiring_posts
for select
to anon, authenticated
using (visibility = 'public' or user_id = (select auth.uid()));

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

drop policy if exists "Users can read hiring likes" on public.hiring_likes;
create policy "Public can read hiring likes"
on public.hiring_likes
for select
to anon, authenticated
using (true);

drop policy if exists "Users can read hiring reposts" on public.hiring_reposts;
create policy "Public can read hiring reposts"
on public.hiring_reposts
for select
to anon, authenticated
using (true);
