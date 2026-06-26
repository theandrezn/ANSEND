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

async function headlineSnapshot(page) {
  return page.evaluate(() => {
    const title = document.querySelector(".hero-morph-title");
    const form = document.querySelector(".ai-diagnostic-form");
    const titleRect = title?.getBoundingClientRect();
    const formRect = form?.getBoundingClientRect();
    const visualWords = [...document.querySelectorAll(".hero-headline-word")];
    const visualLines = [...document.querySelectorAll(".hero-headline-line")];
    return {
      state: title?.dataset.headlineState || "",
      activeIndex: title?.dataset.headlineIndex || "",
      accessibleText: title?.querySelector(".hero-headline-accessible")?.textContent?.replace(/\s+/g, " ").trim() || "",
      h1Count: document.querySelectorAll(".ai-hero h1").length,
      visualHidden: title?.querySelector(".hero-headline-visual")?.getAttribute("aria-hidden"),
      brand: title?.querySelector(".hero-morph-brand")?.textContent?.trim() || "",
      lines: visualLines.map((line) => ({
        text: line.textContent.replace(/\s+/g, " ").trim(),
        whiteSpace: getComputedStyle(line).whiteSpace,
        wordBreak: getComputedStyle(line).wordBreak,
        overflowWrap: getComputedStyle(line).overflowWrap,
      })),
      wordCount: visualWords.length,
      activeAnimations: title?.getAnimations({ subtree: true }).length || 0,
      titleHeight: Math.round(titleRect?.height || 0),
      formTop: Math.round(formRect?.top || 0),
    };
  });
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${baseUrl}/#feed`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('.hero-morph-title[data-headline-state="intro"]', { timeout: 4000 });

    const intro = await headlineSnapshot(page);
    if (intro.h1Count !== 1) throw new Error(`Expected one hero h1, found ${intro.h1Count}`);
    if (intro.visualHidden !== "true") throw new Error("Animated visual fragments must be aria-hidden");
    if (intro.brand !== "ANSEND") throw new Error(`Unexpected fixed brand: ${intro.brand}`);
    if (intro.wordCount !== 6) throw new Error(`Intro must animate six words, found ${intro.wordCount}`);
    if (!/ANSEND O MARKETPLACE INTELIGENTE DA M[ÚU]SICA/i.test(intro.accessibleText)) {
      throw new Error(`Unexpected accessible intro text: ${intro.accessibleText}`);
    }

    await page.waitForSelector('.hero-morph-title[data-headline-state="holding"]', { timeout: 4000 });
    const holding = await headlineSnapshot(page);
    const baselineFormTop = holding.formTop;
    const baselineTitleHeight = holding.titleHeight;

    await page.waitForFunction(
      () => document.querySelector(".hero-morph-title")?.dataset.headlineIndex === "1",
      null,
      { timeout: 9000 }
    );
    await page.waitForTimeout(700);
    const second = await headlineSnapshot(page);
    if (!/ANSEND A REDE SOCIAL DA M[ÚU]SICA/i.test(second.accessibleText)) {
      throw new Error(`Second headline did not become accessible: ${second.accessibleText}`);
    }
    if (second.formTop !== baselineFormTop || second.titleHeight !== baselineTitleHeight) {
      throw new Error(`Headline rotation shifted layout: ${JSON.stringify({ holding, second })}`);
    }
    for (const line of second.lines) {
      if (line.whiteSpace !== "nowrap" || line.wordBreak !== "keep-all" || line.overflowWrap !== "normal") {
        throw new Error(`Headline line can break internally: ${JSON.stringify(line)}`);
      }
    }

    await page.waitForFunction(
      () => document.querySelector(".hero-morph-title")?.dataset.headlineIndex === "0",
      null,
      { timeout: 7000 }
    );
    await page.waitForTimeout(700);
    const returned = await headlineSnapshot(page);
    if (!/ANSEND O MARKETPLACE INTELIGENTE DA M[ÚU]SICA/i.test(returned.accessibleText)) {
      throw new Error(`Headline did not complete a rotation cycle: ${returned.accessibleText}`);
    }

    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    const hidden = await headlineSnapshot(page);
    await page.waitForTimeout(1200);
    const hiddenLater = await headlineSnapshot(page);
    if (hidden.activeIndex !== hiddenLater.activeIndex) throw new Error("Headline advanced while the tab was hidden");

    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(100);
    const resumed = await headlineSnapshot(page);
    if (resumed.wordCount !== returned.wordCount) throw new Error("Visibility resume replayed or rebuilt the intro");

    await page.evaluate(() => { location.hash = "explorar"; });
    await page.waitForSelector('body[data-route="explorar"]');
    if (await page.locator(".hero-morph-title").count()) throw new Error("Headline remained mounted after leaving feed");
    await page.evaluate(() => { location.hash = "feed"; });
    await page.waitForSelector('.hero-morph-title[data-headline-state="intro"]', { timeout: 4000 });

    if (errors.length) throw new Error(`Console errors: ${errors.join(" | ")}`);
    await page.close();

    const reducedPage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
      isMobile: true,
    });
    await reducedPage.goto(`${baseUrl}/#feed`, { waitUntil: "domcontentloaded" });
    await reducedPage.waitForSelector(".hero-morph-title");
    await reducedPage.waitForTimeout(100);
    const reduced = await headlineSnapshot(reducedPage);
    if (reduced.activeAnimations) throw new Error(`Reduced motion left ${reduced.activeAnimations} active animations`);
    if (!reduced.accessibleText.includes("ANSEND")) throw new Error("Reduced-motion headline is empty");
    await reducedPage.close();
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Home headline animation check passed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
