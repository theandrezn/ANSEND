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
      function tableApi() {
        const api = {
          select() { return api; },
          eq() { return api; },
          order() { return Promise.resolve({ data: [], error: null }); },
          maybeSingle() { return Promise.resolve({ data: null, error: null }); },
          upsert(payload) {
            window.__profileUpsert = payload;
            return { select: () => ({ single: () => Promise.resolve({ data: payload, error: null }) }) };
          },
          update(payload) {
            window.__profileUpdate = payload;
            return { eq: () => ({ select: () => ({ maybeSingle: () => Promise.resolve({ data: payload, error: null }) }) }) };
          }
        };
        return api;
      }
      window.supabase = {
        createClient() {
          return {
            auth: {
              getSession: () => Promise.resolve({ data: { session: null }, error: null }),
              getUser: () => Promise.resolve({ data: { user: null }, error: null }),
              onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
              signUp: (args) => {
                window.__signUpArgs = args;
                return Promise.resolve({
                  data: { user: { id: "pending-email-user", email: args.email }, session: null },
                  error: null
                });
              },
              resend: (args) => {
                window.__resendArgs = args;
                return Promise.resolve({ data: {}, error: null });
              }
            },
            from: tableApi,
            rpc: () => Promise.resolve({ data: [], error: null })
          };
        }
      };
    })();
  `;
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${port}` });

  await context.route("**/lucide@*/dist/umd/lucide.min.js", (route) => {
    route.fulfill({ contentType: "text/javascript", body: "window.lucide={createIcons(){}};" });
  });
  await context.route("**/three@*/build/three.min.js", (route) => {
    route.fulfill({ contentType: "text/javascript", body: "window.THREE={};" });
  });
  await context.route("**/@supabase/supabase-js@*/dist/umd/supabase.min.js", (route) => {
    route.fulfill({ contentType: "text/javascript", body: supabaseMock() });
  });
  await context.route("**/google-color.svg", (route) => {
    route.fulfill({ contentType: "image/svg+xml", body: "<svg xmlns='http://www.w3.org/2000/svg'/>" });
  });

  try {
    const page = await context.newPage();
    await page.goto("/index.html#vendedor", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".seller-auth-form", { timeout: 30000 });
    const mode = await page.locator(".seller-auth-form").getAttribute("data-mode");
    if (mode !== "signup") await page.click('[data-action="seller-mode"][data-mode="signup"]');

    await page.fill("#seller-name", "Confirmacao ANSEND");
    await page.fill("#seller-store", "Confirm Beats");
    await page.fill("#seller-email", "confirmacao@ansend.test");
    await page.fill("#seller-password", "SenhaSegura123!");
    await page.click(".seller-submit");

    await page.waitForSelector(".email-confirmation-page", { timeout: 30000 });
    await page.waitForFunction(() => location.hash === "#confirmar-email");
    await page.waitForFunction(() => Boolean(window.__signUpArgs));

    const signUpArgs = await page.evaluate(() => window.__signUpArgs);
    if (signUpArgs.email !== "confirmacao@ansend.test") throw new Error(`Wrong signup email: ${JSON.stringify(signUpArgs)}`);
    if (!signUpArgs.options?.emailRedirectTo?.includes("ansend_email=confirmed")) {
      throw new Error(`Missing emailRedirectTo marker: ${JSON.stringify(signUpArgs.options)}`);
    }

    const screenText = await page.locator(".email-confirmation-card").innerText();
    if (!screenText.includes("Confira seu e-mail") || !screenText.includes("confirmacao@ansend.test")) {
      throw new Error(`Confirmation screen did not include expected copy: ${screenText}`);
    }

    await page.click('[data-action="resend-confirmation-email"]');
    await page.waitForFunction(() => Boolean(window.__resendArgs));
    const resendArgs = await page.evaluate(() => window.__resendArgs);
    if (resendArgs.type !== "signup" || resendArgs.email !== "confirmacao@ansend.test") {
      throw new Error(`Wrong resend args: ${JSON.stringify(resendArgs)}`);
    }
    if (!resendArgs.options?.emailRedirectTo?.includes("ansend_email=confirmed")) {
      throw new Error(`Missing resend redirect: ${JSON.stringify(resendArgs.options)}`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Email confirmation OK: signup opens confirmation page and resend uses Supabase Auth.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
