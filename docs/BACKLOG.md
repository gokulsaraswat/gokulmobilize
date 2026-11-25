# BACKLOG: gokulmobilize (MOB)

Rules: `RULES.md` section 4. Architecture: `docs/ARCHITECTURE.md`. Public-safe: no secrets, no employer material.
Priority: P0 broken/blocking or security, P1 important, P2 worthwhile, P3 nice to have.
Status: open, doing, blocked, done, dropped. Cross-repo: `needs:` waits on, `blocks:` is waited on by.

## Bugs
| ID | Title | Pri | Status | Needs/Blocks | Notes (where, repro, evidence) |
|---|---|---|---|---|---|
| MOB-B-005 | "Saved for later" re-renders on every `visibilitychange`, dropping focus | P3 | open | | Same pattern as MOB-B-004 in `SavedList.astro` (`render()` replaces all rows). Low impact today: the portfolio does not write `gk-saved` yet. Fix: skip re-render when the list is unchanged. Found 2026-11-25 (phase B). |
| MOB-B-006 | Offline, `/apps/<page>.html` shows the hub instead of the page | P3 | open | | Precache keys pages by clean URL (`/apps/faq`); Workbox does not strip `.html`, so `/apps/faq.html` hits `navigateFallback`. Online it serves the page. Nothing on the web links `.html`. Fix would precache each page twice (or map in a custom route). Repro: Chrome, SW active, offline, open `/apps/faq.html` -> "Apps". Found 2026-11-25 (phase B). |
| MOB-B-007 | Native: a bundled tile whose `href` already names a file or has a query gets a broken link | P3 | open | | `resolveTileLink` always appends `/index.html`: `/gspace/index.html` -> `/gspace/index.html/index.html`, `/studio?x=1` -> `/studio?x=1/index.html`. The contract example uses `/gspace`, so the mock and planned config are fine. Found 2026-11-25 (phase B, code read). |

## Improvements
| ID | Title | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|
| MOB-I-001 | UI/motion upgrade of hub (TileGrid, SavedList, Base) | P2 | open | pilot repo; master: PLT-I-001 | Prompt: docs/KICKOFF-PROMPT.md "UI UPGRADE ADD-ON". Note 2026-11-25 (phase A): motion and @formkit/auto-animate are NOT in package.json/lockfile (the earlier note was wrong). Verify: lint, test, build. |
| MOB-I-003 | Footer links are 24 px tall on touch (44 px preferred) | P2 | open | needs: platform `Footer` (ui) or a local override | Measured at 390 px mobile emulation: footer links 22-121 x 24 px. Tiles 138 px, Remove 44 px. |
| MOB-I-004 | Safe-area insets and theme colour | P2 | open | | No `viewport-fit=cover`, no `env(safe-area-inset-*)`, no `theme-color` meta; matters for standalone PWA and Android edge-to-edge. Phase B check (2026-11-25): cosmetic only, no overlap: without `viewport-fit=cover` Capacitor 8 `SystemBars` (insetsHandling `css`) pads the WebView by the system-bar insets, and browsers letterbox standalone PWAs. Adding `cover` needs `env(safe-area-inset-*)` plus Capacitor's `--safe-area-inset-*` fallback; leave to the redesign (phase D). |
| MOB-I-005 | Dark theme / system theme | P2 | open | | `tokens.css` dark values sit under `.dark`, which nothing applies; the hub is light-only. Redesign (Atelier, theme system) covers it. |
| MOB-I-006 | Empty state when no tile is visible | P3 | open | | A valid config whose tiles are all disabled or hidden (native: remote tiles without `PUBLIC_SITE_ORIGIN`) renders an empty grid with no message. Found 2026-11-25 (phase B). |

## Features
| ID | Title | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|
| MOB-F-003 | Sign-in inside the Android app | P3 | open | | Web hub has it (MOB-F-002). Native needs OAuth in the system browser (`@capacitor/browser`; Google blocks embedded WebViews), a deep link back (e.g. `com.gokulsaraswat.gokulmobilize://auth/callback`, proposed in platform CONTRACTS), and PKCE exchange in the app. Until then the account menu is not built into the native app. |

## Ideas (unscoped, not committed to)
| ID | Idea | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|
| MOB-X-001 | Precache the hub config for a first-ever offline visit | P3 | open | | `.json` is outside the SW glob; today the first offline visit (nothing in IndexedDB) shows the offline status line. Works as designed after one online load. |

## Tech debt
| ID | Title | Pri | Status | Needs/Blocks | Notes |
|---|---|---|---|---|---|
| MOB-D-001 | No Lighthouse / performance budget | P3 | open | | Lighthouse is not installed locally; baseline in docs/FEATURES.md uses CDP paint timings only. |
| MOB-D-002 | `.env.example` is empty | P3 | open | | `docs/CONTRACTS.md` says "see .env.example" for `PUBLIC_HUB_CONFIG_URL`; the file is 0 bytes. Add the three variable names (`PUBLIC_HUB_CONFIG_URL`, `PUBLIC_SITE_ORIGIN`, `PUBLIC_HUB_NATIVE`) with comments, no values. Found 2026-11-25 (phase B). |

## Done (recent)
| ID | Title | Commit | Date |
|---|---|---|---|
| MOB-F-002 | Optional Google/GitHub sign-in on the web hub (shared contract, app `hub`): AccountMenu island, Connected accounts, access request | (this commit) | 2026-11-25 |
| MOB-B-001 | `build:native` / `android:sync` fail on Windows | 63b61bd | 2026-11-25 |
| MOB-B-002 | Skeleton cards look like empty white cards | e0e4020 | 2026-11-25 |
| MOB-B-003 | Failed first load keeps 5 pulsing skeletons and `aria-busy="true"` beside the error line | 55bf636 | 2026-11-25 |
| MOB-B-004 | Returning to the tab re-rendered identical tiles and dropped keyboard focus to `<body>` | 06ced1c | 2026-11-25 |
| MOB-I-002 | Stop precaching the unused React client runtime (precache 23 files / 338.3 KB -> 22 / 122.8 KB) | f79db8a | 2026-11-25 |
