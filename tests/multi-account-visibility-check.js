const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");

const checks = [
  ["profiles load from public table", /function getPublicProfiles[\s\S]*?\.from\("public_profiles"\)/],
  ["professionals include artists", /function profileToProfessional[\s\S]*?const accountRole = profile\.account_role \|\| profile\.role \|\| "artista"/],
  ["published beats load by public status", /function getPublishedBeats\(\)[\s\S]*?return getPublishedRows\("beats"\)/],
  ["owned beats load by current user", /function getBeatsByUserId\(userId\)[\s\S]*?return getRowsByUserId\("beats", userId\)/],
  ["publish beat writes public flag", /function publishBeat[\s\S]*?publicCatalogPayload/],
  ["authenticated localStorage is not source", /function loadOwnedCatalogItems[\s\S]*?if \(!supabaseClient \|\| !appState\.authUser\)[\s\S]*?localStorage\.getItem\("ansend-local-catalog"\)/],
  ["catalog select requires published public or owner", /create policy "Published or owned catalog is readable"[\s\S]*?status = 'published' and is_public is true[\s\S]*?auth\.uid\(\)\) = user_id/],
  ["beats select requires published public or owner", /create policy "Published or owned beats are readable"[\s\S]*?status = 'published' and is_public is true[\s\S]*?auth\.uid\(\)\) = user_id/],
];

const forbidden = [
  ["local published injected into public catalog", /localPublished[\s\S]*?publicCatalogItems/],
  ["artist profiles dropped", /profile\.account_role\s*===\s*"artista"[\s\S]*?return null/],
  ["authenticated owned catalog merges local items", /dedupeById\(\[\.\.\.supabaseItems,\s*\.\.\.localItems\]\)/],
];

const failures = [];
for (const [label, pattern] of checks) {
  const source = label.includes("policy") || label.includes("select requires") ? schema : script;
  if (!pattern.test(source)) failures.push(`missing: ${label}`);
}
for (const [label, pattern] of forbidden) {
  if (pattern.test(script)) failures.push(`forbidden: ${label}`);
}

if (failures.length) {
  console.error(`Multi-account visibility check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Multi-account visibility check passed");
