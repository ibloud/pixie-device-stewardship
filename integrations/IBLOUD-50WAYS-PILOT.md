# I.B.Loud / 50 Ways: PIXIE consent-sync pilot

Status: **dry-run only; no live contact collection, messaging, Laylo authentication, or automatic sync**.

## Source of truth and boundaries
- Artist: **I.B.Loud**. Creative work: **50 Ways to Leave Another**. Existing artist project repository: [50 Ways](https://github.com/ibloud/50-ways-to-leave-another).
- Reuse PIXIE [Artist File Protocol](../ARTIST-FILE-PROTOCOL.md) for append-only, correction-linked logs. Never move or expose artist files or personal records simply to normalize them.
- Do not create another CRM, campaign site, signup page, or database. The artist-controlled domain is the intended source; destination-specific consent is required before forwarding data.
- Made-Sick remains public resource/identity discovery; it is **not** the fan contact database.
- Do not infer an opt-in from a purchase, ticket, visit, public follow or contribution.

## Implemented
`artist-consent-router.js` validates an example event and returns a **review preview** or block reason. It never sends a contact, makes network calls or writes data. Node built-in test runner: `node --test tests/artist-consent-router.test.js`.

Example dry-run:
```js
const { routeSignup } = require("./artist-consent-router");
console.log(routeSignup({
 event_id:"test-1", type:"contact.opted_in", project:"50-ways-to-leave-another",
 artist:"I.B.Loud", destination:"laylo", contact:{email:"example@example.org"},
 provenance:{source:"artist-owned-signup", recorded_at:"2026-10-24T00:00:00Z"},
 consent:{granted:true,purpose:"artist-marketing",destination:"laylo",
  evidence_ref:"private-log:example",notice_version:"pilot-v1",recorded_at:"2026-10-24T00:00:00Z"}
}));
```

## Gaps / gates before activation
1. **Authoritative signup surface**: inspect the currently deployed artist site/form and choose its existing handler; avoid a second collection interface.
2. **Disclosure language and consent UX**: separate optional marketing consent from purchases and project participation. Confirm notice version, privacy policy and proof retention.
3. **Provider access**: Laylo credentials, valid API permissions, provider-specific rate limits/terms, unsubscribe/suppression support, test identity and explicit operator approval are unverified.
4. **Durable infrastructure**: secure server-side transport, secrets management, replay/idempotency store scoped by provider+event ID, bounded retries, dead-letter queue, PII-safe logs and signed operator auth are absent.
5. **Opt-out propagation**: verify source-of-truth priority, deletion/export requests and handling of unsubscribe updates on both sides **before** any live send.
6. **Identity reconciliation**: email and AT Protocol handles must not be assumed to refer to the same person; preserve separate scoped identifiers and consent.
7. **Safety and evidence**: synthetic records only in source/tests; never put real contacts, tokens, consent evidence or fan exports in public GitHub.
8. **Rights**: verify music/artwork publishing and commercialization rights separately; artist consent to marketing does not establish license to distribute.
9. **Acceptance**: verify blocked purchase, opt-in preview, duplicate event, retry, revocation, suppression, export/deletion, accessibility and audit trails in staging before requesting a live rollout.

## Next engineering step
Hook **the existing** 50 Ways artist-owned signup event to this pure validation layer in a secure integration service after the source handler and consent notice are confirmed. Add a Laylo provider adapter only when its supported API contract is verified. PR review should precede merge per [PIXIE governance](../GOVERNANCE.md).
