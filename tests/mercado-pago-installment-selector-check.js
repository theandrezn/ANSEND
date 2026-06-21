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
  "data-checkout-provider-issuer",
  "data-checkout-provider-installments",
  'dispatchEvent(new Event("change", { bubbles: true }))',
]) {
  assert(source.includes(marker), `checkout.js must include ${marker}`);
}

assert(!source.includes(">Banco emissor<"), "issuer selection must not be visible");
assert(source.includes("data-checkout-provider-issuer"), "provider issuer select must remain mounted");

console.log("mercado-pago-installment-selector-check: ok");
