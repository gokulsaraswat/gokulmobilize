# CONTRACTS: gokulmobilize (hub)

What this repo expects from others and what it exposes. Master: platform/docs/CONTRACTS.md (github.com/gokulsaraswat/platform); if they differ, the master wins. Updated: 2026-10-31.
Status: nothing is implemented yet; the rows below are the agreed interface the scaffold must follow.

## Consumes
| From | What | Version | Notes |
|---|---|---|---|
| platform | `@gokulsaraswat/config`: `parseHubConfig`, `HubConfig`, `HubTile`, `appIds` | 0.1.0 | config.json v1 = `{ version: 1, apps: [{ id, name, href, mode: bundled \| remote \| external, enabled }] }`. Invalid input throws `ZodError`; the hub then keeps its last valid cached copy. |
| platform | `@gokulsaraswat/ui`: `tokens.css`, `styles.css`, `Footer`, `LegalPage`, `footerPages` | 0.1.0 | Rendered at build time (no client React). Registry: GitHub Packages, needs `NODE_AUTH_TOKEN`. |
| admin | Published `config.json` in a Supabase Storage public bucket | v1 | Bucket/path: TO BE UPDATED (admin). CORS must allow the web domain plus `https://localhost` and `capacitor://localhost` (APK). Until then: `public/config.mock.json`. |
| Progress (GSpace) | `dist` zip built with base `/gspace`, attached to a GitHub Release | pinned per hub release | Bundled into the native app (requested, not yet available). |
| Markdown-studio | `dist` zip with base `/studio`, attached to a GitHub Release | pinned | Same (requested). |

## Exposes
| What | Value |
|---|---|
| Web path | `/apps` (served via the portfolio's rewrites; the portfolio owns `/`) |
| Footer routes | `/apps/<slug>` for each `footerPages` slug: privacy, terms, cookies, data-deletion, accessibility, sitemap, faq, about, contact |
| Env | `PUBLIC_HUB_CONFIG_URL` (see .env.example) |
| Native app | Android APK (Capacitor 8); start screen = hub served from `localhost`; `/gspace`, `/studio` bundled |

## Path layout (decided 2026-10-31)
| Path | App | Mode in hub |
|---|---|---|
| `/` | portfolio | remote |
| `/apps` | hub | n/a |
| `/admin` | admin | remote (tile visible; app is behind login) |
| `/gym` | gym | remote |
| `/gspace` | GSpace | bundled |
| `/studio` | Markdown Studio | bundled |

Local tile extras (icon, description, accent) are a hub-side map keyed by app `id`; config.json stays v1.
