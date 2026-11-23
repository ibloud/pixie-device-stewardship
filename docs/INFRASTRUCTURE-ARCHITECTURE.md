# Loptr Lab Infrastructure Architecture — Field Note / Working Plan

**Status:** Proposed architecture; workload inventory and capacity tests are not yet complete.  
**Reviewed:** 23 November 2026  
**Scope:** Long-term self-hosting, PDS/Atmosphere, game distribution, and ecosystem services.  
**Decision principle:** Own what creates leverage and independence; rent what is cheaper or safer to operate; retain an exit path.

## Why this is a business decision

A server adds electricity, connectivity, maintenance, security updates, backups, recovery, monitoring, and operator time. The question is not “can we host everything?” but “which workloads should we own, and what level of availability do they actually require?” Do not buy hardware before workloads, growth assumptions, and operational capacity are documented.

## Workload map

| Workload | Initial placement | Reason / boundary |
|---|---|---|
| Git, source, release artifacts | GitHub / independent source repos | Versioned, portable; keep builds reproducible |
| Static sites, field guides, docs, game builds | GitHub Pages or static object hosting + CDN | Low-cost distribution; avoid running a server for static content |
| PDS identity, account and repository services | Dedicated VPS or isolated service | Publicly reachable; updates and recovery matter; not the game runtime |
| PDS blobs / large media | Object storage with CDN/proxy | Separate storage and delivery; avoid exposing PDS origin as arbitrary executable content host |
| Game metadata/manifests, ownership, discoverability | PDS records + curated registry/index | Portable metadata and identity; private saves/secrets do not belong in public records |
| Client-side PIXIE games | Static/CDN delivery; browser sandbox | Scale delivery independently from PDS |
| Asynchronous/social game APIs | Managed or isolated service + database + job queue | Only when shared state, voting, turns, leaderboards, etc. are required |
| Realtime multiplayer | Separate realtime service/session hosts | Latency, state, abuse, and scaling needs differ; add only when proven necessary |
| Creator OS / private project coordination | Private service or local-first app | Private project data is not public PDS content |
| Monitoring, automation, backups | Separate monitoring and backup targets | Primary host must not be the only recovery copy |

## Atmosphere and game distribution model

The PDS is the identity, authorization, repository, and portable-record layer—not a game engine or the only public asset-delivery server.

1. Creator builds a game and creates a versioned, immutable release artifact.
2. Release is stored in source control/release storage and object storage as appropriate.
3. A signed or integrity-checkable manifest records DID/creator, title, version, release hash, asset references, runtime requirements, permissions, and license.
4. PDS records provide identity and portable metadata. A registry/AppView indexes public discovery without becoming the canonical owner of the creator's work.
5. CDN or static hosting serves the game and assets from a delivery origin separate from the PDS.
6. PIXIE runtime launches games in an appropriately sandboxed context; capabilities are requested per game, per purpose, and with explicit user consent.
7. Saves remain local by default. Optional portable/synced saves require separate, clearly scoped permission and a defined private/public record boundary.

Never serve untrusted game code from the PDS origin and then grant it access to PDS credentials. Keep game execution, PDS identity, and private companion persistence isolated.

## Hosting strategy: hybrid, not all-or-nothing

**Infrastructure Node 01 (owned or dedicated):** development/staging, private control-plane services, test environments, monitoring, internal automation, reproducible builds, and workloads that benefit from hardware ownership. It may later host low-risk public services if capacity, security, recovery, and connectivity are demonstrated.

**Independent VPS/cloud:** public PDS and internet-facing APIs initially, especially where availability, security patching, or geographic redundancy matters. Use providers with export and migration paths.

**Object storage/CDN:** large game releases, static assets, public media, off-site backups, and distribution.

Do not place the entire ecosystem behind one machine, ISP, power circuit, DNS account, or administrator credential.

## Capacity and procurement baseline (planning only)

A reasonable first owned node to benchmark—not a purchase prescription—could be:
- 8–16 modern CPU cores;
- 32–64 GB RAM (ECC where practical);
- 1–2 TB NVMe working data, with expandable storage;
- 1 GbE minimum, with upgrade path;
- UPS and remote management where feasible;
- separate backup destination and off-site copy.

Start smaller/used if measured workload is modest. Validate against concurrent game sessions, database size, PDS blob volume, build jobs, transfer, and recovery-time goals. Avoid GPU spend until a measured workload requires it.

## Operating costs to model

Purchase price and amortization, power draw at idle/load, electricity rate, ISP upload/download limits and static-IP costs, cooling/noise, backup storage, object-storage egress, domain/DNS, VPS fees, licenses, replacement parts, and operator hours. Owned hardware is not free hosting.

## Security and recovery gates

- Separate public services from private creator and control-plane data.
- Use least privilege, MFA, key rotation, secrets outside repositories, and firewall rules.
- Document service owner, update cadence, monitoring, restore procedure, and rollback.
- Back up configuration, database, PDS identity/repository data, and game release manifests. Keep at least one off-site copy.
- Rehearse restores and PDS migration; backup success is not restore proof.
- Treat game code, extensions, blobs, and external integrations as untrusted.
- Establish abuse handling, rate limits, logging minimization, moderation, and incident contacts before opening public APIs.
- Keep PDS, runtime, registry, private project persistence, and game services in separate permission/data boundaries.

## Staged decision gates

1. **Inventory:** enumerate live/planned services, domains, data classes, dependencies, current costs, owner, and recovery requirements.
2. **Measure:** establish traffic, storage, CPU/RAM, transfer, concurrency, and restore benchmarks.
3. **Model:** compare owned/refurbished hardware, VPS, managed services, and hybrid costs over 12/24/36 months.
4. **Pilot:** build a non-public Infrastructure Node 01; test monitoring, isolation, backup, and restore.
5. **PDS:** deploy or migrate a test PDS with disposable identity; verify export, backup, migration, and account recovery.
6. **Atmosphere game proof:** publish one static game release with manifest, integrity verification, sandboxed launch, and explicit permissions. Keep public delivery separate from PDS origin.
7. **Expand only by evidence:** add async or realtime infrastructure only when an identified game and measured workload require it.

## Evidence and status

This is a proposal, not a claim that self-hosted infrastructure, game distribution, or multiplayer systems are deployed. Mark each capability **Proposed**, **Tested**, **Verified**, or **Production** with evidence.

## References

- [AT Protocol overview](https://atproto.com/guides/overview)
- [Blob storage and delivery](https://atproto.com/specs/blob)
- [Going to production](https://atproto.com/guides/going-to-production)
- [PDS self-hosting](https://atproto.com/guides/self-hosting)
- [PIXIE Holdings](https://github.com/ibloud/pixie-holdings)
- [Atmosphere Field Guide](https://atmosphere.loptrlab.com/)
