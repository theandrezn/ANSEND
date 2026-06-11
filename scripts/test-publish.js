const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  console.log("Navigating to live homepage vendedor route...");
  await page.goto("https://ansend.andrrluis86.workers.dev/#vendedor");
  await page.waitForTimeout(3000);
  
  console.log("Checking if email input exists...");
  const exists = await page.evaluate(() => !!document.querySelector("#seller-email"));
  console.log("Email input exists:", exists);

  if (!exists) {
    console.log("Page HTML preview:");
    const html = await page.evaluate(() => document.body.innerHTML.substring(0, 1000));
    console.log(html);
  }

  console.log("Logging in...");
  await page.fill("#seller-email", "hsegunduu@gmail.com");
  await page.fill("#seller-password", "@Moodna26");
  await page.click(".seller-submit");
  await page.waitForTimeout(5000);

  console.log("Checking auth state after login...");
  const state = await page.evaluate(() => {
    return {
      authUser: typeof appState !== 'undefined' ? appState.authUser : null,
      profile: typeof appState !== 'undefined' ? appState.profile : null
    };
  });
  console.log("After login state:", JSON.stringify(state, null, 2));

  await browser.close();
}

run().catch(console.error);
