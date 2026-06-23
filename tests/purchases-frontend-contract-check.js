const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

function assertIncludes(source, marker, message) {
  if (!source.includes(marker)) throw new Error(message || `Missing marker: ${marker}`);
}

function assertNotIncludes(source, marker, message) {
  if (source.includes(marker)) throw new Error(message || `Forbidden marker present: ${marker}`);
}

assertIncludes(script, "function normalizePurchaseOrderItem", "Purchases frontend must normalize real order_items before rendering details.");
assertIncludes(script, "beat_title_snapshot", "Purchases frontend must use immutable beat snapshots.");
assertIncludes(script, "producer_name_snapshot", "Purchases frontend must use immutable producer snapshots.");
assertIncludes(script, "license_rights_snapshot", "Purchases frontend must keep immutable license rights available.");
assertIncludes(script, "purchase_entitlements", "Purchases frontend must read real entitlements before enabling downloads.");
assertIncludes(script, "license_documents", "Purchases frontend must read generated license documents.");
assertIncludes(script, "data-order-id", "Download buttons must carry order_id.");
assertIncludes(script, "data-order-item-id", "Download buttons must carry order_item_id.");
assertIncludes(script, 'params.set("order_id"', "Download request must send order_id to the Worker.");
assertIncludes(script, 'params.set("order_item_id"', "Download request must send order_item_id to the Worker.");
assertIncludes(script, "Isso não significa que você não tenha pedidos", "Query errors must not be rendered as an empty purchase history.");
assertIncludes(script, "Status desconhecido", "Unknown gateway statuses must fail closed in the UI.");
assertNotIncludes(script, "Limpar dados locais", "Authenticated purchases UI must not expose local order clearing as if localStorage were the source of truth.");

console.log("Purchases frontend contract checks passed.");
