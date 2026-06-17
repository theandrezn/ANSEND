create table if not exists public.nexo_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexo_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.nexo_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz not null default now(),
  constraint nexo_messages_role_check check (role in ('user', 'assistant', 'system')),
  constraint nexo_messages_content_length_check check (char_length(content) between 1 and 12000)
);

create index if not exists idx_nexo_conversations_user_updated on public.nexo_conversations(user_id, updated_at desc);
create index if not exists idx_nexo_messages_conversation_created on public.nexo_messages(conversation_id, created_at asc);
create index if not exists idx_nexo_messages_user_created on public.nexo_messages(user_id, created_at desc);

alter table public.nexo_conversations enable row level security;
alter table public.nexo_messages enable row level security;

drop policy if exists "Users can read own NEXO conversations" on public.nexo_conversations;
create policy "Users can read own NEXO conversations"
on public.nexo_conversations
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can create own NEXO conversations" on public.nexo_conversations;
create policy "Users can create own NEXO conversations"
on public.nexo_conversations
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can update own NEXO conversations" on public.nexo_conversations;
create policy "Users can update own NEXO conversations"
on public.nexo_conversations
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "Users can read own NEXO messages" on public.nexo_messages;
create policy "Users can read own NEXO messages"
on public.nexo_messages
for select
to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.nexo_conversations c
    where c.id = conversation_id
      and c.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can create own NEXO messages" on public.nexo_messages;
create policy "Users can create own NEXO messages"
on public.nexo_messages
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.nexo_conversations c
    where c.id = conversation_id
      and c.user_id = (select auth.uid())
  )
);

create or replace function public.touch_nexo_conversation_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.nexo_conversations
  set updated_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists trg_touch_nexo_conversation_updated_at on public.nexo_messages;
create trigger trg_touch_nexo_conversation_updated_at
after insert on public.nexo_messages
for each row execute function public.touch_nexo_conversation_updated_at();

revoke all privileges on function public.touch_nexo_conversation_updated_at() from public;
revoke all privileges on function public.touch_nexo_conversation_updated_at() from anon;
revoke all privileges on function public.touch_nexo_conversation_updated_at() from authenticated;
