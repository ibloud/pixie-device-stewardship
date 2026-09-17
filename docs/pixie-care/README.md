# PIXIE Care

**Status: PROPOSED / NOT CLINICALLY VALIDATED**

PIXIE Care is the bounded care-context module in the PIXIE ecosystem. PIXIE remains the connective presence across the ecosystem; Care is one door in that hallway, not a capability that silently follows the person into every other room.

## Purpose

PIXIE Care defines a consent-first narrative exercise using a structured spread and optional reflection. It is intended as an adjunct to clinician-directed care, not a diagnostic tool, therapeutic intervention, clinical service, or replacement for professional care.

The design does not claim that tarot, narrative generation, or this implementation produces the effects observed in affect-labeling research. Research findings are treated as evidence about studied behaviors and populations; their relevance to this exercise is an explicitly untested design hypothesis.

## Boundary

Care owns:

- the narrative spread interaction;
- the person's voluntary reflection;
- explicit consent for each consequential action;
- local session artifacts when separately authorized;
- a practitioner reference summary when separately authorized;
- provenance of the generated story and rule trace.

Care does not own:

- diagnosis or clinical assessment;
- inference about psychological state;
- automated clinical hypotheses or risk flags;
- silent emotion detection;
- transmission to a practitioner without separate authorization;
- secondary research, training, or design use without separate authorization;
- automatic export into creator workflows.

## PIXIE hallway model

PIXIE is the connective layer. Each capability is a bounded module behind a door:

`PIXIE → Care → narrative exercise`

`PIXIE → Creator → creative workstation`

`PIXIE → Stewardship → device/file governance`

`PIXIE → Holdings → market/test-bench surface`

Being present in more than one room does not grant one room access to another room's data. Cross-room movement is an explicit export operation governed by the destination context.

## Core artifacts

- `CONSENT-CONTRACT.md` — independent consent moments and revocation rules.
- `INK-SYSTEM.md` — spread, narrative, and rule-trace architecture.
- `PRACTITIONER-REFERENCE-SUMMARY.md` — bounded practitioner-facing output.
- `RESEARCH-BASIS.md` — evidence, analogy, and hypothesis boundaries.
- `REBIRTH-PLAN.md` — implementation sequence and exit criteria.

## Implementation state

This directory is a specification layer. A specification is not evidence that the described behavior has been implemented or validated. Any future runtime must link claims of implementation to executable tests.
