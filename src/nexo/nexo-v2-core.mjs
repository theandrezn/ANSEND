export const NEXO_PROMPT_VERSION = "nexo-2.0.0";
export const NEXO_ALGORITHM_VERSION = "nexo-rank-2.0.0";
export const NEXO_HISTORY_TTL_MS = 6 * 60 * 60 * 1000;

export const NEXO_INTENTS = Object.freeze([
  "FIND_BEAT",
  "FIND_ARTIST_OR_PROFESSIONAL",
  "FIND_SERVICE",
  "PROFILE_ANALYSIS",
  "CAREER_GUIDANCE",
  "COMPARE_ITEMS",
  "TRENDING_DISCOVERY",
  "NAVIGATE",
  "CART_OR_PURCHASE",
  "PLATFORM_HELP",
  "GENERAL_CHAT",
  "REQUEST_MORE_DETAIL",
]);

const clean = (value = "") => String(value)
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/\s+/g, " ")
  .trim();

const includesAny = (text, terms) => terms.some((term) => text.includes(term));
const pickTerms = (text, terms) => terms.filter((term) => (
  new RegExp(`(^|[^a-z0-9&])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9&]|$)`).test(text)
));

export function classifyNexoIntent(message = "") {
  const text = clean(message);
  const filters = {
    genres: pickTerms(text, ["trap", "drill", "funk", "rap", "r&b", "rnb", "pop"]),
    moods: pickTerms(text, ["sombrio", "melodico", "agressivo", "calmo", "feliz", "triste"]),
    formats: pickTerms(text, ["mp3", "wav", "stems"]),
    professionalTypes: pickTerms(text, ["produtor", "beatmaker", "designer", "mixagem", "masterizacao", "curador", "marketing"]),
  };
  const price = text.match(/(?:ate|menos de|maximo)\s*(?:r\$\s*)?(\d+(?:[.,]\d+)?)/);
  if (price) filters.priceMax = Number(price[1].replace(",", "."));
  const bpm = text.match(/\b(\d{2,3})\s*bpm\b/);
  if (bpm) filters.bpm = Number(bpm[1]);

  let intent = "GENERAL_CHAT";
  if (includesAny(text, ["detalhe", "explique melhor", "analise completa", "análise completa"])) intent = "REQUEST_MORE_DETAIL";
  else if (includesAny(text, ["analisa meu perfil", "analisar meu perfil", "analise meu perfil"])) intent = "PROFILE_ANALYSIS";
  else if (includesAny(text, ["em alta", "tendencia", "trending"])) intent = "TRENDING_DISCOVERY";
  else if (includesAny(text, ["abre", "abrir", "ir para", "me leva"]) && includesAny(text, ["carrinho", "catalogo", "marketplace", "perfil", "beats", "compras", "biblioteca"])) intent = "NAVIGATE";
  else if (includesAny(text, ["comprar", "adicionar ao carrinho", "checkout", "finalizar compra"])) intent = "CART_OR_PURCHASE";
  else if (includesAny(text, ["beat", "instrumental"])) intent = "FIND_BEAT";
  else if (filters.professionalTypes.length || includesAny(text, ["profissional", "artista"])) intent = "FIND_ARTIST_OR_PROFESSIONAL";
  else if (includesAny(text, ["servico", "contratar"])) intent = "FIND_SERVICE";
  else if (includesAny(text, ["carreira", "lancamento", "divulgacao", "crescer"])) intent = "CAREER_GUIDANCE";
  else if (includesAny(text, ["comparar", "compare", "qual e melhor"])) intent = "COMPARE_ITEMS";
  else if (includesAny(text, ["como funciona", "ajuda", "onde fica"])) intent = "PLATFORM_HELP";

  return { intent, filters };
}

const clamp01 = (value) => Math.max(0, Math.min(1, Number(value || 0)));
const viewSignal = (views) => clamp01(Math.log1p(Math.max(0, Number(views || 0))) / 20);

const WEIGHTS = Object.freeze({
  FIND_BEAT: { relevance: 0.34, personalization: 0.19, quality: 0.15, trend: 0.12, engagement: 0.08, conversion: 0.06, freshness: 0.04, popularity: 0.02 },
  TRENDING_DISCOVERY: { relevance: 0.18, personalization: 0.09, quality: 0.14, trend: 0.31, engagement: 0.10, conversion: 0.05, freshness: 0.10, popularity: 0.03 },
  CART_OR_PURCHASE: { relevance: 0.31, personalization: 0.16, quality: 0.13, trend: 0.08, engagement: 0.07, conversion: 0.18, freshness: 0.04, popularity: 0.03 },
  default: { relevance: 0.27, personalization: 0.14, quality: 0.16, trend: 0.16, engagement: 0.10, conversion: 0.08, freshness: 0.06, popularity: 0.03 },
});

function scoreCandidate(candidate, intent) {
  const weights = WEIGHTS[intent] || WEIGHTS.default;
  const components = {
    relevance: clamp01(candidate.relevance),
    personalization: clamp01(candidate.personalization),
    quality: clamp01(candidate.quality ?? ((clamp01(candidate.completionRate) + clamp01(candidate.repeatRate)) / 2)),
    trend: clamp01(candidate.trendVelocity ?? candidate.trend),
    engagement: clamp01(candidate.engagement ?? candidate.saveRate),
    conversion: clamp01(candidate.conversionRate),
    freshness: clamp01(candidate.freshness),
    popularity: viewSignal(candidate.views),
  };
  let score = Object.entries(weights).reduce((total, [key, weight]) => total + components[key] * weight, 0);
  score -= clamp01(candidate.skipRate) * 0.14;
  score -= clamp01(candidate.reportRate) * 0.35;
  if (candidate.available === false) score -= 1;
  return { score: Math.max(0, score), components };
}

export function rankNexoCandidates(candidates = [], { intent = "GENERAL_CHAT", limit = 3, maxPerCreator = 2 } = {}) {
  const ranked = candidates
    .filter((candidate) => candidate && candidate.id && candidate.available !== false)
    .map((candidate) => {
      const { score, components } = scoreCandidate(candidate, intent);
      return { ...candidate, score: Number(score.toFixed(6)), scoreComponents: components };
    })
    .sort((a, b) => b.score - a.score);
  const creatorCounts = new Map();
  const diversified = [];
  for (const candidate of ranked) {
    const creator = candidate.creatorId || candidate.user_id || candidate.id;
    const count = creatorCounts.get(creator) || 0;
    if (count >= maxPerCreator) continue;
    creatorCounts.set(creator, count + 1);
    diversified.push(candidate);
    if (diversified.length >= Math.max(0, Math.min(3, limit))) break;
  }
  return diversified;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const staticRoutes = Object.freeze({
  HOME: "feed",
  MARKETPLACE: "marketplace",
  PROFESSIONALS: "produtores",
  CART: "carrinho",
  COMMUNITY: "comunidade",
  CHAT: "bate-papo",
  LIBRARY: "biblioteca",
  PURCHASES: "compras",
  MY_PROFILE: "perfil",
  NEXO: "ia",
});

export function resolveNexoAction(routeKey = "", params = {}) {
  if (staticRoutes[routeKey]) return { ok: true, hash: staticRoutes[routeKey] };
  if (routeKey === "BEAT_DETAIL" && uuidPattern.test(String(params.beatId || ""))) return { ok: true, hash: `beat-${params.beatId}` };
  if (routeKey === "PROFILE_DETAIL" && uuidPattern.test(String(params.profileId || ""))) return { ok: true, hash: `perfil-${params.profileId}` };
  return { ok: false, error: "Acao ou parametros invalidos." };
}

const trim = (value, max) => String(value || "").replace(/\s+/g, " ").trim().slice(0, max);

export function normalizeNexoResponse(input = {}) {
  const intent = NEXO_INTENTS.includes(input.intent) ? input.intent : "GENERAL_CHAT";
  return {
    request_id: trim(input.request_id, 80),
    intent,
    answer: trim(input.answer, 280),
    items: Array.isArray(input.items) ? input.items.slice(0, 3).map((item) => ({
      ...item,
      entity_type: trim(item.entity_type, 24),
      entity_id: trim(item.entity_id, 80),
      title: trim(item.title, 100),
      subtitle: trim(item.subtitle, 120),
      reason: trim(item.reason, 90),
      badges: Array.isArray(item.badges) ? item.badges.slice(0, 2).map((badge) => trim(badge, 28)) : [],
    })) : [],
    suggested_replies: Array.isArray(input.suggested_replies) ? input.suggested_replies.slice(0, 3).map((reply) => trim(reply, 48)) : [],
    needs_clarification: Boolean(input.needs_clarification),
    clarifying_question: input.clarifying_question ? trim(input.clarifying_question, 160) : null,
  };
}

export function hasNexoHistoryExpired(lastActivityAt, now = Date.now()) {
  const timestamp = Date.parse(String(lastActivityAt || ""));
  return !Number.isFinite(timestamp) || now - timestamp >= NEXO_HISTORY_TTL_MS;
}
