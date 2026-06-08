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
  { hash: "feed", required: ["ANSEND"] },
  { hash: "nexo-feed", required: ["NEXO IA"] },
  { hash: "explorar", required: ["Explorar"] },
  { hash: "favoritos", required: ["Favoritos"] },
  { hash: "biblioteca", required: ["Biblioteca"] },
  { hash: "ia", required: ["O que podemos"] },
  { hash: "produtores", required: ["Profissionais"] },
  { hash: "cadastrar", required: ["Lançar música", "Publicar no catálogo"] },
  { hash: "carrinho", required: ["Carrinho"] },
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
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto(`http://127.0.0.1:${port}/index.html#${route.hash}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(4500);

      const bodyText = await page.locator("body").innerText().catch(() => "");
      const appHeight = await page
        .locator("#appView")
        .evaluate((element) => Math.round(element.getBoundingClientRect().height))
        .catch(() => 0);
      const missing = route.required.filter((text) => !bodyText.includes(text));
      const loginGate = bodyText.includes("ACESSO ANSEND") && !["compras", "perfil", "configuracoes"].includes(route.hash);

      if (errors.length || missing.length || loginGate || appHeight < 120) {
        failures.push({
          route: route.hash,
          appHeight,
          missing,
          loginGate,
          errors,
          snippet: bodyText.slice(0, 240).replace(/\s+/g, " "),
        });
      }

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

  console.log(`Route stability OK: ${routes.length} routes stayed rendered after delayed auth/locale refresh.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
