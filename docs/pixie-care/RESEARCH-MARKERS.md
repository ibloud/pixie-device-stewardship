# PIXIE Care Research Markers

**Status: RESEARCH MARKERS / NOT VALIDATION**

These markers are used to design the Paragon Rebirth / Ink system without confusing narrative usefulness with claims that tarot can reveal or predict facts about life outside the observable interaction.

## 1. Paragon hero systems: use known rules to expose the fault

Return to the Void / Paragon-Reborn describes an explicit game-rule architecture: heroes, cards, abilities, costs, cooldowns, status effects, shared schemas, expected outcomes, and server-authoritative gameplay state. The repository explicitly says capabilities are planned unless linked to working source, tests, or a published demo. citehttps://github.com/ibloud/Paragon-Reborn/blob/main/README.md

This creates a useful engineering contrast for tarot.

### In a hero system

A hero ability can have a defined effect because the game author controls the state space and rules. If a card says an ability costs X, has cooldown Y, and applies status Z, those are properties of the designed game world. A test fixture can establish an expected result.

### In a tarot reading

A spread does not provide an equivalent authoritative state model for the world outside the reading. A card's symbolic meaning is not a sensor, database query, causal model, or validated predictor of an external person's behavior, a future event, a diagnosis, or an unknown fact.

Therefore an Ink engine must never silently convert:

`symbolic card property -> claim about external reality`

The permitted transformation is:

`symbolic card property -> narrative prompt -> optional person response -> self-reported material`

### Hero-system fault model applied to tarot

The Paragon engineering discipline says to prefer small verified behavior over an untested abstraction and not claim cross-engine parity without shared fixtures and test results. citehttps://github.com/ibloud/Paragon-Reborn/blob/main/docs/ARCHITECTURE.md

For Ink, the analogous faults are:

| Game-system fault | Tarot analogue | PIXIE response |
|---|---|---|
| Undefined ability effect | Undefined divinatory meaning | Store explicit card metadata and narrative rule; do not invent external facts |
| Unauthoritative state | Treating a symbolic draw as knowledge of the world | Label it as generated narrative material |
| Hidden side effect | A reading quietly becoming a prediction | Require explicit transition from narrative to any user-authored reflection |
| Untested balance rule | Claim that a spread reveals useful life information | Mark as hypothesis and test the actual interaction |
| Cross-engine mismatch | Different readers/systems produce incompatible meanings | Use deterministic machine rules for the prototype; never claim universal tarot semantics |
| Generic error message | Vague statement that “the cards say” something | Expose the exact card, position, rule, and wording source |
| Persistence without authority | Saving sensitive interpretations as facts | Persist only explicitly authorized artifacts and self-reported words |

## 2. The epistemic boundary: tarot is not an oracle interface

The system may support symbolic reflection, storytelling, journaling, metaphor, or structured conversation. Those uses do not require a claim that the cards contain privileged information about external reality.

The system must not present a reading as evidence that:

- a future event will occur;
- another person has a particular intention or feeling;
- a medical or psychological condition exists;
- an unknown fact has been discovered;
- a supernatural mechanism has produced information;
- a person's life trajectory has been objectively revealed.

If a person says that a narrative resonates with their experience, the system can preserve that statement as `SELF-REPORTED`. Resonance is not converted into external-world verification.

## 3. EndeavorRx: research markers for a regulated digital therapeutic

EndeavorRx is an FDA-authorized prescription digital therapeutic for improving attention function in children with ADHD, with its indication tied to a specific population and a specific computer-based attention measure. The company states that it should be used as part of a therapeutic program and is not a stand-alone treatment. citehttps://www.endeavorrx.com/

The FDA review describes five clinical studies involving more than 600 children and identifies a pivotal randomized, double-blind, digitally controlled study of 348 children aged 8–12. The primary endpoint was change in the TOVA Attention Performance Index. citehttps://www.accessdata.fda.gov/cdrh_docs/reviews/DEN200026.pdf

### What this gives PIXIE as a research marker

It demonstrates the *shape of an evidence program*, not evidence for PIXIE Care:

1. Define the intended population.
2. Define the exact intervention.
3. Define the mechanism or design feature being tested.
4. Define measurable endpoints before testing.
5. Specify a comparator/control condition where appropriate.
6. Predefine duration and exposure.
7. Track adverse events and usability/safety signals.
8. Analyze the actual outcome measure rather than a broad impression of “helpfulness.”
9. Keep the authorized indication narrower than any tempting general claim.
10. Treat regulatory authorization as attached to the studied product, indication, population, and evidence—not to a general category such as “games.”

### PIXIE implication

If PIXIE Care ever becomes a therapeutic product, a future evidence program must study the actual PIXIE interaction. Tarot's cultural history, popularity, or subjective resonance cannot substitute for that evidence.

For the present project, EndeavorRx is therefore a **research-method marker**, not a clinical precedent that validates Ink.

## 4. Mixed Emotions / alexithymia: communication design marker

The Mixed Emotions alexithymia page summarizes research on difficulty identifying and describing emotions and describes affect labeling as putting feelings into words. It then says the cards are designed to help people identify and articulate feelings and *may* prove helpful for alexithymia. That is a proposed application, not evidence that the card deck treats alexithymia. citehttps://www.mixed-emotions.com/alexithymia

This distinction matters for PIXIE: a visual or symbolic card can function as an **external communication object** without being treated as a diagnostic instrument or truth detector.

### Children, song, and visual media

The Mixed Emotions page itself does not establish a specific evidence base for children who learn language through song or other visual media. That population claim should therefore not be attributed to that page.

Separate research does support investigating multimodal communication pathways. A 2024 systematic review/meta-analysis of 18 randomized controlled trials involving 1,457 children with autism reported improvements in language communication and social skills in the included music-therapy studies, while also showing substantial heterogeneity across outcomes. citehttps://pubmed.ncbi.nlm.nih.gov/38774719/

Research on visual scene displays likewise examines image-based communication supports for young children with autism and/or intellectual/developmental disabilities who have speech or speech-related disabilities. citehttps://pubmed.ncbi.nlm.nih.gov/41306410/

### PIXIE implication

For a child who communicates more readily through song, images, symbols, gesture, or other media, Ink can be designed as a **multimodal expression surface**:

- image/card selection;
- optional spoken or sung response;
- text where useful;
- visual sequence and color/shape cues;
- gesture or selection-based response where the platform supports it;
- no requirement that the child translate experience into adult-style prose.

The purpose is to make expression easier, not to infer what the child “really means.”

## 5. Research-marker hierarchy

The three references should occupy different layers:

### A. Paragon / hero systems — engineering marker

Question: **Can the rule be explicitly defined and tested?**

Use this to design deterministic Ink mechanics and expose failure states.

### B. EndeavorRx — clinical-evidence marker

Question: **What would a real evidence program have to measure if we eventually made a therapeutic claim?**

Use this to design future research endpoints, population definitions, safety monitoring, and evidence discipline.

### C. Mixed Emotions + multimodal communication research — interaction marker

Question: **Can symbolic/visual/audio material provide another route for a person to identify or communicate an experience?**

Use this to design accessible expression pathways without converting them into diagnostic inference.

## 6. What these markers do NOT establish

Together, these sources do not establish that tarot readings predict the future, reveal hidden facts, diagnose conditions, or provide clinically useful information about life outside the interaction.

They support a narrower and testable proposition:

> A structured symbolic narrative may be designed as a consent-first reflection and communication interface. Whether that interface produces useful outcomes—and for whom—must be determined by direct evaluation of the actual interface.

That proposition remains `HYPOTHESIS` until tested.
