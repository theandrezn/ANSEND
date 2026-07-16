import assert from "node:assert/strict";
import fs from "node:fs";

const worker = fs.readFileSync(new URL("../src/worker.mjs", import.meta.url), "utf8");
const frontend = fs.readFileSync(new URL("../script.js", import.meta.url), "utf8");
const migration = fs.readFileSync(new URL("../supabase/migrations/20260716040237_pix_purchase_fulfillment.sql", import.meta.url), "utf8");

assert.match(migration, /create table if not exists public\.purchase_entitlements/i);
assert.match(migration, /create table if not exists public\.license_documents/i);
assert.match(migration, /create or replace function public\.fulfill_completed_order/i);
assert.match(migration, /after insert on public\.order_items/i, "Order items must fulfill orders created directly as completed.");
assert.match(migration, /on conflict \(order_item_id\).*do update/is, "Entitlements must be idempotent.");
assert.match(migration, /select public\.fulfill_completed_order\(id\)[\s\S]*where status = 'completed'/i, "Existing completed orders must be backfilled.");
assert.match(migration, /new\.status = 'refunded'[\s\S]*status = 'revoked'/i, "Refunds must revoke download rights.");

assert.match(worker, /provider_payment_id=eq\.\$\{paymentId\}/);
assert.match(worker, /external_reference=eq\.\$\{encodeURIComponent\(externalReference\)\}/, "Webhook race fallback must use the trusted provider reference.");
assert.match(worker, /finalize_checkout_payment/, "Approved payments must finalize through the server-only RPC.");
assert.match(worker, /purchase_entitlements\?select=.*status=eq\.active/, "Downloads must require an active entitlement.");
assert.doesNotMatch(frontend.slice(frontend.indexOf("// Contract loading"), frontend.indexOf("// Downloads section")), /generateContractText\(/, "Paid-order documents must come from Supabase, not be invented in the browser.");
assert.match(frontend, /contractReady = Boolean\(contractText && contractNumber\)/);

console.log("PIX purchase fulfillment contract checks passed.");
