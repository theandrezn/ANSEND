const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const checkout = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const marker of [
  "issuer: `checkout-issuer-${safe}`",
  "data-checkout-issuer",
  "issuer: { id: active.formIds.issuer",
  "onFetching(resource)",
  "Buscando parcelas",
  "refreshCardFormForQuote",
  "MPHiddenInputToken",
  "active.cardFormAmountCents",
]) assert(checkout.includes(marker), `CardForm dynamic integration missing: ${marker}`);

assert(
  /function updateQuote\(quote\)[\s\S]*refreshCardFormForQuote\(previousTotalCents\)/.test(checkout),
  "Changing the authoritative quote must rebuild CardForm with the new amount",
);

assert(
  /function refreshCardFormForQuote[\s\S]*data-checkout-card-number[\s\S]*data-checkout-card-expiration[\s\S]*data-checkout-card-cvv/.test(checkout),
  "Refreshing CardForm must replace the secure fields instead of retaining stale card data",
);

console.log("Mercado Pago CardForm dynamic amount and installments contract passed.");
