# WORKLOG: gokulmobilize

Master status of all repos: platform/docs/WORKLOG.md (github.com/gokulsaraswat/platform). Update this file after every step. Last updated: 2026-10-31.

## How to resume (new chat or new person)
1. Read in order: CLAUDE.md, this file, `.claude-session.json` (`sprint.todo_next`), docs/CONTRACTS.md, docs/ARCHITECTURE.md, docs/RESEARCH-OPTIONS.md (section 6 = every decision and why).
2. Set up: Node 24, `gh auth refresh -h github.com -s read:packages`, then `NODE_AUTH_TOKEN=$(gh auth token) npm ci`.
3. Check health: `npm run build && npm run lint && npm test` (all must pass). CI must be green on main.
4. Pick the next item from "Next" below. Propose it, wait for Gokul's OK, then build, verify, update the docs, commit and push.

## Current state
| Area | State |
|---|---|
| Web hub | Done. Astro 7.4 static at `/apps/`; card tiles from `public/config.mock.json` (stale-while-revalidate via IndexedDB); 9 footer pages from `@gokulsaraswat/ui`; installable offline PWA (Workbox service worker); "Saved for later" list. Verified in a browser, including offline. |
| Android app | Done. Capacitor 8.5. Signed release **v0.1.0** on [GitHub Releases](https://github.com/gokulsaraswat/gokulmobilize/releases/tag/v0.1.0) (3.4 MB, signature verified). Tested on an emulator: tiles, bundled placeholder, back button, FAQ, in-app browser. |
| CI | Green. Jobs: `verify` (kit check, npm ci, build, lint, test), `android` (debug APK artifact on every push), `android-release` (signed APK on `v*` tags). |
| Not deployed | No Vercel project yet. No domain yet. |
| Placeholders | `config.mock.json` (no real config.json from admin yet); GSpace/Studio pages in the app say "not bundled yet"; app icon = Astro rocket; legal page text = placeholder from `@gokulsaraswat/ui`. |
| Hidden in the app | Portfolio, gym and admin tiles. They appear once the repo variable `PUBLIC_SITE_ORIGIN` is set. |

## Decisions (details + sources: docs/RESEARCH-OPTIONS.md section 6)
- Paths (one domain): portfolio `/`, hub `/apps/`, `/admin`, `/gym`, `/gspace`, `/studio`. The portfolio owns `/` and holds the Vercel rewrites. Free Vercel domain until a `.com` is bought.
- Hub: Astro 7 static + vanilla-TS tiles; React only at build time (shared Footer/LegalPage).
- `config.json` stays v1 (`@gokulsaraswat/config`); icon/description/accent come from a local map in `src/lib/tile-meta.ts`.
- Service worker: `workbox-build` generateSW after the build. `@vite-pwa/astro` doesn't support Astro 7 yet.
- Save for later = option B: the portfolio writes to IndexedDB `gk-saved`/`items`; the hub lists and removes.
- Native: Capacitor 8.5 pinned. Remote and external tiles open in `@capacitor/browser` (Custom Tabs). `allowNavigation` is not used: the Capacitor docs mark it not for production.
- App build links must name files (`/faq.html`, `/gspace/index.html`): Capacitor's Android server serves extension-less paths as the root index.html.
- Bundled apps: gspace + studio, delivered as release zips from their repos (pinned version).
- App id `com.gokulsaraswat.gokulmobilize`. Release cert SHA-256 `59e7d15360520491b365b4ef89ca02212b30d858434c045e75e9f3a8a805ca12`. Every future APK must be signed with this key.
- iOS: PWA "Add to Home Screen" only for now. A native build needs Xcode plus a free Apple ID sideload (7-day expiry).

## Done (2026-10-31, newest last; commits on main)
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
5. **Size:** the service worker precaches the unused React client file (~200 KB raw); the tile script is 24 KB gzip (zod). Optional trims.
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
