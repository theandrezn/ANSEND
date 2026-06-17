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

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

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

async function routeMetrics(page, route) {
  await page.goto(`${page.baseUrl}/index.html#${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);

  return page.evaluate((currentRoute) => {
    const sidebar = document.querySelector(".sidebar");
    const pageShell = document.querySelector(".page");
    const appView = document.querySelector("#appView");
    const routeSurface = currentRoute === "cadastrar"
      ? document.querySelector(".release-page")
      : document.querySelector(".ai-hero");

    const box = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        radius: style.borderRadius,
        visible: rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden",
      };
    };

    return {
      route: currentRoute,
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      sidebar: box(sidebar),
      pageShell: box(pageShell),
      appView: box(appView),
      routeSurface: box(routeSurface),
    };
  }, route);
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const failures = [];

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
      route.fulfill({
        contentType: "text/javascript",
        body: `
          (() => {
            const user = {
              id: "layout-shell-test",
              email: "artist@example.com",
              role: "authenticated",
              aud: "authenticated",
              user_metadata: { full_name: "Layout Test", account_role: "artista", music_styles: ["Trap"] }
            };
            const session = { user, access_token: "test-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
            const profile = {
              id: user.id,
              email: user.email,
              full_name: "Layout Test",
              display_name: "Layout Test",
              username: "layout-test",
              account_role: "artista",
              music_styles: ["Trap"]
            };
            function tableApi(table) {
              const api = {
                select() { return api; },
                eq() { return api; },
                order() { return Promise.resolve({ data: table === "public_profiles" ? [profile] : [], error: null }); },
                maybeSingle() { return Promise.resolve({ data: table === "profiles" ? profile : null, error: null }); },
                upsert() { return { select: () => ({ single: () => Promise.resolve({ data: profile, error: null }) }) }; }
              };
              return api;
            }
            window.supabase = {
              createClient() {
                return {
                  auth: {
                    getSession: () => Promise.resolve({ data: { session }, error: null }),
                    getUser: () => Promise.resolve({ data: { user }, error: null }),
                    onAuthStateChange: (callback) => {
                      setTimeout(() => callback("INITIAL_SESSION", session), 0);
                      return { data: { subscription: { unsubscribe() {} } } };
                    }
                  },
                  from: tableApi,
                  rpc: (method) => Promise.resolve({ data: method === "is_current_user_admin" ? false : [], error: null })
                };
              }
            };
          })();
        `,
      });
    });
    const page = await context.newPage();
    page.baseUrl = `http://127.0.0.1:${port}`;

    for (const route of ["feed", "cadastrar"]) {
      const metrics = await routeMetrics(page, route);
      console.log(JSON.stringify(metrics, null, 2));

      if (!metrics.pageShell?.visible || !metrics.appView?.visible || !metrics.routeSurface?.visible) {
        failures.push(`${route}: route shell or surface is not visible`);
        continue;
      }
      if (Math.abs(metrics.sidebar.right - metrics.pageShell.left) > 1) {
        failures.push(`${route}: gap between sidebar and page (${metrics.sidebar.right}px vs ${metrics.pageShell.left}px)`);
      }
      if (Math.abs(metrics.pageShell.right - metrics.viewportWidth) > 1) {
        failures.push(`${route}: page does not reach viewport edge (${metrics.pageShell.right}px)`);
      }
      if (Math.abs(metrics.appView.width - metrics.pageShell.width) > 1) {
        failures.push(`${route}: app view does not fill page (${metrics.appView.width}px vs ${metrics.pageShell.width}px)`);
      }
      if (Math.abs(metrics.routeSurface.width - metrics.appView.width) > 1) {
        failures.push(`${route}: route surface does not fill app view (${metrics.routeSurface.width}px vs ${metrics.appView.width}px)`);
      }
      if (metrics.pageShell.radius !== "0px" || metrics.appView.radius !== "0px" || metrics.routeSurface.radius !== "0px") {
        failures.push(`${route}: outer route shell still has rounded corners`);
      }
      if (metrics.scrollWidth > metrics.viewportWidth + 1) {
        failures.push(`${route}: horizontal overflow (${metrics.scrollWidth}px > ${metrics.viewportWidth}px)`);
      }
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log("Global full-screen shell check OK.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
