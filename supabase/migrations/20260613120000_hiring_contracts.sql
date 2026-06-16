create table if not exists public.hiring_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  budget_amount numeric null,
  budget_type text not null default 'fixed',
  currency text not null default 'BRL',
  deadline_type text not null default 'sem_urgencia',
  deadline_date timestamptz null,
  work_mode text not null default 'remote',
  reference_links text null,
  attachments jsonb not null default '[]'::jsonb,
  status text not null default 'open',
  visibility text not null default 'public',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint hiring_posts_status_check check (status in ('open', 'negotiating', 'hired', 'completed', 'cancelled')),
  constraint hiring_posts_visibility_check check (visibility in ('public', 'private')),
  constraint hiring_posts_budget_type_check check (budget_type in ('fixed', 'negotiable')),
  constraint hiring_posts_work_mode_check check (work_mode in ('remote', 'onsite', 'hybrid'))
);

create table if not exists public.hiring_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid null references public.hiring_comments(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hiring_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);

create table if not exists public.hiring_saves (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);

create table if not exists public.hiring_reposts (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);

create table if not exists public.hiring_interests (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  message text null,
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);

create table if not exists public.hiring_proposals (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  message text not null,
  proposed_amount numeric null,
  delivery_deadline text null,
  portfolio_links text null,
  attachments jsonb not null default '[]'::jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(post_id, sender_id),
  constraint hiring_proposals_status_check check (status in ('pending', 'accepted', 'rejected', 'cancelled')),
  constraint hiring_proposals_no_self_check check (sender_id <> receiver_id)
);

create table if not exists public.hiring_conversations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.hiring_posts(id) on delete cascade,
  client_id uuid not null references auth.users(id) on delete cascade,
  professional_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(post_id, client_id, professional_id),
  constraint hiring_conversations_no_self_check check (client_id <> professional_id)
);

create table if not exists public.hiring_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.hiring_conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  read_at timestamptz null
);

create index if not exists hiring_posts_public_recent_idx on public.hiring_posts (created_at desc) where visibility = 'public';
create index if not exists hiring_posts_user_recent_idx on public.hiring_posts (user_id, created_at desc);
create index if not exists hiring_comments_post_recent_idx on public.hiring_comments (post_id, created_at asc);
create index if not exists hiring_proposals_receiver_idx on public.hiring_proposals (receiver_id, created_at desc);
create index if not exists hiring_messages_conversation_idx on public.hiring_messages (conversation_id, created_at asc);

create or replace function public.touch_hiring_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists hiring_posts_touch_updated_at on public.hiring_posts;
create trigger hiring_posts_touch_updated_at
before update on public.hiring_posts
for each row execute function public.touch_hiring_updated_at();

drop trigger if exists hiring_comments_touch_updated_at on public.hiring_comments;
create trigger hiring_comments_touch_updated_at
before update on public.hiring_comments
for each row execute function public.touch_hiring_updated_at();

drop trigger if exists hiring_proposals_touch_updated_at on public.hiring_proposals;
create trigger hiring_proposals_touch_updated_at
before update on public.hiring_proposals
for each row execute function public.touch_hiring_updated_at();

drop trigger if exists hiring_conversations_touch_updated_at on public.hiring_conversations;
create trigger hiring_conversations_touch_updated_at
before update on public.hiring_conversations
for each row execute function public.touch_hiring_updated_at();

alter table public.hiring_posts enable row level security;
alter table public.hiring_comments enable row level security;
alter table public.hiring_likes enable row level security;
alter table public.hiring_saves enable row level security;
alter table public.hiring_reposts enable row level security;
alter table public.hiring_interests enable row level security;
alter table public.hiring_proposals enable row level security;
alter table public.hiring_conversations enable row level security;
alter table public.hiring_messages enable row level security;

drop policy if exists "Public hiring posts are readable" on public.hiring_posts;
create policy "Public hiring posts are readable"
on public.hiring_posts
for select
to authenticated
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
to authenticated
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

drop policy if exists "Users can read hiring likes" on public.hiring_likes;
create policy "Users can read hiring likes" on public.hiring_likes for select to authenticated using (true);
drop policy if exists "Users can manage own hiring likes" on public.hiring_likes;
create policy "Users can manage own hiring likes" on public.hiring_likes for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "Users can read hiring saves" on public.hiring_saves;
create policy "Users can read hiring saves" on public.hiring_saves for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "Users can manage own hiring saves" on public.hiring_saves;
create policy "Users can manage own hiring saves" on public.hiring_saves for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "Users can read hiring reposts" on public.hiring_reposts;
create policy "Users can read hiring reposts" on public.hiring_reposts for select to authenticated using (true);
drop policy if exists "Users can manage own hiring reposts" on public.hiring_reposts;
create policy "Users can manage own hiring reposts" on public.hiring_reposts for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "Users can read hiring interests" on public.hiring_interests;
create policy "Users can read hiring interests"
on public.hiring_interests
for select
to authenticated
using (
  user_id = (select auth.uid())
  or exists (select 1 from public.hiring_posts p where p.id = hiring_interests.post_id and p.user_id = (select auth.uid()))
);

drop policy if exists "Users can create own hiring interests" on public.hiring_interests;
create policy "Users can create own hiring interests"
on public.hiring_interests
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (select 1 from public.hiring_posts p where p.id = post_id and p.user_id <> (select auth.uid()))
);

drop policy if exists "Users can delete own hiring interests" on public.hiring_interests;
create policy "Users can delete own hiring interests"
on public.hiring_interests
for delete
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Proposal participants can read" on public.hiring_proposals;
create policy "Proposal participants can read"
on public.hiring_proposals
for select
to authenticated
using (sender_id = (select auth.uid()) or receiver_id = (select auth.uid()));

drop policy if exists "Users can create own proposals" on public.hiring_proposals;
create policy "Users can create own proposals"
on public.hiring_proposals
for insert
to authenticated
with check (
  sender_id = (select auth.uid())
  and sender_id <> receiver_id
  and exists (select 1 from public.hiring_posts p where p.id = post_id and p.user_id = receiver_id)
);

drop policy if exists "Proposal participants can update" on public.hiring_proposals;
create policy "Proposal participants can update"
on public.hiring_proposals
for update
to authenticated
using (sender_id = (select auth.uid()) or receiver_id = (select auth.uid()))
with check (sender_id = (select auth.uid()) or receiver_id = (select auth.uid()));

drop policy if exists "Conversation participants can read" on public.hiring_conversations;
create policy "Conversation participants can read"
on public.hiring_conversations
for select
to authenticated
using (client_id = (select auth.uid()) or professional_id = (select auth.uid()));

drop policy if exists "Users can create hiring conversations" on public.hiring_conversations;
create policy "Users can create hiring conversations"
on public.hiring_conversations
for insert
to authenticated
with check (
  client_id <> professional_id
  and (client_id = (select auth.uid()) or professional_id = (select auth.uid()))
  and exists (select 1 from public.hiring_posts p where p.id = post_id and p.user_id = client_id)
);

drop policy if exists "Message participants can read" on public.hiring_messages;
create policy "Message participants can read"
on public.hiring_messages
for select
to authenticated
using (exists (
  select 1 from public.hiring_conversations c
  where c.id = hiring_messages.conversation_id
    and (c.client_id = (select auth.uid()) or c.professional_id = (select auth.uid()))
));

drop policy if exists "Participants can create messages" on public.hiring_messages;
create policy "Participants can create messages"
on public.hiring_messages
for insert
to authenticated
with check (
  sender_id = (select auth.uid())
  and exists (
    select 1 from public.hiring_conversations c
    where c.id = conversation_id
      and (c.client_id = (select auth.uid()) or c.professional_id = (select auth.uid()))
  )
);
