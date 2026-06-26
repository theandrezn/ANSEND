const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const worker = read("src/worker.mjs");
const script = read("script.js");
const styles = read("styles.css");
const schema = read("supabase/schema.sql");
const migration = read("supabase/migrations/20260626133000_spotify_curadoria_phase2.sql") + "\n" + read("supabase/migrations/20260626150000_spotify_official_oauth.sql");
const envExample = read(".env.example");
const docs = read("docs/spotify-integration.md") + "\n" + read("docs/spotify-app-review.md");

const checks = [
  ["oauth connect endpoint", /\/api\/spotify\/connect/],
  ["oauth callback endpoint", /\/api\/spotify\/callback/],
  ["status endpoint", /\/api\/spotify\/status/],
  ["disconnect endpoint", /\/api\/spotify\/disconnect/],
  ["resolve link endpoint", /\/api\/spotify\/resolve-link/],
  ["playlists endpoint", /\/api\/spotify\/playlists/],
  ["playlist items endpoint", /handleSpotifyPlaylistItems/],
  ["sync all endpoint", /\/api\/spotify\/sync-all/],
  ["fixed official scopes", /user-read-private[\s\S]*playlist-read-private[\s\S]*playlist-read-collaborative[\s\S]*playlist-modify-public[\s\S]*playlist-modify-private/],
  ["state digest", /function hashSpotifyState[\s\S]*SHA-256/],
  ["aes gcm encryption", /function encryptSpotifyToken[\s\S]*AES-GCM[\s\S]*function decryptSpotifyToken/],
  ["no token in public connection", /function publicSpotifyConnection[\s\S]*connected[\s\S]*last_error_code/],
  ["invalid grant reconnect", /invalid_grant[\s\S]*markSpotifyReconnectRequired/],
  ["playlist classifier", /function normalizeConnectedSpotifyPlaylist/],
  ["spotify connections table", /create table if not exists public\.spotify_connections/],
  ["spotify secrets table", /create table if not exists public\.spotify_connection_secrets/],
  ["oauth states table", /create table if not exists public\.spotify_oauth_states/],
  ["snapshots table", /create table if not exists public\.curator_playlist_snapshots/],
  ["sync runs table", /create table if not exists public\.spotify_sync_runs/],
  ["official curator spotify playlists table", /create table if not exists public\.curator_spotify_playlists/],
  ["spotify playlist placements table", /create table if not exists public\.spotify_playlist_placements/],
  ["access lost verification", /verification_status in \('unverified', 'pending', 'verified', 'failed', 'access_lost'\)/],
  ["secrets revoked from client", /revoke all on public\.spotify_connection_secrets from anon, authenticated/],
  ["oauth states revoked from client", /revoke all on public\.spotify_oauth_states from anon, authenticated/],
  ["admin curator rpc", /admin_list_curator_playlists[\s\S]*admin_moderate_curator_playlist/],
  ["frontend connection panel", /renderCuradoriaSpotifyPanel/],
  ["frontend resolve link action", /curadoria-spotify-resolve-link/],
  ["frontend import modal", /renderCuradoriaSpotifyImportModal/],
  ["frontend connect action", /curadoria-spotify-connect/],
  ["frontend import action", /curadoria-spotify-import-selected/],
  ["env redirect", /SPOTIFY_REDIRECT_URI=/],
  ["env token key", /SPOTIFY_TOKEN_ENCRYPTION_KEY=/],
  ["docs production redirect", /https:\/\/ansendmusic\.site\/api\/spotify\/callback/],
  ["docs local redirect", /http:\/\/127\.0\.0\.1:8787\/api\/spotify\/callback/],
];

const forbidden = [
  ["excess scopes", /user-library|user-follow|user-read-email/],
  ["tokens in frontend", /script\.js[\s\S]*(refresh_token|access_token|SPOTIFY_CLIENT_SECRET|SPOTIFY_TOKEN_ENCRYPTION_KEY)/],
  ["orange in curadoria phase2 css", /curadoria-spotify[\s\S]*(--orange|#ff6a00|255,\s*106,\s*0|gradient)/i],
  ["docs real secret", /(sk-proj-|APP_USR-|Bearer\s+[A-Za-z0-9._-]{20,})/],
];

const sources = { worker, script, styles, schema, migration, envExample, docs };
const failures = [];

for (const [label, pattern] of checks) {
  const source =
    label.startsWith("frontend") ? script :
    label.startsWith("env") ? envExample :
    label.startsWith("docs") ? docs :
    /table|rpc|revoked|verification/.test(label) ? `${schema}\n${migration}` :
    worker;
  if (!pattern.test(source)) failures.push(`missing: ${label}`);
}

for (const [label, pattern] of forbidden) {
  const source =
    label.includes("frontend") ? script :
    label.includes("css") ? styles :
    label.includes("docs") ? docs :
    `${worker}\n${script}\n${docs}`;
  if (pattern.test(source)) failures.push(`forbidden: ${label}`);
}

if (!sources.worker.includes("encrypted_access_token") || sources.script.includes("encrypted_access_token")) {
  failures.push("token encryption visibility boundary failed");
}

if (failures.length) {
  console.error(`Spotify phase 2 contract check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Spotify phase 2 contract check passed");
