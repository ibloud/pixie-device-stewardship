# PIXIE ecosystem coordination

Source scan: October 4, 2026. Inspected the current Device Stewardship HTML/CSS, Creator OS HTML/app code and integration/status documents, Holdings README/device/ecosystem documents, and Tarantula's source tree and learning page.

| Surface | Responsibility | Current boundary |
|---|---|---|
| Device Stewardship | Research, consent contract, example workflow and feedback | In-tab simulation; optional text downloads; no device-file access, AI processing, mailbox or health connection |
| Creator OS | Creator workstation, launcher/panel navigation, local audio and story tools | Pre-alpha; browser and iPad verification still open in its status document |
| Holdings | Consequence previews, device capabilities and MCP test bench | Executable prototype; a static page does not establish a deployed MCP connection |
| Tarantula | Music/code/game learning pathways | Separate project with shared ethics; source-checked lessons and instrument integration remain unfinished |

## Where AetherOS went

Creator OS's integration architecture explicitly uses AetherOS as inspiration for launchers, panels, application boundaries and extensibility. Its code includes Control Room and Atmosphere panels and an AetherOS-style RECON window. No AetherOS code import or feature parity is established by this scan. AetherOS's AT Protocol/PDS claims do not become PIXIE capabilities through visual resemblance.

The stewardship site is the research/demo surface, not a replacement desktop shell. Its ecosystem links now expose Creator OS and Holdings.

## Streamplace decision

Yes, as an optional viewing adapter for lessons, creator sessions and playtests. Creator OS already constructs Streamplace embeds from a supplied handle. Device Stewardship now exposes a click-to-load external player with disclosure, strict handle validation, removal and a link-out fallback.

Loading a player does not establish that a stream exists or is live, authenticate a broadcaster, capture a recording, start chat, or grant publishing/camera/microphone permission. No handle is persisted. [Official embed documentation](https://stream.place/docs/features/embed/) specifies the embed URL.

Broadcasting, session/slot coordination and replay preparation need separate source, rights, readiness, destination and withdrawal decisions. They remain future work. Do not wire public streaming to private notes, clinical records or the pending iCloud adapter.

## Interactive example

Three invented scenarios share one consent workflow: choose, name, transcript, translation plan, re-entry note, review. Skips change the summary; declining stops the flow; editing clears confirmation. A user can download a visibly labeled example plan. No transcription, translation, reminder or filesystem operation runs.

Feedback is an editable local draft, optionally downloaded or manually pasted into a public GitHub issue. No analytics, interest signup, automatic submission or background persistence. Session descriptions, filenames and notes are excluded from the generated feedback draft.

Hardware routes link to [the shared guide](HARDWARE-PATHWAYS.md). Keep shared principles centralized while each repo owns its capability and device-test evidence.

## Next useful validation

On iPad Safari with VoiceOver: try a music scenario, edit the name, skip transcript, pause/resume, confirm, change the plan, export to Files and clear the feedback draft. Record expected versus observed behavior. Then test a public Streamplace handle explicitly selected by the tester, including offline/no-stream/removal states. No hardware or screen-reader validation is claimed by browser-only checks.

Review contributions remain voluntary and unpaid under the repository's existing participation terms.


## Implementation homes — October 4, 2026

| Capability | Implementation home | Evidence boundary |
|---|---|---|
| Public consent example and local feedback draft | Device Stewardship | Simulation; no processing or feedback collection backend |
| Local creator-session pilot and optional viewer | [Creator OS](https://github.com/ibloud/pixie-creator-os) | Session JSON export/import and selected local playback; iPad checks open |
| Device lifecycle assessment and MCP test bench | [Holdings](https://github.com/ibloud/pixie-holdings) | Declared capability assessment; no installation, repair or wipe |
| Local rights/source/consent records | [Narrative Provenance](https://github.com/ibloud/narrative-provenance) | Obsidian metadata and sharing audits; no automatic permission determination |
| Goal/device learning routes and lesson policy | [Tarantula](https://github.com/ibloud/tarantula-clone-hero) | Links to the exercise; source-verified Ren lessons unfinished |
| Playable original music/code exercise | [Rhythm-game repo](https://github.com/ibloud/ren-tap-tap-revenge) | Synthetic tones, note edits, timed/untimed simulated actions, bounded chart import/export; no physical input |
| ATProto discovery | [50 Ways](https://github.com/ibloud/50-ways-to-leave-another) | Experimental read-only discovery, separate from device execution |
| Accessible gameplay and consent-based game feedback | [Duet](https://github.com/Loptr-Lab/duet-solo-hackathon) | Game-specific implementation; do not reuse its backend implicitly for creative sessions |

[Try the creator-session pilot](https://ibloud.github.io/pixie-creator-os/session.html) or [the original music/code exercise](https://ibloud.github.io/ren-tap-tap-revenge/lesson.html). Keep one implementation home per capability; links do not synchronize private records. No migration, new backend, service credentials, automatic cross-repo synchronization or hardware installation is introduced.

Creator OS owns the production-direction optional viewer module. The research example retains its bounded illustrative viewer. Changes to the shared handle acceptance, explicit contact, removal, no-persistence and availability-label contract must be reviewed in both places. Do not introduce runtime remote-script dependency just to share a small validator.

Feedback remains local/manual on this site. Duet’s feedback design is a reference for consent and retention decisions, not an authorization to send creator records to its Firestore collections. Before adding any collection endpoint, specify destination, exact fields, retention, deletion and separate submission consent.
