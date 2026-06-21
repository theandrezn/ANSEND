const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
const migration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260621180000_mandatory_account_quiz.sql"),
  "utf8"
);
const hardeningMigration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260621181000_harden_and_backfill_account_quiz.sql"),
  "utf8"
);

function requirePattern(source, pattern, message) {
  if (!pattern.test(source)) throw new Error(message);
}

requirePattern(script, /function requiresMandatoryOnboarding\(\)/, "Missing centralized onboarding guard");
requirePattern(script, /profile\.quiz_completed !== true/, "Guard must fail closed for incomplete profiles");
requirePattern(script, /postLoginRoute\(\)[\s\S]*?"onboarding"/, "Post-login routing does not use onboarding status");
requirePattern(script, /route !== "onboarding"[\s\S]*?location\.hash !== "#onboarding"/, "Authenticated route guard is missing");
requirePattern(script, /allowSkip:\s*!options\.mandatory/, "Mandatory quiz can still be skipped");
requirePattern(script, /rpc\("complete_onboarding_quiz"/, "Quiz completion is not persisted through the atomic RPC");
requirePattern(script, /profile\.quiz_completed !== true/, "Frontend does not verify server completion");
requirePattern(script, /storedIntent === "google"/, "OAuth intent still depends on a destination hash");

for (const sql of [schema, migration]) {
  requirePattern(sql, /quiz_completed boolean not null default false/i, "quiz_completed must default to false");
  requirePattern(sql, /create table if not exists public\.user_onboarding_quiz/i, "Onboarding answers table is missing");
  requirePattern(sql, /create or replace function public\.complete_onboarding_quiz/i, "Atomic completion RPC is missing");
  requirePattern(sql, /jsonb_array_length\(p_answers -> 'genres'\) = 0/i, "Required answers are not validated server-side");
  requirePattern(sql, /update public\.profiles[\s\S]*?quiz_completed = true/i, "RPC does not mark the profile complete");
}
requirePattern(hardeningMigration, /security invoker/i, "Completion RPC must respect authenticated-user RLS");
requirePattern(hardeningMigration, /created_at < timestamptz '2026-06-21 18:00:00-03'/i, "Existing-account backfill is missing");

console.log("Mandatory onboarding OK: server flag, route guard, required quiz and atomic persistence are wired.");
