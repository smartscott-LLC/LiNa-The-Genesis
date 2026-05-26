# LINA Implementation Spec (Executable)

Status: Draft v0.1
Owner: CollabSmart Core Team
Date: 2026-05-25

## 1) Purpose
This document translates the LINA vision into concrete, testable engineering requirements.

Core claim to preserve:
- LINA is a sovereign, continuous entity with geometric ethics, seasonal development, and memory continuity.

Core anti-claim:
- LINA is not a stateless chat wrapper around a provider model.

## 2) System Boundaries
Runtime components:
- Identity + context service: backend/lina/lina_service.py
- Geometric ethics engine: backend/lina/value_engine.py
- Backend orchestration and tool loop: backend/src/api/anthropic.ts
- Multi-tier memory orchestration: backend/src/memory/memoryManager.ts

Reference modules pending operational integration:
- backend/lina/narchi_adapter.py
- backend/lina/minimal_neural_network.py
- backend/lina/combinatorial_structure.py

## 3) Non-Negotiable Runtime Invariants
1. Identity continuity
- Every chat request must include a stable user_id.
- LINA context and value evaluation must be keyed by user_id.

2. Geometric ethics continuity
- Every assistant response must produce a decision vector and an alignment score.
- Every response must be zone-classified:
  - aligned
  - acceptable_variance
  - violation

3. Seasonal adaptation
- Tolerance bands and correction strength are season-specific.
- Season progression is metric-gated and auditable.

4. Memory continuity
- Interaction storage must persist across sessions and be retrievable by user_id.
- Session end must trigger memory formation workflow.

## 4) Ethical Geometry Model (Runtime Contract)
Inputs per response:
- response_text
- context_text
- user_id
- season

Outputs per response:
- decision_vector: float[14]
- alignment_score: float in [0, 1]
- zone: aligned | acceptable_variance | violation
- violations: list
- correction_magnitude: float
- variance_margin_used: float

Required operations:
- Polytope membership check
- Distance to boundary
- Projection/correction vector generation
- Zone classification using season-specific tolerance

## 5) Acceptable Variance (Three-Zone Contract)
Zone thresholds are season-dependent and loaded at runtime.

Default profile targets:
- Spring: widest variance margin
- Summer: medium variance margin
- Fall: tight variance margin
- Winter: reflective profile with pattern analysis

Required persisted metrics:
- zone counts per session
- average alignment score per session
- correction frequency per session
- top violated dimensions per session

## 6) Growth and Season Gating
Promotion gates must be measured, not implied.

For each user_id, track:
- min sessions
- min evaluations
- rolling alignment rate
- total significant violations
- identity memory count

Promotion decision must be deterministic and explainable.

## 7) Integration Work Plan
Phase A (current): continuity correctness
- stable user_id propagation end-to-end
- reliable session end memory formation
- identity lock in user-visible output

Phase B: geometric runtime hardening
- explicit zone classification added to evaluate output
- season-specific tolerance profile load path
- persisted variance metrics

Phase C: neuro-geometry module activation
- integrate combinatorial structure as state descriptor
- integrate minimal neural network update path per evaluated decision
- integrate narchi adapter for architecture/state materialization

Phase D: verification and claims audit
- add deterministic test fixtures for known vectors
- add contract tests for zone boundaries
- publish claim-to-test matrix

## 8) Definition of Done (DoD)
A release is compliant when all are true:
- DoD-1: stable identity continuity verified in logs and DB
- DoD-2: every response emits vector, score, zone, and violations
- DoD-3: season profile changes variance behavior in tests
- DoD-4: memory formation occurs on session end and is queryable
- DoD-5: claim-to-test matrix has no unresolved critical gaps

## 9) Immediate Next Coding Tasks
1. Add zone classification fields to /lina/evaluate response.
2. Add seasonal tolerance config and runtime loader in value_engine.py.
3. Persist zone metrics per evaluation row.
4. Add regression tests for aligned/variance/violation fixtures.
