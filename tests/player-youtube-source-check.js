const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

function functionBody(name) {
  const marker = `function ${name}`;
  const start = script.indexOf(marker);
  assert(start >= 0, `${name} exists`);
  const braceStart = script.indexOf("{", start);
  let depth = 0;
  for (let index = braceStart; index < script.length; index += 1) {
    const char = script[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return script.slice(braceStart + 1, index);
  }
  throw new Error(`Could not parse ${name}`);
}

const findBeat = functionBody("findBeat");
assert(/return null/.test(findBeat), "findBeat returns null for missing ids");
assert(/String\(beatId\) === String\(topBeatOfDay\.id\)/.test(findBeat), "findBeat can resolve the real Top 1 id");
assert(!/searchableBeatPool\(\)[\s\S]*\|\|\s*topBeatOfDay/.test(findBeat), "findBeat must not fallback to Top 1 for unknown ids");

const currentPlayingBeat = functionBody("currentPlayingBeat");
assert(!/findBeat\(appState\.playing\)\s*\|\|\s*topBeatOfDay/.test(currentPlayingBeat), "currentPlayingBeat must not fallback to Top 1");

const playBeat = script.slice(script.indexOf("async function playBeat"), script.indexOf("async function playTopBeat"));
assert(/return playYouTubeBeat\(item/.test(playBeat), "YouTube beats route through playYouTubeBeat");
assert(/appState\.player\.sourceType\s*=\s*"upload"/.test(playBeat), "Upload beats mark upload source type");
assert(/appState\.player\.youtubeVideoId\s*=\s*""/.test(playBeat), "Upload beats clear YouTube video id");
assert(/if \(!audioUrl\)/.test(playBeat), "Upload beats validate audioUrl before playback");

["playYouTubeBeat", "toggleBeatPlayback", "youtubeVideoIdForBeat", "ensureYouTubeBeatPlayer"].forEach((name) => {
  assert(script.includes(name), `${name} exists`);
});

const clickRegion = script.slice(script.indexOf('if (action === "play-catalog")'), script.indexOf('if (action === "hero-beat-play")'));
assert(/toggleBeatPlayback\(beatItem\)/.test(clickRegion), "Catalog play uses central toggle");
assert(/toggleBeatPlayback\(item\)/.test(clickRegion), "Beat card play uses central toggle");
assert(!/const audio = topBeatAudio\(\)/.test(clickRegion), "Play click handlers do not directly use Top 1 audio");

const miniRegion = script.slice(script.indexOf('if (action === "mini-play")'), script.indexOf('if (action === "prev-track")'));
assert(/toggleBeatPlayback\(currentPlayingBeat\(\)\)/.test(miniRegion), "Mini player uses current beat toggle");
assert(!/topBeatAudio\(\)/.test(miniRegion), "Mini player does not rebuild Top 1 audio source");

console.log("player-youtube-source-check passed");
