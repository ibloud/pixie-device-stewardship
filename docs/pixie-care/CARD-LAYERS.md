# PIXIE Care Card Layer Contract

**Status: PROPOSED / NOT VALIDATED**

This is the card-system contract for Paragon Rebirth.

## Card families

### 1. Mixed Emotions cards — emotion vocabulary layer

Mixed Emotions cards are the backbone for emotional language and multimodal expression.

They may be used to:

- select an emotion word or visual representation;
- compare multiple feelings;
- arrange feelings in relation to a story;
- identify a preferred feeling or desired direction;
- offer an alternate communication route when prose is difficult;
- support a therapist-selected evaluation activity when explicitly ordered.

They do **not** establish that the selected emotion is objectively present. A selection is an interaction or self-report unless the person explicitly states something stronger in their own words.

### 2. Tarot / Oracle cards — narrative layer

Tarot and oracle cards supply the symbolic story grammar.

They may define:

- archetypal roles;
- narrative positions;
- tensions;
- resources;
- transitions;
- choices;
- story prompts;
- visual motifs.

They do **not** function as sensors or evidence about unknown external reality.

## Composition rule

The two families may interact, but they remain semantically distinct:

```text
Mixed Emotions card
  = expression / vocabulary object

Tarot / Oracle card
  = narrative / story object
```

A narrative rule may ask the person to select an emotion card in response to a tarot/oracle story element. It may not automatically assign an emotion to the person.

## Example

```text
Tarot / Oracle:
  Challenge → The Storm

Narrative prompt:
  "What feeling belongs with this part of the story?"

Person selects:
  worried + determined

Recorded:
  SELF-REPORTED / SELECTED VOCABULARY
```

Not permitted:

```text
The Storm → therefore the person is anxious.
```

## Therapist-ordered configuration

A therapist may configure an activity with explicit authorization. The configuration can specify:

- available Mixed Emotions cards;
- available Tarot/Oracle cards;
- spread positions;
- response modalities;
- prompt text;
- whether the session is for reflection or evaluation;
- whether a practitioner reference summary may be created.

A therapist order is recorded as `THERAPIST_ORDER`. It is not converted into an automated clinical conclusion.

## Provenance

Every card event should retain:

- `card_family`;
- `card_id`;
- `position` when applicable;
- `selection_source` (`SYSTEM`, `PERSON`, `THERAPIST_ORDER`);
- `prompt_id` when applicable;
- `timestamp` where required by the consented artifact;
- `rule_id` when a system rule caused the event.

The implementation must preserve enough provenance for peer review without collecting unrelated behavioral telemetry.

## Research boundary

The Mixed Emotions material is a communication-design reference, not proof of a therapeutic effect for PIXIE or Ink. Direct evaluation of the actual combined card interaction is required before making efficacy claims.
