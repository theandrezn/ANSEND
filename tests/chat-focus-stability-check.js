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
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const errors = [];
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
          const testUser = { id: "user-a", email: "artist@example.com", user_metadata: { name: "andrezin" } };
          function queryResult(table) {
            const profile = { id: "user-a", username: "andrezin", artistic_name: "andrezin", full_name: "andrezin" };
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
              single: async () => ({ data: table === "profiles" ? profile : null, error: null }),
              maybeSingle: async () => ({ data: table === "profiles" ? profile : null, error: null }),
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
              channel: () => ({ on: function() { return this; }, subscribe: function() { return this; } }),
              removeChannel: () => {},
              storage: { from: () => ({ upload: async () => ({ data: {}, error: null }), getPublicUrl: () => ({ data: { publicUrl: "" } }) }) }
            })
          };
        `,
      });
    });

    await page.goto(`http://127.0.0.1:${server.address().port}/#bate-papo`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".chat-dm-page", { timeout: 10000 });

    const result = await page.evaluate(async () => {
      const conversationId = "conversation-a";
      appState.chat.conversations = [{
        id: conversationId,
        created_by: "user-a",
        type: "direct",
        last_message_at: new Date().toISOString(),
        lastMessage: { id: "m-last", conversation_id: conversationId, sender_id: "user-b", body: "Ultima mensagem", created_at: new Date().toISOString() },
      }];
      appState.chat.participants = { [conversationId]: ["user-a", "user-b"] };
      appState.chat.profiles["user-b"] = { id: "user-b", username: "heber", full_name: "Heber Segundo", artistic_name: "Heber Segundo" };
      appState.chat.messages[conversationId] = Array.from({ length: 35 }, (_, index) => ({
        id: `m-${index}`,
        conversation_id: conversationId,
        sender_id: index % 2 ? "user-a" : "user-b",
        body: `Mensagem ${index}`,
        created_at: new Date(Date.now() + index * 1000).toISOString(),
      }));
      appState.chat.activeConversationId = conversationId;
      renderChatPage({ preserveActive: true });
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const firstAnimated = document.querySelector(".chat-dm-page")?.classList.contains("is-entering");
      const messages = document.querySelector(".chat-thread-messages");
      messages.scrollTop = 120;
      const textarea = document.querySelector(".chat-composer-form textarea[name='body']");
      textarea.value = "texto preservado";
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(5, 5);
      renderChatPage({ preserveActive: true });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const pageNode = document.querySelector(".chat-dm-page");
      const nextTextarea = document.querySelector(".chat-composer-form textarea[name='body']");
      return {
        rerenderAnimated: pageNode?.classList.contains("is-entering"),
        rerenderStable: pageNode?.classList.contains("is-stable"),
        scrollTop: document.querySelector(".chat-thread-messages")?.scrollTop || 0,
        draft: nextTextarea?.value || "",
        focusedComposer: document.activeElement === nextTextarea,
        selectionStart: nextTextarea?.selectionStart ?? -1,
      };
    });

    if (result.rerenderAnimated) throw new Error("Preserved chat re-render must not repeat entry animation.");
    if (!result.rerenderStable) throw new Error("Preserved chat re-render should be marked stable.");
    if (result.scrollTop !== 120) throw new Error(`Chat scroll was not preserved: ${result.scrollTop}`);
    if (result.draft !== "texto preservado") throw new Error("Composer draft was not preserved.");
    if (!result.focusedComposer) throw new Error("Composer focus was not preserved.");
    if (result.selectionStart !== 5) throw new Error("Composer cursor was not preserved.");
  } finally {
    await browser.close();
    server.close();
  }

  if (errors.length) throw new Error(errors.join("\n"));
}

run().then(() => {
  console.log("Chat focus stability check passed");
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
