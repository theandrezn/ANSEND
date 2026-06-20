const fs = require("node:fs");

const script = fs.readFileSync("script.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

for (const marker of [
  "cartPromotedAds",
  "loadCartPromotedAds",
  "renderCartPromotedSection",
  "normalizeCartPromotedAd",
  "cartCatalogAdFallbacks",
  ".from(\"promoted_beats\")",
  "increment_promoted_beat_impression",
  "increment_promoted_beat_click",
  "cart_promoted",
  "IntersectionObserver",
]) {
  if (!script.includes(marker)) {
    throw new Error(`Cart promoted ads missing implementation marker: ${marker}`);
  }
}

if (script.includes("getPromotedBeatsForCart(12)")) {
  throw new Error("Cart promoted section must not use local/catalog fallback recommendations.");
}

for (const marker of [
  "body[data-route=\"carrinho\"] .checkout-container",
  "max-width: none !important",
  "grid-template-columns: minmax(0, 1fr) 310px !important",
  ".checkout-promoted-section",
  ".checkout-carousel-track",
  ".checkout-promoted-card",
]) {
  if (!styles.includes(marker)) {
    throw new Error(`Cart visual reconstruction missing style marker: ${marker}`);
  }
}

console.log("Cart promoted ads check passed");
