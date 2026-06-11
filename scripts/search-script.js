const fs = require("fs");
const path = require("path");

const query = process.argv[2] || "cadastrar";
const filePath = path.join(__dirname, "..", "script.js");

if (!fs.existsSync(filePath)) {
  console.log("File not found:", filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf8");
const lines = content.split("\n");
let count = 0;
lines.forEach((line, index) => {
  if (line.toLowerCase().includes(query.toLowerCase())) {
    console.log(`${index + 1}: ${line.trim()}`);
    count++;
    if (count > 100) {
      console.log("Too many results, truncating...");
      process.exit(0);
    }
  }
});
