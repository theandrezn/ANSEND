create or replace function public.is_current_user_admin()
returns boolean
language sql
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from auth.users users
    where users.id = auth.uid()
      and lower(users.email) = 'games123ytsupremo@gmail.com'
  );
$$;

revoke execute on function public.is_current_user_admin() from public, anon;
grant execute on function public.is_current_user_admin() to authenticated;

insert into public.admin_users (user_id)
select users.id
from auth.users users
where lower(users.email) = 'games123ytsupremo@gmail.com'
on conflict (user_id) do nothing;

drop policy if exists "Users can delete their own beats" on public.beats;
drop policy if exists "Admins can delete beats" on public.beats;
create policy "Admins can delete beats"
on public.beats
for delete
to authenticated
using (public.is_current_user_admin());

drop policy if exists "Users can delete their catalog" on public.catalog_items;
drop policy if exists "Admins can delete catalog items" on public.catalog_items;
create policy "Admins can delete catalog items"
on public.catalog_items
for delete
to authenticated
using (public.is_current_user_admin());

drop policy if exists "Admins can delete beat covers" on storage.objects;
create policy "Admins can delete beat covers"
on storage.objects
for delete
to authenticated
using (bucket_id = 'beat-covers' and public.is_current_user_admin());

drop policy if exists "Admins can delete beat audio" on storage.objects;
create policy "Admins can delete beat audio"
on storage.objects
for delete
to authenticated
using (bucket_id = 'beat-audio' and public.is_current_user_admin());

drop policy if exists "Admins can delete beat stems" on storage.objects;
create policy "Admins can delete beat stems"
on storage.objects
for delete
to authenticated
using (bucket_id = 'beat-stems' and public.is_current_user_admin());

create or replace function public.admin_delete_beat(p_target_id uuid, p_target_source text default null)
returns jsonb
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  source_table text := lower(nullif(p_target_source, ''));
  beat_row public.beats%rowtype;
  catalog_row public.catalog_items%rowtype;
  deleted_source text;
  deleted_title text;
  deleted_user_id uuid;
  storage_errors jsonb := '[]'::jsonb;
begin
  if not public.is_current_user_admin() then
    raise exception 'ANSEND admin permission required' using errcode = '42501';
  end if;

  if p_target_id is null then
    raise exception 'target_id is required' using errcode = '22004';
  end if;

  if source_table is null or source_table in ('', 'beats', 'beat') then
    select *
      into beat_row
    from public.beats
    where id = p_target_id;
  end if;

  if beat_row.id is not null then
    deleted_source := 'beats';
    deleted_title := beat_row.title;
    deleted_user_id := beat_row.user_id;

    delete from public.content_embeddings
    where target_type = 'beat'
      and content_embeddings.target_id = p_target_id;

    delete from public.user_events
    where target_type = 'beat'
      and user_events.target_id = p_target_id;

    begin
      delete from storage.objects
      where (bucket_id = 'beat-covers' and name = beat_row.cover_path)
         or (bucket_id = 'beat-audio' and name = beat_row.audio_path)
         or (bucket_id = 'beat-stems' and name = beat_row.stems_path);
    exception when others then
      storage_errors := storage_errors || jsonb_build_array(sqlerrm);
    end;

    delete from public.beats where id = p_target_id;

    return jsonb_build_object(
      'deleted_id', p_target_id,
      'source_table', deleted_source,
      'title', deleted_title,
      'user_id', deleted_user_id,
      'storage_errors', storage_errors
    );
  end if;

  if source_table is null or source_table in ('', 'catalog_items', 'catalog', 'musicas', 'musica') then
    select *
      into catalog_row
    from public.catalog_items
    where id = p_target_id;
  end if;

  if catalog_row.id is null then
    raise exception 'Beat not found' using errcode = 'P0002';
  end if;

  deleted_source := 'catalog_items';
  deleted_title := catalog_row.title;
  deleted_user_id := catalog_row.user_id;

  delete from public.content_embeddings
  where target_type = 'beat'
    and content_embeddings.target_id = p_target_id;

  delete from public.user_events
  where target_type = 'beat'
    and user_events.target_id = p_target_id;

  delete from public.catalog_items where id = p_target_id;

  return jsonb_build_object(
    'deleted_id', p_target_id,
    'source_table', deleted_source,
    'title', deleted_title,
    'user_id', deleted_user_id,
    'storage_errors', storage_errors
  );
end;
$$;

revoke execute on function public.admin_delete_beat(uuid, text) from public, anon;
grant execute on function public.admin_delete_beat(uuid, text) to authenticated;
