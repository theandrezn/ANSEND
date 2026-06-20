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
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {}),
  });
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

    await page.evaluate(() => {
      PlayerStore.setCurrent(topBeatOfDay, { status: "loading" });
      updateMiniPlayer(topBeatOfDay);
      showMiniPlayer();
      syncMiniPlayerState();
    });
    const loadingControls = await page.evaluate(() => {
      const player = document.querySelector(".mini-player");
      const selectors = [
        '[data-action="favorite-current"]',
        '[data-action="mini-play"]',
        '[data-action="volume"]',
        '[data-action="close-mini-player"]',
        '[data-action="next-track"]',
        '[data-action="prev-track"]',
        '[data-action="queue"]',
        '[data-action="edit-beat"]',
        '[data-action="loop-beat"]',
        '[data-action="more-player"]',
        '[data-action="buy-current"]',
      ];
      return {
        hidden: player?.hidden,
        active: player?.classList.contains("is-active"),
        loading: player?.classList.contains("is-loading"),
        playing: player?.classList.contains("is-playing"),
        playIcon: player?.querySelector('[data-action="mini-play"]')?.dataset.playerIcon,
        display: player ? getComputedStyle(player).display : "",
        controls: selectors.map((selector) => {
          const element = player?.querySelector(selector);
          const rect = element?.getBoundingClientRect();
          return {
            selector,
            exists: Boolean(element),
            visible: Boolean(rect && rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== "hidden"),
            hasSvg: Boolean(element?.querySelector("svg")),
          };
        }),
      };
    });
    const missingLoadingControls = loadingControls.controls.filter((control) => !control.exists || !control.visible || !control.hasSvg);
    if (loadingControls.hidden || !loadingControls.active || loadingControls.loading || !loadingControls.playing || loadingControls.playIcon !== "pause" || loadingControls.display === "none" || missingLoadingControls.length) {
      throw new Error(`Mini player controls are not stable during loading: ${JSON.stringify({ loadingControls, missingLoadingControls })}`);
    }

    const recentListPlayback = await page.evaluate(() => {
      const host = document.createElement("section");
      host.className = "recent-activity-section";
      host.innerHTML = `<div class="home-track-list">${trackRow(topBeatOfDay, 0)}</div>`;
      document.body.dataset.route = "feed";
      document.body.appendChild(host);
      const cover = host.querySelector(".airbit-cover");
      const title = host.querySelector(".airbit-track-title");
      const titleBefore = title?.textContent?.trim() || "";
      appState.playing = topBeatOfDay.id;
      setTopBeatPlaying(true);
      return {
        coverImageCount: cover?.querySelectorAll("img").length || 0,
        titleBefore,
        titleAfter: title?.textContent?.trim() || "",
        coverIcon: cover?.dataset.playerIcon || "",
        coverHasPauseIcon: Boolean(cover?.querySelector('.player-state-icon svg rect')),
      };
    });
    if (recentListPlayback.coverImageCount !== 1 || recentListPlayback.titleAfter !== recentListPlayback.titleBefore || recentListPlayback.coverIcon !== "pause" || !recentListPlayback.coverHasPauseIcon) {
      throw new Error(`Recent list artwork or title disappeared during playback: ${JSON.stringify(recentListPlayback)}`);
    }
    await page.evaluate(() => {
      if (!document.querySelector("#nexoFloatingAssistantRoot")) {
        document.body.insertAdjacentHTML("beforeend", `
          <div id="nexoFloatingAssistantRoot" class="nexo-floating-assistant">
            <button type="button" class="nexo-floating-button" data-action="nexo-assistant-toggle" aria-label="Abrir NEXO IA">
              <span class="nexo-floating-icon"></span>
            </button>
          </div>
        `);
      }
    });
    const floatingOverlap = await page.evaluate(() => {
      const close = document.querySelector('[data-action="close-mini-player"]');
      const root = document.querySelector("#nexoFloatingAssistantRoot");
      const nexoButton = document.querySelector(".nexo-floating-button");
      const player = document.querySelector(".mini-player");
      const closeRect = close?.getBoundingClientRect();
      const nexoRect = nexoButton?.getBoundingClientRect();
      const playerRect = player?.getBoundingClientRect();
      const closeStyle = close ? getComputedStyle(close) : null;
      const rootStyle = root ? getComputedStyle(root) : null;
      const buttonStyle = nexoButton ? getComputedStyle(nexoButton) : null;
      return {
        closeVisible: Boolean(closeRect && closeRect.width > 0 && closeRect.height > 0),
        nexoVisible: Boolean(nexoRect && nexoRect.width > 0 && nexoRect.height > 0),
        verticalGap: closeRect && nexoRect ? Math.round(closeRect.top - nexoRect.bottom) : null,
        horizAlignDev: closeRect && nexoRect ? Math.abs((closeRect.left + closeRect.width / 2) - (nexoRect.left + nexoRect.width / 2)) : null,
        insidePlayer: closeRect && playerRect ? closeRect.top >= playerRect.top : false,
        closeZIndex: closeStyle?.zIndex,
        rootPointerEvents: rootStyle?.pointerEvents,
        buttonPointerEvents: buttonStyle?.pointerEvents,
      };
    });
    if (!floatingOverlap.closeVisible || !floatingOverlap.nexoVisible || floatingOverlap.verticalGap < 12 || floatingOverlap.horizAlignDev > 2 || !floatingOverlap.insidePlayer || Number(floatingOverlap.closeZIndex) < 9600 || floatingOverlap.rootPointerEvents !== "none" || floatingOverlap.buttonPointerEvents !== "auto") {
      throw new Error(`Mini player close button fails refinement placement below NEXO: ${JSON.stringify(floatingOverlap)}`);
    }
    await page.evaluate(() => {
      PlayerStore.setStatus("paused");
      syncMiniPlayerState();
    });

    const waveformGeometry = await page.evaluate(() => {
      const bars = document.querySelector(".mini-wave-bars");
      const rect = bars.getBoundingClientRect();
      return [0, 0.5, 1].map((expected) => {
        const event = new MouseEvent("pointerdown", {
          clientX: rect.left + rect.width * expected,
          clientY: rect.top + rect.height / 2,
          bubbles: true,
        });
        const actual = miniWaveformProgressFromPointer(event, { requireInside: true });
        return { expected, actual, rectWidth: rect.width };
      });
    });
    for (const point of waveformGeometry) {
      if (point.rectWidth <= 0 || Math.abs(point.expected - point.actual) > 0.002) {
        throw new Error(`Mini waveform geometry mismatch: ${JSON.stringify(waveformGeometry)}`);
      }
    }

    const immediateToggle = await page.evaluate(async () => {
      const audio = document.querySelector("#topBeatAudio");
      const button = document.querySelector('[data-action="mini-play"]');
      const beat = normalizePlayerBeat(topBeatOfDay);
      let paused = true;
      let resolvePlay;
      const pendingPlay = new Promise((resolve) => { resolvePlay = resolve; });

      Object.defineProperty(audio, "paused", { configurable: true, get: () => paused });
      audio.play = () => {
        paused = false;
        return pendingPlay;
      };
      audio.pause = () => { paused = true; };
      audio.load = () => {};
      PlayerStore.setCurrent(beat, { status: "paused" });
      updateMiniPlayer(beat);

      button.click();
      await Promise.resolve();
      const afterPlay = {
        icon: button.dataset.playerIcon,
        status: appState.player.status,
        playing: document.querySelector(".mini-player")?.classList.contains("is-playing"),
      };

      button.click();
      await Promise.resolve();
      const afterPause = {
        icon: button.dataset.playerIcon,
        status: appState.player.status,
        playing: document.querySelector(".mini-player")?.classList.contains("is-playing"),
      };

      resolvePlay();
      await pendingPlay;
      await Promise.resolve();
      const afterPendingPlay = {
        icon: button.dataset.playerIcon,
        status: appState.player.status,
        playing: document.querySelector(".mini-player")?.classList.contains("is-playing"),
      };
      return { afterPlay, afterPause, afterPendingPlay };
    });
    if (immediateToggle.afterPlay.icon !== "pause" || immediateToggle.afterPlay.status !== "playing" || !immediateToggle.afterPlay.playing) {
      throw new Error(`Play button did not switch immediately: ${JSON.stringify(immediateToggle)}`);
    }
    if (immediateToggle.afterPause.icon !== "play" || immediateToggle.afterPause.status !== "paused" || immediateToggle.afterPause.playing) {
      throw new Error(`Pause button did not switch immediately: ${JSON.stringify(immediateToggle)}`);
    }
    if (immediateToggle.afterPendingPlay.icon !== "play" || immediateToggle.afterPendingPlay.status !== "paused" || immediateToggle.afterPendingPlay.playing) {
      throw new Error(`Late play promise overrode pause state: ${JSON.stringify(immediateToggle)}`);
    }

    const hasLyricsButton = await page.locator('[data-action="lyrics"]').count();
    if (hasLyricsButton) throw new Error("Lyrics button should be removed from the mini player.");

    await page.click('[data-action="volume"]');
    await page.waitForSelector(".player-volume-popover");
    const visibleVolume = await page.locator(".player-volume-popover").isVisible();
    if (!visibleVolume) throw new Error("Volume popover did not open.");
    const volumeBox = await page.locator(".player-volume-popover").boundingBox();
    if (!volumeBox || volumeBox.height > 86 || volumeBox.width > 320) {
      throw new Error(`Volume popover is too large: ${JSON.stringify(volumeBox)}`);
    }
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
    await page.click('[data-action="close-volume-panel"]');
    await page.waitForSelector(".player-volume-popover", { state: "detached" });
    await page.click('[data-action="volume"]');
    await page.waitForSelector(".player-volume-popover");
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

    await page.evaluate(() => {
      appState.playing = topBeatOfDay.id;
      updateMiniPlayer(topBeatOfDay);
      showMiniPlayer();
      document.querySelector(".mini-player")?.classList.add("is-playing");
    });
    await page.click('[data-action="close-mini-player"]');
    const closeState = await page.evaluate(() => {
      const player = document.querySelector(".mini-player");
      const styles = getComputedStyle(player);
      return {
        closed: player.classList.contains("is-closed"),
        active: player.classList.contains("is-active"),
        playing: player.classList.contains("is-playing"),
        hidden: player.hidden,
        display: styles.display,
        pointerEvents: styles.pointerEvents,
        opacity: styles.opacity,
      };
    });
    if (!closeState.closed || closeState.active || closeState.playing || !closeState.hidden || closeState.display !== "none") {
      throw new Error(`Mini player close button did not hide the player: ${JSON.stringify(closeState)}`);
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
