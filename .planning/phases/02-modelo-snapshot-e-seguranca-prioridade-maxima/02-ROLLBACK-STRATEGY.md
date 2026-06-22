# Phase 2 Rollback Strategy

No production migration was applied in this run.

Safe rollout order:

1. Confirm backup/PITR for the Supabase project.
2. Run `02-DIAGNOSTICS.sql` and archive sanitized counts.
3. Apply additive columns and legacy-safe unique indexes.
4. Deploy the atomic finalizer and refund-only trigger.
5. Apply RLS/grant hardening.
6. Run `public.backfill_purchase_delivery(false)`.
7. Review ambiguous rows before any `p_apply = true` execution.

Abort conditions:

- completed order with zero `order_items`;
- duplicate legacy delivery without an unambiguous `order_item_id`;
- unexpected grant/policy drift;
- any migration outside the approved Phase 2 list;
- need to disable RLS or delete data.

Rollback preference:

- revert function bodies and grants forward with a compensating migration;
- do not drop snapshot columns or audit rows after users may have used them;
- do not delete historical entitlements/documents automatically.

