const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const screenshotLabel = process.env.RESPONSIVE_SCREENSHOT_LABEL || "after";
const screenshotDir = path.join(root, "tests", "responsive-screenshots", screenshotLabel);
const captureScreenshots = process.env.RESPONSIVE_CAPTURE_SCREENSHOTS !== "0";
const targetRoutes = [
  "feed",
  "nexo-feed",
  "marketplace",
  "produtores",
  "comunidade",
  "chat",
  "biblioteca",
  "musicas",
  "compras",
  "favoritos",
  "carrinho",
  "perfil",
  "cadastrar",
  "configuracoes",
  "vendedor",
  "beat-1",
  "playlist-pack-trap-essentials",
  "suporte",
];

const viewports = [
  [360, 800],
  [375, 812],
  [390, 844],
  [412, 915],
  [430, 932],
  [768, 1024],
  [1024, 1366],
  [1440, 900],
];

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

function supabaseMock() {
  return `
    (() => {
      const user = {
        id: "responsive-user",
        email: "responsive@example.com",
        role: "authenticated",
        aud: "authenticated",
        user_metadata: { full_name: "Responsive Test", account_role: "artista", music_styles: ["Trap", "Rap"] }
      };
      const session = { user, access_token: "responsive-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
      const profile = {
        id: user.id,
        email: user.email,
        username: "responsive-test",
        full_name: "Responsive Test",
        display_name: "Responsive Test",
        artistic_name: "Responsive Test",
        account_role: "artista",
        music_styles: ["Trap", "Rap"],
        bio: "Artista validando responsividade mobile na ANSEND.",
        city: "Sao Paulo",
        avatar_url: "assets/ansend-logo-square.png"
      };
      const professional = {
        id: "professional-test",
        user_id: "professional-test",
        username: "produtor-test",
        full_name: "Produtor Test",
        display_name: "Produtor Test",
        artistic_name: "Produtor Test",
        account_role: "produtor",
        bio: "Produtor musical para testes.",
        avatar_url: "assets/ansend-logo-square.png"
      };
      function rowsFor(table) {
        if (table === "profiles" || table === "public_profiles") return [profile, professional];
        if (table === "notifications") return [];
        if (table === "hiring_posts") return [];
        if (table === "direct_message_conversations") return [{
          id: "conversation-responsive",
          created_by: user.id,
          type: "direct",
          last_message_at: new Date().toISOString(),
        }];
        if (table === "direct_message_messages") return Array.from({ length: 8 }, (_, index) => ({
          id: "message-" + index,
          conversation_id: "conversation-responsive",
          sender_id: index % 2 ? user.id : professional.id,
          body: "Mensagem longa de teste responsivo " + index + " com texto suficiente para validar quebra de linha.",
          created_at: new Date(Date.now() + index * 1000).toISOString(),
        }));
        if (table === "direct_message_participants") return [
          { conversation_id: "conversation-responsive", profile_id: user.id },
          { conversation_id: "conversation-responsive", profile_id: professional.id },
        ];
        return [];
      }
      function apiFor(table) {
        const api = {
          select() { return api; },
          insert() { return api; },
          update() { return api; },
          upsert() { return api; },
          delete() { return api; },
          eq() { return api; },
          neq() { return api; },
          in() { return api; },
          ilike() { return api; },
          order() { return api; },
          limit() { return api; },
          range() { return api; },
          single: async () => ({ data: rowsFor(table)[0] || null, error: null }),
          maybeSingle: async () => ({ data: rowsFor(table)[0] || null, error: null }),
          then(resolve) { return Promise.resolve({ data: rowsFor(table), error: null }).then(resolve); }
        };
        return api;
      }
      window.supabase = {
        createClient() {
          return {
            auth: {
              getSession: async () => ({ data: { session }, error: null }),
              getUser: async () => ({ data: { user }, error: null }),
              onAuthStateChange(callback) {
                setTimeout(() => callback("INITIAL_SESSION", session), 0);
                return { data: { subscription: { unsubscribe() {} } } };
              },
              signInWithPassword: async () => ({ data: { session, user }, error: null }),
              signUp: async () => ({ data: { session, user }, error: null }),
              signOut: async () => ({ error: null })
            },
            from: apiFor,
            rpc: async (method) => ({ data: method === "is_current_user_admin" ? false : [], error: null }),
            channel: () => ({ on: function() { return this; }, subscribe: function() { return this; } }),
            removeChannel: () => {},
            storage: {
              from: () => ({
                upload: async () => ({ data: { path: "responsive-test" }, error: null }),
                getPublicUrl: () => ({ data: { publicUrl: "assets/ansend-logo-square.png" } })
              })
            }
          };
        }
      };
    })();
  `;
}

async function installMocks(page) {
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (
      url.includes("fonts.googleapis.com") ||
      url.includes("fonts.gstatic.com") ||
      url.includes("cdn.jsdelivr.net") ||
      url.includes("unpkg.com") ||
      url.includes("esm.sh")
    ) {
      const isScript = url.endsWith(".js") || url.includes(".js?");
      return route.fulfill({ status: 200, contentType: isScript ? "text/javascript" : "text/css", body: "" });
    }
    return route.continue();
  });
  await page.route("**/lucide.min.js", (route) => route.fulfill({
    status: 200,
    contentType: "text/javascript",
    body: "window.lucide = { createIcons() {} };",
  }));
  await page.route("**/three.min.js", (route) => route.fulfill({
    status: 200,
    contentType: "text/javascript",
    body: "window.THREE = {};",
  }));
  await page.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => route.fulfill({
    status: 200,
    contentType: "text/javascript",
    body: supabaseMock(),
  }));
}

async function interactWithRoute(page, route) {
  if (route === "chat") {
    const composer = page.locator(".chat-composer-form textarea, textarea[name='body']").first();
    if ((await composer.count()) && await composer.isVisible().catch(() => false)) {
      await composer.fill("Teste de teclado virtual em mensagem longa para validar a area do composer.");
      await composer.focus();
    }
  }

  if (route === "feed") {
    const menu = page.locator(".menu-toggle").first();
    if ((await menu.count()) && await menu.isVisible().catch(() => false)) {
      await menu.click({ timeout: 500 }).catch(() => {});
      await page.waitForTimeout(150);
      await page.keyboard.press("Escape").catch(() => {});
    }
  }
  const modalTrigger = page.locator("[data-action='buy-current'], [data-action='contract-professional'], .mini-buy").first();
  if ((await modalTrigger.count()) && await modalTrigger.isVisible().catch(() => false)) {
    await modalTrigger.click({ timeout: 500 }).catch(() => {});
    await page.waitForTimeout(150);
    await page.keyboard.press("Escape").catch(() => {});
  }
}

async function collectMetrics(page) {
  return page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const doc = document.documentElement;
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    };
    const insideHorizontalScroller = (element) => {
      let current = element.parentElement;
      while (current && current !== document.body) {
        const style = getComputedStyle(current);
        const hasScroll = /(auto|scroll)/.test(style.overflowX) && current.scrollWidth > current.clientWidth + 1;
        if (hasScroll) return true;
        current = current.parentElement;
      }
      return false;
    };
    const selectorFor = (element) => {
      if (element.id) return "#" + element.id;
      const classes = Array.from(element.classList || []).slice(0, 4).join(".");
      return element.tagName.toLowerCase() + (classes ? "." + classes : "");
    };
    const overflowElements = Array.from(document.body.querySelectorAll("*"))
      .filter((element) => visible(element))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          selector: selectorFor(element),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          position: style.position,
          display: style.display,
          cssWidth: style.width,
          minWidth: style.minWidth,
          maxWidth: style.maxWidth,
          insideHorizontalScroller: insideHorizontalScroller(element),
        };
      })
      .filter((item) => item.bottom > 0 && item.top < viewportHeight)
      .filter((item) => item.right > viewportWidth + 1 || item.left < -1)
      .filter((item) => !item.insideHorizontalScroller)
      .slice(0, 12);

    const smallTargets = Array.from(document.querySelectorAll("a[href], button, input, select, textarea, [role='button'], [tabindex]:not([tabindex='-1'])"))
      .filter((element) => visible(element))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector: selectorFor(element),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          text: (element.innerText || element.getAttribute("aria-label") || element.value || "").trim().slice(0, 60),
        };
      })
      .filter((item) => item.width < 44 || item.height < 44)
      .slice(0, 16);

    const fixedElements = Array.from(document.body.querySelectorAll("*"))
      .filter((element) => visible(element) && getComputedStyle(element).position === "fixed")
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector: selectorFor(element),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          zIndex: getComputedStyle(element).zIndex,
        };
      })
      .slice(0, 20);

    return {
      route: document.body.dataset.route || location.hash.replace(/^#/, "") || "feed",
      viewportWidth,
      viewportHeight,
      scrollWidth: doc.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      scrollHeight: doc.scrollHeight,
      overflowElements,
      smallTargets,
      fixedElements,
    };
  });
}

function summarizeIssue(metrics) {
  const issues = [];
  if (metrics.scrollWidth > metrics.viewportWidth + 1 || metrics.bodyScrollWidth > metrics.viewportWidth + 1) {
    issues.push(`horizontal overflow ${Math.max(metrics.scrollWidth, metrics.bodyScrollWidth)}>${metrics.viewportWidth}`);
  }
  if (metrics.overflowElements.length) {
    issues.push(`overflow elements: ${metrics.overflowElements.map((item) => item.selector).join(", ")}`);
  }
  if (metrics.smallTargets.length) {
    issues.push(`small targets: ${metrics.smallTargets.map((item) => item.selector).join(", ")}`);
  }
  return issues;
}

async function run() {
  fs.mkdirSync(screenshotDir, { recursive: true });
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({ headless: true });
  const findings = [];

  try {
    for (const [width, height] of viewports) {
      const context = await browser.newContext({
        viewport: { width, height },
        isMobile: width < 768,
        hasTouch: width < 768,
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      await installMocks(page);
      page.on("pageerror", (error) => {
        findings.push({ route: "runtime", viewport: `${width}x${height}`, issue: error.message });
      });
      await page.goto(`${baseUrl}/#feed`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(500);

      for (const route of targetRoutes) {
        await page.evaluate((nextRoute) => {
          if (location.hash !== `#${nextRoute}`) location.hash = nextRoute;
          if (typeof window.renderRoute === "function") window.renderRoute();
        }, route);
        await page.waitForTimeout(350);
        await interactWithRoute(page, route);
        if (captureScreenshots) {
          await page.screenshot({
            path: path.join(screenshotDir, `${width}x${height}-${route.replace(/[^a-z0-9-]/gi, "_")}.png`),
            fullPage: false,
          });
        }
        const metrics = await collectMetrics(page);
        const issues = summarizeIssue(metrics);
        if (issues.length) {
          findings.push({ route, viewport: `${width}x${height}`, issue: issues.join("; "), metrics });
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const report = {
    label: screenshotLabel,
    generatedAt: new Date().toISOString(),
    routes: targetRoutes,
    viewports: viewports.map(([width, height]) => `${width}x${height}`),
    findings,
  };
  const reportPath = path.join(screenshotDir, "responsive-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  if (findings.length) {
    console.error(JSON.stringify({ reportPath, findings: findings.slice(0, 24) }, null, 2));
    process.exit(1);
  }

  console.log(`Responsive regression check passed. Screenshots: ${screenshotDir}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
