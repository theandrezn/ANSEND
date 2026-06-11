const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  console.log("Navigating to homepage...");
  await page.goto("http://localhost:8788");
  await page.waitForTimeout(1000);
  
  // Login
  console.log("Logging in...");
  await page.fill("#seller-email", "hsegunduu@gmail.com");
  await page.fill("#seller-password", "@Moodna26");
  await page.click(".seller-submit");
  await page.waitForTimeout(2000);
  
  // Navigate to #cadastrar
  console.log("Navigating to #cadastrar...");
  await page.goto("http://localhost:8788/#cadastrar");
  await page.waitForTimeout(2000);

  const routeAttr = await page.evaluate(() => document.body.getAttribute("data-route"));
  console.log(`\nBODY DATA-ROUTE: ${routeAttr}`);
  
  // Get element bounding boxes & computed styles
  const selectors = [
    "body",
    ".sidebar",
    ".page",
    ".topbar",
    "#appView",
    ".release-page",
    ".release-app",
    ".release-top-stepper-container",
    ".release-stepper",
    ".release-page-container",
    ".release-upload-form"
  ];
  
  for (const selector of selectors) {
    const box = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        selector: sel,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        display: style.display,
        position: style.position,
        maxWidth: style.maxWidth,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        gridTemplateColumns: style.gridTemplateColumns
      };
    }, selector);
    
    if (box) {
      console.log(`\nSelector: ${box.selector}`);
      console.log(`  BBox: x=${box.x}, y=${box.y}, w=${box.width}, h=${box.height}`);
      console.log(`  Styles: display=${box.display}, position=${box.position}, max-width=${box.maxWidth}`);
      console.log(`  Margin/Padding: ml=${box.marginLeft}, mr=${box.marginRight}, pl=${box.paddingLeft}, pr=${box.paddingRight}`);
      if (box.gridTemplateColumns) console.log(`  Grid cols: ${box.gridTemplateColumns}`);
    } else {
      console.log(`\nSelector: ${selector} NOT FOUND`);
    }
  }
  
  await browser.close();
}

run().catch(console.error);
