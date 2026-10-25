# PIXIE hardware pathways

Checked October 4, 2026. Guidance, not a compatibility certification or installer.

This is the shared hardware reference for Device Stewardship, Creator OS, and Holdings. Their implementations remain separate. A working browser route is the first option; replacing an operating system is never a prerequisite to try PIXIE.

## Start with the task

Record the exact model (not a serial number), processor, OS/browser version, available memory/storage, battery condition, input/accessibility needs, and required peripherals. For music, distinguish audio recording from MIDI control and check adapter power and driver requirements. For games, test the actual controller and screen reader. Age alone does not establish obsolescence.

Choose among keeping, repairing, repurposing, transferring, and recycling. Before an OS change, verify a restorable backup, essential applications, peripherals, accessibility and recovery. A transfer or recycle decision needs a separate data-handling plan. PIXIE does not flash, wipe, repartition, buy or dispose of hardware.

## Device routes

| Device | First route | Alternative-system boundary |
|---|---|---|
| iPad / iPhone | Supported Safari, Files, local exports and available apps; GarageBand is an optional music route | No general supported Linux replacement. Jailbreaking alone does not establish Linux kernel or driver support. Asahi does not support iPads. |
| Intel Mac without T2 | Existing supported macOS/browser; repair or lightweight workflow | Compare a Linux live session with model-specific OCLP support. Verify Wi-Fi, graphics, sleep, audio and accessibility. Do not default to erasing macOS. |
| Intel Mac with T2 | Existing supported OS and browser | Use the t2linux model and feature documentation. These systems need additional drivers and boot configuration; generic PC instructions are insufficient. |
| Apple Silicon Mac | Supported macOS/browser | Consider Fedora Asahi Remix only after reviewing the exact chip/model and feature matrix. Keep internal macOS for installation and maintenance. Newer-series support changes; do not infer compatibility from the M-series name. |
| Android | Existing browser | PIXIE launcher/ROM remains a staged proposal. Check the separately maintained Android plan and official device support before any native build or flashing. |
| Other computers / Raspberry Pi | Supported browser and task-specific tools | Check current distribution/device documentation and accessible input/audio support. Sonic Pi can be a music-coding route on supported environments. |

## OCLP: correct the “memory only” description

OpenCore boot-time patching and OCLP post-install root patches are different. Root patches can modify files on disk and require lowered System Integrity Protection. Updates can require reapplying patches; automatic updates are not a guaranteed seamless path. The official model list controls eligibility, including model-specific exceptions. OCLP does not support Apple Silicon or PowerPC Macs.

Sources: [supported models](https://dortania.github.io/OpenCore-Legacy-Patcher/MODELS.html), [post-install patches and SIP](https://dortania.github.io/OpenCore-Legacy-Patcher/POST-INSTALL.html), [updates and FAQ](https://dortania.github.io/OpenCore-Legacy-Patcher/FAQ.html).

## Asahi and T2

Asahi's installer configures dual boot; its FAQ recommends retaining internal macOS. Supported features vary by model and generation. Read the current feature matrix instead of copying a fixed M1/M2-only statement or an installation command into PIXIE.

Sources: [Asahi feature support](https://asahilinux.org/docs/platform/feature-support/overview/), [Asahi FAQ](https://asahilinux.org/docs/project/faq/), [t2linux feature state](https://wiki.t2linux.org/state/).

## Repair and iPad advocacy

[iFixit's August 6, 2026 article](https://www.ifixit.com/News/118176/apple-could-give-obsolete-ipads-new-life-with-this-one-weird-trick) argues for unlocked bootloaders and repairable batteries to extend useful iPad life. Include it as a right-to-repair perspective, not proof that a daily-use Linux installation is available. Boot access, driver support and battery repair are separate barriers.

Use the current project documentation for experiments; do not present mobile Linux, an emulator, a jailbreak and a native OS install as equivalent.

## Evidence and maintenance

Hardware claims need exact model, OS/tool versions, test date, task, observed result and recovery notes. Label documentation as PROPOSED, implementation with missing device checks as UNVERIFIED, and only the actually tested capability as verified. Touch, VoiceOver, battery life and Cyber-G audio/MIDI must be tested on hardware before claiming support.

Link to this guide from related PIXIE hardware documents instead of duplicating compatibility tables. Recheck external support before recommending any installation; a last-checked date is not ongoing monitoring.

## Refurbished-phone proposal

See [the developer-review pilot analysis](REFURBISHED-PHONE-PILOT.md) for preinstalled PIXIE, maintained Android alternatives, AT authorization, Lifeline evidence and device/accessibility release gates. This is a proposal, not a supported-phone or malware-removal claim.


## Software validation of PIXIE privacy boundaries — 24 October 2026

**Purpose for technical reviewers.** Before testing refurbished phones or custom Android builds, we are verifying the smallest working PIXIE demonstration against consent, privacy, and recovery assumptions. The implementation and smoke tests are in [PIXIE Device Stewardship](https://github.com/ibloud/pixie-device-stewardship); the [Android plan](../ANDROID-IMPLEMENTATION.md), [privacy contract](../SAFETY-AND-PRIVACY.md), [source code](../demo-model.js), [smoke tests](../tests/privacy-boundaries.test.js), and [CI workflow](../.github/workflows/demo-ci.yml) provide the review trail. Implementation gaps are tracked in issues [#28](https://github.com/ibloud/pixie-device-stewardship/issues/28), [#29](https://github.com/ibloud/pixie-device-stewardship/issues/29), and [#30](https://github.com/ibloud/pixie-device-stewardship/issues/30).

### What the software checks actually cover

| Check | Executable evidence | Result / limitation |
|---|---|---|
| Baseline demo behavior | `tests/demo-model.test.js`: transcript opt-out, filenames, new-session reset | Existing GitHub workflow reported **PASS** on documentation PR head `d150814f`: [CI run](https://github.com/ibloud/pixie-device-stewardship/actions/runs/40148389375). This is the demo model only. |
| Opt-in and data carry-over | `tests/privacy-boundaries.test.js`: default no transcript; reset does not carry a private draft; no external action claimed | **PASS** — [GitHub Actions run 40148904654](https://github.com/ibloud/pixie-device-stewardship/actions/runs/40148904654). An assertion of local model behavior, not proof of storage deletion. |
| Provider-claim safety | New smoke test checks that selecting translation does not claim provider contact or audio processing | **PASS** — [GitHub Actions run 40148904654](https://github.com/ibloud/pixie-device-stewardship/actions/runs/40148904654). A simulated response is not a network-capture audit. |
| Filename sanitization | New smoke test rejects traversal and markup input across modeled scenarios | **PENDING CI result.** Does not test Android filesystem APIs. |
| Consent and revocation for live external connectors | No live test harness exists in the inspected demo | **NOT TESTED**; issue #29. |
| Retention, remote deletion and backups | No storage/service deletion implementation exists in the inspected demo | **NOT TESTED**; issue #28. |
| Android permissions, TalkBack, ROM and verified boot | No runnable Android artifact or device available in this repository | **NOT TESTED**; issue #30. |

**Execution boundary:** Repository checkout from the local container was blocked by unavailable DNS to GitHub. The new tests are committed to the existing branch and wired into the repository's GitHub Actions workflow, which supplies the runnable verification environment. The GitHub Actions workflow passed on commit `3fe5032e`, which includes the new smoke tests and test runner changes; the later documentation-only edit does not alter test code. A CI pass is not evidence that the full privacy design, real-device permission revocation, or firmware security is implemented.

### First hardware gate

Do not purchase or flash a device yet. First resolve the integration and retention acceptance criteria in #28 and #29 using synthetic fixtures and mock services. After a runnable launcher APK exists, test permission refusal, offline behavior, keyboard navigation and TalkBack on an Android emulator, then on a supported physical device. Record device model, OS/build and test artifacts with each result. Never claim verified privacy, malware removal, or accessibility certification from a documentation-only check.
