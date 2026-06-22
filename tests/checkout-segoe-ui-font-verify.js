const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");

(async () => {
  console.log("Starting Playwright verification for Segoe UI font...");
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
            unmount() {},
            destroy() {},
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
  }

  await mountCheckout();

  // Verify computed font family of various elements in the checkout form
  const typography = await page.evaluate(() => {
    const elCheckout = document.querySelector(".ansend-checkout");
    const elTrigger = document.querySelector("[data-checkout-installment-trigger]");
    const elInput = document.querySelector('[name="pix_email"]');
    const elPayBtn = document.querySelector("[data-checkout-submit]");
    const elMethodBtn = document.querySelector('[data-checkout-method="card"]');

    return {
      checkout: getComputedStyle(elCheckout).fontFamily,
      trigger: getComputedStyle(elTrigger).fontFamily,
      input: getComputedStyle(elInput).fontFamily,
      payBtn: getComputedStyle(elPayBtn).fontFamily,
      methodBtn: getComputedStyle(elMethodBtn).fontFamily,
      triggerWeight: getComputedStyle(elTrigger).fontWeight,
      inputWeight: getComputedStyle(elInput).fontWeight,
      cardFormConfig: window.__cardFormConfigs[0] || null,
    };
  });

  console.log("Computed typography details in Playwright:", JSON.stringify(typography, null, 2));

  // Assertions
  assert.ok(typography.checkout.includes("Segoe UI"), "Checkout container should use Segoe UI font");
  assert.ok(typography.trigger.includes("Segoe UI"), "Installment selector trigger should use Segoe UI font");
  assert.ok(typography.payBtn.includes("Segoe UI"), "Payment CTA button should use Segoe UI font");
  assert.ok(typography.methodBtn.includes("Segoe UI"), "Method buttons should use Segoe UI font");

  // Verify weight 500 for selectors and inputs
  assert.strictEqual(typography.triggerWeight, "500", "Installment trigger should have font-weight 500");
  assert.strictEqual(typography.inputWeight, "600", "Regular checkout fields should preserve their bold 600 style weight");

  // Verify styling in Mercado Pago secure card inputs config
  const customVariables = typography.cardFormConfig?.style?.customVariables;
  assert.ok(customVariables, "Mercado Pago cardForm configuration should include styling config");
  assert.ok(customVariables.inputFontFamily.includes("Segoe UI"), "Mercado Pago secure fields should be configured to use Segoe UI font");
  assert.strictEqual(customVariables.inputFontWeight, "500", "Mercado Pago secure fields should be configured with font-weight 500");

  console.log("Playwright verification passed! All checkout elements successfully configured to use Segoe UI font.");
  await browser.close();
})().catch(async (error) => {
  console.error("Playwright verification failed:", error);
  process.exit(1);
});
