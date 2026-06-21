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
    shellColumns: getComputedStyle(document.querySelector(".ansend-checkout__shell")).gridTemplateColumns,
    shellWidth: document.querySelector(".ansend-checkout__shell").getBoundingClientRect().width,
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
  if (!/\S+px \S+px/.test(desktop.shellColumns)) throw new Error("Desktop checkout is not split into two columns");
  if (desktop.shellWidth < 1320 || desktop.shellWidth > 1680.5) throw new Error(`Desktop shell width is not using the viewport proportionally: ${JSON.stringify(desktop)}`);
  if (results[1920].shellWidth < 1650 || results[2560].shellWidth > 1680.5) throw new Error(`Wide desktop shell width is outside the premium fullscreen contract: ${JSON.stringify(results)}`);
  if (results[1366].formWidth < 480 || desktop.formWidth < 520 || results[1920].formWidth < 580 || mobile.formWidth < 330) throw new Error(`Checkout form is compressed: ${JSON.stringify({ narrow: results[1366], desktop, wide: results[1920], mobile })}`);
  if (desktop.focusable < 12) throw new Error("Checkout controls were not rendered");
  console.log(JSON.stringify(results, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
