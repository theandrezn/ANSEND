-- Migration: Handle user unfollow notification removal
-- Created At: 2026-06-17

create or replace function public.process_user_unfollow_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.notifications
  where recipient_id = old.following_id
    and actor_id = old.follower_id
    and type = 'profile_follow';
  return old;
end;
$$;

drop trigger if exists tr_user_unfollow_notifications on public.user_follows;
create trigger tr_user_unfollow_notifications
after delete on public.user_follows
for each row execute function public.process_user_unfollow_notification();
