const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const preferredPort = Number(process.env.PORT || 0);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

const routes = [
  { hash: "feed", required: ["ANSEND"], selector: ".ai-hero" },
  { hash: "nexo-feed", required: ["NEXO IA"], selector: ".nexo-feed-page" },
  { hash: "explorar", required: ["Explore"], selector: ".genre-banner-section" },
  { hash: "favoritos", required: ["Favoritos"], selector: ".view-header-favoritos" },
  { hash: "biblioteca", required: ["Playlists"], selector: ".curator-dashboard-page" },
  { hash: "produtores", required: ["Profissionais"], selector: ".view-header-produtores" },
  { hash: "comunidade", required: ["Comunidade ANSEND"], selector: ".hiring-page" },
  { hash: "contratacoes", required: ["Comunidade ANSEND"], selector: ".hiring-page" },
  { hash: "cadastrar", required: ["Autentica", "Necess"], selector: ".release-fallback-page" },
  { hash: "carrinho", required: ["Carrinho"], selector: ".view-header-carrinho" },
  { hash: "vendedor", required: ["ANSEND"], selector: ".seller-auth" },
];

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

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(preferredPort, "127.0.0.1", resolve);
  });
  const port = server.address().port;

  const browser = await chromium.launch({ headless: true });
  const failures = [];

  try {
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const errors = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          const text = message.text();
          if (text.includes("doubleclick") || text.includes("googleads") || text.includes("youtube.com") || text.includes("ERR_FAILED") || text.includes("ERR_ABORTED")) return;
          errors.push(text);
        }
      });
      page.on("pageerror", (error) => {
        const msg = error.message || String(error);
        if (msg.includes("doubleclick") || msg.includes("googleads") || msg.includes("youtube.com") || msg.includes("ERR_FAILED") || msg.includes("ERR_ABORTED")) return;
        errors.push(msg);
      });

      await page.route("**/*doubleclick*", route => route.abort());
      await page.route("**/*googleads*", route => route.abort());

      await page.goto(`http://127.0.0.1:${port}/index.html#${route.hash}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(5000);

      const bodyText = await page.locator("body").innerText().catch(() => "");
      const appMetrics = await page
        .locator("#appView")
        .evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const visibleElementCount = [...element.querySelectorAll("*")].filter((child) => {
            const childRect = child.getBoundingClientRect();
            const style = window.getComputedStyle(child);
            return (
              childRect.width > 20 &&
              childRect.height > 20 &&
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              Number(style.opacity) > 0.05
            );
          }).length;

          return {
            className: element.className,
            height: Math.round(rect.height),
            visibleElementCount,
          };
        })
        .catch(() => ({ className: "", height: 0, visibleElementCount: 0 }));
      const routeSelectorVisible = await page.locator(route.selector).first().isVisible().catch(() => false);
      const footerVisible = await page.locator(".footer").isVisible().catch(() => false);
      await page.mouse.click(720, 360);
      await page.waitForTimeout(1800);
      const footerVisibleAfterClick = await page.locator(".footer").isVisible().catch(() => false);
      const postClickMetrics = await page
        .locator("#appView")
        .evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const visibleElementCount = [...element.querySelectorAll("*")].filter((child) => {
            const childRect = child.getBoundingClientRect();
            const style = window.getComputedStyle(child);
            return (
              childRect.width > 20 &&
              childRect.height > 20 &&
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              Number(style.opacity) > 0.05
            );
          }).length;

          return {
            height: Math.round(rect.height),
            visibleElementCount,
          };
        })
        .catch(() => ({ height: 0, visibleElementCount: 0 }));
      const missing = route.required.filter((text) => !bodyText.includes(text));
      const loginGate = bodyText.includes("ACESSO ANSEND") && !["compras", "perfil", "configuracoes", "vendedor"].includes(route.hash);
      const feedClassLeak = route.hash !== "feed" && appMetrics.className.split(/\s+/).includes("feed");
      const footerVisibilityMismatch =
        route.hash === "feed"
          ? !footerVisible || !footerVisibleAfterClick
          : footerVisible || footerVisibleAfterClick;

      if (
        errors.length ||
        missing.length ||
        loginGate ||
        appMetrics.height < 120 ||
        appMetrics.visibleElementCount < 4 ||
        postClickMetrics.height < 120 ||
        postClickMetrics.visibleElementCount < 4 ||
        !routeSelectorVisible ||
        feedClassLeak ||
        footerVisibilityMismatch
      ) {
        failures.push({
          route: route.hash,
          appMetrics,
          postClickMetrics,
          routeSelectorVisible,
          feedClassLeak,
          footerVisible,
          footerVisibleAfterClick,
          footerVisibilityMismatch,
          missing,
          loginGate,
          errors,
          snippet: bodyText.slice(0, 240).replace(/\s+/g, " "),
        });
      }

      await page.close();
    }

    for (const hash of ["beat-beat-1", "playlist-trap-na-area", "perfil-flackxbeats", "termos-de-uso"]) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`http://127.0.0.1:${port}/index.html#${hash}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(1800);
      const footerVisible = await page.locator(".footer").isVisible().catch(() => false);
      const appHeight = await page.locator("#appView").evaluate((element) => Math.round(element.getBoundingClientRect().height)).catch(() => 0);
      if (footerVisible || appHeight < 120) failures.push({ route: hash, footerVisible, appHeight });
      await page.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }

  console.log(`Route stability OK: ${routes.length} routes stayed visible without feed-class leakage.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
