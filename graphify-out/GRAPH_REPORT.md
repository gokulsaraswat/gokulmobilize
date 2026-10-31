# Graph Report - gokulmobilize  (2026-10-31)

## Corpus Check
- 50 files · ~24,656 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 6, .properties 2)

## Summary
- 256 nodes · 286 edges · 29 communities (19 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9fa8df27`
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
- gokulmobilize

## God Nodes (most connected - your core abstractions)
1. `scripts` - 10 edges
2. `gokulmobilize` - 9 edges
3. `WORKLOG: gokulmobilize` - 9 edges
4. `🤖 System Architecture & Co-Worker Protocol` - 8 edges
5. `Prompt Playbook — CLAUDE.md Workflow` - 7 edges
6. `RESEARCH-OPTIONS: gokulmobilize hub` - 7 edges
7. `ARCHITECTURE: gokulmobilize` - 6 edges
8. `2. PWA tooling, storage, data layer` - 6 edges
9. `6. Decisions log` - 6 edges
10. `@gokulsaraswat/config` - 5 edges

## Surprising Connections (you probably didn't know these)
- `LLD` --references--> `resolveTileLink()`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/tile-target.ts
- `2026-10-31: native app findings (Claude, step 6)` --references--> `MainActivity`  [INFERRED]
  docs/RESEARCH-OPTIONS.md → android/app/src/main/java/com/gokulsaraswat/gokulmobilize/MainActivity.java
- `LLD` --references--> `KeyValueStorage`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/hub-config.ts
- `Saved for later (shared with the portfolio; decided 2026-10-31, option B)` --references--> `SavedItem`  [INFERRED]
  docs/CONTRACTS.md → src/lib/saved-items.ts
- `Blockers / requests to other repos (planning chat syncs these into platform/docs/WORKLOG.md; this repo never edits others)` --references--> `SavedItem`  [INFERRED]
  WORKLOG.md → src/lib/saved-items.ts

## Import Cycles
- None detected.

## Communities (29 total, 10 thin omitted)

### Community 0 - "render-tiles.ts"
Cohesion: 0.27
Nodes (8): @gokulsaraswat/config, renderTiles(), tileMeta, BuildTarget, resolveTileLink(), app, web, TileLink

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
Cohesion: 0.11
Nodes (17): LLD, idb-keyval, ref_node_assert, ref_node_test, render(), toRow(), ConfigStore, createConfigStore() (+9 more)

### Community 5 - "RESEARCH-OPTIONS: gokulmobilize hub"
Cohesion: 0.11
Nodes (17): 1.1 Comparison, 1.2 Capacitor facts that shape the design, 1.3 Capacitor plugins (all MIT unless noted; versions from npm), 1.4 Starters to borrow from (config only, not code), 1. Native wrapper: Capacitor and alternatives, 2.1 Service worker, 2.2 iOS PWA constraints, 2.3 "Save for later" storage (+9 more)

### Community 6 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.08
Nodes (19): AGENTS.md: gokulmobilize, 🔄 Auto-Sync: System Architecture & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📉 Token-Optimized Communication Mode (+11 more)

### Community 8 - "package.json"
Cohesion: 0.08
Nodes (23): engines, node, name, private, type, version, astro, @astrojs/check (+15 more)

### Community 9 - "6. Decisions log"
Cohesion: 0.16
Nodes (12): MainActivity, android.os.Bundle, com.getcapacitor.BridgeActivity, 2026-10-31: native app findings (Claude, step 6), 2026-10-31: one domain, portfolio at the root (Gokul), 2026-10-31: remaining picks accepted (Gokul: "use your picks"), 2026-10-31: save for later = option B (Gokul), 2026-10-31: service worker tooling changed during build (Claude, step 5) (+4 more)

### Community 10 - "WORKLOG: gokulmobilize"
Cohesion: 0.12
Nodes (15): Consumes, CONTRACTS: gokulmobilize (hub), Exposes, Path layout (decided 2026-10-31), Saved for later (shared with the portfolio; decided 2026-10-31, option B), SavedItem, Blockers / requests to other repos (planning chat syncs these into platform/docs/WORKLOG.md; this repo never edits others), Current state (+7 more)

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
Cohesion: 0.18
Nodes (4): @gokulsaraswat/ui, FileLink(), base, { slug }

### Community 20 - "ExampleInstrumentedTest.java"
Cohesion: 0.24
Nodes (8): ExampleInstrumentedTest, ExampleUnitTest, androidx.test.ext.junit.runners.AndroidJUnit4, assert, context, instrumentationregistry, org.junit.runner.RunWith, org.junit.Test

### Community 22 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 29 - "gokulmobilize"
Cohesion: 0.22
Nodes (9): Android APK, Decided stack (2026-10-31), Deploy (Vercel), Docs, Environment variables, gokulmobilize, License, Path layout (one domain) (+1 more)

## Knowledge Gaps
- **124 isolated node(s):** `name`, `private`, `type`, `version`, `node` (+119 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 152 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ARCHITECTURE: gokulmobilize` connect `🤖 System Architecture & Co-Worker Protocol` to `hub-config.test.ts`?**
  _High betweenness centrality (0.197) - this node is a cross-community bridge._
- **Why does `LLD` connect `hub-config.test.ts` to `render-tiles.ts`, `🤖 System Architecture & Co-Worker Protocol`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **Why does `RESEARCH-OPTIONS: gokulmobilize hub` connect `RESEARCH-OPTIONS: gokulmobilize hub` to `6. Decisions log`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _124 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hub-config.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10591133004926108 - nodes in this community are weakly interconnected._
- **Should `RESEARCH-OPTIONS: gokulmobilize hub` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `🤖 System Architecture & Co-Worker Protocol` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._