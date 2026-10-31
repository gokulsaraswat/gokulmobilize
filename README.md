# gokulmobilize

Hub for all of Gokul's apps: one PWA page of app tiles at `/apps`, plus a Capacitor Android app that bundles the static apps for offline use. iOS users install the PWA (Add to Home Screen).

**Status:** planning done, no app code yet. See [WORKLOG.md](WORKLOG.md).

## Decided stack (2026-10-31)
- Hub: Astro 7 static output, a small vanilla-TS tile script, and `@gokulsaraswat/ui` components rendered at build time.
- Offline (web): `@vite-pwa/astro` service worker, plus an `idb-keyval` stale-while-revalidate store for `config.json`.
- Native: Capacitor 8 (pinned major). Android APK via GitHub Actions. iOS via PWA only; a free Xcode sideload is possible for the owner.
- Details and sources: [docs/RESEARCH-OPTIONS.md](docs/RESEARCH-OPTIONS.md).

## Path layout (one domain)
`/` portfolio · `/apps` hub · `/admin` admin · `/gym` gym · `/gspace` GSpace (bundled in the app) · `/studio` Markdown Studio (bundled). The portfolio owns `/` and holds the rewrites.

## Run / build
Not yet: added with the scaffold step. Requirements: Node 24 (`.nvmrc`), and `NODE_AUTH_TOKEN` (GitHub token with `read:packages`) in your shell to install `@gokulsaraswat/*`.

## Environment variables
See [.env.example](.env.example): `NODE_AUTH_TOKEN`, `PUBLIC_HUB_CONFIG_URL`.

## Deploy (Vercel)
Vercel project settings are documented here once the scaffold exists: project name, install `npm ci`, build `npm run build`, env `NODE_AUTH_TOKEN`, `PUBLIC_HUB_CONFIG_URL`.

## Docs
- This repo:
  - [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), [WORKLOG.md](WORKLOG.md)
  - [docs/CONTRACTS.md](docs/CONTRACTS.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/KICKOFF-PROMPT.md](docs/KICKOFF-PROMPT.md)
- Master docs (all repos): [platform/docs](https://github.com/gokulsaraswat/platform/tree/main/docs): WORKLOG, CONTRACTS, REPO-KIT, PROMPTS.

## License
All rights reserved; see [LICENSE](LICENSE).
