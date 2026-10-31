# Graph Report - gokulmobilize  (2026-10-31)

## Corpus Check
- 32 files · ~11,477 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 4, .example 1, .ico 1)

## Summary
- 181 nodes · 188 edges · 21 communities (17 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27246c1c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- gokulmobilize
- Prompt Playbook — CLAUDE.md Workflow
- Codebase Blueprint & Structural Graph
- sync-architecture.sh
- hub-config.test.ts
- RESEARCH-OPTIONS: gokulmobilize hub
- 🤖 System Architecture & Co-Worker Protocol
- Kickoff prompt: gokulmobilize
- package.json
- render-tiles.ts
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
- build-sw.mjs

## God Nodes (most connected - your core abstractions)
1. `scripts` - 8 edges
2. `🤖 System Architecture & Co-Worker Protocol` - 8 edges
3. `gokulmobilize` - 8 edges
4. `Prompt Playbook — CLAUDE.md Workflow` - 7 edges
5. `RESEARCH-OPTIONS: gokulmobilize hub` - 7 edges
6. `WORKLOG: gokulmobilize` - 6 edges
7. `2. PWA tooling, storage, data layer` - 6 edges
8. `KeyValueStorage` - 5 edges
9. `createConfigStore()` - 5 edges
10. `1. Native wrapper: Capacitor and alternatives` - 5 edges

## Surprising Connections (you probably didn't know these)
- `LLD` --references--> `KeyValueStorage`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/hub-config.ts

## Import Cycles
- None detected.

## Communities (21 total, 4 thin omitted)

### Community 0 - "gokulmobilize"
Cohesion: 0.25
Nodes (8): Decided stack (2026-10-31), Deploy (Vercel), Docs, Environment variables, gokulmobilize, License, Path layout (one domain), Run / build

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
Cohesion: 0.14
Nodes (9): idb-keyval, ref_node_assert, ref_node_test, ConfigStore, createConfigStore(), idbStorage, KeyValueStorage, cachedConfig (+1 more)

### Community 5 - "RESEARCH-OPTIONS: gokulmobilize hub"
Cohesion: 0.09
Nodes (21): 1.1 Comparison, 1.2 Capacitor facts that shape the design, 1.3 Capacitor plugins (all MIT unless noted; versions from npm), 1.4 Starters to borrow from (config only, not code), 1. Native wrapper: Capacitor and alternatives, 2026-10-31: one domain, portfolio at the root (Gokul), 2026-10-31: remaining picks accepted (Gokul: "use your picks"), 2026-10-31: service worker tooling changed during build (Claude, step 5) (+13 more)

### Community 6 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.09
Nodes (17): AGENTS.md: gokulmobilize, 🔄 Auto-Sync: System Architecture & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📉 Token-Optimized Communication Mode (+9 more)

### Community 7 - "Kickoff prompt: gokulmobilize"
Cohesion: 0.33
Nodes (5): 3. gokulmobilize, COLLABORATOR ADD-ON, Kickoff prompt: gokulmobilize, REPO SECTION, SHARED BLOCK

### Community 8 - "package.json"
Cohesion: 0.11
Nodes (16): engines, node, name, private, type, version, astro, @astrojs/check (+8 more)

### Community 10 - "WORKLOG: gokulmobilize"
Cohesion: 0.33
Nodes (6): Blockers / requests to other repos, Current state (2026-10-31), Done, In progress / next, Reminders, WORKLOG: gokulmobilize

### Community 14 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, astro, @astrojs/react, @gokulsaraswat/config, @gokulsaraswat/ui, idb-keyval, react, react-dom

### Community 15 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, astro, build, dev, generate-pwa-assets, lint, preview, test

### Community 16 - "devDependencies"
Cohesion: 0.25
Nodes (8): devDependencies, @astrojs/check, @types/node, @types/react, @types/react-dom, typescript, @vite-pwa/assets-generator, workbox-build

### Community 17 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 18 - "vercel.json"
Cohesion: 0.40
Nodes (4): cleanUrls, headers, redirects, rewrites

### Community 19 - "Base.astro"
Cohesion: 0.25
Nodes (3): @gokulsaraswat/ui, base, { slug }

### Community 20 - "build-sw.mjs"
Cohesion: 0.67
Nodes (3): workbox-build, cleanHtmlUrls(), toCleanUrl()

## Knowledge Gaps
- **103 isolated node(s):** `name`, `private`, `type`, `version`, `node` (+98 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 119 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `KeyValueStorage` connect `hub-config.test.ts` to `🤖 System Architecture & Co-Worker Protocol`?**
  _High betweenness centrality (0.327) - this node is a cross-community bridge._
- **Why does `LLD` connect `🤖 System Architecture & Co-Worker Protocol` to `hub-config.test.ts`?**
  _High betweenness centrality (0.322) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _103 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hub-config.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1437908496732026 - nodes in this community are weakly interconnected._
- **Should `RESEARCH-OPTIONS: gokulmobilize hub` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `🤖 System Architecture & Co-Worker Protocol` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._