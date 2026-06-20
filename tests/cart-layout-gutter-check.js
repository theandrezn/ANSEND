const fs = require("node:fs");

const styles = fs.readFileSync("styles.css", "utf8");

for (const marker of [
  'body[data-route="carrinho"] #appView.app-view',
  'body[data-route="carrinho"] .checkout-page',
  'body[data-route="carrinho"] .checkout-container',
  'body[data-route="carrinho"] .checkout-main-grid',
]) {
  if (!styles.includes(marker)) {
    throw new Error(`Cart layout missing route-specific gutter rule: ${marker}`);
  }
}

const containerRule = styles.match(/body\[data-route="carrinho"\] \.checkout-container\s*\{[\s\S]*?\}/)?.[0] || "";
for (const marker of [
  "width: 100% !important",
  "max-width: none !important",
  "margin: 0 !important",
  "padding: 32px 40px 64px !important",
]) {
  if (!containerRule.includes(marker)) {
    throw new Error(`Cart container must occupy the full useful area: ${marker}`);
  }
}

const appViewRule = styles.match(/body\[data-route="carrinho"\] #appView\.app-view\s*\{[\s\S]*?\}/)?.[0] || "";
for (const marker of [
  "padding: 0 !important",
  "margin: 0 !important",
  "max-width: none !important",
]) {
  if (!appViewRule.includes(marker)) {
    throw new Error(`Cart app view must remove the sidebar/top gutter: ${marker}`);
  }
}

const gridRule = styles.match(/body\[data-route="carrinho"\] \.checkout-main-grid\s*\{[\s\S]*?\}/)?.[0] || "";
for (const marker of [
  "grid-template-columns: minmax(0, 1fr) 310px !important",
  "gap: 24px !important",
]) {
  if (!gridRule.includes(marker)) {
    throw new Error(`Cart grid must match the reference layout: ${marker}`);
  }
}

console.log("Cart layout gutter check passed");
