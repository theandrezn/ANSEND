<!-- GSD:project-start source:PROJECT.md -->
## Project

**ANSEND - Área Premium de Pedidos e Compras**

ANSEND é uma plataforma musical existente que conecta compradores, artistas e produtores por meio de catálogo de beats, licenças, carrinho, checkout, pagamentos, perfis e chat. Este marco transforma a rota existente `#compras` em uma área de membros premium e confiável, na qual cada comprador consulta seus pedidos reais, licenças imutáveis, produtores, pagamentos, contratos e downloads autorizados.

O trabalho evolui a implementação atual. Não cria uma aplicação, rota ou arquitetura de comércio paralela.

**Core Value:** Depois de uma compra confirmada, somente o comprador correto consegue reencontrar e acessar exatamente o beat, a licença, o contrato e os arquivos que adquiriu.

### Constraints

- **Arquitetura**: Preservar SPA, `script.js`, Worker Cloudflare, Supabase e `#compras` — evitar sistemas paralelos.
- **Fonte de verdade**: Supabase e backend real — `localStorage` não representa pedidos autenticados.
- **Segurança**: RLS permanece ativa; secrets e validações sensíveis ficam fora do frontend.
- **Pagamentos**: Mercado Pago, checkout e webhook atuais são preservados — correções devem reforçar reconciliação e idempotência.
- **Compatibilidade**: Carrinho, checkout, autenticação, perfil, chat, player e catálogo não podem regredir.
- **Mudanças**: Revalidar `git status`, diff e arquivos imediatamente antes de cada edição; nunca sobrescrever trabalho alheio.
- **Design**: Escuro, premium, neutro e responsivo; laranja apenas como destaque pontual, sem alterar componentes globais por necessidade local.
- **Entrega**: Produzir planejamento completo e parar para revisão antes de implementar código funcional.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Overview
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
- `gsap` 3.15 for animation experiments/components.
- `i18next`, `i18next-browser-languagedetector`, `react-i18next` for the modular i18n work under `src/`.
- `playwright` 1.60 for browser regression checks.
- `wrangler` 4.101 for local Worker tooling and deployment.
- Overrides pin `esbuild` 0.28.1 and `ws` 8.21.0.
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Browser entry files use lowercase generic names.
- Feature files use kebab-case (`nexo-v2-core.mjs`, `auth-focus-check.js`).
- SQL migrations use a 14-digit timestamp plus snake_case description.
- Functions and variables use camelCase.
- Constants use UPPER_SNAKE_CASE for stable configuration/keys.
- Renderers use `renderX`; loaders use `loadX`; normalizers use `normalizeX`; event helpers use verbs such as `toggle`, `open`, `save`, or `track`.
- Booleans commonly begin with `is`, `has`, `can`, or `should`.
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
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Hash-routed, imperative browser rendering without a frontend build framework.
- Central global state and feature functions concentrated in `script.js`.
- Edge handlers in a single Worker module, with NEXO domain helpers extracted under `src/nexo/`.
- Database-centered authorization using RLS, grants, triggers, and guarded RPCs.
- Generated static deployment output committed under `dist/`.
## Layers
- Purpose: Render pages, controls, modals, player, checkout, and responsive interaction.
- Contains: `index.html`, `styles.css`, feature CSS files, and render functions in `script.js`.
- Depends on: Browser state, Supabase client, Worker APIs, and local assets.
- Used by: End users through hash routes.
- Purpose: Route dispatch, state management, validation, data normalization, event delegation, auth lifecycle, and feature orchestration.
- Contains: `script.js` and the checkout-specific `checkout/checkout.js`.
- Depends on: Supabase JS, browser APIs, `/api/*`, and DOM globals.
- Used by: Presentation functions and event handlers.
- Purpose: Protect secrets, authenticate requests, validate payloads, coordinate payment/AI flows, and serve assets.
- Contains: `src/worker.mjs`.
- Depends on: Supabase REST/Auth, OpenAI, Mercado Pago, GIF providers, and `env.ASSETS`.
- Used by: Browser fetch calls and Mercado Pago webhooks.
- Purpose: Keep route knowledge, prompts, schemas, validation, ranking, and response normalization deterministic.
- Contains: `src/nexo/ansend-routes.mjs`, `nexo-prompt.mjs`, `nexo-schema.mjs`, `nexo-validation.mjs`, and `nexo-v2-core.mjs`.
- Depends on: Plain JavaScript only.
- Used by: `src/worker.mjs` and direct Node tests.
- Purpose: Store platform entities and enforce data boundaries.
- Contains: `supabase/schema.sql` and `supabase/migrations/*.sql`.
- Depends on: PostgreSQL, Supabase Auth/Storage/Realtime, and pgvector where enabled.
- Used by: Supabase browser client and Worker REST/RPC calls.
## Data Flow
## State Management
- `appState` in `script.js` is the in-memory source for auth, profiles, catalog, recommendations, chat, hiring, purchases, and UI loading state.
- Supabase is authoritative for logged-in persistent data.
- `localStorage` provides anonymous/demo fallback, caches, onboarding markers, and compatibility persistence.
- Checkout maintains a separate state object in `checkout/checkout.js`.
- Worker rate limits are held in a module-level `Map`, scoped to each live isolate.
## Key Abstractions
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
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| -21risk-automation | "Automate 21risk tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/21risk-automation/SKILL.md` |
| -2chat-automation | "Automate 2chat tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/2chat-automation/SKILL.md` |
| ably-automation | "Automate Ably tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ably-automation/SKILL.md` |
| abstract-automation | "Automate Abstract tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/abstract-automation/SKILL.md` |
| abuselpdb-automation | "Automate Abuselpdb tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/abuselpdb-automation/SKILL.md` |
| abyssale-automation | "Automate Abyssale tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/abyssale-automation/SKILL.md` |
| accelo-automation | "Automate Accelo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/accelo-automation/SKILL.md` |
| accredible-certificates-automation | "Automate Accredible Certificates tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/accredible-certificates-automation/SKILL.md` |
| acculynx-automation | "Automate Acculynx tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/acculynx-automation/SKILL.md` |
| active-campaign-automation | "Automate ActiveCampaign tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/active-campaign-automation/SKILL.md` |
| addresszen-automation | "Automate Addresszen tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/addresszen-automation/SKILL.md` |
| adobe-automation | "Automate Adobe tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/adobe-automation/SKILL.md` |
| adrapid-automation | "Automate Adrapid tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/adrapid-automation/SKILL.md` |
| adyntel-automation | "Automate Adyntel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/adyntel-automation/SKILL.md` |
| aero-workflow-automation | "Automate Aero Workflow tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/aero-workflow-automation/SKILL.md` |
| aeroleads-automation | "Automate Aeroleads tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/aeroleads-automation/SKILL.md` |
| affinda-automation | "Automate Affinda tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/affinda-automation/SKILL.md` |
| affinity-automation | "Automate Affinity tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/affinity-automation/SKILL.md` |
| agencyzoom-automation | "Automate Agencyzoom tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/agencyzoom-automation/SKILL.md` |
| agent-mail-automation | "Automate Agent Mail tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/agent-mail-automation/SKILL.md` |
| agentql-automation | "Automate Agentql tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/agentql-automation/SKILL.md` |
| agenty-automation | "Automate Agenty tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/agenty-automation/SKILL.md` |
| agiled-automation | "Automate Agiled tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/agiled-automation/SKILL.md` |
| agility-cms-automation | "Automate Agility CMS tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/agility-cms-automation/SKILL.md` |
| Ahrefs Automation | "Automate SEO research with Ahrefs -- analyze backlink profiles, research keywords, track domain metrics history, audit organic rankings, and perform batch URL analysis through the Composio Ahrefs integration." | `.agents/skills/ahrefs-automation/SKILL.md` |
| ai-ml-api-automation | "Automate AI ML API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ai-ml-api-automation/SKILL.md` |
| aivoov-automation | "Automate Aivoov tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/aivoov-automation/SKILL.md` |
| alchemy-automation | "Automate Alchemy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/alchemy-automation/SKILL.md` |
| algodocs-automation | "Automate Algodocs tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/algodocs-automation/SKILL.md` |
| algolia-automation | "Automate Algolia tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/algolia-automation/SKILL.md` |
| all-images-ai-automation | "Automate All Images AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/all-images-ai-automation/SKILL.md` |
| alpha-vantage-automation | "Automate Alpha Vantage tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/alpha-vantage-automation/SKILL.md` |
| altoviz-automation | "Automate Altoviz tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/altoviz-automation/SKILL.md` |
| alttext-ai-automation | "Automate Alttext AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/alttext-ai-automation/SKILL.md` |
| amara-automation | "Automate Amara tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/amara-automation/SKILL.md` |
| amazon-automation | "Automate Amazon tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/amazon-automation/SKILL.md` |
| ambee-automation | "Automate Ambee tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ambee-automation/SKILL.md` |
| ambient-weather-automation | "Automate Ambient Weather tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ambient-weather-automation/SKILL.md` |
| amcards-automation | "Automate Amcards tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/amcards-automation/SKILL.md` |
| anchor-browser-automation | "Automate Anchor Browser tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/anchor-browser-automation/SKILL.md` |
| anonyflow-automation | "Automate Anonyflow tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/anonyflow-automation/SKILL.md` |
| ansend-rules | Regras permanentes e obrigatórias para o workspace da ANSEND, incluindo coordenação entre Codex e Antigravity, fonte única da verdade e menor alteração possível. | `.agents/skills/ansend-rules/SKILL.md` |
| anthropic-administrator-automation | "Automate Anthropic Admin tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/anthropic-administrator-automation/SKILL.md` |
| anthropic_administrator-automation | "Automate Anthropic Admin tasks via Rube MCP (Composio): API keys, usage, workspaces, and organization management. Always search tools first for current schemas." | `.agents/skills/anthropic_administrator-automation/SKILL.md` |
| apaleo-automation | "Automate Apaleo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/apaleo-automation/SKILL.md` |
| apex27-automation | "Automate Apex27 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/apex27-automation/SKILL.md` |
| api-bible-automation | "Automate API Bible tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/api-bible-automation/SKILL.md` |
| api-labz-automation | "Automate API Labz tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/api-labz-automation/SKILL.md` |
| api-ninjas-automation | "Automate API Ninjas tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/api-ninjas-automation/SKILL.md` |
| api-sports-automation | "Automate API Sports tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/api-sports-automation/SKILL.md` |
| api2pdf-automation | "Automate Api2pdf tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/api2pdf-automation/SKILL.md` |
| apiflash-automation | "Automate Apiflash tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/apiflash-automation/SKILL.md` |
| Apify Automation | "Automate web scraping and data extraction with Apify -- run Actors, manage datasets, create reusable tasks, and retrieve crawl results through the Composio Apify integration." | `.agents/skills/apify-automation/SKILL.md` |
| apilio-automation | "Automate Apilio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/apilio-automation/SKILL.md` |
| apipie-ai-automation | "Automate Apipie AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/apipie-ai-automation/SKILL.md` |
| apitemplate-io-automation | "Automate Apitemplate IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/apitemplate-io-automation/SKILL.md` |
| apiverve-automation | "Automate Apiverve tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/apiverve-automation/SKILL.md` |
| Apollo Automation | "Automate Apollo.io lead generation -- search organizations, discover contacts, enrich prospect data, manage contact stages, and build targeted outreach lists -- using natural language through the Composio MCP integration." | `.agents/skills/apollo-automation/SKILL.md` |
| appcircle-automation | "Automate Appcircle tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/appcircle-automation/SKILL.md` |
| appdrag-automation | "Automate Appdrag tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/appdrag-automation/SKILL.md` |
| appointo-automation | "Automate Appointo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/appointo-automation/SKILL.md` |
| appsflyer-automation | "Automate Appsflyer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/appsflyer-automation/SKILL.md` |
| appveyor-automation | "Automate Appveyor tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/appveyor-automation/SKILL.md` |
| artifacts-builder | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts. | `.agents/skills/artifacts-builder/SKILL.md` |
| aryn-automation | "Automate Aryn tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/aryn-automation/SKILL.md` |
| ascora-automation | "Automate Ascora tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ascora-automation/SKILL.md` |
| Ashby Automation | "Automate recruiting and hiring workflows in Ashby -- manage candidates, jobs, applications, interviews, and notes through natural language commands." | `.agents/skills/ashby-automation/SKILL.md` |
| asin-data-api-automation | "Automate Asin Data API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/asin-data-api-automation/SKILL.md` |
| astica-ai-automation | "Automate Astica AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/astica-ai-automation/SKILL.md` |
| async-interview-automation | "Automate Async Interview tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/async-interview-automation/SKILL.md` |
| atlassian-automation | "Automate Atlassian tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/atlassian-automation/SKILL.md` |
| Attio Automation | "Automate Attio CRM operations -- search records, query contacts and companies with advanced filters, manage notes, list attributes, and navigate your relationship data -- using natural language through the Composio MCP integration." | `.agents/skills/attio-automation/SKILL.md` |
| auth0-automation | "Automate Auth0 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/auth0-automation/SKILL.md` |
| autobound-automation | "Automate Autobound tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/autobound-automation/SKILL.md` |
| autom-automation | "Automate Autom tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/autom-automation/SKILL.md` |
| axonaut-automation | "Automate Axonaut tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/axonaut-automation/SKILL.md` |
| ayrshare-automation | "Automate Ayrshare tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ayrshare-automation/SKILL.md` |
| backendless-automation | "Automate Backendless tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/backendless-automation/SKILL.md` |
| bannerbear-automation | "Automate Bannerbear tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bannerbear-automation/SKILL.md` |
| bart-automation | "Automate Bart tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bart-automation/SKILL.md` |
| baselinker-automation | "Automate Baselinker tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/baselinker-automation/SKILL.md` |
| baserow-automation | "Automate Baserow tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/baserow-automation/SKILL.md` |
| basin-automation | "Automate Basin tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/basin-automation/SKILL.md` |
| battlenet-automation | "Automate Battlenet tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/battlenet-automation/SKILL.md` |
| beaconchain-automation | "Automate Beaconchain tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/beaconchain-automation/SKILL.md` |
| beaconstac-automation | "Automate Beaconstac tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/beaconstac-automation/SKILL.md` |
| beamer-automation | "Automate Beamer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/beamer-automation/SKILL.md` |
| beeminder-automation | "Automate Beeminder tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/beeminder-automation/SKILL.md` |
| bench-automation | "Automate Bench tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bench-automation/SKILL.md` |
| benchmark-email-automation | "Automate Benchmark Email tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/benchmark-email-automation/SKILL.md` |
| benzinga-automation | "Automate Benzinga tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/benzinga-automation/SKILL.md` |
| bestbuy-automation | "Automate Bestbuy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bestbuy-automation/SKILL.md` |
| better-proposals-automation | "Automate Better Proposals tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/better-proposals-automation/SKILL.md` |
| better-stack-automation | "Automate Better Stack tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/better-stack-automation/SKILL.md` |
| bidsketch-automation | "Automate Bidsketch tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bidsketch-automation/SKILL.md` |
| big-data-cloud-automation | "Automate Big Data Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/big-data-cloud-automation/SKILL.md` |
| bigmailer-automation | "Automate Bigmailer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bigmailer-automation/SKILL.md` |
| bigml-automation | "Automate Bigml tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bigml-automation/SKILL.md` |
| bigpicture-io-automation | "Automate Bigpicture IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bigpicture-io-automation/SKILL.md` |
| bitquery-automation | "Automate Bitquery tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bitquery-automation/SKILL.md` |
| bitwarden-automation | "Automate Bitwarden tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bitwarden-automation/SKILL.md` |
| blackbaud-automation | "Automate Blackbaud tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/blackbaud-automation/SKILL.md` |
| blackboard-automation | "Automate Blackboard tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/blackboard-automation/SKILL.md` |
| blocknative-automation | "Automate Blocknative tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/blocknative-automation/SKILL.md` |
| boldsign-automation | "Automate Boldsign tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/boldsign-automation/SKILL.md` |
| bolna-automation | "Automate Bolna tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bolna-automation/SKILL.md` |
| boloforms-automation | "Automate Boloforms tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/boloforms-automation/SKILL.md` |
| bolt-iot-automation | "Automate Bolt Iot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bolt-iot-automation/SKILL.md` |
| bonsai-automation | "Automate Bonsai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bonsai-automation/SKILL.md` |
| bookingmood-automation | "Automate Bookingmood tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bookingmood-automation/SKILL.md` |
| booqable-automation | "Automate Booqable tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/booqable-automation/SKILL.md` |
| borneo-automation | "Automate Borneo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/borneo-automation/SKILL.md` |
| botbaba-automation | "Automate Botbaba tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/botbaba-automation/SKILL.md` |
| botpress-automation | "Automate Botpress tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/botpress-automation/SKILL.md` |
| botsonic-automation | "Automate Botsonic tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/botsonic-automation/SKILL.md` |
| botstar-automation | "Automate Botstar tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/botstar-automation/SKILL.md` |
| bouncer-automation | "Automate Bouncer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bouncer-automation/SKILL.md` |
| boxhero-automation | "Automate Boxhero tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/boxhero-automation/SKILL.md` |
| Braintree Automation | "Braintree Automation: manage payment processing via Stripe-compatible tools for customers, subscriptions, payment methods, and transactions" | `.agents/skills/braintree-automation/SKILL.md` |
| brand-guidelines | Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply. | `.agents/skills/brand-guidelines/SKILL.md` |
| brandfetch-automation | "Automate Brandfetch tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/brandfetch-automation/SKILL.md` |
| breeze-automation | "Automate Breeze tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/breeze-automation/SKILL.md` |
| breezy-hr-automation | "Automate Breezy HR tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/breezy-hr-automation/SKILL.md` |
| brex-automation | "Automate Brex tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/brex-automation/SKILL.md` |
| brex-staging-automation | "Automate Brex Staging tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/brex-staging-automation/SKILL.md` |
| brightdata-automation | "Automate Brightdata tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/brightdata-automation/SKILL.md` |
| brightpearl-automation | "Automate Brightpearl tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/brightpearl-automation/SKILL.md` |
| brilliant-directories-automation | "Automate Brilliant Directories tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/brilliant-directories-automation/SKILL.md` |
| browseai-automation | "Automate Browseai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/browseai-automation/SKILL.md` |
| browser-tool-automation | "Automate Browser Tool tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/browser-tool-automation/SKILL.md` |
| browserbase-tool-automation | "Automate Browserbase Tool tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/browserbase-tool-automation/SKILL.md` |
| browserhub-automation | "Automate Browserhub tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/browserhub-automation/SKILL.md` |
| browserless-automation | "Automate Browserless tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/browserless-automation/SKILL.md` |
| btcpay-server-automation | "Automate Btcpay Server tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/btcpay-server-automation/SKILL.md` |
| bubble-automation | "Automate Bubble tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bubble-automation/SKILL.md` |
| bugbug-automation | "Automate Bugbug tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bugbug-automation/SKILL.md` |
| bugherd-automation | "Automate Bugherd tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bugherd-automation/SKILL.md` |
| bugsnag-automation | "Automate Bugsnag tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bugsnag-automation/SKILL.md` |
| buildkite-automation | "Automate Buildkite tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/buildkite-automation/SKILL.md` |
| builtwith-automation | "Automate Builtwith tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/builtwith-automation/SKILL.md` |
| bunnycdn-automation | "Automate Bunnycdn tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/bunnycdn-automation/SKILL.md` |
| byteforms-automation | "Automate Byteforms tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/byteforms-automation/SKILL.md` |
| cabinpanda-automation | "Automate Cabinpanda tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cabinpanda-automation/SKILL.md` |
| cal-automation | "Automate Cal tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cal-automation/SKILL.md` |
| calendarhero-automation | "Automate Calendarhero tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/calendarhero-automation/SKILL.md` |
| callerapi-automation | "Automate Callerapi tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/callerapi-automation/SKILL.md` |
| callingly-automation | "Automate Callingly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/callingly-automation/SKILL.md` |
| callpage-automation | "Automate Callpage tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/callpage-automation/SKILL.md` |
| campaign-cleaner-automation | "Automate Campaign Cleaner tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/campaign-cleaner-automation/SKILL.md` |
| campayn-automation | "Automate Campayn tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/campayn-automation/SKILL.md` |
| canny-automation | "Automate Canny tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/canny-automation/SKILL.md` |
| canvas-automation | "Automate Canvas tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/canvas-automation/SKILL.md` |
| canvas-design | Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations. | `.agents/skills/canvas-design/SKILL.md` |
| Capsule CRM Automation | "Automate Capsule CRM operations -- manage contacts (parties), run structured filter queries, track tasks and projects, log entries, and handle organizations -- using natural language through the Composio MCP integration." | `.agents/skills/capsule-crm-automation/SKILL.md` |
| capsule_crm-automation | "Automate Capsule CRM tasks via Rube MCP (Composio): contacts, opportunities, cases, tasks, and pipeline management. Always search tools first for current schemas." | `.agents/skills/capsule_crm-automation/SKILL.md` |
| carbone-automation | "Automate Carbone tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/carbone-automation/SKILL.md` |
| cardly-automation | "Automate Cardly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cardly-automation/SKILL.md` |
| castingwords-automation | "Automate Castingwords tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/castingwords-automation/SKILL.md` |
| cats-automation | "Automate Cats tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cats-automation/SKILL.md` |
| cdr-platform-automation | "Automate Cdr Platform tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cdr-platform-automation/SKILL.md` |
| census-bureau-automation | "Automate Census Bureau tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/census-bureau-automation/SKILL.md` |
| centralstationcrm-automation | "Automate Centralstationcrm tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/centralstationcrm-automation/SKILL.md` |
| certifier-automation | "Automate Certifier tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/certifier-automation/SKILL.md` |
| changelog-generator | Automatically creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes. Turns hours of manual changelog writing into minutes of automated generation. | `.agents/skills/changelog-generator/SKILL.md` |
| chaser-automation | "Automate Chaser tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/chaser-automation/SKILL.md` |
| chatbotkit-automation | "Automate Chatbotkit tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/chatbotkit-automation/SKILL.md` |
| chatfai-automation | "Automate Chatfai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/chatfai-automation/SKILL.md` |
| chatwork-automation | "Automate Chatwork tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/chatwork-automation/SKILL.md` |
| chmeetings-automation | "Automate Chmeetings tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/chmeetings-automation/SKILL.md` |
| cincopa-automation | "Automate Cincopa tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cincopa-automation/SKILL.md` |
| claid-ai-automation | "Automate Claid AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/claid-ai-automation/SKILL.md` |
| classmarker-automation | "Automate Classmarker tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/classmarker-automation/SKILL.md` |
| clearout-automation | "Automate Clearout tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/clearout-automation/SKILL.md` |
| clickmeeting-automation | "Automate Clickmeeting tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/clickmeeting-automation/SKILL.md` |
| Clockify Automation | "Automate time tracking workflows in Clockify -- create and manage time entries, workspaces, and users through natural language commands." | `.agents/skills/clockify-automation/SKILL.md` |
| cloudcart-automation | "Automate Cloudcart tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cloudcart-automation/SKILL.md` |
| cloudconvert-automation | "Automate Cloudconvert tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cloudconvert-automation/SKILL.md` |
| cloudflare-api-key-automation | "Automate Cloudflare API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cloudflare-api-key-automation/SKILL.md` |
| cloudflare-automation | "Automate Cloudflare tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cloudflare-automation/SKILL.md` |
| cloudflare-browser-rendering-automation | "Automate Cloudflare Browser Rendering tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cloudflare-browser-rendering-automation/SKILL.md` |
| Cloudinary Automation | "Automate Cloudinary media management including folder organization, upload presets, asset lookup, transformations, and usage monitoring through natural language commands" | `.agents/skills/cloudinary-automation/SKILL.md` |
| cloudlayer-automation | "Automate Cloudlayer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cloudlayer-automation/SKILL.md` |
| cloudpress-automation | "Automate Cloudpress tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cloudpress-automation/SKILL.md` |
| coassemble-automation | "Automate Coassemble tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/coassemble-automation/SKILL.md` |
| codacy-automation | "Automate Codacy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/codacy-automation/SKILL.md` |
| codeinterpreter-automation | "Automate Codeinterpreter tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/codeinterpreter-automation/SKILL.md` |
| codereadr-automation | "Automate Codereadr tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/codereadr-automation/SKILL.md` |
| Coinbase Automation | "Coinbase Automation: list and manage cryptocurrency wallets, accounts, and portfolio data via Coinbase CDP SDK" | `.agents/skills/coinbase-automation/SKILL.md` |
| coinmarketcal-automation | "Automate Coinmarketcal tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/coinmarketcal-automation/SKILL.md` |
| coinmarketcap-automation | "Automate Coinmarketcap tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/coinmarketcap-automation/SKILL.md` |
| coinranking-automation | "Automate Coinranking tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/coinranking-automation/SKILL.md` |
| college-football-data-automation | "Automate College Football Data tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/college-football-data-automation/SKILL.md` |
| competitive-ads-extractor | Extracts and analyzes competitors' ads from ad libraries (Facebook, LinkedIn, etc.) to understand what messaging, problems, and creative approaches are working. Helps inspire and improve your own ad campaigns. | `.agents/skills/competitive-ads-extractor/SKILL.md` |
| composio-automation | "Automate Composio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/composio-automation/SKILL.md` |
| composio-search-automation | "Automate Composio Search tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/composio-search-automation/SKILL.md` |
| connect | Connect Claude to any app. Send emails, create issues, post messages, update databases - take real actions across Gmail, Slack, GitHub, Notion, and 1000+ services. | `.agents/skills/connect/SKILL.md` |
| connect-apps | Connect Claude to external apps like Gmail, Slack, GitHub. Use this skill when the user wants to send emails, create issues, post messages, or take actions in external services. | `.agents/skills/connect-apps/SKILL.md` |
| connecteam-automation | "Automate Connecteam tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/connecteam-automation/SKILL.md` |
| content-research-writer | Assists in writing high-quality content by conducting research, adding citations, improving hooks, iterating on outlines, and providing real-time feedback on each section. Transforms your writing process from solo effort to collaborative partnership. | `.agents/skills/content-research-writer/SKILL.md` |
| Contentful Automation | "Automate headless CMS operations in Contentful -- list spaces, retrieve space metadata, and update space configurations through the Composio Contentful integration." | `.agents/skills/contentful-automation/SKILL.md` |
| contentful-graphql-automation | "Automate Contentful Graphql tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/contentful-graphql-automation/SKILL.md` |
| control-d-automation | "Automate Control D tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/control-d-automation/SKILL.md` |
| conversion-tools-automation | "Automate Conversion Tools tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/conversion-tools-automation/SKILL.md` |
| convertapi-automation | "Automate Convertapi tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/convertapi-automation/SKILL.md` |
| conveyor-automation | "Automate Conveyor tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/conveyor-automation/SKILL.md` |
| convolo-ai-automation | "Automate Convolo AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/convolo-ai-automation/SKILL.md` |
| corrently-automation | "Automate Corrently tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/corrently-automation/SKILL.md` |
| countdown-api-automation | "Automate Countdown API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/countdown-api-automation/SKILL.md` |
| coupa-automation | "Automate Coupa tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/coupa-automation/SKILL.md` |
| craftmypdf-automation | "Automate Craftmypdf tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/craftmypdf-automation/SKILL.md` |
| crowdin-automation | "Automate Crowdin tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/crowdin-automation/SKILL.md` |
| crustdata-automation | "Automate Crustdata tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/crustdata-automation/SKILL.md` |
| cults-automation | "Automate Cults tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cults-automation/SKILL.md` |
| curated-automation | "Automate Curated tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/curated-automation/SKILL.md` |
| currents-api-automation | "Automate Currents API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/currents-api-automation/SKILL.md` |
| Customer.io Automation | "Automate customer engagement workflows including broadcast triggers, message analytics, segment management, and newsletter tracking through Customer.io via Composio" | `.agents/skills/customer.io-automation/SKILL.md` |
| customgpt-automation | "Automate Customgpt tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/customgpt-automation/SKILL.md` |
| customjs-automation | "Automate Customjs tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/customjs-automation/SKILL.md` |
| cutt-ly-automation | "Automate Cutt Ly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/cutt-ly-automation/SKILL.md` |
| d2lbrightspace-automation | "Automate D2lbrightspace tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/d2lbrightspace-automation/SKILL.md` |
| dadata-ru-automation | "Automate Dadata Ru tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dadata-ru-automation/SKILL.md` |
| daffy-automation | "Automate Daffy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/daffy-automation/SKILL.md` |
| dailybot-automation | "Automate Dailybot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dailybot-automation/SKILL.md` |
| datagma-automation | "Automate Datagma tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/datagma-automation/SKILL.md` |
| datarobot-automation | "Automate Datarobot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/datarobot-automation/SKILL.md` |
| deadline-funnel-automation | "Automate Deadline Funnel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/deadline-funnel-automation/SKILL.md` |
| deel-automation | "Automate Deel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/deel-automation/SKILL.md` |
| deepgram-automation | "Automate Deepgram tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/deepgram-automation/SKILL.md` |
| demio-automation | "Automate Demio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/demio-automation/SKILL.md` |
| desktime-automation | "Automate Desktime tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/desktime-automation/SKILL.md` |
| detrack-automation | "Automate Detrack tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/detrack-automation/SKILL.md` |
| developer-growth-analysis | Analyzes your recent Claude Code chat history to identify coding patterns, development gaps, and areas for improvement, curates relevant learning resources from HackerNews, and automatically sends a personalized growth report to your Slack DMs. | `.agents/skills/developer-growth-analysis/SKILL.md` |
| dialmycalls-automation | "Automate Dialmycalls tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dialmycalls-automation/SKILL.md` |
| dialpad-automation | "Automate Dialpad tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dialpad-automation/SKILL.md` |
| dictionary-api-automation | "Automate Dictionary API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dictionary-api-automation/SKILL.md` |
| diffbot-automation | "Automate Diffbot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/diffbot-automation/SKILL.md` |
| digicert-automation | "Automate Digicert tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/digicert-automation/SKILL.md` |
| digital-ocean-automation | "Automate DigitalOcean tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/digital-ocean-automation/SKILL.md` |
| discordbot-automation | "Automate Discordbot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/discordbot-automation/SKILL.md` |
| dnsfilter-automation | "Automate Dnsfilter tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dnsfilter-automation/SKILL.md` |
| dock-certs-automation | "Automate Dock Certs tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dock-certs-automation/SKILL.md` |
| Docker Hub Automation | "Automate Docker Hub operations -- manage organizations, repositories, teams, members, and webhooks via the Composio MCP integration." | `.agents/skills/docker-hub-automation/SKILL.md` |
| docker_hub-automation | "Automate Docker Hub tasks via Rube MCP (Composio): repositories, images, tags, and container registry management. Always search tools first for current schemas." | `.agents/skills/docker_hub-automation/SKILL.md` |
| docmosis-automation | "Automate Docmosis tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docmosis-automation/SKILL.md` |
| docnify-automation | "Automate Docnify tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docnify-automation/SKILL.md` |
| docsbot-ai-automation | "Automate Docsbot AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docsbot-ai-automation/SKILL.md` |
| docsumo-automation | "Automate Docsumo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docsumo-automation/SKILL.md` |
| docugenerate-automation | "Automate Docugenerate tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docugenerate-automation/SKILL.md` |
| documenso-automation | "Automate Documenso tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/documenso-automation/SKILL.md` |
| documint-automation | "Automate Documint tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/documint-automation/SKILL.md` |
| docupilot-automation | "Automate Docupilot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docupilot-automation/SKILL.md` |
| docupost-automation | "Automate Docupost tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docupost-automation/SKILL.md` |
| docuseal-automation | "Automate Docuseal tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/docuseal-automation/SKILL.md` |
| docx | "Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. When Claude needs to work with professional documents (.docx files) for: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks" | `.agents/skills/docx/SKILL.md` |
| domain-name-brainstormer | Generates creative domain name ideas for your project and checks availability across multiple TLDs (.com, .io, .dev, .ai, etc.). Saves hours of brainstorming and manual checking. | `.agents/skills/domain-name-brainstormer/SKILL.md` |
| doppler-marketing-automation-automation | "Automate Doppler Marketing Automation tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/doppler-marketing-automation-automation/SKILL.md` |
| doppler-secretops-automation | "Automate Doppler Secretops tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/doppler-secretops-automation/SKILL.md` |
| dotsimple-automation | "Automate Dotsimple tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dotsimple-automation/SKILL.md` |
| dovetail-automation | "Automate Dovetail tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dovetail-automation/SKILL.md` |
| dpd2-automation | "Automate Dpd2 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dpd2-automation/SKILL.md` |
| draftable-automation | "Automate Draftable tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/draftable-automation/SKILL.md` |
| dreamstudio-automation | "Automate Dreamstudio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dreamstudio-automation/SKILL.md` |
| drip-jobs-automation | "Automate Drip Jobs tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/drip-jobs-automation/SKILL.md` |
| dripcel-automation | "Automate Dripcel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dripcel-automation/SKILL.md` |
| dromo-automation | "Automate Dromo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dromo-automation/SKILL.md` |
| dropbox-sign-automation | "Automate Dropbox Sign tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dropbox-sign-automation/SKILL.md` |
| dropcontact-automation | "Automate Dropcontact tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dropcontact-automation/SKILL.md` |
| dungeon-fighter-online-automation | "Automate Dungeon Fighter Online tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/dungeon-fighter-online-automation/SKILL.md` |
| Dynamics 365 Automation | "Dynamics 365 Automation: manage CRM contacts, accounts, leads, opportunities, sales orders, invoices, and cases via the Dynamics CRM Web API" | `.agents/skills/dynamics-365-automation/SKILL.md` |
| echtpost-automation | "Automate Echtpost tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/echtpost-automation/SKILL.md` |
| ElevenLabs Automation | "Automate ElevenLabs text-to-speech workflows -- generate speech from text, browse and inspect voices, check subscription limits, list models, stream audio, and retrieve history via the Composio MCP integration." | `.agents/skills/elevenlabs-automation/SKILL.md` |
| elorus-automation | "Automate Elorus tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/elorus-automation/SKILL.md` |
| emailable-automation | "Automate Emailable tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/emailable-automation/SKILL.md` |
| emaillistverify-automation | "Automate Emaillistverify tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/emaillistverify-automation/SKILL.md` |
| emailoctopus-automation | "Automate Emailoctopus tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/emailoctopus-automation/SKILL.md` |
| emelia-automation | "Automate Emelia tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/emelia-automation/SKILL.md` |
| encodian-automation | "Automate Encodian tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/encodian-automation/SKILL.md` |
| endorsal-automation | "Automate Endorsal tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/endorsal-automation/SKILL.md` |
| enginemailer-automation | "Automate Enginemailer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/enginemailer-automation/SKILL.md` |
| enigma-automation | "Automate Enigma tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/enigma-automation/SKILL.md` |
| entelligence-automation | "Automate Entelligence tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/entelligence-automation/SKILL.md` |
| eodhd-apis-automation | "Automate Eodhd Apis tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/eodhd-apis-automation/SKILL.md` |
| epic-games-automation | "Automate Epic Games tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/epic-games-automation/SKILL.md` |
| esignatures-io-automation | "Automate Esignatures IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/esignatures-io-automation/SKILL.md` |
| espocrm-automation | "Automate Espocrm tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/espocrm-automation/SKILL.md` |
| esputnik-automation | "Automate Esputnik tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/esputnik-automation/SKILL.md` |
| etermin-automation | "Automate Etermin tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/etermin-automation/SKILL.md` |
| evenium-automation | "Automate Evenium tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/evenium-automation/SKILL.md` |
| Eventbrite Automation | "Automate Eventbrite event management, attendee tracking, organization discovery, and category browsing through natural language commands" | `.agents/skills/eventbrite-automation/SKILL.md` |
| eventee-automation | "Automate Eventee tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/eventee-automation/SKILL.md` |
| eventzilla-automation | "Automate Eventzilla tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/eventzilla-automation/SKILL.md` |
| everhour-automation | "Automate Everhour tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/everhour-automation/SKILL.md` |
| eversign-automation | "Automate Eversign tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/eversign-automation/SKILL.md` |
| exa-automation | "Automate Exa tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/exa-automation/SKILL.md` |
| Excel Automation | "Excel Automation: create workbooks, manage worksheets, read/write cell data, and format spreadsheets via Microsoft Excel and Google Sheets integration" | `.agents/skills/excel-automation/SKILL.md` |
| exist-automation | "Automate Exist tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/exist-automation/SKILL.md` |
| expofp-automation | "Automate Expofp tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/expofp-automation/SKILL.md` |
| extracta-ai-automation | "Automate Extracta AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/extracta-ai-automation/SKILL.md` |
| Facebook Automation | "Automate Facebook Page management including post creation, scheduling, video uploads, Messenger conversations, and audience engagement via Composio" | `.agents/skills/facebook-automation/SKILL.md` |
| faceup-automation | "Automate Faceup tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/faceup-automation/SKILL.md` |
| factorial-automation | "Automate Factorial tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/factorial-automation/SKILL.md` |
| feathery-automation | "Automate Feathery tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/feathery-automation/SKILL.md` |
| felt-automation | "Automate Felt tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/felt-automation/SKILL.md` |
| fibery-automation | "Automate Fibery tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fibery-automation/SKILL.md` |
| fidel-api-automation | "Automate Fidel API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fidel-api-automation/SKILL.md` |
| file-organizer | Intelligently organizes your files and folders across your computer by understanding context, finding duplicates, suggesting better structures, and automating cleanup tasks. Reduces cognitive load and keeps your digital workspace tidy without manual effort. | `.agents/skills/file-organizer/SKILL.md` |
| files-com-automation | "Automate Files Com tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/files-com-automation/SKILL.md` |
| fillout-forms-automation | "Automate Fillout tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fillout-forms-automation/SKILL.md` |
| fillout_forms-automation | "Automate Fillout tasks via Rube MCP (Composio): forms, submissions, workflows, and form builder. Always search tools first for current schemas." | `.agents/skills/fillout_forms-automation/SKILL.md` |
| finage-automation | "Automate Finage tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/finage-automation/SKILL.md` |
| findymail-automation | "Automate Findymail tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/findymail-automation/SKILL.md` |
| finerworks-automation | "Automate Finerworks tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/finerworks-automation/SKILL.md` |
| fingertip-automation | "Automate Fingertip tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fingertip-automation/SKILL.md` |
| finmei-automation | "Automate Finmei tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/finmei-automation/SKILL.md` |
| fireberry-automation | "Automate Fireberry tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fireberry-automation/SKILL.md` |
| Firecrawl Automation | "Automate web crawling and data extraction with Firecrawl -- scrape pages, crawl sites, extract structured data, batch scrape URLs, and map website structures through the Composio Firecrawl integration." | `.agents/skills/firecrawl-automation/SKILL.md` |
| fireflies-automation | "Automate Fireflies tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fireflies-automation/SKILL.md` |
| firmao-automation | "Automate Firmao tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/firmao-automation/SKILL.md` |
| fitbit-automation | "Automate Fitbit tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fitbit-automation/SKILL.md` |
| fixer-automation | "Automate Fixer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fixer-automation/SKILL.md` |
| fixer-io-automation | "Automate Fixer IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fixer-io-automation/SKILL.md` |
| flexisign-automation | "Automate Flexisign tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/flexisign-automation/SKILL.md` |
| flowiseai-automation | "Automate Flowiseai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/flowiseai-automation/SKILL.md` |
| flutterwave-automation | "Automate Flutterwave tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/flutterwave-automation/SKILL.md` |
| fluxguard-automation | "Automate Fluxguard tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fluxguard-automation/SKILL.md` |
| folk-automation | "Automate Folk tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/folk-automation/SKILL.md` |
| fomo-automation | "Automate Fomo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fomo-automation/SKILL.md` |
| forcemanager-automation | "Automate Forcemanager tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/forcemanager-automation/SKILL.md` |
| formbricks-automation | "Automate Formbricks tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/formbricks-automation/SKILL.md` |
| formcarry-automation | "Automate Formcarry tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/formcarry-automation/SKILL.md` |
| formdesk-automation | "Automate Formdesk tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/formdesk-automation/SKILL.md` |
| formsite-automation | "Automate Formsite tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/formsite-automation/SKILL.md` |
| foursquare-automation | "Automate Foursquare tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/foursquare-automation/SKILL.md` |
| fraudlabs-pro-automation | "Automate Fraudlabs Pro tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fraudlabs-pro-automation/SKILL.md` |
| FreshBooks Automation | "FreshBooks Automation: manage businesses, projects, time tracking, and billing in FreshBooks cloud accounting" | `.agents/skills/freshbooks-automation/SKILL.md` |
| front-automation | "Automate Front tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/front-automation/SKILL.md` |
| fullenrich-automation | "Automate Fullenrich tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/fullenrich-automation/SKILL.md` |
| gagelist-automation | "Automate Gagelist tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gagelist-automation/SKILL.md` |
| gamma-automation | "Automate Gamma tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gamma-automation/SKILL.md` |
| gan-ai-automation | "Automate Gan AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gan-ai-automation/SKILL.md` |
| gatherup-automation | "Automate Gatherup tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gatherup-automation/SKILL.md` |
| gemini-automation | "Automate Gemini tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gemini-automation/SKILL.md` |
| gender-api-automation | "Automate Gender API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gender-api-automation/SKILL.md` |
| genderapi-io-automation | "Automate Genderapi IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/genderapi-io-automation/SKILL.md` |
| genderize-automation | "Automate Genderize tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/genderize-automation/SKILL.md` |
| geoapify-automation | "Automate Geoapify tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/geoapify-automation/SKILL.md` |
| geocodio-automation | "Automate Geocodio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/geocodio-automation/SKILL.md` |
| geokeo-automation | "Automate Geokeo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/geokeo-automation/SKILL.md` |
| getform-automation | "Automate Getform tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/getform-automation/SKILL.md` |
| gift-up-automation | "Automate Gift Up tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gift-up-automation/SKILL.md` |
| gigasheet-automation | "Automate Gigasheet tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gigasheet-automation/SKILL.md` |
| giphy-automation | "Automate Giphy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/giphy-automation/SKILL.md` |
| gist-automation | "Automate Gist tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gist-automation/SKILL.md` |
| givebutter-automation | "Automate Givebutter tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/givebutter-automation/SKILL.md` |
| gladia-automation | "Automate Gladia tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gladia-automation/SKILL.md` |
| gleap-automation | "Automate Gleap tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gleap-automation/SKILL.md` |
| globalping-automation | "Automate Globalping tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/globalping-automation/SKILL.md` |
| go-to-webinar-automation | "Automate GoToWebinar tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/go-to-webinar-automation/SKILL.md` |
| godial-automation | "Automate Godial tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/godial-automation/SKILL.md` |
| Gong Automation | "Automate Gong conversation intelligence -- retrieve call recordings, transcripts, detailed analytics, speaker stats, and workspace data -- using natural language through the Composio MCP integration." | `.agents/skills/gong-automation/SKILL.md` |
| goodbits-automation | "Automate Goodbits tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/goodbits-automation/SKILL.md` |
| goody-automation | "Automate Goody tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/goody-automation/SKILL.md` |
| google-address-validation-automation | "Automate Google Address Validation tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/google-address-validation-automation/SKILL.md` |
| google-admin-automation | "Automate Google Workspace Admin tasks via Rube MCP (Composio): manage users, groups, memberships, suspend accounts, create users, add aliases. Always search tools first for current schemas." | `.agents/skills/google-admin-automation/SKILL.md` |
| google-classroom-automation | "Automate Google Classroom tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/google-classroom-automation/SKILL.md` |
| google-cloud-vision-automation | "Automate Google Cloud Vision tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/google-cloud-vision-automation/SKILL.md` |
| google-maps-automation | "Automate Google Maps tasks via Rube MCP (Composio): geocode addresses, search places, get directions, compute route matrices, reverse geocode, autocomplete, get place details. Always search tools first for current schemas." | `.agents/skills/google-maps-automation/SKILL.md` |
| google-search-console-automation | "Automate Google Search Console tasks via Rube MCP (Composio): query search analytics, list sites, inspect URLs, submit sitemaps, monitor search performance. Always search tools first for current schemas." | `.agents/skills/google-search-console-automation/SKILL.md` |
| googleads-automation | "Automate Google Ads analytics tasks via Rube MCP (Composio): list Google Ads links, run GA4 reports, check compatibility, list properties and accounts. Always search tools first for current schemas." | `.agents/skills/googleads-automation/SKILL.md` |
| googlebigquery-automation | "Automate Google BigQuery tasks via Rube MCP (Composio): run SQL queries, explore datasets and metadata, execute MBQL queries via Metabase integration. Always search tools first for current schemas." | `.agents/skills/googlebigquery-automation/SKILL.md` |
| googlecalendar-automation | "Automate Google Calendar tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/googlecalendar-automation/SKILL.md` |
| googledocs-automation | "Automate Google Docs tasks via Rube MCP (Composio): create, edit, search, export, copy, and update documents. Always search tools first for current schemas." | `.agents/skills/googledocs-automation/SKILL.md` |
| googledrive-automation | "Automate Google Drive tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/googledrive-automation/SKILL.md` |
| googlemeet-automation | "Automate Google Meet tasks via Rube MCP (Composio): create Meet spaces, schedule video conferences via Calendar events, manage meeting access. Always search tools first for current schemas." | `.agents/skills/googlemeet-automation/SKILL.md` |
| googlephotos-automation | "Automate Google Photos tasks via Rube MCP (Composio): upload media, manage albums, search photos, batch add items, create and update albums. Always search tools first for current schemas." | `.agents/skills/googlephotos-automation/SKILL.md` |
| googleslides-automation | "Automate Google Slides tasks via Rube MCP (Composio): create presentations, add slides from Markdown, batch update, copy from templates, get thumbnails. Always search tools first for current schemas." | `.agents/skills/googleslides-automation/SKILL.md` |
| googlesuper-automation | "Automate Google Super tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/googlesuper-automation/SKILL.md` |
| googletasks-automation | "Automate Google Tasks via Rube MCP (Composio): create, list, update, delete, move, and bulk-insert tasks and task lists. Always search tools first for current schemas." | `.agents/skills/googletasks-automation/SKILL.md` |
| google_admin-automation | "Automate Google Admin tasks via Rube MCP (Composio): user management, org units, groups, and domain administration. Always search tools first for current schemas." | `.agents/skills/google_admin-automation/SKILL.md` |
| google_classroom-automation | "Automate Google Classroom tasks via Rube MCP (Composio): course management, assignments, student rosters, and announcements. Always search tools first for current schemas." | `.agents/skills/google_classroom-automation/SKILL.md` |
| google_maps-automation | "Automate Google Maps tasks via Rube MCP (Composio): geocoding, directions, place search, and distance calculations. Always search tools first for current schemas." | `.agents/skills/google_maps-automation/SKILL.md` |
| google_search_console-automation | "Automate Google Search Console tasks via Rube MCP (Composio): search performance, URL inspection, sitemaps, and indexing status. Always search tools first for current schemas." | `.agents/skills/google_search_console-automation/SKILL.md` |
| Gorgias Automation | "Automate e-commerce customer support workflows in Gorgias -- manage tickets, customers, tags, and teams through natural language commands." | `.agents/skills/gorgias-automation/SKILL.md` |
| gosquared-automation | "Automate Gosquared tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/gosquared-automation/SKILL.md` |
| grafbase-automation | "Automate Grafbase tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/grafbase-automation/SKILL.md` |
| graphhopper-automation | "Automate Graphhopper tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/graphhopper-automation/SKILL.md` |
| griptape-automation | "Automate Griptape tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/griptape-automation/SKILL.md` |
| grist-automation | "Automate Grist tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/grist-automation/SKILL.md` |
| GroqCloud Automation | "Automate AI inference, chat completions, audio translation, and TTS voice management through GroqCloud's high-performance API via Composio" | `.agents/skills/groqcloud-automation/SKILL.md` |
| Gumroad Automation | "Automate Gumroad product management, sales tracking, license verification, and webhook subscriptions using natural language through the Composio MCP integration." | `.agents/skills/gumroad-automation/SKILL.md` |
| habitica-automation | "Automate Habitica tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/habitica-automation/SKILL.md` |
| hackernews-automation | "Automate Hackernews tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hackernews-automation/SKILL.md` |
| happy-scribe-automation | "Automate Happy Scribe tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/happy-scribe-automation/SKILL.md` |
| Harvest Automation | "Automate time tracking, project management, and invoicing workflows in Harvest -- log hours, manage projects, clients, and tasks through natural language commands." | `.agents/skills/harvest-automation/SKILL.md` |
| hashnode-automation | "Automate Hashnode tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hashnode-automation/SKILL.md` |
| helcim-automation | "Automate Helcim tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/helcim-automation/SKILL.md` |
| helloleads-automation | "Automate Helloleads tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/helloleads-automation/SKILL.md` |
| helpwise-automation | "Automate Helpwise tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/helpwise-automation/SKILL.md` |
| here-automation | "Automate Here tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/here-automation/SKILL.md` |
| HeyGen Automation | "Automate AI video generation, avatar browsing, template-based video creation, and video status tracking through HeyGen's platform via Composio" | `.agents/skills/heygen-automation/SKILL.md` |
| heyreach-automation | "Automate Heyreach tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/heyreach-automation/SKILL.md` |
| heyzine-automation | "Automate Heyzine tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/heyzine-automation/SKILL.md` |
| highergov-automation | "Automate Highergov tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/highergov-automation/SKILL.md` |
| highlevel-automation | "Automate Highlevel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/highlevel-automation/SKILL.md` |
| honeybadger-automation | "Automate Honeybadger tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/honeybadger-automation/SKILL.md` |
| honeyhive-automation | "Automate Honeyhive tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/honeyhive-automation/SKILL.md` |
| hookdeck-automation | "Automate Hookdeck tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hookdeck-automation/SKILL.md` |
| hotspotsystem-automation | "Automate Hotspotsystem tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hotspotsystem-automation/SKILL.md` |
| html-to-image-automation | "Automate Html To Image tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/html-to-image-automation/SKILL.md` |
| humanitix-automation | "Automate Humanitix tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/humanitix-automation/SKILL.md` |
| humanloop-automation | "Automate Humanloop tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/humanloop-automation/SKILL.md` |
| Hunter Automation | "Automate Hunter.io email intelligence -- search domains for email addresses, find specific contacts, verify email deliverability, manage leads, and monitor account usage -- using natural language through the Composio MCP integration." | `.agents/skills/hunter-automation/SKILL.md` |
| hypeauditor-automation | "Automate Hypeauditor tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hypeauditor-automation/SKILL.md` |
| hyperbrowser-automation | "Automate Hyperbrowser tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hyperbrowser-automation/SKILL.md` |
| hyperise-automation | "Automate Hyperise tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hyperise-automation/SKILL.md` |
| hystruct-automation | "Automate Hystruct tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/hystruct-automation/SKILL.md` |
| icims-talent-cloud-automation | "Automate Icims Talent Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/icims-talent-cloud-automation/SKILL.md` |
| icypeas-automation | "Automate Icypeas tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/icypeas-automation/SKILL.md` |
| idea-scale-automation | "Automate Idea Scale tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/idea-scale-automation/SKILL.md` |
| identitycheck-automation | "Automate Identitycheck tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/identitycheck-automation/SKILL.md` |
| ignisign-automation | "Automate Ignisign tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ignisign-automation/SKILL.md` |
| image-enhancer | Improves the quality of images, especially screenshots, by enhancing resolution, sharpness, and clarity. Perfect for preparing images for presentations, documentation, or social media posts. | `.agents/skills/image-enhancer/SKILL.md` |
| imagekit-io-automation | "Automate Imagekit IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/imagekit-io-automation/SKILL.md` |
| imgbb-automation | "Automate Imgbb tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/imgbb-automation/SKILL.md` |
| imgix-automation | "Automate Imgix tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/imgix-automation/SKILL.md` |
| influxdb-cloud-automation | "Automate Influxdb Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/influxdb-cloud-automation/SKILL.md` |
| insighto-ai-automation | "Automate Insighto AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/insighto-ai-automation/SKILL.md` |
| instacart-automation | "Automate Instacart tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/instacart-automation/SKILL.md` |
| Instantly Automation | "Automate Instantly cold email outreach -- manage campaigns, sending accounts, lead lists, bulk lead imports, and campaign analytics -- using natural language through the Composio MCP integration." | `.agents/skills/instantly-automation/SKILL.md` |
| intelliprint-automation | "Automate Intelliprint tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/intelliprint-automation/SKILL.md` |
| internal-comms | A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.). | `.agents/skills/internal-comms/SKILL.md` |
| interzoid-automation | "Automate Interzoid tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/interzoid-automation/SKILL.md` |
| invoice-organizer | Automatically organizes invoices and receipts for tax preparation by reading messy files, extracting key information, renaming them consistently, and sorting them into logical folders. Turns hours of manual bookkeeping into minutes of automated organization. | `.agents/skills/invoice-organizer/SKILL.md` |
| ip2location-automation | "Automate Ip2location tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ip2location-automation/SKILL.md` |
| ip2location-io-automation | "Automate Ip2location IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ip2location-io-automation/SKILL.md` |
| ip2proxy-automation | "Automate Ip2proxy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ip2proxy-automation/SKILL.md` |
| ip2whois-automation | "Automate Ip2whois tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ip2whois-automation/SKILL.md` |
| ipdata-co-automation | "Automate Ipdata co tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ipdata-co-automation/SKILL.md` |
| ipinfo-io-automation | "Automate Ipinfo IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ipinfo-io-automation/SKILL.md` |
| iqair-airvisual-automation | "Automate Iqair Airvisual tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/iqair-airvisual-automation/SKILL.md` |
| jigsawstack-automation | "Automate Jigsawstack tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/jigsawstack-automation/SKILL.md` |
| jobnimbus-automation | "Automate Jobnimbus tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/jobnimbus-automation/SKILL.md` |
| Jotform Automation | "Automate Jotform form listing, user management, activity history, folder organization, and plan inspection through natural language commands" | `.agents/skills/jotform-automation/SKILL.md` |
| jumpcloud-automation | "Automate Jumpcloud tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/jumpcloud-automation/SKILL.md` |
| junglescout-automation | "Automate Junglescout tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/junglescout-automation/SKILL.md` |
| kadoa-automation | "Automate Kadoa tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/kadoa-automation/SKILL.md` |
| kaggle-automation | "Automate Kaggle tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/kaggle-automation/SKILL.md` |
| kaleido-automation | "Automate Kaleido tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/kaleido-automation/SKILL.md` |
| keap-automation | "Automate Keap tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/keap-automation/SKILL.md` |
| keen-io-automation | "Automate Keen IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/keen-io-automation/SKILL.md` |
| kickbox-automation | "Automate Kickbox tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/kickbox-automation/SKILL.md` |
| kit-automation | "Automate Kit tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/kit-automation/SKILL.md` |
| klipfolio-automation | "Automate Klipfolio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/klipfolio-automation/SKILL.md` |
| ko-fi-automation | "Automate Ko Fi tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ko-fi-automation/SKILL.md` |
| Kommo Automation | "Automate Kommo CRM operations -- manage leads, pipelines, pipeline stages, tasks, and custom fields -- using natural language through the Composio MCP integration." | `.agents/skills/kommo-automation/SKILL.md` |
| kontent-ai-automation | "Automate Kontent AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/kontent-ai-automation/SKILL.md` |
| kraken-io-automation | "Automate Kraken IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/kraken-io-automation/SKILL.md` |
| l2s-automation | "Automate L2s tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/l2s-automation/SKILL.md` |
| labs64-netlicensing-automation | "Automate Labs64 Netlicensing tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/labs64-netlicensing-automation/SKILL.md` |
| landbot-automation | "Automate Landbot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/landbot-automation/SKILL.md` |
| langbase-automation | "Automate Langbase tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/langbase-automation/SKILL.md` |
| langsmith-fetch | Debug LangChain and LangGraph agents by fetching execution traces from LangSmith Studio. Use when debugging agent behavior, investigating errors, analyzing tool calls, checking memory operations, or examining agent performance. Automatically fetches recent traces and analyzes execution patterns. Requires langsmith-fetch CLI installed. | `.agents/skills/langsmith-fetch/SKILL.md` |
| lastpass-automation | "Automate Lastpass tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/lastpass-automation/SKILL.md` |
| LaunchDarkly Automation | "Automate LaunchDarkly feature flag management -- list projects and environments, create and delete trigger workflows, and track code references via the Composio MCP integration." | `.agents/skills/launchdarkly-automation/SKILL.md` |
| launch_darkly-automation | "Automate LaunchDarkly tasks via Rube MCP (Composio): feature flags, environments, segments, and rollout management. Always search tools first for current schemas." | `.agents/skills/launch_darkly-automation/SKILL.md` |
| lead-research-assistant | Identifies high-quality leads for your product or service by analyzing your business, searching for target companies, and providing actionable contact strategies. Perfect for sales, business development, and marketing professionals. | `.agents/skills/lead-research-assistant/SKILL.md` |
| leadfeeder-automation | "Automate Leadfeeder tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/leadfeeder-automation/SKILL.md` |
| leadoku-automation | "Automate Leadoku tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/leadoku-automation/SKILL.md` |
| leiga-automation | "Automate Leiga tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/leiga-automation/SKILL.md` |
| Lemlist Automation | "Automate Lemlist multichannel outreach -- manage campaigns, enroll leads, add personalization variables, export campaign data, and handle unsubscribes via the Composio MCP integration." | `.agents/skills/lemlist-automation/SKILL.md` |
| Lemon Squeezy Automation | "Automate Lemon Squeezy store management -- products, orders, subscriptions, customers, discounts, and checkout tracking -- using natural language through the Composio MCP integration." | `.agents/skills/lemon-squeezy-automation/SKILL.md` |
| lemon_squeezy-automation | "Automate Lemon Squeezy tasks via Rube MCP (Composio): products, orders, subscriptions, checkouts, and digital sales. Always search tools first for current schemas." | `.agents/skills/lemon_squeezy-automation/SKILL.md` |
| lessonspace-automation | "Automate Lessonspace tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/lessonspace-automation/SKILL.md` |
| Lever Automation | "Automate recruiting workflows in Lever ATS -- manage opportunities, job postings, requisitions, pipeline stages, and candidate tags through the Composio Lever integration." | `.agents/skills/lever-automation/SKILL.md` |
| lever-sandbox-automation | "Automate Lever Sandbox tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/lever-sandbox-automation/SKILL.md` |
| leverly-automation | "Automate Leverly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/leverly-automation/SKILL.md` |
| lexoffice-automation | "Automate Lexoffice tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/lexoffice-automation/SKILL.md` |
| linguapop-automation | "Automate Linguapop tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/linguapop-automation/SKILL.md` |
| linkhut-automation | "Automate Linkhut tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/linkhut-automation/SKILL.md` |
| linkup-automation | "Automate Linkup tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/linkup-automation/SKILL.md` |
| listclean-automation | "Automate Listclean tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/listclean-automation/SKILL.md` |
| listennotes-automation | "Automate Listennotes tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/listennotes-automation/SKILL.md` |
| livesession-automation | "Automate Livesession tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/livesession-automation/SKILL.md` |
| lmnt-automation | "Automate Lmnt tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/lmnt-automation/SKILL.md` |
| lodgify-automation | "Automate Lodgify tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/lodgify-automation/SKILL.md` |
| logo-dev-automation | "Automate Logo Dev tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/logo-dev-automation/SKILL.md` |
| loomio-automation | "Automate Loomio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/loomio-automation/SKILL.md` |
| loyverse-automation | "Automate Loyverse tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/loyverse-automation/SKILL.md` |
| magnetic-automation | "Automate Magnetic tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/magnetic-automation/SKILL.md` |
| mailbluster-automation | "Automate Mailbluster tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mailbluster-automation/SKILL.md` |
| mailboxlayer-automation | "Automate Mailboxlayer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mailboxlayer-automation/SKILL.md` |
| mailcheck-automation | "Automate Mailcheck tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mailcheck-automation/SKILL.md` |
| mailcoach-automation | "Automate Mailcoach tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mailcoach-automation/SKILL.md` |
| MailerLite Automation | "Automate email marketing workflows including subscriber management, campaign analytics, group segmentation, and account monitoring through MailerLite via Composio" | `.agents/skills/mailerlite-automation/SKILL.md` |
| mailersend-automation | "Automate Mailersend tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mailersend-automation/SKILL.md` |
| mails-so-automation | "Automate Mails So tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mails-so-automation/SKILL.md` |
| mailsoftly-automation | "Automate Mailsoftly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mailsoftly-automation/SKILL.md` |
| maintainx-automation | "Automate Maintainx tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/maintainx-automation/SKILL.md` |
| many-chat-automation | "Automate ManyChat tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/many-chat-automation/SKILL.md` |
| many_chat-automation | "Automate ManyChat tasks via Rube MCP (Composio): chatbot flows, subscribers, broadcasts, and messenger automation. Always search tools first for current schemas." | `.agents/skills/many_chat-automation/SKILL.md` |
| mapbox-automation | "Automate Mapbox tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mapbox-automation/SKILL.md` |
| mapulus-automation | "Automate Mapulus tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mapulus-automation/SKILL.md` |
| mboum-automation | "Automate Mboum tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mboum-automation/SKILL.md` |
| mcp-builder | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK). | `.agents/skills/mcp-builder/SKILL.md` |
| meeting-insights-analyzer | Analyzes meeting transcripts and recordings to uncover behavioral patterns, communication insights, and actionable feedback. Identifies when you avoid conflict, use filler words, dominate conversations, or miss opportunities to listen. Perfect for professionals seeking to improve their communication and leadership skills. | `.agents/skills/meeting-insights-analyzer/SKILL.md` |
| melo-automation | "Automate Melo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/melo-automation/SKILL.md` |
| mem-automation | "Automate Mem tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mem-automation/SKILL.md` |
| mem0-automation | "Automate Mem0 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mem0-automation/SKILL.md` |
| memberspot-automation | "Automate Memberspot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/memberspot-automation/SKILL.md` |
| memberstack-automation | "Automate Memberstack tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/memberstack-automation/SKILL.md` |
| membervault-automation | "Automate Membervault tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/membervault-automation/SKILL.md` |
| metaads-automation | "Automate Metaads tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/metaads-automation/SKILL.md` |
| metaphor-automation | "Automate Metaphor tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/metaphor-automation/SKILL.md` |
| mezmo-automation | "Automate Mezmo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mezmo-automation/SKILL.md` |
| Microsoft Clarity Automation | "Automate user behavior analytics with Microsoft Clarity -- export heatmap data, session metrics, and engagement analytics segmented by browser, device, country, source, and more through the Composio Microsoft Clarity integration." | `.agents/skills/microsoft-clarity-automation/SKILL.md` |
| microsoft-tenant-automation | "Automate Microsoft Tenant tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/microsoft-tenant-automation/SKILL.md` |
| microsoft_clarity-automation | "Automate Microsoft Clarity tasks via Rube MCP (Composio): session recordings, heatmaps, and user behavior analytics. Always search tools first for current schemas." | `.agents/skills/microsoft_clarity-automation/SKILL.md` |
| minerstat-automation | "Automate Minerstat tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/minerstat-automation/SKILL.md` |
| missive-automation | "Automate Missive tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/missive-automation/SKILL.md` |
| Mistral AI Automation | "Automate Mistral AI operations -- manage files and libraries, upload documents for fine-tuning, batch processing, and OCR, track fine-tuning jobs, and build RAG pipelines via the Composio MCP integration." | `.agents/skills/mistral-ai-automation/SKILL.md` |
| mistral_ai-automation | "Automate Mistral AI tasks via Rube MCP (Composio): completions, embeddings, fine-tuning, and model management. Always search tools first for current schemas." | `.agents/skills/mistral_ai-automation/SKILL.md` |
| mocean-automation | "Automate Mocean tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mocean-automation/SKILL.md` |
| moco-automation | "Automate Moco tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/moco-automation/SKILL.md` |
| modelry-automation | "Automate Modelry tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/modelry-automation/SKILL.md` |
| moneybird-automation | "Automate Moneybird tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/moneybird-automation/SKILL.md` |
| moonclerk-automation | "Automate Moonclerk tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/moonclerk-automation/SKILL.md` |
| moosend-automation | "Automate Moosend tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/moosend-automation/SKILL.md` |
| mopinion-automation | "Automate Mopinion tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mopinion-automation/SKILL.md` |
| more-trees-automation | "Automate More Trees tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/more-trees-automation/SKILL.md` |
| moxie-automation | "Automate Moxie tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/moxie-automation/SKILL.md` |
| moz-automation | "Automate Moz tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/moz-automation/SKILL.md` |
| msg91-automation | "Automate Msg91 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/msg91-automation/SKILL.md` |
| mural-automation | "Automate Mural tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mural-automation/SKILL.md` |
| mx-technologies-automation | "Automate MX Technologies tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mx-technologies-automation/SKILL.md` |
| mx-toolbox-automation | "Automate Mx Toolbox tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/mx-toolbox-automation/SKILL.md` |
| nango-automation | "Automate Nango tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/nango-automation/SKILL.md` |
| nano-nets-automation | "Automate Nano Nets tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/nano-nets-automation/SKILL.md` |
| nasa-automation | "Automate Nasa tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/nasa-automation/SKILL.md` |
| nasdaq-automation | "Automate Nasdaq tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/nasdaq-automation/SKILL.md` |
| ncscale-automation | "Automate Ncscale tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ncscale-automation/SKILL.md` |
| needle-automation | "Automate Needle tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/needle-automation/SKILL.md` |
| Neon Automation | "Automate Neon serverless Postgres operations -- manage projects, branches, databases, roles, and connection URIs via the Composio MCP integration." | `.agents/skills/neon-automation/SKILL.md` |
| NetSuite Automation | "NetSuite Automation: manage customers, sales orders, invoices, inventory, and records via Oracle NetSuite ERP with SuiteQL queries" | `.agents/skills/netsuite-automation/SKILL.md` |
| neuronwriter-automation | "Automate Neuronwriter tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/neuronwriter-automation/SKILL.md` |
| neutrino-automation | "Automate Neutrino tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/neutrino-automation/SKILL.md` |
| neverbounce-automation | "Automate Neverbounce tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/neverbounce-automation/SKILL.md` |
| New Relic Automation | "Automate New Relic observability workflows -- manage alert policies, notification channels, alert conditions, and monitor applications and browser apps via the Composio MCP integration." | `.agents/skills/new-relic-automation/SKILL.md` |
| news-api-automation | "Automate News API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/news-api-automation/SKILL.md` |
| new_relic-automation | "Automate New Relic tasks via Rube MCP (Composio): APM, alerts, dashboards, NRQL queries, and infrastructure monitoring. Always search tools first for current schemas." | `.agents/skills/new_relic-automation/SKILL.md` |
| nextdns-automation | "Automate Nextdns tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/nextdns-automation/SKILL.md` |
| ngrok-automation | "Automate Ngrok tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ngrok-automation/SKILL.md` |
| ninox-automation | "Automate Ninox tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ninox-automation/SKILL.md` |
| nocrm-io-automation | "Automate Nocrm IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/nocrm-io-automation/SKILL.md` |
| npm-automation | "Automate NPM tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/npm-automation/SKILL.md` |
| ocr-web-service-automation | "Automate OCR Web Service tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ocr-web-service-automation/SKILL.md` |
| ocrspace-automation | "Automate Ocrspace tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ocrspace-automation/SKILL.md` |
| Omnisend Automation | "Automate ecommerce marketing workflows including contact management, bulk operations, and subscriber segmentation through Omnisend via Composio" | `.agents/skills/omnisend-automation/SKILL.md` |
| oncehub-automation | "Automate Oncehub tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/oncehub-automation/SKILL.md` |
| onedesk-automation | "Automate Onedesk tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/onedesk-automation/SKILL.md` |
| onepage-automation | "Automate Onepage tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/onepage-automation/SKILL.md` |
| onesignal-rest-api-automation | "Automate OneSignal tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/onesignal-rest-api-automation/SKILL.md` |
| onesignal-user-auth-automation | "Automate Onesignal User Auth tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/onesignal-user-auth-automation/SKILL.md` |
| onesignal_rest_api-automation | "Automate OneSignal tasks via Rube MCP (Composio): push notifications, segments, templates, and messaging. Always search tools first for current schemas." | `.agents/skills/onesignal_rest_api-automation/SKILL.md` |
| open-sea-automation | "Automate Open Sea tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/open-sea-automation/SKILL.md` |
| OpenAI Automation | "Automate OpenAI API operations -- generate responses with multimodal and structured output support, create embeddings, generate images, and list models via the Composio MCP integration." | `.agents/skills/openai-automation/SKILL.md` |
| opencage-automation | "Automate Opencage tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/opencage-automation/SKILL.md` |
| opengraph-io-automation | "Automate Opengraph IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/opengraph-io-automation/SKILL.md` |
| openperplex-automation | "Automate Openperplex tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/openperplex-automation/SKILL.md` |
| openrouter-automation | "Automate Openrouter tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/openrouter-automation/SKILL.md` |
| openweather-api-automation | "Automate Openweather API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/openweather-api-automation/SKILL.md` |
| optimoroute-automation | "Automate Optimoroute tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/optimoroute-automation/SKILL.md` |
| owl-protocol-automation | "Automate Owl Protocol tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/owl-protocol-automation/SKILL.md` |
| page-x-automation | "Automate Page X tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/page-x-automation/SKILL.md` |
| PandaDoc Automation | "Automate document workflows with PandaDoc -- create documents from files, manage contacts, organize folders, set up webhooks, create templates, and track document status through the Composio PandaDoc integration." | `.agents/skills/pandadoc-automation/SKILL.md` |
| paradym-automation | "Automate Paradym tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/paradym-automation/SKILL.md` |
| parallel-automation | "Automate Parallel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/parallel-automation/SKILL.md` |
| parma-automation | "Automate Parma tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/parma-automation/SKILL.md` |
| parsehub-automation | "Automate Parsehub tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/parsehub-automation/SKILL.md` |
| parsera-automation | "Automate Parsera tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/parsera-automation/SKILL.md` |
| parseur-automation | "Automate Parseur tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/parseur-automation/SKILL.md` |
| passcreator-automation | "Automate Passcreator tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/passcreator-automation/SKILL.md` |
| passslot-automation | "Automate Passslot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/passslot-automation/SKILL.md` |
| payhip-automation | "Automate Payhip tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/payhip-automation/SKILL.md` |
| pdf | Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale. | `.agents/skills/pdf/SKILL.md` |
| pdf-api-io-automation | "Automate PDF API IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pdf-api-io-automation/SKILL.md` |
| pdf-co-automation | "Automate PDF co tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pdf-co-automation/SKILL.md` |
| pdf4me-automation | "Automate Pdf4me tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pdf4me-automation/SKILL.md` |
| pdfless-automation | "Automate Pdfless tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pdfless-automation/SKILL.md` |
| pdfmonkey-automation | "Automate Pdfmonkey tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pdfmonkey-automation/SKILL.md` |
| peopledatalabs-automation | "Automate Peopledatalabs tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/peopledatalabs-automation/SKILL.md` |
| perigon-automation | "Automate Perigon tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/perigon-automation/SKILL.md` |
| perplexityai-automation | "Automate Perplexityai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/perplexityai-automation/SKILL.md` |
| persistiq-automation | "Automate Persistiq tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/persistiq-automation/SKILL.md` |
| pexels-automation | "Automate Pexels tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pexels-automation/SKILL.md` |
| PhantomBuster Automation | "Automate lead generation, web scraping, and social media data extraction workflows through PhantomBuster's cloud platform via Composio" | `.agents/skills/phantombuster-automation/SKILL.md` |
| piggy-automation | "Automate Piggy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/piggy-automation/SKILL.md` |
| piloterr-automation | "Automate Piloterr tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/piloterr-automation/SKILL.md` |
| pilvio-automation | "Automate Pilvio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pilvio-automation/SKILL.md` |
| pingdom-automation | "Automate Pingdom tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pingdom-automation/SKILL.md` |
| pipeline-crm-automation | "Automate Pipeline CRM tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pipeline-crm-automation/SKILL.md` |
| placekey-automation | "Automate Placekey tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/placekey-automation/SKILL.md` |
| placid-automation | "Automate Placid tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/placid-automation/SKILL.md` |
| plain-automation | "Automate Plain tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/plain-automation/SKILL.md` |
| plasmic-automation | "Automate Plasmic tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/plasmic-automation/SKILL.md` |
| platerecognizer-automation | "Automate Platerecognizer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/platerecognizer-automation/SKILL.md` |
| plisio-automation | "Automate Plisio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/plisio-automation/SKILL.md` |
| polygon-automation | "Automate Polygon tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/polygon-automation/SKILL.md` |
| polygon-io-automation | "Automate Polygon IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/polygon-io-automation/SKILL.md` |
| poptin-automation | "Automate Poptin tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/poptin-automation/SKILL.md` |
| postgrid-automation | "Automate Postgrid tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/postgrid-automation/SKILL.md` |
| postgrid-verify-automation | "Automate Postgrid Verify tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/postgrid-verify-automation/SKILL.md` |
| pptx | "Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks" | `.agents/skills/pptx/SKILL.md` |
| precoro-automation | "Automate Precoro tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/precoro-automation/SKILL.md` |
| prerender-automation | "Automate Prerender tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/prerender-automation/SKILL.md` |
| printautopilot-automation | "Automate Printautopilot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/printautopilot-automation/SKILL.md` |
| prisma-automation | "Automate Prisma tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/prisma-automation/SKILL.md` |
| Prismic Automation | "Automate headless CMS operations in Prismic -- query documents, search content, retrieve custom types, and manage repository refs through the Composio Prismic integration." | `.agents/skills/prismic-automation/SKILL.md` |
| process-street-automation | "Automate Process Street tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/process-street-automation/SKILL.md` |
| procfu-automation | "Automate Procfu tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/procfu-automation/SKILL.md` |
| Productboard Automation | "Automate product management workflows in Productboard -- manage features, notes, objectives, components, and releases through natural language commands." | `.agents/skills/productboard-automation/SKILL.md` |
| productlane-automation | "Automate Productlane tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/productlane-automation/SKILL.md` |
| project-bubble-automation | "Automate Project Bubble tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/project-bubble-automation/SKILL.md` |
| proofly-automation | "Automate Proofly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/proofly-automation/SKILL.md` |
| proxiedmail-automation | "Automate Proxiedmail tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/proxiedmail-automation/SKILL.md` |
| pushbullet-automation | "Automate Pushbullet tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pushbullet-automation/SKILL.md` |
| pushover-automation | "Automate Pushover tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/pushover-automation/SKILL.md` |
| quaderno-automation | "Automate Quaderno tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/quaderno-automation/SKILL.md` |
| qualaroo-automation | "Automate Qualaroo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/qualaroo-automation/SKILL.md` |
| QuickBooks Automation | "QuickBooks Automation: manage invoices, customers, accounts, and payments in QuickBooks Online for streamlined bookkeeping" | `.agents/skills/quickbooks-automation/SKILL.md` |
| radar-automation | "Automate Radar tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/radar-automation/SKILL.md` |
| raffle-winner-picker | Picks random winners from lists, spreadsheets, or Google Sheets for giveaways, raffles, and contests. Ensures fair, unbiased selection with transparency. | `.agents/skills/raffle-winner-picker/SKILL.md` |
| rafflys-automation | "Automate Rafflys tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/rafflys-automation/SKILL.md` |
| ragic-automation | "Automate Ragic tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ragic-automation/SKILL.md` |
| raisely-automation | "Automate Raisely tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/raisely-automation/SKILL.md` |
| Ramp Automation | "Ramp Automation: manage corporate card transactions, reimbursements, users, and expense tracking via the Ramp platform" | `.agents/skills/ramp-automation/SKILL.md` |
| ravenseotools-automation | "Automate Ravenseotools tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ravenseotools-automation/SKILL.md` |
| re-amaze-automation | "Automate Re Amaze tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/re-amaze-automation/SKILL.md` |
| realphonevalidation-automation | "Automate Realphonevalidation tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/realphonevalidation-automation/SKILL.md` |
| recallai-automation | "Automate Recallai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/recallai-automation/SKILL.md` |
| recruitee-automation | "Automate Recruitee tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/recruitee-automation/SKILL.md` |
| refiner-automation | "Automate Refiner tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/refiner-automation/SKILL.md` |
| remarkety-automation | "Automate Remarkety tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/remarkety-automation/SKILL.md` |
| remote-retrieval-automation | "Automate Remote Retrieval tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/remote-retrieval-automation/SKILL.md` |
| remove-bg-automation | "Automate Remove Bg tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/remove-bg-automation/SKILL.md` |
| renderform-automation | "Automate Renderform tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/renderform-automation/SKILL.md` |
| repairshopr-automation | "Automate Repairshopr tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/repairshopr-automation/SKILL.md` |
| Replicate Automation | "Automate Replicate AI model operations -- run predictions, upload files, inspect model schemas, list versions, and manage prediction history via the Composio MCP integration." | `.agents/skills/replicate-automation/SKILL.md` |
| reply-automation | "Automate Reply tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/reply-automation/SKILL.md` |
| reply-io-automation | "Automate Reply IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/reply-io-automation/SKILL.md` |
| resend-automation | "Automate Resend tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/resend-automation/SKILL.md` |
| respond-io-automation | "Automate Respond IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/respond-io-automation/SKILL.md` |
| retailed-automation | "Automate Retailed tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/retailed-automation/SKILL.md` |
| retellai-automation | "Automate Retellai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/retellai-automation/SKILL.md` |
| retently-automation | "Automate Retently tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/retently-automation/SKILL.md` |
| rev-ai-automation | "Automate Rev AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/rev-ai-automation/SKILL.md` |
| revolt-automation | "Automate Revolt tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/revolt-automation/SKILL.md` |
| RingCentral Automation | "RingCentral automation via Rube MCP -- toolkit not currently available in Composio; no RING_CENTRAL_ tools found" | `.agents/skills/ringcentral-automation/SKILL.md` |
| ring_central-automation | "Automate RingCentral tasks via Rube MCP (Composio): calls, messages, meetings, and unified communications. Always search tools first for current schemas." | `.agents/skills/ring_central-automation/SKILL.md` |
| rippling-automation | "Automate Rippling tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/rippling-automation/SKILL.md` |
| ritekit-automation | "Automate Ritekit tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ritekit-automation/SKILL.md` |
| rkvst-automation | "Automate Rkvst tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/rkvst-automation/SKILL.md` |
| rocketlane-automation | "Automate Rocketlane tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/rocketlane-automation/SKILL.md` |
| rootly-automation | "Automate Rootly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/rootly-automation/SKILL.md` |
| rosette-text-analytics-automation | "Automate Rosette Text Analytics tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/rosette-text-analytics-automation/SKILL.md` |
| route4me-automation | "Automate Route4me tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/route4me-automation/SKILL.md` |
| safetyculture-automation | "Automate Safetyculture tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/safetyculture-automation/SKILL.md` |
| sage-automation | "Automate Sage tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sage-automation/SKILL.md` |
| salesforce-marketing-cloud-automation | "Automate Salesforce Marketing Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/salesforce-marketing-cloud-automation/SKILL.md` |
| salesforce-service-cloud-automation | "Automate Salesforce Service Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/salesforce-service-cloud-automation/SKILL.md` |
| salesmate-automation | "Automate Salesmate tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/salesmate-automation/SKILL.md` |
| sap-successfactors-automation | "Automate SAP SuccessFactors tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sap-successfactors-automation/SKILL.md` |
| satismeter-automation | "Automate Satismeter tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/satismeter-automation/SKILL.md` |
| scrape-do-automation | "Automate Scrape Do tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/scrape-do-automation/SKILL.md` |
| scrapegraph-ai-automation | "Automate Scrapegraph AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/scrapegraph-ai-automation/SKILL.md` |
| scrapfly-automation | "Automate Scrapfly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/scrapfly-automation/SKILL.md` |
| scrapingant-automation | "Automate Scrapingant tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/scrapingant-automation/SKILL.md` |
| scrapingbee-automation | "Automate Scrapingbee tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/scrapingbee-automation/SKILL.md` |
| screenshot-fyi-automation | "Automate Screenshot Fyi tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/screenshot-fyi-automation/SKILL.md` |
| screenshotone-automation | "Automate Screenshotone tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/screenshotone-automation/SKILL.md` |
| seat-geek-automation | "Automate Seat Geek tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/seat-geek-automation/SKILL.md` |
| securitytrails-automation | "Automate Securitytrails tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/securitytrails-automation/SKILL.md` |
| segmetrics-automation | "Automate Segmetrics tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/segmetrics-automation/SKILL.md` |
| seismic-automation | "Automate Seismic tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/seismic-automation/SKILL.md` |
| semanticscholar-automation | "Automate Semanticscholar tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/semanticscholar-automation/SKILL.md` |
| SEMrush Automation | "Automate SEO analysis with SEMrush -- research keywords, analyze domain organic rankings, audit backlinks, assess keyword difficulty, and discover related terms through the Composio SEMrush integration." | `.agents/skills/semrush-automation/SKILL.md` |
| sendbird-ai-chabot-automation | "Automate Sendbird AI Chabot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sendbird-ai-chabot-automation/SKILL.md` |
| sendbird-automation | "Automate Sendbird tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sendbird-automation/SKILL.md` |
| sendfox-automation | "Automate Sendfox tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sendfox-automation/SKILL.md` |
| sendlane-automation | "Automate Sendlane tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sendlane-automation/SKILL.md` |
| sendloop-automation | "Automate Sendloop tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sendloop-automation/SKILL.md` |
| sendspark-automation | "Automate Sendspark tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sendspark-automation/SKILL.md` |
| sensibo-automation | "Automate Sensibo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sensibo-automation/SKILL.md` |
| seqera-automation | "Automate Seqera tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/seqera-automation/SKILL.md` |
| serpapi-automation | "Automate Serpapi tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/serpapi-automation/SKILL.md` |
| serpdog-automation | "Automate Serpdog tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/serpdog-automation/SKILL.md` |
| serply-automation | "Automate Serply tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/serply-automation/SKILL.md` |
| servicem8-automation | "Automate Servicem8 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/servicem8-automation/SKILL.md` |
| sevdesk-automation | "Automate Sevdesk tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sevdesk-automation/SKILL.md` |
| SharePoint Automation | "SharePoint Automation: manage sites, lists, documents, folders, pages, and search content across SharePoint and OneDrive" | `.agents/skills/sharepoint-automation/SKILL.md` |
| share_point-automation | "Automate SharePoint tasks via Rube MCP (Composio): document libraries, sites, lists, and content management. Always search tools first for current schemas." | `.agents/skills/share_point-automation/SKILL.md` |
| shipengine-automation | "Automate Shipengine tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/shipengine-automation/SKILL.md` |
| short-io-automation | "Automate Short IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/short-io-automation/SKILL.md` |
| short-menu-automation | "Automate Short Menu tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/short-menu-automation/SKILL.md` |
| Shortcut Automation | "Automate project management workflows in Shortcut -- create stories, manage tasks, track epics, and organize workflows through natural language commands." | `.agents/skills/shortcut-automation/SKILL.md` |
| shorten-rest-automation | "Automate Shorten Rest tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/shorten-rest-automation/SKILL.md` |
| shortpixel-automation | "Automate Shortpixel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/shortpixel-automation/SKILL.md` |
| shotstack-automation | "Automate Shotstack tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/shotstack-automation/SKILL.md` |
| sidetracker-automation | "Automate Sidetracker tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sidetracker-automation/SKILL.md` |
| signaturely-automation | "Automate Signaturely tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/signaturely-automation/SKILL.md` |
| signpath-automation | "Automate Signpath tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/signpath-automation/SKILL.md` |
| signwell-automation | "Automate Signwell tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/signwell-automation/SKILL.md` |
| similarweb-digitalrank-api-automation | "Automate SimilarWeb tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/similarweb-digitalrank-api-automation/SKILL.md` |
| similarweb_digitalrank_api-automation | "Automate SimilarWeb tasks via Rube MCP (Composio): website traffic, rankings, and digital market intelligence. Always search tools first for current schemas." | `.agents/skills/similarweb_digitalrank_api-automation/SKILL.md` |
| simla-com-automation | "Automate Simla Com tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/simla-com-automation/SKILL.md` |
| simple-analytics-automation | "Automate Simple Analytics tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/simple-analytics-automation/SKILL.md` |
| simplesat-automation | "Automate Simplesat tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/simplesat-automation/SKILL.md` |
| sitespeakai-automation | "Automate Sitespeakai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sitespeakai-automation/SKILL.md` |
| skill-creator | Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations. | `.agents/skills/skill-creator/SKILL.md` |
| skill-share | A skill that creates new Claude skills and automatically shares them on Slack using Rube for seamless team collaboration and skill discovery. | `.agents/skills/skill-share/SKILL.md` |
| skyfire-automation | "Automate Skyfire tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/skyfire-automation/SKILL.md` |
| slack-gif-creator | Toolkit for creating animated GIFs optimized for Slack, with validators for size constraints and composable animation primitives. This skill applies when users request animated GIFs or emoji animations for Slack from descriptions like "make me a GIF for Slack of X doing Y". | `.agents/skills/slack-gif-creator/SKILL.md` |
| slackbot-automation | "Automate Slackbot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/slackbot-automation/SKILL.md` |
| smartproxy-automation | "Automate Smartproxy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/smartproxy-automation/SKILL.md` |
| smartrecruiters-automation | "Automate Smartrecruiters tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/smartrecruiters-automation/SKILL.md` |
| sms-alert-automation | "Automate SMS Alert tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sms-alert-automation/SKILL.md` |
| smtp2go-automation | "Automate Smtp2go tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/smtp2go-automation/SKILL.md` |
| smugmug-automation | "Automate Smugmug tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/smugmug-automation/SKILL.md` |
| Snowflake Automation | "Automate Snowflake data warehouse operations -- list databases, schemas, and tables, execute SQL statements, and manage data workflows via the Composio MCP integration." | `.agents/skills/snowflake-automation/SKILL.md` |
| sourcegraph-automation | "Automate Sourcegraph tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sourcegraph-automation/SKILL.md` |
| splitwise-automation | "Automate Splitwise tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/splitwise-automation/SKILL.md` |
| spoki-automation | "Automate Spoki tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/spoki-automation/SKILL.md` |
| spondyr-automation | "Automate Spondyr tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/spondyr-automation/SKILL.md` |
| Spotify Automation | "Automate Spotify workflows including playlist management, music search, playback control, and user profile access via Composio" | `.agents/skills/spotify-automation/SKILL.md` |
| spotlightr-automation | "Automate Spotlightr tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/spotlightr-automation/SKILL.md` |
| sslmate-cert-spotter-api-automation | "Automate Sslmate Cert Spotter API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sslmate-cert-spotter-api-automation/SKILL.md` |
| stack-exchange-automation | "Automate Stack Exchange tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/stack-exchange-automation/SKILL.md` |
| stannp-automation | "Automate Stannp tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/stannp-automation/SKILL.md` |
| starton-automation | "Automate Starton tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/starton-automation/SKILL.md` |
| statuscake-automation | "Automate Statuscake tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/statuscake-automation/SKILL.md` |
| storeganise-automation | "Automate Storeganise tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/storeganise-automation/SKILL.md` |
| storerocket-automation | "Automate Storerocket tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/storerocket-automation/SKILL.md` |
| stormglass-io-automation | "Automate Stormglass IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/stormglass-io-automation/SKILL.md` |
| strava-automation | "Automate Strava tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/strava-automation/SKILL.md` |
| streamtime-automation | "Automate Streamtime tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/streamtime-automation/SKILL.md` |
| supabase | "Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues); client libraries and SSR integrations (supabase-js, @supabase/ssr) in Next.js, React, SvelteKit, Astro, Remix; auth issues (login, logout, sessions, JWT, cookies, getSession, getUser, getClaims, RLS); Supabase CLI or MCP server; schema changes, migrations, security audits, Postgres extensions (pg_graphql, pg_cron, pg_vector)." | `.agents/skills/supabase/SKILL.md` |
| supabase-postgres-best-practices | Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations. | `.agents/skills/supabase-postgres-best-practices/SKILL.md` |
| supadata-automation | "Automate Supadata tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/supadata-automation/SKILL.md` |
| superchat-automation | "Automate Superchat tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/superchat-automation/SKILL.md` |
| supportbee-automation | "Automate Supportbee tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/supportbee-automation/SKILL.md` |
| supportivekoala-automation | "Automate Supportivekoala tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/supportivekoala-automation/SKILL.md` |
| SurveyMonkey Automation | "Automate SurveyMonkey survey creation, response collection, collector management, and survey discovery through natural language commands" | `.agents/skills/surveymonkey-automation/SKILL.md` |
| survey_monkey-automation | "Automate SurveyMonkey tasks via Rube MCP (Composio): surveys, responses, collectors, and survey analytics. Always search tools first for current schemas." | `.agents/skills/survey_monkey-automation/SKILL.md` |
| svix-automation | "Automate Svix tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/svix-automation/SKILL.md` |
| sympla-automation | "Automate Sympla tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/sympla-automation/SKILL.md` |
| synthflow-ai-automation | "Automate Synthflow AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/synthflow-ai-automation/SKILL.md` |
| taggun-automation | "Automate Taggun tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/taggun-automation/SKILL.md` |
| tailored-resume-generator | Analyzes job descriptions and generates tailored resumes that highlight relevant experience, skills, and achievements to maximize interview chances | `.agents/skills/tailored-resume-generator/SKILL.md` |
| talenthr-automation | "Automate Talenthr tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/talenthr-automation/SKILL.md` |
| tally-automation | "Automate Tally tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tally-automation/SKILL.md` |
| tapfiliate-automation | "Automate Tapfiliate tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tapfiliate-automation/SKILL.md` |
| tapform-automation | "Automate Tapform tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tapform-automation/SKILL.md` |
| tavily-automation | "Automate Tavily tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tavily-automation/SKILL.md` |
| taxjar-automation | "Automate Taxjar tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/taxjar-automation/SKILL.md` |
| teamcamp-automation | "Automate Teamcamp tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/teamcamp-automation/SKILL.md` |
| telnyx-automation | "Automate Telnyx tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/telnyx-automation/SKILL.md` |
| teltel-automation | "Automate Teltel tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/teltel-automation/SKILL.md` |
| template-skill | Replace with description of the skill and when Claude should use it. | `.agents/skills/template-skill/SKILL.md` |
| templated-automation | "Automate Templated tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/templated-automation/SKILL.md` |
| test-app-automation | "Automate Test App tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/test-app-automation/SKILL.md` |
| text-to-pdf-automation | "Automate Text To PDF tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/text-to-pdf-automation/SKILL.md` |
| textcortex-automation | "Automate Textcortex tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/textcortex-automation/SKILL.md` |
| textit-automation | "Automate Textit tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/textit-automation/SKILL.md` |
| textrazor-automation | "Automate Textrazor tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/textrazor-automation/SKILL.md` |
| thanks-io-automation | "Automate Thanks IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/thanks-io-automation/SKILL.md` |
| the-odds-api-automation | "Automate The Odds API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/the-odds-api-automation/SKILL.md` |
| theme-factory | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly. | `.agents/skills/theme-factory/SKILL.md` |
| ticketmaster-automation | "Automate Ticketmaster tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ticketmaster-automation/SKILL.md` |
| ticktick-automation | "Automate Ticktick tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ticktick-automation/SKILL.md` |
| timecamp-automation | "Automate Timecamp tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/timecamp-automation/SKILL.md` |
| timekit-automation | "Automate Timekit tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/timekit-automation/SKILL.md` |
| timelinesai-automation | "Automate Timelinesai tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/timelinesai-automation/SKILL.md` |
| timelink-automation | "Automate Timelink tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/timelink-automation/SKILL.md` |
| timely-automation | "Automate Timely tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/timely-automation/SKILL.md` |
| tinyurl-automation | "Automate Tinyurl tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tinyurl-automation/SKILL.md` |
| tisane-automation | "Automate Tisane tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tisane-automation/SKILL.md` |
| Toggl Automation | "Automate time tracking workflows in Toggl Track -- create time entries, manage projects, clients, tags, and workspaces through natural language commands." | `.agents/skills/toggl-automation/SKILL.md` |
| token-metrics-automation | "Automate Token Metrics tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/token-metrics-automation/SKILL.md` |
| tomba-automation | "Automate Tomba tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tomba-automation/SKILL.md` |
| tomtom-automation | "Automate Tomtom tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tomtom-automation/SKILL.md` |
| toneden-automation | "Automate Toneden tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/toneden-automation/SKILL.md` |
| tpscheck-automation | "Automate Tpscheck tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tpscheck-automation/SKILL.md` |
| triggercmd-automation | "Automate Triggercmd tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/triggercmd-automation/SKILL.md` |
| tripadvisor-content-api-automation | "Automate TripAdvisor tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/tripadvisor-content-api-automation/SKILL.md` |
| turbot-pipes-automation | "Automate Turbot Pipes tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/turbot-pipes-automation/SKILL.md` |
| turso-automation | "Automate Turso tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/turso-automation/SKILL.md` |
| twelve-data-automation | "Automate Twelve Data tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/twelve-data-automation/SKILL.md` |
| twitch-automation | "Automate Twitch tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/twitch-automation/SKILL.md` |
| twitter-algorithm-optimizer | Analyze and optimize tweets for maximum reach using Twitter's open-source algorithm insights. Rewrite and edit user tweets to improve engagement and visibility based on how the recommendation system ranks content. | `.agents/skills/twitter-algorithm-optimizer/SKILL.md` |
| twocaptcha-automation | "Automate Twocaptcha tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/twocaptcha-automation/SKILL.md` |
| typefully-automation | "Automate Typefully tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/typefully-automation/SKILL.md` |
| typless-automation | "Automate Typless tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/typless-automation/SKILL.md` |
| u301-automation | "Automate U301 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/u301-automation/SKILL.md` |
| unione-automation | "Automate Unione tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/unione-automation/SKILL.md` |
| updown-io-automation | "Automate Updown IO tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/updown-io-automation/SKILL.md` |
| Uploadcare Automation | "Automate Uploadcare file management including listing, storing, inspecting, downloading, and organizing file groups through natural language commands" | `.agents/skills/uploadcare-automation/SKILL.md` |
| uptimerobot-automation | "Automate Uptimerobot tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/uptimerobot-automation/SKILL.md` |
| userlist-automation | "Automate Userlist tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/userlist-automation/SKILL.md` |
| v0-automation | "Automate V0 tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/v0-automation/SKILL.md` |
| venly-automation | "Automate Venly tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/venly-automation/SKILL.md` |
| veo-automation | "Automate Veo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/veo-automation/SKILL.md` |
| verifiedemail-automation | "Automate Verifiedemail tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/verifiedemail-automation/SKILL.md` |
| veriphone-automation | "Automate Veriphone tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/veriphone-automation/SKILL.md` |
| vero-automation | "Automate Vero tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/vero-automation/SKILL.md` |
| vestaboard-automation | "Automate Vestaboard tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/vestaboard-automation/SKILL.md` |
| virustotal-automation | "Automate Virustotal tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/virustotal-automation/SKILL.md` |
| visme-automation | "Automate Visme tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/visme-automation/SKILL.md` |
| waboxapp-automation | "Automate Waboxapp tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/waboxapp-automation/SKILL.md` |
| wachete-automation | "Automate Wachete tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/wachete-automation/SKILL.md` |
| waiverfile-automation | "Automate Waiverfile tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/waiverfile-automation/SKILL.md` |
| wakatime-automation | "Automate Wakatime tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/wakatime-automation/SKILL.md` |
| wati-automation | "Automate Wati tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/wati-automation/SKILL.md` |
| Wave Accounting Automation | "Wave Accounting toolkit is not currently available as a native integration. No Wave-specific tools were found in the Composio platform. This skill is a placeholder pending future integration." | `.agents/skills/wave-accounting-automation/SKILL.md` |
| wave_accounting-automation | "Automate Wave Accounting tasks via Rube MCP (Composio): invoices, customers, payments, and small business accounting. Always search tools first for current schemas." | `.agents/skills/wave_accounting-automation/SKILL.md` |
| weathermap-automation | "Automate Weathermap tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/weathermap-automation/SKILL.md` |
| webapp-testing | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs. | `.agents/skills/webapp-testing/SKILL.md` |
| Webex Automation | "Automate Cisco Webex messaging, rooms, teams, webhooks, and people management through natural language commands" | `.agents/skills/webex-automation/SKILL.md` |
| webscraping-ai-automation | "Automate Webscraping AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/webscraping-ai-automation/SKILL.md` |
| webvizio-automation | "Automate Webvizio tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/webvizio-automation/SKILL.md` |
| whautomate-automation | "Automate Whautomate tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/whautomate-automation/SKILL.md` |
| winston-ai-automation | "Automate Winston AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/winston-ai-automation/SKILL.md` |
| wit-ai-automation | "Automate Wit AI tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/wit-ai-automation/SKILL.md` |
| wiz-automation | "Automate Wiz tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/wiz-automation/SKILL.md` |
| wolfram-alpha-api-automation | "Automate Wolfram Alpha API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/wolfram-alpha-api-automation/SKILL.md` |
| woodpecker-co-automation | "Automate Woodpecker co tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/woodpecker-co-automation/SKILL.md` |
| workable-automation | "Automate Workable tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/workable-automation/SKILL.md` |
| Workday Automation | "Automate HR operations in Workday -- manage workers, time off requests, absence balances, and employee data through natural language commands." | `.agents/skills/workday-automation/SKILL.md` |
| workiom-automation | "Automate Workiom tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/workiom-automation/SKILL.md` |
| worksnaps-automation | "Automate Worksnaps tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/worksnaps-automation/SKILL.md` |
| writer-automation | "Automate Writer tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/writer-automation/SKILL.md` |
| Xero Automation | "Xero Automation: manage invoices, contacts, payments, bank transactions, and accounts in Xero for cloud-based bookkeeping" | `.agents/skills/xero-automation/SKILL.md` |
| xlsx | "Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization. When Claude needs to work with spreadsheets (.xlsx, .xlsm, .csv, .tsv, etc) for: (1) Creating new spreadsheets with formulas and formatting, (2) Reading or analyzing data, (3) Modify existing spreadsheets while preserving formulas, (4) Data analysis and visualization in spreadsheets, or (5) Recalculating formulas" | `.agents/skills/xlsx/SKILL.md` |
| y-gy-automation | "Automate Y Gy tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/y-gy-automation/SKILL.md` |
| yandex-automation | "Automate Yandex tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/yandex-automation/SKILL.md` |
| yelp-automation | "Automate Yelp tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/yelp-automation/SKILL.md` |
| ynab-automation | "Automate Ynab tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/ynab-automation/SKILL.md` |
| yousearch-automation | "Automate Yousearch tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/yousearch-automation/SKILL.md` |
| youtube-downloader | Download YouTube videos with customizable quality and format options. Use this skill when the user asks to download, save, or grab YouTube videos. Supports various quality settings (best, 1080p, 720p, 480p, 360p), multiple formats (mp4, webm, mkv), and audio-only downloads as MP3. | `.agents/skills/youtube-downloader/SKILL.md` |
| zenrows-automation | "Automate Zenrows tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zenrows-automation/SKILL.md` |
| zenserp-automation | "Automate Zenserp tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zenserp-automation/SKILL.md` |
| zeplin-automation | "Automate Zeplin tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zeplin-automation/SKILL.md` |
| zerobounce-automation | "Automate Zerobounce tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zerobounce-automation/SKILL.md` |
| zoho-automation | "Automate Zoho tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zoho-automation/SKILL.md` |
| zoho-bigin-automation | "Automate Zoho Bigin tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zoho-bigin-automation/SKILL.md` |
| Zoho Books Automation | "Automate Zoho Books accounting workflows including invoice creation, bill management, contact lookup, payment tracking, and multi-organization support through natural language commands" | `.agents/skills/zoho-books-automation/SKILL.md` |
| Zoho Desk Automation | "Zoho Desk automation via Rube MCP -- toolkit not currently available in Composio; no ZOHO_DESK_ tools found" | `.agents/skills/zoho-desk-automation/SKILL.md` |
| zoho-inventory-automation | "Automate Zoho Inventory tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zoho-inventory-automation/SKILL.md` |
| zoho-invoice-automation | "Automate Zoho Invoice tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zoho-invoice-automation/SKILL.md` |
| zoho-mail-automation | "Automate Zoho Mail tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zoho-mail-automation/SKILL.md` |
| zoho_bigin-automation | "Automate Zoho Bigin tasks via Rube MCP (Composio): pipelines, contacts, companies, products, and small business CRM. Always search tools first for current schemas." | `.agents/skills/zoho_bigin-automation/SKILL.md` |
| zoho_books-automation | "Automate Zoho Books tasks via Rube MCP (Composio): invoices, expenses, contacts, payments, and accounting. Always search tools first for current schemas." | `.agents/skills/zoho_books-automation/SKILL.md` |
| zoho_desk-automation | "Automate Zoho Desk tasks via Rube MCP (Composio): tickets, contacts, agents, departments, and help desk operations. Always search tools first for current schemas." | `.agents/skills/zoho_desk-automation/SKILL.md` |
| zoho_inventory-automation | "Automate Zoho Inventory tasks via Rube MCP (Composio): items, orders, warehouses, shipments, and stock management. Always search tools first for current schemas." | `.agents/skills/zoho_inventory-automation/SKILL.md` |
| zoho_invoice-automation | "Automate Zoho Invoice tasks via Rube MCP (Composio): invoices, estimates, expenses, clients, and payment tracking. Always search tools first for current schemas." | `.agents/skills/zoho_invoice-automation/SKILL.md` |
| zoho_mail-automation | "Automate Zoho Mail tasks via Rube MCP (Composio): email sending, folders, labels, and mailbox management. Always search tools first for current schemas." | `.agents/skills/zoho_mail-automation/SKILL.md` |
| zoominfo-automation | "Automate Zoominfo tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zoominfo-automation/SKILL.md` |
| zylvie-automation | "Automate Zylvie tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zylvie-automation/SKILL.md` |
| zyte-api-automation | "Automate Zyte API tasks via Rube MCP (Composio). Always search tools first for current schemas." | `.agents/skills/zyte-api-automation/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
