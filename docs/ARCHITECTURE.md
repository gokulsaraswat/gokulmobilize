# ARCHITECTURE: gokulmobilize

Only what exists. Updated: 2026-10-31.

## HLD
```text
browser -> /apps (Astro static pages, base /apps)
  index.html: TileGrid (skeleton cards, then a vanilla-TS script)
     createConfigStore(url) --(1) read IndexedDB 'hub-config'--> emit cached tiles
                            --(2) fetch config.json (no-cache, ETag)--> parseHubConfig --> emit + save
                            --(3) refresh on visibilitychange / online
  [slug].astro: 9 footer pages (LegalPage from @gokulsaraswat/ui)
  Base.astro: tokens.css + styles.css + Footer (rendered at build time, no client React)
```
config URL = `PUBLIC_HUB_CONFIG_URL`, or `/apps/config.mock.json` when unset.

## LLD
| File | Responsibility |
|---|---|
| `src/lib/hub-config.ts` | `createConfigStore(url, storage?, fetcher?)` -> `{ subscribe, load, refresh }`. Storage (`KeyValueStorage`, default idb-keyval) and fetch are injected for tests. Invalid or unreachable config never replaces a valid cached copy. |
| `src/lib/render-tiles.ts` | `renderTiles(grid, template, config)`: enabled tiles only; textContent only; external links open in a new tab. |
| `src/lib/tile-meta.ts` | Hub-only description and accent token per `AppId`. |
| `src/components/TileGrid.astro` | Markup, skeletons, status line, store wiring, scoped styles. |
| `src/layouts/Base.astro` | Head, global tokens, cross-document `@view-transition`, Footer. |

## Size (production build, gzip)
- Tile script 24 KB. Most of it is zod, pulled in via `parseHubConfig`.
- React's client runtime is emitted but not loaded, because no component hydrates.

Not built yet: Capacitor `android/`/`ios/`, service worker, save for later.
