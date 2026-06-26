import assert from "node:assert/strict";
import fs from "node:fs";
import {
  BEAT_INELIGIBILITY_REASONS,
  evaluateBeatEligibility,
  normalizeSearchableBeat,
  normalizeSearchableProfessional,
  normalizeSearchableService,
  selectMinimumValidLicense,
} from "../src/nexo/nexo-catalog-foundation.mjs";
import { resolveNexoAction } from "../src/nexo/nexo-v2-core.mjs";

const beatId = "00000000-0000-4000-8000-000000000001";
const producerId = "00000000-0000-4000-8000-000000000002";
const licenseId = "00000000-0000-4000-8000-000000000003";

const activeLicense = {
  id: licenseId,
  beat_id: beatId,
  license_key: "premium",
  name: "Premium",
  price_cents: 12900,
  currency: "BRL",
  is_active: true,
  is_custom: false,
};

const completeContext = {
  beat: {
    id: beatId,
    user_id: producerId,
    title: "Noite Melódica",
    description: "Trap melódico em 140 BPM.",
    genre: "Trap",
    subgenre: "Trap melódico",
    mood: "Sombrio",
    tags: ["melodic", "night"],
    bpm: 140,
    musical_key: "C#m",
    status: "published",
    is_public: true,
    sold_exclusively: false,
    cover_url: "https://cdn.example/cover.webp",
    audio_url: "https://cdn.example/preview.mp3",
  },
  producer: {
    id: producerId,
    display_name: "Produtor Real",
    avatar_url: "https://cdn.example/avatar.webp",
    is_public: true,
    account_status: "active",
    is_blocked: false,
  },
  licenses: [activeLicense],
};

const minimum = selectMinimumValidLicense([
  { ...activeLicense, id: "00000000-0000-4000-8000-000000000004", price_cents: 19900 },
  activeLicense,
  { ...activeLicense, id: "00000000-0000-4000-8000-000000000005", price_cents: 4900, is_active: false },
]);
assert.equal(minimum?.id, licenseId);
assert.equal(minimum?.price_cents, 12900);

assert.equal(selectMinimumValidLicense([{ ...activeLicense, price_cents: 0 }]), null);
assert.equal(selectMinimumValidLicense([{ ...activeLicense, price_cents: null }]), null);
assert.equal(selectMinimumValidLicense([{ ...activeLicense, currency: "USD" }]), null);
assert.equal(selectMinimumValidLicense([{ ...activeLicense, is_fallback: true }]), null);
assert.equal(selectMinimumValidLicense([{ ...activeLicense, is_custom: true }])?.id, licenseId);
assert.equal(selectMinimumValidLicense([], { allowFree: true }), null);
assert.equal(selectMinimumValidLicense([{ ...activeLicense, price_cents: 0 }], { allowFree: true })?.price_cents, 0);

const eligible = evaluateBeatEligibility(completeContext);
assert.deepEqual(eligible, { recommendable: true, reasons: [] });

const eligibilityCases = [
  ["not_published", { beat: { status: "draft" } }],
  ["not_visible", { beat: { is_public: false } }],
  ["sold_exclusively", { beat: { sold_exclusively: true } }],
  ["producer_unavailable", { producer: null }],
  ["producer_unavailable", { producer: { account_status: "inactive" } }],
  ["producer_unavailable", { producer: { is_blocked: true } }],
  ["missing_cover", { beat: { cover_url: null } }],
  ["missing_preview", { beat: { audio_url: null, youtube_embed_url: null } }],
  ["no_active_license", { licenses: [{ ...activeLicense, is_active: false }] }],
  ["invalid_price", { licenses: [{ ...activeLicense, price_cents: null }] }],
  ["invalid_currency", { licenses: [{ ...activeLicense, currency: "USD" }] }],
  ["unauthorized", { authorized: false }],
  ["deleted_or_missing", { beat: null }],
];

for (const [reason, patch] of eligibilityCases) {
  const context = {
    ...completeContext,
    ...patch,
    beat: patch.beat === null ? null : { ...completeContext.beat, ...(patch.beat || {}) },
    producer: patch.producer === null ? null : { ...completeContext.producer, ...(patch.producer || {}) },
  };
  const result = evaluateBeatEligibility(context);
  assert.equal(result.recommendable, false, `${reason} must make the beat ineligible`);
  assert.ok(result.reasons.includes(reason), `${reason} must be reported`);
}

assert.ok(BEAT_INELIGIBILITY_REASONS.includes("missing_preview"));
assert.ok(BEAT_INELIGIBILITY_REASONS.includes("invalid_currency"));

const searchableBeat = normalizeSearchableBeat(completeContext);
assert.equal(searchableBeat.id, beatId);
assert.equal(searchableBeat.entity_type, "beat");
assert.equal(searchableBeat.producer.id, producerId);
assert.equal(searchableBeat.price.minimum_cents, 12900);
assert.equal(searchableBeat.price.currency, "BRL");
assert.deepEqual(searchableBeat.available_license_types, ["premium"]);
assert.deepEqual(searchableBeat.route, { action_key: "BEAT_DETAIL", params: { beatId } });
assert.deepEqual(searchableBeat.preview_action, { action_key: "PLAY_BEAT_PREVIEW", params: { beatId } });
assert.equal(searchableBeat.eligibility.recommendable, true);

const fallbackBeat = normalizeSearchableBeat({
  ...completeContext,
  licenses: [{ ...activeLicense, is_fallback: true }],
});
assert.equal(fallbackBeat.eligibility.recommendable, false);
assert.equal(fallbackBeat.price, null);

const professional = normalizeSearchableProfessional({
  profile: {
    id: producerId,
    display_name: "Produtor Real",
    username: "produtor-real",
    account_role: "produtor",
    avatar_url: "https://cdn.example/avatar.webp",
    bio: "Produção musical.",
    music_styles: ["trap"],
    is_public: true,
  },
});
assert.equal(professional.entity_type, "profile");
assert.deepEqual(professional.route, { action_key: "PROFILE_DETAIL", params: { profileId: producerId } });

const service = normalizeSearchableService({
  service: {
    id: "00000000-0000-4000-8000-000000000006",
    user_id: producerId,
    title: "Mixagem",
    description: "Mixagem profissional",
    category: "mixagem",
    price: 350,
    currency: "BRL",
    status: "published",
    is_public: true,
  },
  professional,
});
assert.equal(service.entity_type, "service");
assert.equal(service.price.amount_cents, 35000);
assert.equal(service.professional.id, producerId);

assert.deepEqual(resolveNexoAction("PLAY_BEAT_PREVIEW", { beatId }), {
  ok: true,
  type: "play_beat_preview",
  beatId,
});
assert.deepEqual(resolveNexoAction("SERVICES", {}), { ok: true, hash: "servicos" });
assert.equal(resolveNexoAction("PLAY_BEAT_PREVIEW", { beatId: "invalid" }).ok, false);

const worker = fs.readFileSync(new URL("../src/worker.mjs", import.meta.url), "utf8");
const frontend = fs.readFileSync(new URL("../script.js", import.meta.url), "utf8");
assert.ok(worker.includes('from "./nexo/nexo-catalog-foundation.mjs"'));
assert.ok(worker.includes("normalizeSearchableBeat"));
assert.ok(worker.includes("beats?select="));
assert.ok(worker.includes("beat_licenses?select="));
assert.ok(!worker.includes("public_catalog_items?select="));
const retrievalBlock = worker.slice(
  worker.indexOf("async function collectNexoRetrievedData"),
  worker.indexOf("function validatedNexoActions"),
);
assert.ok(retrievalBlock.includes("supabaseUserRest"));
assert.ok(!retrievalBlock.includes("supabaseAuthedRest"));
assert.ok(frontend.includes('action.type === "play_beat_preview"'));
assert.ok(frontend.includes("void playBeat(beat)"));
const clickHandler = frontend.slice(
  frontend.indexOf('document.addEventListener("click"'),
  frontend.indexOf('document.addEventListener("submit"'),
);
const customLicenseSubmit = frontend.slice(
  frontend.indexOf('const customLicenseForm = event.target.closest(".custom-license-form")'),
  frontend.indexOf("const nullableLimit", frontend.indexOf('const customLicenseForm = event.target.closest(".custom-license-form")')),
);
assert.ok(clickHandler.includes('target.dataset.actionKey === "PLAY_BEAT_PREVIEW"'));
assert.ok(!customLicenseSubmit.includes("PLAY_BEAT_PREVIEW"));

console.log("NEXO catalog foundation check passed");
