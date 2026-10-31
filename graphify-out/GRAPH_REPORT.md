# Graph Report - gokulmobilize  (2026-10-31)

## Corpus Check
- 30 files · ~10,614 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .example 1, .ico 1)

## Summary
- 168 nodes · 174 edges · 19 communities (15 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `06496bb9`
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
- Kickoff prompt: gokulmobilize
- package.json
- hub-config.ts
- Base.astro
- pull_request_template.md
- COLLABORATORS.md
- SECURITY.md
- dependencies
- scripts
- devDependencies
- tsconfig.json
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `🤖 System Architecture & Co-Worker Protocol` - 8 edges
2. `gokulmobilize` - 8 edges
3. `scripts` - 7 edges
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

## Communities (19 total, 4 thin omitted)

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
Cohesion: 0.14
Nodes (10): ARCHITECTURE: gokulmobilize, HLD, LLD, Size (production build, gzip), ref_node_assert, ref_node_test, createConfigStore(), KeyValueStorage (+2 more)

### Community 5 - "RESEARCH-OPTIONS: gokulmobilize hub"
Cohesion: 0.10
Nodes (20): 1.1 Comparison, 1.2 Capacitor facts that shape the design, 1.3 Capacitor plugins (all MIT unless noted; versions from npm), 1.4 Starters to borrow from (config only, not code), 1. Native wrapper: Capacitor and alternatives, 2026-10-31: one domain, portfolio at the root (Gokul), 2026-10-31: remaining picks accepted (Gokul: "use your picks"), 2.1 Service worker (+12 more)

### Community 6 - "README.md"
Cohesion: 0.08
Nodes (19): AGENTS.md: gokulmobilize, Consumes, CONTRACTS: gokulmobilize (hub), Exposes, Path layout (decided 2026-10-31), Decided stack (2026-10-31), Deploy (Vercel), Docs (+11 more)

### Community 7 - "Kickoff prompt: gokulmobilize"
Cohesion: 0.33
Nodes (5): 3. gokulmobilize, COLLABORATOR ADD-ON, Kickoff prompt: gokulmobilize, REPO SECTION, SHARED BLOCK

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (15): engines, node, name, private, type, version, astro, @astrojs/check (+7 more)

### Community 9 - "hub-config.ts"
Cohesion: 0.18
Nodes (5): @gokulsaraswat/config, idb-keyval, ConfigStore, idbStorage, tileMeta

### Community 10 - "Base.astro"
Cohesion: 0.25
Nodes (3): @gokulsaraswat/ui, base, { slug }

### Community 14 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, astro, @astrojs/react, @gokulsaraswat/config, @gokulsaraswat/ui, idb-keyval, react, react-dom

### Community 15 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, astro, build, dev, lint, preview, test

### Community 16 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, @astrojs/check, @types/node, @types/react, @types/react-dom, typescript

### Community 17 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

## Knowledge Gaps
- **96 isolated node(s):** `name`, `private`, `type`, `version`, `node` (+91 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 112 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `KeyValueStorage` connect `hub-config.test.ts` to `hub-config.ts`?**
  _High betweenness centrality (0.333) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _96 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hub-config.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._
- **Should `RESEARCH-OPTIONS: gokulmobilize hub` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._