const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const css = fs.readFileSync(path.join(root, "checkout", "checkout.css"), "utf8");
  const js = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");

  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><main id="app"></main></body></html>`);
  await page.addScriptTag({ content: js });
  await page.evaluate(() => {
    window.__cardFormConfigs = [];
    window.fetch = async (url) => {
      const href = String(url);
      if (href.includes("/api/checkout/config")) {
        return new Response(JSON.stringify({ success: true, public_key: "TEST-PUBLIC-KEY", supported_methods: ["pix", "card"] }), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (href.includes("/api/checkout/quote")) {
        return new Response(JSON.stringify({ success: true, quote: { subtotal_cents: 9990, service_fee_cents: 1199, discount_cents: 0, total_cents: 11189 } }), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    };
    window.MercadoPago = function MercadoPago() {
      return {
        cardForm(config) {
          window.__cardFormConfigs.push(config);
          queueMicrotask(() => config.callbacks.onFormMounted());
          return {
            getCardFormData() { return { token: "tok", paymentMethodId: "visa", issuerId: "issuer", installments: "3" }; },
            unmount() { window.__unmounted = (window.__unmounted || 0) + 1; },
            destroy() { window.__destroyed = (window.__destroyed || 0) + 1; },
          };
        },
      };
    };
  });

  async function mountCheckout() {
    await page.evaluate(async () => {
      await window.AnsendCheckout.open({
        mountTarget: document.querySelector("#app"),
        quote: { subtotalCents: 9990, serviceFeeCents: 1199, discountCents: 0, totalCents: 11189 },
        items: [{ beatId: "beat", cartId: "cart", title: "Beat", producer: "ANSEND", licenseName: "Premium", formats: "MP3, WAV", priceCents: 9990 }],
        cartItems: [{ beat_id: "beat", license_id: "premium" }],
        refreshIcons() {},
      });
    });
    await page.waitForFunction(() => window.__cardFormConfigs.length > 0);
    await page.click('[data-checkout-method="card"]');
  }

  await mountCheckout();

  const loadingDuringOverlap = await page.evaluate(async () => {
    const callbacks = window.__cardFormConfigs[0].callbacks;
    const doneA = callbacks.onFetching("installments");
    const doneB = callbacks.onFetching("issuer");
    const provider = document.querySelector("[data-checkout-provider-installments]");
    provider.innerHTML = "";
    provider.append(new Option("Selecione", ""));
    provider.append(new Option("1 parcela de R$ 111,89 sem juros", "1"));
    provider.append(new Option("3 parcelas de R$ 41,20 (R$ 123,60)", "3"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    const trigger = document.querySelector("[data-checkout-installment-trigger]");
    const during = { disabled: trigger.disabled, text: trigger.textContent };
    doneA();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const afterOne = { disabled: trigger.disabled, text: trigger.textContent };
    doneB();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const afterAll = { disabled: trigger.disabled, text: trigger.textContent };
    return { during, afterOne, afterAll };
  });

  assert.deepStrictEqual(loadingDuringOverlap.during, { disabled: true, text: "Calculando parcelas no Mercado Pago…" });
  assert.deepStrictEqual(loadingDuringOverlap.afterOne, { disabled: true, text: "Calculando parcelas no Mercado Pago…" });
  assert.strictEqual(loadingDuringOverlap.afterAll.disabled, false);
  assert.match(loadingDuringOverlap.afterAll.text, /Selecione|1x de R\$ 111,89/);

  await page.click("[data-checkout-installment-trigger]");
  await page.click('[data-checkout-installment-value="3"]');

  const selection = await page.evaluate(() => ({
    providerValue: document.querySelector("[data-checkout-provider-installments]").value,
    triggerText: document.querySelector("[data-checkout-installment-trigger]").textContent,
    closed: document.querySelector("[data-checkout-installment-popover]").hidden,
  }));
  assert.deepStrictEqual(selection, { providerValue: "3", triggerText: "3x de R$ 41,20 — total R$ 123,60", closed: true });

  await page.click("[data-checkout-installment-trigger]");
  await page.mouse.click(4, 4);
  assert.strictEqual(await page.locator("[data-checkout-installment-popover]").evaluate((node) => node.hidden), true, "outside pointer must close popover");

  const staleResult = await page.evaluate(async () => {
    const staleCallbacks = window.__cardFormConfigs[0].callbacks;
    await window.AnsendCheckout.open({
      mountTarget: document.querySelector("#app"),
      quote: { subtotalCents: 9990, serviceFeeCents: 1199, discountCents: 0, totalCents: 11189 },
      items: [{ beatId: "beat", cartId: "cart", title: "Beat", producer: "ANSEND", licenseName: "Premium", formats: "MP3, WAV", priceCents: 9990 }],
      cartItems: [{ beat_id: "beat", license_id: "premium" }],
      refreshIcons() {},
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    staleCallbacks.onFormMounted(new Error("old checkout error"));
    return {
      feedback: document.querySelector("[data-checkout-feedback]").textContent,
      unmounted: window.__unmounted || 0,
      destroyed: window.__destroyed || 0,
    };
  });

  assert.strictEqual(staleResult.feedback, "", "stale CardForm callback must not mutate the new checkout");
  assert.ok(staleResult.unmounted >= 1, "teardown should unmount old CardForm when available");
  assert.ok(staleResult.destroyed >= 1, "teardown should destroy old CardForm when available");

  await browser.close();
  console.log("mercado-pago-installment-selector-runtime-check: ok");
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
