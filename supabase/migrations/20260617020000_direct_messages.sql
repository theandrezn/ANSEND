create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade,
  type text not null default 'direct',
  constraint conversations_type_check check (type in ('direct', 'group'))
);

create table if not exists public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  last_read_at timestamptz,
  constraint conversation_participants_unique unique (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  message_type text not null default 'text',
  metadata jsonb not null default '{}'::jsonb,
  constraint messages_body_length_check check (char_length(body) between 1 and 2000),
  constraint messages_type_check check (message_type in ('text'))
);

create index if not exists idx_messages_conversation_created_at on public.messages(conversation_id, created_at desc);
create index if not exists idx_messages_sender_id on public.messages(sender_id);
create index if not exists idx_messages_visible on public.messages(conversation_id, created_at desc) where deleted_at is null;
create index if not exists idx_conversation_participants_user_id on public.conversation_participants(user_id);
create index if not exists idx_conversation_participants_conversation_id on public.conversation_participants(conversation_id);
create index if not exists idx_conversations_last_message_at on public.conversations(last_message_at desc);

create or replace function public.is_conversation_participant(p_conversation_id uuid, p_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_user_id is not null and exists (
    select 1
    from public.conversation_participants cp
    where cp.conversation_id = p_conversation_id
      and cp.user_id = p_user_id
  );
$$;

revoke all on function public.is_conversation_participant(uuid, uuid) from public;
grant execute on function public.is_conversation_participant(uuid, uuid) to authenticated;

alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Participants can read conversations" on public.conversations;
create policy "Participants can read conversations"
on public.conversations
for select
using (public.is_conversation_participant(id, auth.uid()));

drop policy if exists "Authenticated users can create conversations" on public.conversations;
create policy "Authenticated users can create conversations"
on public.conversations
for insert
to authenticated
with check (created_by = auth.uid());

drop policy if exists "Participants can read conversation members" on public.conversation_participants;
create policy "Participants can read conversation members"
on public.conversation_participants
for select
using (public.is_conversation_participant(conversation_id, auth.uid()));

drop policy if exists "Users can add themselves to owned conversations" on public.conversation_participants;
create policy "Users can add themselves to owned conversations"
on public.conversation_participants
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1 from public.conversations c
    where c.id = conversation_id
      and c.created_by = auth.uid()
  )
);

drop policy if exists "Users can update their own read state" on public.conversation_participants;
create policy "Users can update their own read state"
on public.conversation_participants
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Participants can read messages" on public.messages;
create policy "Participants can read messages"
on public.messages
for select
using (deleted_at is null and public.is_conversation_participant(conversation_id, auth.uid()));

drop policy if exists "Participants can send messages" on public.messages;
create policy "Participants can send messages"
on public.messages
for insert
to authenticated
with check (sender_id = auth.uid() and public.is_conversation_participant(conversation_id, auth.uid()));

drop policy if exists "Users can update their own messages" on public.messages;
create policy "Users can update their own messages"
on public.messages
for update
to authenticated
using (sender_id = auth.uid() and public.is_conversation_participant(conversation_id, auth.uid()))
with check (sender_id = auth.uid() and public.is_conversation_participant(conversation_id, auth.uid()));

create or replace function public.touch_direct_message_conversation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
  set last_message_at = new.created_at,
      updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists trg_touch_direct_message_conversation on public.messages;
create trigger trg_touch_direct_message_conversation
after insert on public.messages
for each row execute function public.touch_direct_message_conversation();

create or replace function public.get_or_create_direct_conversation(p_other_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_current_user uuid := auth.uid();
  v_conversation_id uuid;
begin
  if v_current_user is null then
    raise exception 'AUTH_REQUIRED' using errcode = '28000';
  end if;

  if p_other_user_id is null or p_other_user_id = v_current_user then
    raise exception 'INVALID_PARTICIPANT' using errcode = '22023';
  end if;

  select c.id
    into v_conversation_id
  from public.conversations c
  where c.type = 'direct'
    and exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = c.id and cp.user_id = v_current_user
    )
    and exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = c.id and cp.user_id = p_other_user_id
    )
    and (
      select count(*) from public.conversation_participants cp
      where cp.conversation_id = c.id
    ) = 2
  order by c.created_at asc
  limit 1;

  if v_conversation_id is not null then
    return v_conversation_id;
  end if;

  insert into public.conversations (created_by, type)
  values (v_current_user, 'direct')
  returning id into v_conversation_id;

  insert into public.conversation_participants (conversation_id, user_id)
  values (v_conversation_id, v_current_user), (v_conversation_id, p_other_user_id)
  on conflict (conversation_id, user_id) do nothing;

  return v_conversation_id;
end;
$$;

revoke all on function public.get_or_create_direct_conversation(uuid) from public;
grant execute on function public.get_or_create_direct_conversation(uuid) to authenticated;
