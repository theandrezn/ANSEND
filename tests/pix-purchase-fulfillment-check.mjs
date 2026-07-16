import assert from "node:assert/strict";
import fs from "node:fs";

const worker = fs.readFileSync(new URL("../src/worker.mjs", import.meta.url), "utf8");
const frontend = fs.readFileSync(new URL("../script.js", import.meta.url), "utf8");
const migration = fs.readFileSync(new URL("../supabase/migrations/20260716040237_pix_purchase_fulfillment.sql", import.meta.url), "utf8");
const licensePdfMigration = fs.readFileSync(new URL("../supabase/migrations/20260716171500_purchase_license_pdf_delivery.sql", import.meta.url), "utf8");

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
assert.match(worker, /purchase_entitlements\?select=.*entitlementFilters\.join/, "Downloads must query purchase entitlements before signing files.");
assert.match(worker, /"status=eq\.active"/, "Downloads must require an active entitlement.");
assert.match(worker, /order_item_id=eq\.\$\{orderItemId\}/, "Downloads must support the exact purchased order item entitlement.");
assert.match(worker, /fileType === "license_pdf"/, "The secure download endpoint must release uploaded license PDFs.");
assert.match(worker, /license_pdf_path/, "The secure download endpoint must resolve the uploaded license PDF path.");
assert.doesNotMatch(worker, /beat\.mp3_path \|\| beat\.audio_path/, "MP3 downloads must never substitute an arbitrary preview file.");
assert.doesNotMatch(worker, /beat\.wav_path \|\| beat\.audio_path/, "WAV downloads must never substitute an arbitrary preview file.");
assert.match(licensePdfMigration, /file_type in \('mp3', 'wav', 'stems', 'license_pdf'\)/i, "Download logs must accept license PDF events.");
assert.doesNotMatch(frontend.slice(frontend.indexOf("// Contract loading"), frontend.indexOf("// Downloads section")), /generateContractText\(/, "Paid-order documents must come from Supabase, not be invented in the browser.");
assert.match(frontend, /contractReady = Boolean\(contractText && contractNumber\)/);
assert.match(frontend, /data-file-type="license_pdf"/, "Completed orders must expose the uploaded license PDF download.");
assert.match(frontend, /data-order-item-id=/, "Purchase downloads must carry the exact order item id.");

console.log("PIX purchase fulfillment contract checks passed.");
