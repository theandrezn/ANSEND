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
        id: "google-oauth-test",
        email: "google.user@ansend.test",
        role: "authenticated",
        aud: "authenticated",
        app_metadata: { provider: "google" },
        identities: [{ provider: "google" }],
        user_metadata: {
          full_name: "Google User",
          name: "Google User",
          avatar_url: "https://lh3.googleusercontent.com/avatar-test",
          picture: "https://lh3.googleusercontent.com/avatar-test"
        }
      };
      const session = { user, access_token: "google-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
      const hasCallback = location.pathname === "/auth/callback" && location.search.includes("ansend_oauth=google");
      const existingProfile = location.search.includes("existing=1");
      let profile = existingProfile ? {
        id: user.id,
        email: user.email,
        full_name: "Google User",
        account_role: "artista",
        quiz_completed: true
      } : null;
      function tableApi(table) {
        const api = {
          select() { return api; },
          eq() { return api; },
          order() { return Promise.resolve({ data: table === "public_profiles" && profile ? [profile] : [], error: null }); },
          maybeSingle() { return Promise.resolve({ data: table === "profiles" ? profile : null, error: null }); },
          upsert(payload) {
            window.__profileUpsert = payload;
            profile = { ...profile, ...payload };
            return { select: () => ({ single: () => Promise.resolve({ data: profile, error: null }) }) };
          },
          update(payload) {
            window.__profileUpdate = payload;
            profile = { ...profile, ...payload };
            return { eq: () => ({ select: () => ({ maybeSingle: () => Promise.resolve({ data: profile, error: null }) }) }) };
          }
        };
        return api;
      }
      window.supabase = {
        createClient() {
          return {
            auth: {
              getSession: () => Promise.resolve({ data: { session: hasCallback ? session : null }, error: null }),
              getUser: () => Promise.resolve({ data: { user: hasCallback ? user : null }, error: null }),
              onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
              signInWithOAuth: (args) => {
                window.__oauthArgs = args;
                return Promise.resolve({
                  data: { provider: "google", url: location.origin + "/index.html#google-oauth-test" },
                  error: null
                });
              }
            },
            from: tableApi,
            rpc: () => Promise.resolve({ data: [], error: null })
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
    route.fulfill({ contentType: "text/javascript", body: supabaseMock() });
  });

  try {
    const page = await context.newPage();
    await page.goto(`/index.html#vendedor`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('[data-action="seller-google"]', { timeout: 30000 });
    await page.click('[data-action="seller-google"]');
    await page.waitForFunction(() => Boolean(window.__oauthArgs));
    const oauthArgs = await page.evaluate(() => window.__oauthArgs);

    if (oauthArgs.provider !== "google") throw new Error(`Wrong provider: ${JSON.stringify(oauthArgs)}`);
    const origin = `http://127.0.0.1:${port}`;
    if (oauthArgs.options.skipBrowserRedirect !== true) throw new Error("Google OAuth should validate before browser redirect");
    if (!oauthArgs.options.redirectTo.startsWith(`${origin}/auth/callback`)) throw new Error(`Wrong redirectTo: ${oauthArgs.options.redirectTo}`);
    if (oauthArgs.options.redirectTo.includes("/#perfil")) throw new Error(`OAuth redirectTo must not go directly to #perfil: ${oauthArgs.options.redirectTo}`);
    if (!oauthArgs.options.redirectTo.includes("ansend_oauth=google")) throw new Error(`Missing OAuth callback marker: ${oauthArgs.options.redirectTo}`);

    const callbackPage = await context.newPage();
    await callbackPage.goto(`/auth/callback?ansend_oauth=google`, { waitUntil: "domcontentloaded" });
    await callbackPage.waitForFunction(() => location.hash === "#onboarding", null, { timeout: 30000 });
    const upsert = await callbackPage.evaluate(() => window.__profileUpsert);
    const update = await callbackPage.evaluate(() => window.__profileUpdate);
    if (!upsert || upsert.id !== "google-oauth-test" || upsert.auth_provider !== "google" || upsert.quiz_completed !== false) {
      throw new Error(`Google callback did not sync profile: ${JSON.stringify(upsert)}`);
    }
    if (!update || update.auth_provider !== "google" || !update.last_login_at) {
      throw new Error(`Google callback did not touch login metadata: ${JSON.stringify(update)}`);
    }

    const existingPage = await context.newPage();
    await existingPage.goto(`/auth/callback?ansend_oauth=google&existing=1`, { waitUntil: "domcontentloaded" });
    await existingPage.waitForFunction(() => location.hash === "#perfil", null, { timeout: 30000 });
    const existingUpsert = await existingPage.evaluate(() => window.__profileUpsert);
    if (existingUpsert) throw new Error(`Completed Google account must not be recreated: ${JSON.stringify(existingUpsert)}`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Google OAuth OK: new accounts go to mandatory onboarding and completed accounts keep normal access.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
