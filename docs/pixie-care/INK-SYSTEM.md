# PIXIE Care Ink System

**Status: PROPOSED / NOT VALIDATED**

Ink is the narrative layer for the Paragon Care exercise. The system produces a structured story; it does not produce a psychological interpretation of the person.

## Five-position spread

The initial architecture uses five narrative positions. Exact card universe, archetype taxonomy, and production copy remain separate design work and must not be presented as validated clinical instruments.

For every generated spread, the runtime records the cards, positions, ordering, and deterministic rules that produced the narrative.

## Two bounded threads

### Person-facing narrative

The person receives the generated story and may respond in their own words.

The system may invite optional reflection such as: “What, if anything, do you recognize here?” The person can answer, skip, revise, or stop.

### Practitioner reference material

If and only if C3 is authorized, the system may construct a `Practitioner Reference Summary` containing:

- the generated narrative or an authorized excerpt;
- `SELF-REPORTED` material consisting only of the person's own supplied words;
- `STORY ARTIFACT PROPERTIES` consisting only of traceable properties of the generated story;
- the consent state relevant to the document;
- a mandatory non-clinical advisory.

The system must not generate psychological interpretations, diagnoses, risk flags, or clinical hypotheses.

## Evidence taxonomy

### `SELF-REPORTED`

The person's own words or a faithful transcription of those words. If the person did not say it, it does not belong here.

### `STORY ARTIFACT PROPERTIES`

A rule-traceable description of the generated artifact. Every property identifies the relevant card, position, rule, and resulting engine action where applicable.

Example:

> The Hidden Force position drew [card]. Its primary archetype tag [X] has no defined connector to the Character position card's primary archetype tag [Y]. Rule: `archetype-bridge-check`. This is a property of the generated story, not an observation about the person.

## Explicitly excluded output

The runtime must not generate labels such as:

- `INTERPRETIVE`;
- `HYPOTHESIS`;
- `PATTERNS REQUIRING EVALUATION`;
- psychological traits or states;
- clinical risk indicators;
- statements that a narrative property reveals a person's condition.

A practitioner may independently interpret material using their own training and judgment. That interpretation is outside the system-generated artifact.

## Clarifier logic

Clarifiers are narrative operations, not clinical interventions.

A clarifier may be proposed when a deterministic story rule identifies an unresolved structural condition, such as an undefined archetype connector or an incomplete narrative resolution path.

The engine records:

1. the triggering rule;
2. the structural condition;
3. the proposed clarifier;
4. whether the person explicitly accepted it;
5. the resulting story artifact.

The engine must not describe the structural condition as evidence about the person.

## Affect-labeling boundary

The person may optionally name what they recognize in the story. That voluntary response, if given, is recorded as `SELF-REPORTED`.

The system does not determine that this response constitutes affect labeling as studied in the cited literature. Whether narrative-mediated reflection has comparable effects is untested.
