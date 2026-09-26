# PIXIE iCloud Mail Adapter

Status: **IMPLEMENTED for read-only testing; not a general-purpose mail client.**

This adapter exists to test whether PIXIE can reduce cognitive load around mailbox review without silently changing a user's mail. The current implementation is intentionally narrow: authenticate to iCloud Mail over IMAP, enumerate folders, build a metadata-only candidate index, and expose that index through an authenticated read-only endpoint.

## Safety boundary

The adapter must remain read-only during this testing phase.

It must not:

- send mail;
- delete, archive, move, flag, or mark messages read;
- alter folders;
- expose mailbox metadata without authentication;
- publish the mailbox index on the public Railway domain without a bearer token;
- treat a subject-line match as proof that the message is an actual obligation.

Current scans use message envelope metadata only: subject, sender/recipient metadata, date, folder, and UID. Message bodies and attachments are not included in the index.

## Railway configuration

Service: `pixie-icloud-mail`

Required service variables:

- `ICLOUD_EMAIL` — iCloud Mail account address
- `ICLOUD_APP_PASSWORD` — Apple app-specific password
- `PIXIE_MAIL_INDEX_ON_START=true` — enables the read-only metadata scan when the container starts
- `PIXIE_MAIL_READ_TOKEN` — long random bearer token used only for protected candidate retrieval

Do not place any of these secrets in GitHub, issue comments, chat transcripts, screenshots, or test fixtures.

## Validation sequence

After deployment:

1. Confirm Railway deployment reaches `SUCCESS`.
2. Open `/health` and confirm the adapter reports read-only mode and configured credentials.
3. Open `/probe/folders` and confirm iCloud authentication succeeds and folder names are returned.
4. Open `/scan/status` and confirm the metadata scan reaches `complete` or `complete_with_errors`.
5. Confirm `/scan/candidates` returns `401 unauthorized` with no bearer token.
6. Retrieve candidate metadata only with the configured bearer token.
7. Review candidate records as leads, not conclusions. The current filter matches subject lines and can produce false positives.

## Protected candidate retrieval

Endpoint:

`GET /scan/candidates?offset=<n>&limit=<n>`

Authentication header:

`Authorization: Bearer <PIXIE_MAIL_READ_TOKEN>`

The endpoint currently caps each response at 100 candidate records. For a 254-record scan, retrieve three pages:

- `offset=0&limit=100`
- `offset=100&limit=100`
- `offset=200&limit=100`

The response is metadata only and uses `Cache-Control: no-store`.

## iPad Shortcuts test workflow

This is the current iPad-native retrieval procedure used during testing.

1. Open Apple **Shortcuts**.
2. Create or edit a shortcut containing **Get Contents of URL**.
3. Set the URL to the protected candidate endpoint for the desired page.
4. Set **Method** to `GET`.
5. Expand **Headers**.
6. Add:
   - Key: `Authorization`
   - Value: `Bearer <PIXIE_MAIL_READ_TOKEN>`
7. Run the shortcut.
8. Add **Save File** beneath **Get Contents of URL**.
9. Save each page privately, for example:
   - `pixie-mail-001.json`
   - `pixie-mail-002.json`
   - `pixie-mail-003.json`
10. Keep the token out of saved files and screenshots. The JSON files themselves are private because they contain message subjects and addressing metadata.

A normal Safari address-bar request cannot add the bearer header and should return `{"error":"unauthorized"}`. That is expected and is part of the protection test.

## Current scan behavior

The metadata index is written inside the running Railway container at:

`/tmp/pixie-mail-candidates.json`

The scan is fault-tolerant by folder. A failure in one folder should be recorded rather than discarding the rest of the scan. Partial snapshots are preserved during processing.

`/scan/status` reports:

- enabled/disabled state;
- scan state;
- start and finish times;
- folder count and completed-folder count;
- message count;
- candidate count;
- recorded errors.

## Testing interpretation

Candidate detection is only a triage aid. A subject such as "Action Required", "Application", "Request", "Payment", "Recertification", or "Follow-up" can flag a message for review, but it does not establish that the user still owes an action.

For issue-resolution testing, downstream review should classify each candidate into categories such as:

- active action required;
- waiting on another party;
- informational/reference;
- completed/obsolete;
- duplicate/thread continuation;
- uncertain — needs message-body review with separate consent.

Future versions should add a protected, explicitly consented body-review path rather than silently broadening this adapter's access.

## Finished-state check for this test adapter

The adapter is ready for mailbox-issue triage testing when all of the following are true:

- deployment is healthy;
- iCloud credentials authenticate successfully;
- all expected folders are scanned;
- `/scan/status` completes without unreviewed errors;
- unauthenticated candidate retrieval returns `401`;
- authenticated pagination returns the expected candidate count;
- exported files contain metadata only;
- no mailbox state was changed during the test.

This document records the testing workflow so it can be reused and refined without relying on memory or chat history.
