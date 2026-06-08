const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const preferredPort = Number(process.env.PORT || 0);

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
    server.listen(preferredPort, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(`http://127.0.0.1:${port}/index.html#vendedor`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForSelector("#seller-email", { timeout: 30000 });
    await page.click("#seller-email");
    await page.keyboard.type("hsegunduu@gmail.com", { delay: 55 });
    await page.waitForTimeout(2600);

    const result = await page.evaluate(() => ({
      activeId: document.activeElement?.id || "",
      email: document.querySelector("#seller-email")?.value || "",
      formVisible: Boolean(document.querySelector(".seller-auth-form")?.offsetParent),
      appHeight: Math.round(document.querySelector("#appView")?.getBoundingClientRect().height || 0),
    }));

    if (errors.length || result.activeId !== "seller-email" || result.email !== "hsegunduu@gmail.com" || !result.formVisible || result.appHeight < 120) {
      console.error(JSON.stringify({ result, errors }, null, 2));
      process.exit(1);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Auth focus OK: email input keeps focus and value through async route/auth updates.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
