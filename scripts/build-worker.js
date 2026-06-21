const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const entries = ["index.html", "styles.css", "hero-collage.css", "nexo-ia.css", "profile-page.css", "checkout", "script.js", "assets", "public"];

function copyRecursive(source, target) {
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function buildId() {
  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  try {
    const sha = execSync("git rev-parse --short HEAD", { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return `${stamp}-${sha}`;
  } catch (_error) {
    return stamp;
  }
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!fs.existsSync(source)) continue;
  copyRecursive(source, entry === "public" ? dist : path.join(dist, entry));
}

const distIndex = path.join(dist, "index.html");
if (fs.existsSync(distIndex)) {
  const html = fs.readFileSync(distIndex, "utf8");
  fs.writeFileSync(
    distIndex,
    html.replace('window.ANSEND_BUILD_ID = "dev";', `window.ANSEND_BUILD_ID = "${buildId()}";`)
  );
}

console.log(`Cloudflare Workers assets build ready: ${dist}`);
