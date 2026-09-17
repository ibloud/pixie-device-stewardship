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

The first concrete specification is the [Artist File Protocol](ARTIST-FILE-PROTOCOL.md). Phase 2 extends the same stewardship principles to private health-record orientation without turning PIXIE into a clinical system or public health profile.

## PIXIE OS integration

The research specification is paired with an executable integration and test-bench implementation in [`ibloud/pixie-holdings`](https://github.com/ibloud/pixie-holdings). The two repositories have different jobs and should remain separate:

- **This repository (`pixie-device-stewardship`) is canonical for PIXIE research, evidence boundaries, methodology, safety, and specification.**
- **`pixie-holdings` is the executable integration surface:** a PIXIE OS desktop/test bench where stewardship behavior, consent gates, previews, rollback receipts, ecosystem links, and MCP-oriented workflows can be exercised.
- **`ibloud/made-sick` is the public campaign and participation surface.** It can introduce PIXIE, invite bounded participation, and connect people to the research without becoming the canonical technical repository.
- **`narrative-provenance` remains a private creator-controlled memory layer.** Private narrative material is not automatically part of the public ecosystem record.
- **`duet-engine-architecture` remains a staged architecture repository rather than a second canonical PIXIE specification.**

This separation is intentional. PIXIE is influenced by other creative, accessibility, game, cinematic, and interface worlds, but those influences are not separate competing systems. The goal is a coherent ecosystem in which each repository contributes a distinct layer while preserving clear evidence, consent, provenance, and ownership boundaries.

### PIXIE Care — the Wellness Framework / Care door

PIXIE is the constant connective presence across the ecosystem; its capabilities remain modular. Think of PIXIE as a hallway and each domain as a door. **PIXIE Care is one bounded door.** It can share the PIXIE stewardship contract and navigation vocabulary without gaining access to Creator, Holdings, or other domain data by default.

The Care specification is under [`docs/pixie-care/`](docs/pixie-care/README.md). It defines a proposed narrative exercise, independent consent moments, bounded practitioner reference material, and research evidence limits. It does **not** define a diagnostic system or clinical inference engine.

Care-session data does not automatically enter `pixie-creator-os`. A future creator export is explicitly limited to person-facing narrative text and requires separate consent; practitioner material, self-reported material, session metadata, and care-context status remain outside the creator workflow.

### PIXIE Holdings visual and interaction companion

`pixie-holdings` uses a darker, more weathered environmental language as a visual companion to this research repository. Its palette can draw from the atmosphere of quarantined civic and industrial spaces: desaturated charcoal, concrete grey, dusty brown, ash, oxidized metal, muted blue-green, and restrained emergency red, with small high-contrast signals for status and action.

This is a **thematic complement, not a literal franchise reproduction**. The visual language may evoke survival-horror, institutional, industrial, and ruined-urban environments while remaining an original PIXIE system. The purpose is to make the test bench feel like a place where system machinery, evidence, risk, and recovery are visible—not to imitate another world's characters, marks, story, or assets.

The visual relationship should therefore remain complementary:

> **PIXIE Device Stewardship** defines why the system should remember, what evidence means, and what boundaries must hold.  
> **PIXIE Holdings** lets those principles become an inspectable, consent-first system surface.

The worlds around PIXIE can influence its vocabulary—industrial spaces, archival interfaces, emergency instrumentation, creative tools, public campaigns—but they fit together through shared stewardship rules rather than through a single borrowed aesthetic. The common substrate is user control, explicit consent, reversible action, provenance, uncertainty made visible, and no silent inference.

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
- [PHASE-2-HEALTH-STEWARDSHIP.md](PHASE-2-HEALTH-STEWARDSHIP.md) — private health-record access and rollout boundary
- [docs/pixie-care/README.md](docs/pixie-care/README.md) — PIXIE Care / Wellness Framework boundary and specification
- [docs/pixie-care/REBIRTH-PLAN.md](docs/pixie-care/REBIRTH-PLAN.md) — Paragon Rebirth implementation sequence
- [EVENT-PLAYBOOK.md](EVENT-PLAYBOOK.md) — a low-load preparation and follow-up plan for the Twin Cities AI Skills Jam
- [CASE-STUDY-AI-SKILLS-JAM.md](CASE-STUDY-AI-SKILLS-JAM.md) — a privacy-protected case study for facilitators and potential partners
- [OPPORTUNITY-CREATION-PATH.md](OPPORTUNITY-CREATION-PATH.md) — a reusable path from lived barrier to bounded opportunity
- [PARTNERSHIP-BRIEF.md](PARTNERSHIP-BRIEF.md) — roles, asks, rights, and partnership boundaries
- [outreach/EVENT-CONTACT-TEMPLATE.md](outreach/EVENT-CONTACT-TEMPLATE.md) — a private-use, consent-based follow-up template
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

The PIXIE Holdings integration is an executable companion/test bench, not evidence that the research hypothesis has been validated. Integration work should therefore remain labeled `IMPLEMENTED`, `PROPOSED`, or `UNVERIFIED` according to what has actually been tested.

## License

Documentation is licensed under [CC BY 4.0](LICENSE-DOCUMENTATION). Future software in this repository is licensed under [MIT](LICENSE).
