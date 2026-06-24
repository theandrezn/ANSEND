const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
const checkout = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260624190000_enable_mercado_pago_checkout_pro.sql"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(worker.includes('mercadoPagoRequest(env, "/checkout/preferences"'), "Worker must create a real Mercado Pago preference");
assert(worker.includes("init_point") && worker.includes("checkout_url"), "Worker must return the Mercado Pago Checkout Pro URL");
assert(worker.includes('method === "mercado_pago"'), "Worker must keep Checkout Pro distinct from direct card and Pix methods");
assert(worker.includes("external_reference.eq."), "Webhook must reconcile Checkout Pro payments by external reference");
assert(checkout.includes('data-checkout-method="mercado_pago"'), "Checkout must expose the Mercado Pago method");
assert(checkout.includes("location.assign(checkoutUrl)"), "Checkout must redirect to Mercado Pago");
assert(checkout.includes("mp_attempt") && checkout.includes("payment_id"), "Checkout must reconcile the Mercado Pago return");
assert(checkout.includes("assets/payment/mercado-pago-checkout.png"), "Checkout must use the supplied Mercado Pago logo");
assert(schema.includes("method in ('pix', 'card', 'paypal', 'mercado_pago')"), "Fresh schema must allow Checkout Pro");
assert(migration.includes("'mercado_pago'"), "Migration must allow Checkout Pro");

console.log("Mercado Pago Checkout Pro contract passed.");
