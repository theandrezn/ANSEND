create index if not exists hiring_comments_user_idx on public.hiring_comments (user_id);
create index if not exists hiring_comments_parent_idx on public.hiring_comments (parent_id);
create index if not exists hiring_likes_user_idx on public.hiring_likes (user_id);
create index if not exists hiring_saves_user_idx on public.hiring_saves (user_id);
create index if not exists hiring_reposts_user_idx on public.hiring_reposts (user_id);
create index if not exists hiring_interests_user_idx on public.hiring_interests (user_id);
create index if not exists hiring_proposals_sender_idx on public.hiring_proposals (sender_id);
create index if not exists hiring_conversations_client_idx on public.hiring_conversations (client_id);
create index if not exists hiring_conversations_professional_idx on public.hiring_conversations (professional_id);
create index if not exists hiring_messages_sender_idx on public.hiring_messages (sender_id);

drop policy if exists "Users can manage own hiring likes" on public.hiring_likes;
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

drop policy if exists "Users can manage own hiring saves" on public.hiring_saves;
drop policy if exists "Users can create own hiring saves" on public.hiring_saves;
create policy "Users can create own hiring saves"
on public.hiring_saves
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can delete own hiring saves" on public.hiring_saves;
create policy "Users can delete own hiring saves"
on public.hiring_saves
for delete
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can manage own hiring reposts" on public.hiring_reposts;
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
