import assert from "node:assert/strict";
import { isMercadoPagoPaymentNotification } from "../src/worker.mjs";

assert.equal(isMercadoPagoPaymentNotification(new URL("https://example.com/hook?type=payment"), {}), true);
assert.equal(isMercadoPagoPaymentNotification(new URL("https://example.com/hook"), { type: "payment" }), true);
assert.equal(isMercadoPagoPaymentNotification(new URL("https://example.com/hook?type=order"), { type: "order" }), false);
assert.equal(isMercadoPagoPaymentNotification(new URL("https://example.com/hook"), { type: "topic_chargebacks_wh" }), false);
assert.equal(isMercadoPagoPaymentNotification(new URL("https://example.com/hook"), {}), false);

console.log("Mercado Pago webhook topic filtering passed.");
