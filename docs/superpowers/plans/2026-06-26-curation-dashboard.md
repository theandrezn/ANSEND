# Curation Dashboard & Spotify Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a premium Curation Dashboard (Design 1) and Playlist Details page (Design 2) for the curator role in ANSEND, including a simulated Spotify Link & Import system.

**Architecture:** 
- Intercept the `#biblioteca` route when the active user role is `curador` and render `renderCuratorCurationDashboard()`.
- Add a simulated "Link Spotify" flow that allows the curator to search and select Spotify playlists or enter a link, import them, and save them in `localStorage`.
- Create a dedicated detail view `renderCuratorPlaylistDetail(id)` to show the tracks table matching Design 2 (tracks, follower counts, curation fee, tab navigation, popularity, etc.).
- Append visual styles to `styles.css` to match Playlister.club design.

**Tech Stack:** JavaScript, CSS, HTML5, Lucide Icons.

## Global Constraints
- Must maintain responsive layouts (mobile support).
- Do not use TailwindCSS; style via vanilla CSS appended to the end of `styles.css`.
- Must preserve existing functionalities for other roles.

---

## User Review Required
> [!IMPORTANT]
> The Spotify OAuth integration will run in a simulated/interactive frontend mode for this session. It will allow you to link a account, see your playlists, and import them, saving the resulting playlists locally in `localStorage` under `ansend-curated-playlists` so they survive page refreshes.

---

## Proposed Changes

### Scripts

#### [MODIFY] [script.js](file:///C:/Users/games/.gemini/antigravity/worktrees/Ansend%203.0%20-%20AntiGravity/sync-github-files-automatically/script.js)
- Modify `renderLibrary()` to redirect to `renderCuratorCurationDashboard()` if the current role is `curador`.
- Implement `renderCuratorCurationDashboard()` with the playlist cards grid, stats (Proposals, Signals, Placements), and right-sidebar Curation Tray.
- Implement `renderCuratorPlaylistDetail(playlistId)` with the tracks/proposals tabs and the detailed track table.
- Implement the Spotify Link & Import interactive flow modal.
- Hook up event listeners for clicks on playlist cards and import actions.

### Styles

#### [MODIFY] [styles.css](file:///C:/Users/games/.gemini/antigravity/worktrees/Ansend%203.0%20-%20AntiGravity/sync-github-files-automatically/styles.css)
- Append CSS rules for the curation dashboard layout, cards, detail table, Spotify modal, and Curation Tray.

---

## Task 1: Implement Curation Dashboard and Playlist Details Views

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Modify `renderLibrary()` to route to the curation dashboard**
  Update `renderLibrary()` to check for `activeRoleKey() === 'curador'` and render the dashboard.

- [ ] **Step 2: Add Curation mock data and localStorage utilities**
  Add mock playlists (Vibes & Bars, R&B & Trap Soul, etc.) and a helper to load/save playlists.

- [ ] **Step 3: Implement Curation Dashboard Renderer**
  Write `renderCuratorCurationDashboard()` to output the layout (Design 1).

- [ ] **Step 4: Implement Spotify Link/Import Modal**
  Create `renderSpotifyImportModal()` allowing users to paste a URL or "connect" to see dummy playlists to import.

- [ ] **Step 5: Implement Curation Playlist Detail Renderer**
  Write `renderCuratorPlaylistDetail(id)` to show the detailed table layout (Design 2).

- [ ] **Step 6: Integrate event handlers in `hydrateView`**
  Ensure all data-actions (`curador-import-spotify`, `open-curator-playlist`, etc.) are hooked up.

---

## Task 2: Implement Curation Styles

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Append curation styling to `styles.css`**
  Add layout grid, cards, detail table, tabs, and dark modal styling to match the Playlister.club dark aesthetic.

---

## Verification Plan

### Manual Verification
1. Login/Set role to "Curador" (Playlists menu item appears).
2. Click "Playlists" and verify the dashboard shows the 4 playlists with stats.
3. Click "Importar via Spotify", enter a link/connect, and verify the playlist is added to the dashboard.
4. Click on any playlist card and verify the details view displays the tracks table and correct headers.
