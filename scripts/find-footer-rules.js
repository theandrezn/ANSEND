const fs = require("fs");
const path = require("path");

const files = [
  "styles.css",
  "hero-collage.css",
  "nexo-ia.css",
  "profile-page.css"
];

for (const file of files) {
  const filePath = path.join(__dirname, "..", file);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  lines.forEach((line, index) => {
    if (line.includes(".footer") || line.includes("cinematic-footer")) {
      console.log(`${file}:${index + 1}: ${line.trim()}`);
    }
  });
}
