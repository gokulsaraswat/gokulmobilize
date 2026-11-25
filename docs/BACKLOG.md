# BACKLOG: gokulmobilize (MOB)

Rules: `RULES.md` section 4. Architecture: `docs/ARCHITECTURE.md`. Public-safe: no secrets, no employer material.
Priority: P0 broken/blocking or security, P1 important, P2 worthwhile, P3 nice to have.
Status: open, doing, blocked, done, dropped. Cross-repo: `needs:` waits on, `blocks:` is waited on by.

## Bugs
| ID | Title | Pri | Status | Needs/Blocks | Notes (where, repro, evidence) |
|---|---|---|---|---|---|

## Improvements
| ID | Title | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|
| MOB-I-001 | UI/motion upgrade of hub (TileGrid, SavedList, Base) | P2 | open | pilot repo; master: PLT-I-001 | Prompt: docs/KICKOFF-PROMPT.md "UI UPGRADE ADD-ON". Note 2026-11-25 (phase A): motion and @formkit/auto-animate are NOT in package.json/lockfile (the earlier note was wrong). Verify: lint, test, build. |
| MOB-I-002 | Stop precaching the unused React client runtime | P2 | open | | `dist/_astro/client.*.js` 220.7 KB raw / 68.2 KB gz is emitted and precached (338.2 KB total) though no island hydrates. |
| MOB-I-003 | Footer links are 24 px tall on touch (44 px preferred) | P2 | open | needs: platform `Footer` (ui) or a local override | Measured at 390 px mobile emulation: footer links 22-121 x 24 px. Tiles 138 px, Remove 44 px. |
| MOB-I-004 | Safe-area insets and theme colour | P2 | open | | No `viewport-fit=cover`, no `env(safe-area-inset-*)`, no `theme-color` meta; matters for standalone PWA and Android edge-to-edge. |
| MOB-I-005 | Dark theme / system theme | P2 | open | | `tokens.css` dark values sit under `.dark`, which nothing applies; the hub is light-only. Redesign (Atelier, theme system) covers it. |

## Features
| ID | Title | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|

## Ideas (unscoped, not committed to)
| ID | Idea | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|
| MOB-X-001 | Precache the hub config for a first-ever offline visit | P3 | open | | `.json` is outside the SW glob; today the first offline visit (nothing in IndexedDB) shows the offline status line. Works as designed after one online load. |

## Tech debt
| ID | Title | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|
| MOB-D-001 | No Lighthouse / performance budget | P3 | open | | Lighthouse is not installed locally; baseline in docs/FEATURES.md uses CDP paint timings only. |

## Done (recent)
| ID | Title | Commit | Date |
|---|---|---|---|
| MOB-B-001 | `build:native` / `android:sync` fail on Windows | this commit (fix(scripts)) | 2026-11-25 |
| MOB-B-002 | Skeleton cards look like empty white cards | this commit (fix(hub)) | 2026-11-25 |
