const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const outputDir = "C:/Users/games/.gemini/antigravity/brain/1cbe404b-645a-4b13-be6f-a044aa408922";
const baseUrl = "http://127.0.0.1:8787";

const viewports = [
  { width: 1920, height: 1080, name: "desktop-1920" },
  { width: 1440, height: 900, name: "desktop-1440" },
  { width: 1366, height: 768, name: "laptop-1366" },
  { width: 375, height: 812, name: "mobile-375", isMobile: true }
];

async function run() {
  console.log("Iniciando captura de telas de validação...");
  const browser = await chromium.launch({ headless: true });

  try {
    for (const vp of viewports) {
      console.log(`Capturando resolução ${vp.width}x${vp.height} (${vp.name})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile || false,
        hasTouch: vp.isMobile || false,
        deviceScaleFactor: 1
      });

      const page = await context.newPage();
      
      // Navega para o feed primeiro para garantir a inicialização de dados
      await page.goto(`${baseUrl}/#feed`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(500);

      // Navega para a rota de detalhe do beat fictício top-beat-psiiiko
      await page.evaluate(() => {
        location.hash = "beat-top-beat-psiiiko";
        if (typeof window.renderRoute === "function") window.renderRoute();
      });
      await page.waitForTimeout(1000);

      // Tira o screenshot da primeira dobra (viewport)
      const screenshotPath = path.join(outputDir, `beat-detail-${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Salvo em: ${screenshotPath}`);

      await context.close();
    }
  } catch (error) {
    console.error("Erro durante os testes de validação:", error);
  } finally {
    await browser.close();
    console.log("Validação concluída.");
  }
}

run();
