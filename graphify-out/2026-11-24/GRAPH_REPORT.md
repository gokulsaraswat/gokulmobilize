# Graph Report - gokulmobilize  (2026-11-24)

## Corpus Check
- 69 files · ~50,339 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 25 file(s) not represented in the graph (top: .xml 10, (none) 6, .properties 2)

## Summary
- 503 nodes · 518 edges · 45 communities (32 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2fa6fb35`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Cancellation — Temporal Workflow
- Prompt Playbook — CLAUDE.md Workflow
- Codebase Blueprint & Structural Graph
- sync-architecture.sh
- hub-config.test.ts
- RESEARCH-OPTIONS: gokulmobilize hub
- 🤖 System Architecture & Co-Worker Protocol
- 5.20.3 Trip Data Model Changes
- package.json
- 6. Decisions log
- WORKLOG: gokulmobilize
- pull_request_template.md
- COLLABORATORS.md
- SECURITY.md
- dependencies
- scripts
- LLD — Project Repository Initial Setup & Architecture
- tsconfig.json
- vercel.json
- Base.astro
- ExampleInstrumentedTest.java
- bundle-apps.mjs
- gradlew
- WORKLOG
- PLANNING-CHAT-PROMPT.md
- CONTEXT: read this first in every new session
- LLD — System Flows & Diagrammatic Specifications
- 1.4 Mermaid — Cancellation Sequence Diagrams
- Ideas: One Platform, Many Apps
- REPO SECTIONS
- Supply Cancellation Execute — Success / Failure Event Flow
- CX Cancellation Flow
- 6.6 Refund Quote Entity
- Prompt Playbook — CLAUDE.md Workflow
- 🤖 System Architecture & Co-Worker Protocol
- Repo Kit (every repo must have these)
- Agent/sync-architecture.sh
- COLLABORATOR-DESIGN-CHAT-PROMPT.md
- prompts/PLANNING-CHAT-PROMPT.md

## God Nodes (most connected - your core abstractions)
1. `WORKLOG` - 20 edges
2. `Ideas: One Platform, Many Apps` - 14 edges
3. `Cancellation — Temporal Workflow` - 10 edges
4. `LLD — Project Repository Initial Setup & Architecture` - 10 edges
5. `scripts` - 10 edges
6. `🤖 System Architecture & Co-Worker Protocol` - 10 edges
7. `REPO SECTIONS` - 9 edges
8. `WORKLOG: gokulmobilize` - 9 edges
9. `CONTEXT: read this first in every new session` - 9 edges
10. `gokulmobilize` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Saved for later (shared with the portfolio; decided 2026-10-31, option B)` --references--> `SavedItem`  [INFERRED]
  docs/CONTRACTS.md → src/lib/saved-items.ts
- `Requests waiting for the `platform` repo (collected from repo logs; platform chat applies, planning chat syncs)` --references--> `SavedItem`  [INFERRED]
  docs/master/WORKLOG.md → src/lib/saved-items.ts
- `Blockers / requests to other repos (planning chat syncs these into platform/docs/WORKLOG.md; this repo never edits others)` --references--> `SavedItem`  [INFERRED]
  WORKLOG.md → src/lib/saved-items.ts
- `LLD` --references--> `KeyValueStorage`  [INFERRED]
  docs/ARCHITECTURE.md → src/lib/hub-config.ts
- `2026-10-31: native app findings (Claude, step 6)` --references--> `MainActivity`  [INFERRED]
  docs/RESEARCH-OPTIONS.md → android/app/src/main/java/com/gokulsaraswat/gokulmobilize/MainActivity.java

## Import Cycles
- None detected.

## Communities (45 total, 13 thin omitted)

### Community 0 - "Cancellation — Temporal Workflow"
Cohesion: 0.07
Nodes (29): 1.1 Purpose, 1.2 Key design decisions, 1.3 Workflow settings, 1. Overview, 2.1 Three-phase flow, 2.2 Multi-pod signal routing, 2. Architecture, 3.1 Step sequence (+21 more)

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
Cohesion: 0.07
Nodes (30): ARCHITECTURE: gokulmobilize, HLD, LLD, Native app (Android, Capacitor 8.5), Release pipeline, Size (production build, gzip), @gokulsaraswat/config, idb-keyval (+22 more)

### Community 5 - "RESEARCH-OPTIONS: gokulmobilize hub"
Cohesion: 0.11
Nodes (17): 1.1 Comparison, 1.2 Capacitor facts that shape the design, 1.3 Capacitor plugins (all MIT unless noted; versions from npm), 1.4 Starters to borrow from (config only, not code), 1. Native wrapper: Capacitor and alternatives, 2.1 Service worker, 2.2 iOS PWA constraints, 2.3 "Save for later" storage (+9 more)

### Community 6 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.07
Nodes (25): AGENTS.md: gokulmobilize, 🔄 Auto-Sync: System Architecture & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), Context, 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), STANDING RULES (from Gokul, apply in every session) (+17 more)

### Community 7 - "5.20.3 Trip Data Model Changes"
Cohesion: 0.07
Nodes (26): 5.20.1 Overview, 5.20.2.1 Overview, 5.20.2.2 Segment entries, 5.20.2.3 Ancillary entries, 5.20.2.4 Sample hold response (abbreviated), 5.20.2.5 Key principles, 5.20.2 Hold Response Changes, 5.20.3.1 Overview (+18 more)

### Community 8 - "package.json"
Cohesion: 0.06
Nodes (32): devDependencies, @astrojs/check, @capacitor/cli, @types/node, @types/react, @types/react-dom, typescript, @vite-pwa/assets-generator (+24 more)

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

### Community 16 - "LLD — Project Repository Initial Setup & Architecture"
Cohesion: 0.08
Nodes (24): 1.1 Purpose, 1.2 Tech Stack, 1.3 High-Level System Context, 1. Executive Summary & Tech Stack, 2.1 Gradle Multi-Module Layout, 2.2 Package Tree (ASCII), 2.3 Module Responsibilities, 2. Directory & Module Structure (+16 more)

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

### Community 32 - "LLD — System Flows & Diagrammatic Specifications"
Cohesion: 0.10
Nodes (19): 2.1 Scope, 2.2 Triggers, 2.3 Functional Breakdown (Low-Level), 2.4 Mermaid — Refund Sequence (Primary Path), 2.5 Mermaid — Manual Refund Sequence (§5.13), 2. Post-Booking Refund Flow, 3.1 Mermaid Class Diagram, 3.2 Dependency Rules (Class Level) (+11 more)

### Community 33 - "1.4 Mermaid — Cancellation Sequence Diagrams"
Cohesion: 0.11
Nodes (18): 1.1 Scope, 1.2 Actors & Boundaries, 1.3 Functional Breakdown (Low-Level), 1.4.1 Discovery, 1.4.2 Quote, 1.4.3 Execute, 1.4.4 Callback & Workflow Completion, 1.4.5 Status Poll (+10 more)

### Community 34 - "Ideas: One Platform, Many Apps"
Cohesion: 0.13
Nodes (14): 10. Open questions, 11. Excellidraw opensource, 1. Vision, 2. Current state (checked in repos), 3. Framework, 4. Content & CMS, 5. Roles (super admin → app admins), 6. Shared packages (so "every component works everywhere") (+6 more)

### Community 35 - "REPO SECTIONS"
Cohesion: 0.14
Nodes (13): 1. platform (first), 2. admin, 3. gokulmobilize, 4. bestportofolio, 5. Progress (GSpace), 6. Markdown-studio  (TO BE UPDATED: scope still open, revisit after the first 5 repos), 7. checkers-gym-management  (TO BE UPDATED: scope still open, revisit after admin works), 8. gokul-omni-converter  (TO BE UPDATED: standalone, not part of the web platform) (+5 more)

### Community 36 - "Supply Cancellation Execute — Success / Failure Event Flow"
Cohesion: 0.18
Nodes (10): 1. Overview, 2. Actors, 3. Success Path, 4.1 Agent Action (Manual Queue), 4. Failure Path, 5. Flow Diagram, 6. Notes, ASCII (+2 more)

### Community 37 - "CX Cancellation Flow"
Cohesion: 0.22
Nodes (8): Actors, CX Cancellation Flow, Flowchart, Notes, Open Issue — `quote_id` on Execute, Phase 1 — Cancel Discovery (via Trips), Phase 2 — Refund Discovery (Quote), Phase 3 — Cancellation Execute

### Community 38 - "6.6 Refund Quote Entity"
Cohesion: 0.22
Nodes (8): 6.6 Refund Quote Entity, 6.6 Refund Quote Entity (Redis), Design principles, Field reference, Penalty fields, Quote API vs Redis (example), Redis JSON, Relationship to §6.5 Snapshot

### Community 39 - "Prompt Playbook — CLAUDE.md Workflow"
Cohesion: 0.25
Nodes (7): 1. Starting a New Folder / Project, 2. Starting with an Existing Project, 3. The "After-Command" Chaser, 4. Start / Debug Prompt Template, 5. Session Wrap-Up Prompt Template, 6. The Context Recovery Prompt (Anti-Hallucination Trigger), Prompt Playbook — CLAUDE.md Workflow

### Community 40 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.29
Nodes (6): ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📉 Token-Optimized Communication Mode

### Community 41 - "Repo Kit (every repo must have these)"
Cohesion: 0.33
Nodes (5): Definition of done (any step), Deploy-ready rules (every repo), Master docs (live in `platform/docs/`), Repo Kit (every repo must have these), Shared constants (from `@gokulsaraswat/ui`, same on every app)

### Community 42 - "Agent/sync-architecture.sh"
Cohesion: 0.70
Nodes (3): edge(), node(), sync-architecture.sh script

## Knowledge Gaps
- **311 isolated node(s):** `1. High-Level Design (HLD) Topology`, `2. Current Target Directory Tree`, `3. Low-Level Design (LLD) & SOLID Class Schemas`, `1. Starting a New Folder / Project`, `2. Starting with an Existing Project` (+306 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 354 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SavedItem` connect `WORKLOG: gokulmobilize` to `hub-config.test.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `idb-keyval` connect `hub-config.test.ts` to `package.json`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `1. High-Level Design (HLD) Topology`, `2. Current Target Directory Tree`, `3. Low-Level Design (LLD) & SOLID Class Schemas` to the rest of the system?**
  _311 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cancellation — Temporal Workflow` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `hub-config.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06567992599444958 - nodes in this community are weakly interconnected._
- **Should `RESEARCH-OPTIONS: gokulmobilize hub` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `🤖 System Architecture & Co-Worker Protocol` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._