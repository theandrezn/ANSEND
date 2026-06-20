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
  "padding:",
]) {
  if (!containerRule.includes(marker)) {
    throw new Error(`Cart container must use full available width and no centered gutter: ${marker}`);
  }
}

if (/body\[data-route="carrinho"\] \\.checkout-container\s*\{[\s\S]*?margin:\s*0\s+auto/i.test(styles)) {
  throw new Error("Cart container must not be centered with margin: 0 auto.");
}

console.log("Cart layout gutter check passed");
