import assert from "node:assert/strict";
import { isSupabaseJwtKey, supabaseServiceAuthHeader } from "../src/worker.mjs";

assert.equal(isSupabaseJwtKey("sb_secret_example"), false, "Modern Supabase secret keys are not JWTs");
assert.deepEqual(supabaseServiceAuthHeader("sb_secret_example"), {}, "Modern secret keys must not be sent as Bearer tokens");

const legacyServiceRole = "header.payload.signature";
assert.equal(isSupabaseJwtKey(legacyServiceRole), true, "Legacy service_role keys remain supported");
assert.deepEqual(
  supabaseServiceAuthHeader(legacyServiceRole),
  { Authorization: `Bearer ${legacyServiceRole}` },
  "Legacy JWT service_role keys must retain Bearer authentication",
);

console.log("Supabase secret key compatibility passed.");
