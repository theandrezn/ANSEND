const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

for (const marker of [
  "function openProfessionalCardProfile",
  "function isInteractiveProfessionalCardTarget",
  "data-action=\"professional-card-open\"",
  "role=\"link\"",
  "tabindex=\"0\"",
  "profileTargetAttrs({ id: profile.id, username: profile.username, title: profile.name })",
  "data-card-action data-action=\"professional-contact\"",
  "data-card-action data-action=\"favorite\"",
  "event.stopPropagation()",
  "professional-card-keyboard",
]) {
  if (!script.includes(marker)) throw new Error(`Missing professional card navigation marker: ${marker}`);
}

for (const marker of [
  ".professional-card",
  "cursor: pointer",
  ".professional-card:focus-visible",
]) {
  if (!styles.includes(marker)) throw new Error(`Missing professional card CSS marker: ${marker}`);
}

console.log("Professional card navigation check passed");
