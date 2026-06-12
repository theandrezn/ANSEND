create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.is_current_user_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users admins
    where admins.user_id = auth.uid()
  );
$$;

revoke execute on function public.is_current_user_admin() from public, anon;
grant execute on function public.is_current_user_admin() to authenticated;

create or replace function public.admin_list_profiles()
returns table (
  id uuid,
  email text,
  display_name text,
  full_name text,
  artistic_name text,
  account_role text,
  avatar_url text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_current_user_admin() then
    raise exception 'ANSEND admin permission required' using errcode = '42501';
  end if;

  return query
  select
    profiles.id,
    profiles.email,
    profiles.display_name,
    profiles.full_name,
    profiles.artistic_name,
    profiles.account_role,
    profiles.avatar_url,
    profiles.created_at
  from public.profiles
  order by profiles.created_at desc;
end;
$$;

revoke execute on function public.admin_list_profiles() from public, anon;
grant execute on function public.admin_list_profiles() to authenticated;

create or replace function public.admin_delete_professional_account(target_user_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  target_email text;
begin
  if not public.is_current_user_admin() then
    raise exception 'ANSEND admin permission required' using errcode = '42501';
  end if;

  if target_user_id is null then
    raise exception 'target_user_id is required' using errcode = '22004';
  end if;

  if target_user_id = auth.uid() then
    raise exception 'Admin cannot delete their own account here' using errcode = '42501';
  end if;

  select profiles.email
    into target_email
  from public.profiles
  where profiles.id = target_user_id;

  if target_email is null then
    select users.email
      into target_email
    from auth.users
    where users.id = target_user_id;
  end if;

  delete from public.beats where user_id = target_user_id;
  delete from public.catalog_items where user_id = target_user_id;
  delete from public.profiles where id = target_user_id;
  delete from auth.users where id = target_user_id;

  return jsonb_build_object(
    'deleted_user_id', target_user_id,
    'email', target_email
  );
end;
$$;

revoke execute on function public.admin_delete_professional_account(uuid) from public, anon;
grant execute on function public.admin_delete_professional_account(uuid) to authenticated;
