const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const script = read("script.js");
const worker = read("src/worker.mjs");
const schema = read("supabase/schema.sql");
const migration = read("supabase/migrations/20260626120000_curadoria_phase1.sql");
const index = read("index.html");
const styles = read("styles.css");
const envExample = read(".env.example");

function extractBlock(source, startToken, endToken) {
  const start = source.indexOf(startToken);
  if (start < 0) return "";
  const end = source.indexOf(endToken, start + startToken.length);
  return end < 0 ? source.slice(start) : source.slice(start, end);
}

const curadoriaJs = extractBlock(script, "const CURATOR_TYPES", "async function loadUserPurchases");
const curadoriaCss = extractBlock(styles, "/* Curadoria ANSEND - fase 1 */", "/* End Curadoria ANSEND - fase 1 */");

const checks = [
  ["curadoria route", /knownRoutes = new Set\([\s\S]*"curadoria"[\s\S]*"curadoria-perfil"[\s\S]*"curadoria-playlists"/],
  ["protected curadoria routes", /function protectedRoute\(route\)[\s\S]*"curadoria"[\s\S]*"curadoria-perfil"[\s\S]*"curadoria-playlists"/],
  ["curadoria renderer", /async function renderCuradoria\(route = currentRoute\(\)\)/],
  ["curator profile form", /function openCuradoriaProfileForm\(/],
  ["curator playlist form", /function openCuradoriaPlaylistForm\(/],
  ["frontend spotify preview action", /curadoria-preview-spotify/],
  ["honest unverified copy", /Playlist ainda nao verificada/],
  ["no fake metrics copy", /Sem metricas inventadas/],
  ["empty inbox copy", /Futuras musicas enviadas por artistas aparecerao aqui quando a fase de submissao for liberada/],
  ["profile Supabase table", /\.from\("curator_profiles"\)/],
  ["playlist Supabase table", /\.from\("curator_playlists"\)/],
  ["nav route", /data-route="curadoria"/],
  ["worker endpoint", /\/api\/curadoria\/spotify-preview/],
  ["spotify credentials env only", /SPOTIFY_CLIENT_ID[\s\S]*SPOTIFY_CLIENT_SECRET/],
  ["spotify input normalizer", /function normalizeSpotifyPlaylistInput\(value = ""\)/],
  ["spotify csp artwork hosts", /https:\/\/i\.scdn\.co[\s\S]*https:\/\/mosaic\.scdn\.co/],
  ["schema curator profiles", /create table if not exists public\.curator_profiles/],
  ["schema curator playlists", /create table if not exists public\.curator_playlists/],
  ["schema rls", /alter table public\.curator_profiles enable row level security[\s\S]*alter table public\.curator_playlists enable row level security/],
  ["profile ownership policy", /Users can read own or approved curator profiles/],
  ["playlist ownership policy", /Users can insert own curator playlists[\s\S]*Users can update own curator playlists[\s\S]*Users can delete own curator playlists/],
  ["migration status fields", /application_status[\s\S]*verification_status[\s\S]*moderation_status/],
  ["spotify env example", /SPOTIFY_CLIENT_ID=.*\nSPOTIFY_CLIENT_SECRET=/],
  ["curadoria styles", /\.curadoria-shell[\s\S]*\.curadoria-modal-form/],
];

const forbidden = [
  ["fake followers metric", /seguidores|followers|ouvintes|listeners/i],
  ["orange in curadoria js", /orange|laranja|#ff6a00|--orange/i],
  ["orange in curadoria css", /orange|laranja|#ff6a00|--orange|255,\s*106,\s*0/i],
  ["client spotify secret", /script\.js[\s\S]*SPOTIFY_CLIENT_SECRET/],
];

const failures = [];
for (const [label, pattern] of checks) {
  const source =
    label.startsWith("schema") || label.includes("policy") ? schema :
    label.startsWith("migration") ? migration :
    label.startsWith("nav") ? index :
    label.startsWith("curadoria styles") ? styles :
    label.startsWith("spotify env") ? envExample :
    label.startsWith("worker") || (label.startsWith("spotify") && !label.startsWith("frontend")) ? worker :
    script;
  if (!pattern.test(source)) failures.push(`missing: ${label}`);
}

for (const [label, pattern] of forbidden) {
  const source =
    label.includes("css") ? curadoriaCss :
    label.includes("secret") ? script :
    curadoriaJs;
  if (pattern.test(source)) failures.push(`forbidden: ${label}`);
}

if (!curadoriaJs) failures.push("missing: curadoria js block");
if (!curadoriaCss) failures.push("missing: curadoria css block terminator");

if (failures.length) {
  console.error(`Curadoria phase 1 check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Curadoria phase 1 contract check passed");
