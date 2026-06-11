const { chromium } = require("c:/Users/games/Documents/ANSEND-1/node_modules/playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto("http://127.0.0.1:8081/index.html#feed", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);
  
  const layout = await page.evaluate(() => {
    const getSpacing = (el) => {
      const style = window.getComputedStyle(el);
      return {
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        height: el.getBoundingClientRect().height,
        offsetHeight: el.offsetHeight,
        scrollHeight: el.scrollHeight
      };
    };
    
    const body = document.body;
    const pageContainer = document.querySelector(".page");
    const children = Array.from(pageContainer ? pageContainer.children : []);
    
    return {
      body: getSpacing(body),
      pageContainer: getSpacing(pageContainer),
      children: children.map(c => ({
        tagName: c.tagName,
        className: c.className,
        spacing: getSpacing(c)
      }))
    };
  });
  
  console.log("Detailed Spacing Analysis:");
  console.log(JSON.stringify(layout, null, 2));
  
  await browser.close();
}

run().catch(console.error);
