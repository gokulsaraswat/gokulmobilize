# RESEARCH-OPTIONS: gokulmobilize hub

Research step before any build. Nothing installed or adopted. Checked 2026-10-31.
Method: official docs + repos via web; versions/licenses/dates via `npm view` and `gh api repos/<owner>/<repo>` (cited as `npm:<pkg>` / `gh:<owner>/<repo>`). Sizes are min+gz from bundlephobia (`https://bundlephobia.com/package/<pkg>`) unless noted. Anything not verified is marked **UNVERIFIED**.

Requirements recap (docs/KICKOFF-PROMPT.md): one repo = web PWA + Capacitor; Android direct APK; iOS = PWA install or free personal Xcode sideload; `config.json` (shape from `@gokulsaraswat/config` 0.1.0) painted from cache then refreshed (SWR, IndexedDB); offline shell; "save for later"; View Transitions + skeletons; bundle static apps (GSpace, Markdown Studio) in the native app; others remote; third-party in in-app browser; reuse `@gokulsaraswat/ui`; Vercel.

---

## 1. Native wrapper: Capacitor and alternatives

### 1.1 Comparison
| Option | License | Latest (date) | Health | Reuse React web UI | Bundle static apps offline | iOS without paid account | Verdict |
|---|---|---|---|---|---|---|---|
| **Capacitor 8** | MIT | npm `latest` 8.5.3 (2026-10-07); GH tag 8.6.0 (2026-10-28, not on npm); 9.0.0-beta.0 (2026-10-28) | Active, 17k stars, pushed 2026-10-30 (`gh:ionic-team/capacitor`) | Yes (WebView) | Yes, via `webDir` | Personal Team, 7-day profile | **Pick** |
| Tauri 2 mobile | Apache-2.0/MIT | 2.12.5 (2026-10-21) (`gh:tauri-apps/tauri`) | Active | Yes (WebView) | Yes | Same 7-day limit; Xcode on macOS ([prereqs](https://v2.tauri.app/start/prerequisites/)) | Rust + NDK in CI, smaller mobile plugin set (UNVERIFIED as a measured comparison); no gain for a web hub |
| Expo / React Native | MIT | expo 58.0.19 (2026-10-31), RN 0.88.1 (2026-10-27) | Very active | Partly: only `'use dom'` components (no children, JSON-serializable props, SPA only) ([docs](https://docs.expo.dev/guides/dom-components/)) | Yes | Same | Two runtimes; UI package not reusable in native screens |
| Quasar | MIT | 2.35.2 (2026-10-19) | Active | **No (Vue)** | Via Capacitor/Cordova ([docs](https://quasar.dev/introduction-to-quasar)) | Same | Capacitor plus Vue: strictly worse |
| Cordova | Apache-2.0 | cordova-android 15.1.0 (2026-07-22); CLI 13.0.0 (2025-11-25) | Slower | Yes | Yes (`www`, UNVERIFIED cite) | Same | Capacitor is its successor; no advantage |
| TWA (Bubblewrap) | Apache-2.0 | 1.27.0 (2026-10-09) (`gh:GoogleChromeLabs/bubblewrap`) | Active | Yes (it *is* the live PWA) | **No.** Content comes from the web; first offline launch shows an error page without a custom LauncherActivity ([offline-first](https://developer.chrome.com/docs/android/trusted-web-activity/offline-first)) | n/a (Android only) | Optional "lite" APK later, not a replacement |
| NativeScript / Flutter | MIT / BSD-3 | 9.1.3 (2026-10-06) / active | Active | **No** (native/Skia UI) | n/a | Same | Ruled out |

**Plainly: nothing beats Capacitor for this hub.** It is the only option that reuses the React/CSS UI unchanged *and* ships GSpace and Studio offline inside the APK. Every native option has the same iOS limits, so the PWA stays the real iOS channel.

### 1.2 Capacitor facts that shape the design
| Fact | Source |
|---|---|
| Min iOS 15, Android 7 (API 24), compile/target SDK 36, Xcode 26+ | [support policy](https://capacitorjs.com/docs/main/reference/support-policy) |
| CLI needs Node >= 22 (`npm:@capacitor/cli` engines); JDK 21 for v8 | npm; [Capgo guide](https://capgo.app/blog/upgrade-capacitor-app-to-capacitor-8/) |
| `webDir` must contain the built `index.html`; `server.url` is "not intended for use in production" | [config](https://capacitorjs.com/docs/config) |
| App origin is `https://localhost` (Android) / `capacitor://localhost` (iOS) | [config](https://capacitorjs.com/docs/config) |
| `server.allowNavigation` lets the WebView open listed remote hosts in place; other URLs go to the system browser. Whether remote pages get the native bridge: **UNVERIFIED** | [config](https://capacitorjs.com/docs/config) |
| iOS WKWebView service workers need App-Bound Domains (max 10) plus `limitsNavigationsToAppBoundDomains`, which blocks other hosts. Reported flaky on the local scheme | [WebKit](https://webkit.org/blog/10882/app-bound-domains), [capacitor#4122](https://github.com/ionic-team/capacitor/issues/4122) |
| APK size: no official figure; community reports ~4 MB minimal, ~9 MB v8 debug, R8 13.1 -> 5.9 MB. Estimate 4–10 MB plus bundled sites | [#1922](https://github.com/ionic-team/capacitor/issues/1922), [dev.to](https://dev.to/indiecoredev/cutting-a-capacitor-android-build-in-half-59h9) |
| CLI APK build: `npx cap build android --androidreleasetype APK` or `./gradlew assembleRelease`; GitHub Actions works with a base64 keystore secret | [cap build](https://capacitorjs.com/docs/cli/commands/build), [khromov](https://khromov.se/build-your-capacitor-android-app-bundle-using-github-actions/) |
| Free Apple ID: profiles expire after 7 days, 3 devices, 3 apps/device, 10 App IDs per 7 days, needs a Mac with Xcode | [Apple](https://developer.apple.com/support/compare-memberships/) |
| Stewardship: OutSystems owns Ionic (since 2022) and builds on Capacitor; v9 forecast for late Nov 2026 (forecast, not a commitment) | [Ionic](https://ionic.io/blog/important-announcement-the-future-of-ionics-commercial-products), [OutSystems](https://www.outsystems.com/blog/posts/mobile-app-development-capacitor-odc), [daily.dev](https://daily.dev/posts/the-road-to-capacitor-9-ifpsukbpe) |

**Consequences:**
- **Bundled apps are the hub's origin.** In the APK, `/gspace` and `/studio` are served from `localhost`, the same origin as the hub. So they share IndexedDB/localStorage with the hub, but **not** with the web GSpace on the real domain. Local-first data does not carry over between web and app.
- **Remote apps are a different origin.** Portfolio and gym are another origin from inside the APK. Cross-document view transitions and speculation-rules prerender won't run, and `config.json` needs CORS.
- **No service worker in the native build.** Bundled files are already offline. The SW and SWR are for the PWA build; in the APK, SWR revalidates on `@capacitor/network` or focus.

### 1.3 Capacitor plugins (all MIT unless noted; versions from npm)
| Plugin | Version (date) | Use here |
|---|---|---|
| `@capacitor/browser` | 8.0.5 (2026-10-02) | Third-party links (SFSafariViewController / Custom Tabs) ([docs](https://capacitorjs.com/docs/apis/browser)) |
| `@capacitor/inappbrowser` | 4.1.0 (2026-10-15) | Alternative: WebView or system browser. Pick one (see questions) |
| `@capacitor/app` | 8.1.2 (2026-10-02) | Android back button |
| `@capacitor/network` | 8.0.1 (2026-02-12) | Online/offline -> revalidate config |
| `@capacitor/splash-screen` / `status-bar` | 8.0.2 / 8.0.4 | Native polish; status-bar v8 has edge-to-edge System Bars API |
| `@capacitor/share` | 8.0.3 | Optional |
| `@capacitor/preferences`, `filesystem` | 8.0.1, 8.1.5 | Not needed (IndexedDB is enough) |
| `@capacitor-community/sqlite` | 8.1.1 (2026-08-06) | Not needed |
| `@capawesome/capacitor-live-update` | 8.7.1 (2026-10-19) | LATER: self-hosted OTA of web bundles, no cloud account ([docs](https://capawesome.io/plugins/live-update/)) |
| `@capgo/capacitor-updater` | 8.54.0 (2026-10-25), **MPL-2.0** | Alternative OTA; self-hosting means building channels/rollback yourself ([docs](https://capgo.app/docs/plugin/self-hosted/getting-started/)) |

### 1.4 Starters to borrow from (config only, not code)
| Repo | License | Last push | Borrow |
|---|---|---|---|
| [ionic-team/create-capacitor-app](https://github.com/ionic-team/create-capacitor-app) | NOASSERTION (unclear) | 2026-10-07 | Minimal Vite + Capacitor layout; read only, nothing copied verbatim (license unclear) |
| [ionic-team/starters](https://github.com/ionic-team/starters) `react-vite/` | MIT | 2026-10-31 | `capacitor.config.ts`, scripts; skip Ionic UI |

No maintained official "Vite + React + TS Capacitor template" exists (`capacitor-community/vite-react-ts-template` returns 404). Simplest is to run `npx cap init` in our own app.

---

## 2. PWA tooling, storage, data layer

### 2.1 Service worker
| Option | License | Latest | Health | Notes |
|---|---|---|---|---|
| Workbox | MIT | 7.4.1 (2026-05-05) | Maintenance only: moved to Chrome Aurora team ([README](https://github.com/googlechrome/workbox)), "partial bug bankruptcy" ([#3076](https://github.com/GoogleChrome/workbox/issues/3076)) | Stable, little new work |
| **vite-plugin-pwa** / **@vite-pwa/astro** | MIT | 2.0.0 (2026-10-03) / 1.2.0 | Active | Generates precache manifest; uses `workbox-build` ([guide](https://vite-pwa-org.netlify.app/guide/)), inherits Workbox state. Works with React, Preact, Svelte, Solid, Astro ([frameworks](https://vite-pwa-org.netlify.app/frameworks/)) |
| Serwist | MIT | 9.5.13 (2026-10-04) | Active fork "because Workbox's development had stalled" ([docs](https://serwist.pages.dev/docs)) | Fallback if Workbox breaks |
| Hand-written SW | n/a | n/a | n/a | 0 KB; we own precache hashing and versioning |

### 2.2 iOS PWA constraints
| Constraint | Source |
|---|---|
| Home-screen web apps are exempt from Safari's 7-day script-storage deletion. Home-screen storage is separate from Safari-tab storage | [WebKit tracking prevention](https://webkit.org/tracking-prevention/) |
| Quota up to 60% of disk per origin; `persist()` granted by heuristics (e.g. opened as a Home Screen app) | [WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/) |
| No Background Sync on iOS Safari, so revalidate on focus/`visibilitychange` | [caniuse](https://caniuse.com/background-sync) |
| Web Push since iOS 16.4, Home Screen only, permission after a user gesture | [WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) |

### 2.3 "Save for later" storage
| Option | License | Version (date) | Size | Fit |
|---|---|---|---|---|
| **idb-keyval** | Apache-2.0 | 6.3.0 (2026-07-08) | 0.8 KB | Config + saved list (key-value is enough) |
| idb | ISC | 8.0.4 (2026-10-06) | 1.5 KB | If we need typed stores/indexes |
| Dexie | Apache-2.0 | 4.4.7 (2026-10-19) | 30.4 KB | Too heavy |
| localForage | Apache-2.0 | 1.10.0 (2021-08-18) | 8.5 KB | Stale, avoid |
| **Cache API** | platform | n/a | 0 KB | Offline copies of saved post/course pages |

Call `navigator.storage.persist()` on first save ([WebKit](https://webkit.org/blog/14403/updates-to-storage-policy/)).

### 2.4 Stale-while-revalidate data layer
| Option | License | Size | Framework-agnostic | Fit |
|---|---|---|---|---|
| TanStack Query (+ persister) | MIT, 5.105.0 | query-core 11.2 KB + persist 2.8 KB | Yes (`@tanstack/query-core`) | Overkill for one config fetch plus a list |
| SWR (Vercel) | MIT, 2.5.1 | 5.6 KB | **No** (React hooks) | Breaks the plain-TS rule |
| **Plain TS store (~30 lines)** | ours | ~0.5 KB (estimate) | Yes | Read IDB, emit, fetch (`If-None-Match`), validate with `parseHubConfig`, write, emit; UI subscribes |

### 2.5 Transitions and instant navigation
| Item | Status | Source |
|---|---|---|
| Same-document `startViewTransition` | Chrome 111+, Safari 18+, Firefox 144+ (92.9%) | [caniuse](https://caniuse.com/view-transitions) |
| Cross-document `@view-transition` | Chrome 126+, Safari 18.2+, Firefox partial (88.8%); same-origin only; not Baseline | [caniuse](https://caniuse.com/cross-document-view-transitions), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition) |
| React `<ViewTransition>` | Stable in React 19.3 (2026-09-09); no reduced-motion handling built in | [react.dev](https://react.dev/blog/2026/09/09/react-19-3) |
| React Router `viewTransition` prop | Deprecated in favour of `<ViewTransition>`; react-router 8.5.1 | [reactrouter.com](https://reactrouter.com/how-to/view-transitions) |
| Astro `<ClientRouter />` | Built-in, with `animate`/`swap`/`none` fallback | [Astro docs](https://docs.astro.build/en/guides/view-transitions/) |
| Speculation Rules (prerender same-origin `/gspace`, etc.) | Chrome 109+; off by default in Safari; 75.8% | [caniuse](https://caniuse.com/mdn-html_elements_script_type_speculationrules), [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) |
| quicklink | Apache-2.0, 3.0.2, 2.4 KB | `gh:GoogleChromeLabs/quicklink` |
| instant.page | MIT, 5.2.0 (npm 2023), 1.3 KB | Infrequent releases |

Launcher/super-app projects: nothing reusable as a dependency. The useful patterns are platform features: Speculation Rules plus cross-document view transitions plus a precached shell. Ionic's app-shell was not researched (UNVERIFIED).

---

## 3. Hub UI framework

Benchmark data: js-framework-benchmark chrome156 run (2026-10-25), keyed, desktop Chrome ([results](https://krausest.github.io/js-framework-benchmark/current.html)). Mid-range Android figures are **UNVERIFIED**; use the ratios, not the absolute numbers.

| | React 19.3 (Vite 8) | Preact 11 | Svelte 5 | Solid 1.9 | Vanilla TS | **Astro 7 static** |
|---|---|---|---|---|---|---|
| Benchmark app size, compressed | 51.4 KB | 5.9 KB | 9.7 KB | 4.5 KB | 2.5 KB | 0 KB for non-hydrated components ([docs](https://docs.astro.build/en/guides/framework-components/)); each island adds its framework |
| First paint (bench) | 228 ms | 57 ms | 66 ms | 54 ms | 41 ms | static HTML |
| Reuse `@gokulsaraswat/ui` | native | `preact/compat`, not guaranteed ([#4613](https://github.com/preactjs/preact/issues/4613)) | rebuild Footer/LegalPage | rebuild | rebuild | **native via `@astrojs/react`, rendered at build = 0 KB JS** |
| PWA | vite-plugin-pwa | same | same | same | same | @vite-pwa/astro |
| View transitions | `<ViewTransition>` | manual (UNVERIFIED) | SvelteKit `onNavigate` | manual | manual | `<ClientRouter />` |
| Capacitor `webDir` | `dist/` | `dist/` | `dist/` | `dist/` | `dist/` | `dist/` (static output) |
| License / latest | MIT 19.3.1 | MIT 11.0.2 npm | MIT 5.57.3 | MIT 1.9.17 | n/a | MIT 7.4.2 npm |

Other facts:
- Vite 8.3.5 is current and uses Rolldown ([blog](https://vite.dev/blog/announcing-vite8)).
- React Compiler 1.0 is stable ([react.dev](https://react.dev/blog/2025/10/07/react-compiler-1)).
- GSpace (`Progress`) is on Astro `^5.18.2`; current Astro is 7.

The hub is one tile page, 9 static footer pages and a small saved list. The React runtime (~51 KB) buys little there. Astro renders the shared React `Footer`/`LegalPage` to plain HTML (no hooks, as CONTRACTS.md says), so reuse costs 0 KB of JS. The tiles plus SWR are one small vanilla-TS script.

---

## 4. Recommendation

| Layer | Pick | Why |
|---|---|---|
| Native | **Capacitor 8.x, pinned major** (Android APK via GitHub Actions; iOS = PWA, Xcode sideload for you only) | Only option meeting reuse + bundled offline. v9 later as its own step |
| Hub UI | **Astro 7 static + `@astrojs/react` (build-time only) + one vanilla-TS tile script** | Smallest JS on mid phones, 0-KB reuse of `@gokulsaraswat/ui`, built-in view transitions, same family as GSpace. Fallback B: Vite 8 + React 19.3 + Compiler if the hub becomes a React-heavy SPA |
| SW / offline | **@vite-pwa/astro** (`generateSW`; switch to `injectManifest` only if needed); web build only, off in the native build | Precache manifest for free; Serwist if Workbox decays |
| Data | **Plain-TS SWR store + idb-keyval**, validated by `parseHubConfig` | Framework-agnostic, ~1 KB |
| Save for later | idb-keyval (list) + Cache API (page copies) + `storage.persist()` | 0–1 KB |
| Transitions | `@view-transition { navigation: auto }` on hub + sub-sites (web); `<ClientRouter />` inside hub; CSS skeletons; reduced-motion respected via tokens | Platform-native |
| Instant nav (web) | Inline Speculation Rules for `/`, `/gspace`, `/studio`, `/gym`, eagerness `moderate` | 0 KB, Chromium only; progressive |
| Third-party links | `@capacitor/browser` (native) / `target=_blank` (web) | Smallest |
| Later | `@capawesome/capacitor-live-update` (OTA), TWA "lite" APK | Only if needed |

### Borrow vs build
| Borrow (dependency or config) | Build (ours) |
|---|---|
| Capacitor core + browser/app/network/splash/status-bar plugins | `capacitor.config.ts` (webDir, allowNavigation list) |
| Astro 7, `@astrojs/react`, `@vite-pwa/astro` | Tile grid + skeletons (vanilla TS + `@gokulsaraswat/ui` tokens) |
| idb-keyval | SWR config store (~30 lines) + save-for-later module |
| `@gokulsaraswat/ui` (Footer, LegalPage, tokens), `@gokulsaraswat/config` (`parseHubConfig`) | 9 footer routes using `LegalPage` |
| Gradle CLI + GitHub Actions pattern ([khromov](https://khromov.se/build-your-capacitor-android-app-bundle-using-github-actions/)) | CI: web build, APK build, bundled-app fetch step |

### Risks
1. **Origin split:** the APK runs on `localhost`, so remote apps are cross-origin: no cross-doc transitions, CORS needed for `config.json`. Supabase Storage CORS for public buckets is **UNVERIFIED**.
2. **Bundled-app pipeline:** the hub CI must get GSpace/Studio builds with matching base paths. This is a cross-repo dependency.
3. **Local-first data split:** bundled GSpace (localhost origin) and web GSpace keep separate storage.
4. **Toolchain floor:** Node 22+, JDK 21, Xcode 26. CI images must match.
5. **Capacitor 9** is forecast for late Nov 2026, so expect a migration step.
6. **Keystore loss:** a lost keystore means no APK updates (signature mismatch). Back it up outside the repo.
7. **Workbox** is maintenance-only (mitigation: Serwist).
8. **Astro** adds `.astro` files and its build model. If the hub grows into a React-heavy SPA, React islands cost ~51 KB each page, so switch to option B.

---

## 5. Decisions needed (options for each; my pick first)

1. **Hub UI framework**
   - **A. Astro 7 static + vanilla-TS tiles (recommended).**
   - B. Vite 8 + React 19.3 SPA (bigger JS, simplest if the hub grows into an app).
   - C. Vite + Preact 11 (small, but React compat not guaranteed).
2. **Domain / paths: DECIDED 2026-10-31 (Gokul): portfolio at `/`, hub at `/apps`.** See section 6.
3. **Bundled vs remote**
   - **A. Bundled: gspace, studio. Remote: portfolio, gym. Admin: no tile (open via URL).**
   - B. Everything remote (APK = shell only, offline only via SW cache, no cross-repo build coupling; simplest first release).
   - C. Bundle GSpace only first, Studio later.
4. **How the hub gets the bundled builds**
   - **A. Each app publishes a `dist` zip as a GitHub Release asset; hub CI downloads a pinned version.**
   - B. Hub CI clones and builds those repos.
   - C. Git submodules.
   - A/B need a request in the master WORKLOG for Progress / Markdown-studio.
5. **Tile design**
   - **A. Card grid (icon + name + one line), per-app accent.**
   - B. Phone-style icon grid.
   - C. Bento grid.
   - Next step after picking: I prototype 2 so you can choose.
6. **Extra tile fields** (`config.json` v1 has only id, name, href, mode, enabled)
   - **A. Keep v1; the hub maps icon/description/accent by app `id` locally (no contract change).**
   - B. Request `icon`, `description`, `accent`, `order` in `@gokulsaraswat/config` v2 (platform + admin change).
7. **Mock config**
   - **A. `public/config.mock.json` + env `PUBLIC_HUB_CONFIG_URL` (Astro's public env prefix; `VITE_HUB_CONFIG_URL` if option 1B).**
   - B. Hard-coded fallback in code.
8. **In-app browser plugin**
   - **A. `@capacitor/browser`.**
   - B. `@capacitor/inappbrowser`.
9. **Remote apps inside the APK**
   - **A. Open them in the app WebView via `allowNavigation` (feels native; bridge exposure must be checked first).**
   - B. Open them in `@capacitor/browser` (safer, less native).
10. **Extras now or later**
    - OTA updates (live-update) and TWA lite APK. **Recommend later.**
11. **Still open from the startup report**
    - Can account `gokulsaraswatvc-eng` push to `gokulsaraswat/gokulmobilize`?
    - Where does `NODE_AUTH_TOKEN` come from locally and in CI?
    - Refresh or delete `docs/master/*` (stale copies)?
    - LICENSE "all rights reserved" like platform?
    - Is Xcode installed?

---

## 6. Decisions log

### 2026-10-31: one domain, portfolio at the root (Gokul)
Supersedes the 2026-10-27 "hub at `/`" idea. Reason: the portfolio is the most important public app. Keeping it at `/` avoids a Next.js [`basePath`](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath) change, which would touch every link and image. Its only change is additive [rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites).

| Path | App | Stack (read from each repo's package.json, 2026-10-31) | Hub tile mode | In the APK | Offline |
|---|---|---|---|---|---|
| `/` | portfolio (bestportofolio) | Next.js 16, React 19, Supabase | remote | opens in app WebView | "save for later" (blogs/courses) |
| `/apps` | hub (this repo) | per decision 1 | n/a | start screen (served from `localhost`) | full shell |
| `/admin` | admin | Next.js 16.4, React 19.3 | remote | opens in app WebView | needs network |
| `/gym` | checkers-gym-management | Create React App, React 18, Supabase ([CRA is deprecated](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)) | remote | opens in app WebView | needs network |
| `/gspace` | Progress (GSpace) | Astro (moving to 7) | bundled | bundled | full |
| `/studio` | Markdown-studio | static HTML/JS | bundled | bundled | full |

Domain: the free Vercel domain for now, one `.com` later. Rewrites live in the portfolio's `next.config` (it owns `/`).

Consequences:
- **Single login on the web almost for free.** All apps on one origin share the Supabase session, if they use the same Supabase project. The gym's Supabase project is still undecided.
- **APK login:** Google OAuth is blocked in embedded webviews ([Google](https://developers.googleblog.com/2021/06/upcoming-security-changes-to-googles-oauth-2.0-authorization-endpoint.html)). Inside the APK use email/magic-link, or open Google sign-in in the system browser.
- **Base paths:** admin needs `basePath: '/admin'` and gym needs `/gym`. Set them early.
- **"Save for later" in the APK** fetches portfolio pages cross-origin from `localhost`, so it needs CORS on those routes. UNVERIFIED until tested.

Still open: admin tile visible to everyone (behind login) or only in your APK build; decisions 1 and 3–11 above.

### 2026-10-31: remaining picks accepted (Gokul: "use your picks")
| # | Decision |
|---|---|
| 1 | Hub UI: **Astro 7 static** + `@astrojs/react` (build-time only, for `@gokulsaraswat/ui`) + one vanilla-TS tile script. Web base `/apps`; the APK build uses `/`. |
| 3 | Bundled: **gspace, studio**. Remote: portfolio (`/`), gym (`/gym`), admin (`/admin`). |
| 4 | Bundled builds: each app publishes a base-path `dist` zip as a **GitHub Release asset**; hub CI downloads a pinned version. |
| 5 | Tiles: **card grid** (icon + name + one line + per-app accent). Prototype 2 variants before building. |
| 6 | `config.json` stays **v1**; icon/description/accent come from a local map keyed by app `id`. |
| 7 | Mock: `public/config.mock.json` + env `PUBLIC_HUB_CONFIG_URL`. |
| 8 | Third-party links: **`@capacitor/browser`**. |
| 9 | Remote apps in the APK: **app WebView via `server.allowNavigation`**, after checking bridge exposure (UNVERIFIED). |
| 10 | OTA live update and TWA lite APK: **later**. |
| - | Admin tile: **visible to everyone**; admin itself is behind login. |
| - | Capacitor: **8.x pinned** (Node >= 22 for its CLI; repo pins Node 24). |

Still open (questions, not picks): push rights of `gokulsaraswatvc-eng`, `NODE_AUTH_TOKEN` source (local + CI), `docs/master/*` refresh or delete, LICENSE, Xcode installed.

### 2026-10-31: service worker tooling changed during build (Claude, step 5)
`@vite-pwa/astro` 1.2.0 declares peer `astro` `^1.6.0 || … || ^5.0.0` (`npm view @vite-pwa/astro peerDependencies`), so it does not install on Astro 7. Section 4 assumed it would.
Replacement: `workbox-build` 7.4.1 `generateSW`, run over `dist/` after `astro build` (`scripts/build-sw.mjs`). That is the engine vite-plugin-pwa uses. Icons come from `@vite-pwa/assets-generator` 2.0.0.
- No `--legacy-peer-deps`.
- `npm audit` shows 9 low/moderate findings, all in workbox-build's build-time dependencies (dev only, run on our own files). This is accepted.
- Revisit when `@vite-pwa/astro` supports Astro 7, or switch to Serwist.

### 2026-10-31: save for later = option B (Gokul)
A "Save for later" button on portfolio blog/course pages writes to shared IndexedDB, and the hub shows a "Saved for later" list. Contract: docs/CONTRACTS.md. Offline reading of saved pages = the portfolio's own service worker. In the APK, sharing across origins is deferred to the Android step.

### 2026-10-31: native app findings (Claude, step 6)
- **Decision 9 changed from A to B:** the Capacitor docs mark `server.allowNavigation` "not intended for use in production" ([config](https://capacitorjs.com/docs/config)). Remote apps open in `@capacitor/browser` (Chrome Custom Tabs) instead. Side benefit: Google sign-in is allowed there.
- **Capacitor Android serves extension-less paths as the root `index.html`** when `html5mode` is on (`WebViewLocalServer.java`, `node_modules/@capacitor/android`). App-build links must name files (`/faq.html`, `/gspace/index.html`). This is a requirement for the bundled GSpace/Studio builds too.
- **Back button:** with no handler, Android exited the app from a bundled page (seen on the emulator). Fixed natively in `MainActivity`.
- **Not added:** `@capacitor/app` and `@capacitor/network`; the native back handler and the `online` event cover them.
- **Debug APK:** 4.2 MB.
