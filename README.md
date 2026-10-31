# gokulmobilize

Hub for all of Gokul's apps: one PWA page of app tiles at `/apps`, plus a Capacitor Android app that bundles the static apps for offline use. iOS users install the PWA (Add to Home Screen).

**Status:** web hub works offline as an installable PWA, with a "Saved for later" list. Android debug APK builds locally and in CI (tested on an emulator). GSpace/Studio are placeholders until their builds are bundled. See [WORKLOG.md](WORKLOG.md).

## Decided stack (2026-10-31)
- Hub: Astro 7 static output, a small vanilla-TS tile script, and `@gokulsaraswat/ui` components rendered at build time.
- Offline (web): `@vite-pwa/astro` service worker, plus an `idb-keyval` stale-while-revalidate store for `config.json`.
- Native: Capacitor 8 (pinned major). Android APK via GitHub Actions. iOS via PWA only; a free Xcode sideload is possible for the owner.
- Details and sources: [docs/RESEARCH-OPTIONS.md](docs/RESEARCH-OPTIONS.md).

## Path layout (one domain)
`/` portfolio · `/apps` hub · `/admin` admin · `/gym` gym · `/gspace` GSpace (bundled in the app) · `/studio` Markdown Studio (bundled). The portfolio owns `/` and holds the rewrites.

## Run / build
Requirements: Node 24 (`.nvmrc`), plus `NODE_AUTH_TOKEN` (a GitHub token with `read:packages`) to install `@gokulsaraswat/*`. With the gh CLI: `gh auth refresh -h github.com -s read:packages`, then prefix installs with `NODE_AUTH_TOKEN=$(gh auth token)`.

| Command | What |
|---|---|
| `NODE_AUTH_TOKEN=... npm ci` | clean install from the lockfile |
| `npm run dev` | dev server at http://localhost:4321/apps |
| `npm run build` | static build to `dist/`, then `scripts/build-sw.mjs` writes `dist/sw.js` (Workbox precache) |
| `npm run generate-pwa-assets` | regenerate PWA icons from `public/favicon.svg` |
| `npm run preview` | serve `dist/` at http://localhost:4321/apps/ (the service worker covers `/apps/`) |
| `npm run build:native` | app build to `dist-native/` (base `/`, no service worker, file links), then `scripts/bundle-apps.mjs` copies `bundled/gspace`, `bundled/studio` or writes placeholders |
| `npm run android:sync` | `build:native` + `cap sync android` |
| `cd android && ./gradlew assembleDebug` | debug APK at `android/app/build/outputs/apk/debug/app-debug.apk` (needs JDK 21 and `ANDROID_HOME`) |
| `npm run lint` | `astro check` (types + Astro diagnostics) |
| `npm test` | unit tests (Node test runner) |

## Environment variables
See [.env.example](.env.example): `NODE_AUTH_TOKEN`, `PUBLIC_HUB_CONFIG_URL`, `PUBLIC_SITE_ORIGIN` (app build; CI reads the repo variable `vars.PUBLIC_SITE_ORIGIN`).

## Android APK
- CI job `android` builds a debug APK on every push and uploads it as the artifact `gokulmobilize-debug-apk` (14 days). Install it by sideloading.
- App id is `com.gokulsaraswat.gokulmobilize`.
- **Release APK:** push a tag `vX.Y.Z` and the CI job `android-release` builds a signed APK and attaches it to that GitHub Release.
  - versionName = the tag; versionCode = the workflow run number, which always increases, so sideloaded updates install over older ones.
  - Requires 4 repo secrets: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`.
  - Locally, the same values come from env vars (`ANDROID_KEYSTORE_PATH` instead of base64). Without them, `assembleRelease` gives an unsigned APK.
- The keystore never enters the repo. Losing it means installed apps can't be updated (Android requires the same signature).

## Deploy (Vercel)
- Framework: Astro. Install: `npm ci`. Build: `npm run build`. Output: `dist`. Node: 24.x.
- Env: `NODE_AUTH_TOKEN` (read:packages), and `PUBLIC_HUB_CONFIG_URL` once admin publishes config.json.
- The project name is not created yet.
- `vercel.json` redirects `/apps` to `/apps/`, serves `sw.js` with `no-cache`, and maps `/apps/*` to the root, so the hub also works on its own `*.vercel.app` URL. The portfolio (owner of `/`) rewrites `/apps/:path*` to `<hub-project>.vercel.app/apps/:path*`.

## Docs
- This repo:
  - [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), [WORKLOG.md](WORKLOG.md)
  - [docs/CONTRACTS.md](docs/CONTRACTS.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/KICKOFF-PROMPT.md](docs/KICKOFF-PROMPT.md)
- Master docs (all repos): [platform/docs](https://github.com/gokulsaraswat/platform/tree/main/docs): WORKLOG, CONTRACTS, REPO-KIT, PROMPTS.

## License
All rights reserved; see [LICENSE](LICENSE).
