const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const checkout = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");
const css = fs.readFileSync(path.join(root, "checkout", "checkout.css"), "utf8");
const checkoutModule = require(path.join(root, "checkout", "checkout.js"));
const renderedCheckout = checkoutModule.renderCheckout({
  items: [],
  cartItems: [],
  quote: { subtotalCents: 0, discountCents: 0, serviceFeeCents: 0, totalCents: 0 },
});

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
  "Parcelas",
  "Nome completo",
  "Telefone",
]) assert(checkout.includes(`>${label}<`), `Checkout payment field must expose the visible label: ${label}`);

assert(!checkout.includes(">Banco emissor<"), "Checkout must not expose a visible issuer selector");
assert(checkout.includes("ansend-checkout__promoted-track"), "Checkout must render the promoted carousel track");
assert(checkout.includes("ansend-checkout__promoted-card"), "Checkout must render promoted cards");
assert(checkout.includes("Promote Your Music"), "Checkout must render the promoted CTA banner");
assert(checkout.includes("data-checkout-promoted-next"), "Checkout must include promoted carousel navigation");
assert(!checkout.includes("Recomendado para você"), "Checkout must not render the legacy recommendation heading");

for (const marker of [
  "data-checkout-card-number",
  "data-checkout-card-expiration",
  "data-checkout-card-cvv",
  "data-checkout-cardholder-name",
  "data-checkout-provider-issuer",
  "data-checkout-provider-installments",
  "data-checkout-installment-trigger",
  'role="listbox"',
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
  assert(unavailableMethodTag.test(renderedCheckout), `Unavailable checkout method must be disabled and aria-disabled: ${method}`);
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
assert(/\.ansend-checkout__form,\s*\.ansend-checkout__result\s*\{[^}]*max-width:\s*360px;[^}]*flex:\s*0 1 360px;/s.test(css), "Payment form must use the 360px reference width");
assert(/\.ansend-checkout__tabs\s*\{[^}]*min-height:\s*40px;/s.test(css), "Payment tabs must match the 40px reference control");
assert(/\.ansend-checkout__methods button\s*\{[^}]*min-height:\s*58px;/s.test(css), "Payment method cards must match the 58px reference control");
assert(/\.ansend-checkout__promoted-track\s*\{[^}]*scroll-snap-type:\s*x mandatory;/s.test(css), "Promoted checkout carousel must use horizontal scroll snap");
assert(/\.ansend-checkout__promoted-card\s*\{[^}]*flex:\s*0 0 clamp\(150px, 20vw, 190px\);/s.test(css), "Promoted cards must use compact marketplace card sizing");
assert(/\.ansend-checkout__promoted-banner\s*\{[^}]*grid-template-columns:\s*48px minmax\(0,1fr\) auto;/s.test(css), "Promoted CTA banner must match the reference layout");
assert(/\.ansend-checkout__promoted-card\s*\{[^}]*font-family:\s*var\(--checkout-field-font\);/s.test(css), "Promoted cards must use Poppins");
assert(/\.ansend-checkout__promoted-price\s*\{[^}]*font-family:\s*var\(--checkout-field-font\);[^}]*font-variant-numeric:\s*lining-nums tabular-nums;/s.test(css), "Promoted prices must use modern tabular Poppins numerals");
assert(/\.ansend-checkout__promoted-banner a\s*\{[^}]*font-family:\s*var\(--checkout-field-font\);[^}]*font-variant-numeric:\s*lining-nums tabular-nums;/s.test(css), "Promoted CTA must use modern numeric typography");
assert(!/(?:^|})[^{}]*\.ansend-checkout__tabs[^{}]*\{[^}]*min-height:\s*46px;/s.test(css), "Payment tabs must not retain a legacy 46px override");
assert(!/(?:^|})[^{}]*\.ansend-checkout__methods button[^{}]*\{[^}]*min-height:\s*68px;/s.test(css), "Payment method cards must not retain a legacy 68px override");
assert(/\.ansend-checkout__field input[^}]*height:\s*42px;/s.test(css), "Payment inputs must keep the compact 42px height");
assert(css.includes('--checkout-field-font: "Poppins"'), "Payment fields must use Poppins as their visual font");
assert(/\.ansend-checkout__field input[^}]*color:\s*#ffffff;[^}]*-webkit-text-fill-color:\s*#ffffff;/s.test(css), "Payment field values must render as white text");
assert(/\.ansend-checkout__field input::placeholder[^}]*color:\s*#ffffff;/s.test(css), "Payment field placeholders must stay visible in white");
assert(/\.ansend-checkout__secure-field iframe\s*\{[^}]*filter:\s*invert\(1\)/s.test(css), "Mercado Pago secure iframes must receive the dark-field text visibility fallback");
assert(/\.ansend-checkout__installment-trigger\s*\{[^}]*color:\s*#fff;[^}]*font-family:\s*var\(--checkout-field-font\);/s.test(css), "Installment selector must use white Poppins text");
assert(/\.ansend-checkout__pay,\s*\.ansend-checkout__secondary\s*\{[^}]*height:\s*42px;/s.test(css), "Payment CTA must match the compact 42px reference height");
assert(!/(?:^|})[^{}]*\.ansend-checkout__pay,\s*\.ansend-checkout__secondary[^{}]*\{[^}]*height:\s*46px;/s.test(css), "Payment CTA must not retain the oversized 46px height");
assert(!/zoom\s*:/.test(css), "Checkout CSS must not use zoom");
assert(!/transform\s*:\s*scale/i.test(css), "Checkout CSS must not use transform scale");

console.log("Checkout payment column reference contract passed.");
