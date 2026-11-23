# Bridge/migrate from another PDS

**Warning: account migration is identity-sensitive and can be destructive.** The official AT Protocol documentation warns that migration procedures and mechanisms evolve. Do not migrate a primary account as a first test. Do not deactivate or delete the source account before the migration is complete and verified.

## Preflight safety gate

- [ ] Confirm the source account DID and current PDS host.
- [ ] Authenticate to the source PDS using full account authentication (not an app password where the migration tool requires full auth).
- [ ] Confirm access to the account email and recovery methods.
- [ ] Provision and verify the destination PDS before migration.
- [ ] Read the current official migration and recovery docs.
- [ ] Export repository data (CAR) and blobs; export relevant private preferences where supported.
- [ ] Verify the backup can be read. Store copies outside both PDS hosts.
- [ ] Record existing rotation keys and signing/identity recovery options. Never paste private keys or tokens into this repository, issue trackers, chat, or logs.
- [ ] Rehearse with a disposable identity first.
- [ ] Confirm all app-specific state: chat, settings, subscriptions and other app services may be outside the PDS and may not migrate.

## Migration outline

The official guide describes the broad stages:

1. Create the destination account while proving control of the DID.
2. Transfer/import the repository (CAR) and blobs; transfer app preferences where supported.
3. Update the DID document/PLC operation to point to the destination PDS and its signing credentials.
4. Finalize account status: activate on destination and deactivate on source.
5. Verify repository revision, records, media, handle resolution, app login and network visibility.
6. Keep source backups and recovery access until verification and the documented recovery window are complete.

## Supported tools

- Official migration guide: https://atproto.com/guides/account-migration
- Official `goat` CLI: https://github.com/bluesky-social/goat
- PDS MOOver community tool: https://pdsmoover.com/

Tool support, authentication requirements and UI change. Verify the current tool's release, source, scope and security before authorizing it. This kit does not invoke migration APIs or perform PLC operations.

## Stop/rollback boundary

Before identity update: stop, retain both accounts and backups, and troubleshoot without changing the source identity.

After DID/PLC update: do not attempt an improvised rollback. Follow official recovery guidance and the migration tool's supported recovery procedure. Confirm the source PDS can still assist, if applicable, and keep account recovery keys accessible.

## After migration

- [ ] Confirm DID resolves to the new PDS.
- [ ] Confirm custom handle resolves and verifies.
- [ ] Confirm the destination account is active.
- [ ] Check repository status and revision.
- [ ] Check missing blobs and representative media.
- [ ] Log out and back in on each app; revoke stale sessions if needed.
- [ ] Confirm old PDS account status and do not delete it until the recovery plan says it is safe.
- [ ] Test a fresh backup from the destination.
