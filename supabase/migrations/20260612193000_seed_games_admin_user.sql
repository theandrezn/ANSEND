insert into public.admin_users (user_id)
values ('9f4a93bd-f8b3-49c8-957c-9bf69410b2f8')
on conflict (user_id) do nothing;
