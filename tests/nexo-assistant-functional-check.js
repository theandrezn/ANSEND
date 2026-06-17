const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
const routes = fs.readFileSync(path.join(root, "src", "nexo", "ansend-routes.mjs"), "utf8");

for (const marker of [
  "export const ANSEND_ROUTES",
  "inferNexoRouteAction",
  "resolveNexoRouteKey",
  "launchMusic",
  "professionals",
  "marketplace",
]) {
  if (!routes.includes(marker)) throw new Error(`Missing NEXO route map marker: ${marker}`);
}

for (const marker of [
  "collectNexoRetrievedData",
  "validatedNexoActions",
  "publicNexoRoutes",
  "actions: safeActions",
  "https://api.openai.com/v1/responses",
  "requireAuthenticatedUser",
]) {
  if (!worker.includes(marker)) throw new Error(`Missing NEXO worker marker: ${marker}`);
}

for (const marker of [
  "executeNexoAssistantActions",
  "applyNexoPendingRouteQuery",
  "nexo-assistant-cancel",
  "withTimeout(",
  "Historico da NEXO demorou",
  "data.actions",
]) {
  if (!script.includes(marker)) throw new Error(`Missing NEXO frontend marker: ${marker}`);
}

if (/OPENAI_API_KEY/.test(script)) {
  throw new Error("OPENAI_API_KEY must never appear in the frontend bundle source");
}

console.log("NEXO assistant functional check passed");
