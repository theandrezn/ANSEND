const assert = require("assert");
const fs = require("fs");
const path = require("path");

const checkoutPath = path.join(__dirname, "..", "checkout", "checkout.js");
const source = fs.readFileSync(checkoutPath, "utf8");
const checkout = require(checkoutPath);

const withTotal = checkout.parseProviderInstallmentLabel("3 parcelas de R$ 41,20 (R$ 123,60)");
assert.deepStrictEqual(withTotal, {
  installments: 3,
  installmentAmount: "R$ 41,20",
  totalAmount: "R$ 123,60",
  interestFree: false,
});

const interestFree = checkout.parseProviderInstallmentLabel("1 parcela de R$ 111,89 sem juros");
assert.deepStrictEqual(interestFree, {
  installments: 1,
  installmentAmount: "R$ 111,89",
  totalAmount: "",
  interestFree: true,
});

assert.strictEqual(checkout.formatProviderInstallmentLabel(withTotal), "3x de R$ 41,20 — total R$ 123,60");
assert.strictEqual(checkout.formatProviderInstallmentLabel(interestFree), "1x de R$ 111,89 — sem juros");

for (const marker of [
  "MutationObserver",
  "syncInstallmentSelector",
  "disconnectInstallmentObserver",
  "teardownActiveCheckout",
  "installmentOutsidePointerHandler",
  "data-checkout-provider-issuer",
  "data-checkout-provider-installments",
  'dispatchEvent(new Event("change", { bubbles: true }))',
]) {
  assert(source.includes(marker), `checkout.js must include ${marker}`);
}

assert(!source.includes(">Banco emissor<"), "issuer selection must not be visible");
assert(source.includes("data-checkout-provider-issuer"), "provider issuer select must remain mounted");

assert(
  /function syncInstallmentSelector\(checkoutState = active\)[\s\S]*checkoutState\?\.installmentFetchCount > 0[\s\S]*Calculando parcelas no Mercado Pago…[\s\S]*return;/.test(source),
  "selector sync must preserve the loading state while provider fetches overlap",
);
assert(
  /if \(fetchingInstallments\) checkoutState\.installmentFetchCount \+= 1;/.test(source),
  "provider fetching must increment the installment fetch counter",
);
assert(
  /checkoutState\.installmentFetchCount = Math\.max\(0, checkoutState\.installmentFetchCount - 1\)/.test(source),
  "provider fetching completion must safely decrement the installment fetch counter",
);
assert(
  /onFormMounted\(error\) \{[\s\S]*if \(active !== checkoutState\) return;[\s\S]*observeInstallmentOptions\(checkoutState\)/.test(source),
  "CardForm mounted callback must ignore stale checkout instances and observe the captured checkout",
);
assert(
  /onSubmit\(event\) \{[\s\S]*if \(active !== checkoutState\) return;[\s\S]*checkoutState\.cardForm\.getCardFormData\(\)/.test(source),
  "CardForm submit callback must ignore stale checkout instances and read the captured CardForm",
);

console.log("mercado-pago-installment-selector-check: ok");
