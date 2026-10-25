# Safety and Privacy Boundary

## Required behavior

PIXIE is local-first, preview-first, reversible, legible, and consent-controlled.

The person must be able to see:

- what PIXIE observed;
- what PIXIE inferred;
- what it proposes to do;
- which files and applications are affected;
- what will be shared and with whom;
- how to undo, pause, reset, export, or delete its learned rules.

## Prohibited behavior

PIXIE must not:

- capture raw keystrokes or unrelated screen content;
- inspect private messages or health records to improve file suggestions;
- infer diagnosis, emotion, capacity, compliance, or clinical risk from task behavior;
- share behavioral records with a therapist, caregiver, employer, insurer, collaborator, or platform by default;
- silently rename, move, upload, publish, archive, or delete files;
- punish inactivity through streaks, warnings, guilt, urgency, or reduced functionality;
- treat disagreement with a recommendation as user failure;
- train a shared model on identifiable participant data without separate, informed agreement.

## Learning model

PIXIE learns from explicit acceptance, rejection, correction, and user-authored rules. Passive signals may be used only to offer help in the current task and must remain inspectable.

Example:

> “You reopened this step several times. Would you like fewer choices, a different explanation, help locating the earlier file, or to stop for now?”

PIXIE does not assign an emotional label to the event.

## Health-record access

Health-record access is an optional, private capability—not a condition of using PIXIE. Before showing or using connected records, PIXIE must:

- identify the source and its last known synchronization time;
- warn when a connection is expired or freshness is uncertain;
- distinguish provider-record status from user-confirmed present use;
- let the person choose categories and duration before access;
- avoid copying record content into public repositories, analytics, case studies, or community profiles;
- provide a private access history; and
- allow access to be paused or revoked without disabling non-health features.

A record may inform a user-requested private summary. It may not be repurposed to personalize creative-file suggestions, infer capacity, score consistency, or determine eligibility for participation.

## External sharing

Sharing is a separate action from collection. Each destination and data category requires its own consent. Access should expire, be revocable, and preserve an access log.

Clinical sharing is not part of the initial product. Any later clinical module must be designed with patients, licensed clinicians, privacy and security specialists, and applicable regulatory counsel.

## Children and dependent adults

Do not use PIXIE to covertly monitor another person's behavior. Research or care settings involving children or dependent adults require specialized consent, assent, safeguarding, and data-governance review beyond this repository.


## Made Sick account hosting — 7 October 2026

The @made-sick.org account is hosted on Eurosky; account, website, participant PDS and AppView boundaries are recorded in the [canonical ecosystem hosting note](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md#made-sick-account-hosting--7-october-2026), including PLC evidence and the dated policy baseline.

For a future PIXIE integration, show the chosen account, resolved PDS, destination application, public/private data boundary and requested permissions before sharing. Re-resolve hosting after migration and review each destination's terms. These are integration requirements, not implemented capabilities or proof of EU-only processing.

## AI assistant privacy comparison — Google Gemini Privacy Hub (24 October 2026)

**Source and scope:** [Google Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961), page updated 23 October 2026 (privacy notice dated 13 October 2026). This is a **comparison of Google's disclosed practices**, not an audit of Google systems, evidence of malware, or a legal finding. The PIXIE status labels below are requirements unless proven with implementation tests.

| Topic in Google's notice | Existing PIXIE position | Gap and testable acceptance requirement | Current status |
| --- | --- | --- | --- |
| Prompts, device/app data, screen content and connected-app data | Local-first; no unrelated screen capture or covert observation | Publish a data-flow inventory for each feature listing fields collected, purpose, on-device/server destination, and whether captured at all; verify permission denial does not break unrelated features | **PROPOSED** |
| Human review for service improvement | No training shared models on identifiable participant data without separate informed agreement | Default to no external human review of private content; if a feature needs review, disclose who, purpose, scope, consent, and withdrawal before access; test refusal path | **PROPOSED** |
| Activity controls differ from actual processing and retention | User can pause, reset, export, or delete learned rules | Define a per-category retention/deletion schedule, including transient processing, error logs, backups, support review and third-party copies; disclose exceptions before collection; test export/delete end to end | **PROPOSED** |
| Third-party/MCP Connected Apps have independent policies | Separate consent by destination and data category; revocation and access logs | Show service/operator, permissions, source, PDS/server location where applicable, retention link, and sharing preview; test revoke, expiry, denied access, and post-revoke behavior | **PROPOSED** |
| Device-assistant permissions and installed-app context | No covert device monitoring; explicit consent for consequential actions | Request least-privilege permissions just in time; verify microphone, screen, contacts, notifications and accessibility services are independently optional; record on-device permission state without harvesting unrelated app inventory | **PROPOSED** |
| Remote browsing, external actions and public sharing | Visible consequence preview and rollback receipt | Require per-action destination/recipient preview, explicit confirmation, outcome receipt, and rollback or clear irreversibility warning; no automatic post/invite/share by default | **PROPOSED** |
| Possible use of conversations for AI improvement | Explicit agreement required for identifiable training data | Document model/provider choice and whether inputs are sent off-device, retained or used for training; disallow silent model/provider switching for private material | **PROPOSED** |

### Device-stewardship and accessibility acceptance gates

These comparison requirements also apply to refurbished or legacy devices. A launcher or custom ROM must be evaluated independently of the host operating system, preloaded apps, carrier provisioning and Lifeline program rules. Do **not** infer malware, unlawful tracking, or contractual violations merely from published assistant privacy notices.

Before a release can claim these protections are **IMPLEMENTED**, require recorded tests for:

1. Launch and core offline features without mandatory Google, Apple or Microsoft authentication, to the extent supported by the specific device and distribution channel.
2. No unsolicited capture of microphone, screen, notification content, contacts, installed-app inventory or accessibility events.
3. Usable keyboard, screen-reader and low-vision consent flows, including denial and revocation states.
4. Explicit opt-in for external AI processing and third-party integrations, with provenance and request/response visibility that does not expose secrets.
5. Recovery and security posture: supported patches, verified boot, signed OTA updates and a documented return-to-stock path; never describe an unmaintained device as safe solely because bundled apps were removed.

### Privacy implementation work not yet evidenced

- **Owner:** PIXIE device-stewardship maintainer and relevant service owners.
- **Priority 1:** data inventory and deletion/retention schedule; authorization screens for third-party connectors; provider/model-processing disclosure.
- **Priority 2:** device permissions and optional authentication test matrix; assisted-accessibility validation.
- **Release gate:** link to commit, test report, hardware/OS version and reviewer signoff for each control. Until then, retain **PROPOSED**, not **IMPLEMENTED**.

**Separation of concerns:** This Gemini comparison belongs in the existing device-stewardship privacy research. Investigation of alleged unwanted software in subsidized phones requires independently acquired device models, build identifiers, reproducible technical observations and qualified review before any regulatory or security claims.
