const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

// 1. Cart Entry Helper Modifications
assert(script.includes("function splitCartEntry("), "splitCartEntry helper is missing.");
assert(script.includes("function cartEntryKey("), "cartEntryKey helper is missing.");

const splitCartEntryBody = script.match(/function splitCartEntry[\s\S]*?\{([\s\S]*?)\}/)?.[1] || "";
assert(!splitCartEntryBody.includes("licensePlans"), "splitCartEntry must not limit licenseId using licensePlans.");

const cartEntryKeyBody = script.match(/function cartEntryKey[\s\S]*?\{([\s\S]*?)\}/)?.[1] || "";
assert(!cartEntryKeyBody.includes("licensePlans"), "cartEntryKey must not limit licenseId using licensePlans.");

// 2. Async UI Rendering Functions
assert(/async function renderPurchases\(/i.test(script), "renderPurchases must be an async function.");
assert(/async function renderCart\(/i.test(script), "renderCart must be an async function.");
assert(/async function openCheckout\(/i.test(script), "openCheckout must be an async function.");

// 3. Checkout and Orders Integration
assert(script.includes("async function submitCheckout("), "submitCheckout function is missing.");
assert(script.includes("async function openCartCheckout("), "openCartCheckout function is missing.");
assert(script.includes("async function downloadPurchasedFile("), "downloadPurchasedFile function is missing.");
assert(script.includes("async function loadUserOrders("), "loadUserOrders function is missing.");
assert(script.includes("function generateContractText("), "generateContractText function is missing.");

// 4. Submit handlers
assert(script.includes("checkoutForm.dataset.cartItems"), "Checkout form must read cartItems payload.");
assert(script.includes('event.target.closest(".custom-license-form")'), "Must handle custom-license-form submission.");
assert(script.includes("royaltyBuyer + royaltyProducer !== 100"), "Custom license form must validate that royalty splits sum to exactly 100%.");
assert(script.includes("priceCents < 500"), "Custom license form must validate minimum R$ 5,00 price.");

// 5. Actions in global click listener
assert(script.includes('action === "download-secure-file"'), "download-secure-file action handler is missing.");
assert(script.includes('action === "view-purchased-contract"'), "view-purchased-contract action handler is missing.");
assert(script.includes('action === "view-contract-modal-trigger"'), "view-contract-modal-trigger action handler is missing.");

console.log("Beat licensing system structural checks passed successfully.");
