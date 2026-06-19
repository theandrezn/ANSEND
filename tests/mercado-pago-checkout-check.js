const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

const checks = [
  [worker.includes("MERCADO_PAGO_ACCESS_TOKEN"), "Worker requires Mercado Pago access token secret"],
  [worker.includes('payment_method_id: "pix"'), "Worker creates Pix payments"],
  [worker.includes('"/v1/payments"'), "Worker calls Mercado Pago payments API"],
  [worker.includes('"X-Idempotency-Key"'), "Worker sends Mercado Pago idempotency key"],
  [worker.includes('url.pathname === "/api/checkout/status"'), "Worker exposes checkout status endpoint"],
  [worker.includes('external_reference'), "Worker binds payment to cart external reference"],
  [worker.includes('"process_checkout"'), "Worker only finalizes order through checkout RPC"],
  [script.includes("data-mercado-pago-pix"), "Frontend renders Mercado Pago Pix modal"],
  [script.includes('data-action="copy-pix-code"'), "Frontend exposes copy Pix action"],
  [script.includes('data-action="check-pix-payment"'), "Frontend exposes Pix verification action"],
  [script.includes('fetch("/api/checkout/status"'), "Frontend verifies Pix status before release"],
];

const failures = checks.filter(([ok]) => !ok).map(([, message]) => message);
if (failures.length) {
  console.error("Mercado Pago checkout checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Mercado Pago checkout integration checks passed.");
