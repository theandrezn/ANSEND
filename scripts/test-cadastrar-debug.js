const { chromium } = require("playwright");

async function debug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto("http://127.0.0.1:8788/index.html#cadastrar", {
    waitUntil: "domcontentloaded"
  });
  await page.waitForTimeout(4000);
  
  const bodyText = await page.locator("body").innerText();
  console.log("BODY TEXT:\n", bodyText);
  
  const appViewHTML = await page.locator("#appView").innerHTML();
  console.log("APP VIEW HTML:\n", appViewHTML);
  
  await browser.close();
}

debug().catch(console.error);
