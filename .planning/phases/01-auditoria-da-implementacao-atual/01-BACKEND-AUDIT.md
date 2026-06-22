# Backend Audit: Purchase, Payment, Rights, and Downloads

**Audit date:** 2026-06-22
**Scope:** Current checkout client, Cloudflare Worker, Supabase schema/migrations, RLS, functions, triggers, indexes, and focused tests. No functional changes.

## System Boundaries

| Boundary | Canonical implementation | Responsibility |
|----------|--------------------------|----------------|
| Checkout UI | `checkout/checkout.js` | Collect buyer/method data, request quote/payment/status, retain client idempotency key |
| Edge/payment API | `src/worker.mjs` | Authenticate, rate-limit, validate cart, call Mercado Pago, reconcile attempts, sign downloads |
| Database transaction | `process_checkout()` + `finalize_checkout_payment()` | Lock/validate beats and licenses, create order/items, link payment, ledger/coupon records |
| Rights/documents | `manage_purchase_entitlements()` trigger | Intended creation/revocation of entitlements and license documents |
| Storage authorization | `/api/orders/download` + private Supabase Storage | Validate entitlement/format/path and issue a 300-second signed URL |
| Buyer UI | `script.js` `renderPurchases()` | Read buyer-scoped order/attempt/document data and call signed download API |

## Data Model

### Commercial source entities

**`beats`**
- Seller ownership: `user_id`.
- Sale state: `status`, `sold_exclusively`, `exclusive_buyer_id`.
- Secure file paths: `mp3_path`, `wav_path`, `stems_path`, with legacy `audio_path` fallback.

**`beat_licenses`**
- Identifies beat and license (`beat_id`, `license_key`, `name`).
- Price/currency: `price_cents`, `currency` (default BRL).
- Availability/exclusivity: `is_active`, `is_exclusive`.
- File rights: `included_mp3`, `included_wav`, `included_stems`.
- Economic/usage rights: royalties, stream/video limits, commercial use, monetization, live performance, Content ID, credit, duration, territory, custom terms.

### Checkout/payment entities

**`payment_attempts`**
- Buyer, provider/method, provider payment ID, external reference, client/server idempotency key and cart fingerprint.
- Immutable checkout payload candidate: `cart_items` JSONB plus subtotal/discount/service fee/total.
- Status set: `created`, `pending`, `in_process`, `approved`, `rejected`, `cancelled`, `expired`, `refunded`.
- Links to `orders` only after successful finalization.
- Unique constraints: `external_reference`, `idempotency_key`, `(provider, provider_payment_id)` when non-null.
- RLS: buyer can select own attempts.

**`orders`**
- Buyer, total, status, buyer identity and timestamps.
- Added payment fields: subtotal, discount, service fee, provider, method and provider payment ID.
- Status set is narrower: `pending`, `completed`, `refunded`.
- Unique `(payment_provider, provider_payment_id)` when provider ID exists.
- RLS select restricts to `buyer_id = auth.uid()`.
- Legacy insert policy still permits authenticated buyers to insert their own order; this must be audited/revoked because `status` defaults to `completed`.

**`order_items`**
- Links order, beat and license.
- Current snapshots: license name/terms, price, buyer/producer royalties, included-files text, contract acceptance timestamp/version.
- RLS select permits the buyer of the order or seller of the referenced beat.
- Legacy insert policy permits the buyer to insert own items; the final architecture should reserve creation for the server transaction.

### Rights and delivery entities

**`purchase_entitlements`**
- Buyer/order/item/beat/license link, active/revoked status, allowed-files snapshot, optional download limit/count.
- RLS: buyer reads own; producer reads rights for beats they own.
- Indexes: buyer/status and beat.
- **Gap:** no unique constraint on `order_item_id` or an equivalent business key. `ON CONFLICT DO NOTHING` cannot suppress duplicate random-ID entitlements.

**`license_documents`**
- Buyer, producer, order/item/beat/license, unique contract number, text/version/timestamps.
- RLS: buyer reads own; producer reads documents where they are `producer_id`.
- Deterministic contract number uses item ID prefix and date; unique contract number reduces duplicate document inserts.

**`download_logs`**
- Buyer/order/item/beat/file type, IP, user agent, success, timestamp.
- Buyer can read own logs. Worker inserts through service role.
- Current endpoint records successful downloads only; denied/error audit coverage is not complete.

**`seller_ledger_entries` / `coupon_redemptions`**
- Unique `(order_id, order_item_id)` ledger key and `(coupon_id, order_id)` redemption key.
- Created by `finalize_checkout_payment()` with `ON CONFLICT` protection.

## Current Relationships

```text
auth.users (buyer) -> payment_attempts -> orders -> order_items -> beats -> auth.users (producer)
                                       |              |
                                       |              +-> beat_licenses
                                       +-> purchase_entitlements -> private files
                                       +-> license_documents
                                       +-> seller_ledger_entries
                                       +-> coupon_redemptions
                                       +-> download_logs
```

Important historical references use `ON DELETE SET NULL` for beat/license in some tables, but display/contract generation still depends on current beat/profile data. Producer identity is not stored on `order_items`.

## RLS and Privilege Inventory

| Object | Buyer access | Producer access | Privileged writes | Finding |
|--------|--------------|-----------------|-------------------|---------|
| `orders` | Select own | None directly | Server finalization intended | Legacy buyer insert policy remains |
| `order_items` | Select through own order | Select own beat sales | Server finalization intended | Legacy buyer insert policy remains |
| `payment_attempts` | Select own | None | Worker/service role | Appropriate boundary |
| `purchase_entitlements` | Select own | Select own beat rights | Trigger/service role | Missing business uniqueness |
| `license_documents` | Select own | Select where producer | Trigger/service role | Persistent document boundary exists |
| `download_logs` | Select own | None | Worker/service role | Successful-only logging |
| private storage | Seller paths; buyer via completed order policy | Seller owns files | Storage API/service role | Direct storage policy checks order completed; Worker adds entitlement validation |

`20260620190000_secure_checkout_payments.sql` revokes execute on `process_checkout()` from public/anon/authenticated and grants `finalize_checkout_payment()` only to `service_role`. That is the intended authoritative path. The older table insert policies should be reconciled with it rather than assumed harmless.

## Checkout and Webhook Flow

### Client

1. Checkout opens with beat + license cart items and a generated idempotency key.
2. `/api/checkout/quote` validates the real cart and returns server totals.
3. `/api/checkout/payment` receives method, cart, coupon, buyer, method data and idempotency key.
4. PIX/card results store `attempt_id`; status polling calls `/api/checkout/status`.
5. On paid/approved, checkout navigates through the existing paid callback to purchases.

There is a PayPal mock branch in `checkout/checkout.js`, while the UI marks unavailable methods disabled and the Worker accepts only `pix`/`card`. It must remain unreachable and must never be treated as a real paid order.

### Worker payment creation

1. `checkoutAuthAndPayload()` authenticates the Supabase bearer token and rate-limits the buyer.
2. `validateCheckoutQuote()`/`validateCheckoutCart()` fetches real beat/license rows and computes authoritative totals/fingerprint.
3. Internal idempotency key is namespaced by buyer; existing attempt is reused.
4. New `payment_attempts` row is persisted before Mercado Pago is called.
5. Mercado Pago response is reconciled into attempt status/provider ID.
6. Approved status invokes `finalizeApprovedAttempt()` → service-role RPC `finalize_checkout_payment()`.

### Webhook/status reconciliation

- Webhook accepts only payment notifications, validates ID and HMAC signature with a fresh timestamp, then fetches provider truth.
- Status polling queries the attempt scoped to the authenticated buyer and also fetches provider truth.
- Both paths call the same reconciliation/finalization flow.
- `finalize_checkout_payment()` locks the attempt row `FOR UPDATE`; if `order_id` already exists, it returns the existing order with `idempotent: true`.
- Unique attempt/payment/order indexes provide additional duplicate protection.

**Existing tests:** webhook tests prove timestamp freshness and topic filtering, while the database-contract test checks the presence of payment tables/function/index markers. They do not replay a real finalization against Postgres or assert entitlement/document cardinality.

## Database Finalization Flow

### Intended order

```text
provider approved
  -> payment_attempt.status = approved
  -> finalize_checkout_payment locks attempt
  -> process_checkout locks beats and validates active licenses
  -> orders + order_items created
  -> order payment metadata, ledger and coupon written
  -> payment_attempt.order_id linked
  -> entitlements and contracts exist exactly once
```

### Actual SQL order

1. `finalize_checkout_payment()` locks the approved attempt and calls `process_checkout()`.
2. `process_checkout()` locks all beats, validates availability/license and calculates total.
3. It inserts `orders` immediately with `status = 'completed'`.
4. `AFTER INSERT` fires `manage_purchase_entitlements_trigger` on that order.
5. `manage_purchase_entitlements()` queries `order_items WHERE order_id = new.id`, but no items have been inserted yet; the loop executes zero times.
6. `process_checkout()` then inserts `order_items` and applies exclusive-sale updates.
7. Control returns to `finalize_checkout_payment()`, which updates payment metadata and writes `status = 'completed'` again.
8. The trigger condition requires `old.status <> 'completed'`; `completed -> completed` does not create rights/documents.
9. Ledger/coupon records and `payment_attempt.order_id` can still be written, leaving a paid order with items but no entitlement/document.

### Atomicity assessment

- `process_checkout()` and its caller execute inside the single RPC transaction. An exception while inserting an item or applying exclusivity should roll back order/items and the surrounding finalizer work.
- The entitlement bug is not a partial-transaction exception: the trigger succeeds after processing zero rows, so the transaction can commit an internally incomplete paid purchase.
- The repair should make item/right/document creation part of an explicit finalization sequence after all items exist and fail if mandatory cardinalities are not met.
- No solution should require a synthetic `completed -> completed` update.

## Entitlement and Contract Flow

- Trigger activation condition: first transition into `orders.status = completed`.
- Creation input: current order items joined to current beats/profiles.
- Entitlement carries the allowed-files text snapshot but has no unique item key.
- Contract function receives name, royalties, included files and a hardcoded `'Ilimitados'` stream limit.
- Contract/document generation uses current beat title, producer ID/name and profile at trigger time.
- Refund branch revokes entitlements only for `completed -> refunded` on the order.

### Snapshot gaps

Current `order_items` does not persist:
- Currency.
- Producer ID/name snapshot.
- Beat title/cover snapshot.
- Full license rights/restrictions (stream/video limits, commercial/monetization/live/Content ID, credit, duration, territory).
- Structured allowed-file list/path references.

`license_terms_snapshot` currently chooses custom terms or description; it does not capture the complete license rules. Phase 2 must choose the minimal structured/JSON snapshot that remains authoritative without duplicating the entire contract across tables.

## Download Flow

1. Client sends bearer token plus `beat_id` and `file_type` to `/api/orders/download`.
2. Worker authenticates the user.
3. Service-role query finds active `purchase_entitlements` by buyer + beat.
4. Allowed-file text is parsed for MP3/WAV/stems.
5. Current beat row supplies file path; path must match `{producer_id}/{expected_bucket}/{beat_id}/...`.
6. Supabase Storage signs a 300-second URL.
7. Worker logs a successful download and returns the temporary URL.

### Download gaps

- The first active entitlement for buyer + beat is selected, not a requested `order_item_id`.
- `download_limit`/`download_count` are not enforced or incremented.
- Refund safety depends on order status reaching refunded and the entitlement trigger revoking successfully.
- Denials are not inserted into `download_logs`, despite the schema supporting `success = false`.
- Fallback to legacy audio buckets can be valid, but ownership/path rules must remain consistent.

## Index Inventory

Present indexes include:
- Payment attempt provider payment uniqueness, buyer/created, status/updated, coupon and order.
- Order provider payment uniqueness.
- Coupon seller/buyer/order.
- Ledger seller/order/item and unique order/item.
- Entitlement buyer/status and beat.
- License document buyer/producer/item.
- Download log buyer and beat.

Missing/high-value candidates for Phase 2/3 analysis:
- Unique entitlement by `order_item_id` (or equivalent business key).
- Buyer/status/created index on orders for paginated purchase listing.
- Order item `order_id` index if not implicitly/previously provided.
- Download log order/item/created indexes if operational queries require them.

## Critical Findings

| Severity | Finding | Consequence | Required owner |
|----------|---------|-------------|----------------|
| Blocker | Entitlement trigger fires before items exist | Paid order can commit without rights/document | Phase 2 transaction repair |
| Blocker | Entitlement lacks business uniqueness | Retry/backfill can duplicate rights | Phase 2 constraint/upsert design |
| High | Legacy authenticated insert policies remain on orders/items | Potential bypass of server-only paid-order path if table grants permit | Phase 2 RLS/grant audit |
| High | Snapshot omits currency, producer/beat identity and full license rights | Historical purchase can drift after edits/deletion | Phase 2 snapshot migration |
| High | No backfill exists for paid legacy gaps | Existing buyers may remain without delivery rights | Phase 2 audit/backfill |
| High | Refund reconciliation to `orders.refunded` is not proven end-to-end | Revoked purchase may retain active downloads | Phase 6 lifecycle tests, designed in Phase 2 |
| Medium | Download selects by buyer + beat | Multiple licenses/orders are ambiguous | Phase 5 item-specific authorization |
| Medium | Contract hardcodes unlimited streams and uses current profile data | Document can disagree with purchased license | Phase 5 persistent document repair |
| Medium | PayPal mock branch exists client-side | Must remain unreachable and never create real purchase state | Preserve disabled; regression test |

## Existing Structures to Reuse

- Buyer-scoped `payment_attempts` and unique idempotency/provider keys.
- Worker authentication, cart validation, provider lookup and webhook HMAC verification.
- Attempt row lock and existing-order early return in `finalize_checkout_payment()`.
- Beat row locks and exclusive-license checks in `process_checkout()`.
- Existing order/item snapshot columns as a migration base.
- RLS select policies for buyer/producer, after privilege hardening.
- Private storage and 300-second signed download flow.
- Entitlement/document/log tables after constraints and creation order are corrected.

---

*Backend audit completed for the technical evidence portion of AUD-02 and AUD-03.*
