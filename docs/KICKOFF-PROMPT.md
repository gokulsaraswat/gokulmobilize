# Kickoff prompt: gokulmobilize

Master copy: platform/docs/PROMPTS.md (github.com/gokulsaraswat/platform). If they differ, the master wins.
Use: new chat with this repo as working directory. Paste SHARED BLOCK + REPO SECTION. Collaborators also paste the ADD-ON.

## SHARED BLOCK
```text
You are working in ONE repo of a 6-repo platform (github.com/gokulsaraswat/*):
- platform: shared packages (@gokulsaraswat/ui, @gokulsaraswat/mdx, @gokulsaraswat/auth, @gokulsaraswat/config) + MASTER docs in docs/
- admin: super admin (Next.js + Supabase Auth), app switcher, per-app admin sections, roles/permissions
- gokulmobilize: hub (Vite + React PWA, proposed) + Capacitor Android/iOS wrapper
- bestportofolio: public portfolio (Next.js 16, Prisma on Supabase Postgres); its admin is moving to `admin`
- Progress: GSpace (Astro 5, vanilla JS, local-first, MD -> MDX, base path /gspace)
- later: Markdown-studio, checkers-gym-management

STARTUP (before any change)
1. Read, in this repo: CLAUDE.md, AGENTS.md, WORKLOG.md, .claude-session.json, docs/CONTRACTS.md, README.md.
   Also read the master: platform/docs/WORKLOG.md and platform/docs/CONTRACTS.md (GitHub: gokulsaraswat/platform).
   If graphify-out/ exists, query it first.
2. Report to me: current state, what this repo must deliver, which other repos it depends on / affects,
   and EVERY doubt. Wait for my answers.

RULES
- Ask as many questions as needed until you are 100% certain. Never assume. Never invent a file, table,
  function, prop, env var or API. If it is not in the code or docs, stop with: [REQ_CONTEXT]: I need <thing>.
- Use skills/plugins by default: ponytail (smallest working solution), caveman (terse output),
  graphify (code map), plus any other fitting skill. Order: reuse -> stdlib/platform -> existing dep -> new code.
- Small steps. Before each step: say what you will change and wait for my OK.
  After each step: build + lint + run, show evidence, then update WORKLOG.md, .claude-session.json,
  docs/CONTRACTS.md (if an interface changed), refresh graphify, commit, push.
- Git: owner pushes to main. Collaborators: branch `<user>-<repo>` + PR only. Never force-push.
- Docs upkeep is automatic: never wait to be told. Keep every file in REPO-KIT current in the same step, and if the process or an
  interface changes, update the affected docs (WORKLOG, CONTRACTS, KICKOFF-PROMPT, master requests) and say what you updated.
- Never edit another repo. Needs from other repos go into platform/docs/WORKLOG.md as a request.
- Shared constants come from @gokulsaraswat/ui (design philosophy, tokens, footer with Privacy, Terms, Cookie Policy,
  Data Deletion Request, Accessibility Statement, Sitemap, FAQ, About, Contact; SEO basics). Per-app: loader, accent, content.
- Simple proof of deploy-ready: run `rm -rf node_modules .next dist && npm ci && npm run build` (or the repo's equivalent) on the pinned Node. If it passes, Vercel will build. Also check file-name CASE in imports (macOS ignores case, Vercel/Linux does not).
- Deploy-ready is part of done: the PRODUCTION build must succeed with the same commands the host runs (clean install from the lockfile, then build), on a pinned Node version
  (`engines` + `.nvmrc`), with every env var listed in .env.example, no reliance on local files, and CI green. A failing host build = not done. Private @gokulsaraswat/* packages
  need an auth token in CI and on the host (.npmrc using ${NODE_AUTH_TOKEN}); never commit the token. Hosting is DECIDED: Vercel for all repos (Gokul, 2026-10-31). Verify with the Vercel build (clean install + production build); Vercel env vars + project settings documented in README. Any exception: ask me.
- Done = builds (production), runs, lint clean, tests pass, docs updated, pushed, GitHub repo tidy.
- Repo kit checklist: platform/docs/REPO-KIT.md. First task in any repo: bring it up to that kit (propose the list, wait for OK).
```

## COLLABORATOR ADD-ON
```text
Collaborator mode: work on branch `<github-username>-<repo>` off main. One commit per completed step, push after each,
open a PR (never push or merge to main). After each commit: git fetch origin main and merge it in; skip steps already done on main.
Take steps in order from .claude-session.json sprint.todo_next. Ask the owner only for [REQ_CONTEXT] blockers; for design
choices decide, and record the decision in that step's done[] entry. Never mark a step done unless built, run and verified.
Update WORKLOG.md after every step so the next person can continue.
```

## REPO SECTION
### 3. gokulmobilize
Scope: hub. One repo: web PWA + Capacitor (android/ + ios/). Existing repo has README only (Android idea): ask before replacing.
- Vite + React (proposed, may change; keep data/cache layer plain TS), vite-plugin-pwa, View Transitions API, skeleton screens.
- Fetch `config.json` (Supabase Storage CDN): paint cached copy first, refresh in background (stale-while-revalidate, IndexedDB), offline shell, "save for later" for blogs/courses.
- Sub-sites: separate deploys on one domain (path per app); bundle static apps (GSpace, Markdown Studio) in the native app; others remote; third-party in in-app browser.
- Android: direct APK. iOS: PWA install; native only via personal Xcode sideload (no Apple Developer account).
Questions to ask me first: framework confirmation, hub domain, tile design, which apps are bundled vs remote, config.json fields (agree with admin via CONTRACTS.md).

## UI UPGRADE ADD-ON (TODO, backlog MOB-I-001; master: platform/docs/PROMPTS.md)
Use only when Gokul asks for the UI/motion upgrade. Paste after SHARED BLOCK + REPO SECTION.

```text
UI UPGRADE: presentation layer only, zero regression. TODO, not started (backlog: PLT-I-001, ADM-I-001, MOB-I-001, PRT-I-001).

Real topology (verified 2026-11-25):
- platform: shared @gokulsaraswat/{ui,config,auth}. READ-ONLY for this task.
- admin: Next 16 + Supabase Auth. The ONE role-aware admin; "super admin" is a role (user_roles app='*'), not a separate app.
- gokulmobilize: Astro 7 hub PWA at /apps + Capacitor Android.
- bestportofolio: Next 16 public site + the AI chatbot (Gemini + Supabase vector search) + its own cookie-session admin. There is NO separate chatbot repo.
- Out of scope: GSpace, Markdown-studio (no shared packages), gokul-omni-converter (Python desktop).

RULE 1: ZERO REGRESSION AND CONTRACT PRESERVATION
1. Do NOT alter API contracts: route paths, methods, status codes, request/response shapes. This includes:
   - POST /api/chat: JSON { messages: [{ role, content }] } in; text/plain streamed chunks out (NOT SSE; the widget reads them with getReader()); 400 when messages is not a non-empty array.
   - GET /api/chat-status -> { enabled }.
   - The anonymous rate limits in bestportofolio/src/proxy.ts.
2. Shared packages are read-only: no change to exports, props, or CSS variable names in @gokulsaraswat/*. Restyle with app-level overrides of the tokens in the consuming repo's own CSS.
3. Preserve business logic and auth: state, data hooks, validation, role checks, env var names, and
   - admin: src/proxy.ts, src/lib/session.ts, route-group layouts, src/features/hub/config/* (actions, load), supabase/;
   - bestportofolio: signed-cookie session, requireAdmin, Prisma access;
   - hub config.json contract: bucket public-config, path hub/config.json, shape in @gokulsaraswat/config.
4. Additive only: styling, layout, typography, CSS/Tailwind, motion. Wrap existing logic in upgraded UI components; never rewrite data fetching.

RULE 2: WORKFLOW PER CHANGE
1. Map dependencies of every file you plan to touch (which repos consume it).
2. Propose the plan first: exact files, and confirm no API contract, shared type, auth flow or env var changes. Wait for approval (always when more than one repo is touched).
3. One repo at a time. Proposed order (not yet confirmed by Gokul): gokulmobilize (pilot) -> bestportofolio (site, then chat widget, then its admin) -> admin.
4. Verify after every repo with that repo's own commands (below); fix before moving on. Commit/push only per RULES.md section 2, after verification passes.
5. Ask before adding any dependency beyond the ones listed below.

VISUAL AND MOTION STANDARDS
- Clean typography, layered surface depth, hardware-accelerated motion only (transform, opacity). Use the existing tokens (--motion-ease-enter/-exit, --motion-duration-*); respect prefers-reduced-motion.
- Admin dashboards (admin repo and bestportofolio's admin panel): high-density, fast, scannable; subtle micro-interactions, crisp tables, no heavy or distracting animation, no smooth-scroll hijack.
- User-facing views (portfolio site, hub): richer hero/scroll motion; chat widget streaming polish (typing indicator, chunk fade-in) without touching the fetch/stream code.

Animation libraries installed 2026-11-25 (public npm, not yet used anywhere):
- admin: motion, @formkit/auto-animate
- gokulmobilize: motion, @formkit/auto-animate
- bestportofolio: gsap, @gsap/react, lenis, @formkit/auto-animate; keeps its existing framer-motion ^12 (same engine as `motion`; import from 'framer-motion', do not add `motion` alongside it).
```

```text
Repo: gokulmobilize (pilot).
- Verify: `npm run lint && npm test && npm run build`.
- Scope: src/components/TileGrid.astro, SavedList.astro, src/layouts/Base.astro, global styles. Leave src/lib/* (hub-config, tile-target, saved-items, render-tiles; unit-tested) untouched.
- Native app feel: no scroll hijacking (Capacitor Android wraps this build). Use `motion` vanilla animate() in Astro scripts or inside React islands; @formkit/auto-animate for tile/saved-list changes.
```
