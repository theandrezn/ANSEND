create index if not exists hiring_posts_public_category_recent_idx
on public.hiring_posts (category, created_at desc)
where visibility = 'public';

create index if not exists hiring_posts_public_status_recent_idx
on public.hiring_posts (status, created_at desc)
where visibility = 'public';

create index if not exists hiring_posts_public_deadline_recent_idx
on public.hiring_posts (deadline_type, created_at desc)
where visibility = 'public';

create index if not exists hiring_posts_public_work_mode_recent_idx
on public.hiring_posts (work_mode, created_at desc)
where visibility = 'public';
