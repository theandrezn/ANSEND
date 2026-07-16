import assert from "node:assert/strict";
import { verifyMercadoPagoSignature } from "../src/worker.mjs";

const secret = "test-webhook-secret";
const paymentId = "123456789";
const requestId = "request-abc";
const timestamp = String(Math.floor(Date.now() / 1000));
const manifest = `id:${paymentId};request-id:${requestId};ts:${timestamp};`;
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secret),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);
const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(manifest));
const signature = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");

const validRequest = new Request("https://ansendmusic.site/api/webhooks/mercado-pago", {
  method: "POST",
  headers: {
    "x-request-id": requestId,
    "x-signature": `ts=${timestamp},v1=${signature}`,
  },
});

assert.equal(await verifyMercadoPagoSignature(validRequest, { MERCADO_PAGO_WEBHOOK_SECRET: secret }, paymentId), true);
assert.equal(await verifyMercadoPagoSignature(validRequest, { MERCADO_PAGO_WEBHOOK_SECRET: "wrong-secret" }, paymentId), false);
assert.equal(await verifyMercadoPagoSignature(validRequest, {}, paymentId), false);

console.log("Mercado Pago webhook HMAC signature checks passed.");
