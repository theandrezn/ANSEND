const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const checkout = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");
const css = fs.readFileSync(path.join(root, "checkout", "checkout.css"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const label of [
  "E-mail",
  "Número do cartão",
  "Validade",
  "Código de segurança",
  "Nome impresso no cartão",
  "CPF/CNPJ",
  "Banco emissor",
  "Parcelas",
  "Nome completo",
  "Telefone",
]) assert(checkout.includes(`>${label}<`), `Checkout payment field must expose the visible label: ${label}`);

for (const marker of [
  "data-checkout-card-number",
  "data-checkout-card-expiration",
  "data-checkout-card-cvv",
  "data-checkout-cardholder-name",
  "data-checkout-issuer",
  "data-checkout-installments",
  "pix_identification",
  "pix_phone",
]) assert(checkout.includes(marker), `Mercado Pago integration marker was removed: ${marker}`);

for (const marker of [
  'data-checkout-method="card"',
  'data-checkout-method="pix"',
]) assert(checkout.includes(marker), `Checkout payment method markup must include: ${marker}`);

for (const method of ["paypal", "apple-pay", "google-pay", "alipay"]) {
  const unavailableMethodTag = new RegExp(
    `<(?=[^>]*\\sdata-checkout-unavailable=["']${method}["'])(?=[^>]*\\sdisabled(?:\\s|=|/?>))(?=[^>]*\\saria-disabled=["']true["'])[a-z][^>]*>`,
    "i",
  );
  assert(unavailableMethodTag.test(checkout), `Unavailable checkout method must be disabled and aria-disabled: ${method}`);
}

for (const forbidden of [
  "PayPal",
  "Apple Pay",
  "Google Pay",
  "Alipay",
  "Endereço",
  "CEP",
  "Cidade",
]) assert(!checkout.includes(forbidden), `Unavailable or unnecessary checkout field is rendered: ${forbidden}`);

assert(/\.ansend-checkout__payment\s*\{[^}]*align-items:\s*center;[^}]*justify-content:\s*center;/s.test(css), "Payment column must center the compact form");
assert(/\.ansend-checkout__form,\s*\.ansend-checkout__result\s*\{[^}]*max-width:\s*380px;[^}]*flex:\s*0 1 380px;/s.test(css), "Payment form must use the 380px reference width");
assert(/\.ansend-checkout__tabs\s*\{[^}]*min-height:\s*40px;/s.test(css), "Payment tabs must match the 40px reference control");
assert(/\.ansend-checkout__methods button\s*\{[^}]*min-height:\s*58px;/s.test(css), "Payment method cards must match the 58px reference control");
assert(!/(?:^|})[^{}]*\.ansend-checkout__tabs[^{}]*\{[^}]*min-height:\s*46px;/s.test(css), "Payment tabs must not retain a legacy 46px override");
assert(!/(?:^|})[^{}]*\.ansend-checkout__methods button[^{}]*\{[^}]*min-height:\s*68px;/s.test(css), "Payment method cards must not retain a legacy 68px override");
assert(/\.ansend-checkout__field input[^}]*height:\s*42px;/s.test(css), "Payment inputs must keep the compact 42px height");
assert(!/zoom\s*:/.test(css), "Checkout CSS must not use zoom");
assert(!/transform\s*:\s*scale/i.test(css), "Checkout CSS must not use transform scale");

console.log("Checkout payment column reference contract passed.");
