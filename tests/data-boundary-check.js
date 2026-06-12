const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");

const checks = [
  ["public catalog state", /publicCatalogItems:\s*\[\]/],
  ["owned catalog state", /ownedCatalogItems:\s*\[\]/],
  ["public profiles state", /publicProfiles:\s*\[\]/],
  ["public catalog query", /function getPublishedRows[\s\S]*?\.eq\("status",\s*"published"\)/],
  ["owned catalog query", /function getRowsByUserId[\s\S]*?\.eq\("user_id",\s*userId\)/],
  ["public profile query", /function getPublicProfiles[\s\S]*?\.from\("public_profiles"\)/],
  ["public visibility flag", /function getPublishedRows[\s\S]*?\.eq\("is_public",\s*true\)/],
  ["safe public profile table", /create table if not exists public\.public_profiles/],
  ["public profile sync trigger", /create trigger profiles_sync_public[\s\S]*?execute function public\.sync_public_profile\(\)/],
  ["public profile table grant", /grant select on public\.public_profiles to anon, authenticated/],
];

const forbidden = [
  ["catalog localStorage primary state", /catalogItems:\s*JSON\.parse\(localStorage\.getItem\("ansend-catalog-items"/],
  ["owner-filtered public catalog helper", /function visibleCatalogItems\(\)[\s\S]*?appState\.catalogItems\.filter/],
  ["local published merge into public catalog", /localPublished[\s\S]*?publicCatalogItems/],
  ["artist profiles hidden from professionals", /profile\.account_role\s*===\s*"artista"[\s\S]*?return null/],
];

const failures = [];
for (const [label, pattern] of checks) {
  const source = /policy|view|grant|table|trigger/.test(label) ? schema : script;
  if (!pattern.test(source)) failures.push(`missing: ${label}`);
}
for (const [label, pattern] of forbidden) {
  if (pattern.test(script)) failures.push(`forbidden: ${label}`);
}

if (failures.length) {
  console.error(`Data boundary check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Data boundary check passed");
