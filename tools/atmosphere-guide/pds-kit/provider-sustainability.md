# PDS hosting provider sustainability and 10-year operating model

**Status: planning model, not a quote or tested business.** All figures are illustrative USD, before taxes, and must be replaced with vendor quotes, measured utilization, actual support time, and the operator's local costs before launch. Price references reviewed November 23, 2026; hardware and colocation availability change.

## Purpose

A PDS hosting provider should be able to offer an affordable, reliable service without relying on unpaid labor, perpetual introductory pricing, a single volunteer, or hardware that cannot be replaced. The provider's duty is to keep customers' identity and repository services operating, provide honest portability, and fund security, support, backups, and eventual replacement.

The ten-year horizon is a service-continuity objective—not a promise that one server, vendor, price, or software release will remain unchanged for ten years.

## Operating choices

### A. Reseller / VPS-backed managed PDS (lowest capital risk)

Provision a separate VPS or isolated service per customer, or use a documented multi-tenant design only if the upstream PDS supports and the operator can secure it. A small VPS market currently spans roughly $5–$15/month for entry plans, but price, storage, IPv4, backups, transfer, support and renewal terms vary. Treat the VM price as only one cost component.

Advantages: low startup capital, geographically flexible, hardware replacement handled by upstream, easier pilot and exit.

Risks: provider price increases, upstream outage, account suspension, limited control, margins thin if customers expect unlimited human support.

### B. Owned refurbished node in colocation (control, not automatically cheaper)

Illustrative launch inventory:
- 2 refurbished server nodes (one production, one recovery/spare or staged failover): **$1,200–$3,000 total**
- disks, RAM, spare SSDs, rails, NICs and initial repair allowance: **$400–$1,000**
- setup, secure configuration, inventory and test time: **$500–$2,000 labor**
- total initial cash/equipment: **$2,100–$6,000**

Recurring planning range:
- 1U/2U colocation with power/network: **$70–$200/month** for a small initial footprint; obtain actual quote and confirm power, bandwidth, remote hands, IPs, cross-connects and overage.
- offsite backup/object storage: **$25–$100/month** initially, depending on retained data and recovery design.
- monitoring, domains, mail, status page, security tools: **$20–$75/month**.
- insurance, bookkeeping, payment/banking and legal allocation: **$50–$200/month**.
- replacement/repair reserve: **$100–$250/month**.
- paid operations/support: **$600–$1,500/month at pilot scale** (20–50 hours at a planning rate of $30/hour); increase with customers and incident load.

Do not assume office/home electricity, network, rack, cooling, labor or bandwidth are free. If hosted at home, include power (measured kWh × local tariff), internet service, UPS/battery replacement, cooling, physical security, ISP restrictions, outage exposure and an alternate location.

### C. Hybrid (recommended pilot)

Use a low-cost upstream VPS for the first production cohort while maintaining an independently controlled backup and tested restore. Validate customer needs, support time and actual resource consumption. Add owned hardware only when measured recurring demand, reliability requirements and cash reserves justify colocation. Keep a migration path between providers.

## Illustrative service tiers

Avoid unlimited promises. Publish resource, support, backup, retention, fair-use, uptime, cancellation and export boundaries.

| Tier (planning only) | Price | Intended service |
|---|---:|---|
| Community / sponsored | $0–$5/mo | Limited seats funded by a sponsor or transparent community pool; no guaranteed individual support; clear capacity cap |
| Self-service | $8–$12/mo | PDS account, published limits, automated health checks, routine backups, documented export; support via community queue |
| Supported | $15–$20/mo | Self-service features plus defined response window, restore assistance, and human onboarding; not 24/7 |
| Organization | $30–$60+/mo | Higher capacity, multiple accounts or custom support; scope and storage agreed before billing |

Annual plans may offer no more than a modest discount (e.g. one month) and should never be prepaid for multiple years until the provider has reserves and a tested continuity/transfer plan. No lifetime plans.

## Unit economics (illustrative owned/hybrid service)

Assumptions for a transparent example:
- average realized subscription revenue: **$15/customer/month** (blended tiers, discounts and sponsored seats included)
- variable cost: **$3/customer/month** for storage/backup allocation, payment fees, incremental monitoring/traffic and support materials
- fixed monthly cost: **$450** for colocation/compute, baseline backups/monitoring, insurance/admin and a replacement reserve
- operator labor is paid at **$30/hour**, not treated as free
- support/operations workload: 20 hours/month at 100 customers; 30 hours at 150; 45 hours at 250; 60 hours at 400. These are hypotheses to be measured.
- additional reserve: **10% of revenue** for unexpected costs, bad debt, outages, security response and renewal variability.

| Active paying customers | Revenue/mo | Variable costs | Fixed costs | Paid labor | 10% reserve | Illustrative operating surplus |
|---:|---:|---:|---:|---:|---:|---:|
| 100 | $1,500 | $300 | $450 | $600 | $150 | $0 |
| 150 | $2,250 | $450 | $450 | $900 | $225 | $225 |
| 250 | $3,750 | $750 | $450 | $1,350 | $375 | $825 |
| 400 | $6,000 | $1,200 | $450 | $1,800 | $600 | $1,950 |

This is not a forecast. It shows why very cheap hosting is difficult to sustain when support and continuity are paid for. At these assumptions, contribution after variable cost and reserve is $10.50/customer; fixed costs plus labor are $1,050 at 100 customers, so break-even is approximately **100 customers**. If labor, storage, support or upstream costs are higher, break-even rises. If operator time is unpaid, apparent profit is misleading and the model is not self-sustaining.

## Ten-year stewardship and reserves

Every monthly bill should contribute to these separate obligations:

1. **Operations:** hosting, colo, power, bandwidth, domains, monitoring, payment processing, bookkeeping and support.
2. **Backup and recovery:** independent backup location, encrypted backup, retention, integrity checks, and periodic restore tests. Backup storage is not a backup until restore is tested.
3. **Hardware replacement:** reserve based on a 3–5 year replacement cycle for critical equipment, with parts availability and repair time considered. Do not plan to run the same disks or server for ten years.
4. **Security:** patching, access review, incident response, credential rotation, vulnerability handling, and supported software upgrades.
5. **Paid labor:** routine maintenance, onboarding, support, documentation, migration help, outage response and administrative work.
6. **Continuity/exit:** a written plan for provider closure, operator incapacity, service sale, or shutdown. Export tools, DNS/domain ownership, customer notice, transfer assistance, and backup custody should not depend on one person.
7. **Community access:** sponsored seats funded by a published allocation or donations—not by silently subsidizing all accounts from the operator's unpaid work.

A ten-year business should review price and reserves annually. Use a transparent inflation/actual-cost review; give notice and allow export/cancellation. Keep a continuity reserve target of **at least 6 months of essential operating costs**, moving toward 12 months once the service is established. Maintain a separate hardware replacement reserve.

## Capacity and reliability principles

- Start with a documented resource envelope per account: repository/blob storage, upload/egress, CPU/RAM, backup retention, and abuse controls.
- Measure real PDS workloads before density estimates. Do not promise a number of customers per node from CPU/RAM alone.
- Avoid a single node as the sole production and backup location.
- Maintain a second recovery path and test restoring a PDS and its identity/domain configuration.
- Define service status, maintenance notice, incident communications, and a realistic support window.
- Separate customer data; encrypt backups; least-privilege access; log access and retention.
- Publish the operator's data, privacy, acceptable-use, deletion, billing and portability policies.
- Do not claim a 99.9% SLA until monitoring, redundancy, incident procedures and financial capacity support it.

## Pilot gates before accepting paid customers

- [ ] Run a new-account deployment and document actual minutes, steps, and failure points.
- [ ] Complete a restore test from offsite backup.
- [ ] Measure 30–90 days of storage, CPU, memory, traffic and support time.
- [ ] Obtain written colo/upstream quotes with renewal, bandwidth, power and remote-hands terms.
- [ ] Test a server replacement and provider exit on a disposable account.
- [ ] Establish legal/business, tax, insurance, privacy, payment and consumer-cancellation requirements for the operating jurisdiction.
- [ ] Publish service limits, backup scope, retention, support boundaries, status page and cancellation/export path.
- [ ] Fund hardware, outage, security, and continuity reserves before offering annual prepayment.
- [ ] Review pricing and sustainability quarterly during the pilot and annually thereafter.

## Price references (reviewed 2026-11-23)

These are third-party price snapshots, not endorsements or vendor quotes:
- VPS comparison snapshots: [VPS With Crypto price index](https://vpswithcrypto.com/vps-price-index/) and [1VPS comparison](https://1vps.com/pricing/) show entry VPS offerings broadly in the low-single-digit to ~$15 monthly range depending on RAM, region, storage, IPv4 and traffic.
- Refurbished equipment market snapshot: [PC Server & Parts 2026 pricing overview](https://pcserverandparts.com/news/how-much-does-a-server-cost-2026/) reports wide refurbished inventory pricing; actual used equipment condition, drives, warranty and shipping must be assessed.
- Colocation snapshot: [Data Center Colocation pricing](https://data-center-colocation.com/colocation-pricing/) lists small-space offerings, but power, bandwidth, remote hands, taxes and contract details vary. Request a quote before budgeting.

Recheck current provider prices and terms at procurement. Comparison sites can be stale or affiliate-supported; prioritize provider quotes and disclose any relationship.

## Decision

The first service should be a small, paid pilot—not a promise of ten years from day one. The ten-year commitment is earned through documented operations, backups, replacement reserves, paid labor, customer portability, and an orderly continuity plan. If the model cannot cover these obligations at a transparent price, reduce scope, partner with an established provider, or do not launch.
