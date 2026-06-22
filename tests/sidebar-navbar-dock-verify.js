const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");
const assert = require("node:assert");
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

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  console.log("Playwright browser launched for Sidebar & Navbar Dock verification...");

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    
    // Mock Supabase client loading
    await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
      route.fulfill({
        contentType: "text/javascript",
        body: `
          (() => {
            const user = {
              id: "dock-test-user",
              email: "artist@example.com",
              role: "authenticated",
              aud: "authenticated",
              user_metadata: { full_name: "Dock Test", account_role: "artista", music_styles: ["Trap"] }
            };
            const session = { user, access_token: "test-token", expires_at: Math.floor(Date.now() / 1000) + 3600 };
            const profile = {
              id: user.id,
              email: user.email,
              full_name: "Dock Test",
              display_name: "Dock Test",
              username: "dock-test",
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
    await page.goto(`http://127.0.0.1:${port}/index.html#feed`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2500);

    // Dismiss/hide any blocking modals
    await page.evaluate(() => {
      document.querySelector(".spotify-quiz-modal")?.remove();
      document.querySelector(".spotify-quiz-overlay")?.remove();
      document.body.classList.remove("onboarding-open");
      document.body.setAttribute("data-route", "feed");
    });

    // 1. Verify Sidebar Magnification
    console.log("Verifying Sidebar macOS Dock magnification effect...");
    
    // Log media query results in browser context
    const mqStatus = await page.evaluate(() => {
      return {
        prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        isFinePointer: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
        hoverNone: window.matchMedia("(hover: none)").matches,
        pointerCoarse: window.matchMedia("(pointer: coarse)").matches,
        sidebarPresent: !!document.querySelector(".sidebar"),
        sidebarVisible: document.querySelector(".sidebar") ? getComputedStyle(document.querySelector(".sidebar")).display : "none"
      };
    });
    console.log("Browser media query and sidebar status:", mqStatus);

    const sidebarItems = await page.$$(".sidebar .sidebar-profile-card, .sidebar .sidebar-main-btn, .sidebar .sidebar-nav-item");
    assert.ok(sidebarItems.length > 5, "Sidebar items should be loaded and selectable");

    // Move pointer to the middle of the first sidebar item (Profile Card)
    const firstSidebarBox = await sidebarItems[0].boundingBox();
    console.log("First sidebar item bounding box:", firstSidebarBox);
    const sbCenterX = firstSidebarBox.x + firstSidebarBox.width / 2;
    const sbCenterY = firstSidebarBox.y + firstSidebarBox.height / 2;

    // Check what element is at sbCenterX, sbCenterY
    const topElement = await page.evaluate(({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      return el ? { tagName: el.tagName, className: el.className, id: el.id, outerHTML: el.outerHTML.slice(0, 100) } : null;
    }, { x: sbCenterX, y: sbCenterY });
    console.log("Top element at sidebar center point:", topElement);

    await page.mouse.move(sbCenterX, sbCenterY);
    await page.waitForTimeout(500); // Wait slightly longer for animation request frame

    const sbTransformsOnHover = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll(".sidebar .sidebar-profile-card, .sidebar .sidebar-main-btn, .sidebar .sidebar-nav-item"));
      return els.map((el, i) => ({ index: i, text: el.textContent.trim(), transform: el.style.transform, inlineStyle: el.getAttribute("style") }));
    });

    console.log("Sidebar transforms on hover profile card:", sbTransformsOnHover.slice(0, 3));
    const activeSbTransform = sbTransformsOnHover[0].transform;
    assert.ok(activeSbTransform.includes("scale(1.1") && activeSbTransform.includes("translateX"), "Hovered sidebar item should scale up and translate horizontally");

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);

    const sbTransformsOnLeave = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll(".sidebar .sidebar-profile-card, .sidebar .sidebar-main-btn, .sidebar .sidebar-nav-item"));
      return els.map(el => el.style.transform);
    });
    console.log("Sidebar transforms after mouse leave (first 3):", sbTransformsOnLeave.slice(0, 3));
    assert.ok(sbTransformsOnLeave.every(t => !t || t.includes("scale(1)")), "All sidebar items should reset on mouse leave");

    // 2. Verify Navbar Magnification
    console.log("Verifying Navbar macOS Dock magnification effect...");
    
    const nbStatus = await page.evaluate(() => {
      const nav = document.querySelector(".floating-navbar");
      const topbar = document.querySelector(".topbar");
      const links = Array.from(document.querySelectorAll(".floating-navbar .navbar-link"));
      return {
        bodyClassName: document.body.className,
        bodyDatasetRoute: document.body.getAttribute("data-route"),
        topbarPresent: !!topbar,
        topbarDisplay: topbar ? getComputedStyle(topbar).display : "none",
        topbarVisibility: topbar ? getComputedStyle(topbar).visibility : "none",
        topbarWidth: topbar ? topbar.getBoundingClientRect().width : 0,
        topbarHeight: topbar ? topbar.getBoundingClientRect().height : 0,
        navbarPresent: !!nav,
        navbarDisplay: nav ? getComputedStyle(nav).display : "none",
        navbarWidth: nav ? nav.getBoundingClientRect().width : 0,
        navbarHeight: nav ? nav.getBoundingClientRect().height : 0,
        linksCount: links.length,
        linksBoundingBoxes: links.map(l => l.getBoundingClientRect().toJSON())
      };
    });
    console.log("Navbar & Topbar layout details:", nbStatus);

    const navbarItems = await page.$$(".floating-navbar .navbar-link");
    assert.ok(navbarItems.length > 2, "Navbar links should be loaded and selectable");

    // Move pointer to the middle of the first navbar link
    const firstNavbarBox = await navbarItems[0].boundingBox();
    console.log("First navbar item bounding box:", firstNavbarBox);
    const nbCenterX = firstNavbarBox.x + firstNavbarBox.width / 2;
    const nbCenterY = firstNavbarBox.y + firstNavbarBox.height / 2;

    await page.mouse.move(nbCenterX, nbCenterY);
    await page.waitForTimeout(500);

    const nbTransformsOnHover = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll(".floating-navbar .navbar-link"));
      return els.map((el, i) => ({ index: i, transform: el.style.transform }));
    });

    console.log("Navbar transforms on hover first link:", nbTransformsOnHover.slice(0, 3));
    const activeNbTransform = nbTransformsOnHover[0].transform;
    assert.ok(activeNbTransform.includes("scale(1.1") && activeNbTransform.includes("translateY"), "Hovered navbar item should scale up and translate vertically");

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);

    const nbTransformsOnLeave = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll(".floating-navbar .navbar-link"));
      return els.map(el => el.style.transform);
    });
    console.log("Navbar transforms after mouse leave:", nbTransformsOnLeave);
    assert.ok(nbTransformsOnLeave.every(t => !t || t.includes("scale(1)")), "All navbar items should reset on mouse leave");

    console.log("Sidebar & Navbar Dock magnification verification tests PASSED successfully!");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error("Verification failed:", error);
  process.exit(1);
});
