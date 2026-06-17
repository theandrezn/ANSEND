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

if (!/\.chat-dm-page\s*\{[\s\S]*grid-template-columns:\s*72px minmax\(330px,\s*395px\) minmax\(0,\s*1fr\)/.test(styles)) {
  throw new Error("Chat layout must keep the X-style three-column proportion");
}

console.log("Chat DM UI check passed");
