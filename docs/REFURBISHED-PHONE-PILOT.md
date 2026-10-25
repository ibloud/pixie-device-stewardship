# PIXIE refurbished-phone pilot — developer review

Status: PROPOSED. Reviewed October 24, 2026. No ROM, launcher, malware-removal tool, AT sign-in implementation, certified handset or distribution partnership is delivered by this proposal. Extend [Hardware pathways](HARDWARE-PATHWAYS.md); do not create another hardware project or duplicate existing Android implementation work. Before implementation, locate and review the separately maintained Android plan referenced there.

## Scope and destination

This analysis belongs to PIXIE Device Stewardship developer documentation, not the Atmosphere app directory. The accompanying theme/onboarding work affects only `tools/atmosphere-guide`, ultimately served at atmosphere.loptrlab.com by the existing deployment wrapper. The root Device Stewardship demo, Made-Sick, 50 Ways, Creator OS and training sites are not being restyled. Review this branch through the Vercel Atmosphere preview before authorizing any merge or production deployment.

## Product recommendation

Pilot one supported refurbished Android model with removable PIXIE assistance and an optional accessible launcher, using a maintained OS. Start with existing inventory. Keep calls, contacts, settings and recovery accessible without an AT account. Do not require a caregiver account, cloud AI, advertising, analytics or a public profile to use local assistance. A simplified interface is an option, not an assumption about disabled or older people; recruit consenting participants with different access needs.

Compare three approaches: (1) ordinary app/launcher on supported stock software, (2) maintained replacement Android OS plus PIXIE, (3) a separate distribution with our own signed builds and updates. Begin with the first two. A custom distribution makes us responsible for signing-key security, OTA updates, vulnerability response, recovery images, upstream integration and support. Do not call an unofficial build GrapheneOS or imply upstream endorsement.

Installing PIXIE or disabling bundled applications does not establish that malware is removed. A factory reset may restore a compromised system image. A replacement system can still retain proprietary modem, bootloader and vendor firmware; it cannot promise to repair unsupported components. No flashing or removal instructions should be issued without exact model, trusted image, supported procedure and verified recovery. Protect existing evidence before remediation, with consent; keep identifiers and personal contents out of public issues.

## Candidate matrix (recheck before acquisition)

| Candidate | Purpose | Boundary |
|---|---|---|
| OEM-unlockable Pixel 8 / 8a | First replacement-OS pilot candidate; GrapheneOS lists support | Confirm exact variant, remaining vendor support, battery and ability to unlock OEM bootloader. SIM/carrier unlock is different. Relock only through the OS's supported procedure. |
| Existing older supported Android | Browser/native baseline; possible LineageOS experiment | Verify exact model/codename against current official builds, firmware requirements and recovery. An Android patch date alone does not prove vendor components are maintained. |
| Supported Fairphone with /e/OS | Repairability and preinstalled-OS comparison | Check exact model, vendor update lifetime, U.S. carrier acceptance, VoLTE and essential-app compatibility; availability abroad is not U.S. suitability. |
| Existing supported iPhone/iPad | Browser and accessibility comparison | Follow Hardware pathways. No general supported replacement Linux route; do not equate jailbreak with supported OS replacement. |
| Lumia 950 / 950 XL | Optional isolated developer experiment | Windows 10 Mobile support ended December 2019. Mainline4Lumia's 950 XL matrix lacks calls, data, SMS and other essentials. Not a recipient or emergency-use candidate. |
| Unsupported/dubious-provenance Lifeline handset | Consented evidence collection and feasibility assessment | Do not enroll a person into a daily-use trial or promise decontamination. A locked bootloader or missing trusted firmware may rule out reuse. |

## Apple development implications

Keep the browser-first route and task-state recovery. Apple Foundation Models require compatible hardware and runtime availability; they are optional acceleration, not the minimum specification. Apple's continued-processing background tasks can finish eligible user-started native jobs, not provide unrestricted persistent monitoring. iOS sandboxing means cross-app/file access must use supported APIs and explicit permissions. Record model, OS/browser, security status and task independently; no hardware compatibility or VoiceOver acceptance is established by a successful web build.

## Identity and privacy

Use AT Protocol OAuth through the participant's chosen PDS when network participation is requested; Apple, Google and Microsoft social login are not required for PIXIE. OAuth is the authorization protocol, not a requirement to depend on those providers. Use maintained AT SDKs and least permissions, keep tokens protected, and test logout, revocation and recovery. Hosting our own PDS remains a separate operational decision, not a prerequisite for the pilot. AT Protocol does not supply cellular service, emergency calls or a private health/caregiver-record store. Never put confidential support records in ordinary public AT repositories. Define a separate private-data design and permissions before any sharing.

## Evidence: Lifeline-associated preinstalled malware

These are third-party historical findings, not PIXIE tests or evidence that all Lifeline phones are infected:

- Malwarebytes, January 9, 2020: UMX U683CL investigation; the revised article records a February 11, 2020 software fix. Include that correction and distinguish remaining payload cleanup. Older coverage sometimes uses U686CL; retain the exact identifier associated with each source, not a blended model claim.
- Malwarebytes, July 8, 2020: ANS UL40 analysis on Android 7.1.1; observed WirelessUpdate installing HiddenAds variants. Its Settings analysis includes limitations: the researchers did not trigger the suspected Settings behavior during their test.
- Public Knowledge and New America's Open Technology Institute submitted FCC comments raising these issues and asking for privacy protections without withdrawing access to free handsets. This is a prior advocacy record, not proof that a particular official ignored it or that an allegation was adjudicated.

Lifeline subsidizes service rather than being a general handset procurement contract. Separate program-participation conditions from actual device-purchasing contracts. Proposed protections: independent preinstalled-software assessment, disclosure of privileged installers and data collection, published update/support periods, necessary-data limits, accessible complaints, safe replacements without service interruption, and published enforcement outcomes. Verify current law and agency authority with qualified policy/legal reviewers before describing any protection as mandatory or claiming a violation.

## Release gates and ownership

Developers: inventory model/codename, firmware/vendor patch level, OS/browser, boot state, update source and recovery; verify signed updates and rollback/recovery behavior on a spare device. Do not test emergency numbers with unarranged live calls; coordinate any emergency-service verification with the carrier/appropriate authority.

Device/carrier reviewer: confirm normal inbound/outbound calling, SMS, VoLTE, data, Wi-Fi, Bluetooth/hearing equipment, battery and charging, essential apps, and carrier acceptance for the exact SKU. Authentication and push-notification dependencies need actual tests without Google services; no blanket banking, health-app or telephony compatibility claim.

Accessibility reviewer and consenting participants: screen reader setup and recovery, magnification and text enlargement, contrast, touch targets, switch/voice input where needed, motor/cognitive workload, offline behavior, error recovery and loss of connectivity. Preserve exit routes to ordinary settings and apps. Caregiver delegation, if developed, requires specific revocable consent, not shared credentials or covert monitoring.

Maintainer: publish supported models, update owner, support end date, replacement process and incident-reporting route before any distribution. Keep unsupported hardware experiments separate from recipient devices. Approval to research is not approval to flash personal devices, enroll participants, send outreach or distribute phones.

Finished-state evidence: reproducible device results, participant-reviewed accessibility findings, working recovery/update procedures, documented support ownership and an explicit go/no-go decision. Until then label the pilot UNVERIFIED/PROPOSED.

## Outreach for review, not sending

Start with Public Knowledge (`pk@publicknowledge.org`) about the earlier FCC filing and current gaps. Use the FCC consumer complaint channel for specific provider/device harms, Minnesota AG for applicable consumer/privacy concerns, and constituent congressional offices for a written oversight request. Ask for legislation/votes, oversight correspondence, applicable rules, enforcement outcomes and a dated next action. Track non-response separately from opposition or inaction. No recipient-specific legislative record has been established here; do not imply one.

## Sources reviewed

- [GrapheneOS support, firmware limits and redistribution](https://grapheneos.org/faq) and [installation](https://grapheneos.org/install/web).
- [Pixel vendor support](https://support.google.com/pixelphone/answer/4457705).
- [LineageOS optional Google Apps](https://wiki.lineageos.org/gapps/) and [device requirements](https://github.com/LineageOS/charter/blob/main/device-support-requirements.md).
- [/e/OS device and preinstalled-phone guidance](https://doc.e.foundation/devices/support-and-phones/).
- [Microsoft lifecycle](https://learn.microsoft.com/en-us/lifecycle/announcements/windows-10-mobile-end-of-support) and [Mainline4Lumia matrix](https://mainline4lumia.github.io/devices/cityman/).
- [AT OAuth architecture and SDKs](https://atproto.com/guides/about-oauth).
- [Apple Foundation Models](https://developer.apple.com/documentation/foundationmodels), [continued processing](https://developer.apple.com/documentation/BackgroundTasks/performing-long-running-tasks-on-ios-and-ipados), [runtime sandboxing](https://support.apple.com/en-ca/guide/security/sec15bfe098e/web), [security releases](https://support.apple.com/en-us/100100).
- [Malwarebytes UMX investigation, including correction](https://www.malwarebytes.com/blog/android/2020/01/united-states-government-funded-phones-come-pre-installed-with-unremovable-malware) and [ANS investigation](https://www.malwarebytes.com/blog/news/2020/07/we-found-yet-another-phone-with-pre-installed-malware-via-the-lifeline-assistance-program).
- [OTI/Public Knowledge FCC comments](https://publicknowledge.org/wp-content/uploads/2021/11/OTI-and-PK-Lifeline-FNPRM-Comments.pdf).
- [Public Knowledge contact](https://publicknowledge.org/about-us/contact-us/), [FCC complaints](https://consumercomplaints.fcc.gov/hc/en-us), [Minnesota AG](https://www.ag.state.mn.us/office/complaint.asp).
