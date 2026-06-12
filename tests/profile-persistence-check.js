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
        if (fallbackError) return res.end("Not found");
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
      const key = "ansend-profile-persistence-db";
      const user = {
        id: "profile-persistence-test",
        email: "persistencia@ansend.test",
        role: "authenticated",
        aud: "authenticated",
        app_metadata: { provider: "google" },
        identities: [{ provider: "google" }],
        user_metadata: {
          full_name: "Nome do Google",
          display_name: "Nome do Google",
          username: "google-antigo",
          account_role: "artista",
          avatar_url: "https://lh3.googleusercontent.com/old-avatar"
        }
      };
      const session = { user, access_token: "test-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
      const defaultProfile = {
        id: user.id,
        email: user.email,
        full_name: "Perfil salvo",
        display_name: "Perfil salvo",
        username: "perfil-salvo",
        account_role: "produtor",
        bio: "Bio que veio do banco.",
        avatar_url: "/assets/ansend-logo-icon.png",
        banner_url: "/assets/ansend-main-banner.png",
        music_styles: ["Trap", "Drill"]
      };
      function readProfile() {
        return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultProfile));
      }
      function writeProfile(profile) {
        localStorage.setItem(key, JSON.stringify(profile));
        return profile;
      }
      function tableApi(table) {
        const api = {
          select() { return api; },
          eq() { return api; },
          order() {
            const profile = readProfile();
            return Promise.resolve({ data: table === "public_profiles" ? [profile] : [], error: null });
          },
          maybeSingle() {
            return Promise.resolve({ data: table === "profiles" ? readProfile() : null, error: null });
          },
          upsert(payload) {
            window.__profileUpserts = window.__profileUpserts || [];
            window.__profileUpserts.push(payload);
            const profile = writeProfile({ ...readProfile(), ...payload });
            return { select: () => ({ single: () => Promise.resolve({ data: profile, error: null }) }) };
          },
          update(payload) {
            window.__profileUpdates = window.__profileUpdates || [];
            window.__profileUpdates.push(payload);
            const profile = writeProfile({ ...readProfile(), ...payload });
            return { eq: () => ({ select: () => ({ maybeSingle: () => Promise.resolve({ data: profile, error: null }) }) }) };
          }
        };
        return api;
      }
      window.supabase = {
        createClient() {
          return {
            auth: {
              getSession: () => Promise.resolve({ data: { session }, error: null }),
              getUser: () => Promise.resolve({ data: { user }, error: null }),
              onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
              signOut: () => Promise.resolve({ error: null })
            },
            from: tableApi,
            rpc: () => Promise.resolve({ data: [], error: null }),
            storage: {
              from: () => ({
                upload: () => Promise.resolve({ data: null, error: null }),
                getPublicUrl: () => ({ data: { publicUrl: "" } })
              })
            }
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
    await page.goto(`/index.html#perfil`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('[data-action="toggle-edit-profile"]', { timeout: 30000 });
    await page.waitForFunction(() => document.body.innerText.includes("Perfil salvo"));

    const bootUpserts = await page.evaluate(() => window.__profileUpserts || []);
    if (bootUpserts.length) {
      throw new Error(`Boot should not overwrite stored profile with auth metadata: ${JSON.stringify(bootUpserts)}`);
    }
    const bootUpdates = await page.evaluate(() => window.__profileUpdates || []);
    if (bootUpdates.some((payload) => "display_name" in payload || "username" in payload || "avatar_url" in payload)) {
      throw new Error(`Login metadata update touched profile identity fields: ${JSON.stringify(bootUpdates)}`);
    }

    await page.click('[data-action="toggle-edit-profile"]');
    await page.waitForSelector(".profile-editor-shell");
    await page.fill('[name="display_name"]', "Perfil persistido");
    await page.fill('[name="username"]', "perfil-persistido");
    await page.selectOption('[name="account_role"]', "beatmaker");
    await page.fill('[name="full_name"]', "Nome completo persistido");
    await page.fill('[name="bio"]', "Bio persistida depois do refresh.");
    await page.click('.profile-editor-shell button[type="submit"]');
    await page.waitForSelector(".app-modal", { state: "detached", timeout: 10000 });

    const savedProfile = await page.evaluate(() => JSON.parse(localStorage.getItem("ansend-profile-persistence-db")));
    if (savedProfile.display_name !== "Perfil persistido" || savedProfile.username !== "perfil-persistido" || savedProfile.account_role !== "beatmaker") {
      throw new Error(`Profile was not persisted to Supabase mock: ${JSON.stringify(savedProfile)}`);
    }

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector('[data-action="toggle-edit-profile"]', { timeout: 30000 });
    await page.waitForFunction(() => document.body.innerText.includes("Perfil persistido"));
    const afterRefreshText = await page.locator("body").innerText();
    if (!afterRefreshText.includes("Bio persistida depois do refresh.")) {
      throw new Error("Persisted bio did not survive refresh.");
    }
    if (afterRefreshText.includes("Nome do Google")) {
      throw new Error("Auth metadata overwrote the stored profile after refresh.");
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Profile persistence OK: saved profile survives refresh and auth metadata does not overwrite it.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
