import { normalizeSearchableBeat } from "../nexo-catalog-foundation.mjs";
import {
  normalizeNexoText,
  normalizeSearchValue,
  normalizedValues,
} from "./normalize.mjs";

export const NEXO_BEAT_SEARCH_WEIGHTS = Object.freeze({
  filter_match: 0.30,
  text_relevance: 0.30,
  price_fit: 0.15,
  metadata_quality: 0.15,
  freshness: 0.10,
  behavior: 0,
});

const clamp01 = (value) => Math.max(0, Math.min(1, Number(value || 0)));

function searchableItem(candidate) {
  return candidate?.beat
    ? normalizeSearchableBeat(candidate)
    : candidate;
}

function candidateValues(item) {
  return {
    genre: normalizeSearchValue(item.genre),
    subgenre: normalizeSearchValue(item.subgenre),
    moods: new Set((item.moods || []).map(normalizeSearchValue)),
    tags: new Set((item.tags || []).map(normalizeSearchValue)),
    musical_key: normalizeSearchValue(item.musical_key),
    licenses: new Set((item.available_license_types || []).map(normalizeSearchValue)),
    producer_id: item.producer?.id || "",
  };
}

export function candidateMatchesFilters(candidate, filters, { ignore = null } = {}) {
  const item = searchableItem(candidate);
  if (!item?.eligibility?.recommendable) return false;
  const values = candidateValues(item);
  const includesOne = (field, actual) => (
    ignore === field
    || !filters[field].length
    || filters[field].some((value) => actual.has ? actual.has(value.normalized) : actual === value.normalized)
  );

  if (!includesOne("genres", values.genre)) return false;
  if (!includesOne("subgenres", values.subgenre)) return false;
  if (!includesOne("moods", values.moods)) return false;
  if (!includesOne("tags", values.tags)) return false;
  if (!includesOne("license_types", values.licenses)) return false;
  if (ignore !== "musical_key" && filters.musical_key && values.musical_key !== filters.musical_key.normalized) return false;
  if (ignore !== "producer_id" && filters.producer_id && values.producer_id !== filters.producer_id) return false;
  if (ignore !== "bpm" && filters.bpm_min !== null && Number(item.bpm) < filters.bpm_min) return false;
  if (ignore !== "bpm" && filters.bpm_max !== null && Number(item.bpm) > filters.bpm_max) return false;
  if (!item.price) return false;
  if (ignore !== "price" && filters.min_price_cents !== null && item.price.minimum_cents < filters.min_price_cents) return false;
  if (ignore !== "price" && filters.max_price_cents !== null && item.price.minimum_cents > filters.max_price_cents) return false;

  if (ignore !== "query" && filters.query.raw && !filters.query_tokens.length) return false;
  if (ignore !== "query" && filters.query_tokens.length) {
    const haystack = normalizeNexoText([
      item.title,
      item.description,
      item.genre,
      item.subgenre,
      ...(item.moods || []),
      ...(item.tags || []),
      item.producer?.display_name,
    ].filter(Boolean).join(" "), " ");
    if (!filters.query_tokens.some((token) => haystack.split(/\s+/).includes(token))) return false;
  }
  return true;
}

function filterMatchScore(item, filters) {
  const values = candidateValues(item);
  const components = [];
  const listScore = (requested, actual) => {
    if (!requested.length) return null;
    const matches = requested.filter((value) => (
      actual.has ? actual.has(value.normalized) : actual === value.normalized
    )).length;
    return matches / requested.length;
  };
  for (const [requested, actual] of [
    [filters.genres, values.genre],
    [filters.subgenres, values.subgenre],
    [filters.moods, values.moods],
    [filters.tags, values.tags],
    [filters.license_types, values.licenses],
  ]) {
    const score = listScore(requested, actual);
    if (score !== null) components.push(score);
  }
  if (filters.musical_key) components.push(values.musical_key === filters.musical_key.normalized ? 1 : 0);
  if (filters.producer_id) components.push(values.producer_id === filters.producer_id ? 1 : 0);
  if (filters.bpm_min !== null || filters.bpm_max !== null) components.push(1);
  return components.length ? components.reduce((sum, value) => sum + value, 0) / components.length : 0.5;
}

function textRelevanceScore(item, filters) {
  if (!filters.query_tokens.length) return 0.5;
  const haystack = normalizeNexoText([
    item.title,
    item.description,
    item.genre,
    item.subgenre,
    ...(item.moods || []),
    ...(item.tags || []),
    item.producer?.display_name,
  ].filter(Boolean).join(" "), " ");
  const words = haystack.split(/\s+/);
  const matches = filters.query_tokens.filter((token) => words.includes(token)).length;
  const tokenScore = matches / filters.query_tokens.length;
  const phraseBonus = filters.query.normalized && haystack.includes(filters.query.normalized) ? 0.15 : 0;
  return clamp01(tokenScore * 0.85 + phraseBonus);
}

function priceFitScore(item, filters) {
  const price = Number(item.price?.minimum_cents);
  if (!Number.isFinite(price)) return 0;
  if (filters.max_price_cents !== null && filters.max_price_cents > 0) {
    const headroom = clamp01((filters.max_price_cents - price) / filters.max_price_cents);
    return 0.75 + headroom * 0.25;
  }
  if (filters.min_price_cents !== null) return price >= filters.min_price_cents ? 1 : 0;
  return 0.5;
}

function metadataQualityScore(item) {
  const checks = [
    item.cover_url,
    item.preview_url,
    item.description,
    item.genre,
    item.subgenre,
    item.bpm,
    item.musical_key,
    item.tags?.length,
    item.available_license_types?.length,
  ];
  return checks.filter(Boolean).length / checks.length;
}

function freshnessScore(candidate, now) {
  const timestamp = Date.parse(candidate?.beat?.published_at || candidate?.beat?.created_at || candidate?.published_at || candidate?.created_at || "");
  if (!Number.isFinite(timestamp)) return 0.2;
  const ageDays = Math.max(0, (now - timestamp) / 86_400_000);
  return clamp01(Math.max(0.2, 1 - ageDays / 365));
}

function matchingReasons(item, filters) {
  const values = candidateValues(item);
  const reasons = [];
  const pushMatches = (requested, actual, code) => {
    for (const value of requested) {
      if (actual.has ? actual.has(value.normalized) : actual === value.normalized) {
        reasons.push({ code, value: value.normalized });
      }
    }
  };
  pushMatches(filters.genres, values.genre, "genre_exact_match");
  pushMatches(filters.subgenres, values.subgenre, "subgenre_exact_match");
  pushMatches(filters.moods, values.moods, "mood_match");
  pushMatches(filters.tags, values.tags, "tag_match");
  pushMatches(filters.license_types, values.licenses, "license_type_match");
  if (filters.musical_key && values.musical_key === filters.musical_key.normalized) {
    reasons.push({ code: "musical_key_match", value: filters.musical_key.normalized });
  }
  if (filters.producer_id && values.producer_id === filters.producer_id) {
    reasons.push({ code: "producer_match", value: filters.producer_id });
  }
  if ((filters.bpm_min !== null || filters.bpm_max !== null) && item.bpm !== null) {
    reasons.push({ code: "bpm_in_range", value: item.bpm });
  }
  if (filters.max_price_cents !== null && item.price?.minimum_cents <= filters.max_price_cents) {
    reasons.push({ code: "within_budget", value: item.price.minimum_cents / 100 });
  }
  if (filters.query_tokens.length) {
    const text = normalizeNexoText([
      item.title,
      item.description,
      item.genre,
      item.subgenre,
      ...(item.moods || []),
      ...(item.tags || []),
      item.producer?.display_name,
    ].filter(Boolean).join(" "), " ");
    const matched = filters.query_tokens.filter((token) => text.split(/\s+/).includes(token));
    if (matched.length) reasons.push({ code: "text_match", value: matched });
  }
  return reasons.slice(0, 8);
}

export function scoreNexoBeat(candidate, filters, { now = Date.now() } = {}) {
  const item = searchableItem(candidate);
  const components = {
    filter_match: clamp01(filterMatchScore(item, filters)),
    text_relevance: clamp01(textRelevanceScore(item, filters)),
    price_fit: clamp01(priceFitScore(item, filters)),
    metadata_quality: clamp01(metadataQualityScore(item)),
    freshness: clamp01(freshnessScore(candidate, now)),
    behavior: 0,
  };
  const total = Object.entries(NEXO_BEAT_SEARCH_WEIGHTS)
    .reduce((sum, [key, weight]) => sum + components[key] * weight, 0);
  return {
    total: Number(clamp01(total).toFixed(6)),
    components,
    component_status: { behavior: "unavailable" },
    matching_reasons: matchingReasons(item, filters),
    item,
  };
}

export function diversifyNexoResults(candidates = [], {
  limit = 3,
  maxPerProducer = 2,
  closeScoreDelta = 0.05,
} = {}) {
  const unique = [];
  const ids = new Set();
  const previews = new Set();
  for (const candidate of candidates) {
    if (!candidate?.id || ids.has(candidate.id)) continue;
    if (candidate.preview_url && previews.has(candidate.preview_url)) continue;
    ids.add(candidate.id);
    if (candidate.preview_url) previews.add(candidate.preview_url);
    unique.push(candidate);
  }

  const remaining = [...unique];
  const selected = [];
  const producerCounts = new Map();
  while (remaining.length && selected.length < limit) {
    const best = remaining[0];
    const usedProducers = new Set(selected.map((item) => item.producer?.id).filter(Boolean));
    const diverseIndex = remaining.findIndex((item) => (
      item.producer?.id
      && !usedProducers.has(item.producer.id)
      && Number(best.score?.total || 0) - Number(item.score?.total || 0) <= closeScoreDelta
    ));
    const index = diverseIndex >= 0 ? diverseIndex : remaining.findIndex((item) => (
      (producerCounts.get(item.producer?.id || item.id) || 0) < maxPerProducer
    ));
    if (index < 0) break;
    const [picked] = remaining.splice(index, 1);
    const producerId = picked.producer?.id || picked.id;
    const count = producerCounts.get(producerId) || 0;
    if (count >= maxPerProducer) continue;
    producerCounts.set(producerId, count + 1);
    selected.push(picked);
  }
  return selected;
}

export function buildNexoRelaxationOptions(candidates = [], filters) {
  const eligible = candidates.filter((candidate) => searchableItem(candidate)?.eligibility?.recommendable);
  const options = [];
  if (filters.max_price_cents !== null) {
    const prices = eligible
      .filter((candidate) => candidateMatchesFilters(candidate, filters, { ignore: "price" }))
      .map((candidate) => searchableItem(candidate).price?.minimum_cents)
      .filter((price) => Number.isInteger(price) && price > filters.max_price_cents)
      .sort((left, right) => left - right);
    if (prices.length) {
      options.push({ type: "increase_max_price", suggested_value: prices[0] / 100 });
    }
  }

  for (const field of ["genres", "subgenres", "moods", "tags", "license_types"]) {
    if (!filters[field].length) continue;
    if (eligible.some((candidate) => candidateMatchesFilters(candidate, filters, { ignore: field }))) {
      options.push({ type: "remove_filter", field });
    }
  }
  for (const field of ["musical_key", "producer_id"]) {
    if (!filters[field]) continue;
    if (eligible.some((candidate) => candidateMatchesFilters(candidate, filters, { ignore: field }))) {
      options.push({ type: "remove_filter", field });
    }
  }
  if ((filters.bpm_min !== null || filters.bpm_max !== null)
    && eligible.some((candidate) => candidateMatchesFilters(candidate, filters, { ignore: "bpm" }))) {
    options.push({ type: "remove_filter", field: "bpm" });
  }
  return options.slice(0, 4);
}

export function publicAppliedFilters(filters) {
  return {
    query: filters.query.normalized,
    genres: normalizedValues(filters.genres),
    subgenres: normalizedValues(filters.subgenres),
    moods: normalizedValues(filters.moods),
    tags: normalizedValues(filters.tags),
    min_price: filters.min_price,
    max_price: filters.max_price,
    bpm_min: filters.bpm_min,
    bpm_max: filters.bpm_max,
    musical_key: filters.musical_key?.normalized || null,
    license_types: normalizedValues(filters.license_types),
    producer_id: filters.producer_id,
    sort: filters.sort,
    limit: filters.limit,
    currency: filters.currency,
  };
}
