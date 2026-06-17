const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..", "dist");
const port = 4181;
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    const file = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const full = path.join(root, file);

    if (!full.startsWith(root)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }

    fs.readFile(full, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "content-type": mime[path.extname(full)] || "application/octet-stream" });
      res.end(data);
    });
  });
}

async function main() {
  const server = createServer();
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`http://127.0.0.1:${port}/#feed`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector(".hero-morph-title", { timeout: 15000 });
    await page.waitForTimeout(6500);

    const selectors = {
      html: "html",
      body: "body",
      sidebar: ".sidebar",
      sidebarItem: ".sidebar-nav-item span",
      navbar: ".floating-navbar",
      navbarLink: ".navbar-link",
      heroTitle: ".hero-morph-title",
      heroText: ".hero-morph-text",
      heroSubtitle: ".an-hero-copy p",
      searchInput: ".ai-input-shell textarea",
      searchButton: ".ai-inline-submit",
      topBeatCard: ".top-beat-card",
      footer: ".cinematic-footer",
    };

    const results = await page.evaluate((selectorMap) => {
      return Object.fromEntries(Object.entries(selectorMap).map(([name, selector]) => {
        const el = document.querySelector(selector);
        if (!el) return [name, { missing: true, selector }];
        const style = getComputedStyle(el);
        return [name, {
          selector,
          tag: el.tagName,
          text: (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
          font: style.fontFamily,
          weight: style.fontWeight,
          size: style.fontSize,
          lineHeight: style.lineHeight,
        }];
      }));
    }, selectors);

    const failures = Object.entries(results).filter(([, item]) => {
      return item.missing || !String(item.font || "").toLowerCase().includes("inter");
    });

    if (failures.length) {
      console.error(JSON.stringify({ failures, results }, null, 2));
      process.exitCode = 1;
      return;
    }

    console.log(`Typography font check OK: ${Object.keys(results).length} sampled elements use Inter.`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
