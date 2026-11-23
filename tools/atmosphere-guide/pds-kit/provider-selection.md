# Provider selection: people over profit

We do not accept sponsorship, affiliate commissions, referral payments, or paid placement for this kit. Provider links are research starting points, not endorsements.

Evaluate each host against the same criteria:

| Criterion | What we check |
| --- | --- |
| Price | Published recurring total, storage, bandwidth, tax, renewal price and billing minimum |
| Accessibility | Dashboard keyboard/screen-reader usability, clear error messages, accessible support |
| Privacy | Data handling, retention, account security, jurisdiction and published policies |
| Support | Human support channels, response expectations, community documentation |
| Portability | Can the user export data, cancel, and move to another host without penalty? |
| Reliability | Status history, backups, storage durability and recovery options |
| Sustainability | Company ownership, business model, environmental claims with evidence |
| Technical fit | Linux/VPS or container support, persistent storage, public IPv4/DNS, 80/443 access |

## Candidate pathways

These are candidates for testing, not rankings or sponsorships:

- **Managed container route:** Sliplane PDS preset (review current pricing, persistence and backup options): https://sliplane.io/
- **Traditional VPS:** DigitalOcean Marketplace PDS image or generic VPS with the official installer: https://docs.digitalocean.com/products/marketplace/catalog/bluesky-social-pds/
- **Values-driven provider candidate:** Greenhost VPS; evaluate current product, privacy and accessibility documentation: https://greenhost.net/products/vps/
- **Generic provider:** Any host that meets official PDS requirements and allows users to retain root/admin control and export data.

Before recommending a provider, conduct a dated audit and test the dashboard. We will not infer accessibility or ethical performance from marketing language.

## Reference VPS requirements and sizing

The [official VPS instructions](https://github.com/bluesky-social/pds#deploying-a-pds-onto-a-vps) require public IPv4, public DNS and inbound TCP ports 80 and 443. For 1–20 users, Bluesky recommends one CPU core, 1 GB RAM and 20 GB SSD. Managed services have their own provisioning requirements.
