const fs = require("node:fs");

const index = fs.readFileSync("index.html", "utf8");
const script = fs.readFileSync("script.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

for (const marker of [
  'navbar-cart-container',
  'id="navbarCartBtn"',
  'href="#carrinho"',
  'id="navbarCartBadge"',
]) {
  if (!index.includes(marker)) {
    throw new Error(`Navbar cart shortcut missing markup marker: ${marker}`);
  }
}

if (index.indexOf("navbarNotificationContainer") > index.indexOf("navbarCartContainer")) {
  throw new Error("Navbar cart shortcut must sit beside the notification icon, after the notification container.");
}

for (const marker of [
  "syncNavbarCartBadge",
  "navbarCartBadge",
  "navbarCartBtn",
]) {
  if (!script.includes(marker)) {
    throw new Error(`Navbar cart shortcut missing script marker: ${marker}`);
  }
}

for (const marker of [
  ".navbar-cart-btn",
  ".navbar-cart-btn:hover",
  ".cart-badge",
]) {
  if (!styles.includes(marker)) {
    throw new Error(`Navbar cart shortcut missing style marker: ${marker}`);
  }
}

console.log("Navbar cart shortcut check passed");
