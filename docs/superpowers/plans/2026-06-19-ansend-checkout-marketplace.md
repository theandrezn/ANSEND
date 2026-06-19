# ANSEND Checkout Marketplace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the ANSEND checkout and Pix result as a compact premium marketplace flow without changing payment integration or pricing behavior.

**Architecture:** Keep the existing vanilla JavaScript rendering and event delegation, adding focused markup helpers inside `script.js` and checkout-scoped component classes in `styles.css`. Extend the existing static integration test before implementation, then validate generated markup in Playwright across the required viewports.

**Tech Stack:** Vanilla JavaScript, CSS, Lucide icons, Mercado Pago checkout API, Supabase-backed worker, Node assertion tests, Playwright.

---

### Task 1: Lock The Marketplace Checkout Contract

**Files:**
- Modify: `tests/mercado-pago-checkout-check.js`

- [ ] Add assertions for `checkout-license-bar`, `checkout-product-list`, `checkout-product-row`, `checkout-processor-note`, `checkout-recommendations`, `recommended-beat-card`, and the compact `minmax(0, 1fr) 360px` desktop grid.
- [ ] Run `node tests/mercado-pago-checkout-check.js` and confirm it fails on the first missing marketplace class.
- [ ] Keep the test focused on stable semantics and required interaction hooks, not exact HTML ordering.

### Task 2: Build Reusable Checkout Markup

**Files:**
- Modify: `script.js` around `checkoutFormMarkup` and `renderMercadoPagoPixCheckout`
- Test: `tests/mercado-pago-checkout-check.js`

- [ ] Add small pure markup helpers for the header, license bar, payment selector, processor note, summary totals, and recommendations.
- [ ] Update `checkoutFormMarkup` to render the title outside panels, horizontal products, compact payment choices, labelled buyer fields, terms, security notice, sticky summary, and recommendations.
- [ ] Render recommendation cards from the existing beat collection only, excluding current cart IDs when available; use lazy image loading and existing add-to-cart actions.
- [ ] Keep `data-is-cart`, `data-cart-items`, submit handling, coupon surface, terms links, and all dynamic cent values unchanged.
- [ ] Update `renderMercadoPagoPixCheckout` to share the header, product list, processor note, summary, and recommendation visual language while preserving QR, copy, and verification actions.
- [ ] Run the checkout test and confirm it passes.

### Task 3: Implement Compact Scoped Styling

**Files:**
- Modify: `styles.css` in the final checkout override section
- Test: `tests/mercado-pago-checkout-check.js`

- [ ] Define checkout-only tokens for `#05070a`, `#0b111a`, `#101722`, `#131d2a`, `#1685ff`, text hierarchy, borders, radii, and motion.
- [ ] Style the 60px header, centered 1280px shell, `minmax(0, 1fr) 360px` grid, horizontal product rows, compact methods, 48px inputs, sticky summary, and recommendation rail.
- [ ] Add desktop, tablet, mobile, and 375px safeguards with no page-level horizontal overflow.
- [ ] Add explicit hover, focus-visible, active, disabled, loading, error, approved, and pending states.
- [ ] Preserve `prefers-reduced-motion` and minimum 44px action targets.
- [ ] Run the checkout test and confirm it passes.

### Task 4: Browser Verification

**Files:**
- Create: `tests/checkout-marketplace-desktop.png`
- Create: `tests/checkout-marketplace-tablet.png`
- Create: `tests/checkout-marketplace-mobile.png`
- Create: `tests/checkout-marketplace-pix.png`

- [ ] Run the app locally and render realistic checkout and Pix payloads through the existing functions.
- [ ] Validate widths 1440, 1024, 768, 430, and 375 for viewport overflow, image failures, console errors, sticky behavior, and readable truncation.
- [ ] Verify native form validity before and after accepting terms, disabled methods, duplicate-submit protection, copy feedback, and Pix verification controls.
- [ ] Capture the four representative screenshots and visually inspect them.

### Task 5: Regression, Build, And Delivery

**Files:**
- Modify: `dist/index.html`
- Modify: `dist/script.js`
- Modify: `dist/styles.css`

- [ ] Run `node tests/mercado-pago-checkout-check.js` and require exit code 0.
- [ ] Run `npm.cmd run test:routes` and require all 12 routes stable.
- [ ] Run `npm.cmd run build` and require exit code 0.
- [ ] Check `package.json` for lint/typecheck scripts and run them if present.
- [ ] Review `git diff --check` and ensure unrelated local files remain unstaged.
- [ ] Commit source, tests, generated assets, and `dist/`, deploy with `npm.cmd run deploy`, commit the generated build ID, then push `main`.
