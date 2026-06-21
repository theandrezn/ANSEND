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
assert(!markup.includes("PayPal"), "Unavailable PayPal must not render");
assert(!markup.includes("Boleto"), "Unavailable boleto must not render");
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
