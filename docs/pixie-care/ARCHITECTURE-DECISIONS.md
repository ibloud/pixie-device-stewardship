# PIXIE Care Architecture Decisions

**Status: PROPOSED**

## ADR-001 — PIXIE is the hallway, Care is a door

PIXIE is the persistent connective presence across the ecosystem. Care is a bounded module. Shared identity or navigation does not imply shared access to Care-session data.

## ADR-002 — Care is not a clinical inference engine

The runtime may generate narrative content and trace its own deterministic story rules. It does not infer psychological state or generate clinical hypotheses, risk flags, diagnoses, or treatment recommendations.

## ADR-003 — Two generated evidence classes

Machine-generated practitioner material is restricted to `SELF-REPORTED` and `STORY ARTIFACT PROPERTIES`. The former contains the person's words; the latter contains traceable properties of the generated story.

## ADR-004 — Consent is per consequence

Generation, storage, practitioner-document creation, transmission, and non-care export are separate consent moments C1–C5.

## ADR-005 — Creator export is narrative-only

C5 can export a copy of the person-facing narrative text. No practitioner content, self-reported material, story metadata, consent record, or care-context status crosses into a creator workflow.

## ADR-006 — Research claims do not become product claims

Affect-labeling and related literature can establish what was observed under the studied conditions. It cannot establish that PIXIE Care produces the same effects. Direct validation would require study of the actual interaction.

## ADR-007 — Repository boundaries remain explicit

`pixie-device-stewardship` is the canonical PIXIE research/specification boundary. `Paragon-Reborn` remains the Return to the Void game project. `pixie-creator-os` remains the creator workstation. `pixie-holdings` remains the executable holdings/test-bench surface. No cross-repository feature is assumed merely because PIXIE connects the ecosystem.
