const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");

(async () => {
  console.log("Starting Playwright verification for Plus Jakarta Sans font...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
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
        return new Response(JSON.stringify({ success: true, quote: { subtotal_cents: 9990, service_fee_cents: 599, discount_cents: 0, total_cents: 10589 } }), { status: 200, headers: { "Content-Type": "application/json" } });
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
        quote: { subtotalCents: 9990, serviceFeeCents: 599, discountCents: 0, totalCents: 10589 },
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
      hoverMatch: window.matchMedia("(hover: hover)").matches,
      pointerMatch: window.matchMedia("(pointer: fine)").matches,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  });

  console.log("Computed typography details in Playwright:", JSON.stringify(typography, null, 2));

  // Assertions
  assert.ok(typography.checkout.includes("Plus Jakarta Sans"), "Checkout container should use Plus Jakarta Sans font");
  assert.ok(typography.trigger.includes("Plus Jakarta Sans"), "Installment selector trigger should use Plus Jakarta Sans font");
  assert.ok(typography.payBtn.includes("Plus Jakarta Sans"), "Payment CTA button should use Plus Jakarta Sans font");
  assert.ok(typography.methodBtn.includes("Plus Jakarta Sans"), "Method buttons should use Plus Jakarta Sans font");

  // Verify weight 400 for selectors and inputs
  assert.strictEqual(typography.triggerWeight, "400", "Installment trigger should have font-weight 400");
  assert.strictEqual(typography.inputWeight, "400", "Regular checkout fields should preserve their 400 weight");

  // Verify styling in Mercado Pago secure card inputs config
  const customVariables = typography.cardFormConfig?.style?.customVariables;
  assert.ok(customVariables, "Mercado Pago cardForm configuration should include styling config");
  assert.ok(customVariables.inputFontFamily.includes("Plus Jakarta Sans"), "Mercado Pago secure fields should be configured to use Plus Jakarta Sans font");
  assert.strictEqual(customVariables.inputFontWeight, "400", "Mercado Pago secure fields should be configured with font-weight 400");

  console.log("Playwright verification passed! All checkout elements successfully configured to use Plus Jakarta Sans font.");

  // Verify macOS Dock magnification interaction
  await page.waitForTimeout(600);
  console.log("Verifying macOS Dock magnification effect in Playwright...");
  const methodsContainer = await page.$(".ansend-checkout__methods");
  assert.ok(methodsContainer, "Payment methods container must exist");

  const buttons = await page.$$(".ansend-checkout__methods button[data-checkout-method]");
  assert.strictEqual(buttons.length, 4, "There should be 4 payment method buttons");

  const firstButtonBox = await buttons[0].boundingBox();
  console.log("First button bounding box:", firstButtonBox);
  const centerX = firstButtonBox.x + firstButtonBox.width / 2;
  const centerY = firstButtonBox.y + firstButtonBox.height / 2;

  // Move mouse to the center of the first button
  await page.mouse.move(centerX, centerY);
  await page.waitForTimeout(500);

  const transformsOnHover = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll(".ansend-checkout__methods button[data-checkout-method]"));
    return btns.map(b => ({
      method: b.dataset.checkoutMethod,
      transform: b.style.transform,
    }));
  });

  console.log("Transforms on hover first button:", transformsOnHover);
  const cardTransform = transformsOnHover.find(t => t.method === "card")?.transform || "";
  assert.ok(cardTransform.includes("scale(1.1"), "First button should scale up close to 1.12 under mouse cursor");

  // Move mouse away
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);

  const transformsOnLeave = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll(".ansend-checkout__methods button[data-checkout-method]"));
    return btns.map(b => b.style.transform);
  });
  console.log("Transforms after mouse leave:", transformsOnLeave);
  assert.ok(transformsOnLeave.every(t => !t || t.includes("scale(1)")), "All buttons should reset back to normal scale on mouse leave");

  console.log("Playwright macOS Dock magnification interaction verified successfully!");
  await browser.close();
})().catch(async (error) => {
  console.error("Playwright verification failed:", error);
  process.exit(1);
});
