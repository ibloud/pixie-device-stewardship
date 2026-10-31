# PIXIE iCloud Mail Adapter — local read-only scanner

Implemented in the existing `ibloud/pixie-device-stewardship` adapter, based on
`feat/pixie-icloud-mail-mcp`. This is a private local testing checkpoint, not a
hosted release or a verified live iCloud connection. It does not modify the
Companion, installed ChatGPT plugin or Railway services.

## What it does

A manual command scans **explicit folders and dates**, saves a cumulative metadata
index and offers possible review leads. It saves only UID, UIDVALIDITY, Message-ID,
folder, internal date, sender addresses and subject. The file also has a schema,
update date and an account fingerprint to prevent mixing accounts. No bodies,
attachments, recipients, flags or credentials are requested for storage.

A subject match is **not a confirmed obligation**. Word-boundary rules distinguish
possible action/payment/date/application signals from paid/resolved/newsletter
matches. They cannot establish authenticity, urgency, deadlines, payment status or
what someone must do. No AI service is used and nothing is sent to a model.

IMAP uses `imap.mail.me.com:993`, verified TLS and an Apple app-specific password.
Each folder must confirm read-only `EXAMINE`; otherwise that folder is rejected.
Fetches request UID, envelope and internal date only. There are no operations for
send, flag, mark read, move, delete, expunge or folder modification. Reading a
metadata index is not proof that the mail still exists in that folder.

## Install and private configuration

Use Node 20.6+ (Node 22+ recommended). From the existing checkout:

```sh
cd adapters/icloud-mail
npm ci --ignore-scripts
npm test
```

The example contains **no real credentials**. Create your own private configuration
outside the repository; do not paste it into chat, screenshots or GitHub:

```sh
umask 077
mkdir -p "$HOME/.config/pixie"
cp .env.example "$HOME/.config/pixie/icloud-mail.env"
chmod 600 "$HOME/.config/pixie/icloud-mail.env"
```

Edit that private file locally. Set `PIXIE_MAIL_READ_TOKEN` to a locally generated
random value (`node -e 'console.log(require("node:crypto").randomBytes(32).toString("hex"))'`).
Set `ICLOUD_EMAIL` and an **Apple app-specific password**, not your Apple account
password. Generate/revoke that password using Apple's account security interface.
Never pass secrets as CLI arguments or embed them in URLs. The token protects
metadata retrieval and is separate from the Apple password.

Keep `PIXIE_MAIL_LIVE_ACCESS` empty until you explicitly authorize live access.
Then set it to `approved` in the private file. This opt-in is necessary even for
folder listing. Setting credentials alone does not authorize scanning. No live
mailbox access was performed during this implementation.

`PIXIE_MAIL_DATA_DIR` defaults to `~/.local/share/pixie/icloud-mail`, outside this
checkout. An override must point to another private directory outside version
control. The scanner creates it with mode 0700 and writes `metadata.json` with
mode 0600 through atomic replacement. Do not use a shared or cloud-synced folder.
Permissions protect against other ordinary users, not root, malware or disk loss;
use your device's disk encryption. Additional users must not share this store.

## Start, stop, manually scan and review

All commands below read the private file without putting credentials on the
command line. Start does **not** connect to IMAP or scan, even with credentials.
A missing/short HTTP token fails startup; missing mail credentials allow the
server to start but a folder probe or scan fails safely.

```sh
node --env-file="$HOME/.config/pixie/icloud-mail.env" server.js
```

Default address: `http://127.0.0.1:3000`. Stop with **Ctrl+C** in that terminal.
`SIGTERM` also closes the HTTP server. No background scheduler exists.
`PIXIE_MAIL_INDEX_ON_START=true` is refused; automatic scanning has been removed.

After you privately configure credentials **and authorize live access**, run these
in another terminal. Folder listing is an authenticated connection check, not a
scan. Its output is private; do not share folder names without review.

```sh
node --env-file="$HOME/.config/pixie/icloud-mail.env" cli.js folders
node --env-file="$HOME/.config/pixie/icloud-mail.env" cli.js scan \
  --folder INBOX --since 2026-10-01 --before 2026-10-08 --max-messages 100
node --env-file="$HOME/.config/pixie/icloud-mail.env" cli.js review 0 50
```

Choose your own short date window, initially one folder and a few days. `--since`
is inclusive and `--before` exclusive; dates are YYYY-MM-DD. IMAP search uses
internal dates, not potentially misleading Date headers; only records inside the
UTC window are accepted. At most five distinct folders, 31 days, and 500 messages
per folder are allowed (default 200). Repeat `--folder` to add a folder. If the
message count exceeds the cap, that folder is not partially indexed: narrow the
window. There is no whole-history mode or scan-on-GET.

A scan prints counts and safe error codes only. `folders` and `review` deliberately
print private metadata to your terminal; do not capture them in shared logs.
The adapter never logs upstream error messages, credentials, subjects, addresses
or folder names. HTTP has no request logging or analytics.

Repeated scans upsert by folder + UIDVALIDITY + UID. A changed subject updates
that record; a failed or interrupted folder retains its previous valid records.
Successful folders can commit alongside failed ones (`complete_with_errors`).
A full failure leaves the previous file unchanged. Corrupt files are preserved,
not reset. Cumulative results can include old/deleted mail; a server UIDVALIDITY
reset creates distinct identities. There is no automatic deletion/retention policy.
Review and erase locally when the index is no longer needed. The 32 MiB/100,000
record safety cap requires deliberate deletion or a separately reviewed retention
change; it does not silently discard old records.

## Local deletion and interrupted runs

Stop scans before deleting the local index. This affects only the local file,
never iCloud messages:

```sh
node --env-file="$HOME/.config/pixie/icloud-mail.env" cli.js delete-data \
  'DELETE LOCAL MAIL INDEX'
```

Scans and deletion share an exclusive `scan.lock`. No concurrent writer can
replace another scan's data. If a process is killed, confirm **all scanner CLI
processes have stopped** before manually removing `scan.lock` from your configured
data directory. Do not remove a live process's lock. Interrupted atomic writes may
leave an owner-private `.metadata-*` temporary file; after confirming processes
are stopped, remove those files too if erasing all copies. Stop the server and
remove the private configuration file if retiring access; revoke the Apple
app-specific password and rotate/revoke the retrieval token as appropriate.
Backups, terminal output and operating-system snapshots require separate deletion.

The old `/tmp/pixie-mail-candidates.json` is neither imported nor deleted by this
code. If one exists on a machine, review it privately and remove it yourself when
no old scanner is running. Do not copy it into this repository.

## Read-only interface for a future Companion integration

**No integration is activated.** The existing HTTP paths are retained:

| Method/path | Result |
| --- | --- |
| `GET /health` | Read-only mode; automatic scanning false; no credentials or mail data |
| `GET /probe/folders` | Explicit IMAP folder probe; requires private credentials and live opt-in |
| `GET /scan/status` | Current process state plus last saved index date/count; no background progress claim |
| `GET /scan/candidates?offset=0&limit=50` | Saved possible-review metadata; no scan or IMAP connection |

Every route, including health, requires `Authorization: Bearer <PIXIE_MAIL_READ_TOKEN>`.
Responses use `Cache-Control: no-store`; no CORS is enabled. The interface is for
a trusted local backend, not direct public browser code. Keep the token server-side.
Pagination is validated, at most 100 records per page. Errors expose stable codes,
not upstream exception text. No HTTP scan, deletion or mailbox mutation endpoint
exists. Future Companion use requires separate user consent to share the selected
metadata; do not copy the whole mailbox index or token into project backups.

Module consumers can import `createScanner(config)` from `scanner.js` and call
`folders()`, `status()` and `page(offset, limit)`. Manual administration additionally
uses `scan({folders,since,before,maxMessages})` and confirmed `deleteData(...)`.
The JSON index schema is `pixie.mail-metadata/v1`; candidates add an explicit
unverified subject classification. Treat all sender and subject strings as
untrusted external text, never instructions or HTML.

The default HTTP server binds only to loopback and checks literal local Host
headers to resist DNS rebinding. Non-loopback binds require native TLS certificate
and key paths (`PIXIE_MAIL_TLS_CERT`, `PIXIE_MAIL_TLS_KEY`) plus the bearer token.
Plain HTTP externally, including trusting proxy forwarding headers, is refused.
This is a fail-closed safeguard, not authorization to expose the service.
TLS certificate lifecycle, client access and deployment need separate review.

## Verification and limitations

`npm test` runs synthetic fixtures only, including a local fake IMAP peer using
the actual installed ImapFlow library. It checks emitted `EXAMINE`, bounded UID
search/fetch, no body/flag/write commands, unchanged synthetic flags, private file
modes, safe failures, repeat scans, failed-folder preservation, authentication,
manual CLI scanning and local HTTP startup. No Apple or Railway endpoint is used.
The local fake peer is plaintext solely inside the test; production IMAP TLS
verification is mandatory.

Live iCloud authentication, folder enumeration, a bounded real scan and comparison
of real flags **remain unverified**. They require private credentials, explicit
live authorization and local network access to iCloud IMAP. This cloud environment
currently has no approved mail credential bindings or TCP grants for iCloud: that
is not evidence of a broken password. Test on the intended local device first.
Unit tests do not establish iCloud server behavior, TLS certificate lifecycle,
classification accuracy or physical-device accessibility.

## Railway remains separate

The branch contains no tracked Railway manifest, Dockerfile, Procfile or deployment
workflow for this adapter. The previous README described service
`pixie-icloud-mail` and its credential/startup variables, but does not establish its
actual current configuration or dependents. No Railway configuration was changed,
no public endpoint contacted and no migration attempted. Keep the existing service
and source branch unchanged. This local repair requires its own review before any
hosted release; default loopback binding and refusal of legacy automatic scans
mean it must not be deployed unchanged into an assumed Railway setup.

## Inbox learning build — reviewed 31 October 2026

This is part of Loptr Lab's training program: learn to connect an outside
information source to an existing learner task while preserving source context,
privacy and human judgment. The existing adapter is the implementation exercise;
Training owns onboarding, and the existing Companion owns future task interaction.
Do not create another inbox service, project directory or learner account system.

### Verified boundary

- PR #35 records 16 passing synthetic tests at
  `71579e8e371332e214a1147aad7e2b449ecf3acc`; these were not rerun for this documentation update.
- Manual bounded, metadata-only scanning, deduplication, authenticated local
  retrieval and safe failure handling are implemented on this review branch.
- Live iCloud access and unchanged real mailbox state remain unverified.
- No message-body review, reply generation, approve/edit flow, scheduler, Gmail
  adapter or active Companion integration is established by this build.
- Railway inspection on 31 October found the existing `pixie-icloud-mail` service's
  latest deployment FAILED (26 September). A domain and configured variable names
  do not prove a working mailbox connection. Two environment-wide staged changes
  were present; none were applied. Values and mailbox data were not retrieved.
- The local repair must not be deployed unchanged: loopback binding/native-TLS
  requirements and authenticated health differ from the existing hosted setup.
  No persistent volume is attached to the inspected mail service.

### Existing-work contribution milestones

Choose one milestone and agree scope in existing PR #35 before implementation.
No contributor is assigned by this list. Open contributions are voluntary/unpaid;
follow repository instructions and agree time, public output, credit and exit terms.

| Milestone / role | Work in the existing implementation | Observable completion |
| --- | --- | --- |
| 1. Hosted candidate / maintainer + backend contributor | Reconcile original PR #13, this repair and the actual Railway configuration. Inspect existing staged changes; do not accept unrelated changes. Adapt transport, health and private storage deliberately. Keep scanning manual/off by default. | Pinned candidate passes synthetic tests, authenticated routes reject missing/wrong tokens, health works through Railway without private data, and restart/storage behavior is demonstrated. Record SHA, deployment and rollback steps. No live mail required. |
| 2. Private connection / account owner + maintainer | Privately configure the existing host; owner chooses one low-stakes folder and a short date window. Start with folder listing, then the bounded read-only scan. | Real authentication, bounded results, repeat-scan deduplication and unchanged mailbox flags checked. Public receipt contains only date, source SHA, counts and outcomes. |
| 3. Selected correspondence to task / Companion contributor | Continue the existing Companion interface. With separate consent, expose only the selected item's needed content, retain its source reference and let the learner confirm the existing task destination. Treat email as untrusted content, never tool instructions. | Synthetic cases show a relevant outside resource attached to the selected task; wrong-account access and unapproved import are rejected. No whole-index sharing or public mail copies. |
| 4. Reviewable reply / workflow contributor + owner | Add reply drafting using the selected, consented message context. Provide edit, approve and reject; do not enable sending as part of this milestone. | One real reply-needed item is correctly identified; the owner reviews/edits a grounded draft. Capture only a redacted result, including any false positive. |
| 5. Recurring check / maintainer + owner | Only after manual review succeeds, add an owner-selected schedule to the same bounded workflow with visible status, disable control, deduplication and failure reporting. | A scheduled run and a failed-run case are observed; disabling prevents later runs. Schedule timezone and actual hosting cost boundary recorded. |
| 6. Accessible demonstration / independent tester | Check the selected workflow with keyboard and the intended device/assistive technology. Prepare a synthetic or redacted demonstration. | Tester can find the item, understand its proposed task/reply, edit/reject it and see truthful failure/paused state. Untested devices remain labeled. |

The supplied Handshake Inbox Assistant brief requires finding reply-needed mail,
a reviewed draft and a recurring cycle. This checkpoint does not yet satisfy that
full workflow. It can be offered honestly as an unfinished learning prototype for
review if the submission interface accepts it; acceptance/badges are not guaranteed.
See [prepared submission fields](./HANDSHAKE-SUBMISSION.md). Rubrics Academy helps
test these outcomes; more coursework is not a prerequisite to finishing the build.
