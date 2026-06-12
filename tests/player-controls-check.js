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
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${port}` });

  try {
    const page = await context.newPage();
    await page.goto(`/index.html#explorar`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".mini-player", { timeout: 30000 });
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async (value) => { window.__copiedPlayerLink = value; } },
      });
      Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
      appState.playing = topBeatOfDay.id;
      updateMiniPlayer(topBeatOfDay);
      showMiniPlayer();
      syncMiniPlayerState();
    });

    const hasLyricsButton = await page.locator('[data-action="lyrics"]').count();
    if (hasLyricsButton) throw new Error("Lyrics button should be removed from the mini player.");

    await page.click('[data-action="volume"]');
    await page.waitForSelector(".player-volume-popover");
    const visibleVolume = await page.locator(".player-volume-popover").isVisible();
    if (!visibleVolume) throw new Error("Volume popover did not open.");
    await page.locator('.player-volume-popover [data-action="player-volume"]').evaluate((input) => {
      input.value = "0.35";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    const volumeState = await page.evaluate(() => ({
      stateVolume: appState.player.volume,
      audioVolume: document.querySelector("#topBeatAudio").volume,
      label: document.querySelector(".player-volume-popover em")?.textContent,
    }));
    if (Math.abs(volumeState.stateVolume - 0.35) > 0.01 || Math.abs(volumeState.audioVolume - 0.35) > 0.01 || volumeState.label !== "35%") {
      throw new Error(`Volume did not update real audio: ${JSON.stringify(volumeState)}`);
    }
    await page.click('[data-action="player-mute"]');
    const muted = await page.evaluate(() => appState.player.volume);
    if (muted !== 0) throw new Error(`Mute did not set volume to 0: ${muted}`);
    await page.click('[data-action="player-mute"]');
    const restored = await page.evaluate(() => appState.player.volume);
    if (restored < 0.34 || restored > 0.36) throw new Error(`Unmute did not restore previous volume: ${restored}`);
    await page.mouse.click(20, 20);
    await page.waitForSelector(".player-volume-popover", { state: "detached" });

    await page.click('[data-action="more-player"]');
    await page.waitForSelector(".player-more-dropdown");
    const menuText = await page.locator(".player-more-dropdown").innerText();
    for (const expected of ["Repostar", "Comentarios", "Compartilhar", "Denunciar", "Adicionar a playlist", "Ir para a musica", "Ir para o artista"]) {
      if (!menuText.includes(expected)) throw new Error(`Menu missing Portuguese option: ${expected}`);
    }
    for (const forbidden of ["Comments", "Share", "Add to Playlist", "Go to Track", "Go to Artist", "Lyrics"]) {
      if (menuText.includes(forbidden)) throw new Error(`Menu still contains English/removed option: ${forbidden}`);
    }

    await page.click('[data-action="share-current"]');
    await page.waitForFunction(() => Boolean(window.__copiedPlayerLink));
    const copiedLink = await page.evaluate(() => window.__copiedPlayerLink);
    if (!copiedLink.includes("#beat-top-beat-psiiiko")) throw new Error(`Wrong copied player link: ${copiedLink}`);

    await page.click('[data-action="more-player"]');
    await page.click('[data-action="go-current-track"]');
    await page.waitForFunction(() => location.hash === "#beat-top-beat-psiiiko");

    await page.click('[data-action="more-player"]');
    await page.click('[data-action="report-current"]');
    await page.waitForSelector(".report-tool-modal");
    await page.selectOption('.report-tool-modal [name="reason"]', "conteudo");
    await page.fill('.report-tool-modal [name="details"]', "Teste de denuncia");
    await page.click('.report-tool-modal button[type="submit"]');
    await page.waitForSelector(".report-tool-modal", { state: "detached" });
    const report = await page.evaluate(() => JSON.parse(localStorage.getItem("ansend-player-reports") || "[]")[0]);
    if (!report || report.beatId !== "top-beat-psiiiko" || report.reason !== "conteudo") {
      throw new Error(`Report was not saved: ${JSON.stringify(report)}`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Player controls OK: volume, menu, sharing, navigation and reports work.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
