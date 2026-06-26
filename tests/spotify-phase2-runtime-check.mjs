import {
  decryptSpotifyToken,
  encryptSpotifyToken,
  hashSpotifyState,
  normalizeConnectedSpotifyPlaylist,
  normalizeOfficialSpotifyPlaylistLink,
  normalizeSpotifyTrackUri,
} from "../src/worker.mjs";

const env = {
  SPOTIFY_TOKEN_ENCRYPTION_KEY: "0123456789abcdef0123456789abcdef",
};

const failures = [];

const encrypted = await encryptSpotifyToken("spotify-access-token", env);
if (!encrypted.startsWith("v1:") || encrypted.includes("spotify-access-token")) {
  failures.push("encrypted token format/plaintext leak");
}

const decrypted = await decryptSpotifyToken(encrypted, env);
if (decrypted !== "spotify-access-token") {
  failures.push("token decrypt mismatch");
}

let missingKeyFailed = false;
try {
  await encryptSpotifyToken("token", {});
} catch (_error) {
  missingKeyFailed = true;
}
if (!missingKeyFailed) failures.push("missing encryption key did not fail");

const stateHashA = await hashSpotifyState("state-a", env);
const stateHashB = await hashSpotifyState("state-a", env);
const stateHashC = await hashSpotifyState("state-c", env);
if (!stateHashA || stateHashA !== stateHashB || stateHashA === stateHashC || stateHashA.includes("state-a")) {
  failures.push("state hashing is not stable/opaque");
}

const ownerPlaylist = normalizeConnectedSpotifyPlaylist({
  id: "37i9dQZF1DX0XUsuxWHRQd",
  name: "Owner list",
  owner: { id: "spotify-user", display_name: "Owner" },
  tracks: { total: 12 },
  external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd" },
  public: false,
  collaborative: false,
  snapshot_id: "snap-1",
}, { spotify_user_id: "spotify-user" });
if (!ownerPlaylist.eligible || ownerPlaylist.ownership_type !== "owner") failures.push("owner playlist not eligible");

const collabPlaylist = normalizeConnectedSpotifyPlaylist({
  id: "37i9dQZF1DX0XUsuxWHRQe",
  name: "Collab list",
  owner: { id: "other-user", display_name: "Other" },
  tracks: { total: 3 },
  collaborative: true,
}, { spotify_user_id: "spotify-user" });
if (!collabPlaylist.eligible || collabPlaylist.ownership_type !== "collaborator") failures.push("collaborator playlist not eligible");

const followedPlaylist = normalizeConnectedSpotifyPlaylist({
  id: "37i9dQZF1DX0XUsuxWHRQf",
  name: "Followed list",
  owner: { id: "other-user", display_name: "Other" },
  collaborative: false,
}, { spotify_user_id: "spotify-user" });
if (followedPlaylist.eligible || followedPlaylist.ownership_type !== "followed" || !followedPlaylist.ineligible_reason) {
  failures.push("followed playlist incorrectly eligible");
}

const validPlaylistLink = normalizeOfficialSpotifyPlaylistLink("https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd?si=abc");
if (!validPlaylistLink.ok || validPlaylistLink.spotifyUrl !== "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd") {
  failures.push("official playlist link rejected");
}

for (const input of ["spotify:playlist:37i9dQZF1DX0XUsuxWHRQd", "https://example.com/playlist/37i9dQZF1DX0XUsuxWHRQd", "https://open.spotify.com/album/37i9dQZF1DX0XUsuxWHRQd"]) {
  if (normalizeOfficialSpotifyPlaylistLink(input).ok) failures.push(`non-official playlist input accepted: ${input}`);
}

const validTrack = normalizeSpotifyTrackUri("spotify:track:37i9dQZF1DX0XUsuxWHRQd");
if (!validTrack.ok || validTrack.trackId !== "37i9dQZF1DX0XUsuxWHRQd") failures.push("valid track uri rejected");
if (normalizeSpotifyTrackUri("https://open.spotify.com/track/37i9dQZF1DX0XUsuxWHRQd").ok) failures.push("track url accepted as uri");

if (failures.length) {
  console.error(`Spotify phase 2 runtime check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Spotify phase 2 runtime check passed");
