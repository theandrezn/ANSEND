const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const migrationPath = path.join(root, "supabase", "migrations", "20260620190000_secure_checkout_payments.sql");

if (!fs.existsSync(migrationPath)) throw new Error("Secure checkout migration is missing");
const sql = fs.readFileSync(migrationPath, "utf8").toLowerCase();
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8").toLowerCase();

for (const marker of [
  "create table if not exists public.payment_attempts",
  "create table if not exists public.checkout_coupons",
  "create table if not exists public.coupon_redemptions",
  "create table if not exists public.seller_ledger_entries",
  "create or replace function public.finalize_checkout_payment",
  "provider_payment_id",
  "idempotency_key",
  "buyer_name",
  "buyer_email",
  "subtotal_cents",
  "discount_cents",
  "service_fee_cents",
  "revoke execute on function public.process_checkout",
]) {
  if (!sql.includes(marker)) throw new Error(`Secure checkout migration missing: ${marker}`);
}

for (const marker of ["public.payment_attempts", "public.checkout_coupons", "public.seller_ledger_entries", "public.finalize_checkout_payment"]) {
  if (!schema.includes(marker)) throw new Error(`Fresh-install schema missing: ${marker}`);
}

for (const marker of [
  "checkout_coupons_seller_idx",
  "payment_attempts_coupon_idx",
  "payment_attempts_order_idx",
  "coupon_redemptions_buyer_idx",
  "coupon_redemptions_order_idx",
  "seller_ledger_order_idx",
  "seller_ledger_order_item_idx",
]) {
  if (!schema.includes(marker)) throw new Error(`Fresh-install schema missing checkout index: ${marker}`);
}

console.log("Secure checkout database contracts passed.");
