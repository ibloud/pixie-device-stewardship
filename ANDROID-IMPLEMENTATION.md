# PIXIE OS — Android implementation plan

Status: PROPOSED

This document defines the first Android implementation target for PIXIE OS. It separates the user-facing launcher prototype from the deeper system/ROM work.

## Recommended build target

### Tier 1 — launcher

- Android 16 / API 36 compatibility target.
- Native Kotlin Android application.
- `CATEGORY_HOME` launcher role; no root required.
- Read-only integration with the existing `pixie-holdings` web surface first.
- The launcher should be usable on stock Android and LineageOS.
- Minimum device target for testing: Pixel 8a.

### Tier 2 — PIXIE OS ROM

**Base:** LineageOS 23.2 (Android 16).

**Primary hardware:** Google Pixel 8a (`akita`).

**Secondary validation hardware:** Google Pixel 9 (`tokay`) when the corresponding official LineageOS 23.2 device build is available and current.

The Pixel 8a is the canonical development device because it has an official LineageOS 23.2 installation path. LineageOS documents the 23.2 installation path for `akita`.

Do not base PIXIE OS on GrapheneOS. GrapheneOS can remain a security reference, but PIXIE needs a reproducible AOSP-derived ROM build whose policy and release process we control.

### Tier 3 — dedicated hardware

Start from the Tier 2 Pixel 8a device configuration and move toward a signed production image only after launcher and ROM behavior are stable.

Production requirements:

- reproducible AOSP/Lineage-derived build;
- PIXIE-specific AVB signing keys held by the release process;
- verified boot enabled;
- rollback protection preserved;
- OTA updates with signed metadata;
- recovery path documented before distribution;
- no silent inference;
- consent gate for consequential actions;
- public rollback receipt for reversible system actions.

A production device should not ship with an unlocked bootloader as the final security posture.

## Android source branch

For the ROM prototype, use LineageOS 23.2 / Android 16 rather than an older Android 15 branch. Android 16 is API 36; Android 16 QPR2 is API 36.1. The exact LineageOS manifest and device branch must be pinned at build time and recorded in the PIXIE release manifest.

For future AOSP-native work, track the current AOSP release branch rather than hard-coding an obsolete tag. PIXIE's first ROM should nevertheless remain on the tested LineageOS 23.2 baseline until device integration and stewardship behavior are stable.

## Device matrix

| Device | Codename | Role | Target |
|---|---|---|---|
| Google Pixel 8a | `akita` | canonical development + Tier 2 reference device | LineageOS 23.2 / Android 16 |
| Google Pixel 9 | `tokay` | secondary compatibility target | LineageOS 23.2 / Android 16, subject to current official build availability |
| Pixel 7a | `lynx` | legacy regression device only | use only if the current LineageOS branch still provides a maintained build |

The Pixel 8a is the only device treated as a hard requirement for the first implementation milestone. Additional devices are compatibility targets, not reasons to delay the prototype.

## PIXIE system layers

```text
Android 16
  │
  ├── Linux kernel / device tree / vendor interface
  │
  ├── LineageOS 23.2 base
  │
  ├── PIXIE SystemUI policy layer
  │     ├── authority: none
  │     ├── ledger: open
  │     ├── memory: local
  │     └── consent: required
  │
  ├── PIXIE Launcher
  │     ├── market map
  │     ├── PXCOIN ledger
  │     ├── holdings
  │     └── OS log
  │
  └── Device Steward service
        ├── intent intake
        ├── provenance
        ├── reversible preview
        ├── rollback receipt
        └── explicit permission gate
```

## Device Steward boundaries

PIXIE must not:

- diagnose neurodivergence;
- infer emotions or intent silently;
- monitor users secretly;
- move or rename files without a permission boundary;
- publish a receipt automatically;
- treat private narrative provenance as public ecosystem data.

These boundaries are part of the implementation contract, not merely product copy.

## Consent and rollback model

Every consequential action follows:

```text
intent
  → proposed action
  → visible consequence preview
  → explicit consent
  → execution
  → rollback receipt
```

A cancelled action must not mutate the user's files or publish an external record.

## First implementation milestones

### M1 — launcher proof

- Kotlin launcher APK.
- `CATEGORY_HOME` registration.
- Local PIXIE status chrome.
- Read-only bridge to `pixie-holdings` dashboard.
- No privileged permissions.

### M2 — stewardship prototype

- local intent model;
- project/file relationship model;
- provenance manifest;
- reversible preview;
- local rollback receipt;
- tests for consent denial and rollback.

### M3 — LineageOS integration

- fork/pin LineageOS 23.2 source;
- add PIXIE branding and default launcher;
- disable unnecessary bundled apps for the PIXIE profile;
- integrate Device Steward policy service;
- expose OS log and consent state;
- build and flash `akita`.

### M4 — signed device build

- reproducible release build;
- AVB signing;
- OTA metadata/signatures;
- rollback index handling;
- recovery documentation;
- release verification on a clean Pixel 8a.

## Build discipline

Never describe a feature as implemented until it has passed on-device testing. Use the repository evidence labels:

- `PROPOSED` — design exists, implementation does not.
- `IMPLEMENTED` — code exists and has passed the defined test.
- `UNVERIFIED` — code exists but has not passed the required device test.

The ROM is therefore a staged implementation of the Device Stewardship research, not evidence that the underlying research hypothesis has been validated.
