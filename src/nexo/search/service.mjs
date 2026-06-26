import { validateNexoSearchRequest } from "./schema.mjs";
import { normalizeNexoSearchFilters } from "./normalize.mjs";
import {
  buildNexoRelaxationOptions,
  candidateMatchesFilters,
  diversifyNexoResults,
  publicAppliedFilters,
  scoreNexoBeat,
} from "./ranking.mjs";

export const NEXO_BEAT_SEARCH_VERSION = "nexo-beat-search-v1";
export const NEXO_SEARCH_MAX_CANDIDATES = 120;

function failure(code, message, details = null) {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
}

function sortScored(scored, sort) {
  return [...scored].sort((left, right) => {
    if (sort === "price_asc") return left.item.price.minimum_cents - right.item.price.minimum_cents || right.total - left.total;
    if (sort === "price_desc") return right.item.price.minimum_cents - left.item.price.minimum_cents || right.total - left.total;
    if (sort === "newest") {
      const leftTime = Date.parse(left.source?.beat?.published_at || left.source?.beat?.created_at || "") || 0;
      const rightTime = Date.parse(right.source?.beat?.published_at || right.source?.beat?.created_at || "") || 0;
      return rightTime - leftTime || right.total - left.total;
    }
    return right.total - left.total || left.item.id.localeCompare(right.item.id);
  });
}

export async function searchNexoEntities(input, context = {}) {
  const validation = validateNexoSearchRequest(input);
  if (!validation.valid) return failure(validation.error.code, validation.error.message, validation.error);
  if (validation.request.entity_type !== "beat") {
    return failure("unsupported_entity_type", "A busca desta fase suporta somente beats.");
  }

  const candidates = Array.isArray(context.candidates) ? context.candidates : [];
  if (candidates.length > NEXO_SEARCH_MAX_CANDIDATES) {
    return failure("candidate_limit_exceeded", `A busca aceita no maximo ${NEXO_SEARCH_MAX_CANDIDATES} candidatos por lote.`);
  }

  const startedAt = performance.now();
  const filters = normalizeNexoSearchFilters(validation.request);
  const matched = candidates.filter((candidate) => candidateMatchesFilters(candidate, filters));
  const scored = matched.map((candidate) => ({
    ...scoreNexoBeat(candidate, filters, { now: context.now || Date.now() }),
    source: candidate,
  }));
  const sorted = sortScored(scored, filters.sort);
  const rankedResults = sorted.map(({ item, total, components, component_status, matching_reasons }) => ({
    ...item,
    score: { total, components, component_status },
    matching_reasons,
  }));
  const results = diversifyNexoResults(rankedResults, {
    limit: filters.limit,
    maxPerProducer: 2,
    closeScoreDelta: 0.05,
  });
  const zeroResult = matched.length === 0;

  return {
    success: true,
    response: {
      request_id: context.requestId || crypto.randomUUID(),
      entity_type: "beat",
      results,
      total_candidates: matched.length,
      applied_filters: publicAppliedFilters(filters),
      relaxed_filters: [],
      relaxation_options: zeroResult ? buildNexoRelaxationOptions(candidates, filters) : [],
      zero_result: zeroResult,
      reason: zeroResult ? "no_exact_matches" : null,
      ranking_version: NEXO_BEAT_SEARCH_VERSION,
      query_time_ms: Number((performance.now() - startedAt).toFixed(3)),
    },
  };
}
