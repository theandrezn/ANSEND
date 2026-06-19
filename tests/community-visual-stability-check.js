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
          single: async () => {
            window.__communityStabilityQueryCount += 1;
            return { data: rowsFor(table)[0] || null, error: null };
          },
          maybeSingle: async () => {
            window.__communityStabilityQueryCount += 1;
            return { data: rowsFor(table)[0] || null, error: null };
          },
          then(resolve) {
            window.__communityStabilityQueryCount += 1;
            return Promise.resolve({ data: rowsFor(table), error: null }).then(resolve);
          }
        };
        return api;
      }
      window.__communityStabilityQueryCount = 0;
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
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {}),
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await installMocks(page);
    await page.goto(`${baseUrl}/#comunidade`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".hiring-post", { timeout: 15000 });
    await page.waitForTimeout(650);

    await page.evaluate(() => {
      document.querySelector(".hiring-page").dataset.stabilityProbe = "keep";
      document.querySelector(".hiring-feed-shell").dataset.shellProbe = "keep";
      document.querySelector(".hiring-feed").dataset.feedProbe = "keep";
      document.querySelector(".hiring-composer")?.setAttribute("data-composer-probe", "keep");
      window.scrollTo(0, 220);
    });
    await page.waitForTimeout(650);
    const before = await page.evaluate(() => ({
      probe: document.querySelector(".hiring-page")?.dataset.stabilityProbe || "",
      scrollY: window.scrollY,
      entering: document.body.classList.contains("community-route-enter"),
      postCount: document.querySelectorAll(".hiring-post").length,
      animations: document.querySelector(".hiring-feed-shell")?.getAnimations?.().length || 0,
      queryCount: window.__communityStabilityQueryCount,
    }));

    await page.evaluate(async () => {
      for (let index = 0; index < 10; index += 1) {
        window.__communityStabilityAuthCallback?.("TOKEN_REFRESHED", window.__communityStabilitySession);
        window.__communityStabilityAuthCallback?.("SIGNED_IN", window.__communityStabilitySession);
        window.dispatchEvent(new Event("blur"));
        document.dispatchEvent(new Event("visibilitychange"));
        window.dispatchEvent(new Event("focus"));
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
    });
    await page.waitForTimeout(900);

    const after = await page.evaluate(() => ({
      probe: document.querySelector(".hiring-page")?.dataset.stabilityProbe || "",
      scrollY: window.scrollY,
      entering: document.body.classList.contains("community-route-enter"),
      postCount: document.querySelectorAll(".hiring-post").length,
      animations: document.querySelector(".hiring-feed-shell")?.getAnimations?.().length || 0,
      shellProbe: document.querySelector(".hiring-feed-shell")?.dataset.shellProbe || "",
      feedProbe: document.querySelector(".hiring-feed")?.dataset.feedProbe || "",
      composerProbe: document.querySelector(".hiring-composer")?.dataset.composerProbe || "",
      queryCount: window.__communityStabilityQueryCount,
      layout: (() => {
        const post = document.querySelector(".hiring-post");
        const rect = (selector) => {
          const element = post?.querySelector(selector);
          if (!element) return null;
          const box = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            top: Math.round(box.top),
            right: Math.round(box.right),
            bottom: Math.round(box.bottom),
            left: Math.round(box.left),
            width: Math.round(box.width),
            height: Math.round(box.height),
            minHeight: style.minHeight,
          };
        };
        const avatar = rect(".hiring-author-avatar .hiring-avatar");
        const author = rect(".hiring-author-copy button");
        const role = rect(".hiring-author-copy small");
        const body = rect(".hiring-post-body");
        const menu = rect(".hiring-icon-btn");
        const actions = rect(".hiring-post-actions");
        const professionalActions = rect(".hiring-professional-actions");
        return {
          avatar,
          roleGap: role && author ? role.top - author.bottom : null,
          bodyGap: body && role ? body.top - role.bottom : null,
          actionsGap: actions && body ? actions.top - body.bottom : null,
          professionalGap: professionalActions && actions ? professionalActions.top - actions.bottom : null,
          menuRightAligned: Boolean(menu && body && menu.left >= body.left && menu.right <= body.right + 1),
          bodyMinHeight: body?.minHeight || "",
          actionHeight: actions?.height || 0,
        };
      })(),
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
    if (after.queryCount !== before.queryCount) {
      throw new Error(`Community refetched on same-user auth wake: ${before.queryCount} -> ${after.queryCount}`);
    }
    if (after.shellProbe !== "keep" || after.feedProbe !== "keep" || after.composerProbe !== "keep") {
      throw new Error(`Community shell remounted after focus recovery: ${JSON.stringify({ shell: after.shellProbe, feed: after.feedProbe, composer: after.composerProbe })}`);
    }

    const menuMetrics = await page.evaluate(async () => {
      const pageNode = document.querySelector(".hiring-page");
      const shellNode = document.querySelector(".hiring-feed-shell");
      const feedNode = document.querySelector(".hiring-feed");
      const firstPost = document.querySelector(".hiring-post");
      firstPost.dataset.postProbe = "keep";
      const button = firstPost.querySelector("[data-action='hiring-menu-toggle']");
      const click = (node) => node.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
      click(button);
      await new Promise((resolve) => setTimeout(resolve, 50));
      const open = {
        pageProbe: pageNode.dataset.stabilityProbe || "",
        shellProbe: shellNode.dataset.shellProbe || "",
        feedProbe: feedNode.dataset.feedProbe || "",
        postProbe: firstPost.dataset.postProbe || "",
        menuOpen: Boolean(firstPost.querySelector(".hiring-post-menu")),
        entering: document.body.classList.contains("community-route-enter"),
      };
      click(button);
      await new Promise((resolve) => setTimeout(resolve, 50));
      return {
        ...open,
        menuClosed: !firstPost.querySelector(".hiring-post-menu"),
        postCount: document.querySelectorAll(".hiring-post").length,
      };
    });
    if (
      menuMetrics.pageProbe !== "keep"
      || menuMetrics.shellProbe !== "keep"
      || menuMetrics.feedProbe !== "keep"
      || menuMetrics.postProbe !== "keep"
      || !menuMetrics.menuOpen
      || !menuMetrics.menuClosed
      || menuMetrics.entering
      || menuMetrics.postCount !== before.postCount
    ) {
      throw new Error(`Community menu toggle caused a remount or visual refresh: ${JSON.stringify(menuMetrics)}`);
    }

    const tabMetrics = await page.evaluate(async () => {
      const pageNode = document.querySelector(".hiring-page");
      const shellNode = document.querySelector(".hiring-feed-shell");
      const feedNode = document.querySelector(".hiring-feed");
      const composerNode = document.querySelector(".hiring-composer");
      const tabs = [...document.querySelectorAll("[data-action='hiring-tab']")];
      for (let index = 0; index < 9; index += 1) {
        const tab = tabs[index % tabs.length];
        tab.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        await new Promise((resolve) => setTimeout(resolve, 35));
      }
      await new Promise((resolve) => setTimeout(resolve, 450));
      return {
        pageProbe: pageNode?.dataset.stabilityProbe || "",
        shellProbe: shellNode?.dataset.shellProbe || "",
        feedProbe: feedNode?.dataset.feedProbe || "",
        composerProbe: composerNode?.dataset.composerProbe || "",
        entering: document.body.classList.contains("community-route-enter"),
        skeletonVisible: Boolean(document.querySelector(".hiring-skeleton")),
        scrollY: window.scrollY,
        activeTabs: document.querySelectorAll(".hiring-tabs .is-active").length,
      };
    });
    if (
      tabMetrics.pageProbe !== "keep"
      || tabMetrics.shellProbe !== "keep"
      || tabMetrics.feedProbe !== "keep"
      || tabMetrics.composerProbe !== "keep"
      || tabMetrics.entering
      || tabMetrics.skeletonVisible
      || tabMetrics.activeTabs !== 1
      || Math.abs(tabMetrics.scrollY - after.scrollY) > 2
    ) {
      throw new Error(`Community tabs caused remount, skeleton, animation or scroll jump: ${JSON.stringify(tabMetrics)}`);
    }

    if (
      after.layout.avatar?.width !== 40
      || after.layout.avatar?.height !== 40
      || after.layout.roleGap !== 2
      || after.layout.bodyGap < 0
      || after.layout.bodyGap > 5
      || after.layout.actionsGap < 6
      || after.layout.actionsGap > 10
      || after.layout.professionalGap < 6
      || after.layout.professionalGap > 8
      || after.layout.bodyMinHeight !== "0px"
      || after.layout.actionHeight > 34
      || !after.layout.menuRightAligned
    ) {
      throw new Error(`Community post density regressed: ${JSON.stringify(after.layout)}`);
    }
    if (process.env.COMMUNITY_CAPTURE_SCREENSHOT) {
      await page.screenshot({ path: process.env.COMMUNITY_CAPTURE_SCREENSHOT, fullPage: false });
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
