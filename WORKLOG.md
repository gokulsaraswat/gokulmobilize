# WORKLOG: gokulmobilize

Master status of all repos: platform/docs/WORKLOG.md (github.com/gokulsaraswat/platform). Update this file after every step. Last updated: 2026-11-25.

## How to resume (new chat or new person)
1. Read in order: CLAUDE.md, this file, `.claude-session.json` (`sprint.todo_next`), docs/CONTRACTS.md, docs/ARCHITECTURE.md, docs/RESEARCH-OPTIONS.md (section 6 = every decision and why).
2. Set up: Node 24, `gh auth refresh -h github.com -s read:packages`, then `NODE_AUTH_TOKEN=$(gh auth token) npm ci`.
3. Check health: `npm run build && npm run lint && npm test` (all must pass). CI must be green on main.
4. Pick the next item from "Next" below. Propose it, wait for Gokul's OK, then build, verify, update the docs, commit and push.

## Current state
| Area | State |
|---|---|
| Web hub | Done. Astro 7.4 static at `/apps/`; card tiles from `public/config.mock.json` (stale-while-revalidate via IndexedDB); 9 footer pages from `@gokulsaraswat/ui`; installable offline PWA (Workbox service worker); "Saved for later" list. Verified in a browser, including offline. |
| Android app | Done. Capacitor 8.6. Signed release **v0.1.0** on [GitHub Releases](https://github.com/gokulsaraswat/gokulmobilize/releases/tag/v0.1.0) (3.4 MB, signature verified). Tested on an emulator: tiles, bundled placeholder, back button, FAQ, in-app browser. |
| CI | Green. Jobs: `verify` (kit check, npm ci, build, lint, test), `android` (debug APK artifact on every push), `android-release` (signed APK on `v*` tags). |
| Vercel | First deploy failed: 401 on `npm install` of `@gokulsaraswat/*`, because the Vercel project has no valid `NODE_AUTH_TOKEN`. Fix = Gokul adds the env var (README > Deploy). The hub's own URL `/` redirects to `/apps/`. |
| Placeholders | `config.mock.json` (no real config.json from admin yet); GSpace/Studio pages in the app say "not bundled yet"; app icon = Astro rocket; legal page text = placeholder from `@gokulsaraswat/ui`. |
| Hidden in the app | Portfolio, gym and admin tiles. They appear once the repo variable `PUBLIC_SITE_ORIGIN` is set. |

## Decisions (details + sources: docs/RESEARCH-OPTIONS.md section 6)
- **FOR NOW (Gokul, 2026-10-31): each app stays on its own URL** (GitHub/Vercel), like the portfolio today. The hub's mock config links them as `external` tiles: portfolio https://bestportofolio.vercel.app/, GSpace https://g-space-mauve.vercel.app/ (from the GSpace repo homepage; did not answer from here), Studio https://gokulsaraswat.github.io/Markdown-studio/. Gym and admin are left out until their URLs exist. In the app, external tiles open in the in-app browser. The one-domain layout below is the LATER target.
- Paths (one domain): portfolio `/`, hub `/apps/`, `/admin`, `/gym`, `/gspace`, `/studio`. The portfolio owns `/` and holds the Vercel rewrites. Free Vercel domain until a `.com` is bought.
- Hub: Astro 7 static + vanilla-TS tiles; React only at build time (shared Footer/LegalPage).
- `config.json` stays v1 (`@gokulsaraswat/config`); icon/description/accent come from a local map in `src/lib/tile-meta.ts`.
- Service worker: `workbox-build` generateSW after the build. `@vite-pwa/astro` doesn't support Astro 7 yet.
- Save for later = option B: the portfolio writes to IndexedDB `gk-saved`/`items`; the hub lists and removes.
- Native: Capacitor pinned with `~` (8.6.x since f687489). Remote and external tiles open in `@capacitor/browser` (Custom Tabs). `allowNavigation` is not used: the Capacitor docs mark it not for production.
- App build links must name files (`/faq.html`, `/gspace/index.html`): Capacitor's Android server serves extension-less paths as the root index.html.
- Bundled apps: gspace + studio, delivered as release zips from their repos (pinned version).
- App id `com.gokulsaraswat.gokulmobilize`. Release cert SHA-256 `59e7d15360520491b365b4ef89ca02212b30d858434c045e75e9f3a8a805ca12`. Every future APK must be signed with this key.
- iOS: PWA "Add to Home Screen" only for now. A native build needs Xcode plus a free Apple ID sideload (7-day expiry).

## Upgrade run 2026-11-25 (unattended, phases A-E; plan at workspace root)
- Phase A (inventory) done: docs/FEATURES.md (do-not-break list + baseline numbers). Baseline: build 9.6 s, dist 564 KB, precache 23 files / 338.2 KB, lint 0/0/0 (19 files), tests 8/8, `android:sync` exit 0 via Git Bash shell (fails under cmd: MOB-B-001), CI green. Offline verified (SW precache + IndexedDB tiles + navigate fallback).
- Kit fixes: CLAUDE.md tracking-files rule (28d510e); docs/master, docs/project and WORKLOG-PROJECT.md replaced by docs/PLATFORM-DOCS.md (copies identical to platform's or stale snapshots of it).
- Island audit: no `client:*` anywhere; React is build-time only. Findings filed: MOB-B-001, MOB-B-002, MOB-I-002..005, MOB-D-001, MOB-X-001.

- Phase B (bugs), 2026-11-25:
  - MOB-B-001 fixed: `build:native` runs `scripts/build-native.mjs` (sets `PUBLIC_HUB_NATIVE` in-process, Astro `build()` API); `npm run android:sync` exit 0 under cmd; `dist-native/` byte-identical to the old Git Bash build.
  - MOB-B-002 fixed: skeleton rule raised to `.grid .skeleton`; Chrome computed background now `--muted` (oklch 0.97) instead of `--card` white; loaded tiles unchanged.
  - MOB-B-003 found + fixed: with no cached config and the fetch failing, skeletons kept pulsing and the grid stayed `aria-busy="true"` next to "could not be loaded"; now the grid is emptied and marked not busy (Chrome, config blocked: 5 skeletons/busy true -> 0/false).
  - MOB-B-004 found + fixed: every tab return re-rendered identical tiles, so keyboard focus fell to `<body>` after opening an external tile; the store now skips emitting an unchanged config (new test; Chrome: focus stays on the tile). Logged MOB-B-005 (same in SavedList, P3).
  - MOB-I-002 done: SW precache 23 files / 338.3 KB -> 22 / 122.8 KB (React runtime skipped unless a page has `<astro-island>`; guard proven with a fake island page). Offline re-verified: hub 3 tiles, `/apps/faq`, unknown path -> hub.
  - Checked, no defect: `parseHubConfig` fallbacks (invalid/unreachable never replaces cache; tests), manifest (Chrome `getAppManifest`: 0 errors, 0 installability errors), SW cache versioning (Workbox per-file revisions, `skipWaiting`/`clientsClaim`, no lazy chunks on web), native links (all `dist-native` hrefs name files), Capacitor 8 insets (WebView padded natively, see MOB-I-004), touch targets (tiles 104 px+, Remove 44 px, footer 24 px = WCAG 2.5.8 AA minimum, MOB-I-003).
  - Logged, not fixed: MOB-B-005, MOB-B-006, MOB-B-007, MOB-I-006, MOB-D-002 (docs/BACKLOG.md).
  - Final: build 22 files / 122.8 KB precache, tests 9/9, astro check 0/0/0 (20 files), `npm run android:sync` exit 0 under cmd. Commits 63b61bd, e0e4020, 55bf636, 06ced1c, f79db8a.
- Next: phase C (cleanup), then phase D on branch redesign/gokulmobilize (Atelier; covers MOB-I-003/004/005).

### Assumptions (upgrade run)
- docs/CONTEXT.md is a synced copy from platform: its "docs/master/WORKLOG.md if present" line is left as is (conditional; change it in platform).
- docs/RESEARCH-OPTIONS.md and .claude-session.json keep their historical mentions of docs/master (records, not instructions).
- Android `cap sync` rewrites android/*.gradle with LF/CRLF only; those line-ending changes are reverted, never committed.
- Phase B: MOB-I-002 (precache trim) was done in phase B because this log's phase-A plan listed it there. MOB-I-004 (safe-area/theme-color) was left for the redesign: no overlap exists today, and theme colour belongs to the theme system.
- Phase B: `.project-architecture.md` changes written by the pre-commit hook that were line-ending-only or stale were reset, not committed.

## Done (2026-10-31, newest last; commits on main)
- 2026-11-25: optional sign-in on the web hub (shared platform contract, app id `hub`; `@gokulsaraswat/auth`/`config` 0.2.0 + supabase-js). Guests unchanged; header "Sign in" → Google/GitHub; signed in → status (request_access filed), Connected accounts (link/unlink, last kept), sign out. Shown only when `PUBLIC_SUPABASE_URL` + `PUBLIC_SUPABASE_ANON_KEY` are set (public anon key, RLS) and never in the native build. Tests 13/13 (4 new in `src/lib/account.test.ts`), astro check 0/0/0, build + `android:sync` green, browser-checked at 390/1280 light+dark. Needs: the two env vars on Vercel, redirect URLs `http://localhost:4321/apps/**` and the deployed `/apps/**` in Supabase. Android sign-in (system browser + deep link) not done: MOB-F-003.
- 2026-11-25: UI/motion upgrade queued as TODO only (no source changes). Prompt added to docs/KICKOFF-PROMPT.md; backlog item added; animation libs installed but unused (see backlog). MOB-I-001.
- `06496bb`: repo kit, research, decisions.
- `ce6e11a`, `27246c1`: Astro hub scaffold, config store + tests, CI with tests.
- `0e72a75`: offline PWA (manifest, icons, service worker, `/apps` -> `/apps/`).
- `b41e9bf`: "Saved for later" list.
- `46e025a`: Capacitor Android app, app build variant, native back handler, debug APK in CI.
- `9d810e9`: release signing from env/secrets; `android-release` job on tags.
- `9fa8df2`: first signed release v0.1.0. Setup hiccups (empty password secrets, emptied keystore secret, wrong alias) were fixed by Gokul in the GitHub UI.

## Next (propose each, wait for OK)
1. **Domain + Vercel deploy** (needs Gokul: create the Vercel project; env `NODE_AUTH_TOKEN`; later the domain). Then set the repo variable `PUBLIC_SITE_ORIGIN`, so the app shows the remote tiles. Verify the `vercel.json` redirect, `cleanUrls` and `sw.js` headers on the real host (UNVERIFIED so far).
2. **Real config.json** from admin: set `PUBLIC_HUB_CONFIG_URL` (web + app build) once admin publishes it; check CORS from `https://localhost`.
3. **Bundle real GSpace/Studio** once their repos publish release zips: download pinned versions into `bundled/<id>/` in CI before `android:sync`.
4. **Own app icon:** replace `public/favicon.svg`, run `npm run generate-pwa-assets`, and also set the Android launcher icons.
5. **Size:** the tile script is 24 KB gzip (zod). Optional trim (the unused React runtime is no longer precached since f79db8a).
6. **Later:** iOS (Capacitor iOS + Xcode sideload), OTA live update (`@capawesome/capacitor-live-update`), TWA "lite" APK, Android 13+ themed icon, splash screen.

## Owner to-dos (Gokul)
- Keep `~/keys/gokulmobilize-release.keystore` and its password safe (password manager + a backup). `~/keys/old-unused.keystore` can be deleted.
- GitHub repo settings: description, topics, branch protection on main.
- Release a new APK: `git tag vX.Y.Z && git push origin vX.Y.Z`.
- Real legal page text (shared across all apps; platform repo).

## Blockers / requests to other repos (planning chat syncs these into platform/docs/WORKLOG.md; this repo never edits others)
- **admin (URGENT):** `basePath: '/admin'`. Publish config.json (bucket path + CORS allowing the web domain, `https://localhost`, `capacitor://localhost`).
- **bestportofolio:**
  - Stays at `/`.
  - Add `next.config` rewrites: `/apps/:path*` -> `https://<hub-project>.vercel.app/apps/:path*`, plus `/admin`, `/gym`, `/gspace`, `/studio` to their projects.
  - Add a "Save for later" button on `/blog/[slug]` and `/courses/[slug]` writing `SavedItem` v1 (docs/CONTRACTS.md).
  - Add a portfolio service worker (scope `/`) for offline reading.
  - Later: CORS for the app.
- **Progress (GSpace):**
  - Build with base `/gspace`; publish `dist` as a zip on each GitHub Release.
  - App-build rule: every internal link must name a file (`/gspace/x.html` or `/gspace/x/index.html`).
  - Upgrading to Astro 7 (Gokul, in progress).
- **Markdown-studio:** same as GSpace, with base `/studio`.
- **checkers-gym-management (later):** serve under `/gym`; move off Create React App (deprecated) to Vite; use the same Supabase project for shared login.
- **platform (optional):** move the `SavedItem` type + validator into `@gokulsaraswat/config`; optionally a lighter config validator than zod.

## Gotchas (learned the hard way)
- **Service worker scope:** the scope is `/apps/`, so the bare `/apps` URL isn't controlled; always link `/apps/`.
- **Local permissions:** `dist/`, `node_modules/` and `android/app/build/` can't be read in this setup. Verify through the browser preview, `gh`, or the build tools instead.
- **Native APK build:**
  - Needs JDK 21: `JAVA_HOME=~/Library/Java/JavaVirtualMachines/corretto-21.0.13/Contents/Home`.
  - Needs `ANDROID_HOME=~/Library/Android/sdk`.
  - The default `java` is 26, which Gradle 8.14 does not support.
- **Emulator:** AVD `medium_phone`. The first paint takes about 3 s on the emulator.
- **Repo secrets:** Claude may not write them; Gokul sets them (website or `gh secret set`). During setup, some secrets ended up empty or wrong (cause unknown). Check update times with `gh secret list`, and read the `android-release` log when it fails.
- **Known audit warnings:** 9 low/moderate `npm audit` findings, all in `workbox-build`'s build-time dependencies (dev only).

- 2026-11-26 Upgrade program: status of all 7 repos and how to resume is in platform/docs/UPGRADE-PROGRAM.md (read it first).
- 2026-11-26 Phase C step 1 (MOB-C-001): after the sign-in merge the service worker precached the AccountMenu chunk (24 files / 357.2 KB). `scripts/build-sw.mjs` now ignores `_astro/client.*.js` and `_astro/AccountMenu.*.js` in the precache and caches them at runtime (StaleWhileRevalidate, cache `sign-in-island`): precache 23 files / 134.9 KB (-222 KB). Sign-in code untouched; the menu loads online as before and is available offline after its first load. Verified: `npm run build` ok, `npm run lint` 0/0/0, `npm test` 13/13, `npm run build:native` ok. Not browser-tested (no Supabase sign-in available here); the runtime cache is a standard Workbox route. Env note: this Mac's `npm` is `pmg npm` and fails on GitHub Packages blobs; installs need the real npm (`command npm ci` with NODE_AUTH_TOKEN; Gokul approved 2026-11-26).
