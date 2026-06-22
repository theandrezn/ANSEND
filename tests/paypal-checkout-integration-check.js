const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
const checkout = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260621193000_paypal_checkout_provider.sql"), "utf8");

for (const marker of [
  'const PAYPAL_API_BASE = "https://api-m.paypal.com"',
  "PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "paypalConfigured(env)",
  'supported_methods: supportedMethods',
  "createPayPalOrder",
  'payment_source: {',
  'shipping_preference: "NO_SHIPPING"',
  "capturePayPalOrder",
  '"payer-action"',
  'Prefer: "return=representation"',
  'url.pathname === "/api/checkout/paypal/capture"',
]) assert(worker.includes(marker), `Worker missing PayPal integration marker: ${marker}`);

assert(!worker.includes("api-m.sandbox.paypal.com"), "Worker must not use PayPal sandbox endpoint");
assert(!worker.includes("sandbox.paypal.com"), "Worker must not reference PayPal sandbox");

for (const marker of [
  'data-checkout-method="paypal"',
  'data-checkout-panel="paypal"',
  "renderPayPalResult",
  "/api/checkout/paypal/capture",
  "Continuar no PayPal",
]) assert(checkout.includes(marker), `Checkout UI missing PayPal marker: ${marker}`);

assert(!checkout.includes('data-checkout-unavailable="paypal"'), "PayPal must not be rendered as unavailable");

assert(schema.includes("provider in ('mercado_pago', 'paypal')"), "Fresh schema must allow PayPal provider");
assert(schema.includes("method in ('pix', 'card', 'paypal')"), "Fresh schema must allow PayPal method");
assert(migration.includes("payment_attempts_provider_check"), "PayPal migration must update provider constraint");
assert(migration.includes("payment_attempts_method_check"), "PayPal migration must update method constraint");

console.log("PayPal checkout integration contract passed.");
