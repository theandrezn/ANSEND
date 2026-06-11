const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:8788/#cadastrar");
  await page.waitForTimeout(1000);
  
  // Find all stylesheet rules containing "amuse-release-shell"
  const rules = await page.evaluate(() => {
    const results = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes("amuse-release-shell")) {
            results.push({
              cssText: rule.cssText,
              href: sheet.href
            });
          }
        }
      } catch (e) {
        // cross-origin stylesheet
        results.push({ error: e.message, href: sheet.href });
      }
    }
    return results;
  });
  
  console.log("STYLESHEET RULES FOUND:");
  console.log(JSON.stringify(rules, null, 2));
  
  await browser.close();
}

run().catch(console.error);
