# FEATURES: gokulmobilize (do-not-break contract)

One line per route, feature, command or shortcut. Verify = how to prove it still works. Run from the repo root.
Web build base `/apps` (`dist/`); native build base `/` (`dist-native/`, `PUBLIC_HUB_NATIVE=true`).

## Baseline 2026-11-25 (Windows 11, Node 24.14.1, npm 11.11.0, commit c1c8d6a)
| Measure | Value |
|---|---|
| `npm ci` (clean, warm npm cache) | 16 s, 0 vulnerabilities, `node_modules` 318 MB |
| `npm run build` (astro build + build-sw) | 9.6 s wall (Astro: 10 pages in 1.0 s); `dist/` 564 KB, 28 files |
| Service worker precache | 23 files, 338.2 KB (globs html/js/css/svg/png/ico/webmanifest; `.map` and `.json` excluded) |
| JS (raw / gzip) | TileGrid script 83.3 / 24.1 KB (mostly zod via `parseHubConfig`); React client runtime 220.7 / 68.2 KB (emitted + precached, never loaded: no island hydrates); SavedList 1.1 / 0.7 KB |
| CSS (raw / gzip) | `Base.*.css` 7.2 / 2.0 KB |
| `npm run lint` (`astro check`) | 10.9 s, 19 files, 0 errors, 0 warnings, 0 hints |
| `npm test` (node:test) | 8 / 8 pass, 6.1 s wall (tests 245 ms) |
| `npm run android:sync` | Fails on Windows with npm's default cmd shell (MOB-B-001). With `npm_config_script_shell` = Git Bash: exit 0, 11.7 s, `dist-native/` 403 KB, 28 files, 1 plugin (`@capacitor/browser` 8.0.5) |
| CI (GitHub Actions, ubuntu) | Green on c1c8d6a: verify + android (`assembleDebug`) in 2 min 11 s |
| Local load (`astro preview`, Chrome headless, warm SW) | FCP 64 ms, DOMContentLoaded 63 ms. Lighthouse not installed locally: not measured |

Island audit: no `client:*` directive anywhere in `src/`. React renders only at build time (`Footer`, `LegalPage`); page scripts are plain Astro `<script>` modules. Nothing to switch from `client:load`.

## Routes (web, base `/apps`)
| Route | Feature | Verify |
|---|---|---|
| `/apps/` (`src/pages/index.astro`) | Hub: "Apps" heading, tile grid, "Saved for later" | `npm run preview`, open `/apps/`: 3 tiles (Portfolio, GSpace, Markdown Studio) from `config.mock.json` |
| `/apps/privacy`, `/terms`, `/cookies`, `/data-deletion`, `/accessibility`, `/sitemap`, `/faq`, `/about`, `/contact` (`[slug].astro`) | 9 footer pages from `footerPages` + `LegalPage` (`@gokulsaraswat/ui`) | each returns 200 under `npm run preview`; build log lists 10 routes |
| `/apps/<page>.html` | Same pages by file name (`build.format: 'file'`) | `curl -I localhost:4321/apps/faq.html` returns 200 |
| `/` -> `/apps/` (302), `/apps` -> `/apps/` (308) | Vercel redirects (`vercel.json`) | Unverified on a real host (no Vercel deploy yet) |
| `/apps/:path*` -> `/:path*` | Vercel rewrite + `cleanUrls` | Unverified on a real host |
| `/apps/sw.js` | Served with `Cache-Control: no-cache` (`vercel.json` headers) | Unverified on a real host |
| `/apps/manifest.webmanifest` | PWA manifest: name, `start_url`/`scope` `/apps/`, standalone, 4 icons incl. maskable | returns 200; Chrome DevTools > Application > Manifest has no errors |
| `/apps/config.mock.json` | Hub config v1 used when `PUBLIC_HUB_CONFIG_URL` is unset | returns 200, `{"version":1,"apps":[...3]}` |

## Hub features
| Feature | Verify |
|---|---|
| Config store: IndexedDB `hub-config` cache first, then `fetch` (no-cache, ETag), `parseHubConfig` (zod), save | `npm test` (`hub-config.test.ts`) |
| Invalid or unreachable config never replaces a valid cached copy | `hub-config.test.ts`; offline reload still shows tiles |
| Refresh on `visibilitychange` (visible) and `online`; an unchanged config is not re-rendered (keeps focus) | `hub-config.test.ts`; switch tabs and watch the network panel |
| Skeleton cards (5) with `aria-busy`, pulse disabled under `prefers-reduced-motion` | load with a throttled network |
| Status line (`role="status"`): "could not be loaded" online, "You are offline..." offline, when no config was ever cached | first visit with the network off |
| Tile rendering: enabled + reachable tiles only, `textContent` only, monogram + name + description + accent from `tile-meta.ts` | `npm test` (`tile-target.test.ts`); preview shows 3 tiles |
| External tiles open in a new tab (web) | click Portfolio: new tab to `https://bestportofolio.vercel.app/` |
| Tile hover lift, active press, `:focus-visible` ring | Tab through tiles in preview |
| "Saved for later": lists IndexedDB `gk-saved`/`items` (written by the portfolio, `SavedItem` v1), hidden when empty, Remove button (44 px) per row, re-reads on `visibilitychange` | `npm test` (`saved-items.test.ts`); add a row in DevTools > IndexedDB and reload |
| Footer (shared `Footer`, `basePath` `/apps`) with 9 links + copyright | preview shows the footer on every page |
| Cross-document view transitions (`@view-transition { navigation: auto }`) | navigate hub -> FAQ in Chrome |
| SW registration in production web builds only (not dev, not native) | DevTools > Application > Service Workers: `/apps/sw.js` active, scope `/apps/` |
| Offline: Workbox precache (`skipWaiting`, `clientsClaim`), `navigateFallback` `/apps/` for `/apps/*` | 2026-11-25: preview stopped -> `/apps/` showed 3 tiles from IndexedDB, `/apps/faq` served "FAQ", unknown `/apps/x` fell back to the hub |
| Installable PWA (manifest + icons + SW) | Chrome shows the install icon on `/apps/` |

## Native app (Android, Capacitor 8.6, appId `com.gokulsaraswat.gokulmobilize`)
| Feature | Verify |
|---|---|
| `build:native`: base `/`, `dist-native/`, no SW, footer links via `FileLink` (`/faq.html`) | `dist-native/index.html` footer hrefs end in `.html` |
| `scripts/bundle-apps.mjs`: copies `bundled/gspace`, `bundled/studio` or writes a "not bundled yet" placeholder | android:sync log: `bundled gspace: placeholder (no bundled/gspace/)` |
| Bundled tiles -> `/<id>/index.html`; remote tiles -> `PUBLIC_SITE_ORIGIN` in the in-app browser, hidden when unset; external -> in-app browser (`@capacitor/browser`, Custom Tabs) | `npm test` (`tile-target.test.ts`); emulator |
| Back button: WebView history back, then exit (`MainActivity.java`) | emulator: hub -> bundled app -> Back returns to hub |
| No `server.allowNavigation` (docs mark it not for production) | `capacitor.config.json` has 3 keys |
| Debug APK on every push to main | CI job `android`, artifact `gokulmobilize-debug-apk` |
| Signed release APK on `v*` tags (never run by agents) | CI job `android-release`; release cert SHA-256 in `WORKLOG.md` |

## Commands
| Command | Does | Verify |
|---|---|---|
| `npm run dev` | Astro dev server (`/apps/`) | opens on `localhost:4321/apps/` |
| `npm run build` | `astro build` + `scripts/build-sw.mjs` | prints `sw.js: precached 23 files, 338.2 KB` |
| `npm run preview` | Serves `dist/` | routes table above |
| `npm run lint` | `astro check` | 0 errors |
| `npm test` | `node --test src/lib/*.test.ts` | 9 pass (8 at baseline) |
| `npm run generate-pwa-assets` | Icons from `public/favicon.svg` (`pwa-assets.config.js`) | writes `public/pwa-*.png` |
| `npm run build:native` | Native web build (`scripts/build-native.mjs` sets `PUBLIC_HUB_NATIVE=true` in-process, works under cmd) + bundle-apps | `dist-native/` exists |
| `npm run android:sync` | `build:native` + `cap sync android` | exit 0 (any npm script shell, incl. cmd on Windows, since MOB-B-001) |
| `./gradlew assembleDebug` (in `android/`) | Debug APK | CI `android` job (no local JDK/SDK on this machine) |
| `./sync-architecture.sh` | Regenerates `.project-architecture.md` (pre-commit hook) | file updates on commit |

## Contracts this repo consumes (do not change here)
| Contract | Verify |
|---|---|
| Hub `config.json` v1 (`@gokulsaraswat/config` `parseHubConfig`), written by admin to Supabase Storage `public-config/hub/config.json` (platform `docs/CONTRACTS.md`) | `hub-config.test.ts` |
| `SavedItem` v1 in IndexedDB `gk-saved`/`items` (written by the portfolio) | `saved-items.test.ts` |
| `@gokulsaraswat/ui` 0.1.x `tokens.css`, `styles.css`, `Footer`, `LegalPage`, `footerPages`, `LinkProps` | `npm run lint` type-checks |
| Env: `PUBLIC_HUB_CONFIG_URL`, `PUBLIC_SITE_ORIGIN`, `PUBLIC_HUB_NATIVE` (build-time) | `docs/CONTRACTS.md` |

## Keyboard shortcuts
None defined. Standard Tab / Shift+Tab / Enter on tiles, footer links and Remove buttons.
