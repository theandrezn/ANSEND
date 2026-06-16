# Contratacoes UI Review

Date: 2026-06-16
Scope: ANSEND route `#contratacoes`

## Score

Overall: 22/24

| Pillar | Score | Notes |
| --- | ---: | --- |
| Copywriting | 3/4 | Labels are direct and task-focused. Some strings remain ASCII-only for repo consistency. |
| Visuals | 4/4 | Three-column social feed shell, compact composer, right widgets, and bottom mobile nav now match the requested X-like structure without copying brand assets. |
| Color | 4/4 | Route is pure black with neutral borders and blue accent; no orange route contamination found in the route-specific UI. |
| Typography | 4/4 | Dense feed typography, strong active states, and restrained headings align with a social timeline. |
| Spacing | 4/4 | Desktop columns are 260 / 680 / 360 px in the 1440px verification viewport; mobile collapses cleanly to the feed. |
| Experience Design | 3/4 | Existing Supabase-backed publish, reactions, comments, proposals, and chat are preserved. Follow-based feed remains a prepared fallback until a real follow graph exists. |

## Top Fixes Completed

1. Replaced the narrow dashboard-like layout with a dedicated three-column hiring shell.
2. Converted the large open form into a compact composer with progressive details.
3. Replaced bulky filters with horizontal chips plus a hidden advanced filter panel.
4. Hid the old ANSEND sidebar/topbar on this route and added a route-specific desktop/sidebar and mobile bottom nav.
5. Added useful right-rail widgets using real public profile data where available.

## Remaining Risk

- `Seguindo` still intentionally shows an empty fallback because the project does not expose a real follow graph for hiring posts.
- The database currently has zero hiring rows, so visual verification covered empty state and live route stability rather than a populated production feed.
