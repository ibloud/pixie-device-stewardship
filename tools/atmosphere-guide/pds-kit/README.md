# Atmosphere Independence Kit (early reference)

**Goal:** help artists and community publishers create an identity on a PDS they control, then document a safe path to migrate an existing AT Protocol account from another PDS.

This kit is research and starter documentation, not a one-click migration utility. Account migration changes identity authority and can be destructive. Do not run it on a primary account until the steps are understood, backups are verified, and the process has been rehearsed with a disposable account.

## Pilot

Daddy's Little Mortis (daddyslittlemortis.com) is the planned reference deployment. We will record actual provider choice, DNS, deployment, verification and costs as we test; the kit does not claim a successful production migration yet.

## Principles

- People over profit; accessibility first.
- No sponsorship, affiliate links, referral payments, or paid placement.
- Provider choices are compared transparently, not promoted.
- Prefer the official maintained PDS implementation.
- Keep provider-specific instructions separate from the protocol.
- Avoid secrets in shell history, logs, Git, screenshots, or support tickets.
- Keep a verified backup before identity-changing steps.
- No automated DID/PLC mutation in this starter kit.

## Quick path for a new identity

1. Read [provider-selection.md](provider-selection.md).
2. Choose a host and provision a supported Linux VPS or managed container service.
3. Run the [preflight script](scripts/pds-preflight.sh) on the server.
4. Follow the official [PDS self-hosting guide](https://atproto.com/guides/self-hosting) and the [official PDS repository](https://github.com/bluesky-social/pds). Review the installer before executing it.
5. Configure DNS, TLS, create an account and set the custom handle.
6. Run the verification checklist in [deployment.md](deployment.md).
7. Establish backups and test recovery.

## Moving an existing identity

Read [migration.md](migration.md) and the official [Account Migration guide](https://atproto.com/guides/account-migration) first. Use the supported `goat account migrate` workflow or a maintained migration tool only after you have verified its current behavior and source. This kit intentionally does not automate the irreversible identity update.

## Files

- `provider-selection.md` — values-based host evaluation.
- `deployment.md` — new-account deployment and validation.
- `migration.md` — migration stages, safety gates and rollback boundary.
- `scripts/pds-preflight.sh` — read-only server checks.
- `scripts/prepare-installer.sh` — download the official installer from a pinned commit for human review; does not execute it.
- `scripts/run-reviewed-installer.sh` — run a reviewed installer only after typing an explicit confirmation; uses sudo and changes the server.

## Status

Early reference kit. Provider evaluations and actual deployment steps will be marked **tested** only after a documented live run. Please open an issue or pull request with corrections, accessibility feedback, or a tested provider workflow.
