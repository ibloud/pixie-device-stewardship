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
