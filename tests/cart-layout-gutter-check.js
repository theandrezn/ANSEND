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
  "width: calc(100% - 48px) !important",
  "max-width: 1120px !important",
  "margin: 0 auto !important",
  "padding: 28px 0 64px !important",
]) {
  if (!containerRule.includes(marker)) {
    throw new Error(`Cart container must use the controlled reference width: ${marker}`);
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
