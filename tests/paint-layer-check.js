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

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  const failures = [];

  try {
    await page.goto(`http://127.0.0.1:${server.address().port}/index.html#biblioteca`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForTimeout(3500);

    const metrics = await page.evaluate(() => {
      const pageElement = document.querySelector(".page");
      const ambient = document.querySelector(".ambient-glow");
      const heading = document.querySelector(".view-header-biblioteca h1");
      const emptyTitle = document.querySelector(".empty-state h2");

      function styleOf(element) {
        if (!element) return null;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          position: style.position,
          zIndex: style.zIndex,
          opacity: style.opacity,
          visibility: style.visibility,
          display: style.display,
          color: style.color,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          text: (element.textContent || "").trim(),
        };
      }

      return {
        route: document.body.dataset.route,
        page: styleOf(pageElement),
        ambient: styleOf(ambient),
        heading: styleOf(heading),
        emptyTitle: styleOf(emptyTitle),
      };
    });

    if (metrics.route !== "biblioteca") failures.push(`Expected biblioteca route, got ${metrics.route}`);
    if (metrics.page?.position !== "relative") failures.push(`.page must create a stacking context, got position=${metrics.page?.position}`);
    if (metrics.page?.zIndex === "auto" || Number(metrics.page?.zIndex) < 1) failures.push(`.page must render above ambient glow, got z-index=${metrics.page?.zIndex}`);
    if (Number(metrics.ambient?.zIndex || 0) >= Number(metrics.page?.zIndex || 0)) failures.push(`ambient glow z-index ${metrics.ambient?.zIndex} must stay below page z-index ${metrics.page?.zIndex}`);
    if (metrics.heading?.text !== "Biblioteca" || metrics.heading.width < 100 || metrics.heading.height < 20) failures.push("Biblioteca heading is not paintable");
    if (metrics.emptyTitle?.text !== "Biblioteca vazia" || metrics.emptyTitle.width < 100 || metrics.emptyTitle.height < 20) failures.push("Empty library title is not paintable");

    if (failures.length) {
      console.error(`Paint layer check failed:\n- ${failures.join("\n- ")}`);
      process.exitCode = 1;
      return;
    }

    console.log("Paint layer OK: route content renders above ambient background after delayed paint.");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
