const fs = require("node:fs");

const worker = fs.readFileSync("src/worker.mjs", "utf8");
const script = fs.readFileSync("script.js", "utf8");
const migration = fs.readFileSync("supabase/migrations/20260620150000_nexo_ia_2.sql", "utf8");

for (const marker of [
  "nexo-v2-core.mjs",
  'url.pathname === "/api/nexo/recommend"',
  'url.pathname === "/api/nexo/resolve-action"',
  'url.pathname === "/api/analytics/events"',
  "normalizeNexoResponse",
  "rankNexoCandidates",
  "NEXO_PROMPT_VERSION",
]) {
  if (!worker.includes(marker)) throw new Error(`Worker missing NEXO 2.0 marker: ${marker}`);
}

for (const marker of [
  "NEXO_HISTORY_TTL_MS",
  "reset_expired_nexo_history",
  "nexo-assistant-card",
  "data-nexo-primary-action",
  "RECOMMENDATION_CLICK",
]) {
  if (!script.includes(marker)) throw new Error(`Frontend missing NEXO 2.0 marker: ${marker}`);
}

for (const marker of [
  "analytics_events",
  "recommendation_interactions",
  "content_metrics_daily",
  "content_trend_scores",
  "user_preference_profiles",
  "reset_expired_nexo_history",
  "interval '6 hours'",
  "enable row level security",
]) {
  if (!migration.includes(marker)) throw new Error(`Migration missing NEXO 2.0 marker: ${marker}`);
}

console.log("NEXO 2.0 architecture check passed");
