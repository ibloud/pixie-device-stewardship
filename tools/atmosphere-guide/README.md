# Atmosphere guide source

This is the maintained source for the public **Getting to Know the Atmosphere** field guide.

- **Public guide:** https://atmosphere.loptrlab.com/
- **Deployment repository:** https://github.com/ibloud/atmosphere-field-guide
- **Central project directory:** https://ibloud.github.io/ecosystem/
- **Field Notes archive:** https://atmosphere.loptrlab.com/field-notes/

## Navigation and publication

The guide's shared navigation follows this route:

**Start here → Identity → Explore → Publish → Field notes → Projects**

The Field Notes archive contains standalone articles, with each article linking back to the guide, archive, PDS Independence Kit, and project directory.

- [Field Note 012 — Your Infrastructure Is a Business Decision](https://atmosphere.loptrlab.com/field-notes/your-infrastructure-is-a-business-decision/)
- [Field Note 013 — An Artist Should Be a Node, Not a Tenant](https://atmosphere.loptrlab.com/field-notes/an-artist-should-be-a-node-not-a-tenant/)

## Recent merged changes

The source has been updated through the following merged PRs:

- **#46** — Publish Field Notes 012 and 013 as standalone static routes and add the archive.
- **#45** — Add the Artist Node field note and architecture visual.
- **#44** — Add infrastructure architecture working note.
- **#43** — Publish Field Note 012 in the maintained guide.
- **#42** — Pin the PDS installer and require explicit execution confirmation.
- **#41** — Add the Atmosphere Independence Kit for self-hosted PDS identity and migration planning.
- **#40** — Feature PLAY IT FORWARD in the Atmosphere field guide.
- **#39** — Add breadcrumb structured data to public pages.
- **#34** — Restore navigation with an accessible Explore dropdown.
- **#33** — Unify the PIXIE site theme.
- **#32** — Add developer-testing entry and publish privacy smoke-test evidence.
- **#31** — Clarify introduction, disclosures, and account-migration routes.
- **#26** — Refresh theme, onboarding, and publishing paths.
- **#24** — Repair guide navigation and a broken resource link.
- **#23** — Make account identity visible and guide newcomer paths.

## PDS Independence Kit

The [PDS Independence Kit](./pds-kit/) is documentation and starter tooling for deploying a new PDS identity and planning a migration. It includes provider-selection and deployment guidance, migration safety gates, read-only preflight checks, a pinned official installer download with checksum, and a separate execution wrapper that requires explicit confirmation.

Account/DID/PLC migration is not automated. Review official guidance and rehearse with a disposable account before moving an identity.

## Infrastructure architecture

The [Infrastructure Architecture working note](../../docs/INFRASTRUCTURE-ARCHITECTURE.md) distinguishes PDS identity and repository records from game runtime, static delivery, object storage, private Creator OS data, and realtime game services. It proposes a hybrid owned-node/VPS/object-storage approach and staged Atmosphere game-distribution proof. This is a proposal, not a deployment claim.

## Build and deployment

Run `npm ci` and `npm run build` to check the maintained source locally. Before building, copy the repository-root assets `atmosphere-orbit.jpg` and `made-sick-icon.svg` into `public/assets`. The user-supplied icon is separate from upstream CC0 material.

The dedicated deployment repository fetches this source, copies original guide images, applies canonical/social metadata, and publishes static assets through GitHub Pages. **After source changes merge, run the Deploy Atmosphere guide workflow** in the deployment repository. Do not claim the live site is updated until deployment completes and the relevant routes are checked.

The legacy root `atmosphere.html` redirect must remain working until custom-domain DNS and HTTPS have been verified.

## Attribution and boundaries

Guide curation, creative direction, and accessibility approach: Dominique Devereaux / Loptr Lab. Initial resource collection: atblueprints and awesome-atproto contributors; their CC0 credit and license remain linked from the guide. Individual resources retain their own authorship and licenses. Made Sick uses its supplied icon.

No sponsorship, affiliate, referral commission, or promotional obligation is implied by resource inclusion or field-note research.
