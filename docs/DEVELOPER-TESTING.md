# Developer test invitation — PIXIE Device Stewardship

PIXIE is an open-source, privacy-conscious assistant research prototype from Loptr Lab. We are evaluating how creative and administrative assistance can run with user-controlled permissions, understandable consent, accessible interfaces, and eventually refurbished Android hardware. **This is a developer review and synthetic-data test invitation, not a production-ready device, security certification, paid position, or request for personal records.**

## Start here

1. Read the [project README](../README.md), [participation terms](../CONTRIBUTING.md) and [privacy boundaries](../SAFETY-AND-PRIVACY.md).
2. Review [hardware pathways](HARDWARE-PATHWAYS.md) and [Android implementation status](../ANDROID-IMPLEMENTATION.md). Android launcher and ROM milestones are **PROPOSED**, not verified applications.
3. Check out the repository and run `node --test tests/*.test.js` (Node.js 24 in CI) and `node --check demo.js && node --check demo-model.js`. Review the [automated CI workflow](../.github/workflows/demo-ci.yml).
4. Use synthetic examples only. Do not connect actual personal, medical, payment or third-party accounts; do not flash an everyday device.
5. Provide reproducible observations through a GitHub issue or draft PR: operating system and software versions, steps to reproduce, expected vs actual, accessibility tools, relevant sanitized output and whether a result is simulated or tested.

## Help wanted

- **Privacy/data engineering:** [#28](https://github.com/ibloud/pixie-device-stewardship/issues/28) — testable data inventory, retention/export/deletion.
- **AT Protocol integration/security:** [#29](https://github.com/ibloud/pixie-device-stewardship/issues/29) — review [atproto libraries](https://github.com/bluesky-social/atproto), [OAuth patterns](https://github.com/bluesky-social/cookbook) and [granular permissions](https://atproto.com/specs/permission); build mock connector and revoke/deny cases first. AT Protocol OAuth is **not** Google/Apple/Microsoft social login.
- **Android/accessibility:** [#30](https://github.com/ibloud/pixie-device-stewardship/issues/30) — devise reproducible emulated Android permission, TalkBack/keyboard and security testing when a runnable launcher exists.
- **Security/privacy review:** Identify untested assumptions without overstating a CI pass. No third-party vulnerability testing without permission; follow [SECURITY.md](../SECURITY.md) for sensitive disclosures.

## Participation boundaries

Voluntary and unpaid review currently; agree beforehand on scope, time, public/private boundaries, credit preference and an exit path. No expectation of free ongoing work, future employment, or ownership. Reviewers should not upload sensitive information to public issues. Follow [Code of Conduct](../CODE_OF_CONDUCT.md) and [moderation](../MODERATION.md).

The [hardware validation table](HARDWARE-PATHWAYS.md#software-validation-of-pixie-privacy-boundaries--24-october-2026) distinguishes simulated local tests that passed from live connector, retention and device work **not yet tested**.
