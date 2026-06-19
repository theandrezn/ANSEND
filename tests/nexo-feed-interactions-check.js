const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260618183000_nexo_feed_interactions.sql"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const lastReadComments = script.lastIndexOf("function readNexoFeedComments");
const lastOpenComments = script.lastIndexOf("async function openNexoFeedComments");
const lastCommentMarkup = script.lastIndexOf("function nexoFeedCommentMarkup");
assert(lastReadComments > script.indexOf("function nexoFeedDefaultComments"), "real comment reader must override legacy mock comments");
assert(lastOpenComments > script.indexOf("function openNexoFeedComments"), "real comment modal must override legacy modal");
assert(lastCommentMarkup > script.indexOf("function nexoFeedCommentMarkup"), "real comment markup must override legacy markup");

const liveFeedActionStart = script.indexOf('if (action?.startsWith("nexo-feed-"))');
const liveFeedActionBlock = script.slice(liveFeedActionStart, script.indexOf('if (action === "nexo-feed-share")', liveFeedActionStart));
assert(liveFeedActionBlock.includes("toggleNexoFeedAction(item"), "feed like/save buttons must call the real interaction handler");
assert(!liveFeedActionBlock.includes("handleFavorite"), "feed like/save buttons must not reuse beat favorite state");
assert(script.includes('from("nexo_feed_comments")'), "comments must be loaded from Supabase");
assert(script.includes('from("nexo_feed_likes")'), "likes must be loaded from Supabase");
assert(script.includes('from("nexo_feed_saves")'), "saves must be loaded from Supabase");
assert(script.includes('from("nexo_feed_comment_likes")'), "comment likes must be loaded from Supabase");
assert(script.includes("nexoFeedCommentsEmptyMarkup"), "empty comments must render without generic fake comments");

for (const table of ["nexo_feed_comments", "nexo_feed_likes", "nexo_feed_saves", "nexo_feed_comment_likes"]) {
  assert(migration.includes(`create table if not exists public.${table}`), `migration missing ${table}`);
  assert(migration.includes(`alter table public.${table} enable row level security`), `migration missing RLS for ${table}`);
}

assert(migration.includes("tr_nexo_feed_likes_notifications"), "feed likes must trigger notifications");
assert(migration.includes("public.upsert_notification"), "notifications must use the existing notification service");
assert(migration.includes("'beat_like'"), "feed like notifications must use beat_like type");

console.log("NEXO feed interactions OK: comments, likes, saves and notifications are wired to real tables.");
