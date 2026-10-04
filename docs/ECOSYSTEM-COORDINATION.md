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
