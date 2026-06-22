-- Phase 2 idempotent backfill tooling. Safe by default: dry-run only unless p_apply is true.

create table if not exists public.purchase_backfill_audit (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null,
  order_id uuid,
  order_item_id uuid,
  classification text not null check (classification in ('analyzed', 'corrected', 'skipped', 'ambiguous')),
  reason text not null,
  dry_run boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.purchase_backfill_audit enable row level security;
revoke all on public.purchase_backfill_audit from public, anon, authenticated;

create or replace function public.backfill_purchase_delivery(p_apply boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_run_id uuid := gen_random_uuid();
  v_order record;
  v_analyzed integer := 0;
  v_corrected integer := 0;
  v_skipped integer := 0;
  v_ambiguous integer := 0;
  v_items integer;
  v_active_entitlements integer;
  v_documents integer;
begin
  for v_order in
    select o.*
    from public.orders o
    where o.status = 'completed'
    order by o.created_at, o.id
  loop
    v_analyzed := v_analyzed + 1;
    select count(*) into v_items from public.order_items where order_id = v_order.id;
    select count(*) into v_active_entitlements from public.purchase_entitlements where order_id = v_order.id and status = 'active';
    select count(*) into v_documents from public.license_documents where order_id = v_order.id;

    insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
    values (v_run_id, v_order.id, 'analyzed', 'completed order inspected', not p_apply);

    if v_items = 0 then
      v_ambiguous := v_ambiguous + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, 'ambiguous', 'completed order has no order_items', not p_apply);
    elsif v_active_entitlements = v_items and v_documents = v_items then
      v_skipped := v_skipped + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, 'skipped', 'delivery already complete', not p_apply);
    elsif v_active_entitlements <= v_items and v_documents <= v_items then
      if p_apply then
        update public.orders set status = 'pending' where id = v_order.id;
        perform public.provision_purchase_delivery(v_order.id);
        update public.orders set status = 'completed', updated_at = now(), completed_at = coalesce(completed_at, now()) where id = v_order.id;
      end if;
      v_corrected := v_corrected + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, case when p_apply then 'corrected' else 'skipped' end, case when p_apply then 'delivery provisioned idempotently' else 'would provision delivery' end, not p_apply);
    else
      v_ambiguous := v_ambiguous + 1;
      insert into public.purchase_backfill_audit (run_id, order_id, classification, reason, dry_run)
      values (v_run_id, v_order.id, 'ambiguous', 'delivery cardinality exceeds order_items', not p_apply);
    end if;
  end loop;

  return jsonb_build_object(
    'run_id', v_run_id,
    'dry_run', not p_apply,
    'analyzed', v_analyzed,
    'corrected', case when p_apply then v_corrected else 0 end,
    'would_correct', case when p_apply then 0 else v_corrected end,
    'skipped', v_skipped,
    'ambiguous', v_ambiguous
  );
end;
$$;

revoke execute on function public.backfill_purchase_delivery(boolean) from public, anon, authenticated;
grant execute on function public.backfill_purchase_delivery(boolean) to service_role;

