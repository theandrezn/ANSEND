alter table public.profiles add column if not exists auth_provider text;
alter table public.profiles add column if not exists last_login_at timestamptz;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    account_role,
    artistic_name,
    display_name,
    username,
    avatar_url,
    auth_provider,
    last_login_at,
    music_styles
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'account_role', 'artista'),
    nullif(new.raw_user_meta_data->>'artistic_name', ''),
    nullif(coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'name'), ''),
    nullif(new.raw_user_meta_data->>'username', ''),
    nullif(coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'), ''),
    nullif(new.raw_app_meta_data->>'provider', ''),
    now(),
    case
      when jsonb_typeof(new.raw_user_meta_data->'music_styles') = 'array'
        then array(select jsonb_array_elements_text(new.raw_user_meta_data->'music_styles'))
      else '{}'
    end
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
    account_role = coalesce(nullif(excluded.account_role, ''), public.profiles.account_role),
    artistic_name = coalesce(excluded.artistic_name, public.profiles.artistic_name),
    display_name = coalesce(excluded.display_name, public.profiles.display_name),
    username = coalesce(excluded.username, public.profiles.username),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    auth_provider = coalesce(excluded.auth_provider, public.profiles.auth_provider),
    last_login_at = coalesce(public.profiles.last_login_at, excluded.last_login_at),
    music_styles = case
      when array_length(excluded.music_styles, 1) is null then public.profiles.music_styles
      else excluded.music_styles
    end,
    updated_at = now();

  return new;
end;
$$;

revoke execute on function public.handle_new_auth_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

update public.profiles as profiles
set
  full_name = coalesce(nullif(profiles.full_name, ''), users.raw_user_meta_data->>'full_name', users.raw_user_meta_data->>'name', ''),
  display_name = coalesce(profiles.display_name, users.raw_user_meta_data->>'display_name', users.raw_user_meta_data->>'name'),
  avatar_url = coalesce(profiles.avatar_url, users.raw_user_meta_data->>'avatar_url', users.raw_user_meta_data->>'picture'),
  auth_provider = coalesce(profiles.auth_provider, users.raw_app_meta_data->>'provider'),
  updated_at = now()
from auth.users as users
where profiles.id = users.id;
