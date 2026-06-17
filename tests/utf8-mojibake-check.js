const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
const files = cp.execFileSync("rg", [
  "--files",
  "-g", "*.html",
  "-g", "*.js",
  "-g", "*.mjs",
  "-g", "*.ts",
  "-g", "*.tsx",
  "-g", "*.json",
  "-g", "*.sql",
  "-g", "*.css",
  "-g", "!node_modules/**",
  "-g", "!.git/**",
], { cwd: root, encoding: "utf8" }).split(/\r?\n/).filter(Boolean);

const mojibake = new RegExp([
  "\\u00c3",
  "\\u00c2",
  "\\ufffd",
  "\\u00e2\\u20ac\\u2122",
  "\\u00e2\\u20ac\\u0153",
  "\\u00e2\\u20ac",
  "\\u00f0\\u0178",
].join("|"));
const offenders = [];

for (const file of files) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  if (mojibake.test(text)) offenders.push(file);
}

if (offenders.length) {
  throw new Error(`Mojibake markers found in: ${offenders.join(", ")}`);
}

const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
for (const word of [
  "Catálogo",
  "Música",
  "Descrição",
  "Produção",
  "Informações",
  "Você",
  "Configurações",
  "Preço",
  "Licença",
  "R$",
]) {
  if (!script.includes(word)) throw new Error(`Missing UTF-8 word marker: ${word}`);
}

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!/<meta\s+charset=["']?UTF-8["']?\s*\/?>/i.test(index)) {
  throw new Error("index.html must declare UTF-8 charset.");
}

const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
if (!worker.includes("charset=utf-8")) {
  throw new Error("Worker responses must declare charset=utf-8.");
}

console.log("UTF-8 mojibake check passed");
