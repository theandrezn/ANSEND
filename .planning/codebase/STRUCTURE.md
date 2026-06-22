# Codebase Structure

**Analysis Date:** 2026-06-22

## Directory Layout

```text
BEATS - SEGUNDO - ANDRÉ/
|-- index.html                 # Browser shell and public runtime config
|-- script.js                  # Main SPA application monolith
|-- styles.css                 # Main visual system and route styles
|-- checkout/                  # Dedicated checkout UI assets
|-- src/
|   |-- worker.mjs             # Cloudflare Worker and API router
|   |-- nexo/                  # NEXO domain modules
|   |-- i18n/                  # Modular locale resources
|   `-- components/I18n/       # Small React i18n components
|-- supabase/
|   |-- schema.sql             # Consolidated database schema
|   `-- migrations/            # Ordered production migrations
|-- scripts/                   # Build and operational checks
|-- tests/                     # Node and Playwright regression checks
|-- assets/                    # Source media assets
|-- public/                    # Public static files copied into dist root
|-- dist/                      # Generated, committed deployment assets
|-- docs/                      # Product/technical supporting documents
|-- functions/api/geo.js       # Legacy alternate geo endpoint
|-- package.json               # Commands and dependencies
`-- wrangler.toml              # Worker/deployment configuration
```

## Directory Purposes

**`src/`:**
- Worker-side and modular source code.
- `src/worker.mjs` is the production server entry point.
- `src/nexo/` is the strongest existing example of extracted, testable domain logic.
- `src/i18n/` and `src/components/I18n/` represent a partial modular/React i18n path not yet dominant in the SPA.

**`supabase/`:**
- Persistent model, RLS policies, storage policy definitions, triggers, functions, and grants.
- Add every production database change as a new timestamped file in `supabase/migrations/` and mirror the resulting state in `supabase/schema.sql`.

**`tests/`:**
- Flat collection of feature-focused `*-check.js`/`.mjs` scripts.
- Includes static source-contract tests, pure Node module tests, Playwright browser checks, responsive screenshot baselines, and focused auth/storage/player checks.

**`scripts/`:**
- `scripts/build-worker.js` creates deployable `dist/`.
- Additional scripts perform visual captures or targeted operational checks.

**`dist/`:**
- Generated output served by Cloudflare.
- Rebuilt from root static files, `checkout/`, `assets/`, and `public/`.
- Committed to Git, so run `npm run build` before deploy/commit when source assets change.

**`assets/` and `public/`:**
- `assets/` holds application images/audio used by source paths.
- `public/` is flattened into the root of `dist/` during build.

## Key File Locations

**Entry Points:**
- `index.html`: SPA document, app shell, CDN scripts, and public Supabase config.
- `script.js`: browser startup, routing, state, rendering, and event handling.
- `src/worker.mjs`: Worker fetch handler and all deployed `/api/*` endpoints.
- `checkout/checkout.js`: checkout screen initialization and API calls.

**Configuration:**
- `package.json`: build, deploy, and test scripts.
- `wrangler.toml`: Cloudflare Worker and static asset configuration.
- `.env.example`: secret/configuration contract.
- `.gitignore`: local/generated exclusions.

**Core Logic:**
- `script.js`: marketplace, profiles, hiring/community, chat, recommendations, NEXO UI, player, uploads, purchases, admin, and authentication.
- `src/nexo/*.mjs`: deterministic NEXO logic.
- `src/worker.mjs`: AI, checkout, webhooks, recommendations, analytics, downloads, and provider proxying.
- `supabase/schema.sql`: data model and security model.

**Testing:**
- `tests/route-stability-check.js`: multi-route Playwright smoke test.
- `tests/responsive-regression-check.js`: screenshot-driven responsive regression.
- `tests/nexo-v2-core-check.mjs`: direct module assertions.
- `tests/data-boundary-check.js`: schema/source contract checks.

## Naming Conventions

- Root browser assets use simple lowercase names (`script.js`, `styles.css`).
- Feature CSS uses kebab-case (`profile-page.css`, `hero-collage.css`).
- NEXO modules use kebab-case ESM names under `src/nexo/`.
- Test scripts use `{feature}-check.js` or `.mjs`, not `*.test.js`.
- Migrations use `YYYYMMDDHHMMSS_description.sql`.
- Browser functions and state use camelCase; SQL objects use snake_case.

## Where to Add New Code

**New browser feature:**
- Prefer a focused module under `src/` when it can be loaded safely; otherwise integrate near the corresponding feature block in `script.js` and add a focused test in `tests/`.
- Add route styles to a feature stylesheet where one exists; avoid further growth of `styles.css` when isolation is practical.

**New Worker endpoint:**
- Add handler/helper functions in `src/worker.mjs` or extract a domain module under `src/`.
- Register the exact path near the bottom Worker router.
- Add authentication, method, payload-size, and rate-limit decisions explicitly.

**New database feature:**
- Add a timestamped migration under `supabase/migrations/`.
- Update `supabase/schema.sql` to keep fresh installs equivalent.
- Add RLS/grants and a schema-contract test when data is user-sensitive.

**New regression check:**
- Add `tests/{feature}-check.js` and a named script in `package.json`.

## Special Directories

- `.planning/codebase/`: generated GSD reference documents; committed documentation.
- `dist/`: generated deploy output; committed and served live.
- `tests/responsive-screenshots/`: generated visual evidence/baselines; large and intentionally separate from source.
- `.wrangler/`: local Wrangler state; not application source.
- `.worktrees/`: local Git worktrees; never treat as canonical source.

---

*Structure analysis: 2026-06-22*
*Update when directory ownership or build output changes*
