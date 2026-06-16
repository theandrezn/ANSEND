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
        id: "multi-tab-user",
        email: "multi@ansend.test",
        role: "authenticated",
        aud: "authenticated",
        app_metadata: { provider: "google" },
        user_metadata: { full_name: "Sessao Multi Aba", display_name: "Sessao Multi Aba", username: "multiaba" }
      };
      const session = { user, access_token: "multi-tab-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
      const profile = {
        id: user.id,
        email: user.email,
        full_name: "Sessao Multi Aba",
        display_name: "Sessao Multi Aba",
        username: "multiaba",
        account_role: "artista",
        avatar_url: "/assets/ansend-logo-icon.png",
        music_styles: ["Trap"]
      };
      function emptyList() {
        return Promise.resolve({ data: [], error: null });
      }
      function tableApi(table) {
        const api = {
          select() { return api; },
          eq() { return api; },
          neq() { return api; },
          in() { return api; },
          limit() { return api; },
          range() { return api; },
          order() {
            return Promise.resolve({ data: table === "public_profiles" ? [profile] : [], error: null });
          },
          maybeSingle() {
            if (table === "profiles" && localStorage.getItem("ansend-test-profile-fail-next") === "1") {
              localStorage.removeItem("ansend-test-profile-fail-next");
              return Promise.resolve({ data: null, error: { message: "transient profile failure" } });
            }
            return Promise.resolve({ data: table === "profiles" ? profile : null, error: null });
          },
          single() {
            return Promise.resolve({ data: table === "profiles" ? profile : null, error: null });
          },
          upsert(payload) {
            return { select: () => ({ single: () => Promise.resolve({ data: { ...profile, ...payload }, error: null }) }) };
          },
          update(payload) {
            return { eq: () => ({ select: () => ({ maybeSingle: () => Promise.resolve({ data: { ...profile, ...payload }, error: null }) }) }) };
          },
          insert() {
            return { select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) };
          },
          delete() {
            return { eq: () => Promise.resolve({ data: null, error: null }) };
          },
          then(resolve) {
            return emptyList().then(resolve);
          }
        };
        return api;
      }
      window.supabase = {
        createClient(url, key, options) {
          window.__supabaseOptions = options;
          return {
            auth: {
              getSession: async () => ({ data: { session }, error: null }),
              getUser: async () => ({ data: { user }, error: null }),
              onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
              signOut: async () => ({ error: null }),
              signInWithOAuth: async () => ({ data: { url: "#" }, error: null })
            },
            from: tableApi,
            rpc: async (name) => ({ data: name === "is_current_user_admin" ? false : [], error: null }),
            storage: {
              from: () => ({
                upload: async () => ({ data: null, error: null }),
                getPublicUrl: () => ({ data: { publicUrl: "" } })
              })
            }
          };
        }
      };
    })();
  `;
}

async function waitAuthenticated(page) {
  await page.waitForFunction(() => document.body.classList.contains("is-authenticated"), { timeout: 30000 });
  await page.waitForFunction(() => localStorage.getItem("ansend-auth-cache-v1")?.includes("multi-tab-user"), { timeout: 10000 });
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${port}` });

  await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
    route.fulfill({ contentType: "text/javascript", body: supabaseMock() });
  });
  await context.route("**/lucide.min.js", (route) => {
    route.fulfill({ contentType: "text/javascript", body: "window.lucide = { createIcons() {} };" });
  });

  try {
    const perfil = await context.newPage();
    const feed = await context.newPage();
    await Promise.all([
      perfil.goto("/index.html#perfil", { waitUntil: "domcontentloaded" }),
      feed.goto("/index.html#feed", { waitUntil: "domcontentloaded" }),
    ]);
    await Promise.all([waitAuthenticated(perfil), waitAuthenticated(feed)]);

    const authOptions = await perfil.evaluate(() => window.__supabaseOptions?.auth || {});
    if (!authOptions.persistSession || !authOptions.autoRefreshToken || !authOptions.detectSessionInUrl || !authOptions.storage) {
      throw new Error(`Supabase auth options are not persistent/localStorage based: ${JSON.stringify(authOptions)}`);
    }

    await Promise.all([
      perfil.reload({ waitUntil: "domcontentloaded" }),
      feed.reload({ waitUntil: "domcontentloaded" }),
    ]);
    await Promise.all([waitAuthenticated(perfil), waitAuthenticated(feed)]);

    await perfil.evaluate(() => localStorage.setItem("ansend-test-profile-fail-next", "1"));
    await perfil.reload({ waitUntil: "domcontentloaded" });
    await waitAuthenticated(perfil);
    const stillHasCachedProfile = await perfil.evaluate(() => {
      const cached = JSON.parse(localStorage.getItem("ansend-auth-cache-v1") || "null");
      return cached?.profile?.username === "multiaba";
    });
    if (!stillHasCachedProfile) throw new Error("Transient profile failure removed the cached profile/session.");

    await perfil.evaluate(() => document.querySelector('[data-action="logout-account"]')?.click());
    await Promise.all([
      perfil.waitForFunction(() => !document.body.classList.contains("is-authenticated"), { timeout: 10000 }),
      feed.waitForFunction(() => !document.body.classList.contains("is-authenticated"), { timeout: 10000 }),
    ]);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Auth multi-tab OK: refresh/profile failures keep session and explicit logout syncs tabs.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
