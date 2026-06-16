const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const storageMigration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260616220000_fix_storage_upload_session_policies.sql"),
  "utf8"
);

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

assert(script.includes("function normalizeStorageError("), "normalizeStorageError is missing.");
assert(script.includes("async function ensureStorageAuthSession("), "ensureStorageAuthSession is missing.");
assert(script.includes("async function uploadStorageFile("), "uploadStorageFile is missing.");
assert(script.includes("supabaseClient.auth.refreshSession()"), "Storage upload must refresh the Supabase session before failing.");
assert(!/trying storage upload with cached authenticated user/i.test(script), "Storage upload must not fall back to cached appState.authUser.");
assert((script.match(/async function handleReleaseFile\(/g) || []).length === 1, "handleReleaseFile must have one implementation.");
assert(!/sua sessao expirou ou nao tem permissao no Storage/i.test(script), "Generic session/permission storage error must not be reused.");
assert(!/service_role|service-role|SUPABASE_SERVICE/i.test(script), "Frontend bundle must not reference service role keys.");

for (const bucket of ["beat-covers", "beat-audio", "beat-stems", "profile-avatars", "profile-banners"]) {
  assert(storageMigration.includes(`'${bucket}'`), `Storage migration must include ${bucket}.`);
}

assert(storageMigration.includes("(storage.foldername(name))[1] = (auth.uid())::text"), "Storage policies must restrict writes to the auth.uid folder.");
assert(storageMigration.includes("Public can read beat covers"), "Beat covers need public read policy.");
assert(storageMigration.includes("Users can upload their own covers"), "Beat covers need authenticated insert policy.");

console.log("Storage upload architecture check passed");
