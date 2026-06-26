export const BEAT_INELIGIBILITY_REASONS = Object.freeze([
  "deleted_or_missing",
  "not_published",
  "not_visible",
  "sold_exclusively",
  "producer_unavailable",
  "missing_cover",
  "missing_preview",
  "no_active_license",
  "invalid_price",
  "invalid_currency",
  "unauthorized",
]);

const cleanText = (value, max = 240) => String(value || "")
  .replace(/[\u0000-\u001f\u007f]/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, max);

const cleanList = (value, maxItems = 12) => (
  Array.isArray(value)
    ? [...new Set(value.map((item) => cleanText(item, 80)).filter(Boolean))].slice(0, maxItems)
    : []
);

const hasMediaValue = (value) => Boolean(cleanText(value, 2000));

function isProducerAvailable(producer) {
  if (!producer || !cleanText(producer.id, 80)) return false;
  if (producer.is_public === false || producer.is_blocked === true || producer.deleted_at) return false;
  const status = cleanText(producer.account_status || producer.status, 40).toLowerCase();
  return !status || ["active", "published", "verified"].includes(status);
}

function licenseState(licenses = [], { allowedCurrencies = ["BRL"], allowFree = false } = {}) {
  const active = (Array.isArray(licenses) ? licenses : [])
    .filter((license) => license && license.is_active !== false && license.is_fallback !== true);
  const allowed = new Set(allowedCurrencies.map((currency) => cleanText(currency, 3).toUpperCase()));
  const validCurrency = active.filter((license) => allowed.has(cleanText(license.currency || "BRL", 3).toUpperCase()));
  const validPrice = validCurrency.filter((license) => {
    const price = Number(license.price_cents);
    return Number.isInteger(price) && (allowFree ? price >= 0 : price > 0);
  });
  return { active, validCurrency, validPrice };
}

export function selectMinimumValidLicense(licenses = [], options = {}) {
  const { validPrice } = licenseState(licenses, options);
  if (!validPrice.length) return null;
  return [...validPrice].sort((left, right) => (
    Number(left.price_cents) - Number(right.price_cents)
    || Number(left.sort_order || 0) - Number(right.sort_order || 0)
    || String(left.id || "").localeCompare(String(right.id || ""))
  ))[0];
}

export function evaluateBeatEligibility(context = {}) {
  const beat = context.beat;
  if (!beat || !cleanText(beat.id, 80)) {
    return { recommendable: false, reasons: ["deleted_or_missing"] };
  }

  const reasons = [];
  if (beat.status !== "published") reasons.push("not_published");
  if (beat.is_public !== true) reasons.push("not_visible");
  if (beat.sold_exclusively === true || beat.status === "sold") reasons.push("sold_exclusively");
  if (!isProducerAvailable(context.producer)) reasons.push("producer_unavailable");
  if (!hasMediaValue(beat.cover_url || beat.youtube_thumbnail_url)) reasons.push("missing_cover");
  if (!hasMediaValue(beat.audio_url || beat.youtube_embed_url || beat.youtube_url)) reasons.push("missing_preview");

  const state = licenseState(context.licenses, context.licenseOptions);
  if (!state.active.length) reasons.push("no_active_license");
  else if (!state.validCurrency.length) reasons.push("invalid_currency");
  else if (!state.validPrice.length) reasons.push("invalid_price");

  if (context.authorized === false) reasons.push("unauthorized");
  return { recommendable: reasons.length === 0, reasons: [...new Set(reasons)] };
}

export function normalizeSearchableBeat(context = {}) {
  const beat = context.beat || {};
  const producer = context.producer || {};
  const eligibility = evaluateBeatEligibility(context);
  const minimumLicense = selectMinimumValidLicense(context.licenses, context.licenseOptions);
  const validLicenses = licenseState(context.licenses, context.licenseOptions).validPrice;
  const id = cleanText(beat.id, 80);

  return {
    id,
    entity_type: "beat",
    title: cleanText(beat.title, 120),
    description: cleanText(beat.description, 360) || null,
    producer: {
      id: cleanText(producer.id, 80),
      display_name: cleanText(producer.display_name || producer.artistic_name || producer.username, 120),
      avatar_url: cleanText(producer.avatar_url, 2000) || null,
    },
    cover_url: cleanText(beat.cover_url || beat.youtube_thumbnail_url, 2000) || null,
    preview_url: cleanText(beat.audio_url || beat.youtube_embed_url || beat.youtube_url, 2000) || null,
    source_type: cleanText(beat.source_type || (beat.youtube_url ? "youtube" : "upload"), 20),
    genre: cleanText(beat.genre, 80) || null,
    subgenre: cleanText(beat.subgenre, 80) || null,
    moods: cleanList(beat.moods?.length ? beat.moods : [beat.mood]),
    tags: cleanList(beat.tags),
    bpm: Number.isInteger(Number(beat.bpm)) ? Number(beat.bpm) : null,
    musical_key: cleanText(beat.musical_key, 30) || null,
    price: minimumLicense ? {
      minimum_cents: Number(minimumLicense.price_cents),
      currency: cleanText(minimumLicense.currency || "BRL", 3).toUpperCase(),
      license_id: cleanText(minimumLicense.id, 80),
    } : null,
    available_license_types: [...new Set(validLicenses
      .map((license) => cleanText(license.license_key || license.name, 80))
      .filter(Boolean))],
    route: { action_key: "BEAT_DETAIL", params: { beatId: id } },
    preview_action: { action_key: "PLAY_BEAT_PREVIEW", params: { beatId: id } },
    eligibility,
  };
}

export function normalizeSearchableProfessional(context = {}) {
  const profile = context.profile || context || {};
  const id = cleanText(profile.id, 80);
  return {
    id,
    entity_type: "profile",
    display_name: cleanText(profile.display_name || profile.artistic_name || profile.username, 120),
    username: cleanText(profile.username, 80) || null,
    role: cleanText(profile.account_role, 60) || null,
    avatar_url: cleanText(profile.avatar_url, 2000) || null,
    bio: cleanText(profile.bio, 360) || null,
    styles: cleanList(profile.music_styles || profile.styles),
    route: { action_key: "PROFILE_DETAIL", params: { profileId: id } },
  };
}

export function normalizeSearchableService(context = {}) {
  const service = context.service || context || {};
  const professional = context.professional || null;
  const rawPrice = Number(service.price_cents ?? (Number(service.price) * 100));
  return {
    id: cleanText(service.id, 80),
    entity_type: "service",
    title: cleanText(service.title || service.name, 120),
    description: cleanText(service.description, 360) || null,
    category: cleanText(service.category, 80) || null,
    price: Number.isInteger(rawPrice) && rawPrice >= 0 ? {
      amount_cents: rawPrice,
      currency: cleanText(service.currency || "BRL", 3).toUpperCase(),
    } : null,
    professional: professional ? {
      id: cleanText(professional.id, 80),
      display_name: cleanText(professional.display_name, 120),
    } : null,
    status: cleanText(service.status, 40) || null,
    is_public: service.is_public === true,
    route: { action_key: "SERVICES", params: {} },
  };
}
