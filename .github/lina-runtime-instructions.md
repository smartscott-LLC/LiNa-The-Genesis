# LINA Runtime Instructions

These instructions complement repository guidance and are focused on identity-faithful implementation.

## North Star
Build and maintain LINA as a continuous sovereign system where:
- identity is stable,
- ethics is geometric and computable,
- memory drives continuity and growth,
- season progression is metric-gated.

## Coding Constraints
1. Identity continuity first:
- never rely only on transient session IDs for user continuity
- prefer stable user_id for context, memory, and season metrics

2. Ethics must remain computable:
- do not replace vector/geometry outputs with plain text policy checks
- preserve numeric telemetry for every response evaluation

3. Variance is required:
- maintain three-zone behavior (aligned, acceptable_variance, violation)
- ensure seasonal tolerance profiles are explicit and testable

4. Memory must be auditable:
- session end should trigger memory formation
- retrieval should influence runtime context
- promotions should be traceable to thresholds

## PR/Commit Checklist
- [ ] Updated CHANGELOG.md
- [ ] Updated ADR if architectural behavior changed
- [ ] Added or updated tests for behavior claims
- [ ] Verified logs/metrics for new runtime fields

## Anti-Patterns
- Prompt-only identity enforcement without backend continuity state.
- Binary aligned/unaligned simplification that removes variance zone.
- Hidden behavior changes without changelog and ADR updates.
