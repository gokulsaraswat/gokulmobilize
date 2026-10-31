# gokulmobilize

Hub for all of Gokul's apps: one PWA page of app tiles at `/apps`, plus a Capacitor Android app that bundles the static apps for offline use. iOS users install the PWA (Add to Home Screen).

**Status:** web hub scaffolded (tiles from a mock config, 9 footer pages). Native app and offline service worker are next. See [WORKLOG.md](WORKLOG.md).

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
| `npm run build` | static build to `dist/` |
| `npm run preview` | serve `dist/` at http://localhost:4321/apps |
| `npm run lint` | `astro check` (types + Astro diagnostics) |
| `npm test` | unit tests (Node test runner) |

## Environment variables
See [.env.example](.env.example): `NODE_AUTH_TOKEN`, `PUBLIC_HUB_CONFIG_URL`.

## Deploy (Vercel)
- Framework: Astro. Install: `npm ci`. Build: `npm run build`. Output: `dist`. Node: 24.x.
- Env: `NODE_AUTH_TOKEN` (read:packages), and `PUBLIC_HUB_CONFIG_URL` once admin publishes config.json.
- The project name is not created yet.
- `vercel.json` maps `/apps/*` to the root, so the hub also works on its own `*.vercel.app` URL. The portfolio (owner of `/`) rewrites `/apps/:path*` to `<hub-project>.vercel.app/apps/:path*`.

## Docs
- This repo:
  - [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), [WORKLOG.md](WORKLOG.md)
  - [docs/CONTRACTS.md](docs/CONTRACTS.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/KICKOFF-PROMPT.md](docs/KICKOFF-PROMPT.md)
- Master docs (all repos): [platform/docs](https://github.com/gokulsaraswat/platform/tree/main/docs): WORKLOG, CONTRACTS, REPO-KIT, PROMPTS.

## License
All rights reserved; see [LICENSE](LICENSE).
