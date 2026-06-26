const VALUE_ALIASES = Object.freeze({
  "r_b": "rnb",
  "r_and_b": "rnb",
  "rhythm_and_blues": "rnb",
  "trap_melodico": "trap_melodico",
  "melodic_trap": "trap_melodico",
  "uk_drill": "uk_drill",
  "c_min": "c_minor",
});

const QUERY_STOPWORDS = new Set([
  "a",
  "ate",
  "beat",
  "beats",
  "com",
  "de",
  "do",
  "e",
  "em",
  "me",
  "mostre",
  "o",
  "para",
  "por",
  "quero",
  "sem",
  "um",
  "uma",
]);

export function normalizeNexoText(value = "", separator = "_") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`${separator}+`, "g"), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");
}

export function normalizeSearchValue(value = "") {
  const normalized = normalizeNexoText(value);
  return VALUE_ALIASES[normalized] || normalized;
}

function normalizeList(values = []) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    const normalized = normalizeSearchValue(value);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push({ raw: String(value).trim(), normalized });
  }
  return output;
}

function priceToCents(value) {
  if (value === null || value === undefined) return null;
  return Math.round(Number(value) * 100);
}

export function normalizeNexoSearchFilters(input = {}) {
  const queryRaw = String(input.query || "").trim();
  const queryNormalized = normalizeNexoText(queryRaw, " ");
  const queryTokens = [...new Set(queryNormalized
    .split(/\s+/)
    .map((token) => normalizeSearchValue(token))
    .filter((token) => token.length >= 2 && !QUERY_STOPWORDS.has(token)))];

  return {
    entity_type: input.entity_type || "beat",
    query: { raw: queryRaw, normalized: queryNormalized },
    query_tokens: queryTokens,
    genres: normalizeList(input.genres),
    subgenres: normalizeList(input.subgenres),
    moods: normalizeList(input.moods),
    tags: normalizeList(input.tags),
    min_price: input.min_price ?? null,
    max_price: input.max_price ?? null,
    min_price_cents: priceToCents(input.min_price),
    max_price_cents: priceToCents(input.max_price),
    bpm_min: input.bpm_min ?? null,
    bpm_max: input.bpm_max ?? null,
    musical_key: input.musical_key ? {
      raw: String(input.musical_key).trim(),
      normalized: normalizeSearchValue(input.musical_key),
    } : null,
    license_types: normalizeList(input.license_types),
    producer_id: input.producer_id || null,
    sort: input.sort || "relevance",
    limit: input.limit || 3,
    cursor: null,
    currency: "BRL",
  };
}

export function normalizedValues(values = []) {
  return values.map((value) => value.normalized);
}
