# Atmosphere field guide — five-second comprehension test

Status: prepared, not run. No participant responses or device results collected.
Revision: account example visible under hero, Loptr Lab header, Learn default, Made Sick referral route.
Participants: ten adults who have never used Bluesky; five arrive through the Made Sick homepage, five through the untagged guide. Participation is optional and unpaid; let anyone stop without explanation. Do not solicit private health or identity information.

## Setup and consent
Explain: “We are testing a page, not you. May we show it for five seconds and take brief anonymous notes about what you understood? You can stop or skip any question.”
Agree on note-taking separately; do not record audio/video by default. Use anonymous codes M1–M5 / O1–O5, never handles or names. Keep notes local to the facilitator unless participants expressly agree to anonymized sharing. No analytics, pixels or automated session recording.

Use the participant's real device. Record only device/browser and optional accessibility setup they choose to share. Do not label desktop resizing as iPad testing.
Made Sick group: click the actual homepage field guide link.
Other group: open https://atmosphere.loptrlab.com/ without referral query.
Show only the first screen at the participant's normal text size for five seconds, then hide it. Do not explain the content first. Record whether the account example was visible in that viewport; do not silently scroll or zoom out to force it into view.
If it was below the fold, preserve that observation as a layout finding.

## Questions (ask without hints)
1. What is this page for?
2. If you moved your account to another server, what would stay the same?
3. Which of the five paths would you click next?

Record answers in their words, without inferring understanding from clicks.
For Q2, distinguish same stable identity/follow relationships from mistaken beliefs that everything is private, EU-only or tied to one app. Do not expect jargon such as DID.

## Decision order
- If people cannot explain account continuity in Q2, rewrite or reposition the explainer before changing the defaults.
- If Q3 splits clearly by arrival group, consider a group-specific default only after reviewing the actual ten responses.
- If answers are mixed, retain Learn for everyone.
- Summarize counts and examples; this small qualitative sample does not establish statistical significance or accessibility certification.

## Anonymous response sheet
| Code | Arrival | Device/browser (optional) | Account example visible? | Q1 verbatim | Q2 verbatim | Q3 verbatim | Skip/stop or usability note |
|---|---|---|---|---|---|---|---|
| M1 | Made Sick | | | | | | |
| M2 | Made Sick | | | | | | |
| M3 | Made Sick | | | | | | |
| M4 | Made Sick | | | | | | |
| M5 | Made Sick | | | | | | |
| O1 | Other | | | | | | |
| O2 | Other | | | | | | |
| O3 | Other | | | | | | |
| O4 | Other | | | | | | |
| O5 | Other | | | | | | |

## Technical checks before people test
- View-source contains the account example and definitions before JavaScript.
- Untagged guide defaults to Learn and keeps Explore Made Sick.
- Live Made Sick link opens ?from=made-sick; hero changes and bottom step selects Create.
- Legacy redirect preserves location.search and location.hash; no competing instant meta refresh.
- No referral storage, analytics event or custom network request; normal navigation still sends the URL to the hosting provider. Do not promise that query strings are invisible to server logs.
- Keyboard operation and focus after Create; image loads; phone/tablet layouts.
- Real iPad Safari and VoiceOver testing remain pending until a device tester records results.
