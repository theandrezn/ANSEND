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

function supabaseMock() {
  return `
    (() => {
      const emptyList = Promise.resolve({ data: [], error: null });
      const emptySingle = Promise.resolve({ data: null, error: null });
      const tableApi = {
        select() { return tableApi; },
        eq() { return tableApi; },
        order() { return emptyList; },
        maybeSingle() { return emptySingle; },
        upsert() { return { select: () => ({ single: () => emptySingle }) }; },
      };
      window.supabase = {
        createClient() {
          return {
            auth: {
              getSession: async () => ({ data: { session: null }, error: null }),
              onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
              signInWithOAuth: async () => ({ data: { url: "#" }, error: null }),
            },
            from: () => tableApi,
            rpc: () => emptyList,
          };
        }
      };
    })();
  `;
}

function youtubeIframeMock() {
  return `
    (() => {
      const state = { UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 };
      window.__ytEvents = [];
      window.YT = {
        PlayerState: state,
        Player: function Player(_id, options) {
          this.videoId = "";
          this.currentTime = 0;
          this.duration = 184;
          this.volume = 82;
          this.state = state.UNSTARTED;
          this.getVideoData = () => ({ video_id: this.videoId });
          this.getPlayerState = () => this.state;
          this.getDuration = () => this.duration;
          this.getCurrentTime = () => this.currentTime;
          this.setVolume = (value) => { this.volume = value; };
          this.mute = () => { this.muted = true; };
          this.unMute = () => { this.muted = false; };
          this.seekTo = (time) => { this.currentTime = time; window.__ytEvents.push(["seek", time]); };
          this.pauseVideo = () => {
            this.state = state.PAUSED;
            window.__ytEvents.push(["pause", this.videoId]);
            options.events.onStateChange({ data: state.PAUSED, target: this });
          };
          this.playVideo = () => {
            window.__ytEvents.push(["play", this.videoId]);
            setTimeout(() => {
              this.state = state.PLAYING;
              options.events.onStateChange({ data: state.PLAYING, target: this });
            }, 20);
          };
          this.loadVideoById = (videoId) => {
            this.videoId = videoId;
            this.currentTime = 0;
            window.__ytEvents.push(["load", videoId]);
            options.events.onStateChange({ data: state.BUFFERING, target: this });
            this.playVideo();
          };
          setTimeout(() => options.events.onReady({ target: this }), 0);
        }
      };
      setTimeout(() => window.onYouTubeIframeAPIReady?.(), 0);
    })();
  `;
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {}),
  });
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${port}` });

  await context.addInitScript(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "duration", { configurable: true, get: () => 123 });
    HTMLMediaElement.prototype.play = function play() {
      this.dispatchEvent(new Event("loadedmetadata"));
      this.dispatchEvent(new Event("timeupdate"));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function pause() {
      this.dispatchEvent(new Event("pause"));
    };
  });
  await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
    route.fulfill({ contentType: "text/javascript", body: supabaseMock() });
  });
  await context.route("**/www.youtube.com/iframe_api", (route) => {
    route.fulfill({ contentType: "text/javascript", body: youtubeIframeMock() });
  });

  try {
    const page = await context.newPage();
    await page.goto("/index.html#feed", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForFunction(() => typeof window.playBeat === "function", { timeout: 30000 });

    const result = await page.evaluate(async () => {
      const uploadBeat = {
        id: "upload-runtime",
        title: "Upload Runtime",
        producer: "ANSEND Test",
        cover: "assets/ansend-logo-square.png",
        source_type: "upload",
        audio_url: "assets/top-beat-psiiiko.mp3",
        tags: ["Beat", "123 BPM"],
      };
      const youtubeBeat = {
        id: "youtube-runtime",
        title: "YouTube Runtime",
        producer: "ANSEND Test",
        cover: "assets/ansend-logo-square.png",
        source_type: "youtube",
        youtube_video_id: "dQw4w9WgXcQ",
        youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        tags: ["Beat", "184 BPM"],
      };

      const uploadStarted = await window.playBeat(uploadBeat);
      const uploadState = {
        started: uploadStarted,
        sourceType: document.querySelector(".mini-player")?.dataset.sourceType,
        title: document.querySelector(".mini-track strong")?.textContent,
        playing: document.querySelector(".mini-player")?.classList.contains("is-playing"),
        audioSrc: document.querySelector("#topBeatAudio")?.getAttribute("src"),
      };

      const interruptedYouTubePlay = window.playBeat(youtubeBeat);
      await Promise.resolve();
      const youtubeImmediateState = {
        status: appState.player.status,
        icon: document.querySelector('[data-action="mini-play"]')?.dataset.playerIcon,
        playing: document.querySelector(".mini-player")?.classList.contains("is-playing"),
        loading: document.querySelector(".mini-player")?.classList.contains("is-loading"),
      };
      document.querySelector('[data-action="mini-play"]')?.click();
      await interruptedYouTubePlay;
      await new Promise((resolve) => setTimeout(resolve, 40));
      const youtubeInterruptedState = {
        status: appState.player.status,
        icon: document.querySelector('[data-action="mini-play"]')?.dataset.playerIcon,
        playing: document.querySelector(".mini-player")?.classList.contains("is-playing"),
        loading: document.querySelector(".mini-player")?.classList.contains("is-loading"),
      };

      const youtubeStarted = await window.playBeat(youtubeBeat);
      const youtubeState = {
        started: youtubeStarted,
        status: appState.player.status,
        sourceType: document.querySelector(".mini-player")?.dataset.sourceType,
        title: document.querySelector(".mini-track strong")?.textContent,
        playing: document.querySelector(".mini-player")?.classList.contains("is-playing"),
        audioSrc: document.querySelector("#topBeatAudio")?.getAttribute("src") || "",
        events: window.__ytEvents.slice(),
      };

      document.querySelector('[data-action="mini-play"]')?.click();
      await new Promise((resolve) => setTimeout(resolve, 30));
      const pauseState = {
        paused: !document.querySelector(".mini-player")?.classList.contains("is-playing"),
        status: appState.player.status,
        icon: document.querySelector('[data-action="mini-play"]')?.dataset.playerIcon,
        events: window.__ytEvents.slice(),
      };
      window.seekMiniPlayerToRatio(0.5);
      const seeked = window.__ytEvents.some((entry) => entry[0] === "seek" && entry[1] > 80 && entry[1] < 100);
      const invalidStarted = await window.playBeat({ id: "bad-youtube", source_type: "youtube", youtube_video_id: "bad" });

      return {
        uploadState,
        youtubeImmediateState,
        youtubeInterruptedState,
        youtubeState,
        pauseState,
        seeked,
        invalidStarted,
        finalTitle: document.querySelector(".mini-track strong")?.textContent,
      };
    });

    const failures = [];
    if (!result.uploadState.started || result.uploadState.sourceType !== "upload" || !result.uploadState.playing) failures.push("upload did not play through HTMLAudioElement");
    if (result.youtubeImmediateState.icon !== "pause" || !result.youtubeImmediateState.playing || result.youtubeImmediateState.loading) failures.push("youtube play did not switch to pause immediately");
    if (result.youtubeInterruptedState.status !== "paused" || result.youtubeInterruptedState.icon !== "play" || result.youtubeInterruptedState.playing || result.youtubeInterruptedState.loading) failures.push("youtube pause during startup was overridden by a late callback");
    if (!result.youtubeState.started || result.youtubeState.sourceType !== "youtube" || !result.youtubeState.playing) failures.push("youtube did not play through iframe api");
    if (result.youtubeState.audioSrc) failures.push("youtube playback left an audio src on #topBeatAudio");
    if (!result.youtubeState.events.some((entry) => entry[0] === "load" && entry[1] === "dQw4w9WgXcQ")) failures.push("youtube video id was not loaded");
    if (!result.pauseState.paused || result.pauseState.status !== "paused" || result.pauseState.icon !== "play") failures.push("mini player pause did not sync");
    if (!result.seeked) failures.push("youtube seek did not sync");
    if (result.invalidStarted) failures.push("invalid youtube id started playback");
    if (result.finalTitle !== "YouTube Runtime") failures.push("invalid youtube id replaced current beat unexpectedly");
    if (failures.length) {
      console.error(JSON.stringify({ failures, result }, null, 2));
      process.exit(1);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Player YouTube runtime OK: upload, iframe playback, pause, seek, and invalid source handling are synchronized.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
