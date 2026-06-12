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
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
};

function serveStatic(req, res) {
  const requestPath = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
  const safePath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.normalize(path.join(root, safePath));

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(content);
  });
}

function stalledSupabaseMock() {
  return `
    (() => {
      const never = () => new Promise(() => {});
      const emptyList = Promise.resolve({ data: [], error: null });
      const emptySingle = Promise.resolve({ data: null, error: null });
      const tableApi = {
        select() { return tableApi; },
        eq() { return tableApi; },
        order() { return emptyList; },
        maybeSingle() { return emptySingle; },
        upsert() { return { select: () => ({ single: () => emptySingle }) }; },
      };
      window.supabase = {
        createClient() {
          return {
            auth: {
              getSession: never,
              getUser: never,
              onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
              signInWithOAuth: () => Promise.resolve({ data: { url: "#" }, error: null }),
            },
            from: () => tableApi,
            rpc: () => emptyList,
          };
        }
      };
    })();
  `;
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${port}` });

  await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
    route.fulfill({ contentType: "text/javascript", body: stalledSupabaseMock() });
  });

  try {
    const cadastrar = await context.newPage();
    const feed = await context.newPage();
    await Promise.all([
      cadastrar.goto("/index.html#cadastrar", { waitUntil: "domcontentloaded" }),
      feed.goto("/index.html#feed", { waitUntil: "domcontentloaded" }),
    ]);
    await Promise.all([cadastrar.waitForTimeout(3600), feed.waitForTimeout(3600)]);

    const results = await Promise.all([cadastrar, feed].map(async (page) => ({
      hash: await page.evaluate(() => location.hash),
      text: await page.locator("body").innerText().catch(() => ""),
      appHeight: await page.locator("#appView").evaluate((element) => Math.round(element.getBoundingClientRect().height)).catch(() => 0),
      releaseFallback: await page.locator(".release-fallback-page").isVisible().catch(() => false),
      feedHero: await page.locator(".ai-hero").isVisible().catch(() => false),
    })));

    const blocked = results.filter((result) =>
      result.text.includes("Preparando acesso seguro") ||
      result.text.includes("Verificando sua conta") ||
      result.appHeight < 120
    );

    if (blocked.length || !results[0].releaseFallback || !results[1].feedHero) {
      console.error(JSON.stringify({ results, blocked }, null, 2));
      process.exit(1);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Auth no-block OK: stalled Supabase session checks do not lock multiple tabs.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
