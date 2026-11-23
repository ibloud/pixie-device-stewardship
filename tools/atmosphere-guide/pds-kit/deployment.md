# New identity deployment checklist

This is the low-risk route: create a new account on the PDS you control, rather than migrating an existing primary identity.

## Before provisioning

- [ ] Choose a provider after comparing price, support, accessibility, privacy, portability and billing.
- [ ] Confirm current official PDS system requirements.
- [ ] Record provider, plan, region, monthly total, renewal terms and cancellation path.
- [ ] Choose a server hostname that is distinct from your website domain where appropriate.
- [ ] Keep your domain registrar account secured with MFA and recovery methods.
- [ ] Decide whether the custom domain will be the AT Protocol handle. A website and handle can share a domain, but DNS requirements must be reviewed carefully.

## Server and DNS

- [ ] Provision a supported Linux host or managed deployment with persistent storage.
- [ ] Restrict SSH to trusted sources where possible; use key authentication.
- [ ] Open only the ports required by the current official deployment (commonly 80/443; SSH access must be secured).
- [ ] Add DNS records exactly as the provider and official PDS instructions require.
- [ ] Verify DNS propagation and TLS before creating an account.
- [ ] Run `scripts/pds-preflight.sh` to collect read-only system checks.
- [ ] Download the pinned official installer with `scripts/prepare-installer.sh`, review its source and checksum, then run it only if you choose using `scripts/run-reviewed-installer.sh` (requires explicit typed confirmation and sudo). The official installer is interactive; read each prompt carefully.

## Identity and account

- [ ] Create the account and save the credentials in a password manager.
- [ ] Set the desired handle using the official PDS instructions.
- [ ] Test login using a compatible application.
- [ ] Confirm DID resolution and PDS service endpoint.
- [ ] Confirm the custom handle resolves and verifies.
- [ ] Review app passwords/OAuth sessions and revoke anything unfamiliar.
- [ ] Secure a rotation key if the chosen identity method supports user-controlled recovery. Follow the official recovery guide; store private keys offline in secure, redundant locations.

## Verification

- [ ] PDS health endpoint responds.
- [ ] HTTPS certificate is valid.
- [ ] The handle resolves to the intended DID.
- [ ] The DID document points to the intended PDS.
- [ ] A compatible app can authenticate.
- [ ] A test post/repository record is visible through a second compatible app or public resolver.
- [ ] Backup is created and its contents are understood.
- [ ] Restore procedure has been rehearsed or documented as not yet tested.

## Official references

- Self-hosting: https://atproto.com/guides/self-hosting
- PDS software: https://github.com/bluesky-social/pds
- Account management: https://atproto.com/guides/account-management
- Account recovery: https://atproto.com/guides/account-recovery
