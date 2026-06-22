-- Phase 2 atomic purchase finalization.
-- The old order-status trigger no longer creates entitlements before order_items exist.

drop trigger if exists manage_purchase_entitlements_trigger on public.orders;

create or replace function public.generate_contract_text_sql(
  p_beat_title text,
  p_producer_name text,
  p_buyer_name text,
  p_license_name text,
  p_royalty_buyer numeric,
  p_royalty_producer numeric,
  p_stream_limit text,
  p_included_files text,
  p_date_string text,
  p_order_id uuid
) returns text
language plpgsql
stable
set search_path = public
as $$
begin
  return 'CONTRATO DE LICENCA DE USO DE BEAT/PRODUCAO MUSICAL

Este contrato regula a licenca de exploracao comercial do Beat intitulado "' || coalesce(p_beat_title, 'Beat ANSEND') || '", produzido por ' || coalesce(p_producer_name, 'Produtor ANSEND') || ', doravante denominado "PRODUTOR", adquirido por ' || coalesce(p_buyer_name, 'Comprador ANSEND') || ', doravante denominado "LICENCIADO", nas condicoes estabelecidas sob a licenca "' || coalesce(p_license_name, 'Licenca ANSEND') || '".

1. CONCESSAO E USO
1.1. O PRODUTOR concede ao LICENCIADO uma licenca de uso do Beat conforme os termos historicos capturados no momento da compra.
1.2. Esta licenca e outorgada em carater ' || case when coalesce(p_license_name, '') ilike '%exclusive%' then 'EXCLUSIVO' else 'NAO EXCLUSIVO' end || '.

2. LIMITES E ROYALTIES
2.1. Royalties da Composicao/Master: ' || coalesce(p_royalty_buyer, 0) || '% para o LICENCIADO e ' || coalesce(p_royalty_producer, 0) || '% para o PRODUTOR.
2.2. Streams Digitais: ' || coalesce(nullif(p_stream_limit, ''), 'conforme snapshot da licenca') || '.

3. ARQUIVOS ENTREGUES
O PRODUTOR entrega os arquivos: ' || coalesce(nullif(p_included_files, ''), 'conforme licenca adquirida') || '.

4. DECLARACAO DE ACEITE
O LICENCIADO declara ter lido, compreendido e aceitado os termos deste contrato em ' || coalesce(p_date_string, to_char(now(), 'DD/MM/YYYY')) || '.

Identificador do Pedido: ' || p_order_id::text || '
Gerado eletronicamente na confirmacao do pagamento pela ANSEND.';
end;
$$;

create or replace function public.provision_purchase_delivery(p_order_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_item record;
  v_item_count integer := 0;
  v_entitlement_count integer := 0;
  v_document_count integer := 0;
  v_allowed_files text;
  v_stream_limit text;
  v_contract_text text;
begin
  select * into v_order
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception 'Pedido nao encontrado.';
  end if;

  if v_order.status <> 'pending' then
    raise exception 'Pedido precisa estar pendente para provisionamento atomico.';
  end if;

  select count(*) into v_item_count
  from public.order_items
  where order_id = p_order_id;

  if v_item_count = 0 then
    raise exception 'Pedido sem itens nao pode gerar direitos.';
  end if;

  for v_item in
    select *
    from public.order_items
    where order_id = p_order_id
    order by created_at, id
  loop
    v_allowed_files := coalesce(nullif(v_item.files_included_snapshot, ''), '');
    v_stream_limit := case
      when coalesce((v_item.license_rights_snapshot->>'unlimited_streams')::boolean, false) then 'Ilimitados'
      when nullif(v_item.license_rights_snapshot->>'stream_limit', '') is not null then v_item.license_rights_snapshot->>'stream_limit'
      else 'conforme snapshot da licenca'
    end;

    insert into public.purchase_entitlements (
      buyer_id, order_id, order_item_id, beat_id, license_id, status,
      allowed_files, download_limit, phase2_enforce_unique, source
    ) values (
      v_order.buyer_id, v_order.id, v_item.id, v_item.beat_id, v_item.license_id, 'active',
      v_allowed_files, null, true, 'phase2'
    )
    on conflict (order_item_id) where order_item_id is not null and phase2_enforce_unique is true
    do update set
      status = 'active',
      revoked_at = null,
      revocation_reason = null,
      allowed_files = excluded.allowed_files,
      source = 'phase2';

    v_contract_text := public.generate_contract_text_sql(
      coalesce(v_item.beat_title_snapshot, 'Beat ANSEND'),
      coalesce(v_item.producer_name_snapshot, 'Produtor ANSEND'),
      v_order.buyer_name,
      v_item.license_name_snapshot,
      coalesce(v_item.buyer_royalty_snapshot, 0),
      coalesce(v_item.producer_royalty_snapshot, 0),
      v_stream_limit,
      v_allowed_files,
      to_char(coalesce(v_order.completed_at, v_order.created_at), 'DD/MM/YYYY'),
      v_order.id
    );

    insert into public.license_documents (
      buyer_id, producer_id, order_id, order_item_id, beat_id, license_id,
      contract_number, contract_text, contract_version, phase2_enforce_unique, source
    ) values (
      v_order.buyer_id,
      coalesce(v_item.producer_id_snapshot, '00000000-0000-0000-0000-000000000000'::uuid),
      v_order.id,
      v_item.id,
      v_item.beat_id,
      v_item.license_id,
      'CTR-' || to_char(coalesce(v_order.completed_at, v_order.created_at), 'YYYYMMDD') || '-' || substring(v_item.id::text from 1 for 8),
      v_contract_text,
      coalesce(v_item.accepted_contract_version, '1.0'),
      true,
      'phase2'
    )
    on conflict (order_item_id) where order_item_id is not null and phase2_enforce_unique is true
    do update set
      contract_text = excluded.contract_text,
      contract_version = excluded.contract_version,
      source = 'phase2',
      updated_at = now();
  end loop;

  select count(*) into v_entitlement_count
  from public.purchase_entitlements
  where order_id = p_order_id and status = 'active';

  select count(*) into v_document_count
  from public.license_documents
  where order_id = p_order_id;

  if v_entitlement_count <> v_item_count or v_document_count <> v_item_count then
    raise exception 'Provisionamento incompleto: itens %, direitos %, contratos %.', v_item_count, v_entitlement_count, v_document_count;
  end if;

  return jsonb_build_object(
    'order_id', p_order_id,
    'items', v_item_count,
    'entitlements', v_entitlement_count,
    'documents', v_document_count
  );
end;
$$;

create or replace function public.process_checkout(
  p_buyer_id uuid,
  p_buyer_name text,
  p_buyer_email text,
  p_cart_items jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_item jsonb;
  v_beat record;
  v_license record;
  v_total_cents integer := 0;
  v_files_snapshot text;
  v_file_manifest jsonb;
  v_rights_snapshot jsonb;
begin
  if jsonb_typeof(p_cart_items) <> 'array' or jsonb_array_length(p_cart_items) = 0 then
    raise exception 'Carrinho vazio.';
  end if;

  perform id
  from public.beats
  where id in (select (value->>'beat_id')::uuid from jsonb_array_elements(p_cart_items))
  order by id
  for update;

  for v_item in select * from jsonb_array_elements(p_cart_items) loop
    select * into v_beat
    from public.beats
    where id = (v_item->>'beat_id')::uuid
    for update;

    if not found then raise exception 'Beat nao encontrado.'; end if;
    if v_beat.sold_exclusively then raise exception 'O beat "%" ja foi vendido exclusivamente.', v_beat.title; end if;
    if v_beat.status <> 'published' then raise exception 'O beat "%" nao esta mais disponivel para venda.', v_beat.title; end if;

    select * into v_license
    from public.beat_licenses
    where id = (v_item->>'license_id')::uuid
      and beat_id = v_beat.id
      and is_active = true
    for update;

    if not found then raise exception 'Licenca indisponivel para "%".', v_beat.title; end if;
    v_total_cents := v_total_cents + v_license.price_cents;
  end loop;

  insert into public.orders (
    buyer_id, total_cents, status, buyer_name, buyer_email, buyer_identity_snapshot
  ) values (
    p_buyer_id,
    v_total_cents,
    'pending',
    p_buyer_name,
    p_buyer_email,
    jsonb_strip_nulls(jsonb_build_object('name', p_buyer_name, 'email', p_buyer_email))
  )
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_cart_items) loop
    select * into v_beat
    from public.beats
    where id = (v_item->>'beat_id')::uuid
    for update;

    select * into v_license
    from public.beat_licenses
    where id = (v_item->>'license_id')::uuid
      and beat_id = v_beat.id
      and is_active = true
    for update;

    v_files_snapshot := concat_ws(', ',
      case when v_license.included_mp3 then 'MP3' end,
      case when v_license.included_wav then 'WAV' end,
      case when v_license.included_stems then 'Stems' end
    );

    v_file_manifest := jsonb_strip_nulls(jsonb_build_object(
      'mp3', v_license.included_mp3,
      'wav', v_license.included_wav,
      'stems', v_license.included_stems,
      'formats', array_remove(array[
        case when v_license.included_mp3 then 'mp3' end,
        case when v_license.included_wav then 'wav' end,
        case when v_license.included_stems then 'stems' end
      ], null)
    ));

    v_rights_snapshot := jsonb_strip_nulls(jsonb_build_object(
      'stream_limit', v_license.stream_limit,
      'unlimited_streams', v_license.unlimited_streams,
      'music_video_limit', v_license.music_video_limit,
      'unlimited_music_videos', v_license.unlimited_music_videos,
      'commercial_use', v_license.commercial_use,
      'monetization_allowed', v_license.monetization_allowed,
      'live_performance_allowed', v_license.live_performance_allowed,
      'content_id_allowed', v_license.content_id_allowed,
      'credit_required', v_license.credit_required,
      'credit_text', v_license.credit_text,
      'duration', v_license.duration,
      'territory', v_license.territory,
      'custom_terms', v_license.custom_terms,
      'is_exclusive', v_license.is_exclusive
    ));

    insert into public.order_items (
      order_id, beat_id, license_id, license_name_snapshot, license_terms_snapshot,
      price_cents_snapshot, buyer_royalty_snapshot, producer_royalty_snapshot, files_included_snapshot,
      beat_title_snapshot, beat_cover_url_snapshot, producer_id_snapshot, producer_name_snapshot,
      license_key_snapshot, currency_snapshot, license_rights_snapshot, file_manifest_snapshot
    ) values (
      v_order_id, v_beat.id, v_license.id, v_license.name, coalesce(v_license.custom_terms, v_license.description),
      v_license.price_cents, v_license.buyer_royalty_percentage, v_license.producer_royalty_percentage, v_files_snapshot,
      v_beat.title, v_beat.cover_url, v_beat.user_id,
      coalesce(v_beat.producer_name, 'Produtor ANSEND'),
      v_license.license_key, v_license.currency, v_rights_snapshot, v_file_manifest
    );

    if v_license.is_exclusive then
      update public.beats
      set sold_exclusively = true,
          exclusive_buyer_id = p_buyer_id,
          status = 'sold'
      where id = v_beat.id;

      update public.beat_licenses
      set is_active = false
      where beat_id = v_beat.id;
    end if;
  end loop;

  return jsonb_build_object('order_id', v_order_id, 'total_cents', v_total_cents, 'status', 'pending');
end;
$$;

create or replace function public.finalize_checkout_payment(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt public.payment_attempts%rowtype;
  v_checkout_items jsonb;
  v_checkout_result jsonb;
  v_delivery_result jsonb;
  v_order_id uuid;
  v_item jsonb;
  v_order_item_id uuid;
  v_seller_id uuid;
  v_gross integer;
  v_discount integer;
  v_expected_items integer;
  v_actual_items integer;
begin
  select * into v_attempt
  from public.payment_attempts
  where id = p_attempt_id
  for update;

  if not found then raise exception 'Tentativa de pagamento nao encontrada.'; end if;
  if v_attempt.status <> 'approved' then raise exception 'Pagamento ainda nao aprovado.'; end if;

  if v_attempt.order_id is not null then
    select count(*) into v_actual_items from public.order_items where order_id = v_attempt.order_id;
    if v_actual_items = 0 then raise exception 'Pedido pago sem itens bloqueado para evitar entrega parcial.'; end if;
    return jsonb_build_object('order_id', v_attempt.order_id, 'status', 'completed', 'idempotent', true);
  end if;

  select jsonb_agg(jsonb_build_object('beat_id', value->>'beat_id', 'license_id', value->>'license_id'))
  into v_checkout_items
  from jsonb_array_elements(v_attempt.cart_items);

  v_expected_items := jsonb_array_length(v_checkout_items);
  v_checkout_result := public.process_checkout(v_attempt.buyer_id, v_attempt.buyer_name, v_attempt.buyer_email, v_checkout_items);
  v_order_id := (v_checkout_result->>'order_id')::uuid;

  select count(*) into v_actual_items from public.order_items where order_id = v_order_id;
  if v_actual_items <> v_expected_items then
    raise exception 'Pedido criado parcialmente: esperado %, criado %.', v_expected_items, v_actual_items;
  end if;

  for v_item in select * from jsonb_array_elements(v_attempt.cart_items) loop
    select oi.id, coalesce(oi.producer_id_snapshot, b.user_id) into v_order_item_id, v_seller_id
    from public.order_items oi
    left join public.beats b on b.id = oi.beat_id
    where oi.order_id = v_order_id and oi.beat_id = (v_item->>'beat_id')::uuid
    order by oi.created_at desc limit 1;

    if v_order_item_id is null or v_seller_id is null then
      raise exception 'Item do pedido sem produtor ou identificador.';
    end if;

    v_gross := greatest(0, coalesce((v_item->>'price_cents')::integer, 0));
    v_discount := least(v_gross, greatest(0, coalesce((v_item->>'discount_cents')::integer, 0)));

    insert into public.seller_ledger_entries (seller_id, order_id, order_item_id, gross_cents, discount_cents, net_cents)
    values (v_seller_id, v_order_id, v_order_item_id, v_gross, v_discount, v_gross - v_discount)
    on conflict (order_id, order_item_id) do nothing;
  end loop;

  update public.orders
  set subtotal_cents = v_attempt.subtotal_cents,
      discount_cents = v_attempt.discount_cents,
      service_fee_cents = v_attempt.service_fee_cents,
      total_cents = v_attempt.total_cents,
      payment_provider = v_attempt.provider,
      payment_method = v_attempt.method,
      provider_payment_id = v_attempt.provider_payment_id,
      completed_at = coalesce(completed_at, now())
  where id = v_order_id;

  v_delivery_result := public.provision_purchase_delivery(v_order_id);

  update public.orders
  set status = 'completed', updated_at = now()
  where id = v_order_id;

  if v_attempt.coupon_id is not null then
    insert into public.coupon_redemptions (coupon_id, buyer_id, order_id, discount_cents)
    values (v_attempt.coupon_id, v_attempt.buyer_id, v_order_id, v_attempt.discount_cents)
    on conflict (coupon_id, order_id) do nothing;

    update public.checkout_coupons
    set redemption_count = redemption_count + 1, updated_at = now()
    where id = v_attempt.coupon_id;
  end if;

  update public.payment_attempts
  set order_id = v_order_id, updated_at = now()
  where id = p_attempt_id;

  return jsonb_build_object('order_id', v_order_id, 'status', 'completed', 'idempotent', false, 'delivery', v_delivery_result);
end;
$$;

create or replace function public.manage_purchase_entitlements()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'refunded' and old.status = 'completed' then
    update public.purchase_entitlements
    set status = 'revoked',
        revoked_at = now(),
        revocation_reason = 'Payment refunded'
    where order_id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists manage_purchase_entitlements_trigger on public.orders;
create trigger manage_purchase_entitlements_trigger
after update of status on public.orders
for each row
when (new.status = 'refunded' and old.status = 'completed')
execute function public.manage_purchase_entitlements();

revoke execute on function public.process_checkout(uuid, text, text, jsonb) from public, anon, authenticated;
revoke execute on function public.finalize_checkout_payment(uuid) from public, anon, authenticated;
revoke execute on function public.provision_purchase_delivery(uuid) from public, anon, authenticated;
grant execute on function public.finalize_checkout_payment(uuid) to service_role;

