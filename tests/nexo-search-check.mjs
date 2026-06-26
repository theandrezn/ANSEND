import assert from "node:assert/strict";
import fs from "node:fs";
import {
  validateNexoSearchRequest,
} from "../src/nexo/search/schema.mjs";
import {
  normalizeNexoSearchFilters,
  normalizeSearchValue,
} from "../src/nexo/search/normalize.mjs";
import {
  NEXO_BEAT_SEARCH_WEIGHTS,
  buildNexoRelaxationOptions,
  diversifyNexoResults,
  scoreNexoBeat,
} from "../src/nexo/search/ranking.mjs";
import {
  NEXO_BEAT_SEARCH_VERSION,
  searchNexoEntities,
} from "../src/nexo/search/service.mjs";

const UUIDS = {
  producerA: "00000000-0000-4000-8000-000000000001",
  producerB: "00000000-0000-4000-8000-000000000002",
  producerC: "00000000-0000-4000-8000-000000000003",
  beatA: "00000000-0000-4000-8000-000000000011",
  beatB: "00000000-0000-4000-8000-000000000012",
  beatC: "00000000-0000-4000-8000-000000000013",
  beatD: "00000000-0000-4000-8000-000000000014",
  licenseA: "00000000-0000-4000-8000-000000000021",
  licenseB: "00000000-0000-4000-8000-000000000022",
  licenseC: "00000000-0000-4000-8000-000000000023",
  licenseD: "00000000-0000-4000-8000-000000000024",
};

function producer(id, displayName) {
  return {
    id,
    display_name: displayName,
    username: displayName.toLowerCase().replace(/\s+/g, "-"),
    avatar_url: `https://cdn.example/${id}.webp`,
    is_public: true,
    account_status: "active",
    is_blocked: false,
  };
}

function candidate({
  id,
  producerId,
  title,
  priceCents,
  genre = "Trap",
  subgenre = "Trap Melódico",
  mood = "Sombrio",
  tags = ["melodic", "night"],
  bpm = 140,
  musicalKey = "C Minor",
  licenseKey = "premium",
  publishedAt = "2026-06-01T00:00:00.000Z",
  previewUrl,
  status = "published",
  isPublic = true,
  soldExclusively = false,
} = {}) {
  return {
    beat: {
      id,
      user_id: producerId,
      title,
      description: `${title} ${genre} ${subgenre} ${mood}`,
      genre,
      subgenre,
      mood,
      tags,
      bpm,
      musical_key: musicalKey,
      status,
      is_public: isPublic,
      sold_exclusively: soldExclusively,
      cover_url: `https://cdn.example/${id}.webp`,
      audio_url: previewUrl || `https://cdn.example/${id}.mp3`,
      source_type: "upload",
      published_at: publishedAt,
      created_at: publishedAt,
      updated_at: publishedAt,
    },
    producer: producer(producerId, `Produtor ${producerId.slice(-1)}`),
    licenses: [{
      id: {
        [UUIDS.beatA]: UUIDS.licenseA,
        [UUIDS.beatB]: UUIDS.licenseB,
        [UUIDS.beatC]: UUIDS.licenseC,
        [UUIDS.beatD]: UUIDS.licenseD,
      }[id] || UUIDS.licenseA,
      beat_id: id,
      license_key: licenseKey,
      name: licenseKey,
      price_cents: priceCents,
      currency: "BRL",
      is_active: true,
      is_custom: false,
      sort_order: 0,
    }],
    authorized: true,
  };
}

const fixtures = [
  candidate({
    id: UUIDS.beatA,
    producerId: UUIDS.producerA,
    title: "Noite Melódica",
    priceCents: 14990,
    bpm: 142,
  }),
  candidate({
    id: UUIDS.beatB,
    producerId: UUIDS.producerB,
    title: "Trap Lunar",
    priceCents: 9900,
    bpm: 128,
    tags: ["melodic", "space"],
    publishedAt: "2026-05-20T00:00:00.000Z",
  }),
  candidate({
    id: UUIDS.beatC,
    producerId: UUIDS.producerC,
    title: "Drill Frio",
    priceCents: 8900,
    genre: "Drill",
    subgenre: "UK Drill",
    mood: "Agressivo",
    tags: ["drill", "cold"],
    bpm: 145,
    licenseKey: "basic",
    publishedAt: "2026-04-01T00:00:00.000Z",
  }),
  candidate({
    id: UUIDS.beatD,
    producerId: UUIDS.producerA,
    title: "Trap Privado",
    priceCents: 7900,
    status: "draft",
    isPublic: false,
  }),
];

const validRequest = {
  entity_type: "beat",
  query: "trap melódico",
  genres: ["Trap"],
  subgenres: ["trap-melodico"],
  moods: [],
  tags: [],
  min_price: null,
  max_price: 300,
  bpm_min: null,
  bpm_max: null,
  musical_key: null,
  license_types: [],
  producer_id: null,
  sort: "relevance",
  limit: 3,
  cursor: null,
};

const validated = validateNexoSearchRequest(validRequest);
assert.equal(validated.valid, true);
assert.equal(validated.request.limit, 3);

for (const [name, patch] of [
  ["entity type", { entity_type: "album" }],
  ["limit", { limit: 4 }],
  ["negative price", { min_price: -1 }],
  ["price range", { min_price: 400, max_price: 300 }],
  ["low BPM", { bpm_min: 20 }],
  ["high BPM", { bpm_max: 300 }],
  ["BPM range", { bpm_min: 160, bpm_max: 120 }],
  ["producer ID", { producer_id: "invalid" }],
  ["large list", { genres: Array.from({ length: 9 }, (_, index) => `genre-${index}`) }],
  ["long query", { query: "x".repeat(161) }],
  ["cursor", { cursor: "next-page" }],
  ["sort", { sort: "random" }],
  ["unknown field", { arbitrary_sql: "select * from profiles" }],
]) {
  const result = validateNexoSearchRequest({ ...validRequest, ...patch });
  assert.equal(result.valid, false, `${name} must be rejected`);
  assert.equal(result.error.code, "invalid_request");
}

const unsupported = validateNexoSearchRequest({ ...validRequest, entity_type: "professional" });
assert.equal(unsupported.valid, true, "known future entity types remain valid at schema level");

assert.equal(normalizeSearchValue("  Trap Melódico  "), "trap_melodico");
assert.equal(normalizeSearchValue("TRAP-MELODICO"), "trap_melodico");
assert.equal(normalizeSearchValue("trap__melódico"), "trap_melodico");
assert.equal(normalizeSearchValue("R&B"), "rnb");
assert.notEqual(normalizeSearchValue("C#m"), normalizeSearchValue("C minor"));

const normalized = normalizeNexoSearchFilters(validRequest);
assert.deepEqual(normalized.genres, [{ raw: "Trap", normalized: "trap" }]);
assert.deepEqual(normalized.subgenres, [{ raw: "trap-melodico", normalized: "trap_melodico" }]);
assert.equal(normalized.max_price_cents, 30000);
assert.deepEqual(normalized.query_tokens, ["trap", "melodico"]);
assert.equal(normalized.currency, "BRL");

const weightTotal = Object.values(NEXO_BEAT_SEARCH_WEIGHTS).reduce((sum, value) => sum + value, 0);
assert.equal(Number(weightTotal.toFixed(8)), 1);
assert.equal(NEXO_BEAT_SEARCH_WEIGHTS.behavior, 0);

const normalizedForScore = normalizeNexoSearchFilters(validRequest);
const exactScore = scoreNexoBeat(fixtures[0], normalizedForScore, { now: Date.parse("2026-06-25T00:00:00.000Z") });
const partialScore = scoreNexoBeat(fixtures[2], normalizeNexoSearchFilters({
  ...validRequest,
  query: "trap drill",
  genres: [],
  subgenres: [],
  max_price: null,
}), { now: Date.parse("2026-06-25T00:00:00.000Z") });
assert.ok(exactScore.total > partialScore.total, "exact genre and subgenre match must rank higher");
assert.ok(exactScore.total >= 0 && exactScore.total <= 1);
assert.equal(exactScore.components.behavior, 0);
assert.equal(exactScore.component_status.behavior, "unavailable");
assert.ok(exactScore.matching_reasons.some((reason) => reason.code === "genre_exact_match"));
assert.ok(exactScore.matching_reasons.some((reason) => reason.code === "within_budget"));

const duplicatePreview = {
  ...fixtures[0],
  beat: { ...fixtures[0].beat, id: "00000000-0000-4000-8000-000000000099" },
};
const diversified = diversifyNexoResults([
  { id: UUIDS.beatA, producer: { id: UUIDS.producerA }, preview_url: "a.mp3", score: { total: 0.91 } },
  { id: UUIDS.beatB, producer: { id: UUIDS.producerA }, preview_url: "b.mp3", score: { total: 0.90 } },
  { id: UUIDS.beatC, producer: { id: UUIDS.producerB }, preview_url: "c.mp3", score: { total: 0.89 } },
  { id: "00000000-0000-4000-8000-000000000099", producer: { id: UUIDS.producerC }, preview_url: "a.mp3", score: { total: 0.88 } },
], { limit: 3, maxPerProducer: 2, closeScoreDelta: 0.05 });
assert.equal(diversified.length, 3);
assert.equal(new Set(diversified.map((item) => item.preview_url)).size, 3);
assert.equal(diversified[1].producer.id, UUIDS.producerB, "different producer is preferred when scores are close");

const searchContext = {
  candidates: fixtures,
  now: Date.parse("2026-06-25T00:00:00.000Z"),
  requestId: "00000000-0000-4000-8000-000000000100",
};

const trapUnder300 = await searchNexoEntities(validRequest, searchContext);
assert.equal(trapUnder300.success, true);
assert.equal(trapUnder300.response.results.length, 2);
assert.ok(trapUnder300.response.results.every((item) => item.price.minimum_cents <= 30000));
assert.ok(trapUnder300.response.results.every((item) => item.genre === "Trap"));
assert.equal(trapUnder300.response.ranking_version, NEXO_BEAT_SEARCH_VERSION);
assert.equal(trapUnder300.response.relaxed_filters.length, 0);

const cases = [
  ["trap without price", { ...validRequest, query: "", subgenres: [], max_price: null }, 2],
  ["under 100", { ...validRequest, query: "", subgenres: [], max_price: 100 }, 1],
  ["BPM range", { ...validRequest, query: "", subgenres: [], max_price: null, bpm_min: 120, bpm_max: 150 }, 2],
  ["premium", { ...validRequest, query: "", subgenres: [], max_price: null, license_types: ["premium"] }, 2],
  ["producer", { ...validRequest, query: "", subgenres: [], max_price: null, producer_id: UUIDS.producerB }, 1],
  ["text only", { ...validRequest, query: "lunar", genres: [], subgenres: [], max_price: null }, 1],
  ["filters only", { ...validRequest, query: "", subgenres: [], max_price: null, musical_key: "C minor" }, 2],
  ["minimum price", { ...validRequest, query: "", subgenres: [], min_price: 120, max_price: null }, 1],
  ["mood", { ...validRequest, query: "", subgenres: [], moods: ["sombrio"], max_price: null }, 2],
  ["tag", { ...validRequest, query: "", subgenres: [], tags: ["space"], max_price: null }, 1],
];
for (const [name, request, expected] of cases) {
  const response = await searchNexoEntities(request, searchContext);
  assert.equal(response.success, true, `${name} search must succeed`);
  assert.equal(response.response.total_candidates, expected, `${name} candidate count`);
}

const priceAscending = await searchNexoEntities({
  ...validRequest,
  query: "",
  subgenres: [],
  max_price: null,
  sort: "price_asc",
}, searchContext);
assert.equal(priceAscending.response.results[0].id, UUIDS.beatB);

const priceDescending = await searchNexoEntities({
  ...validRequest,
  query: "",
  subgenres: [],
  max_price: null,
  sort: "price_desc",
}, searchContext);
assert.equal(priceDescending.response.results[0].id, UUIDS.beatA);

const newest = await searchNexoEntities({
  ...validRequest,
  query: "",
  subgenres: [],
  max_price: null,
  sort: "newest",
}, searchContext);
assert.equal(newest.response.results[0].id, UUIDS.beatA);

const noTextMatch = await searchNexoEntities({
  ...validRequest,
  query: "jazz",
  genres: [],
  subgenres: [],
  max_price: null,
}, searchContext);
assert.equal(noTextMatch.response.zero_result, true);
assert.equal(noTextMatch.response.results.length, 0);

const stopwordsOnly = await searchNexoEntities({
  ...validRequest,
  query: "quero um beat",
  genres: [],
  subgenres: [],
  max_price: null,
}, searchContext);
assert.equal(stopwordsOnly.response.zero_result, true);

const rapMustNotMatchTrap = await searchNexoEntities({
  ...validRequest,
  query: "rap",
  genres: [],
  subgenres: [],
  max_price: null,
}, searchContext);
assert.equal(rapMustNotMatchTrap.response.zero_result, true);

const tooCheap = await searchNexoEntities({
  ...validRequest,
  query: "",
  subgenres: [],
  max_price: 50,
}, searchContext);
assert.equal(tooCheap.response.zero_result, true);
assert.deepEqual(tooCheap.response.relaxed_filters, []);
assert.ok(tooCheap.response.relaxation_options.some((option) => (
  option.type === "increase_max_price" && option.suggested_value === 99
)));

const absentSubgenre = await searchNexoEntities({
  ...validRequest,
  query: "",
  subgenres: ["rage"],
  max_price: null,
}, searchContext);
assert.equal(absentSubgenre.response.zero_result, true);
assert.ok(absentSubgenre.response.relaxation_options.some((option) => (
  option.type === "remove_filter" && option.field === "subgenres"
)));

const futureEntity = await searchNexoEntities({ ...validRequest, entity_type: "service" }, searchContext);
assert.equal(futureEntity.success, false);
assert.equal(futureEntity.error.code, "unsupported_entity_type");

const tooManyCandidates = await searchNexoEntities(validRequest, {
  ...searchContext,
  candidates: Array.from({ length: 121 }, (_, index) => (
    candidate({
      id: `00000000-0000-4000-8000-${String(index + 200).padStart(12, "0")}`,
      producerId: UUIDS.producerA,
      title: `Beat ${index}`,
      priceCents: 10000,
    })
  )),
});
assert.equal(tooManyCandidates.success, false);
assert.equal(tooManyCandidates.error.code, "candidate_limit_exceeded");

const relaxations = buildNexoRelaxationOptions(fixtures, normalizeNexoSearchFilters({
  ...validRequest,
  query: "",
  subgenres: [],
  max_price: 50,
}));
assert.ok(relaxations.some((option) => option.type === "increase_max_price"));

assert.equal(duplicatePreview.beat.audio_url, fixtures[0].beat.audio_url);

const worker = fs.readFileSync(new URL("../src/worker.mjs", import.meta.url), "utf8");
const searchHandlerStart = worker.indexOf("async function handleNexoSearch");
const searchHandlerEnd = worker.indexOf("async function", searchHandlerStart + 20);
const searchHandler = worker.slice(searchHandlerStart, searchHandlerEnd);
assert.ok(searchHandlerStart >= 0, "Worker must expose handleNexoSearch");
assert.ok(worker.includes('url.pathname === "/api/nexo/search"'));
assert.ok(worker.includes("searchNexoEntities"));
assert.ok(worker.includes("NEXO_SEARCH_MAX_CANDIDATES"));
assert.ok(worker.includes("limit=121"));
assert.ok(searchHandler.includes("requireAuthenticatedUser"));
assert.ok(searchHandler.includes("12_000"));
assert.ok(searchHandler.includes("limit: 20"));
assert.ok(!/OPENAI|embedding|prompt/i.test(searchHandler), "search handler must not depend on generative AI");

console.log("NEXO deterministic search checks passed");
