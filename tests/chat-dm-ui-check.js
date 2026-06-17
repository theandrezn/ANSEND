const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const requiredScript = [
  "function chatProfileSummaryMarkup",
  "function chatTimelineMarkup",
  "function retryChatMessage",
  "chat-message-retry",
  "chat-list-tabs",
  "chat-composer-input",
  "chat-thread-menu",
  "chatFailedMessages",
  "CHAT_INBOX_CACHE_KEY",
  "hydrateChatInboxFromCache",
  "writeChatInboxCache",
  "captureChatVisualState",
  "restoreChatVisualState",
  "shouldAnimateChatRender",
];

for (const marker of requiredScript) {
  if (!script.includes(marker)) throw new Error(`Missing chat UI script marker: ${marker}`);
}

const requiredStyles = [
  "--chat-sent: #1d9bf0",
  ".chat-profile-summary",
  ".chat-list-tabs",
  ".chat-composer-input",
  ".chat-message-retry",
  ".chat-message-row.is-mine .chat-proposal-bubble",
  "chat-page-slide-in",
  "chat-thread-slide-in",
  ".chat-dm-page.is-entering",
  "prefers-reduced-motion: reduce",
];

for (const marker of requiredStyles) {
  if (!styles.includes(marker)) throw new Error(`Missing chat UI style marker: ${marker}`);
}

const proposalOverride = styles.match(/\.chat-proposal-bubble,\s*[\r\n]+\.chat-message-row\.is-mine \.chat-proposal-bubble\s*\{[\s\S]*?\n\}/)?.[0] || "";
if (!/background:\s*#16181c/.test(proposalOverride)) {
  throw new Error("Proposal cards must use the dark proposal override");
}
if (/background:\s*#eff3f4/.test(proposalOverride)) {
  throw new Error("Proposal cards must not use white sent-message styling");
}

if (!/\.chat-dm-page\s*\{[\s\S]*display:\s*flex\s*!important/.test(styles)) {
  throw new Error("Chat layout must keep the X-style flex viewport shell");
}
const baseChatBlock = styles.match(/\.chat-dm-page\s*\{[\s\S]*?\n\}/)?.[0] || "";
if (/animation:\s*chat-/.test(baseChatBlock)) {
  throw new Error("Base chat shell must not animate on every re-render.");
}
if (!/\.chat-dm-page\.is-entering\s*\{[\s\S]*animation:\s*chat-page-slide-in/.test(styles)) {
  throw new Error("Chat entry animation must be opt-in via .is-entering.");
}
if (!/\.chat-list-column\s*\{[\s\S]*flex:\s*0 0 380px\s*!important/.test(styles) || !/\.chat-thread-column\s*\{[\s\S]*flex:\s*1\s*!important/.test(styles)) {
  throw new Error("Chat layout must keep the list/thread flex proportions");
}

console.log("Chat DM UI check passed");
