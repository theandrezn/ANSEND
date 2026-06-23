const { chromium } = require("playwright");
const path = require("path");

const artifactsDir = "C:\\Users\\games\\.gemini\\antigravity-ide\\brain\\1f1daaf0-e506-4ba7-b0f9-b61fef47c533";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const url = "https://ansendmusic.site/#feed";
  
  console.log(`Starting production verification of: ${url}`);
  
  const viewports = [
    { width: 1920, height: 1080, screenshot: true },
    { width: 1440, height: 900, screenshot: true },
    { width: 1366, height: 768 },
    { width: 1280, height: 800 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 430, height: 932 },
    { width: 390, height: 844, screenshot: true },
    { width: 375, height: 812 },
    { width: 360, height: 800 },
  ];

  const failures = [];

  for (const vp of viewports) {
    console.log(`Testing viewport: ${vp.width}x${vp.height}`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      // Wait for beats data to hydrate (skeletons replaced)
      await page.waitForTimeout(6000);
      
      const metrics = await page.evaluate(() => {
        const hero = document.querySelector(".ai-hero");
        const catalog = document.querySelector(".top-beat-showcase");
        const headline = document.querySelector(".hero-morph-title");
        const search = document.querySelector(".ai-diagnostic-form") || document.querySelector(".ai-input-shell");
        const cta = document.querySelector(".ai-inline-submit") || document.querySelector(".hero-action-btn");

        const noOverflow = document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1;
        
        let catalogMetrics = null;
        if (catalog) {
          const rect = catalog.getBoundingClientRect();
          const columns = catalog.querySelectorAll(".spotify-collage-column");
          const columnsVisible = Array.from(columns).filter(col => getComputedStyle(col).display !== "none");
          const firstCard = catalog.querySelector(".spotify-track-card:not(.skeleton-card)");
          let cardAspectRatio = 1.0;
          let cardHeight = 0;
          if (firstCard) {
            const crect = firstCard.getBoundingClientRect();
            cardHeight = crect.height;
            cardAspectRatio = crect.width / Math.max(1, crect.height);
          }
          
          catalogMetrics = {
            found: true,
            rect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
            },
            columnsCount: columns.length,
            visibleColumnsCount: columnsVisible.length,
            cardHeight,
            cardAspectRatio,
          };
        }

        let headlineMetrics = null;
        if (headline) {
          const rect = headline.getBoundingClientRect();
          headlineMetrics = {
            found: true,
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0 && getComputedStyle(headline).display !== "none",
          };
        }

        return {
          noOverflow,
          catalog: catalogMetrics,
          headline: headlineMetrics,
          searchVisible: search ? getComputedStyle(search).display !== "none" : false,
          ctaVisible: cta ? getComputedStyle(cta).display !== "none" : false,
          url: window.location.href,
        };
      });

      console.log(`Viewport ${vp.width}x${vp.height} metrics:`, JSON.stringify(metrics, null, 2));

      // Verifications
      if (!metrics.noOverflow) {
        failures.push(`Horizontal overflow detected at ${vp.width}x${vp.height}`);
      }
      if (!metrics.catalog || !metrics.catalog.found) {
        failures.push(`Catalog element not found at ${vp.width}x${vp.height}`);
      }
      if (vp.width >= 1101 && metrics.catalog && metrics.catalog.visibleColumnsCount < 3) {
        failures.push(`Expected at least 3 visible columns on desktop (${vp.width}px), got ${metrics.catalog.visibleColumnsCount}`);
      }
      if (metrics.catalog && metrics.catalog.cardHeight > 0) {
        const ratio = metrics.catalog.cardAspectRatio;
        const height = metrics.catalog.cardHeight;
        if (Math.abs(ratio - 1) > 0.08) {
          failures.push(`Card aspect ratio is distorted (${ratio.toFixed(2)}) at ${vp.width}x${vp.height}`);
        }
        if (height > 300) {
          failures.push(`Card height is overly stretched (${height.toFixed(1)}px) at ${vp.width}x${vp.height}`);
        }
      }
      if (metrics.headline && !metrics.headline.visible) {
        failures.push(`Headline is not visible at ${vp.width}x${vp.height}`);
      }

      // Check clickability on headline & search / CTA
      if (vp.width >= 768) {
        if (!metrics.searchVisible) {
          failures.push(`Search input not visible on desktop/tablet at ${vp.width}x${vp.height}`);
        }
      }

      // Capture screenshot if requested
      if (vp.screenshot) {
        const screenshotPath = path.join(artifactsDir, `prod-collage-${vp.width}x${vp.height}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`Saved screenshot to: ${screenshotPath}`);
      }

      // Verify animation movement
      if (vp.width >= 1024) {
        const pos1 = await page.evaluate(() => {
          const cols = document.querySelectorAll(".spotify-collage-column");
          return Array.from(cols).map(c => c.getBoundingClientRect().y);
        });
        await page.waitForTimeout(3000);
        const pos2 = await page.evaluate(() => {
          const cols = document.querySelectorAll(".spotify-collage-column");
          return Array.from(cols).map(c => c.getBoundingClientRect().y);
        });
        
        console.log(`Animation tracking (0s vs 3s):`, { pos1, pos2 });
        let moved = false;
        for (let i = 0; i < Math.min(pos1.length, pos2.length); i++) {
          if (Math.abs(pos1[i] - pos2[i]) > 0.1) {
            moved = true;
          }
        }
        if (!moved) {
          failures.push(`Columns are not animating/moving at viewport ${vp.width}x${vp.height}`);
        }
      }

      // Verify that clicking a card navigates to a beat page
      if (vp.width >= 1024) {
        const clicked = await page.evaluate(() => {
          const cards = Array.from(document.querySelectorAll(".spotify-track-card:not(.skeleton-card)"));
          const showcase = document.querySelector(".top-beat-showcase");
          if (!showcase || cards.length === 0) return false;
          const showcaseRect = showcase.getBoundingClientRect();
          const centerY = showcaseRect.top + showcaseRect.height / 2;
          
          let bestCard = null;
          let minDiff = Infinity;
          for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const cardCenterY = rect.top + rect.height / 2;
            const diff = Math.abs(cardCenterY - centerY);
            if (diff < minDiff) {
              minDiff = diff;
              bestCard = card;
            }
          }
          if (bestCard) {
            const cover = bestCard.querySelector(".spotify-track-cover");
            if (cover) {
              cover.click();
              return true;
            }
          }
          return false;
        });

        if (clicked) {
          console.log(`Programmatically clicked beat card closest to center. Waiting for transition...`);
          const hrefBefore = await page.evaluate(() => window.location.hash);
          await page.waitForTimeout(2000);
          const hrefAfter = await page.evaluate(() => window.location.hash);
          console.log(`Href transition: ${hrefBefore} -> ${hrefAfter}`);
          if (!hrefAfter.startsWith("#beat-")) {
            failures.push(`Clicking beat card did not navigate to a #beat- route. Destination was: ${hrefAfter}`);
          }
          // Go back
          await page.goto(url, { waitUntil: "domcontentloaded" });
          await page.waitForTimeout(2000);
        } else {
          failures.push(`No visible, hydrated beat cards found for click testing at ${vp.width}px`);
        }
      }

    } catch (e) {
      failures.push(`Error during ${vp.width}x${vp.height} run: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  if (failures.length > 0) {
    console.error("Verification failed with the following errors:");
    failures.forEach(f => console.error(`- ${f}`));
    process.exit(1);
  } else {
    console.log("All production verification checks passed successfully!");
    process.exit(0);
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
