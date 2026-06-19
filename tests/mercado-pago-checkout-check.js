const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const checks = [
  [worker.includes("MERCADO_PAGO_ACCESS_TOKEN"), "Worker requires Mercado Pago access token secret"],
  [worker.includes('payment_method_id: "pix"'), "Worker creates Pix payments"],
  [worker.includes('"/v1/payments"'), "Worker calls Mercado Pago payments API"],
  [worker.includes('"X-Idempotency-Key"'), "Worker sends Mercado Pago idempotency key"],
  [worker.includes('url.pathname === "/api/checkout/status"'), "Worker exposes checkout status endpoint"],
  [worker.includes('external_reference'), "Worker binds payment to cart external reference"],
  [worker.includes("licensesByBeatAndKey"), "Worker resolves license_key values like premium to real license IDs"],
  [worker.includes("supabaseAuthedRest(env, beatQuery, authHeader)"), "Worker validates checkout cart with authenticated Supabase REST"],
  [worker.includes('"process_checkout"'), "Worker only finalizes order through checkout RPC"],
  [script.includes("data-mercado-pago-pix"), "Frontend renders Mercado Pago Pix modal"],
  [script.includes("mercadoPagoLogoMarkup"), "Frontend renders Mercado Pago brand mark"],
  [script.includes("pixLogoMarkup"), "Frontend renders Pix brand mark"],
  [script.includes('data-action="copy-pix-code"'), "Frontend exposes copy Pix action"],
  [script.includes('data-action="check-pix-payment"'), "Frontend exposes Pix verification action"],
  [script.includes('fetch("/api/checkout/status"'), "Frontend verifies Pix status before release"],
  [script.includes("checkoutFormMarkup"), "Frontend uses the redesigned checkout markup"],
  [script.includes("checkout-shell"), "Frontend renders checkout shell layout"],
  [styles.includes(".checkout-shell"), "Styles include responsive glass checkout shell"],
  [!styles.includes(".app-modal,\n.app-modal-panel"), "Modal overlay is not constrained by max-width hardening"],
];

const failures = checks.filter(([ok]) => !ok).map(([, message]) => message);
if (failures.length) {
  console.error("Mercado Pago checkout checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Mercado Pago checkout integration checks passed.");
