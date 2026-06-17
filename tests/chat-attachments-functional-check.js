const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const worker = fs.readFileSync(path.join(root, "src", "worker.mjs"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260617070000_chat_attachments_and_gifs.sql"), "utf8");
const audioMigration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260617190000_chat_audio_attachment_mimes.sql"), "utf8");

for (const marker of [
  "chatAttachmentPreviewMarkup",
  "chatAttachmentKindFromMetadata",
  "mimeTypeForFile",
  "chatComposerMenuMarkup",
  "chatGifPickerMarkup",
  "chatEmojiPickerMarkup",
  "sendChatGif",
  "chat-attachment-pick",
  "chat-gif-send",
  "chat-emoji-insert",
  "chat-audio-attachment",
  "audio/ogg",
  "audio/x-m4a",
  "chat-attachments",
]) {
  if (!script.includes(marker)) throw new Error(`Missing chat frontend marker: ${marker}`);
}

for (const marker of [
  "handleChatGifs",
  "TENOR_API_KEY",
  "GIPHY_API_KEY",
  "/api/chat/gifs",
  "if (!auth.ok) return auth.response",
]) {
  if (!worker.includes(marker)) throw new Error(`Missing chat GIF worker marker: ${marker}`);
}

for (const marker of [
  "message_type in ('text', 'proposal', 'system', 'attachment', 'gif', 'audio')",
  "chat-attachments",
  "Users can upload own chat attachments",
  "audio/ogg",
  "audio/x-m4a",
]) {
  if (!migration.includes(marker)) throw new Error(`Missing chat migration marker: ${marker}`);
}

for (const marker of [
  "chat-attachments",
  "audio/mp3",
  "audio/ogg",
  "audio/x-m4a",
]) {
  if (!audioMigration.includes(marker)) throw new Error(`Missing chat audio migration marker: ${marker}`);
}

for (const marker of [
  ".chat-thread-column",
  "flex: 1",
  "min-width: 0",
  ".chat-thread-messages",
  "overflow-x: hidden",
  ".chat-message-row.is-mine",
  "justify-content: flex-end",
  ".chat-proposal-bubble",
  "width: min(420px, 100%)",
  "overflow-wrap: anywhere",
]) {
  if (!styles.includes(marker)) throw new Error(`Missing chat containment CSS marker: ${marker}`);
}

console.log("Chat attachments and containment check passed");
