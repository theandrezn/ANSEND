const { chromium } = require("playwright");
const path = require("path");

const outputDir = "C:/Users/games/.gemini/antigravity/brain/1cbe404b-645a-4b13-be6f-a044aa408922";
const baseUrl = "http://127.0.0.1:8787";

const viewports = [
  { width: 1920, height: 1080, name: "desktop-1920" },
  { width: 1366, height: 768, name: "laptop-1366" },
  { width: 390, height: 844, name: "mobile-390", isMobile: true }
];

async function run() {
  console.log("Iniciando captura de telas de validação do redesign de autenticação...");
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
      
      // Navega para o vendedor (cadastro/login)
      await page.goto(`${baseUrl}/#vendedor`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(1000);

      // Destrava a tela de loading de sessão (se houver) e renderiza a autenticação diretamente
      await page.evaluate(() => {
        if (window.appState) {
          window.appState.authLoading = false;
        }
        if (typeof window.renderSellerAuth === "function") {
          window.renderSellerAuth();
        } else if (typeof window.renderRoute === "function") {
          window.renderRoute();
        }
      });
      await page.waitForTimeout(1000);

      // Alterna para o modo de cadastro ("signup") para exibir todos os campos, cards e chips
      const modeBtn = await page.$('button[data-action="seller-mode"]');
      if (modeBtn) {
        await modeBtn.click();
        await page.waitForTimeout(1000);
      }

      // Tira o screenshot
      const screenshotPath = path.join(outputDir, `auth-redesign-${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Salvo em: ${screenshotPath}`);

      await context.close();
    }
  } catch (error) {
    console.error("Erro durante os testes de validação do auth redesign:", error);
  } finally {
    await browser.close();
    console.log("Validação concluída.");
  }
}

run();
