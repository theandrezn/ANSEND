create or replace function public.repair_mojibake_text(input_text text)
returns text
language plpgsql
immutable
strict
as $$
declare
  result text := input_text;
  previous text;
begin
  for _pass in 1..3 loop
    previous := result;

    result := replace(result, chr(195) || chr(131) || chr(194) || chr(170), 'ê');
    result := replace(result, chr(195) || chr(131) || chr(194) || chr(161), 'á');
    result := replace(result, chr(195) || chr(131) || chr(194) || chr(169), 'é');
    result := replace(result, chr(195) || chr(131) || chr(194) || chr(173), 'í');
    result := replace(result, chr(195) || chr(131) || chr(194) || chr(179), 'ó');
    result := replace(result, chr(195) || chr(131) || chr(194) || chr(186), 'ú');
    result := replace(result, chr(195) || chr(131) || chr(194) || chr(167), 'ç');
    result := replace(result, chr(195) || chr(131) || chr(194) || chr(163), 'ã');

    result := replace(result, chr(195) || chr(161), 'á');
    result := replace(result, chr(195) || chr(160), 'à');
    result := replace(result, chr(195) || chr(162), 'â');
    result := replace(result, chr(195) || chr(163), 'ã');
    result := replace(result, chr(195) || chr(169), 'é');
    result := replace(result, chr(195) || chr(170), 'ê');
    result := replace(result, chr(195) || chr(173), 'í');
    result := replace(result, chr(195) || chr(179), 'ó');
    result := replace(result, chr(195) || chr(180), 'ô');
    result := replace(result, chr(195) || chr(181), 'õ');
    result := replace(result, chr(195) || chr(186), 'ú');
    result := replace(result, chr(195) || chr(167), 'ç');
    result := replace(result, chr(195) || chr(129), 'Á');
    result := replace(result, chr(195) || chr(137), 'É');
    result := replace(result, chr(195) || chr(141), 'Í');
    result := replace(result, chr(195) || chr(147), 'Ó');
    result := replace(result, chr(195) || chr(154), 'Ú');
    result := replace(result, chr(195) || chr(135), 'Ç');

    result := replace(result, chr(194) || chr(183), '·');
    result := replace(result, chr(194) || chr(160), ' ');
    result := replace(result, chr(226) || chr(128) || chr(148), '—');
    result := replace(result, chr(226) || chr(128) || chr(147), '–');
    result := replace(result, chr(226) || chr(128) || chr(153), '’');
    result := replace(result, chr(226) || chr(128) || chr(156), '“');
    result := replace(result, chr(226) || chr(128) || chr(157), '”');
    result := replace(result, chr(226) || chr(128) || chr(162), '•');

    exit when result = previous;
  end loop;

  return result;
end;
$$;

create or replace function public.repair_mojibake_jsonb(input_json jsonb)
returns jsonb
language plpgsql
immutable
strict
as $$
declare
  json_type text := jsonb_typeof(input_json);
  repaired jsonb;
begin
  if json_type = 'string' then
    return to_jsonb(public.repair_mojibake_text(input_json #>> '{}'));
  elsif json_type = 'array' then
    select coalesce(jsonb_agg(public.repair_mojibake_jsonb(value)), '[]'::jsonb)
    into repaired
    from jsonb_array_elements(input_json) as value;
    return repaired;
  elsif json_type = 'object' then
    select coalesce(jsonb_object_agg(public.repair_mojibake_text(key), public.repair_mojibake_jsonb(value)), '{}'::jsonb)
    into repaired
    from jsonb_each(input_json);
    return repaired;
  end if;

  return input_json;
end;
$$;

do $$
declare
  column_record record;
  marker_sql text := '(position(chr(195) in %1$s) > 0 or position(chr(194) in %1$s) > 0 or position(chr(226) in %1$s) > 0 or position(chr(65533) in %1$s) > 0)';
begin
  for column_record in
    select table_schema, table_name, column_name, data_type
    from information_schema.columns
    where table_schema = 'public'
      and data_type in ('text', 'character varying', 'character', 'json', 'jsonb')
  loop
    if column_record.data_type in ('json', 'jsonb') then
      execute format(
        'update %I.%I set %I = public.repair_mojibake_jsonb(%I::jsonb)::%s where %I is not null and ' || format(marker_sql, format('%I::text', column_record.column_name)),
        column_record.table_schema,
        column_record.table_name,
        column_record.column_name,
        column_record.column_name,
        column_record.data_type,
        column_record.column_name
      );
    else
      execute format(
        'update %I.%I set %I = public.repair_mojibake_text(%I) where %I is not null and ' || format(marker_sql, format('%I', column_record.column_name)),
        column_record.table_schema,
        column_record.table_name,
        column_record.column_name,
        column_record.column_name,
        column_record.column_name
      );
    end if;
  end loop;
end;
$$;
