const assert = require("node:assert/strict");
const checkout = require("../checkout/checkout.js");

const markup = checkout.renderCheckout({
  items: [{ beatId: "beat-1", cartId: "beat-1::premium", title: "Beat <Seguro>", producer: "Produtor", licenseName: "Premium", formats: "MP3, WAV", priceCents: 19990, removable: true }],
  cartItems: [{ beat_id: "beat-1", license_id: "premium" }],
  quote: { subtotalCents: 19990, discountCents: 0, serviceFeeCents: 2399, totalCents: 22389 },
  recommendation: { id: "beat-2", title: "Outro beat", producer: "ANSEND", price: "R$ 99,90", sponsored: false },
});

assert(markup.includes("Beat &lt;Seguro&gt;"), "User content must be escaped");
assert(markup.includes("Pagar com cartão"), "Card method must render");
assert(markup.includes("Pagar com Pix"), "Pix method must render");
const paypalOpeningTag = markup.match(/<button\b[^>]*data-checkout-unavailable="paypal"[^>]*>/)?.[0] || "";
assert(paypalOpeningTag, "Unavailable PayPal must render as a button");
assert(/(?:^|\s)disabled(?:\s|>)/.test(paypalOpeningTag), "Unavailable PayPal must be natively disabled");
assert(/(?:^|\s)aria-disabled="true"(?:\s|>)/.test(paypalOpeningTag), "Unavailable PayPal must be aria-disabled");
assert(!markup.includes('data-checkout-method="paypal"'), "Unavailable PayPal must not have a payment handler");
assert(!markup.includes("Boleto"), "Unavailable boleto must not render");
assert(!markup.includes("Endereço"), "Checkout must not request billing address");
assert(markup.includes("Telefone"), "Pix checkout must request phone number");
assert(markup.includes("assets/payment/pix-user.png"), "Pix checkout must use the real Pix brand asset");
assert(markup.includes('aria-live="polite"'), "Payment feedback must be announced");
assert(markup.includes("R$ 223,89") || markup.includes("R$ 223,89"), "Total must use BRL formatting");

const pix = checkout.renderPixResult({ attempt_id: "attempt", checkout: { total_cents: 22389 }, pix: { qr_code: "safe-code" } });
assert(pix.includes("Aguardando pagamento"));
assert(pix.includes("safe-code"));

const approved = checkout.renderCardResult({ status: "approved", paid: true });
assert(approved.includes("Pagamento aprovado"));

const rejected = checkout.renderCardResult({ status: "rejected", paid: false, status_detail: "cc_rejected_bad_filled_security_code" });
assert(rejected.includes("Pagamento recusado"), "Rejected card must never be described as pending");
assert(rejected.includes("Tentar novamente"), "Rejected card must offer recovery");

console.log("Checkout renderer behavior passed.");
