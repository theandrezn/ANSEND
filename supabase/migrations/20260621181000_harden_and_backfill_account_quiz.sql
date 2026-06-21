create or replace function public.complete_onboarding_quiz(p_answers jsonb)
returns public.profiles
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_user_id uuid := (select auth.uid());
  completed_profile public.profiles;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  if p_answers is null
    or jsonb_typeof(coalesce(p_answers -> 'genres', 'null'::jsonb)) <> 'array'
    or jsonb_array_length(p_answers -> 'genres') = 0
    or nullif(trim(p_answers ->> 'objective'), '') is null
    or nullif(trim(p_answers ->> 'stage'), '') is null
    or jsonb_typeof(coalesce(p_answers -> 'vibes', 'null'::jsonb)) <> 'array'
    or jsonb_array_length(p_answers -> 'vibes') = 0
    or nullif(trim(p_answers ->> 'budget'), '') is null
    or nullif(trim(p_answers ->> 'userType'), '') is null
  then raise exception 'Required onboarding answers are missing';
  end if;

  insert into public.user_onboarding_quiz (user_id, answers, completed_at, updated_at)
  values (current_user_id, p_answers, now(), now())
  on conflict (user_id) do update set answers = excluded.answers, completed_at = excluded.completed_at, updated_at = excluded.updated_at;

  insert into public.user_preference_profiles (user_id, genres, moods, price_range, license_types, consented_at, updated_at)
  values (
    current_user_id,
    jsonb_build_object('selected', p_answers -> 'genres'),
    jsonb_build_object('selected', p_answers -> 'vibes'),
    jsonb_build_object('label', p_answers ->> 'budget'),
    jsonb_build_object('objective', p_answers ->> 'objective', 'stage', p_answers ->> 'stage', 'userType', p_answers ->> 'userType', 'references', coalesce(p_answers ->> 'references', '')),
    now(), now()
  )
  on conflict (user_id) do update set
    genres = excluded.genres, moods = excluded.moods, price_range = excluded.price_range,
    license_types = excluded.license_types,
    consented_at = coalesce(public.user_preference_profiles.consented_at, excluded.consented_at),
    updated_at = excluded.updated_at;

  update public.profiles set
    quiz_completed = true,
    quiz_completed_at = now(),
    music_styles = array(select jsonb_array_elements_text(p_answers -> 'genres')),
    onboarding_goal = p_answers ->> 'objective',
    updated_at = now()
  where id = current_user_id returning * into completed_profile;
  if completed_profile.id is null then raise exception 'Profile not found'; end if;
  return completed_profile;
end;
$$;

revoke execute on function public.complete_onboarding_quiz(jsonb) from public, anon;
grant execute on function public.complete_onboarding_quiz(jsonb) to authenticated;

-- Accounts created before the durable flag existed keep their current access.
-- New accounts continue to receive the column default (false).
update public.profiles
set
  quiz_completed = true,
  quiz_completed_at = coalesce(quiz_completed_at, updated_at, created_at)
where quiz_completed is false
  and created_at < timestamptz '2026-06-21 18:00:00-03';
