# Changelog

All notable changes to this project will be documented in this file.

Format: Keep a Changelog style with semantic release intent.

## [Unreleased]

### Added
- Exhaustive executive review document: docs/EXECUTIVE_REVIEW.md

---

## [1.1.0] — 2026-05-26

### Added
- Implementation contract document for LINA runtime: docs/lina-implementation-spec.md
- ADR for contract-driven geometric runtime: docs/adr/0001-lina-geometric-runtime.md
- Three-zone value classification runtime fields: `aligned`, `acceptable_variance`, `violation`.
- Seasonal tolerance profile support for runtime variance handling (Spring / Summer / Fall / Winter).
- Persistent per-evaluation metrics: `zone`, `boundary_distance`, `season`, `variance_margin_used`.
- Startup-safe schema migration (`ensure_phase_b_schema`) for Phase B columns in LINA service.
- WebSocket event `chat:evaluation` to stream LINA evaluation telemetry to clients.
- Frontend live log rendering for Phase B evaluation fields (zone, score, correction, season, variance margin).
- User-controlled Session setting to hide/show LINA evaluation telemetry in Live Logs (persisted locally per browser).

### Changed
- Stable `user_id` propagation from frontend to backend chat payload.
- Reliable LINA session-end invocation using tracked socket session ID.
- Identity guard appended to backend system prompt; output normalization to LINA naming.

### Fixed
- OpenRouter empty-key shadowing: first non-empty API key is now selected correctly.
- OpenRouter required `HTTP-Referer` and `X-Title` headers added to provider path.

---

## [1.0.0] — 2026-05-10

### Added
- Initial public release of CollabSmart.
- Six-container Docker Compose stack: PostgreSQL 16, Dragonfly, Ubuntu XFCE4 desktop, LINA Identity Service (FastAPI), backend (Express + Socket.IO), frontend (Next.js 16).
- Pluggable AI provider system supporting Anthropic Claude, OpenAI, Ollama, Groq, OpenRouter, and Together AI — switchable at runtime.
- LINA Identity Service with 9 endpoints, 14-dimensional ethical polytope (value_engine.py), and five-tier memory architecture.
- Four-tier TypeScript memory system: Dragonfly working memory (0–48 h), PostgreSQL short-term (48–96 h), recent archive (96–144 h), and permanent long-term memory.
- Specialized Agent Factory seeding seven domain-expert agents on first startup.
- Tool Pattern Memory: successful multi-tool sequences stored and injected into future sessions.
- 13 built-in workspace/git/memory tools with path-traversal protection.
- Full Socket.IO event protocol (client↔server) and documented REST API.
- Dark-themed three-pane UI: Chat, shared XFCE4 desktop (noVNC), and live log sidebar.
- DB-backed runtime settings with 60-second cache (no restart required for most changes).
- O*NET occupation enrichment integration (optional).
- LINA_SOUL.md founding document as the authoritative design center.

### Notes
- This project tracks both implementation and claim compliance.
- Future entries should include a Claim Impact section when behavior affects LINA identity, continuity, or geometric ethics.
