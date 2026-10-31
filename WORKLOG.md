# WORKLOG: gokulmobilize

Master status of all repos: platform/docs/WORKLOG.md. Update this file after every step.

## Current state (2026-10-31)
- Repo kit in place (2026-10-31); no app code yet. CI checks that the kit files exist; build/lint steps switch on once package-lock.json exists.
- Local env: Node v24.14.1, npm 11.11.0, NODE_AUTH_TOKEN not set in this shell, gh logged in as gokulsaraswatvc-eng, no Vercel CLI.

## Done
- 2026-10-31: STARTUP read + report (no changes).
- 2026-10-31: Research step: docs/RESEARCH-OPTIONS.md (Capacitor vs alternatives, PWA/SW, storage, SWR, view transitions, UI frameworks; cited, UNVERIFIED marked). Nothing installed.

- 2026-10-31 DECIDED (Gokul): one domain, portfolio at `/`, hub at `/apps`, then `/admin`, `/gym`, `/gspace`, `/studio`. Rewrites live in the portfolio (it owns `/`). Free Vercel domain until a `.com` is bought. Details: docs/RESEARCH-OPTIONS.md section 6.

- 2026-10-31 DECIDED (Gokul accepted all picks): Astro 7 static hub, bundled gspace + studio, release-zip delivery, card tiles, config v1 + local map, @capacitor/browser, allowNavigation for remote apps, admin tile visible, Capacitor 8 pinned. Table: docs/RESEARCH-OPTIONS.md section 6.

- 2026-10-31: Repo kit step: .gitignore, .nvmrc (24), .npmrc, .env.example, LICENSE (all rights reserved), SECURITY.md, PR template, CI, docs/CONTRACTS.md, docs/ARCHITECTURE.md, README rewritten (replaced the Android stub), stale docs/master/ removed (moved to Trash; master lives in platform/docs).

## In progress / next
- Next: scaffold step (Astro 7 hub + mock config + footer routes; Capacitor after the web build passes). Propose first, wait for OK.
- Open: NODE_AUTH_TOKEN source (needed for the scaffold), Xcode installed?, GitHub repo description/topics/branch protection (owner, web UI).

## Blockers / requests to other repos
Requests for the planning chat to sync into platform/docs/WORKLOG.md (this chat never edits other repos):
- REQUEST admin (URGENT, being built now): set Next.js `basePath: '/admin'`. Path layout decided 2026-10-31: portfolio `/`, hub `/apps`, `/admin`, `/gym`, `/gspace`, `/studio`.
- REQUEST admin: config.json bucket path + CORS that allows the APK origins (`https://localhost`, `capacitor://localhost`) and the web domain.
- REQUEST bestportofolio: stays at `/` (no basePath change). Later: add `next.config` rewrites for `/apps`, `/admin`, `/gym`, `/gspace`, `/studio` to their Vercel projects. Later: CORS on blog/course routes for APK "save for later".
- REQUEST checkers-gym-management (its own chat, later): serve under `/gym`; CRA is deprecated, consider moving to Vite; decide the Supabase project (the same one = shared login).
- REQUEST Progress (GSpace): build with base `/gspace` and publish the `dist` as a zip on each GitHub Release; the hub CI downloads a pinned version.
- REQUEST Markdown-studio: same, with base `/studio` (relative or `/studio`-prefixed asset paths).
- No platform request: config.json stays v1.

## Reminders
- Stack DECIDED 2026-10-31: Capacitor 8 (pinned) + Astro 7 static + vanilla-TS tiles + @vite-pwa/astro + plain-TS SWR store on idb-keyval.
- Inside the APK the origin is localhost: remote apps are cross-origin (CORS for config.json, no cross-doc transitions).
- Back up the APK signing keystore outside the repo.
