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

## Shared Components and Flows

| Shared capability | Existing implementation | Used by purchases | Direction |
|-------------------|-------------------------|-------------------|-----------|
| Application shell | Sidebar, navbar, `#appView`, route attributes in `index.html` and `renderRoute()` | Hosts `#compras` and account navigation | Preserve unchanged |
| Authentication | `appState.authUser`, `hasAccountAccess()`, `protectedRoute()`, `registerAuthStateListener()` | Guards route and supplies buyer UUID/token | Preserve unchanged |
| Route heading | `pageIntro()` + `routeTitles` + translation helpers | Renders Pedidos heading/subtitle | Reuse |
| Empty state | `emptyState()` | Login, empty history, no filter results | Reuse, add retry-specific error state locally |
| Public profile | `renderPublicProfile()`, `renderSpotifyProfile()`, `#perfil-{username}` | Producer card links to existing route | Reuse; resolve via public profile projection |
| Direct chat | `openOrCreateDirectConversation()` → `get_or_create_direct_conversation` → `navigateToChatConversation()` | Starts/continues real producer conversation | Reuse unchanged |
| Player | Shared player state/actions and `data-action="play"` | Preview button on purchase card/detail | Reuse; do not fork player logic |
| Notifications/toasts | `showToast()` and `#toastRegion` | Download/status feedback | Reuse, noting most toasts are currently silenced globally |
| Icons | Global Lucide UMD + `lucide.createIcons()` | All purchase icons | Preserve |
| Page transition/hydration | `PageTransition()` and `hydrateView()` after route render | Applies shared shell behavior | Preserve; avoid purchase-only global changes |

### Shared ownership boundary

The purchase milestone may call these shared flows, but must not redesign their global markup or behavior to solve a local `#compras` need. Purchase-specific DTOs, status adapters, loading UI, pagination and styles should remain local to the existing renderer/route surface. Auth, profile, chat and player changes require independent regression evidence because they serve other routes.

## Existing Tests

- `tests/route-stability-check.js` includes `compras` in the route smoke matrix and checks visibility, minimum rendered content, console/page errors, footer behavior and feed-class leakage. In an unauthenticated static run, purchases is expected to render its login/empty surface.
- `tests/responsive-regression-check.js` includes `compras` in multi-viewport screenshots but does not validate real authenticated order data.
- `tests/licensing-system-check.js` is a structural source test. It asserts the presence of `renderPurchases()`, `downloadPurchasedFile()`, `loadUserOrders()`, `generateContractText()` and purchase action handlers; it does not execute RLS, payment, entitlement or download authorization.
- Checkout-specific checks cover database contract, pricing, Mercado Pago structure, webhook replay helpers and visual checkout behavior. They are valuable regression inputs but do not prove the full buyer member area.

**Coverage gap:** no current test proves user A cannot open user B's purchase, that pagination happens in the backend, that a paid order has entitlements/documents, or that the contract remains identical across devices.

## Risks

1. **Two state models:** real Supabase history coexists with legacy purchase/order/contract `localStorage` collections.
2. **False empty states:** loader query errors are logged and normalized to empty arrays.
3. **Unbounded loading:** all orders/items/attempts plus related beats/profiles are fetched before visual pagination.
4. **Mutable historical display:** current beat/profile rows can rewrite how an old purchase looks.
5. **Browser legal fallback:** current/default data can generate a non-persistent contract.
6. **Entitlement ambiguity:** download UI and endpoint identify beat + format rather than selected order item.
7. **Monolith coupling:** markup, data access, event globals and extensive inline styles live inside `script.js`.
8. **Shared regression surface:** profile, chat, player, auth and shell changes can affect unrelated routes.

## Frontend Change Matrix

| Element | Evidence | Classification | Required future action | Phase |
|---------|----------|----------------|------------------------|-------|
| Canonical `#compras` navigation | `index.html:106,279`; `script.js:18447` | Preserve | Keep both nav entries and same route dispatch | 3-5 |
| Single list/detail renderer | `renderPurchases()` branches on hash query | Preserve + correct | Refactor internally only; no second renderer/page | 3-5 |
| Buyer-scoped Supabase orders | `loadUserPurchases()` filters `buyer_id` | Reuse + correct | Replace multi-query/full-load shape with paginated DTO/query and explicit errors | 3 |
| `appState.authUser` | Supabase auth listener/route guard | Preserve | Continue using authenticated UUID/token | 2-7 |
| `appState.purchases/orders/contracts` local state | `script.js:1292-1294`, `persistState()` | Remove as source | Permit only temporary tab/search/sort preferences locally | 3 |
| “Limpar dados locais” purchase action | `clearPurchases()`, purchase toolbar | Remove | It does not delete authoritative orders and creates misleading semantics | 3 |
| In-memory filter/search/sort | purchase renderer | Reuse + correct | Keep UX; align filtering/pagination contract with backend | 3 |
| `filteredItems.slice()` | `script.js:12547-12549` | Replace | Apply range/cursor in Supabase/backend query | 3 |
| Inline list/detail styles | template `<style>` and style attributes | Correct locally | Move/organize purchase-only styles without global visual changes | 3-4 |
| Current beat/profile enrichment | loader queries `beats` and `profiles` | Correct | Prefer immutable snapshots; use public profile projection for live profile action | 2-4 |
| Contract DB lookup | `license_documents` by `order_item_id` | Reuse | Keep as authoritative persistent document | 5 |
| Browser contract fallback | `generateContractText()` | Remove or justify | Never be the final cross-device legal source | 5 |
| Public producer route | `#perfil-{username}`, `renderPublicProfile()` | Reuse | Preserve canonical profile navigation | 4 |
| Direct chat RPC/route | `openOrCreateDirectConversation()` | Reuse | Pass real producer UUID; no simulated conversation | 4 |
| Shared player | `data-action="play"`, app player state | Reuse | Keep one player implementation | 3-4 |
| Secure download call | bearer request to `/api/orders/download` | Preserve + refine | Retain signed-download flow; make authorization item-specific | 5 |
| Route/licensing static tests | `tests/route-stability-check.js`, `tests/licensing-system-check.js` | Preserve + extend | Add behavioral integration/security coverage | 7 |

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

*Frontend audit completed for AUD-01 and the frontend portion of AUD-04.*
