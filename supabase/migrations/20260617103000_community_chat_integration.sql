alter table public.conversations
add column if not exists community_post_id uuid references public.hiring_posts(id) on delete set null,
add column if not exists conversation_type text not null default 'direct',
add column if not exists status text not null default 'active',
add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table public.conversations
drop constraint if exists conversations_status_check;

alter table public.conversations
add constraint conversations_status_check
check (status in ('active', 'archived', 'blocked'));

alter table public.messages
drop constraint if exists messages_type_check;

alter table public.messages
add constraint messages_type_check
check (message_type in ('text', 'proposal', 'system', 'attachment', 'gif', 'audio'));

create index if not exists idx_conversations_community_post_id
on public.conversations(community_post_id);

create index if not exists idx_conversations_community_context
on public.conversations(community_post_id, last_message_at desc)
where community_post_id is not null;

create or replace function public.get_or_create_community_conversation(
  p_post_id uuid,
  p_interaction_type text default 'interest'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_current_user uuid := auth.uid();
  v_post public.hiring_posts%rowtype;
  v_conversation_id uuid;
  v_lock_key bigint;
  v_summary text;
begin
  if v_current_user is null then
    raise exception 'AUTH_REQUIRED' using errcode = '28000';
  end if;

  if p_post_id is null then
    raise exception 'POST_REQUIRED' using errcode = '22023';
  end if;

  select *
    into v_post
  from public.hiring_posts
  where id = p_post_id
    and visibility = 'public';

  if not found then
    raise exception 'POST_NOT_FOUND' using errcode = 'P0002';
  end if;

  if v_post.user_id = v_current_user then
    raise exception 'SELF_CONVERSATION_NOT_ALLOWED' using errcode = '22023';
  end if;

  v_lock_key := hashtextextended(
    concat_ws(':', 'community-chat', p_post_id::text, least(v_current_user::text, v_post.user_id::text), greatest(v_current_user::text, v_post.user_id::text)),
    0
  );
  perform pg_advisory_xact_lock(v_lock_key);

  select c.id
    into v_conversation_id
  from public.conversations c
  where c.community_post_id = p_post_id
    and c.conversation_type = 'community'
    and exists (
      select 1
      from public.conversation_participants cp
      where cp.conversation_id = c.id
        and cp.user_id = v_current_user
    )
    and exists (
      select 1
      from public.conversation_participants cp
      where cp.conversation_id = c.id
        and cp.user_id = v_post.user_id
    )
    and (
      select count(*)
      from public.conversation_participants cp
      where cp.conversation_id = c.id
    ) = 2
  order by c.created_at asc
  limit 1;

  if v_conversation_id is not null then
    update public.conversations
    set metadata = coalesce(metadata, '{}'::jsonb)
      || jsonb_build_object('last_interaction_type', coalesce(nullif(p_interaction_type, ''), 'interest')),
      updated_at = now()
    where id = v_conversation_id;
    return v_conversation_id;
  end if;

  v_summary := left(regexp_replace(coalesce(nullif(v_post.description, ''), v_post.title, ''), '\s+', ' ', 'g'), 220);

  insert into public.conversations (
    created_by,
    type,
    conversation_type,
    community_post_id,
    status,
    metadata
  )
  values (
    v_current_user,
    'direct',
    'community',
    p_post_id,
    'active',
    jsonb_build_object(
      'source', 'community',
      'post_id', p_post_id,
      'post_author_id', v_post.user_id,
      'post_title', coalesce(nullif(v_post.title, ''), 'Publicacao da Comunidade'),
      'post_summary', v_summary,
      'post_created_at', v_post.created_at,
      'last_interaction_type', coalesce(nullif(p_interaction_type, ''), 'interest')
    )
  )
  returning id into v_conversation_id;

  insert into public.conversation_participants (conversation_id, user_id)
  values (v_conversation_id, v_current_user), (v_conversation_id, v_post.user_id)
  on conflict (conversation_id, user_id) do nothing;

  return v_conversation_id;
end;
$$;

revoke all on function public.get_or_create_community_conversation(uuid, text) from public;
revoke execute on function public.get_or_create_community_conversation(uuid, text) from anon;
grant execute on function public.get_or_create_community_conversation(uuid, text) to authenticated;

create or replace function public.process_direct_message_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_actor_name text;
  v_title text;
  v_body text;
begin
  select cp.user_id
    into v_recipient_id
  from public.conversation_participants cp
  where cp.conversation_id = new.conversation_id
    and cp.user_id <> new.sender_id
  limit 1;

  if v_recipient_id is null then
    return new;
  end if;

  if to_regprocedure('public.upsert_notification(uuid,uuid,text,text,uuid,text,text,text)') is null then
    return new;
  end if;

  select coalesce(nullif(display_name, ''), nullif(artistic_name, ''), nullif(full_name, ''), username, 'Alguem')
    into v_actor_name
  from public.profiles
  where id = new.sender_id;

  if new.message_type = 'proposal' then
    v_title := 'Nova proposta recebida';
    v_body := coalesce(v_actor_name, 'Alguem') || ' enviou uma proposta no bate-papo.';
  else
    v_title := 'Nova mensagem';
    v_body := coalesce(v_actor_name, 'Alguem') || ' enviou uma mensagem para voce.';
  end if;

  perform public.upsert_notification(
    v_recipient_id,
    new.sender_id,
    case when new.message_type = 'proposal' then 'chat_proposal' else 'chat_message' end,
    'conversation',
    new.conversation_id,
    v_title,
    v_body,
    '#bate-papo/' || new.conversation_id::text
  );

  return new;
end;
$$;

drop trigger if exists tr_direct_messages_notifications on public.messages;
create trigger tr_direct_messages_notifications
after insert on public.messages
for each row execute function public.process_direct_message_notification();

revoke all privileges on function public.process_direct_message_notification() from public;
revoke all privileges on function public.process_direct_message_notification() from anon;
revoke all privileges on function public.process_direct_message_notification() from authenticated;

do $$
begin
  begin
    alter publication supabase_realtime add table public.conversations;
  exception
    when duplicate_object then null;
    when undefined_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.conversation_participants;
  exception
    when duplicate_object then null;
    when undefined_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.messages;
  exception
    when duplicate_object then null;
    when undefined_object then null;
  end;
end $$;
