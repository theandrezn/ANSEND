const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const schema = read("supabase/schema.sql").toLowerCase();
const worker = read("src/worker.mjs").toLowerCase();

const migrations = [
  "supabase/migrations/20260622210000_purchase_constraints_idempotency.sql",
  "supabase/migrations/20260622213000_atomic_purchase_finalization.sql",
  "supabase/migrations/20260622220000_immutable_purchase_snapshot.sql",
  "supabase/migrations/20260622223000_purchase_rls_authorization.sql",
  "supabase/migrations/20260622230000_purchase_backfill.sql",
];

for (const migration of migrations) {
  if (!fs.existsSync(path.join(root, migration))) {
    throw new Error(`Missing Phase 2 migration: ${migration}`);
  }
}

const allSql = [schema, ...migrations.map((migration) => read(migration).toLowerCase())].join("\n");

function assertIncludes(source, marker, message) {
  if (!source.includes(marker.toLowerCase())) throw new Error(message || `Missing marker: ${marker}`);
}

function assertNotIncludes(source, marker, message) {
  if (source.includes(marker.toLowerCase())) throw new Error(message || `Forbidden marker present: ${marker}`);
}

for (const marker of [
  "buyer_identity_snapshot",
  "beat_title_snapshot",
  "beat_cover_url_snapshot",
  "producer_id_snapshot",
  "producer_name_snapshot",
  "license_key_snapshot",
  "currency_snapshot",
  "license_rights_snapshot",
  "file_manifest_snapshot",
]) {
  assertIncludes(allSql, marker, `Snapshot field missing: ${marker}`);
}

assertIncludes(allSql, "purchase_entitlements_order_item_phase2_unique", "Entitlement business uniqueness is missing");
assertIncludes(allSql, "license_documents_order_item_phase2_unique", "Document business uniqueness is missing");
assertIncludes(allSql, "phase2_enforce_unique", "Legacy-safe uniqueness flag is missing");
assertIncludes(allSql, "create or replace function public.provision_purchase_delivery", "Explicit delivery provisioning function is missing");
assertIncludes(allSql, "create or replace function public.finalize_checkout_payment", "Finalizer function is missing");
assertIncludes(allSql, "v_delivery_result := public.provision_purchase_delivery", "Finalizer must provision delivery before completion");
assertIncludes(allSql, "set status = 'completed'", "Order completion must be explicit");
assertIncludes(allSql, "pedido sem itens nao pode gerar direitos", "Empty order guard is missing");
assertIncludes(allSql, "pedido criado parcialmente", "Partial order guard is missing");
assertIncludes(allSql, "after update of status on public.orders", "Entitlement trigger must not run on order insert");
assertIncludes(allSql, "when (new.status = 'refunded' and old.status = 'completed')", "Trigger must be limited to refund revocation");
assertIncludes(allSql, "revoke execute on function public.process_checkout", "Direct checkout RPC execution must be revoked");
assertIncludes(allSql, "drop policy if exists \"users can insert their own orders\"", "Legacy direct order insert policy must be removed");
assertIncludes(allSql, "drop policy if exists \"users can insert their own order items\"", "Legacy direct order item insert policy must be removed");
assertIncludes(allSql, "create or replace function public.backfill_purchase_delivery", "Backfill function is missing");
assertIncludes(allSql, "p_apply boolean default false", "Backfill must be dry-run by default");
assertIncludes(allSql, "purchase_backfill_audit", "Backfill audit table is missing");
assertIncludes(allSql, "classification in ('analyzed', 'corrected', 'skipped', 'ambiguous')", "Backfill classifications are incomplete");

const oldTriggerInsertPattern = /create trigger manage_purchase_entitlements_trigger[\s\S]{0,160}after insert or update of status on public\.orders/g;
const matches = schema.match(oldTriggerInsertPattern) || [];
if (matches.length && !schema.includes("-- phase 2 consolidated purchase lifecycle schema sync")) {
  throw new Error("Schema must include the Phase 2 override for the old insert trigger");
}
assertIncludes(schema, "when (new.status = 'refunded' and old.status = 'completed')", "Final schema trigger must only revoke on refund");

assertIncludes(worker, "order_item_id", "Download endpoint must accept/validate order_item_id");
assertIncludes(worker, "order_id", "Download endpoint must accept/validate order_id");
assertIncludes(worker, "orders?select=id,status,buyer_id", "Download endpoint must verify completed order server-side");
assertIncludes(worker, "order?.status === \"completed\"", "Download endpoint must require completed order");
assertIncludes(worker, "/api/purchases/remove-attempt", "Worker must expose authenticated pending-attempt removal.");
assertIncludes(worker, "method: \"delete\"", "Worker must remove pending payment attempts from Supabase.");
assertIncludes(worker, "attempt.order_id", "Worker must refuse to remove finalized order attempts.");
assertNotIncludes(worker, "download_url: filePath", "Worker must not expose permanent private paths");

console.log("Phase 2 purchase lifecycle contract checks passed.");

