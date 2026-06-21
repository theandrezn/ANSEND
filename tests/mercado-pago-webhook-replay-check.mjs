import assert from "node:assert/strict";
import { isFreshMercadoPagoWebhookTimestamp } from "../src/worker.mjs";

const now = 1_780_000_000_000;

assert.equal(isFreshMercadoPagoWebhookTimestamp(String(now), now), true, "Current timestamp must be accepted");
assert.equal(isFreshMercadoPagoWebhookTimestamp(String(now - 299_000), now), true, "Timestamp inside five minutes must be accepted");
assert.equal(isFreshMercadoPagoWebhookTimestamp(String(now - 301_000), now), false, "Stale webhook must be rejected");
assert.equal(isFreshMercadoPagoWebhookTimestamp(String(now + 301_000), now), false, "Far-future webhook must be rejected");
assert.equal(isFreshMercadoPagoWebhookTimestamp("invalid", now), false, "Invalid timestamp must be rejected");

console.log("Mercado Pago webhook replay protection passed.");
