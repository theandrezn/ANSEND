const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const outputDir = "C:/Users/games/.gemini/antigravity/brain/1cbe404b-645a-4b13-be6f-a044aa408922";

const viewports = [
  { width: 1920, height: 1080, name: "desktop-1920x1080" },
  { width: 1440, height: 900, name: "desktop-1440x900" },
  { width: 1024, height: 768, name: "desktop-1024x768" },
  { width: 768, height: 1024, name: "tablet-768x1024" },
  { width: 390, height: 844, name: "mobile-390x844" },
  { width: 360, height: 800, name: "mobile-360x800" },
];

(async () => {
  console.log("Starting Playwright checkout visual validation...");
  const browser = await chromium.launch({ headless: true });

  try {
    for (const vp of viewports) {
      console.log(`Capturing checkout viewport: ${vp.width}x${vp.height} (${vp.name})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });

      const page = await context.newPage();
      
      const css = fs.readFileSync(path.join(root, "checkout", "checkout.css"), "utf8");
      const js = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");

      // Set base HTML
      await page.setContent(
        `<!doctype html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>${css}</style>
        </head>
        <body style="margin:0; padding:0; background:#020508;">
          <main id="app"></main>
        </body>
        </html>`,
        { baseURL: "file:///" + root.replace(/\\/g, "/") + "/" }
      );

      // Add the script
      await page.addScriptTag({ content: js });

      // Mock dependencies
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

      // Mount checkout
      await page.evaluate(async () => {
        await window.AnsendCheckout.open({
          mountTarget: document.querySelector("#app"),
          quote: { subtotalCents: 9990, serviceFeeCents: 1199, discountCents: 0, totalCents: 11189 },
          items: [{ beatId: "beat", cartId: "cart", title: "Beat Premium", producer: "ANSEND", licenseName: "Premium", formats: "MP3, WAV", priceCents: 9990 }],
          cartItems: [{ beat_id: "beat", license_id: "premium" }],
          refreshIcons() {},
        });
      });

      // Wait a bit for transition and assets to load
      await page.waitForTimeout(1000);

      // Take a screenshot of the Pix selection (default)
      const pixScreenshotPath = path.join(outputDir, `checkout-pix-${vp.name}.png`);
      await page.screenshot({ path: pixScreenshotPath });
      console.log(`Saved Pix view to: ${pixScreenshotPath}`);

      // Now click on Mercado Pago to test visual selection and explanation panel change
      await page.evaluate(() => {
        window.AnsendCheckout.setPaymentMethod("mercado_pago");
      });
      await page.waitForTimeout(500);

      // Take a screenshot of the Mercado Pago selection
      const mpScreenshotPath = path.join(outputDir, `checkout-mercado_pago-${vp.name}.png`);
      await page.screenshot({ path: mpScreenshotPath });
      console.log(`Saved Mercado Pago view to: ${mpScreenshotPath}`);

      await context.close();
    }
  } catch (error) {
    console.error("Error during checkout visual validation:", error);
  } finally {
    await browser.close();
    console.log("Checkout visual validation complete.");
  }
})();
