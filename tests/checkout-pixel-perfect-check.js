const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const file of ["checkout/checkout.js", "checkout/checkout.css"]) {
  assert(fs.existsSync(path.join(root, file)), `Missing isolated checkout asset: ${file}`);
}

const checkout = read("checkout/checkout.js");
const css = read("checkout/checkout.css");
const index = read("index.html");
const build = read("scripts/build-worker.js");
const worker = read("src/worker.mjs");

for (const marker of [
  "window.AnsendCheckout",
  "renderCheckout",
  "renderPixResult",
  "renderCardResult",
  "setPaymentMethod",
  "applyCoupon",
  "data-checkout-method=\"card\"",
  "data-checkout-method=\"pix\"",
  "data-checkout-card-number",
  "data-checkout-card-cvv",
  "data-checkout-installments",
  "aria-live=\"polite\"",
]) assert(checkout.includes(marker), `Checkout module missing marker: ${marker}`);

for (const marker of [
  "--checkout-page-bg: #222423",
  "--checkout-left-bg: #060707",
  "--checkout-right-bg: #111314",
  "width: min(100%, 1680px)",
  "grid-template-columns: minmax(0, 1.08fr) minmax(480px, .92fr)",
  "max-width: 620px",
  "@media (max-width: 899px)",
  "@media (max-width: 767px)",
  "prefers-reduced-motion",
  ":focus-visible",
]) assert(css.includes(marker), `Checkout CSS missing marker: ${marker}`);

assert(index.includes("checkout/checkout.css"), "index.html must load isolated checkout CSS");
assert(index.includes("checkout/checkout.js"), "index.html must load isolated checkout JS");
assert(build.includes('"checkout"'), "build must copy checkout assets");

for (const route of [
  'url.pathname === "/api/checkout/config"',
  'url.pathname === "/api/checkout/quote"',
  'url.pathname === "/api/checkout/payment"',
  'url.pathname === "/api/checkout/status"',
  'url.pathname === "/api/webhooks/mercado-pago"',
]) assert(worker.includes(route), `Worker missing route: ${route}`);

for (const marker of [
  "createMercadoPagoCardPayment",
  "MERCADO_PAGO_PUBLIC_KEY",
  "MERCADO_PAGO_WEBHOOK_SECRET",
  "producer_name",
  "X-Idempotency-Key",
  "payment_attempts",
  "finalize_checkout_payment",
]) assert(worker.includes(marker), `Worker missing payment marker: ${marker}`);

assert(!worker.includes("beats?select=id,title,status,sold_exclusively,user_id,producer&"), "Checkout must not query removed beats.producer column");

console.log("Pixel-perfect checkout contracts passed.");
