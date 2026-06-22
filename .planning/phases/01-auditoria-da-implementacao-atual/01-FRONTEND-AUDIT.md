# Frontend Audit: Pedidos e Compras

**Audit date:** 2026-06-22
**Scope:** Existing browser route, renderer, state, queries, shared flows, styles, and tests. No functional changes.

## Route and Entry Points

- Canonical route: `#compras`.
- Desktop/sidebar entry: `index.html:106` uses `data-route="compras"` and `href="#compras"`.
- Account dropdown entry: `index.html:279` points to the same route.
- Route parsing: `currentRouteFromHash()` in `script.js:4208` strips the query string, so `#compras?...` remains the `compras` route.
- Route guard: `protectedRoute()` in `script.js:10790` includes `compras`; access is based on `hasAccountAccess()` / `appState.authUser`.
- Dispatcher: `renderRoute()` in `script.js:18383` calls `renderPurchases()` for `route === "compras"` around `script.js:18447`.
- Shared heading: `pageIntro("compras")` uses `routeTitles.compras` (`script.js:4683`) and shared route translation keys.
- There is no second page or parallel route. List and detail are branches of the same `renderPurchases()` function.

## State and Data Sources

### Authoritative/real sources

- Authenticated identity: `appState.authUser`, populated from Supabase Auth and updated by `supabaseClient.auth.onAuthStateChange()` around `script.js:10954`.
- Orders: `loadUserPurchases()` (`script.js:11865`) queries `orders` filtered by `.eq("buyer_id", appState.authUser.id)` with nested `order_items`.
- Unconverted payment attempts: the same loader queries `payment_attempts` for the buyer with `order_id IS NULL`.
- Purchased beats: UUIDs from orders/attempts are resolved through the in-memory marketplace pool and then a `beats` query for missing IDs.
- Producer profiles: resolved through a separate `profiles` query keyed by producer IDs.
- Contracts: detail queries `license_documents.contract_text` by `order_item_id`.
- Secure files: `downloadPurchasedFile()` (`script.js:24377`) calls `/api/orders/download` with the active Supabase bearer token.

### Local/cache/UI sources

- `appState.purchasedBeatsCache` is an in-memory cache used to avoid repeat beat lookups. It is not durable ownership evidence.
- `comprasActiveTab`, `comprasSearch`, `comprasSort`, and `comprasVisibleCount` are UI state and are suitable for ephemeral/local preference storage.
- `appState.purchases`, `appState.orders`, and `appState.contracts` are initialized from `ansend-purchases`, `ansend-orders`, and `ansend-contracts` in `localStorage` at `script.js:1292-1294`.
- `persistState()` writes those collections back to `localStorage` at `script.js:4875-4879`.
- `clearPurchases()` clears the legacy local collections. The purchase page currently displays “Limpar dados locais” even though the rendered authenticated collection is loaded from Supabase.

**Finding:** `localStorage` does not currently authorize the Supabase queries or secure download endpoint, but its purchase/order/contract collections create an ambiguous second state model. Phase 3 must retain only temporary UI preferences and remove it as a purchase/payment/right/document source.

## List Flow

1. `renderPurchases()` checks Supabase/auth and shows the shared login empty state when unavailable.
2. It registers global search/sort/tab/load-more functions on `window`.
3. Without detail query parameters, it calls `loadUserPurchases()`.
4. Orders and orphan payment attempts are normalized into `allUnifiedItems`; one purchase item is emitted per `order_item`, while attempts are reconstructed from `cart_items`.
5. Status tabs are applied in memory: completed/approved, pending/created, in_process, rejected/cancelled/expired, and refunded.
6. Search and sort run against the fully loaded collection.
7. “Pagination” is `filteredItems.slice(0, comprasVisibleCount)` at `script.js:12547-12549`; the browser has already fetched all orders, nested items, attempts, missing beats, and producer profiles.
8. Cards link to `#compras?id={orderId}&item_id={itemId}` or `#compras?attempt_id={attemptId}`.

### List data displayed

- Beat cover/title from the current beat row or fallback.
- Producer name/avatar from the current profile/beat row.
- License, price, formats, date, derived public label (`PED-`/`ATT-`) and status badge.
- “Acessar arquivos” for completed/approved; “Ver detalhes” otherwise.

### List gaps

- No query-level range/cursor; scale cost grows with the whole history.
- Status mapping is duplicated in markup logic instead of a single adapter.
- Current beat/profile edits can change how an old purchase appears because the display is not fully snapshot-driven.
- Query errors are logged, then replaced with empty arrays, which can turn a backend error into an empty state.
- Inline CSS and event attributes make the route harder to isolate and test.

## Detail Flow

1. `renderPurchases()` parses `location.hash` manually into `queryParams`.
2. `id`/`item_id` select from the already buyer-filtered `context.orders`; `attempt_id` selects from buyer-filtered attempts.
3. Missing/foreign IDs yield the same “Pedido ou compra não encontrada” UI because RLS/client filtering returns no match.
4. Beat and producer presentation is resolved from the current `beats` and `profiles` records.
5. Status controls whether downloads are rendered; completed/approved is considered available.
6. Contract text is queried from `license_documents`; if absent, the browser calls `generateContractText()` using current/default values.
7. Allowed download buttons are derived by parsing `filesIncluded` text and call the secure Worker endpoint by beat + file type.

### Detail gaps

- Attempt detail assumes `cart_items[0]`; order detail supports item selection but defaults to the first item.
- Contract fallback is not persistent, not cross-device, and may use default royalties/limits rather than the immutable purchase snapshot.
- Display metadata still depends on current beat/profile records.
- Download request identifies beat + format, not the specific `order_id`/`order_item_id`; backend chooses the first active entitlement.
- Internal UUIDs are present in the hash. RLS is the real security boundary, but future public identifiers should not replace authorization.

## Current Rendering and Loading States

- Login required: shared `emptyState()`.
- Initial detail loading: centered Lucide spinner.
- Empty history: shared empty state linked to explore.
- No filter result: shared empty state.
- Generic exception: static error text without an explicit retry action.
- List loading has no dedicated skeleton; the async renderer can leave the previous content visible until data resolves.

## Preliminary Classification

| Element | Current role | Classification | Reason |
|---------|--------------|----------------|--------|
| `#compras` | Canonical list/detail route | Preserve | Explicit architectural constraint |
| `renderPurchases()` | Existing renderer for list/detail | Preserve + correct | Must remain canonical; internals need separation and reliable state |
| `loadUserPurchases()` | Buyer-scoped Supabase loader | Reuse + correct | Real data path exists; needs backend pagination, error semantics and snapshot DTO |
| `appState.authUser` | Current authenticated identity | Preserve | Shared Supabase Auth contract |
| Purchase/order/contract `localStorage` keys | Legacy second purchase state | Remove as source | Cannot determine ownership, payment, rights or documents |
| Tab/search/sort state | Temporary interface state | Preserve | Safe as ephemeral UI preference |
| `filteredItems.slice()` | Client-only pagination | Replace | Loads all data before pagination |
| Browser `generateContractText()` fallback | Visual/legal fallback | Remove or justify | Not persistent or guaranteed to match purchased terms |
| `/api/orders/download` client call | Secure download entry | Preserve + refine | Uses bearer auth and server authorization |

---

*Task 1 inventory completed; shared-flow and final frontend matrix follow in Task 2.*
