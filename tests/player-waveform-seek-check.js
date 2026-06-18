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

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 1200 } });
    await page.goto(`http://127.0.0.1:${server.address().port}/index.html#explorar`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".mini-wave-bars", { timeout: 30000 });
    await page.evaluate(() => {
      const audio = document.querySelector("#topBeatAudio");
      Object.defineProperty(audio, "duration", { configurable: true, get: () => 127 });
      appState.playing = topBeatOfDay.id;
      appState.player.duration = 127;
      updateMiniPlayer(topBeatOfDay);
      showMiniPlayer();
      updateMiniProgress();
      document.querySelector(".mini-wave-bars").scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(50);

    async function boxes() {
      return {
        rect: await page.locator(".mini-wave-bars").boundingBox(),
        wave: await page.locator(".mini-waveform").boundingBox(),
      };
    }

    async function clickRatio(ratio) {
      const { rect, wave } = await boxes();
      await page.mouse.click(rect.x + rect.width * ratio, wave.y + wave.height * 0.8);
      await page.waitForTimeout(30);
      return page.evaluate(() => ({
        currentTime: document.querySelector("#topBeatAudio").currentTime,
        currentLabel: document.querySelector(".mini-current").textContent,
        durationLabel: document.querySelector(".mini-duration").textContent,
        progressPct: getComputedStyle(document.querySelector(".mini-player")).getPropertyValue("--mini-progress-pct").trim(),
      }));
    }

    const clicks = [];
    for (const ratio of [0.1, 0.5, 0.9]) clicks.push({ ratio, ...(await clickRatio(ratio)) });
    for (const click of clicks) {
      const expected = click.ratio * 127;
      if (Math.abs(click.currentTime - expected) > 0.75) {
        throw new Error(`Waveform click seek mismatch: ${JSON.stringify(clicks)}`);
      }
    }

    const { rect, wave } = await boxes();
    await page.mouse.move(rect.x + rect.width * 0.9, wave.y + wave.height * 0.2);
    await page.mouse.down();
    await page.mouse.move(rect.x + rect.width * 0.1, wave.y + wave.height + 8, { steps: 5 });
    await page.mouse.move(rect.x + rect.width * 0.7, wave.y - 8, { steps: 5 });
    await page.mouse.up();
    await page.waitForTimeout(30);
    const drag = await page.evaluate(() => ({
      currentTime: document.querySelector("#topBeatAudio").currentTime,
      currentLabel: document.querySelector(".mini-current").textContent,
      durationLabel: document.querySelector(".mini-duration").textContent,
    }));
    if (Math.abs(drag.currentTime - 88.9) > 1.25 || drag.durationLabel !== "2:07") {
      throw new Error(`Waveform drag seek mismatch: ${JSON.stringify({ clicks, drag })}`);
    }
    console.log("Player waveform seek check passed");
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
