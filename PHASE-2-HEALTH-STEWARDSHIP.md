# Phase 2: Private Health Stewardship

## Status

`PROPOSED / NON-CLINICAL`

Phase 2 tests whether PIXIE can help a person orient themselves to connected health information while preserving agency, privacy, and the boundary between a record and an interpretation.

The public website is an interface demonstration. It does not connect to, contain, or process personal health records.

## Product question

Can a person determine:

1. which health sources are connected;
2. when each source last synchronized;
3. whether the information may be incomplete or stale;
4. which categories they want to view;
5. what PIXIE observed versus what it inferred; and
6. whether anything will leave the private session?

## Consent zones

### Recognize

Show that a source exists and whether its connection appears current. Do not display record contents.

### Participate

The person chooses a bounded category and purpose, such as reviewing current care instructions or reconciling a medication list. Access does not enable research or community participation.

### Transmit

Sharing requires a new action naming the exact destination, categories, purpose, duration, and revocation limits. A general agreement to use PIXIE is not permission to transmit health information.

### Withdraw

The person may stop access, revoke a connection, clear PIXIE's derived notes, export their activity history, and continue using non-health features.

## Required interface states

- connected and current;
- connected but freshness uncertain;
- expired or disconnected;
- record status not user-confirmed;
- conflicting sources;
- no information returned;
- access declined;
- access revoked; and
- export or deletion requested.

No state may be converted into a judgment about motivation, compliance, capacity, diagnosis, emotion, or clinical risk.

## Public/private separation

| Public project | Private product session |
| --- | --- |
| Synthetic interface states | Authorized record categories |
| Research questions and safety rules | Source and synchronization details |
| Aggregate, consent-cleared findings | User corrections and private notes |
| No diagnoses, medications, vitals, providers, or identifiers | Minimum information needed for the user's chosen task |

GitHub issues, pull requests, analytics, logs, screenshots, and public case studies must never contain personal health information.

## Initial prototype

The first prototype is read-only. It may:

- list source freshness;
- ask which category the person wants to inspect;
- show plain-language uncertainty;
- distinguish synced status from user confirmation;
- create a private, user-editable list of questions; and
- display exactly what would be shared before a separate transmission action.

It may not diagnose, recommend treatment changes, contact another person, reward adherence, or write back to a medical record.

## Research boundary

Testing with anyone other than the maintainer requires consent materials, participant compensation, data minimization, a retention schedule, accessible withdrawal, and an institutional determination of whether human-subjects review is required.

Therapist-facing, caregiver-facing, crisis, and treatment functionality remain outside this phase.

## Release gates

- [x] Public synthetic consent-state explanation
- [x] Written public/private boundary
- [ ] Private prototype threat model
- [ ] Accessible consent-language review
- [ ] Local storage and deletion verification
- [ ] Health-source freshness tests
- [ ] Security and privacy review
- [ ] Institutional research/IRB determination before participant recruitment
- [ ] Benefits-aware compensation plan for disabled contributors
