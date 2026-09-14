# PIXIE Website Theme Direction

## Purpose

This is the visual direction for the PIXIE Device Stewardship website and its companion `pixie-holdings` test bench.

The intent is **not** to reproduce or brand PIXIE as *Resident Evil*. The reference is atmospheric: quarantined civic infrastructure, industrial interiors, damaged archives, emergency instrumentation, cold stone, dark wood, rust, ash, and restrained warning colors.

PIXIE should feel like a system that can operate inside a difficult world without becoming visually confused by it.

## Palette

Primary substrate:

- ash black / near-black for the page and system chrome
- charcoal and concrete grey for major surfaces
- dusty brown and dark mahogany as environmental accents
- muted blue-green for inactive system information
- oxidized green for provenance / stable-state signals
- restrained emergency red for warnings, consent attention, and consequential actions
- occasional clinical green/red only where a status meaning requires it
- warm off-white for readable text rather than bright white everywhere

The red should remain scarce. It means **attention**, not decoration.

## Texture and atmosphere

Use atmosphere through structure rather than decorative imagery:

- thin rules and instrument-panel divisions
- subdued surface variation
- square or lightly rounded controls
- compact metadata labels
- monospaced or technical secondary text
- evidence/provenance panels that resemble records or field notes
- subtle rust/ash/brown tonal shifts
- occasional emergency-light emphasis around consequential actions

Avoid gore, literal horror imagery, franchise characters, franchise logos, copied interface assets, or visual imitation of a specific game.

## Relationship to PIXIE Holdings

`pixie-device-stewardship` remains the **research/specification authority**. Its website should feel like the archive, laboratory notebook, and evidence room.

`pixie-holdings` remains the **executable PIXIE OS test bench**. Its desktop can feel more like a functioning operations room: deeper charcoal, instrumentation, system windows, access states, continuity radar, and visible machinery.

They should share a visual family without becoming identical:

| Layer | PIXIE Device Stewardship | PIXIE Holdings |
| --- | --- | --- |
| Role | Research / specification | Executable test bench |
| Mood | Archive / field station | Operations room |
| Surface | Ash / concrete / charcoal | Charcoal / deep navy / industrial black |
| Signal | Muted evidence accents | Teal / mint / cyan instrumentation |
| Warning | Restrained emergency red | Explicit consent / consequence signals |
| Human layer | Warm, readable editorial content | Pink/lavender access and community signals |
| Private state | Quiet, muted, clearly bounded | Locked / private system states |

The existing PIXIE Holdings palette should **not** be replaced wholesale. The Raccoon-City-inspired direction is a compatible environmental layer around the existing PIXIE system palette.

## Shared world rule

PIXIE is influenced by other worlds, but it does not need to become any of them.

The ecosystem fits together because each influence is translated into a PIXIE purpose:

- industrial spaces → visible system machinery
- archival spaces → provenance and evidence
- emergency instrumentation → clear consequence signals
- survival environments → recovery and rollback
- creative tools → protection of attention and intent
- public campaign surfaces → participation without forced disclosure

The unifying design language is therefore **stewardship under pressure**.

## Accessibility requirement

Atmosphere must never reduce legibility. Maintain strong text contrast, visible focus states, keyboard access, explicit labels, and clear consent language. Warning red cannot be the only indicator of meaning.

## Implementation note

This document is the approved visual direction for future website styling changes. The current website stylesheet is intentionally left structurally intact until a complete, reviewable patch can be applied; do not replace the existing working page with a partial stylesheet.
