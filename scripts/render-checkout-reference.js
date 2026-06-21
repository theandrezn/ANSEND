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
  const pix = `data:image/png;base64,${fs.readFileSync(path.join(root, "assets", "payment", "pix-user.png")).toString("base64")}`;

  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#060707;overflow-x:hidden}${css}</style></head><body></body></html>`);
  await page.addScriptTag({ content: js });
  await page.evaluate(({ cover, pix }) => {
    document.body.innerHTML = window.AnsendCheckout.renderCheckout({
      items: [
        { beatId: "1", cartId: "1::premium", title: "NOITE EM SAO PAULO", producer: "theandrezn", licenseName: "Licenca Premium", formats: "MP3, WAV", cover, priceCents: 19990, removable: true },
        { beatId: "2", cartId: "2::exclusive", title: "ULTIMO VOO - Exclusive Beat", producer: "ANSEND Studios", licenseName: "Licenca Exclusiva", formats: "MP3, WAV, Stems", cover, priceCents: 34990, removable: true },
      ],
      quote: { subtotalCents: 54980, serviceFeeCents: 6598, discountCents: 0, totalCents: 61578 },
      recommendation: { id: "3", title: "Horizonte Azul", producer: "Beatmaker ANSEND", description: "Licenca Premium", price: "R$ 149,90", originalPrice: "R$ 199,90", cover, sponsored: true },
    }).replaceAll('src="assets/payment/pix-user.png"', `src="${pix}"`);
  }, { cover, pix });
  await page.screenshot({ path: path.join(root, output), fullPage: true });
  if (viewport.width === 1920 && viewport.height === 1080) {
    await page.screenshot({ path: path.join(root, "tests", "checkout-pixel-perfect-1920-viewport.png"), fullPage: false });
  }
  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    devicePixelRatio: window.devicePixelRatio,
    rootFontSize: getComputedStyle(document.documentElement).fontSize,
    htmlZoom: document.documentElement.style.zoom || getComputedStyle(document.documentElement).zoom || "",
    shellColumns: getComputedStyle(document.querySelector(".ansend-checkout__shell")).gridTemplateColumns,
    shellWidth: document.querySelector(".ansend-checkout__shell").getBoundingClientRect().width,
    shellRadius: getComputedStyle(document.querySelector(".ansend-checkout__shell")).borderRadius,
    pageBackground: getComputedStyle(document.querySelector(".ansend-checkout")).backgroundImage,
    formWidth: document.querySelector(".ansend-checkout__form").getBoundingClientRect().width,
    titleFontSize: getComputedStyle(document.querySelector(".ansend-checkout__order-content h2")).fontSize,
    productTitleFontSize: getComputedStyle(document.querySelector(".ansend-checkout__item-copy > strong")).fontSize,
    inputHeight: Array.from(document.querySelectorAll(".ansend-checkout__field input")).find((input) => input.getBoundingClientRect().height > 0)?.getBoundingClientRect().height || 0,
    ctaHeight: document.querySelector("[data-checkout-submit]").getBoundingClientRect().height,
    methodHeight: document.querySelector(".ansend-checkout__methods button").getBoundingClientRect().height,
    pixIntroHeight: document.querySelector(".ansend-checkout__pix-intro").getBoundingClientRect().height,
    ctaBottom: document.querySelector("[data-checkout-submit]").getBoundingClientRect().bottom,
    viewportHeight: window.innerHeight,
    focusable: document.querySelectorAll("button, input, select, textarea, a[href]").length,
  }));
  await browser.close();
  return metrics;
}

(async () => {
  const viewports = [
    [1920, 1080], [1600, 900], [1440, 900], [1366, 768], [1024, 768], [768, 1024], [430, 932], [390, 844],
  ];
  const results = {};
  for (const [width, height] of viewports) {
    results[width] = await render({ width, height }, `tests/checkout-pixel-perfect-${width}.png`);
  }
  const desktop = results[1440];
  const mobile = results[390];
  if (Object.values(results).some((result) => result.overflow)) throw new Error(`Checkout has horizontal overflow: ${JSON.stringify(results)}`);
  if (Object.values(results).some((result) => result.devicePixelRatio !== 1 || result.rootFontSize !== "16px")) throw new Error(`Checkout must render at DSF 1 and root 16px: ${JSON.stringify(results)}`);
  if (Object.values(results).some((result) => result.htmlZoom && result.htmlZoom !== "normal" && result.htmlZoom !== "1")) throw new Error(`Checkout must not use html zoom: ${JSON.stringify(results)}`);
  if (!/\S+px \S+px/.test(desktop.shellColumns)) throw new Error("Desktop checkout is not split into two columns");
  if (desktop.shellWidth !== 1440 || results[1920].shellWidth !== 1920 || results[1366].shellWidth !== 1366) throw new Error(`Checkout shell is not fullscreen width: ${JSON.stringify(results)}`);
  if (desktop.shellRadius !== "0px" || desktop.pageBackground !== "none") throw new Error(`Checkout still looks like a floating panel: ${JSON.stringify(desktop)}`);
  if (parseFloat(results[1920].titleFontSize) > 28 || parseFloat(desktop.titleFontSize) > 28) throw new Error(`Checkout typography is too large: ${JSON.stringify({ wide: results[1920], desktop })}`);
  if (parseFloat(desktop.productTitleFontSize) > 14.5 || parseFloat(results[1920].productTitleFontSize) > 14.5) throw new Error(`Product title typography regressed: ${JSON.stringify({ wide: results[1920], desktop })}`);
  if (results[1920].inputHeight < 40 || results[1920].inputHeight > 42 || results[1920].ctaHeight < 42 || results[1920].ctaHeight > 44 || results[1920].methodHeight < 48 || results[1920].methodHeight > 54 || results[1920].pixIntroHeight < 76 || results[1920].pixIntroHeight > 84) throw new Error(`Checkout desktop density is outside contract: ${JSON.stringify(results[1920])}`);
  if (results[1366].formWidth < 420 || desktop.formWidth < 460 || results[1920].formWidth < 600 || mobile.formWidth < 330) throw new Error(`Checkout form is compressed: ${JSON.stringify({ narrow: results[1366], desktop, wide: results[1920], mobile })}`);
  if (results[1366].ctaBottom > results[1366].viewportHeight + 260 || results[1440].ctaBottom > results[1440].viewportHeight + 180) throw new Error(`Checkout CTA is too far below desktop fold: ${JSON.stringify({ narrow: results[1366], desktop })}`);
  if (desktop.focusable < 12) throw new Error("Checkout controls were not rendered");
  console.log(JSON.stringify(results, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
