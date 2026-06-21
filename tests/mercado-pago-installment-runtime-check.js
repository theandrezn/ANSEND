const assert = require("assert");
const path = require("path");
const { chromium } = require("playwright");

const checkoutPath = path.join(__dirname, "..", "checkout", "checkout.js");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.setContent("<!doctype html><html><head></head><body><main id=\"mount\"></main></body></html>");
    await page.addScriptTag({ path: checkoutPath });
    await page.evaluate(() => {
      window.__pointerCounts = { add: 0, remove: 0 };
      const originalAdd = document.addEventListener.bind(document);
      const originalRemove = document.removeEventListener.bind(document);
      document.addEventListener = (type, listener, options) => {
        if (type === "pointerdown") window.__pointerCounts.add += 1;
        return originalAdd(type, listener, options);
      };
      document.removeEventListener = (type, listener, options) => {
        if (type === "pointerdown") window.__pointerCounts.remove += 1;
        return originalRemove(type, listener, options);
      };

      window.__cardForms = [];
      window.MercadoPago = function MercadoPago() {
        return {
          cardForm(config) {
            const form = {
              config,
              destroyed: false,
              unmounted: false,
              getCardFormData() {
                return {
                  token: "tok_runtime",
                  paymentMethodId: "visa",
                  issuerId: "25",
                  installments: "2",
                };
              },
              destroy() {
                this.destroyed = true;
              },
              unmount() {
                this.unmounted = true;
              },
            };
            window.__cardForms.push(form);
            return form;
          },
        };
      };

      window.fetch = async (url) => {
        if (String(url).includes("/api/checkout/config")) {
          return new Response(JSON.stringify({
            public_key: "TEST_PUBLIC_KEY",
            supported_methods: ["card", "pix"],
          }), { status: 200, headers: { "content-type": "application/json" } });
        }
        if (String(url).includes("/api/checkout/quote")) {
          return new Response(JSON.stringify({
            success: true,
            quote: {
              subtotal_cents: 12000,
              service_fee_cents: 0,
              discount_cents: 0,
              total_cents: 12000,
            },
          }), { status: 200, headers: { "content-type": "application/json" } });
        }
        if (String(url).includes("/api/checkout/payment")) {
          return new Response(JSON.stringify({
            success: true,
            attempt_id: "attempt-runtime",
            status: "in_process",
            checkout: { total_cents: 12000 },
          }), { status: 200, headers: { "content-type": "application/json" } });
        }
        return new Response("{}", { status: 404 });
      };
    });

    const result = await page.evaluate(async () => {
      const mount = document.getElementById("mount");
      const quote = { subtotalCents: 12000, serviceFeeCents: 0, discountCents: 0, totalCents: 12000 };
      const options = {
        mountTarget: mount,
        quote,
        cartItems: [{ beat_id: "beat_1", license_id: "lic_1" }],
        items: [{ beatId: "beat_1", title: "Beat", producer: "ANSEND", priceCents: 12000 }],
      };

      await window.AnsendCheckout.open(options);
      const firstCardForm = window.__cardForms[0];
      firstCardForm.config.callbacks.onFormMounted();

      const provider = mount.querySelector("[data-checkout-provider-installments]");
      provider.innerHTML = `
        <option value="">Selecione</option>
        <option value="1">1 parcela de R$ 120,00 sem juros</option>
        <option value="2">2 parcelas de R$ 65,00 (R$ 130,00)</option>
      `;
      provider.value = "1";
      await new Promise((resolve) => setTimeout(resolve, 0));

      let changeCount = 0;
      provider.addEventListener("change", () => { changeCount += 1; });

      window.AnsendCheckout.setPaymentMethod("card");
      const trigger = mount.querySelector("[data-checkout-installment-trigger]");
      trigger.click();
      const addAfterOpen = window.__pointerCounts.add;
      const optionTabIndexes = Array.from(mount.querySelectorAll("[data-checkout-installment-value]"))
        .map((option) => option.getAttribute("tabindex"));
      const activeOptionText = document.activeElement?.textContent || "";

      mount.querySelector('[data-checkout-installment-value="2"]').click();
      const selectedValue = provider.value;
      const selectedLabel = trigger.textContent;
      const changeCountAfterSelect = changeCount;

      trigger.click();
      document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      const closedOutside = mount.querySelector("[data-checkout-installment-popover]").hidden;
      const removeAfterOutside = window.__pointerCounts.remove;

      trigger.click();
      const addBeforeTeardown = window.__pointerCounts.add;
      await window.AnsendCheckout.open(options);
      const removeAfterTeardown = window.__pointerCounts.remove;
      const secondFeedback = mount.querySelector("[data-checkout-feedback]");
      firstCardForm.config.callbacks.onFormMounted(new Error("late old mount"));
      const staleMountedFeedback = secondFeedback.textContent;
      const staleCleanup = firstCardForm.config.callbacks.onFetching("installments");
      staleCleanup();
      const staleFetchingFeedback = secondFeedback.textContent;

      return {
        selectedValue,
        selectedLabel,
        changeCountAfterSelect,
        addAfterOpen,
        addBeforeTeardown,
        removeAfterOutside,
        removeAfterTeardown,
        closedOutside,
        optionTabIndexes,
        activeOptionText,
        firstDestroyed: firstCardForm.destroyed,
        firstUnmounted: firstCardForm.unmounted,
        staleMountedFeedback,
        staleFetchingFeedback,
      };
    });

    assert.strictEqual(result.selectedValue, "2", "visible installment choice must update the hidden provider select");
    assert.strictEqual(result.changeCountAfterSelect, 1, "hidden provider select must dispatch one bubbling change event");
    assert.match(result.selectedLabel, /2x de R\$ 65,00/i, "visible trigger must show the provider-selected label");
    assert(result.addAfterOpen >= 1, "opening the popover must attach a document-level pointer listener");
    assert(result.closedOutside, "outside pointer interaction must close the installment popover");
    assert(result.removeAfterOutside >= 1, "outside close must remove the document-level pointer listener");
    assert(result.addBeforeTeardown >= 2, "reopening the popover must attach the pointer listener again");
    assert(result.removeAfterTeardown >= result.addBeforeTeardown, "checkout teardown must remove the open popover pointer listener");
    assert(result.firstDestroyed || result.firstUnmounted, "checkout teardown must call optional CardForm destroy/unmount");
    assert.deepStrictEqual(result.optionTabIndexes, ["0", "-1"], "listbox options must use roving tabindex");
    assert.match(result.activeOptionText, /1x de R\$ 120,00/i, "opening must focus the selected installment option");
    assert.strictEqual(result.staleMountedFeedback, "", "late onFormMounted from stale CardForm must not mutate the new checkout");
    assert.strictEqual(result.staleFetchingFeedback, "", "late onFetching from stale CardForm must not mutate the new checkout");
  } finally {
    await browser.close();
  }

  console.log("mercado-pago-installment-runtime-check: ok");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
