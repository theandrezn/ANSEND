# External Integrations

**Analysis Date:** 2026-06-22

## Supabase

**Purpose:** Primary backend platform for authentication, database access, storage, realtime messaging, and server-side RPCs.

- Browser initialization: `index.html` and the top of `script.js`.
- Worker access: REST/Auth helpers in `src/worker.mjs` use publishable or service-role credentials according to operation.
- Schema source: `supabase/schema.sql`; production changes: `supabase/migrations/*.sql`.
- Auth flows include email/password, Google OAuth, session refresh, account onboarding, and admin membership.
- Realtime channels are used for direct messages in `script.js`.
- Storage buckets hold profile media, releases, chat/community attachments, and license documents; validation and RLS are defined in migrations.
- Public data is projected through `public.public_profiles` and publication flags rather than exposing all private profile data.

## Cloudflare Workers

**Purpose:** Edge API, security boundary, and static SPA host.

- Entry point: `src/worker.mjs`.
- Deployment: `wrangler.toml` and `npm run deploy`.
- Static output: `dist/` via the `ASSETS` binding.
- API routes include checkout, Mercado Pago webhook, order downloads, NEXO endpoints, analytics, GIF search, recommendations, and geolocation.
- Security headers and CSP are attached in `src/worker.mjs`.
- Client geolocation calls `/api/geo`; `functions/api/geo.js` is a legacy/alternate implementation, while the deployed Worker route is authoritative.

## OpenAI

**Purpose:** NEXO chat/analysis, intent classification, and recommendation embeddings.

- API calls originate only from `src/worker.mjs` so `OPENAI_API_KEY` remains server-side.
- Default model and fallback list are configured in `wrangler.toml`.
- Embeddings use `text-embedding-3-small` and expect 1536 dimensions.
- Prompts, response normalization, validation, and route resolution are split across `src/nexo/*.mjs`.
- Worker errors redact strings resembling OpenAI secret keys before returning messages.

## Mercado Pago

**Purpose:** Card and PIX payment processing.

- Frontend flow: `checkout/checkout.js` calls `/api/checkout/config`, `/quote`, `/payment`, and `/status`.
- Server flow: `src/worker.mjs` validates authenticated carts against Supabase, creates payments, persists attempts, and finalizes approved orders.
- Webhook: `/api/webhooks/mercado-pago` verifies a configured signature before reconciliation.
- Environment names are documented in `.env.example`; Worker code supports a few legacy aliases.
- The browser receives only the public key; access token and webhook secret stay in Worker secrets.

## Media and Discovery Services

- YouTube URLs are normalized and embedded by `script.js`; accepted hosts are explicitly allowlisted.
- GIPHY or Tenor supplies chat GIF search through `/api/chat/gifs` in `src/worker.mjs`, keeping API keys server-side.
- Unsplash hosts seeded/demo imagery referenced at the top of `script.js`.
- Google Fonts, Lucide, Three.js, and Supabase JS are loaded by `index.html`.

## Browser and Platform APIs

- `localStorage` persists selected UI, recommendation, onboarding, cart, and fallback state in `script.js`.
- Web Audio/media elements and YouTube iframes power the player.
- Hash navigation is the public routing contract (`#feed`, `#explorar`, `#comunidade`, and others).

## Integration Boundaries

- Client code should use Supabase publishable credentials and RLS-protected operations only.
- Privileged Supabase service-role calls belong in `src/worker.mjs`.
- Database mutations requiring cross-table integrity or elevated rights belong in guarded SQL RPCs.
- New external APIs should be proxied through the Worker when they require secrets or user authorization.
- Any new remote origin must also be added deliberately to the CSP in `securityHeadersFor()` in `src/worker.mjs`.

---

*Integration analysis: 2026-06-22*
*Update when providers, credentials, or API routes change*
