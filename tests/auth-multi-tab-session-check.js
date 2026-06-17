const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const liveEmail = process.env.ANSEND_E2E_EMAIL || "";
const livePassword = process.env.ANSEND_E2E_PASSWORD || "";
const liveBaseURL = process.env.ANSEND_E2E_BASE_URL || "https://ansendmusic.site";

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
      const storageKey = "ansend-test-session-state";
      const user = {
        id: "multi-tab-user",
        email: "multi@ansend.test",
        role: "authenticated",
        aud: "authenticated",
        app_metadata: { provider: "password" },
        user_metadata: { full_name: "Sessao Multi Aba", display_name: "Sessao Multi Aba", username: "multiaba" }
      };
      const profile = {
        id: user.id,
        email: user.email,
        full_name: "Sessao Multi Aba",
        display_name: "Sessao Multi Aba",
        username: "multiaba",
        account_role: "artista",
        avatar_url: "/assets/ansend-logo-square.png",
        music_styles: ["Trap"]
      };
      const session = () => ({
        user,
        access_token: "redacted-local-test-token",
        refresh_token: "redacted-local-refresh-token",
        expires_at: Math.floor(Date.now() / 1000) + 3600
      });
      function signedIn() {
        return localStorage.getItem(storageKey) === "signed-in";
      }
      function emit(callbacks, event, currentSession) {
        callbacks.forEach((callback) => callback(event, currentSession));
      }
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
          window.__supabaseOptions = { url, key, auth: options.auth };
          const callbacks = [];
          window.addEventListener("storage", (event) => {
            if (event.key !== storageKey) return;
            emit(callbacks, event.newValue === "signed-in" ? "SIGNED_IN" : "SIGNED_OUT", event.newValue === "signed-in" ? session() : null);
          });
          window.__ansendTestRefreshToken = () => emit(callbacks, "TOKEN_REFRESHED", signedIn() ? session() : null);
          return {
            auth: {
              getSession: async () => ({ data: { session: signedIn() ? session() : null }, error: null }),
              getUser: async () => ({ data: { user: signedIn() ? user : null }, error: null }),
              onAuthStateChange: (callback) => {
                callbacks.push(callback);
                return { data: { subscription: { unsubscribe() {} } } };
              },
              signInWithPassword: async () => {
                localStorage.setItem(storageKey, "signed-in");
                const currentSession = session();
                emit(callbacks, "SIGNED_IN", currentSession);
                return { data: { session: currentSession, user }, error: null };
              },
              signOut: async () => {
                localStorage.setItem(storageKey, "signed-out");
                emit(callbacks, "SIGNED_OUT", null);
                return { error: null };
              },
              signInWithOAuth: async () => ({ data: { url: "#" }, error: null }),
              refreshSession: async () => {
                const currentSession = signedIn() ? session() : null;
                emit(callbacks, "TOKEN_REFRESHED", currentSession);
                return { data: { session: currentSession }, error: null };
              }
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

async function startServer() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return server;
}

async function installAuthTextRecorder(context) {
  await context.addInitScript(() => {
    window.__authButtonTextHistory = [];
    const record = () => {
      const text = document.querySelector(".navbar-auth-btn .auth-btn-text")?.textContent?.trim();
      if (text) window.__authButtonTextHistory.push(text);
    };
    window.addEventListener("DOMContentLoaded", () => {
      record();
      new MutationObserver(record).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
    });
  });
}

async function waitAuthenticated(page) {
  await page.waitForFunction(() => document.body.classList.contains("is-authenticated"), { timeout: 45000 });
  await page.waitForFunction(() => {
    const text = document.querySelector(".navbar-auth-btn .auth-btn-text")?.textContent?.trim() || "";
    return text && text !== "Entrar" && text !== "Sign In" && text !== "Carregando" && text !== "Loading";
  }, { timeout: 45000 });
}

async function waitLoggedOut(page) {
  await page.waitForFunction(() => !document.body.classList.contains("is-authenticated"), { timeout: 30000 });
  await page.waitForFunction(() => {
    const text = document.querySelector(".navbar-auth-btn .auth-btn-text")?.textContent?.trim() || "";
    return text === "Entrar" || text === "Sign In";
  }, { timeout: 30000 });
}

async function login(page, email, password) {
  await page.waitForSelector("#seller-email", { timeout: 45000 });
  await page.fill("#seller-email", email);
  await page.fill("#seller-password", password);
  await Promise.all([
    waitAuthenticated(page),
    page.locator(".seller-auth-form").evaluate((form) => form.requestSubmit()),
  ]);
}

async function diagnostics(page) {
  return page.evaluate(() => ({
    diag: window.__ANSEND_AUTH_DIAG__ || null,
    authTextHistory: window.__authButtonTextHistory || [],
    supabaseOptions: window.__supabaseOptions?.auth || null,
  }));
}

async function runScenario({ context, baseURL, email, password, localMode }) {
  await installAuthTextRecorder(context);
  if (localMode) {
    await context.addInitScript(() => {
      if (!localStorage.getItem("ansend-test-session-state")) {
        localStorage.setItem("ansend-test-session-state", "signed-out");
      }
    });
    await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
      route.fulfill({ contentType: "text/javascript", body: supabaseMock() });
    });
    await context.route("**/lucide.min.js", (route) => {
      route.fulfill({ contentType: "text/javascript", body: "window.lucide = { createIcons() {} };" });
    });
  }

  const pageA = await context.newPage();
  await pageA.goto(`${baseURL}/#vendedor`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await login(pageA, email, password);

  const pageB = await context.newPage();
  await pageB.goto(`${baseURL}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await waitAuthenticated(pageB);
  const beforeProfile = await diagnostics(pageB);
  if (beforeProfile.authTextHistory.includes("Entrar") || beforeProfile.authTextHistory.includes("Sign In")) {
    throw new Error(`Second tab rendered anonymous navbar before session resolution: ${JSON.stringify(beforeProfile.authTextHistory)}`);
  }

  await pageB.goto(`${baseURL}/#perfil`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await waitAuthenticated(pageB);
  await Promise.all([
    pageA.reload({ waitUntil: "domcontentloaded" }),
    pageB.reload({ waitUntil: "domcontentloaded" }),
  ]);
  await Promise.all([waitAuthenticated(pageA), waitAuthenticated(pageB)]);

  await pageB.close();
  const reopenedB = await context.newPage();
  await reopenedB.goto(`${baseURL}/#perfil`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await waitAuthenticated(reopenedB);

  if (localMode) {
    await reopenedB.evaluate(() => window.__ansendTestRefreshToken?.());
    await waitAuthenticated(reopenedB);
  } else {
    await reopenedB.evaluate(() => window.__ANSEND_AUTH_DIAG__);
  }

  const collected = await Promise.all([pageA, reopenedB].map(diagnostics));
  const storageKeys = collected.map((item) => item.diag?.storageKey).filter(Boolean);
  const userIds = collected.map((item) => item.diag?.userId).filter(Boolean);
  if (new Set(storageKeys).size !== 1 || !storageKeys[0]) {
    throw new Error(`Tabs disagree on Supabase storage key: ${JSON.stringify(collected)}`);
  }
  if (new Set(userIds).size !== 1 || !userIds[0]) {
    throw new Error(`Tabs disagree on authenticated userId: ${JSON.stringify(collected)}`);
  }

  const authOptions = collected.find((item) => item.supabaseOptions)?.supabaseOptions;
  if (localMode && (!authOptions?.persistSession || !authOptions?.autoRefreshToken || !authOptions?.detectSessionInUrl || !authOptions?.storage)) {
    throw new Error(`Supabase auth options are not persistent/localStorage based: ${JSON.stringify(authOptions)}`);
  }

  await pageA.evaluate(() => document.querySelector('[data-action="logout-account"]')?.click());
  await Promise.all([waitLoggedOut(pageA), waitLoggedOut(reopenedB)]);

  return collected.map((item) => item.diag);
}

async function run() {
  const localMode = !(liveEmail && livePassword);
  let server = null;
  let baseURL = liveBaseURL.replace(/\/$/, "");
  if (localMode) {
    server = await startServer();
    baseURL = `http://127.0.0.1:${server.address().port}`;
    console.warn("ANSEND_E2E_EMAIL/PASSWORD not set; running multi-tab auth against local Supabase Auth mock.");
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL });

  try {
    const diag = await runScenario({
      context,
      baseURL,
      email: liveEmail || "multi@ansend.test",
      password: livePassword || "password-local-test",
      localMode,
    });
    console.log(`Auth multi-tab OK (${localMode ? "local mock" : "live"}): ${JSON.stringify(diag)}`);
  } finally {
    await browser.close();
    if (server) await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
