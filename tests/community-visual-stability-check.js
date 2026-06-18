const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function serveStatic(req, res) {
  const pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
  const safePath = pathname === "/" ? "/index.html" : pathname;
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
        id: "community-stability-user",
        email: "community-stability@example.com",
        role: "authenticated",
        aud: "authenticated",
        user_metadata: { full_name: "Community Stability", account_role: "artista" }
      };
      const session = { user, access_token: "community-stability-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
      const profiles = [
        { id: user.id, email: user.email, username: "andrezn", full_name: "theandrezn - FOUNDER", display_name: "theandrezn - FOUNDER", account_role: "Artista", avatar_url: "assets/ansend-logo-square.png" },
        { id: "curator-user", username: "hsegunduu", full_name: "Heber Segundo", display_name: "Heber Segundo", account_role: "Curador", avatar_url: "assets/ansend-logo-square.png" },
        { id: "artist-two", username: "flackbeats", full_name: "FlackBeats", display_name: "FlackBeats", account_role: "Artista", avatar_url: "assets/ansend-logo-square.png" }
      ];
      const posts = Array.from({ length: 10 }, (_, index) => ({
        id: "post-" + (index + 1),
        user_id: index % 2 ? user.id : "curator-user",
        title: index % 2 ? "eaeee rapazeada - precisando de beatmaker" : "vamo pra cima!",
        description: index % 2 ? "eaeee rapazeada - precisando de beatmaker" : "vamo pra cima!",
        category: index % 2 ? "contratacoes" : "duvidas",
        created_at: new Date(Date.now() - (index + 1) * 60000).toISOString(),
        visibility: "public",
        status: "open"
      }));
      function rowsFor(table) {
        if (table === "profiles" || table === "public_profiles") return profiles;
        if (table === "hiring_posts") return posts;
        if (table === "hiring_likes") return [{ post_id: "post-1", user_id: user.id }];
        if (table === "notifications" || table === "promoted_beats") return [];
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
      window.__communityStabilitySession = session;
      window.supabase = {
        createClient() {
          return {
            auth: {
              getSession: async () => ({ data: { session }, error: null }),
              getUser: async () => ({ data: { user }, error: null }),
              onAuthStateChange(callback) {
                window.__communityStabilityAuthCallback = callback;
                setTimeout(() => callback("INITIAL_SESSION", session), 0);
                return { data: { subscription: { unsubscribe() {} } } };
              },
              signOut: async () => ({ error: null })
            },
            from: apiFor,
            rpc: async () => ({ data: [], error: null }),
            channel: () => ({ on() { return this; }, subscribe() { return this; } }),
            removeChannel: () => {},
            storage: {
              from: () => ({
                upload: async () => ({ data: { path: "community-stability" }, error: null }),
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
    if (url.includes("supabase.min.js")) {
      return route.fulfill({ status: 200, contentType: "text/javascript", body: supabaseMock() });
    }
    if (
      url.includes("fonts.googleapis.com")
      || url.includes("fonts.gstatic.com")
      || url.includes("cdn.jsdelivr.net")
      || url.includes("unpkg.com")
      || url.includes("esm.sh")
    ) {
      const isScript = url.endsWith(".js") || url.includes(".js?");
      return route.fulfill({ status: 200, contentType: isScript ? "text/javascript" : "text/css", body: "window.lucide={createIcons(){}};" });
    }
    return route.continue();
  });
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await installMocks(page);
    await page.goto(`${baseUrl}/#comunidade`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".hiring-post", { timeout: 15000 });
    await page.waitForTimeout(650);

    await page.evaluate(() => {
      document.querySelector(".hiring-page").dataset.stabilityProbe = "keep";
      window.scrollTo(0, 220);
    });
    await page.waitForTimeout(650);
    const before = await page.evaluate(() => ({
      probe: document.querySelector(".hiring-page")?.dataset.stabilityProbe || "",
      scrollY: window.scrollY,
      entering: document.body.classList.contains("community-route-enter"),
      postCount: document.querySelectorAll(".hiring-post").length,
      animations: document.querySelector(".hiring-feed-shell")?.getAnimations?.().length || 0,
    }));

    await page.evaluate(() => {
      window.__communityStabilityAuthCallback?.("TOKEN_REFRESHED", window.__communityStabilitySession);
    });
    await page.waitForTimeout(900);

    const after = await page.evaluate(() => ({
      probe: document.querySelector(".hiring-page")?.dataset.stabilityProbe || "",
      scrollY: window.scrollY,
      entering: document.body.classList.contains("community-route-enter"),
      postCount: document.querySelectorAll(".hiring-post").length,
      animations: document.querySelector(".hiring-feed-shell")?.getAnimations?.().length || 0,
    }));

    if (before.probe !== "keep" || after.probe !== "keep") {
      throw new Error(`Community DOM remounted on same-user auth wake. before=${before.probe} after=${after.probe}`);
    }
    if (Math.abs(after.scrollY - before.scrollY) > 2) {
      throw new Error(`Community scroll changed after auth wake: ${before.scrollY} -> ${after.scrollY}`);
    }
    if (after.entering || after.animations) {
      throw new Error(`Community re-applied route animation after auth wake: ${JSON.stringify(after)}`);
    }
    if (after.postCount !== before.postCount) {
      throw new Error(`Community posts changed during visual stability check: ${before.postCount} -> ${after.postCount}`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  console.log("Community visual stability check passed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
