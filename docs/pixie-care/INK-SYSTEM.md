# PIXIE Care Ink System

**Status: PROPOSED / NOT VALIDATED**

Ink is the narrative layer for the Paragon Rebirth / Care exercise. It produces a structured story from explicit Tarot/Oracle card metadata and deterministic rules. It does not produce a psychological interpretation of the person.

## Card architecture

The story system has two complementary card families:

- **Mixed Emotions cards** — the emotion vocabulary and multimodal expression layer. They allow a person to select, compare, arrange, or communicate feelings without requiring prose.
- **Tarot / Oracle cards** — the narrative layer. They provide archetypal roles, story tensions, resources, transitions, choices, and other story grammar.

See [`CARD-LAYERS.md`](CARD-LAYERS.md) for the full contract.

The families may interact, but a Tarot/Oracle card never silently becomes an emotional-state claim. A Mixed Emotions selection never silently becomes a diagnosis or inferred state.

## Five-position spread

The initial architecture uses five narrative positions. Exact card universe, archetype taxonomy, and production copy remain separate design work and must not be presented as validated clinical instruments.

For every generated spread, the runtime records the cards, positions, ordering, and deterministic rules that produced the narrative.

Suggested story positions:

1. **Character** — perspective or role.
2. **Challenge** — tension or obstacle.
3. **Hidden factor** — unresolved story element.
4. **Resource** — support or capacity within the story.
5. **Choice** — possible narrative directions.

These are story operations, not findings about the person.

## Two bounded threads

### Person-facing narrative

The person receives the generated story and may respond through text, image/card selection, spoken language, song, gesture, or another supported modality.

The system may invite optional reflection such as: “What, if anything, do you recognize here?” The person can answer, skip, revise, or stop.

### Practitioner reference material

If and only if C3 is authorized, the system may construct a `Practitioner Reference Summary` containing:

- the generated narrative or an authorized excerpt;
- `SELF-REPORTED` material consisting only of the person's own supplied words or explicit selections;
- `STORY ARTIFACT PROPERTIES` consisting only of traceable properties of the generated story;
- `THERAPIST_ORDER` where applicable;
- the consent state relevant to the document;
- a mandatory non-clinical advisory.

The system must not generate psychological interpretations, diagnoses, risk flags, or clinical hypotheses.

## Evidence taxonomy

### `SELF-REPORTED`

The person's own words, explicit selections, or faithful transcription of those words. If the person did not say or select it, it does not belong here.

### `STORY ARTIFACT PROPERTIES`

A rule-traceable description of the generated artifact. Every property identifies the relevant card, position, rule, and resulting engine action where applicable.

### `THERAPIST_ORDER`

An explicit practitioner instruction or activity configuration. It describes what the practitioner asked the system to do; it is not a system-generated clinical conclusion.

## Explicitly excluded output

The runtime must not generate labels such as:

- `INTERPRETIVE`;
- `HYPOTHESIS`;
- `PATTERNS REQUIRING EVALUATION`;
- psychological traits or states;
- clinical risk indicators;
- statements that a narrative property reveals a person's condition;
- claims that a card predicts an external event or reveals an unknown fact.

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

## Multimodal expression

The person should not be required to translate experience into adult-style prose. Where supported, Ink may accept:

- image/card selection;
- card arrangement;
- spoken response;
- sung response;
- text response;
- visual symbols;
- gesture or selection-based interaction;
- choosing not to explain.

The system records an explicit selection, artifact property, or self-report. It does not infer what the person “really means.”

## Affect-labeling boundary

The person may optionally name what they recognize in the story. That voluntary response, if given, is recorded as `SELF-REPORTED`.

The system does not determine that this response constitutes affect labeling as studied in the cited literature. Whether narrative-mediated reflection has comparable effects is untested.
