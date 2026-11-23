# PIXIE Device Stewardship

**Developers and technical reviewers:** [Start with the PIXIE developer testing guide](docs/DEVELOPER-TESTING.md) for reproducible software checks, current limitations, AT Protocol references, open issues and safe contribution boundaries. No personal data or hardware modification is required for the initial test phase.

## Loptr Lab mission and participation

Loptr Lab is a pre-seed, people-over-profit, accessibility-first venture working toward a self-sustaining model within a capitalist economy. Money sustains the work; meaningful change for people is its purpose. We accept funding only on terms that keep people and accessibility first. Our long-term vision includes universal basic income. We aim to bring change to life and leave a transparent record of what we tried, what worked, and what failed so others can carry it forward. This mission governs our projects, funding decisions, and partnerships; it is not a temporary marketing position.

Current open review and contribution opportunities are voluntary and unpaid. Before work begins, agree in writing on scope, time, what will be public, credit preferences, and an exit path. You can stop at any point. Participation does not promise employment, ownership, revenue share, academic credit, or future pay. Any paid commission or other formal arrangement requires a separate signed agreement before work begins. External assistance or benefits belong to the participant and are not compensation from Loptr Lab.

Financial support is optional and sustains infrastructure, maintenance, accessibility work, and documented development. Paying does not buy contributor status, canon authority, approvals, ownership, or employment. Participation and accessibility are not sponsorship rewards. Project-specific licenses and existing signed agreements continue to apply.

[Full mission and participation terms](https://github.com/ibloud/ibloud.github.io/blob/main/MISSION.md).

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

The research specification is paired with an executable integration and test-bench implementation in [PIXIE Holdings](https://github.com/ibloud/pixie-holdings). Repository boundaries remain distinct: this repository is canonical for research, evidence boundaries, methodology, safety, and specification; Holdings is the executable test bench; Made Sick is the campaign and participation surface; Narrative Provenance is private creator-controlled memory.

## Evidence labels

- `DOCUMENTED` — directly supported by a preserved source.
- `OBSERVED` — a witness's direct account.
- `SELF-REPORTED` — a person's account of their own experience.
- `ATTRIBUTED` — a statement explicitly attributed to its speaker.
- `INTERPRETIVE` — analysis derived from evidence.
- `HYPOTHESIS` — a proposition that requires testing.
- `PROPOSED` — a design or intervention not yet validated.

## Repository guide

- [HYPOTHESIS.md](HYPOTHESIS.md) — the claim and its limits
- [METHODOLOGY.md](METHODOLOGY.md) — consent-first research and testing
- [ARTIST-FILE-PROTOCOL.md](ARTIST-FILE-PROTOCOL.md) — human-language creative-file intake
- [SAFETY-AND-PRIVACY.md](SAFETY-AND-PRIVACY.md) — prohibited behaviors and data boundaries
- [PHASE-2-HEALTH-STEWARDSHIP.md](PHASE-2-HEALTH-STEWARDSHIP.md) — private health-record access and rollout boundary
- [docs/pixie-care/README.md](docs/pixie-care/README.md) — PIXIE Care boundary/specification
- [docs/ECOSYSTEM-COORDINATION.md](docs/ECOSYSTEM-COORDINATION.md) — shared ecosystem responsibilities
- [docs/HARDWARE-PATHWAYS.md](docs/HARDWARE-PATHWAYS.md) — shared hardware pathways
- [docs/INFRASTRUCTURE-ARCHITECTURE.md](docs/INFRASTRUCTURE-ARCHITECTURE.md) — proposed long-term hosting, PDS, and Atmosphere game-distribution architecture
- [docs/atmosphere/README.md](docs/atmosphere/README.md) — Atmosphere guide source and current field notes

## Equipment reuse

Device Stewardship evaluates legacy hardware for continued use: repair, reuse, refurbishment and supported alternatives before unnecessary purchases or disposal. Exact platform/status distinctions live in [hardware pathways](docs/HARDWARE-PATHWAYS.md). Privacy, accessibility, security, and recovery gates remain in force.
