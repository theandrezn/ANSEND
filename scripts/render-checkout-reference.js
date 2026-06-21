const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");

async function render(viewport, output) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const css = fs.readFileSync(path.join(root, "checkout", "checkout.css"), "utf8");
  const js = fs.readFileSync(path.join(root, "checkout", "checkout.js"), "utf8");
  const cover = `data:image/png;base64,${fs.readFileSync(path.join(root, "assets", "ansend-logo-square.png")).toString("base64")}`;
  const pix = `data:image/svg+xml;base64,${fs.readFileSync(path.join(root, "assets", "payment", "pix.svg")).toString("base64")}`;

  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#222423}${css}</style></head><body></body></html>`);
  await page.addScriptTag({ content: js });
  await page.evaluate(({ cover, pix }) => {
    document.body.innerHTML = window.AnsendCheckout.renderCheckout({
      items: [
        { beatId: "1", cartId: "1::premium", title: "NOITE EM SAO PAULO", producer: "theandrezn", licenseName: "Licenca Premium", formats: "MP3, WAV", cover, priceCents: 19990, removable: true },
        { beatId: "2", cartId: "2::exclusive", title: "ULTIMO VOO - Exclusive Beat", producer: "ANSEND Studios", licenseName: "Licenca Exclusiva", formats: "MP3, WAV, Stems", cover, priceCents: 34990, removable: true },
      ],
      quote: { subtotalCents: 54980, serviceFeeCents: 6598, discountCents: 0, totalCents: 61578 },
      recommendation: { id: "3", title: "Horizonte Azul", producer: "Beatmaker ANSEND", description: "Licenca Premium", price: "R$ 149,90", originalPrice: "R$ 199,90", cover, sponsored: true },
    }).replaceAll('src="assets/payment/pix.svg"', `src="${pix}"`);
  }, { cover, pix });
  await page.screenshot({ path: path.join(root, output), fullPage: true });
  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    layoutColumns: getComputedStyle(document.querySelector(".ansend-checkout__layout")).gridTemplateColumns,
    shellWidth: document.querySelector(".ansend-checkout__shell").getBoundingClientRect().width,
    layoutWidth: document.querySelector(".ansend-checkout__layout").getBoundingClientRect().width,
    mainWidth: document.querySelector(".ansend-checkout__main").getBoundingClientRect().width,
    summaryWidth: document.querySelector(".ansend-checkout__summary").getBoundingClientRect().width,
    formWidth: document.querySelector(".ansend-checkout__form").getBoundingClientRect().width,
    focusable: document.querySelectorAll("button, input, select, textarea, a[href]").length,
  }));
  await browser.close();
  return metrics;
}

(async () => {
  const viewports = [
    [2560, 1440], [1920, 1080], [1536, 864], [1440, 900], [1366, 768], [1024, 900], [430, 932], [390, 844],
  ];
  const results = {};
  for (const [width, height] of viewports) {
    results[width] = await render({ width, height }, `tests/checkout-pixel-perfect-${width}.png`);
  }
  const desktop = results[1440];
  const mobile = results[390];
  if (Object.values(results).some((result) => result.overflow)) throw new Error(`Checkout has horizontal overflow: ${JSON.stringify(results)}`);
  if (!/\S+px \S+px/.test(desktop.layoutColumns)) throw new Error("Desktop ANSEND checkout must keep main content plus side summary");
  if (desktop.layoutWidth < 860 || desktop.layoutWidth > 940) throw new Error(`Desktop layout width drifted away from ANSEND reference: ${JSON.stringify(desktop)}`);
  if (desktop.mainWidth < 560 || desktop.summaryWidth < 260) throw new Error(`Desktop columns are compressed: ${JSON.stringify(desktop)}`);
  if (results[1024].layoutWidth < 860 || results[1920].layoutWidth > 940 || results[2560].shellWidth > 1565) throw new Error(`Wide/narrow shell is outside ANSEND reference contract: ${JSON.stringify(results)}`);
  if (mobile.layoutWidth < 360 || mobile.summaryWidth < 360) throw new Error(`Mobile checkout is compressed: ${JSON.stringify(mobile)}`);
  if (desktop.focusable < 12) throw new Error("Checkout controls were not rendered");
  console.log(JSON.stringify(results, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
