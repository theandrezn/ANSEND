const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

assert(script.includes('unlimited: { badge: "UNLIMITED"'), "Unlimited license configuration is missing.");
assert(script.includes('["basic", "premium", "unlimited", "exclusive"]'), "Default release license order is incorrect.");
assert(script.includes("LICENSE_TYPE_CONFIG"), "Reusable license type configuration is missing.");
assert(script.includes("release-license-manager"), "Compact license manager markup is missing.");
assert(script.includes("license-info-btn"), "License information popup trigger is missing.");
assert(script.includes("license-accordion-toggle"), "Accessible license accordion trigger is missing.");
assert(script.includes("license-terms-drawer"), "License terms drawer is missing.");
assert(script.includes("releaseFileIsConfirmed(form, \"secure_wav\")"), "WAV availability must be tied to the uploaded file.");
assert(script.includes("releaseFileIsConfirmed(form, \"secure_stems\")"), "Stems availability must be tied to the uploaded file.");
assert(script.includes("terms_config"), "Granular license terms are not persisted.");
assert(script.includes("releaseLicenseTermsConfigColumnMissing"), "Legacy remote schema fallback is missing.");
assert(script.includes("Retrying license save without terms_config"), "License save must retry when terms_config is unavailable remotely.");
assert(schema.includes("terms_config jsonb"), "Schema does not support granular license terms.");
assert(styles.includes(".release-license-manager"), "License manager styles are missing.");
assert(styles.includes(".license-terms-drawer"), "License drawer styles are missing.");

const brokenUpMarker = [0xc3, 0xa2, 0xe2, 0x20ac, 0x201c, 0xc2, 0xb2].map((code) => String.fromCharCode(code)).join("");
const brokenDownMarker = [0xc3, 0xa2, 0xe2, 0x20ac, 0x201c, 0xc2, 0xbc].map((code) => String.fromCharCode(code)).join("");
assert(!script.includes(brokenUpMarker) && !script.includes(brokenDownMarker), "Broken license ordering characters remain.");

console.log("Release license manager contract checks passed.");
