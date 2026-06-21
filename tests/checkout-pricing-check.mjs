import assert from "node:assert/strict";
import {
  applyPromotionDiscounts,
  sanitizeIdentification,
  timingSafeHexEqual,
} from "../src/worker.mjs";

const standard = [1000, 2000, 3000].map((price_cents) => ({ producer: "Produtor A", price_cents, discount_cents: 0 }));
applyPromotionDiscounts(standard);
assert.deepEqual(standard.map((item) => item.discount_cents), [1000, 0, 0], "A cada tres beats, o mais barato deve ser gratuito");

const golamixaya = [1000, 2000, 3000, 4000, 5000].map((price_cents) => ({ producer: "Golamixaya", price_cents, discount_cents: 0 }));
applyPromotionDiscounts(golamixaya);
assert.deepEqual(golamixaya.map((item) => item.discount_cents), [1000, 2000, 3000, 4000, 0], "A promocao especial deve preservar a regra atual");

assert.equal(sanitizeIdentification("123.456.789-09"), "12345678909");
assert.equal(sanitizeIdentification("12.345.678/0001-99"), "12345678000199");
assert.equal(timingSafeHexEqual("abc123", "abc123"), true);
assert.equal(timingSafeHexEqual("abc123", "abc124"), false);
assert.equal(timingSafeHexEqual("short", "longer"), false);

console.log("Authoritative checkout pricing helpers passed.");

