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
  ".wav": "audio/wav",
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

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const failures = [];

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(`http://127.0.0.1:${port}/index.html#cadastrar`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForTimeout(5000);

    // ── Check 1: Layout & centering ──
    const metrics = await page.evaluate(() => {
      const releasePage = document.querySelector(".release-page");
      const container = document.querySelector(".release-container");
      const stepper = document.querySelector(".release-stepper");
      const bottomBar = document.querySelector(".release-bottom-bar");
      const formGrid = document.querySelector(".release-form-grid");
      const stepItems = document.querySelectorAll(".release-step");
      const activePanel = document.querySelector(".release-panel.is-active");

      // Check centering by comparing container within the release page
      let isCentered = false;
      if (releasePage && container) {
        const pageRect = releasePage.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const leftMargin = contRect.left - pageRect.left;
        const rightSpace = pageRect.right - contRect.right;
        isCentered = Math.abs(leftMargin - rightSpace) < 60;
      }

      // Check visible text inputs (not hidden ones)
      const visibleInputs = document.querySelectorAll('.release-field input[type="text"], .release-field input[type="number"], .release-field textarea');
      let inputStyles = [];
      visibleInputs.forEach((inp, i) => {
        if (i < 3) {
          const s = getComputedStyle(inp);
          const rect = inp.getBoundingClientRect();
          inputStyles.push({
            height: Math.round(rect.height),
            borderRadius: s.borderRadius,
            bg: s.backgroundColor,
            width: Math.round(rect.width),
          });
        }
      });

      function rect(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return { width: Math.round(r.width), height: Math.round(r.height), display: s.display, visible: r.width > 0 && r.height > 0 };
      }

      return {
        releasePage: rect(releasePage),
        container: rect(container),
        stepper: rect(stepper),
        bottomBar: rect(bottomBar),
        formGrid: rect(formGrid),
        activePanel: rect(activePanel),
        stepCount: stepItems.length,
        isCentered,
        inputStyles,
      };
    });

    console.log("=== LAYOUT CHECK ===");
    console.log(JSON.stringify(metrics, null, 2));

    if (!metrics.releasePage?.visible) failures.push("Release page not visible");
    if (!metrics.stepper?.visible) failures.push("Stepper not visible");
    if (metrics.stepCount !== 6) failures.push(`Expected 6 stepper items, got ${metrics.stepCount}`);
    if (!metrics.bottomBar?.visible) failures.push("Bottom bar not visible");
    if (!metrics.isCentered) failures.push("Container not centered");
    if (metrics.releasePage?.width < 800) failures.push(`Release page too narrow: ${metrics.releasePage.width}px`);
    // Check visible inputs have proper height (54px) and radius (12px)
    for (const inp of metrics.inputStyles) {
      if (inp.height < 40) failures.push(`Input height too small: ${inp.height}px`);
      if (!inp.borderRadius.includes("12")) failures.push(`Input border-radius wrong: ${inp.borderRadius}`);
    }
    if (errors.length) failures.push(`JS errors: ${errors.join("; ")}`);

    // ── Check 2: Fill required fields and navigate ──
    await page.fill('input[name="title"]', "Test Beat Release");
    await page.fill('input[name="bpm"]', "140");
    // Select genre via custom select
    await page.click('[data-select-id="genre"] .custom-select-trigger');
    await page.waitForTimeout(300);
    await page.click('[data-select-id="genre"] .custom-select-option:first-child');
    await page.waitForTimeout(300);
    // Select key via custom select
    await page.click('[data-select-id="musical_key"] .custom-select-trigger');
    await page.waitForTimeout(300);
    await page.click('[data-select-id="musical_key"] .custom-select-option:first-child');
    await page.waitForTimeout(300);

    // Click Next
    await page.click('[data-action="release-next"]');
    await page.waitForTimeout(1500);

    const step1Check = await page.evaluate(() => {
      const panels = document.querySelectorAll(".release-panel");
      let activeIdx = -1;
      panels.forEach((p, i) => {
        if (getComputedStyle(p).display !== "none") activeIdx = i;
      });
      const steps = document.querySelectorAll(".release-step");
      let activeStepIdx = -1;
      steps.forEach((s, i) => {
        if (s.classList.contains("is-active")) activeStepIdx = i;
      });
      return { activePanelIndex: activeIdx, activeStepIndex: activeStepIdx };
    });

    console.log("\n=== AFTER CLICKING NEXT ===");
    console.log(JSON.stringify(step1Check, null, 2));

    if (step1Check.activePanelIndex !== 1) failures.push(`Next didn't advance to step 1 (panel=${step1Check.activePanelIndex})`);
    if (step1Check.activeStepIndex !== 1) failures.push(`Stepper didn't highlight step 1 (step=${step1Check.activeStepIndex})`);

    // Click Back
    await page.click('[data-action="release-back"]');
    await page.waitForTimeout(1000);

    const backCheck = await page.evaluate(() => {
      const panels = document.querySelectorAll(".release-panel");
      let activeIdx = -1;
      panels.forEach((p, i) => {
        if (getComputedStyle(p).display !== "none") activeIdx = i;
      });
      return { activePanelIndex: activeIdx };
    });

    console.log("\n=== AFTER CLICKING BACK ===");
    console.log(JSON.stringify(backCheck, null, 2));

    if (backCheck.activePanelIndex !== 0) failures.push(`Back didn't return to step 0 (panel=${backCheck.activePanelIndex})`);

    // Take screenshot
    await page.screenshot({ path: path.join(__dirname, "release-final.png"), fullPage: true });

  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error("\n=== FAILURES ===");
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log("\nRelease page visual check OK: layout centered, stepper with 6 steps, inputs styled, navigation works.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
