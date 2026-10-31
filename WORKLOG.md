# WORKLOG: gokulmobilize

Master status of all repos: platform/docs/WORKLOG.md. Update this file after every step.

## Current state (2026-10-31)
- Web hub scaffolded (2026-10-31): Astro 7.4.2 at /apps; tiles from public/config.mock.json; 9 footer pages. npm ci + build + astro check + 3 tests pass locally. CI green on GitHub (npm ci with the built-in GITHUB_TOKEN works for @gokulsaraswat/*, then build, lint, test).
- Local env: Node v24.14.1, npm 11.11.0, NODE_AUTH_TOKEN not set in this shell, gh logged in as gokulsaraswatvc-eng, no Vercel CLI.

## Done
- 2026-10-31: STARTUP read + report (no changes).
- 2026-10-31: Research step: docs/RESEARCH-OPTIONS.md (Capacitor vs alternatives, PWA/SW, storage, SWR, view transitions, UI frameworks; cited, UNVERIFIED marked). Nothing installed.

- 2026-10-31 DECIDED (Gokul): one domain, portfolio at `/`, hub at `/apps`, then `/admin`, `/gym`, `/gspace`, `/studio`. Rewrites live in the portfolio (it owns `/`). Free Vercel domain until a `.com` is bought. Details: docs/RESEARCH-OPTIONS.md section 6.

- 2026-10-31 DECIDED (Gokul accepted all picks): Astro 7 static hub, bundled gspace + studio, release-zip delivery, card tiles, config v1 + local map, @capacitor/browser, allowNavigation for remote apps, admin tile visible, Capacitor 8 pinned. Table: docs/RESEARCH-OPTIONS.md section 6.

- 2026-10-31: Repo kit step: .gitignore, .nvmrc (24), .npmrc, .env.example, LICENSE (all rights reserved), SECURITY.md, PR template, CI, docs/CONTRACTS.md, docs/ARCHITECTURE.md, README rewritten (replaced the Android stub), stale docs/master/ removed (moved to Trash; master lives in platform/docs).

- 2026-10-31: Scaffold step: Astro 7 + @astrojs/react (build-time only), plain-TS SWR config store on idb-keyval (tests), card tiles with skeletons, footer pages via @gokulsaraswat/ui, vercel.json (/apps -> root). Verified in browser. Tile script is 24 KB gzip, mostly zod from parseHubConfig (more than the ~1 KB estimate; still about half of React's runtime).

- 2026-10-31: Step 5 (offline): installable PWA (manifest + generated icons from the placeholder Astro favicon), Workbox `generateSW` after build (precache shell + 10 pages, scope /apps/), `/apps` -> `/apps/` redirect. Verified offline with the server stopped. `@vite-pwa/astro` does not support Astro 7 yet, so plain workbox-build is used (see RESEARCH-OPTIONS section 6). Vercel redirect/cleanUrls behaviour is UNVERIFIED until the first deploy.

- 2026-10-31: Save for later, hub side (option B): "Saved for later" list reading IndexedDB `gk-saved`/`items` (contract in docs/CONTRACTS.md), remove button, validation (skips malformed/off-site items), 2 tests. Verified in browser by writing items as the portfolio would; the bad item was skipped and Remove worked; test data deleted.

## In progress / next
- Next: step 6, Capacitor Android (propose first, wait for OK).
- Open: Xcode installed?, GitHub repo description/topics/branch protection (owner, web UI).

## Blockers / requests to other repos
- REQUEST bestportofolio (refined): rewrite `/apps/:path*` -> `https://<hub-project>.vercel.app/apps/:path*`.
Requests for the planning chat to sync into platform/docs/WORKLOG.md (this chat never edits other repos):
- REQUEST admin (URGENT, being built now): set Next.js `basePath: '/admin'`. Path layout decided 2026-10-31: portfolio `/`, hub `/apps`, `/admin`, `/gym`, `/gspace`, `/studio`.
- REQUEST admin: config.json bucket path + CORS that allows the APK origins (`https://localhost`, `capacitor://localhost`) and the web domain.
- REQUEST bestportofolio: stays at `/` (no basePath change). Later: add `next.config` rewrites for `/apps`, `/admin`, `/gym`, `/gspace`, `/studio` to their Vercel projects. Later: CORS on blog/course routes for APK "save for later".
- REQUEST checkers-gym-management (its own chat, later): serve under `/gym`; CRA is deprecated, consider moving to Vite; decide the Supabase project (the same one = shared login).
- REQUEST Progress (GSpace): build with base `/gspace` and publish the `dist` as a zip on each GitHub Release; the hub CI downloads a pinned version.
- REQUEST Markdown-studio: same, with base `/studio` (relative or `/studio`-prefixed asset paths).
- REQUEST bestportofolio: "Save for later" button on `/blog/[slug]` and `/courses/[slug]` writing `SavedItem` v1 to IndexedDB `gk-saved`/`items` (key = url), per gokulmobilize docs/CONTRACTS.md. For offline reading, add a portfolio service worker (scope `/`) that caches saved pages and their assets.
- REQUEST platform (optional, later): move the `SavedItem` type and validator into `@gokulsaraswat/config`, so the hub and portfolio share one definition. config.json stays v1.

## Reminders
- Stack DECIDED 2026-10-31: Capacitor 8 (pinned) + Astro 7 static + vanilla-TS tiles + @vite-pwa/astro + plain-TS SWR store on idb-keyval.
- Inside the APK the origin is localhost: remote apps are cross-origin (CORS for config.json, no cross-doc transitions).
- Back up the APK signing keystore outside the repo.
