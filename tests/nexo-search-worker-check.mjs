import assert from "node:assert/strict";
import worker from "../src/worker.mjs";

const originalFetch = globalThis.fetch;
const originalInfo = console.info;
const calls = [];
const beatId = "00000000-0000-4000-8000-000000000011";
const producerId = "00000000-0000-4000-8000-000000000001";
const licenseId = "00000000-0000-4000-8000-000000000021";

globalThis.fetch = async (input, init = {}) => {
  const url = String(input);
  calls.push({ url, init });
  if (url.endsWith("/auth/v1/user")) {
    return Response.json({ id: "00000000-0000-4000-8000-000000000099" });
  }
  if (url.includes("/rest/v1/beats?")) {
    return Response.json([{
      id: beatId,
      user_id: producerId,
      title: "Noite Melódica",
      producer_name: "Produtor Real",
      description: "Trap melódico em 142 BPM.",
      genre: "Trap",
      subgenre: "Trap Melódico",
      mood: "Sombrio",
      tags: ["melodic", "night"],
      bpm: 142,
      musical_key: "C Minor",
      status: "published",
      is_public: true,
      sold_exclusively: false,
      cover_url: "https://cdn.example/cover.webp",
      youtube_thumbnail_url: null,
      audio_url: "https://cdn.example/preview.mp3",
      youtube_url: null,
      youtube_embed_url: null,
      source_type: "upload",
      published_at: "2026-06-01T00:00:00.000Z",
      created_at: "2026-06-01T00:00:00.000Z",
      updated_at: "2026-06-01T00:00:00.000Z",
      audio_path: "private/path/that/must/not/leak.mp3",
    }]);
  }
  if (url.includes("/rest/v1/beat_licenses?")) {
    return Response.json([{
      id: licenseId,
      beat_id: beatId,
      license_key: "premium",
      name: "Premium",
      price_cents: 14990,
      currency: "BRL",
      is_active: true,
      is_custom: false,
      sort_order: 0,
      custom_terms: "private terms that must not leak",
    }]);
  }
  if (url.includes("/rest/v1/public_profiles?")) {
    return Response.json([{
      id: producerId,
      username: "produtor-real",
      display_name: "Produtor Real",
      artistic_name: "Produtor Real",
      account_role: "produtor",
      avatar_url: "https://cdn.example/avatar.webp",
      bio: "Trap e drill.",
      music_styles: ["Trap"],
      is_public: true,
      email: "private@example.com",
    }]);
  }
  throw new Error(`Unexpected fetch: ${url}`);
};
console.info = () => {};

const env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "publishable-test-key",
  ASSETS: { fetch: async () => new Response("not used", { status: 404 }) },
};

try {
  const unauthorized = await worker.fetch(new Request("https://ansend.test/api/nexo/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity_type: "beat" }),
  }), env);
  assert.equal(unauthorized.status, 401);
  assert.equal((await unauthorized.json()).error.code, "unauthorized");

  const requestBody = {
    entity_type: "beat",
    query: "trap melodico",
    genres: ["trap"],
    subgenres: ["trap melodico"],
    moods: [],
    tags: [],
    min_price: null,
    max_price: 300,
    bpm_min: null,
    bpm_max: null,
    musical_key: null,
    license_types: ["premium"],
    producer_id: null,
    sort: "relevance",
    limit: 3,
    cursor: null,
  };
  const searchRequest = () => new Request("https://ansend.test/api/nexo/search", {
    method: "POST",
    headers: {
      Authorization: "Bearer valid-session-token",
      "CF-Connecting-IP": "203.0.113.10",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const response = await worker.fetch(searchRequest(), env);
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.success, true);
  assert.equal(payload.response.results.length, 1);
  assert.equal(payload.response.results[0].id, beatId);
  assert.equal(payload.response.results[0].price.minimum_cents, 14990);
  assert.equal(payload.response.results[0].producer.id, producerId);
  assert.ok(payload.response.results[0].matching_reasons.some((reason) => reason.code === "within_budget"));
  assert.equal(payload.response.ranking_version, "nexo-beat-search-v1");
  assert.equal(payload.response.relaxed_filters.length, 0);

  const serialized = JSON.stringify(payload);
  assert.ok(!serialized.includes("private@example.com"));
  assert.ok(!serialized.includes("private/path"));
  assert.ok(!serialized.includes("private terms"));
  assert.ok(!serialized.includes("audio_path"));
  assert.ok(!serialized.includes("custom_terms"));

  const restCalls = calls.filter((call) => call.url.includes("/rest/v1/"));
  assert.equal(restCalls.length, 3, "search endpoint must use exactly three Supabase REST calls");
  assert.ok(restCalls.every((call) => call.init.headers.Authorization === "Bearer valid-session-token"));
  assert.ok(restCalls.every((call) => call.init.headers.apikey === "publishable-test-key"));

  for (let index = 0; index < 19; index += 1) {
    const allowed = await worker.fetch(searchRequest(), env);
    assert.equal(allowed.status, 200);
  }
  const rateLimited = await worker.fetch(searchRequest(), env);
  assert.equal(rateLimited.status, 429);
  assert.equal((await rateLimited.json()).error.code, "rate_limited");
} finally {
  globalThis.fetch = originalFetch;
  console.info = originalInfo;
}

console.log("NEXO search Worker integration check passed");
