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

async function attachFile(page, uploadType, name, mimeType) {
  await page.evaluate(({ uploadType, name, mimeType }) => {
    const file = new File([new Uint8Array([0, 1, 2, 3, 4, 5])], name, { type: mimeType });
    const input = document.querySelector(`.release-file-input[data-upload-type="${uploadType}"]`);
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, { uploadType, name, mimeType });
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error" && !/ERR_(NETWORK_ACCESS_DENIED|NAME_NOT_RESOLVED)/.test(message.text())) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  try {
    await page.route("**/lucide.min.js", async (route) => {
      await route.fulfill({ status: 200, contentType: "text/javascript", body: "window.lucide = { createIcons() {} };" });
    });
    await page.route("**/three.min.js", async (route) => {
      await route.fulfill({ status: 200, contentType: "text/javascript", body: "window.THREE = {};" });
    });
    await page.route("**/supabase.min.js", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/javascript",
        body: `
          const testUser = { id: "11111111-1111-4111-8111-111111111111", email: "artist@example.com", user_metadata: { name: "andrezin" } };
          window.__releaseUploads = [];
          window.__releaseDrafts = [];
          function queryResult(table) {
            const profile = { id: testUser.id, username: "andrezin", artistic_name: "andrezin", full_name: "andrezin", quiz_completed: true };
            const query = {
              select: () => query,
              insert: () => query,
              update: (payload) => { window.__releaseDrafts.push({ table, payload, action: "update" }); return query; },
              upsert: (payload) => { window.__releaseDrafts.push({ table, payload, action: "upsert" }); return query; },
              delete: () => query,
              eq: () => query,
              neq: () => query,
              in: () => query,
              order: () => query,
              limit: () => query,
              range: () => query,
              single: async () => ({ data: table === "profiles" ? profile : window.__releaseDrafts.at(-1)?.payload || null, error: null }),
              maybeSingle: async () => ({ data: null, error: null }),
              then: (resolve) => Promise.resolve({ data: table === "profiles" ? [profile] : [], error: null }).then(resolve)
            };
            return query;
          }
          window.supabase = {
            createClient: () => ({
              auth: {
                getSession: async () => ({ data: { session: { user: testUser } }, error: null }),
                getUser: async () => ({ data: { user: testUser }, error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } })
              },
              rpc: async () => ({ data: false, error: null }),
              from: (table) => queryResult(table),
              storage: {
                from: (bucket) => ({
                  upload: async (uploadPath, file, options) => {
                    window.__releaseUploads.push({ bucket, uploadPath, size: file.size, type: file.type, options });
                    return { data: { path: uploadPath }, error: null };
                  },
                  getPublicUrl: (uploadPath) => ({ data: { publicUrl: "https://cdn.test/" + uploadPath } })
                })
              }
            })
          };
        `,
      });
    });

    await page.goto(`http://127.0.0.1:${server.address().port}/#cadastrar`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".release-mode-selector", { timeout: 10000 });
    const modeChoices = await page.$$eval('[data-action="release-mode-choice"]', (buttons) => buttons.map((button) => button.dataset.mode).join(","));
    if (modeChoices !== "upload,youtube,catalog") throw new Error(`Release mode selector must show upload, youtube, and catalog choices before the form. Got: ${modeChoices}`);
    if (await page.locator(".release-upload-form").count()) throw new Error("Release upload form should not render before a mode is selected.");
    const uploadModeButton = page.locator('[data-action="release-mode-choice"][data-mode="upload"]').first();
    await uploadModeButton.click();
    await page.waitForSelector(".release-upload-form", { timeout: 10000 });

    await page.evaluate(() => {
      const form = document.querySelector(".release-upload-form");
      form.elements.title.value = "Secure Files Beat";
      form.elements.genre.value = "Trap";
      form.elements.bpm.value = "140";
      form.elements.musical_key.value = "C Minor";
      window.setReleaseStep(2, form);
    });

    await attachFile(page, "audio", "preview.mp3", "audio/mpeg");
    await page.waitForFunction(() => Boolean(document.querySelector('input[name="audio_path"]')?.value), null, { timeout: 10000 });
    await attachFile(page, "secure_mp3", "delivery.mp3", "audio/mpeg");
    await page.waitForFunction(() => Boolean(document.querySelector('input[name="mp3_path"]')?.value), null, { timeout: 10000 });
    await attachFile(page, "secure_wav", "master.wav", "audio/wav");
    await page.waitForFunction(() => Boolean(document.querySelector('input[name="wav_path"]')?.value), null, { timeout: 10000 });
    await attachFile(page, "secure_stems", "stems.zip", "application/zip");
    await page.waitForFunction(() => Boolean(document.querySelector('input[name="stems_path"]')?.value), null, { timeout: 10000 });

    const result = await page.evaluate(() => {
      const form = document.querySelector(".release-upload-form");
      const deliveryGrid = document.querySelector(".release-delivery-grid") || document.querySelector(".release-files-grid-delivery");
      const filesLayout = document.querySelector(".release-files-layout") || deliveryGrid?.parentElement;
      return {
        audioPath: form.elements.audio_path.value,
        mp3Path: form.elements.mp3_path.value,
        wavPath: form.elements.wav_path.value,
        stemsPath: form.elements.stems_path.value,
        mp3Name: form.elements.mp3_original_name.value,
        wavMime: form.elements.wav_mime_type.value,
        stemsMime: form.elements.stems_mime_type.value,
        stepValid: window.validateReleaseStep(2),
        uploads: window.__releaseUploads,
        drafts: window.__releaseDrafts,
        layoutColumns: filesLayout ? getComputedStyle(filesLayout).gridTemplateColumns : "missing",
        deliveryColumns: deliveryGrid ? getComputedStyle(deliveryGrid).gridTemplateColumns : "missing",
        deliveryCards: document.querySelectorAll(".release-delivery-grid .release-upload-card, .release-files-grid-delivery .release-file-card").length,
      };
    });

    if (!result.audioPath.includes("/beat-audio/")) throw new Error(`Preview audio path not saved correctly: ${result.audioPath}`);
    if (!result.mp3Path.includes("/beat-secure-files/")) throw new Error(`MP3 secure path not saved correctly: ${result.mp3Path}`);
    if (!result.wavPath.includes("/beat-secure-files/")) throw new Error(`WAV secure path not saved correctly: ${result.wavPath}`);
    if (!result.stemsPath.includes("/beat-secure-files/")) throw new Error(`Stems secure path not saved correctly: ${result.stemsPath}`);
    if (result.mp3Name !== "delivery.mp3") throw new Error("MP3 original file name was not persisted.");
    if (result.wavMime !== "audio/wav") throw new Error("WAV MIME type was not persisted.");
    if (result.stemsMime !== "application/zip") throw new Error("ZIP MIME type was not persisted.");
    if (!result.stepValid) throw new Error("Release files step is still blocked after confirmed uploads.");
    if (result.uploads.filter((upload) => upload.bucket === "beat-secure-files").length !== 3) throw new Error("Secure files were not uploaded to beat-secure-files.");
    if (!result.drafts.some((draft) => draft.payload?.mp3_path)
      || !result.drafts.some((draft) => draft.payload?.wav_path)
      || !result.drafts.some((draft) => draft.payload?.stems_path)) {
      throw new Error("Release upload draft did not persist secure file paths.");
    }
    if (result.layoutColumns === "missing" || result.layoutColumns === "none") throw new Error("Release upload layout did not become a responsive grid.");
    if (result.deliveryCards !== 3) throw new Error("Release upload delivery grid must render three file cards.");
    if (!/\s/.test(result.deliveryColumns) || result.deliveryColumns === "missing" || result.deliveryColumns === "none") throw new Error("Release delivery files did not become a three-card responsive grid.");
  } finally {
    await browser.close();
    server.close();
  }

  if (errors.length) throw new Error(errors.join("\n"));
}

run().then(() => {
  console.log("Release secure files upload check passed");
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
