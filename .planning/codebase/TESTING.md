# Testing Patterns

**Analysis Date:** 2026-06-22

## Test Framework

**Runner:**
- No umbrella test framework is configured.
- Tests are standalone Node scripts invoked by named `package.json` commands.
- Playwright supplies Chromium for browser and responsive checks.
- Pure modules use Node's `assert` APIs or manual assertions.

**Run Commands:**
```bash
npm run test:routes
npm run test:auth-focus
npm run test:auth-multi-tab
npm run test:responsive
npm run test:nexo
npm run test:data-boundaries
```

There is no single `npm test` command. Select the focused scripts affected by a change, then run `npm run build` for deployment-sensitive work.

## Test File Organization

- Tests live in a flat `tests/` directory.
- Naming is `{feature}-check.js` or `{feature}-check.mjs`.
- The repository currently contains 82 top-level test files.
- About 26 files use Playwright and about 53 inspect source/schema files directly.
- Visual artifacts live under `tests/responsive-screenshots/`.

## Test Types

**Static contract checks:**
- Read `script.js`, CSS, HTML, Worker, or SQL as text and assert required/forbidden patterns.
- Examples: `tests/data-boundary-check.js`, `tests/auth-architecture-check.js`, and `tests/storage-upload-architecture-check.js`.
- Fast and valuable for architectural invariants, but do not prove runtime behavior.

**Browser smoke/regression checks:**
- Start a small local static HTTP server, launch headless Chromium, navigate hash routes, and capture console/page errors.
- Example: `tests/route-stability-check.js`.
- Responsive checks exercise multiple viewports and optionally save screenshots/reports.

**Pure module tests:**
- Import `.mjs` modules directly and assert deterministic outputs.
- Example: `tests/nexo-v2-core-check.mjs` covers intent classification, ranking, normalization, and route resolution.

**Focused interaction checks:**
- Exercise auth focus, multi-tab session behavior, player controls, uploads, chat focus, onboarding, and checkout layout through purpose-built scripts.

## Common Structure

```javascript
const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  try {
    // arrange local server/page
    // act through browser or inspect source
    // collect explicit contract failures
  } finally {
    await browser.close();
  }
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

## Mocking and Fixtures

- There is no shared mocking framework.
- Browser tests often serve source files with a local Node `http` server.
- Network behavior is controlled with Playwright routing or by allowing configured public requests, depending on the test.
- Static checks treat source strings and SQL files as fixtures.
- Visual tests use screenshots and JSON reports under `tests/responsive-screenshots/`.
- Test data is generally inline and feature-specific rather than produced by shared factories.

## Coverage

- No line/branch coverage tool or threshold is configured.
- Coverage is contract-based: each known regression gets a dedicated script.
- `package.json` exposes many focused commands but no CI configuration was found in the repository root.

## Adding Tests

- Add `tests/{feature}-check.js` and a descriptive `test:{feature}` script to `package.json`.
- Use direct module assertions for extracted pure logic.
- Use source-contract checks only for structural/security invariants that are hard to exercise locally.
- Use Playwright for DOM, focus, navigation, responsive, player, and async rendering behavior.
- For Supabase/RLS/payment changes, supplement static checks with live integration verification when credentials and a safe environment are available.
- Ensure servers, pages, and browsers close in `finally` blocks to avoid stuck processes.

## Important Gaps

- No consolidated test command guarantees the complete suite is run.
- No measured code coverage exists.
- Many checks validate text patterns rather than executing Worker handlers or a real database.
- Payment webhook, entitlement, service-role boundaries, and full authenticated multi-user flows need stronger integration coverage.
- The very large `script.js` makes isolated unit testing difficult; extracted modules such as `src/nexo/nexo-v2-core.mjs` are the preferred pattern for new deterministic logic.

---

*Testing analysis: 2026-06-22*
*Update when the runner, CI, or integration-test strategy changes*
