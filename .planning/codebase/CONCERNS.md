# Codebase Concerns

**Analysis Date:** 2026-06-22

## Highest-Risk Technical Debt

**Browser application monolith:**
- Issue: `script.js` is about 23,000 lines and declares roughly 861 functions; `styles.css` is about 35,000 lines.
- Impact: Feature ownership is unclear, global name collisions are possible, and small changes can affect distant routes.
- Evidence: Duplicate declarations include `applyFeedPersonalization`, `readNexoFeedComments`, `saveNexoFeedComment`, `openNexoFeedComments`, and `smartComboCard` in `script.js`; later declarations silently replace earlier ones.
- Fix approach: Extract pure feature logic and API adapters incrementally, starting with duplicated functions and well-tested boundaries. Keep one state authority during migration.

**Generated deployment output is versioned:**
- Issue: `dist/` is rebuilt by `scripts/build-worker.js` but committed to Git.
- Impact: Source and deployed assets can drift; commits become large and reviewers may miss meaningful differences.
- Current mitigation: `npm run deploy` always builds first, and recent commits explicitly synchronize assets.
- Fix approach: Either enforce build-diff validation in CI or move deployment to build from source without committing `dist/`.

**Dual/partial frontend architecture:**
- Issue: React/i18next dependencies and components exist under `src/`, while production rendering remains imperative in `script.js`.
- Impact: Contributors can add code to a path that is not actually wired into the live app, and translation state can diverge.
- Fix approach: Document whether the modular React/i18n path is transitional; either complete a scoped migration or remove unused declarations.

## Security Considerations

**Worker rate limiting is isolate-local:**
- Risk: `rateLimitStore` in `src/worker.mjs` is an in-memory `Map`; limits are neither globally consistent nor durable across Worker isolates/restarts.
- Current mitigation: Per-isolate throttling and authenticated identity/IP/path keys reduce casual abuse.
- Recommendation: Use Cloudflare Rate Limiting, Durable Objects, or another distributed store for payment/AI abuse controls.

**Large client-side data surface:**
- Risk: Browser code directly queries many Supabase tables and RPCs; a missing RLS policy or grant can expose data regardless of UI guards.
- Current mitigation: Extensive RLS, explicit grants, public/private profile separation, and security-hardening migrations.
- Recommendation: Treat RLS tests and Supabase advisors as release gates for every new table/RPC. Keep service-role operations only in `src/worker.mjs`.

**CSP requires unsafe inline execution/styles:**
- Risk: `src/worker.mjs` allows `'unsafe-inline'` for scripts and styles because `index.html` and markup contain inline behavior/styles.
- Impact: CSP provides less protection against injection.
- Recommendation: Move inline scripts/styles/handlers into static modules and adopt nonces or hashes before tightening CSP.

**External CDN dependency:**
- Risk: Lucide is loaded from `@latest` in `index.html`; remote compromise or breaking updates can alter production without a repository change.
- Recommendation: Pin an exact version and consider self-hosting critical runtime scripts with integrity metadata.

## Fragile Areas

**Authentication and route rendering:**
- Why fragile: Session refresh, auth focus preservation, onboarding, protected routes, and rerenders share global state in `script.js`.
- Common failures: Input focus loss, redirect loops, stale user state across tabs, or content flashing before auth resolution.
- Safe modification: Run `test:auth-focus`, `test:auth-no-block`, `test:auth-multi-tab`, `test:onboarding`, and `test:routes` after changes.

**Checkout and entitlements:**
- Why fragile: `checkout/checkout.js`, Worker payment handlers, Supabase RPCs, webhook reconciliation, orders, licenses, and downloads must agree.
- Common failures: Duplicate payment attempts, stale status, underpriced carts, missing entitlements, or webhook replay issues.
- Safe modification: Preserve server-side cart validation/idempotency and test both synchronous status polling and signed webhook finalization.
- Test gap: No full provider sandbox E2E is evident.

**Schema versus migrations:**
- Why fragile: Both `supabase/schema.sql` and 51 migrations describe the data model.
- Common failures: Fresh installs differ from upgraded production databases.
- Safe modification: Apply a new migration, update consolidated schema, and add focused schema checks.

**Build artifacts:**
- Why fragile: Cloudflare serves `dist/`, not root source files.
- Common failures: A locally fixed `script.js` or stylesheet is not included in deployment.
- Safe modification: Always run `npm run build` and inspect `git status` before deploy.

## Performance and Scaling

**Full client payload:**
- Problem: The browser downloads/parses a roughly 1.15 MB `script.js` plus a roughly 970 KB `styles.css` before compression, regardless of route.
- Cause: Nearly all product features share single global assets.
- Improvement path: Route/feature module splitting, CSS ownership, and lazy loading for checkout, admin, hiring, chat, NEXO, and upload flows.

**Global rerender model:**
- Problem: Many interactions call route-level renderers that replace substantial DOM.
- Impact: Focus/scroll/player state requires special preservation code and can regress.
- Improvement path: Isolate stable shells and update smaller feature regions.

**Client-side collection limits/caches:**
- Problem: Several Supabase queries and local caches use fixed limits and in-memory aggregation.
- Impact: Large catalogs, chats, notifications, or community feeds will require consistent cursor pagination.
- Improvement path: Standardize pagination contracts and indexes per feature before growth.

## Test Coverage Gaps

**Runtime backend integration:**
- What's not tested: Most Worker endpoints against real/simulated Supabase and providers.
- Risk: Static source checks can pass while authentication headers, RPC payloads, webhook signatures, or RLS fail at runtime.
- Priority: High for checkout, downloads, admin, and service-role operations.

**Complete suite execution:**
- What's missing: A single `npm test` or CI pipeline that runs the intended release set.
- Risk: Contributors may run only one focused test and miss cross-feature regressions.
- Priority: High.

**Coverage visibility:**
- What's missing: Line/branch coverage and a map of untested browser functions.
- Risk: The monolith's least exercised paths are unknown.
- Priority: Medium; modularization is a prerequisite for useful unit coverage.

## Operational Concerns

- No external error monitoring/tracing integration is visible; production diagnosis relies on console/Worker logs and database events.
- `functions/api/geo.js` overlaps the Worker `/api/geo` route and can mislead contributors about the deployed entry point.
- Portuguese UTF-8 text has previously rendered as mojibake in PowerShell workflows; use UTF-8-aware tools and exact source inspection for text patches.
- Public Supabase publishable keys in `index.html`/`wrangler.toml` are intentional, but service-role, OpenAI, GIF-provider, and Mercado Pago secrets must remain Worker secrets.

## Recommended Order

1. Add a release-level aggregate test command and CI/build-drift check.
2. Remove duplicate function declarations and add regression tests for the winning behavior.
3. Extract checkout, auth, and NEXO/client recommendation boundaries from `script.js` incrementally.
4. Replace isolate-local rate limiting for costly/sensitive endpoints.
5. Tighten CSP after inline behavior and external runtime scripts are reduced.

---

*Concerns audit: 2026-06-22*
*Update as risks are resolved or new operational evidence appears*
