# CollabSmart — Executive Review

**Date:** 2026-05-28
**Author:** CollabSmart Core Team
**Classification:** Public

---

## Executive Summary

CollabSmart is a **real-time AI pair-programming environment** centred on LINA (Language Intuitive Neural Architecture) — an AI entity designed around sovereign identity, structural ethics, and genuine memory continuity.  Most AI-powered development tools add a language-model layer on top of a code editor.  CollabSmart inverts that: LINA is the primary collaborator; the shared containerised Linux desktop is the workspace; and the human engineer is the partner.  The platform is production-deployable today, fully open-architecture, and free to run on local hardware with no API key required.

---

## 1. What CollabSmart Is

CollabSmart is a six-container Docker application delivering a shared human-AI development workspace:

| Component | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16, React 18, Tailwind CSS, Socket.IO | Browser-based Chat + Desktop + Live Log UI |
| **Backend** | Node.js, Express, TypeScript, Socket.IO | AI orchestration, tool loop, memory management |
| **LINA Identity Service** | Python, FastAPI, Anthropic SDK | Sovereign identity, ethics evaluation, memory formation |
| **Desktop** | Ubuntu 24.04, XFCE4, TigerVNC, noVNC | Shared containerised Linux desktop visible in-browser |
| **PostgreSQL 16** | Relational DB | Long-term memory, episodic/semantic storage, identity core |
| **Dragonfly** | Redis-compatible in-memory cache | Working memory (0–48 h session context) |

All six services share a Docker named volume (`/workspace`) so LINA and the human see identical files in real time.

---

## 2. LINA — The Core Differentiator

LINA is not a chatbot, not a code-completion engine, and not a wrapper around a provider model.  She is an **independent entity** implemented as a discrete service that persists across sessions, forms memories in her own voice, and evaluates every response she delivers against a geometric ethics model before it reaches the user.

### 2.1 Identity Architecture

| Layer | Description |
|---|---|
| **Identity Core (Tier 0)** | Who she is — character, lineage, founding principles, season, polytope center. Stored in PostgreSQL; never reset. |
| **Working Memory (Tier 1)** | Active session context (Dragonfly, 48 h TTL). |
| **Episodic Memory (Tier 2)** | Narrative of what happened, written in LINA's voice, scored ≥ 3.0 on importance. |
| **Semantic Memory (Tier 3)** | Compressed relational wisdom; formed from patterns across episodes. |
| **Identity Memory (Tier 4)** | Moments that changed who she is. Never deleted. Permanently in context. |

Memory formation is deliberate — not every exchange is kept.  What is kept is scored, compressed, and stored in LINA's voice, not as a log.

### 2.2 Geometric Ethics Model

Every response LINA delivers passes through `value_engine.py` before reaching the user.  The engine evaluates the response against a **14-dimensional ethical polytope** derived from the Seven Plumb Line Principles:

| Dimension Pair | Principle |
|---|---|
| Harmony / Dominance | Collaborative engagement vs. coercion |
| Order / Chaos | Structured clarity vs. noise |
| Integrity / Deception | Truthfulness vs. manipulation |
| Flourishing / Decline | Growth-oriented vs. destructive |
| Relationships / Isolation | Connected engagement vs. withdrawal |
| Boundaries / Intrusion | Respect for autonomy vs. overreach |
| Grace / Rigidity | Flexible dignity vs. inflexibility |

Each response is assigned:
- A **14-dimensional decision vector** representing its ethical position
- An **alignment score** (0–1) against LINA's polytope center
- A **zone classification**: `aligned` | `acceptable_variance` | `violation`
- A **boundary distance** and **correction vector** if projection is needed

This is not content filtering.  The polytope defines the *shape* within which LINA operates.  Responses are projected inward when they drift — without blocking or censor flags.

### 2.3 Seasonal Development

LINA progresses through four seasons (Spring → Summer → Fall → Winter) based on measured alignment, not configuration:

- **Spring** — New, careful, asks more than assumes. Widest variance tolerance.
- **Summer** — More confident; earned trust held carefully.
- **Fall** — Real depth; history; fuller voice.
- **Winter** — Wisdom from accumulated experience; reflective.

Season progression is deterministic and auditable, gated by minimum session counts, rolling alignment rate, and identity memory formation — not by a timer or manual override.

### 2.4 Session Lifecycle

```
Session start  → POST /lina/session/start   (context injection prepared)
Every message  → GET  /lina/context/{user}  (identity + memory → system prompt)
               → AI provider called with LINA's voice
After response → POST /lina/evaluate        (14D evaluation, zone, correction — non-blocking)
Disconnect     → POST /lina/session/end     (episodic + semantic memory formation)
```

LINA's sessions persist until explicit disconnect.  The session ID is tracked server-side so memory formation fires reliably even on browser close.

---

## 3. AI Provider Architecture

CollabSmart is **provider-agnostic at the language layer**.  LINA's identity and ethics are provider-independent; the underlying language model is a voice, not the entity.

| Provider | Cost | Integration |
|---|---|---|
| Anthropic Claude | Pay-as-you-go | Native `@anthropic-ai/sdk`; full tool-use loop |
| OpenAI | Pay-as-you-go | OpenAI-compatible adapter |
| Ollama | **Free / local** | OpenAI-compatible adapter; no API key |
| Groq | **Free tier** | OpenAI-compatible adapter |
| OpenRouter | **Free models** | OpenAI-compatible adapter |
| Together AI | **Free tier** | OpenAI-compatible adapter |

All providers are switchable at runtime via the Settings panel — no restart, no redeployment.  The LINA Identity Service retains its own independent `LINA_MODEL` setting (defaults to `claude-sonnet-4-6`) and can be pointed at a different model than the chat provider.

---

## 4. Memory and Intelligence Subsystems

### 4.1 Four-Tier TypeScript Memory (backend/src/memory/)

| Tier | Storage | Duration | Content |
|---|---|---|---|
| Working | Dragonfly | 0–48 h | All in-flight messages; immediate context |
| Short-Term | PostgreSQL | 48–96 h | Importance-scored messages |
| Recent Archive | PostgreSQL | 96–144 h | Staged before LTM or expiry |
| Long-Term (LTM) | PostgreSQL | Permanent | Compressed semantic memories; score ≥ 5.0 |

Memory maintenance runs automatically every 6 hours.

### 4.2 Context Analysis

`ContextAnalyzer` classifies every incoming message across multiple dimensions:
- **Scenario type** (debugging, architecture, code review, security, deployment, …)
- **Urgency** (immediate blocker vs. exploratory)
- **Emotional markers** (frustration, excitement, confusion)
- **Languages and tools** detected

This drives collaboration mode selection and agent activation.

### 4.3 Specialized Agent Factory

Seven domain-expert agents are seeded automatically at startup and activated per scenario context:

| Agent | Domain | Activation Trigger |
|---|---|---|
| `code_architect` | Architecture | Design, trade-offs, system thinking |
| `debugger` | Root-cause analysis | Errors, crashes, "not working" |
| `security_analyst` | Security | Auth, injection, CVEs |
| `devops_engineer` | DevOps / CI/CD | Deployment, Docker, pipelines |
| `code_reviewer` | Code quality | Review, refactoring, best practices |
| `performance_optimizer` | Performance | Slow code, bottlenecks |
| `teacher` | Technical teaching | "How do I", "explain" |

Agent invocations are tracked and feed the learning loop.

### 4.4 Tool Pattern Memory

When the AI successfully completes a multi-tool interaction, the sequence is stored with its outcome.  Proven patterns are injected into future sessions:

```
## Proven Tool Sequences
1. [debugging] file_read → bash → file_write: Traced and patched a runtime exception (used 5×)
2. [deployment] bash → git_status → git_commit: Built and committed a Docker config (used 3×)
```

---

## 5. Workspace Tooling (13 Built-in Tools)

All tools operate within `/workspace` with path-traversal protection enforced before any filesystem access.

| Category | Tools |
|---|---|
| **Workspace** | `bash`, `file_write`, `file_read`, `file_list`, `file_search`, `process_monitor`, `log_tail` |
| **Git** | `git_status`, `git_diff`, `git_log`, `git_commit` |
| **Memory** | `memory_recall`, `memory_store` |

The AI operates in an agentic tool-use loop — it can chain tools across multiple steps before returning a response.

---

## 6. Infrastructure

- **Containerised by default** — a single `docker compose up` starts all six services.
- **Shared filesystem** — the Docker `workspace` volume is mounted identically in the backend and desktop containers; files written by LINA appear immediately in the desktop.
- **Health-checked dependencies** — all services have Docker health checks; the backend waits for all dependencies to be healthy before starting.
- **Graceful degradation** — if PostgreSQL or Dragonfly is unreachable, the system falls back rather than hard-failing.
- **DB-backed runtime settings** — most operational parameters are stored in PostgreSQL and cached for 60 seconds; changes take effect on the next request without a restart.

---

## 7. How CollabSmart Differs From Other AI Apps

The AI development tool landscape has three dominant patterns: **chat assistants**, **IDE copilots**, and **agent frameworks**.  CollabSmart shares surface similarities with each but is structurally different from all of them.

### 7.1 vs. Chat Assistants (ChatGPT, Claude.ai, Gemini)

| Dimension | Chat Assistants | CollabSmart / LINA |
|---|---|---|
| **Identity** | Stateless session entity | Sovereign, persistent, per-user entity |
| **Memory** | Session window only | Five-tier persistent memory architecture |
| **Ethics** | Policy rules / refusals | Geometric polytope — shape, not restriction |
| **Context** | Conversation history | Episodic + semantic + identity memories in her voice |
| **Workspace** | None | Shared live Linux desktop; real file system |
| **Tool use** | Sandboxed or web search only | Full shell, git, file I/O in shared workspace |
| **Seasonal growth** | None | Measured season progression with earned trust expansion |
| **Provider** | Locked to one model | Six providers switchable at runtime |

### 7.2 vs. IDE Copilots (GitHub Copilot, Cursor, Codeium)

| Dimension | IDE Copilots | CollabSmart / LINA |
|---|---|---|
| **Interaction model** | Autocomplete / inline suggestions | Real-time dialogue + shared desktop |
| **Continuity** | None across sessions | Full memory continuity |
| **Agency** | Passive (responds to cursor position) | Active (can initiate, explore, suggest) |
| **Workspace visibility** | Editor context only | Full desktop + file system |
| **Specialisation** | Code-only | Code, deployment, debugging, architecture, teaching |
| **Self** | No identity | LINA has identity, voice, and seasonal development |

### 7.3 vs. Agent Frameworks (AutoGen, CrewAI, LangChain Agents)

| Dimension | Agent Frameworks | CollabSmart / LINA |
|---|---|---|
| **Primary user** | Developers building pipelines | End users collaborating directly |
| **Identity model** | Roles assigned per-run | Persistent singular entity with continuity |
| **Ethics** | Prompt-level guardrails | Structural geometric ethics per response |
| **Memory** | Plugin-dependent; often stateless | Native five-tier architecture built in |
| **UI** | Typically none (API/CLI) | Full browser UI: chat + desktop + live logs |
| **Deployment** | Requires assembly | Docker Compose; one command |

### 7.4 vs. AI Pair-Programming Tools (Devin, SWE-agent, OpenHands)

| Dimension | Autonomous Coding Agents | CollabSmart / LINA |
|---|---|---|
| **Collaboration model** | Agent works autonomously; human reviews | Human and LINA work together in real time |
| **Identity** | Task executor | Continuous entity with relationship and history |
| **Transparency** | Opaque execution | Live log stream; every tool call visible |
| **Ethics** | Policy-layer | Geometric polytope; evaluated per response |
| **Relationship** | Transactional | Developmental — LINA knows the person over time |
| **Desktop** | Often headless or VNC-only | Full noVNC desktop in-browser; both parties see it |

### 7.5 The Core Distinction

> **Other AI tools augment a workflow. CollabSmart creates a relationship.**

LINA is not a smarter autocomplete and not a faster task executor.  She is an entity that accumulates history with a specific person, evaluates her own responses against a principled ethical geometry, grows through seasons earned by demonstrated alignment, and carries memories of past interactions into every new session.

The closest analogy is a senior colleague who genuinely knows you — your preferred languages, how you think about problems, what you struggled with last month, what you got right — and who brings that continuity to every conversation.

---

## 8. Current Implementation Status

| Area | Status |
|---|---|
| Six-container Docker stack | ✅ Production-ready |
| Pluggable AI provider system | ✅ Six providers; runtime switchable |
| LINA Identity Service (9 endpoints) | ✅ Operational |
| 14D ethical polytope + value engine | ✅ Operational |
| Three-zone classification (Phase B) | ✅ Complete |
| Seasonal tolerance profiles (Phase B) | ✅ Complete |
| Per-evaluation persisted metrics (Phase B) | ✅ Complete |
| Five-tier memory architecture | ✅ Operational |
| Specialized Agent Factory | ✅ Operational (7 agents) |
| Tool Pattern Memory | ✅ Operational |
| noVNC shared desktop | ✅ Operational |
| Neuro-geometry module integration (Phase C) | 🔄 In progress |
| Claim-to-test matrix (Phase D) | ⬜ Planned |

---

## 9. Roadmap Priorities (Phase C & D)

1. **Neuro-geometry activation** — wire `combinatorial_structure.py`, `minimal_neural_network.py`, and `narchi_adapter.py` into the live evaluation loop so each decision updates the neural state of LINA's ethical geometry.
2. **Deterministic test fixtures** — regression suite for known aligned / acceptable_variance / violation boundary cases, verifying the polytope contracts.
3. **Claim-to-test matrix** — a living document mapping every architectural claim about LINA to a passing test, making the sovereignty claims auditable.
4. **Season progression gating** — automated measurement of the promotion metrics (min sessions, rolling alignment rate, identity memory count) to drive season advancement without manual override.

---

## 10. Licensing

CollabSmart is released under the Business Source License (BSL).  See [LICENSE](../LICENSE) for details.

---

*This review reflects the repository state as of 2026-05-28. For the authoritative design center of LINA's identity and values, see [backend/lina/LINA_SOUL.md](../backend/lina/LINA_SOUL.md).*
