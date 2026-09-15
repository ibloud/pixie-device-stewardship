# Inpatient Corridors integration boundary

`ibloud/inpatient-corridors-review` is an independent Loptr Lab project. PIXIE Device Stewardship may provide architecture patterns for consent, provenance, reversible actions, and accessibility, but it does not become the project's authority or controller.

## Relationship

- **Inpatient Corridors owns:** game mechanics, narrative, original assets, project decisions, participation, attribution, and publication.
- **PIXIE Device Stewardship owns:** stewardship research, evidence boundaries, consent patterns, safety constraints, and technical stewardship specifications.
- **PIXIE Holdings may exercise:** executable test-bench behavior and ecosystem navigation.
- **Made Sick may communicate:** bounded public participation and campaign context.

## Required boundary

Any future technical integration must preserve:

1. explicit user consent before consequential actions;
2. visible consequence previews;
3. local/private provenance unless separately authorized;
4. reversible operations and rollback receipts where an operation changes project state;
5. no silent inference, secret monitoring, or unauthorized file changes;
6. no automatic publication or attribution on behalf of Inpatient Corridors;
7. independent ownership and withdrawal rights.

This document is an architecture link, not a claim that a live PIXIE runtime currently controls or integrates with Inpatient Corridors.

## Build relationship

The intended path is:

`Inpatient Corridors -> bounded project surfaces -> PIXIE stewardship patterns -> optional PIXIE Holdings test bench`

The repositories remain separate so that the project can evolve independently while sharing a clear, inspectable stewardship contract.
