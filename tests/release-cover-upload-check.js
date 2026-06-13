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
      await route.fulfill({
        status: 200,
        contentType: "text/javascript",
        body: "window.lucide = { createIcons() {} };",
      });
    });
    await page.route("**/three.min.js", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/javascript",
        body: "window.THREE = {};",
      });
    });
    await page.route("**/supabase.min.js", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/javascript",
        body: `
          const testUser = { id: "test-user", email: "artist@example.com", user_metadata: { name: "andrezin" } };
          function queryResult(table) {
            const profile = { id: "test-user", username: "andrezin", artistic_name: "andrezin", full_name: "andrezin" };
            const data = table === "profiles" ? [profile] : [];
            const singleData = table === "profiles" ? profile : null;
            const query = {
              select: () => query,
              insert: () => query,
              update: () => query,
              upsert: () => query,
              delete: () => query,
              eq: () => query,
              neq: () => query,
              in: () => query,
              order: () => query,
              limit: () => query,
              range: () => query,
              single: async () => ({ data: singleData, error: null }),
              maybeSingle: async () => ({ data: singleData, error: null }),
              then: (resolve) => Promise.resolve({ data, error: null }).then(resolve)
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
                    window.__coverUpload = { bucket, uploadPath, size: file.size, type: file.type, options };
                    await new Promise((resolve) => setTimeout(resolve, 80));
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
    try {
      await page.waitForSelector(".release-upload-form", { timeout: 10000 });
    } catch (error) {
      const bodyText = await page.locator("body").innerText({ timeout: 2000 }).catch(() => "");
      throw new Error(`Release form did not render. Body: ${bodyText.slice(0, 500)} Errors: ${errors.join(" | ")}`);
    }
    await page.evaluate(() => {
      const form = document.querySelector(".release-upload-form");
      form.elements.title.value = "Test Cover Beat";
      form.elements.genre.value = "Trap";
      form.elements.bpm.value = "140";
      form.elements.musical_key.value = "C Minor";
      window.setReleaseStep(1, form);
    });
    await page.waitForSelector('.release-panel[data-panel="1"].is-active', { timeout: 5000 });

    await page.evaluate(async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1600;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#101010";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff6a00";
      ctx.fillRect(320, 320, 960, 960);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      const file = new File([blob], "cover-heavy.png", { type: "image/png" });
      const input = document.querySelector('.release-file-input[data-upload-type="cover"]');
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await page.waitForFunction(() => {
      return Boolean(document.querySelector('input[name="cover_url"]')?.value?.startsWith("https://cdn.test/"));
    }, { timeout: 10000 });

    const result = await page.evaluate(() => ({
      coverUrl: document.querySelector('input[name="cover_url"]')?.value,
      coverPath: document.querySelector('input[name="cover_path"]')?.value,
      progress: document.querySelector(".upload-progress-percent")?.textContent,
      errorText: document.querySelector(".release-upload-error")?.textContent || "",
      upload: window.__coverUpload,
    }));

    if (!result.coverUrl || !result.coverPath) throw new Error("Cover URL/path were not saved after upload.");
    if (result.coverPath.includes("blob:") || result.coverUrl.includes("blob:")) throw new Error("Cover persisted a blob URL.");
    if (result.progress === "85%") throw new Error("Cover upload progress is still stuck at 85%.");
    if (/demorou demais/i.test(result.errorText)) throw new Error("False timeout message appeared after successful upload.");
    if (result.upload.bucket !== "beat-covers") throw new Error(`Unexpected bucket: ${result.upload.bucket}`);
    if (!result.upload.uploadPath.startsWith("test-user/covers/")) throw new Error(`Unexpected RLS-safe path: ${result.upload.uploadPath}`);
  } finally {
    await browser.close();
    server.close();
  }

  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
}

run().then(() => {
  console.log("Release cover upload check passed");
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
