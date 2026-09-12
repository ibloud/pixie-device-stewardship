# PIXIE Device Stewardship

**The person describes their intent. The system handles its machinery.**

PIXIE is an accessibility-first research and design campaign from Loptr Lab and Made Sick. It examines a recurring failure in creative technology: operating systems and production tools routinely make people remember filenames, folders, versions, storage locations, and recovery procedures that software can derive and manage.

This repository documents the hypothesis, evidence boundaries, participatory research method, prototype requirements, and campaign for change. It begins with creative production because artists generate many related files while attention belongs on the work—not on file administration.

PIXIE does not diagnose neurodivergence, infer emotions, monitor people secretly, or replace clinical care. It proposes user-controlled assistance that learns explicit preferences, recognizes interaction friction, explains its uncertainty, and acts only with permission.

## The hypothesis

Current device organization transfers avoidable cognitive labor from software to people. This disproportionately burdens people with attention, memory, executive-function, fatigue, or cognitive-access needs.

If a device can understand a person's project, collaborators, recent actions, and stated preferences, it should be able to:

- suggest meaningful names and locations;
- preserve versions and provenance;
- retrieve work through natural language;
- explain where an item went;
- offer reversible organization actions; and
- help the person resume after interruption.

See [HYPOTHESIS.md](HYPOTHESIS.md).

## What changes first

The initial campaign focuses on music, video, game development, design, and independent creative studios. These workflows make the problem visible quickly: many files, many applications, many versions, many collaborators, and frequent context switching.

The first concrete specification is the [Artist File Protocol](ARTIST-FILE-PROTOCOL.md).

## Evidence labels

- `DOCUMENTED` — directly supported by a preserved source.
- `OBSERVED` — a witness's direct account of an event or pattern.
- `SELF-REPORTED` — a person's account of their own experience.
- `ATTRIBUTED` — a statement explicitly attributed to its speaker.
- `INTERPRETIVE` — analysis derived from evidence.
- `HYPOTHESIS` — a proposition that requires testing.
- `PROPOSED` — a design or intervention not yet validated.

These labels prevent personal experience, interpretation, and product claims from being presented as the same kind of truth.

## Repository guide

- [HYPOTHESIS.md](HYPOTHESIS.md) — the claim and its limits
- [METHODOLOGY.md](METHODOLOGY.md) — consent-first research and testing
- [ARTIST-FILE-PROTOCOL.md](ARTIST-FILE-PROTOCOL.md) — human-language creative-file intake
- [SAFETY-AND-PRIVACY.md](SAFETY-AND-PRIVACY.md) — prohibited behaviors and data boundaries
- [CAMPAIGN.md](CAMPAIGN.md) — Apple-first, cross-platform change strategy
- [SOURCES.md](SOURCES.md) — official guidance and submission channels
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — constructive participation rules
- [MODERATION.md](MODERATION.md) — shielded intake, documentation, and appeals
- [GOVERNANCE.md](GOVERNANCE.md) — review and decision authority
- [CASE-STUDY-TEMPLATE.md](CASE-STUDY-TEMPLATE.md) — de-identified evidence collection
- [MADE-SICK-INTEGRATION.md](MADE-SICK-INTEGRATION.md) — recommended role on made-sick.org
- [blog/2026-09-12-the-system-should-remember.md](blog/2026-09-12-the-system-should-remember.md) — launch post
- [outreach/apple-feedback.md](outreach/apple-feedback.md) — Apple product-feedback submission

## Relationship to Made Sick and Story Lab

Made Sick is the public campaign and participation surface. PIXIE is the maintained research and specification project. Individual productions may document where an insight arose, but they do not become PIXIE's canonical home.

People whose experiences reveal a design failure are not automatically participants, endorsers, research subjects, or public case studies. Names and identifying material require a separate, explicit basis for publication.

## Current status

`HYPOTHESIS` and `PROPOSED`. The file-naming problem has originating evidence, but the general claim and proposed interventions require consented testing with a broader group.

## License

Documentation is licensed under [CC BY 4.0](LICENSE-DOCUMENTATION). Future software in this repository is licensed under [MIT](LICENSE).
