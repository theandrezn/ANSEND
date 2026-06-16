const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const script = read("script.js");
const worker = read("src/worker.mjs");
const migration = read("supabase/migrations/20260616170000_intelligent_recommendations.sql");
const styles = read("styles.css");

const checks = [
  ["pgvector extension", /create extension if not exists vector/i, migration],
  ["user events table", /create table if not exists public\.user_events/i, migration],
  ["content embeddings table", /create table if not exists public\.content_embeddings/i, migration],
  ["interest profiles table", /create table if not exists public\.user_interest_profiles/i, migration],
  ["impressions table", /create table if not exists public\.recommendation_impressions/i, migration],
  ["track event rpc", /function public\.track_user_event/i, migration],
  ["professional recommendation rpc", /function public\.get_recommended_professionals/i, migration],
  ["feed recommendation rpc", /function public\.get_recommended_feed/i, migration],
  ["OpenAI embeddings endpoint", /\/api\/recommendations\/embed-content/i, worker],
  ["interest update endpoint", /\/api\/recommendations\/update-interest/i, worker],
  ["NEXO intent endpoint", /\/api\/recommendations\/nexo-intent/i, worker],
  ["text-embedding-3-small usage", /text-embedding-3-small/i, worker],
  ["frontend recommendation cache", /RECOMMENDATION_CACHE_TTL_MS/i, script],
  ["frontend track rpc", /supabaseClient\.rpc\("track_user_event"/i, script],
  ["frontend recommendation rpc", /get_recommended_professionals/i, script],
  ["feed recommendation merge", /applyFeedRecommendations/i, script],
  ["professional recommendations merge remaining profiles", /const remaining = activeProfessionalProfiles\(\)/i, script],
  ["NEXO intent extraction", /extractNexoIntent/i, script],
  ["professional recommendation score UI", /match-score|match-professional-card/i, styles],
];

const failures = checks.filter(([, pattern, content]) => !pattern.test(content));
if (failures.length) {
  console.error("Recommendation architecture check failed:");
  failures.forEach(([name]) => console.error(`- ${name}`));
  process.exit(1);
}

console.log("Recommendation architecture OK: Supabase schema, Worker endpoints, frontend tracking, and UI hooks are present.");
