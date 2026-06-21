# Checkout Payment Column High-Fidelity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild only the checkout payment column to match the approved reference while keeping Card and Pix real, exposing disabled future methods, hiding issuer selection, and showing provider-calculated installment values over the ANSEND total.

**Architecture:** Keep the existing vanilla SPA and `window.AnsendCheckout` module. MercadoPago.js continues owning the secure fields and hidden issuer/installment selects; a small vanilla presentation adapter mirrors provider-generated installment options into an accessible styled listbox without recalculating interest or creating payment state.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, MercadoPago.js V2 CardForm, Node contract tests, Playwright screenshots, existing Cloudflare Workers build/deploy.

---

## File map

- Modify `checkout/checkout.js`: payment-method markup, hidden provider controls, installment presentation adapter, CardForm lifecycle cleanup.
- Modify `checkout/checkout.css`: exact payment-column geometry, disabled method states, hidden provider fields, styled installment listbox.
- Modify `tests/checkout-payment-column-reference-check.js`: structural and visual contract for approved Option C.
- Create `tests/mercado-pago-installment-selector-check.js`: formatting, synchronization, provider-source, and issuer-hiding regression contract.
- Modify `scripts/render-checkout-reference.js`: deterministic Card and Pix captures plus geometry measurements.
- Modify `CHECKOUT-UI-REVIEW.md`: final six-pillar audit evidence.
- Generate `dist/checkout/checkout.js`, `dist/checkout/checkout.css`, and `dist/index.html` with the existing build.
- Generate `tests/checkout-payment-card-1920.png` and `tests/checkout-payment-pix-1920.png` from Playwright.

### Task 1: Lock the Option C markup and visual geometry

**Files:**
- Modify: `tests/checkout-payment-column-reference-check.js`
- Test: `tests/checkout-payment-column-reference-check.js`

- [ ] **Step 1: Add the failing Option C contract**

Replace the method and geometry assertions with checks that require three top controls, five method tiles, disabled future methods, a 360px form, and the exact reference dimensions:

```js
for (const marker of [
  'data-checkout-method="card"',
  'data-checkout-method="pix"',
  'data-checkout-unavailable="paypal"',
  'data-checkout-unavailable="apple-pay"',
  'data-checkout-unavailable="google-pay"',
  'data-checkout-unavailable="alipay"',
  'disabled aria-disabled="true"',
]) assert(checkout.includes(marker), `Approved payment method is missing: ${marker}`);

assert(/\.ansend-checkout__tabs\s*\{[^}]*min-height:\s*40px;/s.test(css), "Top selector must use the 40px reference height");
assert(/\.ansend-checkout__methods button\s*\{[^}]*min-height:\s*58px;/s.test(css), "Method tiles must use the 58px reference height");
```

- [ ] **Step 2: Run the contract and verify the expected failure**

Run:

```powershell
node tests/checkout-payment-column-reference-check.js
```

Expected: FAIL on the first missing `data-checkout-unavailable` marker or the existing `380px` form width.

- [ ] **Step 3: Commit the red contract**

```powershell
git add tests/checkout-payment-column-reference-check.js
git commit -m "test: define checkout payment reference contract"
```

### Task 2: Rebuild the payment-method selectors without fake integrations

**Files:**
- Modify: `checkout/checkout.js:124-132`
- Modify: `checkout/checkout.css:88-95`
- Test: `tests/checkout-payment-column-reference-check.js`

- [ ] **Step 1: Replace only the right-column method markup**

Use the existing `data-checkout-method` only on Card and Pix. Render unavailable methods as native disabled buttons with no payment handler marker:

```js
function unavailableMethodMarkup(id, label, logo = "") {
  return `<button type="button" class="ansend-checkout__method is-unavailable" data-checkout-unavailable="${id}" disabled aria-disabled="true" title="${label} — em breve">
    ${logo ? `<img src="${logo}" alt="">` : icon("wallet-cards")}
    <span>${label}</span>
    <small>Em breve</small>
  </button>`;
}
```

Top selector:

```js
<div class="ansend-checkout__tabs" role="tablist" aria-label="Forma de pagamento">
  <button type="button" data-checkout-method="card" role="tab" aria-selected="false">Cartão</button>
  <button type="button" class="is-active" data-checkout-method="pix" role="tab" aria-selected="true">Pix</button>
  <button type="button" data-checkout-unavailable="paypal" disabled aria-disabled="true">PayPal</button>
</div>
```

Method grid:

```js
<div class="ansend-checkout__methods" aria-label="Métodos disponíveis">
  <button type="button" data-checkout-method="card" aria-pressed="false">${icon("credit-card")}<span>Cartão</span></button>
  <button type="button" class="is-active" data-checkout-method="pix" aria-pressed="true"><img src="assets/payment/pix-user.png" alt=""><span>Pix</span></button>
  ${unavailableMethodMarkup("apple-pay", "Apple Pay")}
  ${unavailableMethodMarkup("google-pay", "Google Pay")}
  ${unavailableMethodMarkup("alipay", "Alipay")}
</div>
```

- [ ] **Step 2: Apply minimal selector styling**

Set the top grid to three columns and the method grid to five columns. Disabled methods must not react to hover:

```css
.ansend-checkout__tabs { min-height: 40px; grid-template-columns: repeat(3, minmax(0, 1fr)); border-radius: 6px; }
.ansend-checkout__methods { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.ansend-checkout__methods button { min-width: 0; min-height: 58px; padding: 7px; border-radius: 6px; }
.ansend-checkout__methods .is-unavailable,
.ansend-checkout__tabs [disabled] { opacity: .42; cursor: not-allowed; box-shadow: none; }
.ansend-checkout__methods .is-unavailable small { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
```

- [ ] **Step 3: Run the markup contract**

Run:

```powershell
node tests/checkout-payment-column-reference-check.js
```

Expected: PASS. The approved method names, disabled semantics, 40px tabs, and 58px tiles are present.

- [ ] **Step 4: Commit the method selector**

```powershell
git add checkout/checkout.js checkout/checkout.css
git commit -m "feat: add approved checkout payment methods"
```

### Task 3: Hide issuer and mirror real Mercado Pago installments

**Files:**
- Create: `tests/mercado-pago-installment-selector-check.js`
- Modify: `checkout/checkout.js:19-31,73-87,282-343`
- Modify: `checkout/checkout.css:95-170`
- Test: `tests/mercado-pago-installment-selector-check.js`

- [ ] **Step 1: Write the failing installment adapter test**

Create a dependency-free Node test that imports the checkout API and verifies provider messages are normalized without calculating new values:

```js
const checkout = require("../checkout/checkout.js");

assert.deepStrictEqual(
  checkout.parseProviderInstallmentLabel("3 parcelas de R$ 41,20 (R$ 123,60)"),
  { installments: 3, installmentAmount: "R$ 41,20", totalAmount: "R$ 123,60", interestFree: false }
);

assert.deepStrictEqual(
  checkout.parseProviderInstallmentLabel("1 parcela de R$ 111,89 sem juros"),
  { installments: 1, installmentAmount: "R$ 111,89", totalAmount: "", interestFree: true }
);

assert.strictEqual(
  checkout.formatProviderInstallmentLabel({ installments: 3, installmentAmount: "R$ 41,20", totalAmount: "R$ 123,60", interestFree: false }),
  "3x de R$ 41,20 — total R$ 123,60"
);

assert.strictEqual(
  checkout.formatProviderInstallmentLabel({ installments: 1, installmentAmount: "R$ 111,89", totalAmount: "", interestFree: true }),
  "1x de R$ 111,89 — sem juros"
);
```

Also read `checkout/checkout.js` as text and require these lifecycle markers:

```js
for (const marker of [
  "MutationObserver",
  "syncInstallmentSelector",
  "disconnectInstallmentObserver",
  "data-checkout-provider-issuer",
  "data-checkout-provider-installments",
  "dispatchEvent(new Event(\"change\", { bubbles: true }))",
]) assert(source.includes(marker), `Installment adapter marker missing: ${marker}`);
```

- [ ] **Step 2: Run the new test and verify the expected failure**

Run:

```powershell
node tests/mercado-pago-installment-selector-check.js
```

Expected: FAIL because `parseProviderInstallmentLabel` is not exported.

- [ ] **Step 3: Replace the visible issuer/installment fields**

Keep provider fields mounted but visually hidden. Render one full-width presentation control:

```js
<div class="ansend-checkout__provider-fields" aria-hidden="true">
  <select id="${ids.issuer}" data-checkout-provider-issuer tabindex="-1"><option value="">Detectado pelo cartão</option></select>
  <select id="${ids.installments}" data-checkout-provider-installments tabindex="-1"><option value="">Selecione</option></select>
</div>
<div class="ansend-checkout__field ansend-checkout__installments">
  <span id="checkout-installments-label">Parcelas</span>
  <button type="button" data-checkout-installment-trigger aria-labelledby="checkout-installments-label" aria-haspopup="listbox" aria-expanded="false" disabled>Digite o cartão para calcular</button>
  <div class="ansend-checkout__installment-popover" data-checkout-installment-popover hidden>
    <div role="listbox" data-checkout-installment-list aria-labelledby="checkout-installments-label"></div>
  </div>
</div>
```

- [ ] **Step 4: Add pure provider-label helpers**

Implement helpers that only transform text already returned by Mercado Pago:

```js
function parseProviderInstallmentLabel(label) {
  const text = String(label || "").replace(/\s+/g, " ").trim();
  const installments = Number(text.match(/(\d+)\s*(?:x|parcela)/i)?.[1] || 0);
  const amounts = text.match(/R\$\s*[\d.]+,\d{2}/g) || [];
  return {
    installments,
    installmentAmount: amounts[0] || "",
    totalAmount: amounts[1] || "",
    interestFree: /sem\s+juros/i.test(text),
  };
}

function formatProviderInstallmentLabel(option) {
  if (!option.installments || !option.installmentAmount) return "";
  if (option.interestFree) return `${option.installments}x de ${option.installmentAmount} — sem juros`;
  if (option.totalAmount) return `${option.installments}x de ${option.installmentAmount} — total ${option.totalAmount}`;
  return `${option.installments}x de ${option.installmentAmount}`;
}
```

- [ ] **Step 5: Add synchronization and cleanup**

Mirror each non-empty provider option into a listbox button. Preserve its original text as fallback and dispatch change on the provider select:

```js
function syncInstallmentSelector() {
  const provider = active?.root?.querySelector("[data-checkout-provider-installments]");
  const trigger = active?.root?.querySelector("[data-checkout-installment-trigger]");
  const list = active?.root?.querySelector("[data-checkout-installment-list]");
  if (!provider || !trigger || !list) return;
  const options = [...provider.options].filter((option) => option.value);
  trigger.disabled = options.length === 0;
  trigger.textContent = options.length ? "Selecione as parcelas" : "Digite o cartão para calcular";
  list.innerHTML = options.map((option) => {
    const parsed = parseProviderInstallmentLabel(option.textContent);
    const label = formatProviderInstallmentLabel(parsed) || option.textContent.trim();
    return `<button type="button" role="option" data-checkout-installment-value="${escapeHtml(option.value)}">${escapeHtml(label)}</button>`;
  }).join("");
}

function observeInstallmentOptions() {
  disconnectInstallmentObserver();
  const provider = active?.root?.querySelector("[data-checkout-provider-installments]");
  if (!provider) return;
  active.installmentObserver = new MutationObserver(syncInstallmentSelector);
  active.installmentObserver.observe(provider, { childList: true, subtree: true, characterData: true });
  syncInstallmentSelector();
}

function disconnectInstallmentObserver() {
  active?.installmentObserver?.disconnect();
  if (active) active.installmentObserver = null;
}
```

In `bind()`, handle trigger, option selection, outside click, Escape, and Arrow keys. Selection must set `provider.value`, dispatch the provider change event, update `aria-selected`, close the popover, and put the exact formatted label on the trigger.

- [ ] **Step 6: Keep the hidden issuer in CardForm**

Update the CardForm IDs without exposing the issuer:

```js
issuer: { id: active.formIds.issuer, placeholder: "Detectado pelo cartão" },
installments: { id: active.formIds.installments },
```

Call `observeInstallmentOptions()` in `onFormMounted` after a successful mount and again after `refreshCardFormForQuote()`. Call `disconnectInstallmentObserver()` before cloning/replacing provider fields and before replacing an active checkout instance.

- [ ] **Step 7: Style the closed selector and listbox**

```css
.ansend-checkout__provider-fields { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
.ansend-checkout__installments { position: relative; }
.ansend-checkout__installments > button { width: 100%; height: 42px; padding: 0 34px 0 10px; border: 1px solid #292c30; border-radius: 5px; color: #f5f5f5; background: #121416; text-align: left; font-size: 11px; }
.ansend-checkout__installment-popover { position: absolute; z-index: 20; top: calc(100% + 5px); left: 0; right: 0; padding: 4px; border: 1px solid #292c30; border-radius: 6px; background: #151719; box-shadow: 0 12px 28px rgba(0,0,0,.38); }
.ansend-checkout__installment-popover [role="option"] { width: 100%; min-height: 38px; padding: 7px 9px; border: 0; border-radius: 4px; color: #dfe2e6; background: transparent; text-align: left; font-size: 10px; }
.ansend-checkout__installment-popover [role="option"]:hover,
.ansend-checkout__installment-popover [aria-selected="true"] { background: #24272a; }
```

- [ ] **Step 8: Run the installment test and full CardForm contract**

Run:

```powershell
node tests/mercado-pago-installment-selector-check.js
node tests/mercado-pago-cardform-dynamic-check.js
node tests/mercado-pago-checkout-check.js
```

Expected: all three PASS.

- [ ] **Step 9: Commit the installment adapter**

```powershell
git add checkout/checkout.js checkout/checkout.css tests/mercado-pago-installment-selector-check.js
git commit -m "feat: show real Mercado Pago installment totals"
```

### Task 4: Match the reference fields and CTA pixel geometry

**Files:**
- Modify: `checkout/checkout.js:73-102,124-137`
- Modify: `checkout/checkout.css:41-213`
- Test: `tests/checkout-payment-column-reference-check.js`

- [ ] **Step 1: Add the failing field and CTA geometry contract**

Append these assertions to `tests/checkout-payment-column-reference-check.js`:

```js
assert(!checkout.includes(">Banco emissor<"), "Issuer must not be visible to the buyer");
assert(checkout.includes("data-checkout-provider-issuer"), "Hidden provider issuer must remain mounted");
assert(checkout.includes("data-checkout-provider-installments"), "Provider installment select must remain mounted");
assert(checkout.includes("data-checkout-installment-trigger"), "Styled installment trigger is missing");
assert(checkout.includes('role="listbox"'), "Styled installment options must expose listbox semantics");
assert(/\.ansend-checkout__form,\s*\.ansend-checkout__result\s*\{[^}]*max-width:\s*360px;[^}]*flex:\s*0 1 360px;/s.test(css), "Payment form must use the approved 360px width");
assert(/\.ansend-checkout__pay[^}]*height:\s*42px;/s.test(css), "CTA must use the 42px reference height");
```

- [ ] **Step 2: Run the contract and verify the expected failure**

```powershell
node tests/checkout-payment-column-reference-check.js
```

Expected: FAIL on the existing 380px form width or 46px CTA.

- [ ] **Step 3: Apply the approved form structure**

Keep Card fields in this order: email, secure card number, expiration/CVV pair, cardholder name, CPF/CNPJ, styled installments, terms, totals, CTA, footer. Keep Pix fields as email, name, CPF/phone pair, compact information block. Do not add address, city, state, country, or ZIP fields.

- [ ] **Step 4: Apply exact scoped geometry**

```css
.ansend-checkout__payment { padding: 24px; align-items: center; justify-content: center; background: #111314; }
.ansend-checkout__form,
.ansend-checkout__result { width: 100%; max-width: 360px; flex: 0 1 360px; gap: 9px; }
.ansend-checkout__field { gap: 5px; color: #aeb2b8; font-size: 10px; line-height: 1.3; }
.ansend-checkout__field input,
.ansend-checkout__field select,
.ansend-checkout__secure-field { height: 40px; min-height: 40px; padding-inline: 10px; border: 1px solid #292c30; border-radius: 5px; background: #121416; font-size: 11px; }
.ansend-checkout__field-pair { gap: 8px; }
.ansend-checkout__terms { margin-top: 1px; font-size: 8px; line-height: 1.4; }
.ansend-checkout__terms input { width: 13px; height: 13px; }
.ansend-checkout__totals.is-compact { margin-top: 14px; gap: 10px; }
.ansend-checkout__totals.is-compact > div { font-size: 10px; }
.ansend-checkout__totals.is-compact .is-total { font-size: 12px; }
.ansend-checkout__totals.is-compact .is-total strong { font-size: 14px; }
.ansend-checkout__pay { height: 42px; min-height: 42px; border-radius: 5px; background: #2f7fff; font-size: 11px; }
.ansend-checkout__form footer { margin-top: 2px; font-size: 8px; }
```

- [ ] **Step 5: Preserve mobile ergonomics without changing desktop**

Below 420px, reduce method gaps to 4px and tile padding to 5px. Below 390px, stack only `.ansend-checkout__field-pair`; keep the method grid in five columns with labels abbreviated visually but full `aria-label` values.

- [ ] **Step 6: Run the visual contract**

Run:

```powershell
node tests/checkout-payment-column-reference-check.js
node tests/checkout-pixel-perfect-check.js
node tests/checkout-render-check.js
```

Expected: all PASS.

- [ ] **Step 7: Commit the reference styling**

```powershell
git add checkout/checkout.js checkout/checkout.css tests/checkout-payment-column-reference-check.js
git commit -m "style: match checkout payment reference"
```

### Task 5: Capture and compare Card and Pix at required viewports

**Files:**
- Modify: `scripts/render-checkout-reference.js`
- Modify: `CHECKOUT-UI-REVIEW.md`
- Generate: `tests/checkout-payment-card-1920.png`
- Generate: `tests/checkout-payment-pix-1920.png`

- [ ] **Step 1: Extend Playwright metrics**

Measure and assert:

```js
formWidth: form.getBoundingClientRect().width,
tabsHeight: tabs.getBoundingClientRect().height,
methodHeight: method.getBoundingClientRect().height,
inputHeight: visibleInput.getBoundingClientRect().height,
ctaHeight: submit.getBoundingClientRect().height,
paymentOverflow: payment.scrollWidth > payment.clientWidth,
```

Expected desktop values: form `360`, tabs `40`, methods `58`, inputs `40–42`, CTA `42`, overflow `false`.

- [ ] **Step 2: Capture both states**

Render Pix first, save `tests/checkout-payment-pix-1920.png`, switch to Card using the real `setPaymentMethod("card")` path in the fixture, populate deterministic provider options, open/close the installment selector, and save `tests/checkout-payment-card-1920.png`.

- [ ] **Step 3: Run screenshot generation**

```powershell
node scripts/render-checkout-reference.js
```

Expected: exit 0 for 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, and 390×844; no horizontal overflow.

- [ ] **Step 4: Compare in the visual companion**

Copy the new 1920 Card capture into the active companion session and create a new side-by-side screen against `reference-exact.png`. Correct measurable discrepancies in width, vertical rhythm, font size, borders, radius, selector proportions, and CTA position. Regenerate until no material discrepancy remains.

- [ ] **Step 5: Update the UI review**

Record final 1–4 scores and screenshot evidence for Copywriting, Visuals, Color, Typography, Spacing, and Experience Design in `CHECKOUT-UI-REVIEW.md`.

- [ ] **Step 6: Commit visual evidence**

```powershell
git add scripts/render-checkout-reference.js CHECKOUT-UI-REVIEW.md tests/checkout-payment-card-1920.png tests/checkout-payment-pix-1920.png
git commit -m "test: verify checkout payment visual fidelity"
```

### Task 6: Run full regression, build, deploy, and verify production

**Files:**
- Generate: `dist/checkout/checkout.js`
- Generate: `dist/checkout/checkout.css`
- Generate: `dist/index.html`

- [ ] **Step 1: Run the complete checkout suite**

```powershell
node tests/checkout-payment-column-reference-check.js
node tests/mercado-pago-installment-selector-check.js
node tests/checkout-pixel-perfect-check.js
node tests/checkout-render-check.js
node tests/checkout-pricing-check.mjs
node tests/checkout-database-contract-check.js
node tests/mercado-pago-checkout-check.js
node tests/mercado-pago-cardform-dynamic-check.js
node tests/mercado-pago-provider-idempotency-check.js
node tests/mercado-pago-webhook-replay-check.mjs
node tests/mercado-pago-webhook-topic-check.mjs
node tests/utf8-mojibake-check.js
```

Expected: every command exits 0 with no failing contract.

- [ ] **Step 2: Run build and whitespace validation**

```powershell
npm.cmd run build
git diff --check
```

Expected: build reports `Cloudflare Workers assets build ready` and `git diff --check` produces no errors.

- [ ] **Step 3: Commit generated assets**

```powershell
git add dist/checkout/checkout.js dist/checkout/checkout.css dist/index.html
git commit -m "build: publish checkout payment redesign"
```

- [ ] **Step 4: Push branch and main**

```powershell
git push origin HEAD:codex/checkout-pixel-perfect HEAD:main
```

Expected: both refs update to the new commit.

- [ ] **Step 5: Deploy Cloudflare**

```powershell
npm.cmd run deploy
```

Expected: Wrangler reports a new Version ID and uploads the checkout assets.

- [ ] **Step 6: Verify live configuration and CSS**

```powershell
curl.exe -fsSL https://ansendmusic.site/api/checkout/config
$css = curl.exe -fsSL "https://ansendmusic.site/checkout/checkout.css?verify=$((git rev-parse --short HEAD))"
if (($css -join "`n") -notmatch "max-width:\s*360px") { throw "Live checkout CSS is stale" }
```

Expected config: `supported_methods` contains `pix` and `card`; live CSS contains the 360px form contract.

- [ ] **Step 7: Record deployed build ID if build changed it**

```powershell
git add dist/index.html
git commit -m "chore: record checkout redesign build"
git push origin HEAD:codex/checkout-pixel-perfect HEAD:main
```

Expected: clean working tree and remote refs at the final build-record commit.
