const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function serveStatic(req, res) {
  const requestPath = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
  const safePath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.normalize(path.join(root, safePath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile(path.join(root, "index.html"), (fallbackError, fallbackContent) => {
        if (fallbackError) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
        res.end(fallbackContent);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(content);
  });
}

async function installMocks(page) {
  await page.route("**/lucide.min.js", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/javascript", body: "window.lucide = { createIcons() {} };" });
  });
  await page.route("**/three.min.js", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/javascript", body: "window.THREE = {};" });
  });
  await page.route("**/supabase.min.js", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/javascript",
      body: "window.supabase = { createClient: () => ({ auth: { getSession: async () => ({ data: { session: null }, error: null }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }) }, from: () => ({ select: () => ({ then: (resolve) => Promise.resolve({ data: [], error: null }).then(resolve) }) }) }) };",
    });
  });
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await installMocks(page);

  try {
    const url = `http://127.0.0.1:${server.address().port}/#feed`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".language-switcher", { timeout: 10000 });
    await page.waitForFunction(() => document.documentElement.lang === "pt-BR", { timeout: 5000 });

    await page.click('[data-action="set-locale"][data-locale-option="en-US"]');
    await page.waitForFunction(() => document.documentElement.lang === "en-US", { timeout: 5000 });
    await page.waitForFunction(() => localStorage.getItem("ansend_locale") === "en-US", { timeout: 5000 });
    const englishText = await page.locator("body").innerText();
    if (!englishText.includes("Release music") && !englishText.includes("Home")) {
      throw new Error(`English UI text did not render after selecting en-US. Body: ${englishText.slice(0, 500)}`);
    }

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.documentElement.lang === "en-US", { timeout: 5000 });

    await page.click('[data-action="set-locale"][data-locale-option="pt-BR"]');
    await page.waitForFunction(() => document.documentElement.lang === "pt-BR", { timeout: 5000 });
    await page.waitForFunction(() => localStorage.getItem("ansend_locale") === "pt-BR", { timeout: 5000 });
    const portugueseText = await page.locator("body").innerText();
    if (!portugueseText.includes("Entrar") && !portugueseText.includes("Inicio") && !portugueseText.includes("Início")) {
      throw new Error("Portuguese UI text did not render after selecting pt-BR.");
    }
  } finally {
    await browser.close();
    server.close();
  }
}

run().then(() => {
  console.log("i18n language check passed");
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
