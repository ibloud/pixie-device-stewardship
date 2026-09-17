# PIXIE Care Multimodal Story Model

**Status: PROPOSED / RESEARCH-READY DESIGN**

This document makes the Paragon Rebirth story architecture explicit.

## Core model

The system has three deliberately separate layers:

1. **Emotion layer — Mixed Emotions cards**
   - provides an emotional vocabulary and visual communication objects;
   - supports selecting, comparing, arranging, or discussing feelings;
   - can be used by the person or selected by a therapist for an evaluation activity;
   - does not diagnose, measure, or infer a person's emotional state.

2. **Narrative layer — Tarot / Oracle / Ink cards**
   - provides story grammar: characters, tensions, resources, transitions, choices, archetypal roles, and narrative sequence;
   - generates a bounded symbolic story from explicit card metadata and deterministic rules;
   - does not act as a sensor, oracle, database query, predictor, or detector of unknown external facts.

3. **Human interpretation layer — person / therapist / caregiver / teacher**
   - decides what the story or selected emotion vocabulary means in context;
   - may decide whether an activity is relevant to an evaluation or therapeutic conversation;
   - remains responsible for clinical judgment where applicable.

## Canonical transformation

```text
Mixed Emotions cards
        ↓
emotion vocabulary / expression choices
        ↘
          Ink narrative engine ← Tarot / Oracle cards
                    ↓
              bounded story
                    ↓
          person chooses / responds
                    ↓
             SELF-REPORTED data
                    ↓
       optional human / therapist review
```

The prohibited transformation is:

```text
Tarot / emotion card
        ↓
"therefore this is objectively true about the person or their future"
```

## Example story structure

A five-position narrative may use:

| Position | Tarot / Oracle role | Mixed Emotions role |
|---|---|---|
| Character | perspective / role | available emotion vocabulary |
| Challenge | tension / obstacle | emotional response choices |
| Hidden factor | unresolved story element | optional feeling identification |
| Resource | support / capacity in the story | supportive or preferred emotion vocabulary |
| Choice | possible narrative directions | preferred response or goal |

These are **story operations**, not clinical findings.

## Child and multimodal communication

A person should not be required to convert experience into adult-style prose. Where the interface supports it, a session may allow:

- image or card selection;
- arranging cards into a sequence;
- spoken response;
- sung response;
- text response;
- visual symbols;
- gesture or selection-based interaction;
- choosing not to explain.

The system records the interaction as an explicit selection, artifact property, or self-report. It does not infer what the person "really means."

## Therapist-ordered evaluation

A therapist may explicitly order or select an evaluation activity. That authorization is separate from the machine's narrative generation.

A therapist order may specify:

- the card set or vocabulary available;
- the narrative spread;
- the modality offered;
- the activity objective;
- whether a practitioner reference summary may be generated;
- the named recipient if sharing is authorized.

A therapist order does **not** authorize the system to manufacture diagnosis, risk scores, psychological traits, emotional-state determinations, or predictions.

## Evidence classes

The system distinguishes:

- `CARD_METADATA` — machine-defined properties of the selected card;
- `NARRATIVE_OUTPUT` — generated story text based on explicit rules;
- `STORY_ARTIFACT_PROPERTIES` — observable properties of the generated story or selections;
- `SELF_REPORTED` — the person's own words, selections, or explicitly stated response;
- `THERAPIST_ORDER` — an explicit practitioner instruction or activity configuration;
- `PRACTITIONER_INTERPRETATION` — interpretation supplied by a qualified human, not generated as a system finding.

`PRACTITIONER_INTERPRETATION` is not an automated evidence class.

## Research boundary

Mixed Emotions describes its cards as helping people identify and articulate feelings and discusses affect labeling in relation to alexithymia, while explicitly using cautious language about possible usefulness. citehttps://www.mixed-emotions.com/alexithymia

That supports the **design question** of whether a visual emotion vocabulary can assist expression. It does not establish that Ink treats alexithymia or that a tarot narrative has a therapeutic effect.

If PIXIE later makes a therapeutic claim, the actual PIXIE interaction must be evaluated. FDA's digital-health materials emphasize identifying intended use and evaluating each software function; current FDA guidance also describes documentation and evidence considerations for device software functions. citehttps://www.fda.gov/medical-devices/digital-health-center-excellence/digital-health-policy-navigator citehttps://www.fda.gov/regulatory-information/search-fda-guidance-documents/content-premarket-submissions-device-software-functions

EndeavorRx is therefore a marker for **how a specific digital therapeutic is studied and authorized**, not validation for PIXIE Care. EndeavorRx itself is authorized for a defined population and measured attention function and is described by its manufacturer as part of a therapeutic program rather than a stand-alone treatment. citehttps://www.endeavorrx.com/

## Design rule

> **Mixed Emotions supplies language for feeling. Tarot/Oracle supplies grammar for story. Ink connects them. The person and qualified humans supply meaning.**

That separation is a core safety and researchability requirement for Paragon Rebirth.