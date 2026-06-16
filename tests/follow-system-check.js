const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260616231500_user_follows.sql"), "utf8");

const checks = [
  ["user_follows table", /create table if not exists public\.user_follows/i, migration],
  ["self follow check", /constraint user_follows_no_self_follow check \(follower_id <> following_id\)/i, migration],
  ["unique follow pair", /constraint user_follows_unique unique \(follower_id, following_id\)/i, migration],
  ["read policy", /create policy "Public can read follows"[\s\S]*for select[\s\S]*using \(true\)/i, migration],
  ["insert policy auth user", /create policy "Users can follow as themselves"[\s\S]*with check \(\(select auth\.uid\(\)\) = follower_id and follower_id <> following_id\)/i, migration],
  ["delete policy auth user", /create policy "Users can unfollow as themselves"[\s\S]*using \(\(select auth\.uid\(\)\) = follower_id\)/i, migration],
  ["follow notification trigger", /create trigger tr_user_follows_notifications[\s\S]*after insert on public\.user_follows/i, migration],
  ["profile follow notification", /'profile_follow'[\s\S]*'Novo seguidor'/i, migration],
  ["follow state service", /async function getFollowState\(profileUserId\)[\s\S]*\.from\("user_follows"\)/i, script],
  ["follow insert persists", /async function followUser\(profileUserId\)[\s\S]*\.from\("user_follows"\)[\s\S]*\.upsert/i, script],
  ["unfollow deletes", /async function unfollowUser\(profileUserId\)[\s\S]*\.from\("user_follows"\)[\s\S]*\.delete\(\)/i, script],
  ["button uses real service", /if \(action === "follow-producer"\)[\s\S]*toggleFollow\(profileId\)/i, script],
  ["no old visual-only toggle", !/target\.classList\.toggle\("is-following"\)/.test(script), ""],
];

for (const [label, pattern, source] of checks) {
  const ok = pattern instanceof RegExp ? pattern.test(source) : Boolean(pattern);
  if (!ok) {
    throw new Error(`Follow system check failed: ${label}`);
  }
}

console.log("Follow system check passed");
