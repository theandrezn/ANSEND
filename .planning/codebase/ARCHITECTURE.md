# Architecture

**Analysis Date:** 2026-06-22

## Pattern Overview

**Overall:** Serverless SPA with a client-side application monolith, Cloudflare edge API, and Supabase backend.

**Key Characteristics:**
- Hash-routed, imperative browser rendering without a frontend build framework.
- Central global state and feature functions concentrated in `script.js`.
- Edge handlers in a single Worker module, with NEXO domain helpers extracted under `src/nexo/`.
- Database-centered authorization using RLS, grants, triggers, and guarded RPCs.
- Generated static deployment output committed under `dist/`.

## Layers

**Presentation Layer:**
- Purpose: Render pages, controls, modals, player, checkout, and responsive interaction.
- Contains: `index.html`, `styles.css`, feature CSS files, and render functions in `script.js`.
- Depends on: Browser state, Supabase client, Worker APIs, and local assets.
- Used by: End users through hash routes.

**Client Application Layer:**
- Purpose: Route dispatch, state management, validation, data normalization, event delegation, auth lifecycle, and feature orchestration.
- Contains: `script.js` and the checkout-specific `checkout/checkout.js`.
- Depends on: Supabase JS, browser APIs, `/api/*`, and DOM globals.
- Used by: Presentation functions and event handlers.

**Edge API Layer:**
- Purpose: Protect secrets, authenticate requests, validate payloads, coordinate payment/AI flows, and serve assets.
- Contains: `src/worker.mjs`.
- Depends on: Supabase REST/Auth, OpenAI, Mercado Pago, GIF providers, and `env.ASSETS`.
- Used by: Browser fetch calls and Mercado Pago webhooks.

**NEXO Domain Layer:**
- Purpose: Keep route knowledge, prompts, schemas, validation, ranking, and response normalization deterministic.
- Contains: `src/nexo/ansend-routes.mjs`, `nexo-prompt.mjs`, `nexo-schema.mjs`, `nexo-validation.mjs`, and `nexo-v2-core.mjs`.
- Depends on: Plain JavaScript only.
- Used by: `src/worker.mjs` and direct Node tests.

**Persistence and Authorization Layer:**
- Purpose: Store platform entities and enforce data boundaries.
- Contains: `supabase/schema.sql` and `supabase/migrations/*.sql`.
- Depends on: PostgreSQL, Supabase Auth/Storage/Realtime, and pgvector where enabled.
- Used by: Supabase browser client and Worker REST/RPC calls.

## Data Flow

**SPA Navigation:**
1. `index.html` creates the app shell and loads global dependencies.
2. `script.js` initializes state, auth listeners, and hash navigation.
3. `currentRouteFromHash()` resolves the route.
4. `protectedRoute()` and onboarding checks guard access.
5. `renderRoute()` dispatches to a feature renderer and writes into the main app view.
6. Delegated listeners execute actions and selectively rerender.

**Authenticated Data Mutation:**
1. The user acts in a rendered form or control in `script.js`.
2. Client code validates and normalizes the payload.
3. Supabase JS sends the access token with a table query or RPC.
4. Postgres RLS/function guards verify `auth.uid()` and role/membership.
5. The client merges returned rows into `appState`, persists compatible local state, and rerenders.

**Privileged API Operation:**
1. Client fetches `/api/*` with a bearer session token.
2. `src/worker.mjs` validates method, rate limit, payload, and Supabase identity.
3. The Worker calls an external provider or privileged Supabase endpoint.
4. Results are sanitized and returned with no-store/security headers.
5. Client updates the relevant feature state.

**Build and Serve:**
1. `scripts/build-worker.js` recreates `dist/` from static sources.
2. The build injects a timestamp/Git SHA build ID.
3. Wrangler deploys `src/worker.mjs` plus the `dist/` asset binding.
4. Unknown asset paths fall back to the SPA entry point.

## State Management

- `appState` in `script.js` is the in-memory source for auth, profiles, catalog, recommendations, chat, hiring, purchases, and UI loading state.
- Supabase is authoritative for logged-in persistent data.
- `localStorage` provides anonymous/demo fallback, caches, onboarding markers, and compatibility persistence.
- Checkout maintains a separate state object in `checkout/checkout.js`.
- Worker rate limits are held in a module-level `Map`, scoped to each live isolate.

## Key Abstractions

**Renderer functions:** `renderRoute()`, `renderHomeDashboard()`, `renderHiringPage()`, `renderPurchases()`, and peers return or assign HTML imperatively.

**Supabase access helpers:** Normalizers and feature-specific functions in `script.js`; REST/Auth/RPC wrappers in `src/worker.mjs`.

**Database RPC boundary:** Security-definer functions perform privileged or transactional operations such as admin deletion, checkout finalization, chat creation, onboarding completion, and recommendations.

**NEXO action contract:** `src/nexo/ansend-routes.mjs` maps model intent to a finite allowlist of application routes/actions.

## Entry Points

- `index.html`: browser document and public configuration.
- `script.js`: SPA initialization and nearly all browser features.
- `checkout/checkout.js`: checkout UI lifecycle.
- `src/worker.mjs`: Cloudflare `fetch` handler and API router.
- `supabase/schema.sql`: clean-database schema bootstrap.
- `supabase/migrations/*.sql`: ordered live database evolution.

## Error Handling

- Browser async operations generally use `try/catch`, user-facing toasts, fallback data, and loading flags.
- Supabase errors are checked explicitly and often trigger compatibility fallbacks for missing columns.
- Worker handlers return structured JSON errors, hide provider details by default, and attach security headers.
- Tests fail fast by printing a targeted message and exiting nonzero.

## Cross-Cutting Concerns

- **Authentication:** Supabase session listeners plus route guards in `script.js`; bearer validation in `src/worker.mjs`; RLS/RPC checks in SQL.
- **Validation:** URL/file sanitizers on the client, payload limits in the Worker, SQL constraints and policies in the database.
- **Internationalization:** Custom runtime translation in `script.js`, plus modular locale files under `src/i18n/`.
- **Security:** CSP and response headers in the Worker, RLS/grants in migrations, and server-only provider secrets.
- **Observability:** Console logging and database analytics events; no dedicated external error-monitoring SDK is present.

---

*Architecture analysis: 2026-06-22*
*Update when major boundaries or routing patterns change*
