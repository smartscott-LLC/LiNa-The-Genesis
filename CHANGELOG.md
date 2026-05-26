# Changelog

All notable changes to this project will be documented in this file.

Format: Keep a Changelog style with semantic release intent.

## [Unreleased]

### Added
- Added implementation contract doc for LINA runtime: docs/lina-implementation-spec.md
- Added ADR for contract-driven geometric runtime: docs/adr/0001-lina-geometric-runtime.md
- Added root changelog scaffold for architectural traceability.
- Added three-zone value classification runtime fields: aligned, acceptable_variance, violation.
- Added seasonal tolerance profile support for runtime variance handling.
- Added persistent per-evaluation metrics: zone, boundary_distance, season, variance_margin_used.
- Added startup-safe schema expansion for Phase B columns in LINA service.
- Added websocket event `chat:evaluation` to stream LINA evaluation telemetry to clients.
- Added frontend live log rendering for Phase B evaluation fields (zone, score, correction, season, variance margin).
- Added a user-controlled Session setting to hide/show LINA evaluation telemetry in Live Logs (persisted locally per browser).

### Changed
- (Pending merge verification) Stable user_id propagation from frontend to backend chat payload.
- (Pending merge verification) Reliable LINA session-end invocation using tracked socket session ID.
- (Pending merge verification) Identity guard appended to backend system prompt and output normalization to LINA naming.

### Fixed
- (Pending merge verification) OpenRouter empty-key shadowing by using first non-empty API key selection.
- (Pending merge verification) OpenRouter required headers setup for provider path.

### Notes
- This project tracks both implementation and claim compliance.
- Future entries should include a Claim Impact section when behavior affects LINA identity, continuity, or geometric ethics.
