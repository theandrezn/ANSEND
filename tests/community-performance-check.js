const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260616233000_hiring_performance_indexes.sql"), "utf8");
const adsMigration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260616234500_promoted_beats_ads.sql"), "utf8");

const renderMatch = script.match(/async function renderHiringPage\(options = \{\}\) \{([\s\S]*?)async function submitHiringPost/);
if (!renderMatch) throw new Error("renderHiringPage not found");
const renderBody = renderMatch[1];
if (/await\s+loadHiringPosts/.test(renderBody)) {
  throw new Error("Community render blocks on loadHiringPosts");
}
if (!/loadHiringPosts\(\{ force: Boolean\(options\.force/.test(renderBody)) {
  throw new Error("Community render does not start background loading");
}
if (!/function hiringFeedMarkup\(\)/.test(script) || !/hiring-skeleton/.test(script)) {
  throw new Error("Community skeleton feed fallback missing");
}
if (!/const HIRING_POST_SELECT = "id,user_id,title,description/.test(script)) {
  throw new Error("Community post query must use explicit columns");
}
if (/from\("hiring_posts"\)\.select\("\*"\)/.test(script)) {
  throw new Error("Community posts still use select(*)");
}
if (!/const HIRING_POST_LIMIT = 24/.test(script)) {
  throw new Error("Community post limit was changed or removed");
}
if (!/appState\.hiring\.cache/.test(script) || !/function hiringCacheKey/.test(script)) {
  throw new Error("Community cache missing");
}
if (!/function communityAdMarkup\(\)/.test(script) || !/function loadCommunityPromotedAd/.test(script)) {
  throw new Error("Community promoted ad component missing");
}
if (/await\s+loadCommunityPromotedAd/.test(renderBody)) {
  throw new Error("Community render blocks on promoted ad loading");
}
if (!/renderedCommunityEarly[\s\S]*currentRoute\(\) === COMMUNITY_ROUTE[\s\S]*renderRoute\(\)/.test(script)) {
  throw new Error("Community route must render before auth/public data boot completes");
}
if (/if \(route !== COMMUNITY_ROUTE\) PageTransition\(appView, route\);/.test(script) === false) {
  throw new Error("Community route should bypass section transition wrapper");
}
if (!/Promise\.allSettled/.test(script)) {
  throw new Error("Community independent loads should use Promise.allSettled");
}
for (const indexName of [
  "hiring_posts_public_category_recent_idx",
  "hiring_posts_public_status_recent_idx",
  "hiring_posts_public_deadline_recent_idx",
  "hiring_posts_public_work_mode_recent_idx",
]) {
  if (!migration.includes(indexName)) throw new Error(`Missing migration index: ${indexName}`);
}
for (const requiredSql of [
  "create table if not exists public.promoted_beats",
  "promoted_beats_active_window_idx",
  "increment_promoted_beat_impression",
  "increment_promoted_beat_click",
]) {
  if (!adsMigration.includes(requiredSql)) throw new Error(`Missing promoted ads SQL: ${requiredSql}`);
}

console.log("Community performance check passed");
