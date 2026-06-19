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

async function inspectHome(page, width) {
  return page.evaluate(async (viewportWidth) => {
    const isVisible = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const computed = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        display: style.display,
        filter: style.filter,
        opacity: style.opacity,
        visibility: style.visibility,
        transform: style.transform,
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
      };
    };
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
    window.scrollTo({ top: 1000000, behavior: "auto" });
    await new Promise((resolve) => setTimeout(resolve, 160));
    const footer = document.querySelector(".home-minimal-footer") || document.querySelector(".cinematic-footer");
    const footerRect = footer?.getBoundingClientRect();
    const reachedBottom = Boolean(footerRect && footerRect.top < window.innerHeight && footerRect.bottom > 0);
    window.scrollTo(0, 0);
    return {
      viewportWidth,
      route: document.body.dataset.route,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      searchVisible: isVisible(".ai-diagnostic-form") || isVisible(".ai-input-shell"),
      desktopAuthVisible: isVisible(".navbar-auth-btn"),
      mobileProfileVisible: isVisible(".navbar-mobile-profile"),
      notificationVisible: isVisible(".navbar-notification-btn"),
      headline: document.querySelector(".hero-morph-title")?.innerText || "",
      base: computed(".home-parallax__layer--base"),
      hero: computed(".playlist-hero.an-theater-hero.ai-hero"),
      topBeat: computed(".top-beat-card"),
      blocks: computed(".nexo-blocks-container"),
      recent: computed(".recent-activity-section"),
      reachedBottom,
    };
  }, width);
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true });
  const widths = [320, 360, 375, 390, 412, 430, 768, 1024, 1280, 1440];
  const results = [];
  try {
    for (const width of widths) {
      const height = width < 768 ? 844 : width === 768 ? 1024 : 900;
      const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 768 });
      await page.goto(`${baseUrl}/#feed`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1200);
      const result = await inspectHome(page, width);
      results.push(result);
      if (process.env.HOME_MOBILE_CAPTURE_SCREENSHOTS && [390, 1440].includes(width)) {
        await page.screenshot({ path: `tests/home-responsive-${width}.png`, fullPage: false });
      }
      if (width < 768) {
        await page.click(".navbar-menu-toggle");
        await page.waitForTimeout(260);
        const menuOpen = await page.evaluate(() => ({
          bodyOpen: document.body.classList.contains("menu-open"),
          expanded: document.querySelector(".navbar-menu-toggle")?.getAttribute("aria-expanded"),
          drawerVisible: getComputedStyle(document.querySelector(".sidebar")).visibility,
        }));
        if (!menuOpen.bodyOpen || menuOpen.expanded !== "true" || menuOpen.drawerVisible !== "visible") {
          throw new Error(`Mobile drawer failed at ${width}px: ${JSON.stringify(menuOpen)}`);
        }
        await page.keyboard.press("Escape");
        await page.waitForTimeout(260);
        const menuClosed = await page.evaluate(() => ({
          bodyOpen: document.body.classList.contains("menu-open"),
          expanded: document.querySelector(".navbar-menu-toggle")?.getAttribute("aria-expanded"),
        }));
        if (menuClosed.bodyOpen || menuClosed.expanded !== "false") {
          throw new Error(`Mobile drawer did not close with Escape at ${width}px: ${JSON.stringify(menuClosed)}`);
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  for (const result of results) {
    if (result.route !== "feed") throw new Error(`Unexpected route at ${result.viewportWidth}px: ${result.route}`);
    if (result.overflowX) throw new Error(`Home has horizontal overflow at ${result.viewportWidth}px`);
    if (result.base?.filter !== "none") throw new Error(`Home content layer is blurred at ${result.viewportWidth}px: ${result.base?.filter}`);
    if (!result.reachedBottom) throw new Error(`Home cannot scroll to bottom at ${result.viewportWidth}px`);
    if (result.viewportWidth < 768) {
      if (result.searchVisible) throw new Error(`Hero search is visible on mobile at ${result.viewportWidth}px`);
      if (result.desktopAuthVisible) throw new Error(`Desktop auth pill is visible on mobile at ${result.viewportWidth}px`);
      if (!result.mobileProfileVisible) throw new Error(`Mobile profile avatar is missing at ${result.viewportWidth}px`);
      if (!result.notificationVisible) throw new Error(`Notification icon is missing at ${result.viewportWidth}px`);
      if (!/ANSEND/.test(result.headline) || !/M[ÚU]SICA/.test(result.headline)) {
        throw new Error(`Mobile headline is incomplete at ${result.viewportWidth}px: ${result.headline}`);
      }
    } else if (!result.searchVisible) {
      throw new Error(`Desktop/tablet search disappeared at ${result.viewportWidth}px`);
    }
  }

  console.log("Home mobile responsive check passed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
