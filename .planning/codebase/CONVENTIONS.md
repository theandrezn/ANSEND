# Coding Conventions

**Analysis Date:** 2026-06-22

## Naming Patterns

**Files:**
- Browser entry files use lowercase generic names.
- Feature files use kebab-case (`nexo-v2-core.mjs`, `auth-focus-check.js`).
- SQL migrations use a 14-digit timestamp plus snake_case description.

**JavaScript:**
- Functions and variables use camelCase.
- Constants use UPPER_SNAKE_CASE for stable configuration/keys.
- Renderers use `renderX`; loaders use `loadX`; normalizers use `normalizeX`; event helpers use verbs such as `toggle`, `open`, `save`, or `track`.
- Booleans commonly begin with `is`, `has`, `can`, or `should`.

**SQL:**
- Tables, columns, functions, and policies use snake_case.
- RPC parameters usually use a `p_` prefix; trigger helpers describe their action.

## JavaScript Style

- Two-space indentation and semicolons are standard.
- Double quotes dominate browser/Worker JavaScript.
- Functions are mostly declarations, with arrow functions used for compact callbacks and factories.
- Guard clauses return early on missing auth, invalid IDs, or unavailable integrations.
- Template literals assemble substantial HTML strings; dynamic values must pass through helpers such as `htmlEscape()` or safe URL normalization.
- Async functions explicitly inspect `{ data, error }` from Supabase and throw or degrade based on the feature.
- ESM is used for Worker/NEXO `.mjs`; CommonJS is used for build/test `.js` because `package.json` declares `type: commonjs`.

## Browser Application Patterns

- `appState` is mutated centrally and then the affected route/component is rerendered.
- Feature blocks in `script.js` colocate data normalization, remote calls, markup generation, and event actions.
- DOM behavior favors delegated `data-action` handlers rather than per-component framework bindings.
- Route names are hash keys and should be resolved through existing route helpers.
- Auth-sensitive behavior must check both UI state and backend enforcement; hiding a control is not authorization.
- Anonymous fallbacks may use `localStorage`, but authenticated persistent data should remain Supabase-authoritative.

## Worker Patterns

- Handlers receive `(request, env)` and return `Response` objects.
- JSON responses go through `jsonResponse()` and final responses through security-header wrapping.
- Authentication is validated with `requireAuthenticatedUser()` before private operations.
- Provider payloads are sanitized and bounded before outbound calls.
- Secrets are read from `env`; never expose service-role/provider secrets in `wrangler.toml`, browser code, or docs.
- API routing is explicit pathname comparison near the bottom of `src/worker.mjs`.

## SQL Patterns

- Enable RLS on every user/content table and define policies by operation.
- Privileged functions use `security definer` with an explicit `search_path` and internal identity/role checks.
- Revoke default/public execute before granting to the intended role.
- Prefer transactional RPCs for cross-table account, checkout, chat, and entitlement operations.
- Pair schema changes with indexes and update triggers where query patterns require them.

## Error Handling

- User-facing browser failures use translated/Portuguese messages and `showToast()` where practical.
- Non-critical remote features often retain local/cached fallback behavior.
- Worker failures return a stable `success: false`/`error` shape with no-store headers.
- Provider error details are sanitized; debug detail is gated by environment configuration.
- Tests print a concise success/failure contract and exit with status 1 on violation.

## Comments and Documentation

- Comments are sparse and explain compatibility constraints, security intent, or non-obvious browser behavior.
- Avoid narration of obvious assignments.
- Reference actual source paths in architecture/security documentation.
- Keep public-key values distinguishable from secrets; publishable Supabase keys are expected in browser configuration.

## Change Discipline

- Preserve UTF-8 when editing Portuguese strings; terminal mojibake has previously made exact-text patches unreliable.
- After frontend asset changes, run `npm run build` because production serves `dist/`.
- Add a focused `package.json` test command for new regression coverage.
- Database changes require both a migration and synchronization of `supabase/schema.sql`.
- Match the existing imperative architecture unless the task explicitly includes modularization; partial framework rewrites create two state systems.

---

*Convention analysis: 2026-06-22*
*Update when linting, modules, or frontend framework conventions change*
