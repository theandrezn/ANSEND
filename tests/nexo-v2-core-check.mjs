import assert from "node:assert/strict";
import {
  NEXO_HISTORY_TTL_MS,
  classifyNexoIntent,
  hasNexoHistoryExpired,
  normalizeNexoResponse,
  rankNexoCandidates,
  resolveNexoAction,
} from "../src/nexo/nexo-v2-core.mjs";

const trap = classifyNexoIntent("Quero um beat de trap sombrio ate R$ 100 em WAV");
assert.equal(trap.intent, "FIND_BEAT");
assert.deepEqual(trap.filters.genres, ["trap"]);
assert.equal(trap.filters.moods[0], "sombrio");
assert.equal(trap.filters.priceMax, 100);
assert.equal(trap.filters.formats[0], "wav");

assert.equal(classifyNexoIntent("abre o carrinho").intent, "NAVIGATE");
assert.equal(classifyNexoIntent("analisa meu perfil").intent, "PROFILE_ANALYSIS");
assert.equal(classifyNexoIntent("me mostre algo em alta").intent, "TRENDING_DISCOVERY");

const ranked = rankNexoCandidates([
  { id: "a", creatorId: "creator-1", relevance: 0.95, views: 5, completionRate: 0.9, trendVelocity: 0.8, available: true },
  { id: "b", creatorId: "creator-2", relevance: 0.2, views: 999999, completionRate: 0.1, trendVelocity: 0.1, available: true },
  { id: "c", creatorId: "creator-1", relevance: 0.9, views: 8, completionRate: 0.8, trendVelocity: 0.7, available: true },
  { id: "d", creatorId: "creator-1", relevance: 0.85, views: 7, completionRate: 0.8, trendVelocity: 0.6, available: true },
], { intent: "FIND_BEAT", limit: 3 });
assert.equal(ranked[0].id, "a", "views alone must not dominate ranking");
assert.equal(ranked.length, 3);
assert.ok(ranked.filter((item) => item.creatorId === "creator-1").length <= 2, "creator diversity must be enforced");
assert.ok(ranked.every((item) => item.scoreComponents && Number.isFinite(item.score)));

const response = normalizeNexoResponse({
  intent: "FIND_BEAT",
  answer: "x".repeat(400),
  items: Array.from({ length: 6 }, (_, index) => ({
    entity_type: "beat",
    entity_id: `beat-${index}`,
    title: `Beat ${index}`,
    reason: "r".repeat(140),
  })),
  suggested_replies: ["A", "B", "C", "D"],
});
assert.equal(response.answer.length, 280);
assert.equal(response.items.length, 3);
assert.equal(response.items[0].reason.length, 90);
assert.equal(response.suggested_replies.length, 3);

const beatId = "00000000-0000-4000-8000-000000000001";
assert.deepEqual(resolveNexoAction("BEAT_DETAIL", { beatId }), { ok: true, hash: `beat-${beatId}` });
assert.deepEqual(resolveNexoAction("CART", {}), { ok: true, hash: "carrinho" });
assert.equal(resolveNexoAction("BEAT_DETAIL", { beatId: "not-an-id" }).ok, false);
assert.equal(resolveNexoAction("INVENTED_ROUTE", {}).ok, false);

assert.equal(NEXO_HISTORY_TTL_MS, 6 * 60 * 60 * 1000);
assert.equal(hasNexoHistoryExpired(new Date(Date.now() - NEXO_HISTORY_TTL_MS - 1).toISOString()), true);
assert.equal(hasNexoHistoryExpired(new Date().toISOString()), false);

console.log("NEXO 2.0 core check passed");
