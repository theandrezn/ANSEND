create index if not exists idx_conversations_created_by on public.conversations(created_by);

revoke execute on function public.get_or_create_direct_conversation(uuid) from anon;
revoke execute on function public.is_conversation_participant(uuid, uuid) from anon;
revoke execute on function public.touch_direct_message_conversation() from anon;
revoke execute on function public.touch_direct_message_conversation() from authenticated;

alter policy "Participants can read conversations"
on public.conversations
using (public.is_conversation_participant(id, (select auth.uid())));

alter policy "Authenticated users can create conversations"
on public.conversations
with check (created_by = (select auth.uid()));

alter policy "Participants can read conversation members"
on public.conversation_participants
using (public.is_conversation_participant(conversation_id, (select auth.uid())));

alter policy "Users can add themselves to owned conversations"
on public.conversation_participants
with check (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.conversations c
    where c.id = conversation_id
      and c.created_by = (select auth.uid())
  )
);

alter policy "Users can update their own read state"
on public.conversation_participants
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

alter policy "Participants can read messages"
on public.messages
using (deleted_at is null and public.is_conversation_participant(conversation_id, (select auth.uid())));

alter policy "Participants can send messages"
on public.messages
with check (sender_id = (select auth.uid()) and public.is_conversation_participant(conversation_id, (select auth.uid())));

alter policy "Users can update their own messages"
on public.messages
using (sender_id = (select auth.uid()) and public.is_conversation_participant(conversation_id, (select auth.uid())))
with check (sender_id = (select auth.uid()) and public.is_conversation_participant(conversation_id, (select auth.uid())));
