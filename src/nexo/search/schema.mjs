const ALLOWED_FIELDS = new Set([
  "entity_type",
  "query",
  "genres",
  "subgenres",
  "moods",
  "tags",
  "min_price",
  "max_price",
  "bpm_min",
  "bpm_max",
  "musical_key",
  "license_types",
  "producer_id",
  "sort",
  "limit",
  "cursor",
]);

const ENTITY_TYPES = new Set(["beat", "professional", "service"]);
const SORT_VALUES = new Set(["relevance", "price_asc", "price_desc", "newest"]);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const invalid = (message, field = null) => ({
  valid: false,
  error: {
    code: "invalid_request",
    message,
    ...(field ? { field } : {}),
  },
});

function validateStringList(value, field) {
  if (!Array.isArray(value)) return invalid(`${field} deve ser uma lista.`, field);
  if (value.length > 8) return invalid(`${field} aceita no maximo 8 valores.`, field);
  if (value.some((item) => typeof item !== "string" || !item.trim() || item.length > 80)) {
    return invalid(`${field} contem um valor invalido.`, field);
  }
  return null;
}

function validatePrice(value, field) {
  if (value === null) return null;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return invalid(`${field} deve ser um numero nao negativo.`, field);
  }
  return null;
}

function validateBpm(value, field) {
  if (value === null) return null;
  if (!Number.isInteger(value) || value < 40 || value > 240) {
    return invalid(`${field} deve ser um inteiro entre 40 e 240.`, field);
  }
  return null;
}

export function validateNexoSearchRequest(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return invalid("Envie um objeto de busca valido.");
  }

  const unknown = Object.keys(input).find((key) => !ALLOWED_FIELDS.has(key));
  if (unknown) return invalid(`Campo desconhecido: ${unknown}.`, unknown);

  const request = {
    entity_type: input.entity_type ?? "beat",
    query: input.query ?? "",
    genres: input.genres ?? [],
    subgenres: input.subgenres ?? [],
    moods: input.moods ?? [],
    tags: input.tags ?? [],
    min_price: input.min_price ?? null,
    max_price: input.max_price ?? null,
    bpm_min: input.bpm_min ?? null,
    bpm_max: input.bpm_max ?? null,
    musical_key: input.musical_key ?? null,
    license_types: input.license_types ?? [],
    producer_id: input.producer_id ?? null,
    sort: input.sort ?? "relevance",
    limit: input.limit ?? 3,
    cursor: input.cursor ?? null,
  };

  if (!ENTITY_TYPES.has(request.entity_type)) return invalid("entity_type nao permitido.", "entity_type");
  if (typeof request.query !== "string" || request.query.length > 160) {
    return invalid("query deve ser texto com ate 160 caracteres.", "query");
  }

  for (const field of ["genres", "subgenres", "moods", "tags", "license_types"]) {
    const error = validateStringList(request[field], field);
    if (error) return error;
  }

  for (const field of ["min_price", "max_price"]) {
    const error = validatePrice(request[field], field);
    if (error) return error;
  }
  if (request.min_price !== null && request.max_price !== null && request.min_price > request.max_price) {
    return invalid("min_price nao pode ser maior que max_price.", "min_price");
  }

  for (const field of ["bpm_min", "bpm_max"]) {
    const error = validateBpm(request[field], field);
    if (error) return error;
  }
  if (request.bpm_min !== null && request.bpm_max !== null && request.bpm_min > request.bpm_max) {
    return invalid("bpm_min nao pode ser maior que bpm_max.", "bpm_min");
  }

  if (request.musical_key !== null && (typeof request.musical_key !== "string" || !request.musical_key.trim() || request.musical_key.length > 40)) {
    return invalid("musical_key invalida.", "musical_key");
  }
  if (request.producer_id !== null && !UUID_PATTERN.test(String(request.producer_id))) {
    return invalid("producer_id deve ser UUID valido.", "producer_id");
  }
  if (!SORT_VALUES.has(request.sort)) return invalid("sort nao permitido.", "sort");
  if (!Number.isInteger(request.limit) || request.limit < 1 || request.limit > 3) {
    return invalid("limit deve ficar entre 1 e 3.", "limit");
  }
  if (request.cursor !== null) return invalid("cursor ainda nao e suportado nesta fase.", "cursor");

  return {
    valid: true,
    request: {
      ...request,
      query: request.query.trim(),
      genres: request.genres.map((value) => value.trim()),
      subgenres: request.subgenres.map((value) => value.trim()),
      moods: request.moods.map((value) => value.trim()),
      tags: request.tags.map((value) => value.trim()),
      license_types: request.license_types.map((value) => value.trim()),
      musical_key: request.musical_key?.trim() || null,
    },
  };
}
