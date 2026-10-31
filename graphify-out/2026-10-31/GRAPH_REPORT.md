# Graph Report - gokulmobilize  (2026-10-31)

## Corpus Check
- 35 files · ~12,401 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 4, .example 1, .ico 1)

## Summary
- 191 nodes · 210 edges · 19 communities (16 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b41e9bf3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 🤖 System Architecture & Co-Worker Protocol
- Prompt Playbook — CLAUDE.md Workflow
- Codebase Blueprint & Structural Graph
- sync-architecture.sh
- hub-config.test.ts
- RESEARCH-OPTIONS: gokulmobilize hub
- README.md
- saved-items.ts
- package.json
- WORKLOG: gokulmobilize
- pull_request_template.md
- COLLABORATORS.md
- SECURITY.md
- dependencies
- scripts
- devDependencies
- tsconfig.json
- vercel.json
- render-tiles.ts

## God Nodes (most connected - your core abstractions)
1. `gokulmobilize` - 8 edges
2. `scripts` - 8 edges
3. `🤖 System Architecture & Co-Worker Protocol` - 8 edges
4. `RESEARCH-OPTIONS: gokulmobilize hub` - 7 edges
5. `Prompt Playbook — CLAUDE.md Workflow` - 7 edges
6. `WORKLOG: gokulmobilize` - 6 edges
7. `2. PWA tooling, storage, data layer` - 6 edges
8. `CONTRACTS: gokulmobilize (hub)` - 5 edges
9. `1. Native wrapper: Capacitor and alternatives` - 5 edges
10. `6. Decisions log` - 5 edges

## Surprising Connections (you probably didn't know these)
- `LLD` --references--> `KeyValueStorage`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/hub-config.ts
- `Blockers / requests to other repos` --references--> `SavedItem`  [INFERRED]
  WORKLOG.md → src/lib/saved-items.ts
- `LLD` --references--> `listSaved()`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/saved-items.ts
- `LLD` --references--> `toSavedList()`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/saved-items.ts
- `Saved for later (shared with the portfolio; decided 2026-10-31, option B)` --references--> `SavedItem`  [INFERRED]
  docs/CONTRACTS.md → src/lib/saved-items.ts

## Import Cycles
- None detected.

## Communities (19 total, 3 thin omitted)

### Community 0 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.25
Nodes (8): 🔄 Auto-Sync: System Architecture & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📉 Token-Optimized Communication Mode, 🧪 Verification Scope (Token-Efficient Testing)

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
Cohesion: 0.09
Nodes (22): 1.1 Comparison, 1.2 Capacitor facts that shape the design, 1.3 Capacitor plugins (all MIT unless noted; versions from npm), 1.4 Starters to borrow from (config only, not code), 1. Native wrapper: Capacitor and alternatives, 2026-10-31: one domain, portfolio at the root (Gokul), 2026-10-31: remaining picks accepted (Gokul: "use your picks"), 2026-10-31: save for later = option B (Gokul) (+14 more)

### Community 6 - "README.md"
Cohesion: 0.09
Nodes (17): AGENTS.md: gokulmobilize, ARCHITECTURE: gokulmobilize, HLD, Size (production build, gzip), 3. gokulmobilize, COLLABORATOR ADD-ON, Kickoff prompt: gokulmobilize, REPO SECTION (+9 more)

### Community 7 - "saved-items.ts"
Cohesion: 0.24
Nodes (10): LLD, ref_node_assert, ref_node_test, render(), toRow(), isSavedItem(), listSaved(), removeSaved() (+2 more)

### Community 8 - "package.json"
Cohesion: 0.09
Nodes (19): engines, node, name, private, type, version, astro, @astrojs/check (+11 more)

### Community 10 - "WORKLOG: gokulmobilize"
Cohesion: 0.15
Nodes (12): Consumes, CONTRACTS: gokulmobilize (hub), Exposes, Path layout (decided 2026-10-31), Saved for later (shared with the portfolio; decided 2026-10-31, option B), SavedItem, Blockers / requests to other repos, Current state (2026-10-31) (+4 more)

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

### Community 19 - "render-tiles.ts"
Cohesion: 0.18
Nodes (5): @gokulsaraswat/config, @gokulsaraswat/ui, base, tileMeta, { slug }

## Knowledge Gaps
- **104 isolated node(s):** `1. High-Level Design (HLD) Topology`, `2. Current Target Directory Tree`, `3. Low-Level Design (LLD) & SOLID Class Schemas`, `Current state (2026-10-31)`, `Done` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 116 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `idb-keyval` connect `hub-config.test.ts` to `package.json`, `saved-items.ts`?**
  _High betweenness centrality (0.223) - this node is a cross-community bridge._
- **Why does `ARCHITECTURE: gokulmobilize` connect `README.md` to `saved-items.ts`?**
  _High betweenness centrality (0.212) - this node is a cross-community bridge._
- **Why does `LLD` connect `saved-items.ts` to `hub-config.test.ts`, `README.md`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **What connects `1. High-Level Design (HLD) Topology`, `2. Current Target Directory Tree`, `3. Low-Level Design (LLD) & SOLID Class Schemas` to the rest of the system?**
  _104 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RESEARCH-OPTIONS: gokulmobilize hub` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._