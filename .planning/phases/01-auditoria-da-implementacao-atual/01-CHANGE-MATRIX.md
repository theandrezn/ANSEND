# Purchase Milestone Change Matrix

**Audit date:** 2026-06-22
**Inputs:** `01-FRONTEND-AUDIT.md`, `01-BACKEND-AUDIT.md`, approved roadmap and requirements.
**Pre-flight:** `git status` was clean before this task; branch `main` was ahead of `origin/main` only by completed planning/audit commits. No functional diff or conflicting agent work was present.

## Classification Rules

- **Preserve:** Keep the current contract and ownership boundary unchanged.
- **Reuse:** Build on the existing implementation; add only the missing behavior.
- **Correct:** Existing implementation is canonical but contains a correctness/security/scaling gap.
- **Remove as source:** May remain only as temporary presentation state, never as authority.
- **Replace locally:** Replace the local mechanism without changing shared/global architecture.

## Consolidated Matrix

| Area | Current implementation/evidence | Classification | Required change | Requirement(s) | Phase | Mandatory verification |
|------|---------------------------------|----------------|-----------------|----------------|-------|------------------------|
| Canonical route | `#compras`; sidebar/dropdown; `renderRoute()` → `renderPurchases()` | Preserve | Keep same route and renderer surface | DETL-01 | 3-5 | No second route/page; route smoke passes |
| Authentication | Supabase session in `appState.authUser`; protected route; bearer token | Preserve | Continue using real authenticated UUID/session | SEC-01, SEC-02 | 2 | User A cannot read/download B |
| List/detail renderer | One `renderPurchases()` branches by hash query | Preserve + correct | Refactor internals only; separate DTO/state/error behavior without duplicate renderer | LIST-01, DETL-01 | 3-4 | List and details remain under `#compras` |
| Buyer order query | `loadUserPurchases()` filters `orders.buyer_id`; nested items | Reuse + correct | Return a paginated, snapshot-first buyer DTO with explicit errors | LIST-01, LIST-05 | 3 | Backend range/cursor verified; no full-load `slice()` |
| Payment attempt query | Buyer-scoped attempts with `order_id IS NULL` | Reuse | Keep pending/failure source; unify status adapter | PAY-03, PAY-04 | 3/6 | Pending/failure never displayed as paid |
| Purchase local state | `ansend-purchases/orders/contracts` + `persistState()` | Remove as source | Delete authoritative semantics and “Limpar dados locais”; permit UI preferences only | LIST-01 | 3 | Refresh/login/device uses DB only |
| Client pagination | Full history + beats/profiles fetched, then `slice()` | Replace locally | Paginate in Supabase/backend before enrichment/response | LIST-05 | 3 | Large history loads bounded page only |
| Search/filter/sort | In-memory over unified collection | Reuse + correct | Preserve UX; define server/client split compatible with pagination | LIST-03, LIST-04 | 3 | Results/status mapping remain correct across pages |
| Shared shell/heading/empty state | Sidebar/navbar, `pageIntro()`, `emptyState()` | Preserve/reuse | Add purchase-local skeleton/retry without global redesign | LIST-06, LIST-07 | 3 | Other routes unchanged |
| Public producer profile | `#perfil-{username}`, `renderPublicProfile()` | Reuse | Resolve actual producer/public projection; keep existing route | DETL-03 | 4 | Link opens correct real profile |
| Direct chat | `openOrCreateDirectConversation()` and existing RPC/route | Reuse | Pass snapshot/current verified producer UUID | DETL-04 | 4 | Existing conversation reused or one real conversation created |
| Shared player | Existing player state/action | Reuse | Keep single player; purchase page only invokes it | QUAL-06 | 3/7 | Player regression tests pass |
| Beat/license source | `beats`, `beat_licenses` | Preserve as sale source | Read current rows for validation; never rewrite historical purchase | DATA-01, DATA-02 | 2 | Editing source does not alter paid snapshot |
| Purchase snapshot | Partial fields in `order_items` | Correct | Add minimal structured snapshot for currency, producer/beat identity and complete rights/restrictions | DATA-01, DATA-02 | 2 | Immutable snapshot/contract test |
| Payment attempt/idempotency | Unique idempotency/external/provider keys; attempt row lock | Reuse + harden | Preserve; extend tests across order/rights/documents | PAY-02 | 2 | Webhook/status/checkout replay has one order/right/document |
| Order/item transaction | `finalize_checkout_payment()` → `process_checkout()` | Reuse + correct | Make full order/items/rights/documents/ledger cardinality atomic | DATA-03, DATA-05 | 2 | Forced item failure rolls back completed purchase |
| Entitlement trigger | `AFTER INSERT/UPDATE status` on order before item creation | Correct first | Move/replace responsibility so items exist before rights and no `completed → completed` is required | DATA-03, DATA-06 | 2 | Paid order always has matching rights/docs |
| Entitlement uniqueness | Random PK only; `ON CONFLICT DO NOTHING` | Correct first | Add business uniqueness/upsert key per purchased item | DATA-03, DATA-04 | 2 | Re-run/backfill cannot duplicate entitlement |
| Legacy paid gaps | No current backfill | Add using existing tables | Audit completed orders; create only missing rights/docs in idempotent transaction | DATA-04 | 2 | Before/after counts and duplicate checks |
| Order/item insert policies | Authenticated buyer insert policies remain | Correct first | Reconcile/revoke direct insert path; preserve RLS select boundaries | SEC-01, SEC-04 | 2 | Client cannot manufacture completed order/item |
| Exclusive sale | Beat locks and license deactivation in `process_checkout()` | Preserve + verify | Keep locking; test concurrent approved attempts | PAY-06 | 2 | Exactly one exclusive purchase succeeds |
| Refund rights | Order trigger revokes on completed → refunded | Correct/verify | Ensure provider refund updates order and reverses rights/ledger | PAY-05 | 6 | Refunded order has no active download |
| Persistent contract | `license_documents` table and buyer/producer RLS | Reuse + correct | Generate from immutable snapshot after items; keep cross-device | FILE-05, FILE-06 | 2/5 | Same document after refresh/login/device |
| Browser contract fallback | `generateContractText()` with current/default values | Remove or justify | Never serve as final legal document; use authorized persisted record | FILE-05 | 5 | Missing DB document is error/recovery, not invented contract |
| Signed downloads | `/api/orders/download`, private buckets, 300s URL | Preserve + refine | Keep signing; authorize specific order item/entitlement | FILE-03, FILE-04 | 5 | Foreign/revoked/wrong-format requests denied |
| Download selection | First active entitlement by buyer + beat | Correct | Require item/order entitlement identity and enforce limits if configured | FILE-01, FILE-03 | 5 | Multiple licenses for same beat resolve correctly |
| Download logs | Success inserts only | Reuse + correct | Record safe relevant failures and enforce useful indexes/retention | FILE-08, PAY-07 | 5/6 | Logs contain no secrets/permanent URLs |
| PayPal simulation | Disabled client branch; Worker supports only PIX/card | Preserve disabled/remove dead path later | Must never create a real purchase/order | PAY-01 | 6 | Unavailable method cannot submit/finalize |
| Existing tests | Route/licensing/checkout/webhook structural checks | Preserve + extend | Add live/integration tests for RLS, transaction, backfill and delivery | QUAL-01..08 | 2/7 | Existing and new suites pass |

## Critical Discovery Resolution

| Discovery | Exact evidence | Classification | Requirement(s) | Phase | Required test/gate |
|-----------|----------------|----------------|----------------|-------|--------------------|
| Trigger runs before `order_items` | `process_checkout()` inserts `orders(status='completed')`; `manage_purchase_entitlements_trigger` fires `AFTER INSERT`; items are inserted only afterward | Correct first | DATA-03, DATA-05, DATA-06 | 2 | Transaction test proves item/right/document cardinality and no `completed → completed` update |
| Old paid orders may lack entitlement/contract | No migration/backfill follows `20260621183000_purchases_member_area.sql`; trigger can legally loop zero rows | Add safe backfill | DATA-04 | 2 | Dry-run counts, idempotent rerun, unique right/document checks |
| Webhook idempotency is incomplete at delivery level | Attempt lock/order link protect order; entitlement has no business uniqueness and existing tests only check timestamp/topic helpers | Reuse + harden | PAY-02, DATA-03 | 2 | Replay real finalization/webhook/status and assert one order/item/right/document/ledger |
| `localStorage` remains in purchase state | `appState.purchases/orders/contracts` initialized/persisted locally; “Limpar dados locais” shown | Remove as source | LIST-01 | 3 | Ownership/payment/rights survive device change and never derive from local keys |
| Pagination occurs after full load | `loadUserPurchases()` fetches all; `filteredItems.slice()` runs after queries/enrichment | Replace locally | LIST-05 | 3 | Supabase range/cursor visible in query and bounded network result |
| Contract fallback is generated in browser | Missing `license_documents` row calls `generateContractText()` with current/default values | Remove or justify | FILE-05 | 5 | Persisted authorized contract is identical after refresh/login/device; missing row cannot invent final document |

## Phase 2 Blocking Gate

Phases 3-7 are blocked from claiming functional completion until all of the following are true:

1. The exact responsibility of `finalize_checkout_payment()`, `process_checkout()`, `manage_purchase_entitlements()` and Worker reconciliation is documented in the Phase 2 plan.
2. A paid order cannot commit without all expected `order_items`, entitlements and license documents.
3. Entitlement/document creation is idempotent and does not depend on `completed → completed`.
4. A forced item/right failure rolls back or fails the finalization atomically.
5. Webhook/status/checkout replay does not duplicate order, rights, documents, ledger or exclusive sale.
6. Paid legacy gaps are measured and backfilled safely with repeatable no-op reruns.
7. Authenticated clients cannot create a fabricated completed order through direct table inserts.
8. RLS continues to isolate buyer data and retain only the producer access needed for own sales.

## Pre-Edit Checklist for Every Implementation Plan

Before editing any functional file:

1. Run `git status --short --branch` and `git diff --name-only`.
2. Reopen every target file immediately before patching.
3. Compare target paths with other agent/worktree changes.
4. Stop and surface conflicts rather than overwriting them.
5. Confirm the plan preserves `#compras`, the existing renderer, Supabase Auth/RLS, Mercado Pago, signed downloads and shared profile/chat/player flows.
6. Confirm tests will prove the requirement rather than only grep for a symbol.

## Phase Handoff

- **Phase 2:** owns transaction order, snapshot, constraints, backfill, RLS/grants, webhook replay and concurrency tests. This is the mandatory next implementation phase.
- **Phase 3:** owns real paginated listing and removal of local purchase authority only after Phase 2 gate passes.
- **Phase 4:** owns snapshot-driven detail plus existing profile/chat integrations.
- **Phase 5:** owns item-specific signed download and persistent authorized contract delivery.
- **Phase 6:** owns full state/refund reconciliation while preserving Phase 2 idempotency.
- **Phase 7:** owns complete authorization, integration, responsive, visual, regression and build evidence.

---

*Matrix completes AUD-04 and provides the implementation guardrails for Phases 2-7.*
