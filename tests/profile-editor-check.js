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

async function inspectEditor(page, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(`${page.context()._options.baseURL}/index.html#perfil`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-action="toggle-edit-profile"]', { timeout: 30000 });
  await page.click('[data-action="toggle-edit-profile"]');
  await page.waitForSelector(".profile-editor-shell", { timeout: 10000 });

  const metrics = await page.evaluate(() => {
    const modal = document.querySelector(".profile-editor-shell");
    const panel = document.querySelector(".app-modal-panel");
    const rect = modal.getBoundingClientRect();
    const avatar = modal.querySelector(".profile-edit-avatar");
    const avatarImage = avatar?.querySelector("img");
    const previewAvatar = modal.querySelector(".profile-preview-avatar");
    const previewAvatarImage = previewAvatar?.querySelector("img");
    const avatarRect = avatar?.getBoundingClientRect();
    const avatarImageRect = avatarImage?.getBoundingClientRect();
    const previewAvatarRect = previewAvatar?.getBoundingClientRect();
    const previewAvatarImageRect = previewAvatarImage?.getBoundingClientRect();
    return {
      width: Math.round(rect.width),
      viewportWidth: innerWidth,
      pageOverflow: document.documentElement.scrollWidth > innerWidth,
      modalOverflow: modal.scrollWidth > modal.clientWidth,
      panelOverflow: panel.scrollWidth > panel.clientWidth,
      nativeFileVisible: [...modal.querySelectorAll('input[type="file"]')].some((input) => input.offsetParent !== null),
      visibleBase64: modal.innerText.includes("data:image"),
      tabs: [...modal.querySelectorAll(".profile-editor-tab")].map((tab) => tab.textContent.trim()),
      previewVisible: Boolean(modal.querySelector(".profile-editor-preview")?.offsetParent),
      avatarContained: Boolean(avatarRect && avatarImageRect
        && avatarImageRect.width <= avatarRect.width
        && avatarImageRect.height <= avatarRect.height),
      previewAvatarContained: Boolean(previewAvatarRect && previewAvatarImageRect
        && previewAvatarImageRect.width <= previewAvatarRect.width
        && previewAvatarImageRect.height <= previewAvatarRect.height),
    };
  });

  if (viewport.width >= 1000 && metrics.width < 880) throw new Error(`Editor too narrow on desktop: ${metrics.width}px`);
  if (viewport.width >= 1000 && metrics.width > metrics.viewportWidth * 0.96) {
    throw new Error(`Editor exceeds viewport: ${metrics.width}/${metrics.viewportWidth}`);
  }
  if (metrics.pageOverflow || metrics.modalOverflow || metrics.panelOverflow) throw new Error(`Horizontal overflow detected: ${JSON.stringify(metrics)}`);
  if (metrics.nativeFileVisible) throw new Error("Native file input is visible");
  if (metrics.visibleBase64) throw new Error("Base64 data is visible");
  if (!metrics.previewVisible) throw new Error("Live profile preview is missing");
  if (!metrics.avatarContained || !metrics.previewAvatarContained) {
    throw new Error(`Profile image escaped avatar container: ${JSON.stringify(metrics)}`);
  }
  for (const label of ["Perfil principal", "Aparência", "Links"]) {
    if (!metrics.tabs.includes(label)) throw new Error(`Missing tab: ${label}`);
  }

  if (process.env.PROFILE_EDITOR_SCREENSHOT && viewport.width >= 1000) {
    await page.screenshot({ path: process.env.PROFILE_EDITOR_SCREENSHOT, fullPage: false });
  }
  await page.click('[data-action="profile-image-picker-open"][data-image-type="avatar"]');
  await page.waitForSelector(".profile-image-picker.is-open");
  const picker = await page.locator(".profile-image-picker.is-open").innerText();
  if (!picker.includes("Selecionar imagem") || !picker.includes("Arraste uma imagem ou clique para enviar")) {
    throw new Error("Visual image picker content is incomplete");
  }
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${port}` });
  await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
    route.fulfill({
      contentType: "text/javascript",
      body: `
        (() => {
          const user = {
            id: "profile-editor-test",
            email: "perfil.real@ansend.test",
            role: "authenticated",
            aud: "authenticated",
            user_metadata: {
              full_name: "Perfil real",
              display_name: "Perfil real",
              username: "perfil-real",
              account_role: "artista",
              music_styles: ["Trap", "R&B"]
            }
          };
          const session = { user, access_token: "test-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
          let profile = {
            id: user.id,
            email: user.email,
            full_name: "Perfil real",
            display_name: "Perfil real",
            username: "perfil-real",
            account_role: "artista",
            bio: "Bio real do perfil.",
            avatar_url: "/assets/ansend-main-banner.png",
            banner_url: "/assets/ansend-main-banner.png",
            music_styles: ["Trap", "R&B"]
          };
          function tableApi(table) {
            const api = {
              select() { return api; },
              eq() { return api; },
              order() { return Promise.resolve({ data: table === "public_profiles" ? [profile] : [], error: null }); },
              maybeSingle() { return Promise.resolve({ data: table === "profiles" ? profile : null, error: null }); },
              upsert(payload) {
                profile = { ...profile, ...payload };
                return { select: () => ({ single: () => Promise.resolve({ data: profile, error: null }) }) };
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
                  onAuthStateChange: (callback) => {
                    setTimeout(() => callback("INITIAL_SESSION", session), 0);
                    return { data: { subscription: { unsubscribe() {} } } };
                  },
                  signOut: () => Promise.resolve({ error: null })
                },
                from: tableApi,
                storage: { from: () => ({ upload: () => Promise.resolve({ data: null, error: null }), getPublicUrl: () => ({ data: { publicUrl: "" } }) }) }
              };
            }
          };
        })();
      `,
    });
  });
  const page = await context.newPage();
  try {
    await inspectEditor(page, { width: 1366, height: 768 });
    await page.click('.profile-image-picker-dialog [data-action="profile-image-picker-close"]');
    await page.click(".app-modal-close");
    await inspectEditor(page, { width: 390, height: 844 });
    console.log("Profile editor OK: large, responsive, visual uploads, no horizontal overflow.");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
