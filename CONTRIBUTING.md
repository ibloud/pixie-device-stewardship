# Contributing

## Mission and participation terms

Current open review and contribution opportunities are voluntary and unpaid. Before work begins, agree in writing on scope, time, what will be public, credit preferences, and an exit path. You can stop at any point. Participation does not promise employment, ownership, revenue share, academic credit, or future pay. Any paid commission or other formal arrangement requires a separate signed agreement before work begins. External assistance or benefits belong to the participant and are not compensation from Loptr Lab.

[People over profit, accessibility first, and our funding boundary](https://github.com/ibloud/ibloud.github.io/blob/main/MISSION.md).

Contributions are welcome from creators, accessibility practitioners, researchers, clinicians, designers, developers, and platform teams.

All participation follows [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [MODERATION.md](MODERATION.md). Disagreement is welcome; personal targeting and diagnostic speculation are not.

## Before contributing a case

- Use [CASE-STUDY-TEMPLATE.md](CASE-STUDY-TEMPLATE.md).
- Describe observable interface behavior.
- Remove private files and identifying information.
- Obtain permission before naming another person.
- Separate participant statements from your interpretation.
- Do not submit diagnoses or speculate about somebody's mental state.

## Before contributing a feature

Explain:

1. which user burden it removes;
2. what data it requires;
3. what it derives;
4. what action requires confirmation;
5. how the person corrects it;
6. how the action is reversed;
7. how learned data is exported and deleted; and
8. which accessibility needs were tested.

Features that add covert monitoring, emotional inference, automatic deletion, default-on sharing, streaks, guilt, urgency, or diagnosis are out of scope.

## Accessibility acceptance criteria

New interfaces must support keyboard and switch access, visible focus, readable contrast, meaningful labels, reduced motion, plain language, interruption recovery, and a path requiring no precise memory of system-generated identifiers.

## Ecosystem-wide accessibility release gate

This applies to **every Loptr Lab / PIXIE / Made Sick / 50 Ways user-facing site, app, demo and embedded component**, including mobile and legacy-device experiences. Theme consistency is not accessibility verification.

Before merging or publishing UI changes, the PR must record:

- Keyboard-only operation, visible focus, logical tab/reading order, Escape/cancel and focus recovery; adaptive switch where applicable.
- Screen-reader labels, announcements and semantic headings; test VoiceOver on iPad/Safari and a desktop screen reader for relevant paths.
- WCAG 2.2 AA contrast checks for normal and large text, controls and focus indicators in every supported theme/state; verify at 200% zoom and narrow viewports without horizontal content loss.
- Touch target size/spacing, reflow, error identification, form instructions and no color-only status communication.
- Reduced motion, no unexpected autoplay, accessible media captions/transcripts where applicable, understandable confirmation/undo and no forced memory of machine identifiers.
- A recorded desktop/mobile/iPad preview link, tested browsers/assistive technologies, findings, known limitations and reviewer sign-off **before merging to main**.

Automated lint and contrast tools are useful but do not replace manual device and assistive-technology testing. Mark each criterion PASS / FAIL / NOT TESTED. Do not describe a preview or site as accessibility accepted while required checks remain NOT TESTED. A failed required check blocks publishing until corrected or an explicit documented exception is approved by the maintainer.

Use the existing shared CSS per site: design tokens and common interaction states belong in that one stylesheet, not duplicated page-level style tags. Changes across separate ecosystem repositories require their own review rather than assumptions of shared implementation.

### Typography, contrast and personal display settings

- Use relative font units (`rem`/`em`) with body text normally at least 1rem and comfortable line height; respect browser font changes and 200% zoom without clipping, hiding controls or horizontal page scrolling.
- Measure WCAG 2.2 AA contrast (4.5:1 normal text; 3:1 large text; 3:1 non-text UI cues and focus where applicable) in every theme and interactive state; do not infer compliance from palette names.
- Respect system light/dark and reduced-motion preferences; provide an accessible user-controlled light/dark/system selector and larger-text / high-contrast choices when implemented. Do not promise controls that do not exist.
- Store display choices locally only with clear reset, no mandatory account or remote tracking. Verify persistence, keyboard operation and accessible announcements.
- Screen reader, 200% zoom, high-contrast OS modes and reflow acceptance apply to every ecosystem site. Document unsupported combinations as NOT TESTED and block unreviewed releases.
