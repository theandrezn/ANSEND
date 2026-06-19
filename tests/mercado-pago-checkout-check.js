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
  [script.includes("checkout-topbar"), "Frontend renders compact secure checkout header"],
  [script.includes("checkout-summary-panel"), "Frontend renders sticky order summary"],
  [script.includes("checkout-trust-strip"), "Frontend renders payment trust information"],
  [script.includes("payment-status-card"), "Frontend renders Pix payment status"],
  [script.includes("pix-instructions"), "Frontend renders Pix payment instructions"],
  [script.includes("Copiado"), "Frontend provides inline copy feedback"],
  [script.includes('new Intl.NumberFormat("pt-BR"'), "Frontend formats checkout currency as BRL"],
  [script.includes("previousSubmitHtml"), "Frontend restores the original submit button content"],
  [script.includes("checkout-method-grid"), "Frontend renders payment method grid"],
  [script.includes("assets/payment/pix.svg"), "Frontend uses real Pix payment asset"],
  [script.includes("assets/payment/mercado-pago.svg"), "Frontend uses real Mercado Pago payment asset"],
  [script.includes("assets/payment/card.svg"), "Frontend uses card payment asset"],
  [script.includes("assets/payment/boleto.svg"), "Frontend uses boleto payment asset"],
  [script.includes("assets/payment/debit.svg"), "Frontend uses debit payment asset"],
  [styles.includes(".checkout-shell"), "Styles include responsive glass checkout shell"],
  [styles.includes(".checkout-page"), "Styles include fullscreen checkout page"],
  [styles.includes("--checkout-primary: #1687ff"), "Checkout uses electric blue primary token"],
  [styles.includes("grid-template-columns: minmax(0, 1.48fr)"), "Desktop checkout uses main and sticky summary columns"],
  [styles.includes("@media (prefers-reduced-motion: reduce)"), "Checkout respects reduced motion preferences"],
  [!styles.includes(".app-modal,\n.app-modal-panel"), "Modal overlay is not constrained by max-width hardening"],
];

const failures = checks.filter(([ok]) => !ok).map(([, message]) => message);
if (failures.length) {
  console.error("Mercado Pago checkout checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Mercado Pago checkout integration checks passed.");
