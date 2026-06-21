const fs = require("node:fs");
const path = require("node:path");

const worker = fs.readFileSync(path.resolve(__dirname, "..", "src", "worker.mjs"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(worker.includes("const internalIdempotencyKey"), "Worker must keep a separate internal idempotency key");
assert(worker.includes("idempotency_key: internalIdempotencyKey"), "Payment attempt must persist the internal buyer-scoped key");
assert(worker.includes("idempotencyKey: attemptId"), "Mercado Pago must receive the stable attempt UUID as X-Idempotency-Key");
assert(!worker.includes("idempotencyKey })\n    : await createMercadoPagoPixPayment"), "Provider call must not reuse the long internal key");

console.log("Mercado Pago provider idempotency key contract passed.");
