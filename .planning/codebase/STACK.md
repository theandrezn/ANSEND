# Technology Stack

**Analysis Date:** 2026-06-22

## Overview

ANSEND is a browser-first music marketplace and community SPA. The frontend is mostly plain HTML, CSS, and JavaScript, while a Cloudflare Worker supplies authenticated API endpoints and serves the built static assets. Supabase supplies authentication, PostgreSQL, storage, realtime, and RPCs.

## Languages and Runtime

- JavaScript is the main application language. Browser code lives primarily in `script.js`; Worker code uses ESM in `src/worker.mjs`.
- SQL defines the persistent model in `supabase/schema.sql` and 51 ordered files under `supabase/migrations/`.
- CSS is hand-authored in `styles.css`, `checkout/checkout.css`, `hero-collage.css`, `nexo-ia.css`, and `profile-page.css`.
- HTML entry point: `index.html`.
- Node.js runs build scripts and all automated checks. No Node version is pinned in `package.json`.

## Frontend

- No frontend bundler or framework controls the production SPA. `index.html` loads `script.js` and global CDN scripts.
- Routing is hash-based and rendered imperatively by `renderRoute()` in `script.js`.
- State is held in the global `appState` object and selected `localStorage` keys.
- Supabase JS `2.75.0`, Three.js `0.124.0`, and Lucide are loaded from CDNs in `index.html`.
- Google Fonts are loaded remotely; image and media assets are under `assets/` and `public/`.
- `checkout/checkout.js` and `checkout/checkout.css` implement the isolated checkout experience used by cart/direct checkout routes.
- React/i18next packages exist in `package.json` and small components exist under `src/components/I18n/`, but the production SPA's primary translation path remains the custom browser logic and locale data in `script.js`.

## Backend and Data

- Cloudflare Workers runtime is configured by `wrangler.toml`; the entry point is `src/worker.mjs`.
- Static assets are served from `dist/` through the `ASSETS` binding with SPA fallback.
- Supabase provides Postgres, Auth, Storage, Realtime, REST, and database RPCs.
- RLS and grants are defined in `supabase/schema.sql` and migrations such as `supabase/migrations/20260617013000_security_hardening_advisors.sql`.
- OpenAI Responses/Embeddings APIs power NEXO intelligence and recommendations from `src/worker.mjs`.
- Mercado Pago powers PIX/card checkout and webhooks from `src/worker.mjs`.

## Key Dependencies

**Production declarations (`package.json`):**
- `gsap` 3.15 for animation experiments/components.
- `i18next`, `i18next-browser-languagedetector`, `react-i18next` for the modular i18n work under `src/`.

**Development/tooling:**
- `playwright` 1.60 for browser regression checks.
- `wrangler` 4.101 for local Worker tooling and deployment.
- Overrides pin `esbuild` 0.28.1 and `ws` 8.21.0.

**Runtime CDN dependencies (`index.html`):**
- Lucide icon UMD bundle.
- Three.js 0.124.0.
- Supabase JS 2.75.0.

## Build and Deployment

- `npm run build` invokes `scripts/build-worker.js`.
- The build deletes/recreates `dist/`, copies static source assets, and replaces the development build ID in `dist/index.html` with a timestamp plus Git SHA.
- `npm run deploy` rebuilds and runs `wrangler deploy`.
- `dist/` is committed to Git, so source changes and generated assets must stay synchronized.
- Cloudflare configuration and non-secret public values live in `wrangler.toml`; secrets must be configured as Worker secrets, not committed.

## Configuration

- `wrangler.toml`: Worker name, compatibility date, entry point, static asset binding, public Supabase values, and NEXO defaults.
- `.env.example`: required secret names for OpenAI, Google OAuth, and Mercado Pago.
- `index.html`: public browser Supabase URL/publishable key and canonical site URL.
- `supabase/schema.sql`: consolidated database bootstrap; `supabase/migrations/` is the chronological production evolution.

---

*Stack analysis: 2026-06-22*
*Update when runtime, deployment, or primary frontend architecture changes*
