import { normalizeSpotifyPlaylistInput } from "../src/worker.mjs";

const validId = "37i9dQZF1DX0XUsuxWHRQd";
const validInputs = [
  validId,
  `https://open.spotify.com/playlist/${validId}`,
  `https://open.spotify.com/playlist/${validId}?si=abc123`,
  `spotify:playlist:${validId}`,
];

const invalidInputs = [
  "",
  "https://example.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
  "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd",
  "https://open.spotify.com/album/37i9dQZF1DX0XUsuxWHRQd",
  "spotify:track:37i9dQZF1DX0XUsuxWHRQd",
  "not-a-playlist",
];

const failures = [];

for (const input of validInputs) {
  const result = normalizeSpotifyPlaylistInput(input);
  if (!result.ok || result.playlistId !== validId || result.spotifyUrl !== `https://open.spotify.com/playlist/${validId}`) {
    failures.push(`valid input rejected: ${input}`);
  }
}

for (const input of invalidInputs) {
  const result = normalizeSpotifyPlaylistInput(input);
  if (result.ok || result.error?.code !== "invalid_spotify_playlist_url") {
    failures.push(`invalid input accepted: ${input || "(empty)"}`);
  }
}

if (failures.length) {
  console.error(`Spotify playlist normalizer check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Spotify playlist normalizer check passed");
