# Paragon Rebirth Peer Review Checklist

**Status: READY FOR PEER REVIEW**

Review this implementation as a research/design specification, not as a validated clinical instrument.

## Architecture

- [ ] Mixed Emotions is treated as the emotion vocabulary / expression layer.
- [ ] Tarot / Oracle is treated as the narrative / story layer.
- [ ] Ink connects the layers without collapsing their meanings.
- [ ] Human or therapist interpretation remains outside automated inference.
- [ ] PIXIE Care remains a bounded hallway door; no automatic cross-domain data flow.

## Epistemic safety

- [ ] No card is represented as a sensor or source of unknown external facts.
- [ ] No spread predicts future events.
- [ ] No card selection is converted into a diagnosis or inferred emotional state.
- [ ] Narrative artifact properties remain distinguishable from person-level observations.
- [ ] Self-report is preserved as self-report.
- [ ] Therapist orders are distinguishable from system findings.

## Accessibility / communication

- [ ] A session can support visual/card selection.
- [ ] A session can support text where useful.
- [ ] A session can support spoken or sung response where the platform permits it.
- [ ] A person can skip or stop rather than explain.
- [ ] The interface does not require adult-style prose to communicate.
- [ ] Any additional modality is opt-in and explicitly represented in provenance.

## Research discipline

- [ ] Mixed Emotions references are treated as communication-design evidence, not proof of Ink efficacy.
- [ ] EndeavorRx is used as an evidence-program marker, not as validation of tarot or Ink.
- [ ] Any future therapeutic claim is tied to the actual PIXIE intervention, population, endpoint, comparator, duration, and safety plan.
- [ ] Research claims distinguish `DOCUMENTED`, `SELF-REPORTED`, `DESIGN ANALOGY`, `HYPOTHESIS`, and `PROPOSED`.

## Consent and provenance

- [ ] Narrative generation remains separately consented.
- [ ] Persistence remains separately consented.
- [ ] Practitioner reference creation remains separately consented.
- [ ] Transmission remains separately consented and destination-specific.
- [ ] Creator export remains separately consented and narrative-only.
- [ ] Card provenance records card family, card ID, position, selection source, prompt/rule where applicable, and necessary artifact timing.

## Peer-review questions

1. Does the Mixed Emotions layer provide useful vocabulary without becoming an inference engine?
2. Does the Tarot/Oracle layer remain clearly narrative rather than evidentiary?
3. Are there any paths by which a symbolic card can accidentally become a clinical or factual assertion?
4. Are the multimodal pathways sufficiently explicit for children and people who communicate more readily through song, images, or other media?
5. Does the therapist-ordered pathway preserve the distinction between an ordered activity and a system-generated finding?
6. Are the proposed evidence classes sufficient for later research without collecting unnecessary behavioral telemetry?
7. What direct studies would be required before making any efficacy or therapeutic claim?
8. Which parts should remain in the specification repository versus an executable test bench?
