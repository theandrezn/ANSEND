const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  console.log("Navigating to live homepage...");
  await page.goto("https://ansend.andrrluis86.workers.dev/");
  await page.waitForTimeout(2000);
  
  // Login if gate exists
  const hasAuth = await page.evaluate(() => document.body.classList.contains("requires-auth") || !!document.querySelector("#seller-email"));
  if (hasAuth) {
    console.log("Logging in...");
    await page.fill("#seller-email", "hsegunduu@gmail.com");
    await page.fill("#seller-password", "@Moodna26");
    await page.click(".seller-submit");
    await page.waitForTimeout(3000);
  }
  
  console.log("Scrolling to footer...");
  // scroll to the bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const routeAttr = await page.evaluate(() => document.body.getAttribute("data-route"));
  console.log(`\nBODY DATA-ROUTE: ${routeAttr}`);
  
  const info = await page.evaluate(() => {
    function getSelectorInfo(sel) {
      const el = document.querySelector(sel);
      if (!el) return { selector: sel, found: false };
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        selector: sel,
        found: true,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom,
        display: style.display,
        position: style.position,
        maxWidth: style.maxWidth,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        textAlign: style.textAlign,
        justifyContent: style.justifyContent,
        alignItems: style.alignItems,
        flexDirection: style.flexDirection,
        boxSizing: style.boxSizing
      };
    }
    
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      page: getSelectorInfo(".page"),
      sidebar: getSelectorInfo(".sidebar"),
      parallax: getSelectorInfo(".home-parallax"),
      baseLayer: getSelectorInfo(".home-parallax__layer--base"),
      footer: getSelectorInfo(".cinematic-footer"),
      centerContent: getSelectorInfo(".cinematic-footer .footer-center-content"),
      linksContainer: getSelectorInfo(".cinematic-footer .footer-links-container"),
      primaryPills: getSelectorInfo(".cinematic-footer .footer-primary-pills"),
      secondaryPills: getSelectorInfo(".cinematic-footer .footer-secondary-pills"),
      bottomBar: getSelectorInfo(".cinematic-footer .footer-bottom-bar"),
      copyright: getSelectorInfo(".cinematic-footer .footer-copyright"),
      topBtn: getSelectorInfo(".cinematic-footer .footer-top-btn")
    };
  });
  
  console.log(JSON.stringify(info, null, 2));
  
  await browser.close();
}

run().catch(console.error);
