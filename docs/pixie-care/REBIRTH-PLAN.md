# Paragon Rebirth Plan — PIXIE Care

**Status: PROPOSED implementation sequence**

Paragon Rebirth is treated as a bounded PIXIE Care narrative module, not as a clinical engine and not as a Creator OS subsystem.

## Phase 1 — Contract

1. Adopt the PIXIE hallway model: PIXIE is the connective presence; Care is a bounded door/module.
2. Establish C1–C5 independent consent transitions.
3. Define deletion and secondary-use rules.
4. Establish the two permitted generated output classes: `SELF-REPORTED` and `STORY ARTIFACT PROPERTIES`.
5. Prohibit machine-generated psychological interpretation, clinical hypotheses, and risk signals.

**Exit criterion:** every consequential transition has an explicit purpose, consent state, destination, and reversal/deletion behavior.

## Phase 2 — Ink narrative engine

1. Implement the five-position spread as deterministic data.
2. Define the card universe and archetype metadata separately from clinical concepts.
3. Implement rule-traceable narrative generation.
4. Implement clarifiers only for narrative-structure conditions.
5. Record which rule fired and what the engine changed.

**Exit criterion:** the same input produces the same documented story structure and rule trace; no engine output describes the person's psychological state.

## Phase 3 — Person-facing session

1. Present the consent gate before generation.
2. Generate the narrative only after C1.
3. Offer optional reflection without requiring emotional disclosure.
4. Record voluntary responses only as `SELF-REPORTED`.
5. Allow stopping without penalty.

**Exit criterion:** a person can generate, reflect, stop, and decline storage without hidden persistence.

## Phase 4 — Practitioner reference

1. Create the reference summary only after C3.
2. Include the mandatory advisory.
3. Restrict content to the narrative, `SELF-REPORTED`, `STORY ARTIFACT PROPERTIES`, and necessary consent context.
4. Require C4 and named-recipient confirmation before transmission.

**Exit criterion:** the system never emits a clinical finding, inference, diagnosis, risk signal, or treatment recommendation.

## Phase 5 — Creator boundary

C5 permits only an explicit copy/export of the person-facing narrative text into a creator or other non-care workflow.

The following never cross the boundary through this export:

- practitioner reference material;
- `SELF-REPORTED` material;
- story-artifact property records;
- consent records;
- session metadata;
- care-context status.

**Exit criterion:** exported creative text is a copy; the Care session remains in its own context.

## Phase 6 — Evidence and evaluation

1. Preserve source-level citations and population/context limits.
2. Keep affect-labeling research clearly separated from claims about the PIXIE interaction.
3. Do not claim efficacy before direct evaluation of the actual interaction.
4. Record implementation status as `PROPOSED`, `IMPLEMENTED`, or `UNVERIFIED` based on tests.

**Exit criterion:** no product claim outruns the evidence.

## Relationship to Paragon-Reborn

`ibloud/Paragon-Reborn` remains the Return to the Void game project and its architecture/roadmap. Its current repository contract describes it as a pre-production project hub for the MOBA concept, with browser rule experiments in `veiled-dominion-engine`. The PIXIE Care narrative module should not be inserted into that game repository unless a future explicit architecture decision establishes that relationship.

The name “Paragon Rebirth” in this document refers to the Care/narrative implementation plan developed in the PIXIE ecosystem, not an assertion that the existing Paragon-Reborn game repository owns Care.

## Current repository decision

The canonical specification home is `ibloud/pixie-device-stewardship`, whose README already identifies that repository as canonical for PIXIE research, evidence boundaries, methodology, safety, and specification. The executable surface, when implementation is ready, may live in an explicitly designated module/repository without collapsing the specification boundary.
