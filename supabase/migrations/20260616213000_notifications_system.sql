-- Migration: Notifications System in ANSEND
-- Created At: 2026-06-16

-- 1. Create notifications table
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references auth.users(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete cascade,
  type text not null,
  entity_type text,
  entity_id uuid,
  title text not null,
  body text,
  action_url text,
  metadata jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Create notification preferences table
create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email_notifications boolean not null default true,
  push_notifications boolean not null default true,
  profile_notifications boolean not null default true,
  beat_notifications boolean not null default true,
  community_notifications boolean not null default true,
  contract_notifications boolean not null default true,
  system_notifications boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Setup Indexes
create index if not exists notifications_recipient_id_idx on public.notifications (recipient_id);
create index if not exists notifications_recipient_unread_idx on public.notifications (recipient_id, is_read) where is_read = false;
create index if not exists notifications_created_at_idx on public.notifications (created_at desc);
create index if not exists notifications_type_idx on public.notifications (type);
create index if not exists notifications_entity_idx on public.notifications (entity_type, entity_id);

-- 4. Enable Row Level Security (RLS)
alter table public.notifications enable row level security;
alter table public.notification_preferences enable row level security;

-- 5. Define RLS Policies
drop policy if exists "Users can read own notifications" on public.notifications;
create policy "Users can read own notifications"
on public.notifications for select
to authenticated
using (recipient_id = auth.uid());

drop policy if exists "Users can update own notifications" on public.notifications;
create policy "Users can update own notifications"
on public.notifications for update
to authenticated
using (recipient_id = auth.uid())
with check (recipient_id = auth.uid());

drop policy if exists "Users can manage own preferences" on public.notification_preferences;
create policy "Users can manage own preferences"
on public.notification_preferences for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- 6. Grant Permissions
grant select, update on public.notifications to authenticated;
grant select, insert, update on public.notification_preferences to authenticated;

-- 7. Helper function to upsert notifications (Security Definer to bypass RLS inside triggers)
create or replace function public.upsert_notification(
  p_recipient_id uuid,
  p_actor_id uuid,
  p_type text,
  p_entity_type text,
  p_entity_id uuid,
  p_title text,
  p_body text,
  p_action_url text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_id uuid;
begin
  -- Do not notify a user of their own actions
  if p_recipient_id = p_actor_id then
    return;
  end if;

  -- Deduplicate: Check if an unread notification of the same type and entity already exists
  select id into existing_id
  from public.notifications
  where recipient_id = p_recipient_id
    and type = p_type
    and (actor_id = p_actor_id or (actor_id is null and p_actor_id is null))
    and (entity_id = p_entity_id or (entity_id is null and p_entity_id is null))
    and is_read = false
  limit 1;

  if existing_id is not null then
    -- Update timestamp to bring it to the top
    update public.notifications
    set created_at = now(),
        updated_at = now(),
        title = p_title,
        body = p_body,
        action_url = p_action_url
    where id = existing_id;
  else
    insert into public.notifications (
      recipient_id,
      actor_id,
      type,
      entity_type,
      entity_id,
      title,
      body,
      action_url
    )
    values (
      p_recipient_id,
      p_actor_id,
      p_type,
      p_entity_type,
      p_entity_id,
      p_title,
      p_body,
      p_action_url
    );
  end if;
end;
$$;

-- 8. Functions and Triggers to automate preferences initialization
create or replace function public.initialize_notification_preferences()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notification_preferences (user_id)
  values (NEW.id)
  on conflict (user_id) do nothing;
  return NEW;
end;
$$;

drop trigger if exists on_profile_created_init_preferences on public.profiles;
create trigger on_profile_created_init_preferences
after insert on public.profiles
for each row execute function public.initialize_notification_preferences();

-- Seed existing profiles with notification preferences
insert into public.notification_preferences (user_id)
select id from public.profiles
on conflict (user_id) do nothing;

-- 9. Trigger on user_events (follows, beat likes, contract hire clicks, beat purchases)
create or replace function public.process_user_event_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_title text;
  v_body text;
  v_action_url text;
  v_actor_name text;
  v_beat_title text;
begin
  -- Resolve actor name
  select coalesce(nullif(display_name, ''), nullif(full_name, ''), 'Alguém')
    into v_actor_name
  from public.profiles
  where id = NEW.user_id;

  -- 1. Follows
  if NEW.event_type = 'follow' and NEW.target_type = 'professional' then
    v_recipient_id := NEW.target_id;
    v_title := 'Novo seguidor';
    v_body := v_actor_name || ' começou a seguir você.';
    
    -- Generate actor route
    select '#perfil-' || coalesce(username, id::text)
      into v_action_url
    from public.profiles
    where id = NEW.user_id;

    perform public.upsert_notification(
      v_recipient_id,
      NEW.user_id,
      'profile_follow',
      'professional',
      NEW.target_id,
      v_title,
      v_body,
      v_action_url
    );

  -- 2. Likes (Save beat)
  elsif NEW.event_type = 'save' and NEW.target_type = 'beat' then
    -- Find beat owner and title
    select user_id, title into v_recipient_id, v_beat_title from public.beats where id = NEW.target_id;
    if v_recipient_id is null then
      select user_id, title into v_recipient_id, v_beat_title from public.catalog_items where id = NEW.target_id;
    end if;

    if v_recipient_id is not null then
      v_title := 'Curtida no beat';
      v_body := v_actor_name || ' favoritou seu beat "' || v_beat_title || '".';
      v_action_url := '#beat-' || NEW.target_id;

      perform public.upsert_notification(
        v_recipient_id,
        NEW.user_id,
        'beat_like',
        'beat',
        NEW.target_id,
        v_title,
        v_body,
        v_action_url
      );
    end if;

  -- 3. Purchases (Buy beat)
  elsif NEW.event_type = 'buy' and NEW.target_type = 'beat' then
    select user_id, title into v_recipient_id, v_beat_title from public.beats where id = NEW.target_id;
    if v_recipient_id is null then
      select user_id, title into v_recipient_id, v_beat_title from public.catalog_items where id = NEW.target_id;
    end if;

    if v_recipient_id is not null then
      v_title := 'Beat comprado';
      v_body := v_actor_name || ' comprou seu beat "' || v_beat_title || '".';
      v_action_url := '#compras';

      perform public.upsert_notification(
        v_recipient_id,
        NEW.user_id,
        'beat_purchase',
        'beat',
        NEW.target_id,
        v_title,
        v_body,
        v_action_url
      );
    end if;

  -- 4. Hire Button Clicks
  elsif NEW.event_type = 'hire' and NEW.target_type = 'professional' then
    v_recipient_id := NEW.target_id;
    v_title := 'Interesse em contratação';
    v_body := v_actor_name || ' quer contratar seus serviços.';
    v_action_url := '#compras';

    perform public.upsert_notification(
      v_recipient_id,
      NEW.user_id,
      'profile_hire',
      'professional',
      NEW.target_id,
      v_title,
      v_body,
      v_action_url
    );

  -- 5. Profile views
  elsif NEW.event_type = 'view' and NEW.target_type = 'professional' then
    v_recipient_id := NEW.target_id;
    v_title := 'Visualização de perfil';
    v_body := 'Alguém visualizou seu perfil profissional.';
    v_action_url := '#perfil';

    perform public.upsert_notification(
      v_recipient_id,
      NEW.user_id,
      'profile_view',
      'professional',
      NEW.target_id,
      v_title,
      v_body,
      v_action_url
    );
  end if;

  return NEW;
end;
$$;

drop trigger if exists tr_user_events_notifications on public.user_events;
create trigger tr_user_events_notifications
after insert on public.user_events
for each row execute function public.process_user_event_notification();


-- 10. Trigger on hiring_likes (community post likes)
create or replace function public.process_hiring_like_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient_id uuid;
  v_post_title text;
  v_actor_name text;
begin
  select user_id, title into v_recipient_id, v_post_title from public.hiring_posts where id = NEW.post_id;
  
  if v_recipient_id is not null then
    select coalesce(nullif(display_name, ''), nullif(full_name, ''), 'Alguém')
      into v_actor_name
    from public.profiles
    where id = NEW.user_id;

    perform public.upsert_notification(
      v_recipient_id,
      NEW.user_id,
      'community_like',
      'post',
      NEW.post_id,
      'Curtida no seu post',
      v_actor_name || ' curtiu seu post "' || v_post_title || '".',
      '#comunidade-' || NEW.post_id
    );
  end if;

  return NEW;
end;
$$;

drop trigger if exists tr_hiring_likes_notifications on public.hiring_likes;
create trigger tr_hiring_likes_notifications
after insert on public.hiring_likes
for each row execute function public.process_hiring_like_notification();


-- 11. Trigger on hiring_comments (community comments and replies)
create or replace function public.process_hiring_comment_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_post_owner_id uuid;
  v_parent_owner_id uuid;
  v_post_title text;
  v_actor_name text;
begin
  -- Resolve post details
  select user_id, title into v_post_owner_id, v_post_title from public.hiring_posts where id = NEW.post_id;
  
  -- Resolve actor name
  select coalesce(nullif(display_name, ''), nullif(full_name, ''), 'Alguém')
    into v_actor_name
  from public.profiles
  where id = NEW.user_id;

  -- 1. Notify post owner
  if v_post_owner_id is not null and v_post_owner_id <> NEW.user_id then
    perform public.upsert_notification(
      v_post_owner_id,
      NEW.user_id,
      'community_comment',
      'post',
      NEW.post_id,
      'Comentário no seu post',
      v_actor_name || ' comentou no seu post "' || v_post_title || '".',
      '#comunidade-' || NEW.post_id
    );
  end if;

  -- 2. Notify parent comment owner (if reply)
  if NEW.parent_id is not null then
    select user_id into v_parent_owner_id from public.hiring_comments where id = NEW.parent_id;
    if v_parent_owner_id is not null and v_parent_owner_id <> NEW.user_id and v_parent_owner_id <> v_post_owner_id then
      perform public.upsert_notification(
        v_parent_owner_id,
        NEW.user_id,
        'community_comment_reply',
        'post',
        NEW.post_id,
        'Resposta em comentário',
        v_actor_name || ' respondeu seu comentário no post "' || v_post_title || '".',
        '#comunidade-' || NEW.post_id
      );
    end if;
  end if;

  return NEW;
end;
$$;

drop trigger if exists tr_hiring_comments_notifications on public.hiring_comments;
create trigger tr_hiring_comments_notifications
after insert on public.hiring_comments
for each row execute function public.process_hiring_comment_notification();


-- 12. Trigger on hiring_proposals (contracts creation & status changes)
create or replace function public.process_hiring_proposal_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_name text;
begin
  -- 1. Insert: New proposal sent to receiver
  if TG_OP = 'INSERT' then
    select coalesce(nullif(display_name, ''), nullif(full_name, ''), 'Alguém')
      into v_actor_name
    from public.profiles
    where id = NEW.sender_id;

    perform public.upsert_notification(
      NEW.receiver_id,
      NEW.sender_id,
      'contract_new',
      'proposal',
      NEW.id,
      'Nova proposta recebida',
      'Você recebeu uma nova proposta de contratação de ' || v_actor_name || '.',
      '#compras'
    );

  -- 2. Update: Proposal status changed
  elsif TG_OP = 'UPDATE' and OLD.status <> NEW.status then
    select coalesce(nullif(display_name, ''), nullif(full_name, ''), 'Alguém')
      into v_actor_name
    from public.profiles
    where id = NEW.receiver_id;

    if NEW.status = 'accepted' then
      perform public.upsert_notification(
        NEW.sender_id,
        NEW.receiver_id,
        'contract_accepted',
        'proposal',
        NEW.id,
        'Proposta aceita',
        'Sua proposta de contratação foi aceita por ' || v_actor_name || '!',
        '#compras'
      );
    elsif NEW.status = 'rejected' then
      perform public.upsert_notification(
        NEW.sender_id,
        NEW.receiver_id,
        'contract_rejected',
        'proposal',
        NEW.id,
        'Proposta recusada',
        'Sua proposta de contratação foi recusada por ' || v_actor_name || '.',
        '#compras'
      );
    end if;
  end if;

  return NEW;
end;
$$;

drop trigger if exists tr_hiring_proposals_notifications on public.hiring_proposals;
create trigger tr_hiring_proposals_notifications
after insert or update on public.hiring_proposals
for each row execute function public.process_hiring_proposal_notification();


-- 13. Trigger on hiring_messages (new message in hire conversation)
create or replace function public.process_hiring_message_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_client_id uuid;
  v_professional_id uuid;
  v_recipient_id uuid;
  v_actor_name text;
begin
  -- Resolve conversation participants
  select client_id, professional_id
    into v_client_id, v_professional_id
  from public.hiring_conversations
  where id = NEW.conversation_id;

  if NEW.sender_id = v_client_id then
    v_recipient_id := v_professional_id;
  else
    v_recipient_id := v_client_id;
  end if;

  if v_recipient_id is not null then
    select coalesce(nullif(display_name, ''), nullif(full_name, ''), 'Alguém')
      into v_actor_name
    from public.profiles
    where id = NEW.sender_id;

    perform public.upsert_notification(
      v_recipient_id,
      NEW.sender_id,
      'contract_message',
      'conversation',
      NEW.conversation_id,
      'Nova mensagem de chat',
      v_actor_name || ' enviou uma mensagem na sua contratação.',
      '#compras'
    );
  end if;

  return NEW;
end;
$$;

drop trigger if exists tr_hiring_messages_notifications on public.hiring_messages;
create trigger tr_hiring_messages_notifications
after insert on public.hiring_messages
for each row execute function public.process_hiring_message_notification();


-- 14. Trigger on catalog_import_batches (catalog import completion/status changes)
create or replace function public.process_catalog_import_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_body text;
begin
  if OLD.status <> NEW.status and NEW.status in ('completed', 'partial', 'failed') then
    if NEW.status = 'completed' then
      v_body := 'Seu catálogo terminou de importar com sucesso. Todos os beats estão disponíveis!';
    elsif NEW.status = 'partial' then
      v_body := 'Sua importação de catálogo foi concluída com algumas falhas. Verifique seus beats.';
    else
      v_body := 'Ocorreu um erro crítico ao processar a importação de catálogo.';
    end if;

    perform public.upsert_notification(
      NEW.user_id,
      null, -- System action
      'system',
      'catalog_batch',
      NEW.id,
      'Sincronização de catálogo',
      v_body,
      '#musicas'
    );
  end if;

  return NEW;
end;
$$;

drop trigger if exists tr_catalog_import_notifications on public.catalog_import_batches;
create trigger tr_catalog_import_notifications
after update on public.catalog_import_batches
for each row execute function public.process_catalog_import_notification();


-- 15. RPC helper functions for client-side API
create or replace function public.get_notifications(
  p_limit integer default 20,
  p_offset integer default 0
) returns table (
  id uuid,
  recipient_id uuid,
  actor_id uuid,
  actor_name text,
  actor_avatar text,
  type text,
  entity_type text,
  entity_id uuid,
  title text,
  body text,
  action_url text,
  is_read boolean,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  return query
  select
    n.id,
    n.recipient_id,
    n.actor_id,
    coalesce(nullif(p.display_name, ''), nullif(p.full_name, ''), 'Alguém') as actor_name,
    p.avatar_url as actor_avatar,
    n.type,
    n.entity_type,
    n.entity_id,
    n.title,
    n.body,
    n.action_url,
    n.is_read,
    n.created_at
  from public.notifications n
  left join public.profiles p on p.id = n.actor_id
  where n.recipient_id = auth.uid()
  order by n.created_at desc
  limit p_limit
  offset p_offset;
end;
$$;

create or replace function public.get_unread_notifications_count()
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_count integer;
begin
  if auth.uid() is null then
    return 0;
  end if;

  select count(*)::integer into v_count
  from public.notifications
  where recipient_id = auth.uid()
    and is_read = false;

  return v_count;
end;
$$;

create or replace function public.mark_all_notifications_read()
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  update public.notifications
  set is_read = true,
      read_at = now()
  where recipient_id = auth.uid()
    and is_read = false;
end;
$$;

create or replace function public.mark_notification_read(p_notification_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  update public.notifications
  set is_read = true,
      read_at = now()
  where id = p_notification_id
    and recipient_id = auth.uid();
end;
$$;

-- Grant RPC execution permissions to authenticated users
grant execute on function public.get_notifications(integer, integer) to authenticated;
grant execute on function public.get_unread_notifications_count() to authenticated;
grant execute on function public.mark_all_notifications_read() to authenticated;
grant execute on function public.mark_notification_read(uuid) to authenticated;

-- 16. Enable Supabase Realtime replication on public.notifications
do $$
begin
  alter publication supabase_realtime add table public.notifications;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
