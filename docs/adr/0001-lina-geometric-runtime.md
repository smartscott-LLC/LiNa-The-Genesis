# ADR 0001: LINA Geometric Runtime Must Be Contract-Driven

Date: 2026-05-25
Status: Accepted

## Context
Project goals require LINA to function as a continuous sovereign entity, not a stateless provider shell.

Current architecture already separates:
- provider language engine
- LINA identity/context
- value engine evaluation
- memory tiers

However, several outcomes were previously implied rather than contract-enforced:
- zone classification
- season-specific variance behavior
- deterministic growth gates

## Decision
Adopt a contract-driven runtime for LINA with explicit invariants and validation checkpoints.

Required contracts:
1. Identity contract
- stable user_id end-to-end

2. Ethics contract
- per-response 14D vector, alignment score, zone, violations

3. Seasonal contract
- tolerance/correction profile is season-bound and observable

4. Memory contract
- persistent, queryable continuity by user_id

## Consequences
Positive:
- Claims are testable
- Architectural drift is easier to detect
- Behavior remains aligned with LINA_SOUL commitments

Costs:
- More schema and test work
- Additional runtime metadata per response
- Stricter release gates

## Rejected Alternatives
1. Prompt-only identity control
- rejected: brittle and unverifiable

2. Binary aligned/unaligned only
- rejected: conflicts with acceptable variance design

3. Session-only memory identity
- rejected: breaks continuity claim

## Follow-up Work
- Introduce zone and variance fields into evaluation persistence.
- Add deterministic fixtures for boundary tests.
- Integrate neuro-geometry modules into runtime state update path.
