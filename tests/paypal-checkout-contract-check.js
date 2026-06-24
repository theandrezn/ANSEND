const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
const checkout = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260624143000_enable_paypal_checkout_provider.sql"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(worker.includes("PAYPAL_CLIENT_ID") && worker.includes("PAYPAL_CLIENT_SECRET"), "Worker must keep PayPal credentials server-side");
assert(worker.includes("/v1/oauth2/token"), "Worker must exchange PayPal client credentials for an OAuth token");
assert(worker.includes("/v2/checkout/orders"), "Worker must use PayPal Orders API");
assert(worker.includes("/capture"), "Worker must capture the approved PayPal order before finalization");
assert(worker.includes('"payer-action"'), "Worker must accept PayPal payer-action approval links");
assert(worker.includes("reconcilePayPalAttempt"), "Worker must reconcile PayPal provider data before completing purchases");
assert(worker.includes("finalizeApprovedAttempt(env, attempt.id)"), "PayPal approval must finalize through the existing checkout RPC");
assert(worker.includes('provider: method === "paypal" ? "paypal" : "mercado_pago"'), "Payment attempts must persist the real PayPal provider");
assert(worker.includes("`${auth.user.id}:${method}:${clientKey}`"), "Checkout idempotency must be scoped by payment method so PayPal never reuses approved Pix/card attempts");
assert(worker.includes("paypalConfigured(env) ? [\"paypal\"] : []"), "Checkout config must expose PayPal only when secrets exist");
assert(checkout.includes("location.assign(approveUrl)"), "Checkout must redirect to the real PayPal approval URL");
assert(checkout.includes("paypal_attempt") && checkout.includes("paypal_token"), "Checkout must resume PayPal return parameters");
assert(checkout.includes("capture: true"), "Checkout return flow must request PayPal capture");
assert(!checkout.includes("mockResult"), "Checkout must not approve PayPal with a mocked result");
assert(schema.includes("provider in ('mercado_pago', 'paypal')"), "Fresh schema must allow PayPal payment attempts");
assert(schema.includes("'paypal', 'mercado_pago'"), "Fresh schema must allow PayPal checkout method");
assert(migration.includes("payment_attempts_provider_check") && migration.includes("'paypal'"), "Migration must expand provider constraint for PayPal");
assert(migration.includes("payment_attempts_method_check") && migration.includes("'paypal'"), "Migration must expand method constraint for PayPal");

console.log("PayPal checkout contract passed.");
