-- Cart/community ad tracking is intentionally callable by public clients.
-- The functions are SECURITY DEFINER counters scoped to an ad id and do not expose rows.
grant execute on function public.increment_promoted_beat_impression(uuid) to anon, authenticated;
grant execute on function public.increment_promoted_beat_click(uuid) to anon, authenticated;
