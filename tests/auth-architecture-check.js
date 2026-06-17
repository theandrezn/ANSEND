const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

function count(pattern) {
  return (script.match(pattern) || []).length;
}

const createClientCount = count(/window\.supabase\.createClient\s*\(/g);
const authListenerCount = count(/\.auth\.onAuthStateChange\s*\(/g);

const banned = [
  "ansend-auth" + "-cache-v1",
  "resyncAuth" + "Session",
  "AUTH_EXPLICIT" + "_LOGOUT_KEY",
  "profile || " + "hasAccountAccess",
  "hasAccountAccess() || " + "profile",
];

const failures = [];
if (createClientCount !== 1) failures.push(`Expected 1 frontend Supabase createClient, found ${createClientCount}.`);
if (authListenerCount !== 1) failures.push(`Expected 1 auth onAuthStateChange registration, found ${authListenerCount}.`);
for (const marker of banned) {
  if (script.includes(marker)) failures.push(`Banned auth marker returned: ${marker}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Auth architecture OK: single Supabase client/listener and no legacy auth cache gates.");
