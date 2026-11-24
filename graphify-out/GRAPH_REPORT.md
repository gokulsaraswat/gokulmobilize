# Graph Report - gokulmobilize  (2026-11-24)

## Corpus Check
- 53 files · ~31,164 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 6, .properties 2)

## Summary
- 295 nodes · 322 edges · 32 communities (21 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `640048e6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- render-tiles.ts
- Prompt Playbook — CLAUDE.md Workflow
- Codebase Blueprint & Structural Graph
- sync-architecture.sh
- hub-config.test.ts
- RESEARCH-OPTIONS: gokulmobilize hub
- 🤖 System Architecture & Co-Worker Protocol
- saved-items.ts
- package.json
- 6. Decisions log
- WORKLOG: gokulmobilize
- pull_request_template.md
- COLLABORATORS.md
- SECURITY.md
- dependencies
- scripts
- devDependencies
- tsconfig.json
- vercel.json
- Base.astro
- ExampleInstrumentedTest.java
- bundle-apps.mjs
- gradlew
- WORKLOG
- PLANNING-CHAT-PROMPT.md
- CONTEXT: read this first in every new session

## God Nodes (most connected - your core abstractions)
1. `WORKLOG` - 20 edges
2. `🤖 System Architecture & Co-Worker Protocol` - 10 edges
3. `scripts` - 10 edges
4. `CONTEXT: read this first in every new session` - 9 edges
5. `WORKLOG: gokulmobilize` - 9 edges
6. `gokulmobilize` - 9 edges
7. `Prompt Playbook — CLAUDE.md Workflow` - 7 edges
8. `RESEARCH-OPTIONS: gokulmobilize hub` - 7 edges
9. `2. PWA tooling, storage, data layer` - 6 edges
10. `ARCHITECTURE: gokulmobilize` - 6 edges

## Surprising Connections (you probably didn't know these)
- `LLD` --references--> `KeyValueStorage`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/hub-config.ts
- `LLD` --references--> `resolveTileLink()`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/tile-target.ts
- `Saved for later (shared with the portfolio; decided 2026-10-31, option B)` --references--> `SavedItem`  [INFERRED]
  docs/CONTRACTS.md → src/lib/saved-items.ts
- `Requests waiting for the `platform` repo (collected from repo logs; platform chat applies, planning chat syncs)` --references--> `SavedItem`  [INFERRED]
  docs/master/WORKLOG.md → src/lib/saved-items.ts
- `Blockers / requests to other repos (planning chat syncs these into platform/docs/WORKLOG.md; this repo never edits others)` --references--> `SavedItem`  [INFERRED]
  WORKLOG.md → src/lib/saved-items.ts

## Import Cycles
- None detected.

## Communities (32 total, 11 thin omitted)

### Community 0 - "render-tiles.ts"
Cohesion: 0.21
Nodes (10): @gokulsaraswat/config, ref_node_assert, ref_node_test, renderTiles(), tileMeta, BuildTarget, resolveTileLink(), app (+2 more)

### Community 1 - "Prompt Playbook — CLAUDE.md Workflow"
Cohesion: 0.25
Nodes (7): 1. Starting a New Folder / Project, 2. Starting with an Existing Project, 3. The "After-Command" Chaser, 4. Start / Debug Prompt Template, 5. Session Wrap-Up Prompt Template, 6. The Context Recovery Prompt (Anti-Hallucination Trigger), Prompt Playbook — CLAUDE.md Workflow

### Community 2 - "Codebase Blueprint & Structural Graph"
Cohesion: 0.40
Nodes (4): 1. High-Level Design (HLD) Topology, 2. Current Target Directory Tree, 3. Low-Level Design (LLD) & SOLID Class Schemas, Codebase Blueprint & Structural Graph

### Community 3 - "sync-architecture.sh"
Cohesion: 0.70
Nodes (3): edge(), node(), sync-architecture.sh script

### Community 4 - "hub-config.test.ts"
Cohesion: 0.17
Nodes (7): idb-keyval, ConfigStore, createConfigStore(), idbStorage, KeyValueStorage, cachedConfig, freshConfig

### Community 5 - "RESEARCH-OPTIONS: gokulmobilize hub"
Cohesion: 0.11
Nodes (17): 1.1 Comparison, 1.2 Capacitor facts that shape the design, 1.3 Capacitor plugins (all MIT unless noted; versions from npm), 1.4 Starters to borrow from (config only, not code), 1. Native wrapper: Capacitor and alternatives, 2.1 Service worker, 2.2 iOS PWA constraints, 2.3 "Save for later" storage (+9 more)

### Community 6 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.07
Nodes (25): AGENTS.md: gokulmobilize, 🔄 Auto-Sync: System Architecture & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), Context, 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), STANDING RULES (from Gokul, apply in every session) (+17 more)

### Community 7 - "saved-items.ts"
Cohesion: 0.17
Nodes (13): ARCHITECTURE: gokulmobilize, HLD, LLD, Native app (Android, Capacitor 8.5), Release pipeline, Size (production build, gzip), render(), toRow() (+5 more)

### Community 8 - "package.json"
Cohesion: 0.08
Nodes (23): engines, node, name, private, type, version, astro, @astrojs/check (+15 more)

### Community 9 - "6. Decisions log"
Cohesion: 0.16
Nodes (12): MainActivity, android.os.Bundle, com.getcapacitor.BridgeActivity, 2026-10-31: native app findings (Claude, step 6), 2026-10-31: one domain, portfolio at the root (Gokul), 2026-10-31: remaining picks accepted (Gokul: "use your picks"), 2026-10-31: save for later = option B (Gokul), 2026-10-31: service worker tooling changed during build (Claude, step 5) (+4 more)

### Community 10 - "WORKLOG: gokulmobilize"
Cohesion: 0.10
Nodes (20): Consumes, CONTRACTS: gokulmobilize (hub), Exposes, Path layout (decided 2026-10-31), Saved for later (shared with the portfolio; decided 2026-10-31, option B), GitHub / sync status (2026-11-14), Requests waiting for the `platform` repo (collected from repo logs; platform chat applies, planning chat syncs), RESUME HERE (verified read-only on 2026-11-14 by the planning chat; repo logs were read, builds/CI NOT re-run) (+12 more)

### Community 14 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, astro, @astrojs/react, @capacitor/android, @capacitor/browser, @capacitor/core, @gokulsaraswat/config, @gokulsaraswat/ui (+3 more)

### Community 15 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android:sync, astro, build, build:native, dev, generate-pwa-assets, lint (+2 more)

### Community 16 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @astrojs/check, @capacitor/cli, @types/node, @types/react, @types/react-dom, typescript, @vite-pwa/assets-generator (+1 more)

### Community 17 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 18 - "vercel.json"
Cohesion: 0.40
Nodes (4): cleanUrls, headers, redirects, rewrites

### Community 19 - "Base.astro"
Cohesion: 0.24
Nodes (4): @gokulsaraswat/ui, FileLink(), base, { slug }

### Community 20 - "ExampleInstrumentedTest.java"
Cohesion: 0.24
Nodes (8): ExampleInstrumentedTest, ExampleUnitTest, androidx.test.ext.junit.runners.AndroidJUnit4, assert, context, instrumentationregistry, org.junit.runner.RunWith, org.junit.Test

### Community 22 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 29 - "WORKLOG"
Cohesion: 0.08
Nodes (23): Agreed order, Architecture (agreed 2026-10-31), Cleanup scan: `/cleanscan` (Claude slash command), Commit + push everything: `/gitmd` (Claude slash command), Current focus, Decisions, Dropped, Far later (+15 more)

### Community 31 - "CONTEXT: read this first in every new session"
Cohesion: 0.20
Nodes (9): CONTEXT: read this first in every new session, Future changes (expect these; do not block them), How repos interact (the contracts), Repo map, STANDING RULES (from Gokul, apply in every session), This repo: gokulmobilize, Vision, Work modes (ask Gokul which one if unclear) (+1 more)

## Knowledge Gaps
- **159 isolated node(s):** `📐 Engineering Guardrails`, `🎨 Frontend Architecture, UI/UX & Motion Standard`, `📉 Token-Optimized Communication Mode`, `🛠️ Project Execution Modes (Personal vs. Organization)`, `⏱️ Communication Constraints (Zero Waste Mode)` (+154 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 187 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SavedItem` connect `WORKLOG: gokulmobilize` to `saved-items.ts`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **Why does `idb-keyval` connect `hub-config.test.ts` to `package.json`, `saved-items.ts`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `LLD` connect `saved-items.ts` to `render-tiles.ts`, `hub-config.test.ts`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **What connects `📐 Engineering Guardrails`, `🎨 Frontend Architecture, UI/UX & Motion Standard`, `📉 Token-Optimized Communication Mode` to the rest of the system?**
  _159 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RESEARCH-OPTIONS: gokulmobilize hub` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `🤖 System Architecture & Co-Worker Protocol` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07977207977207977 - nodes in this community are weakly interconnected._