#!/usr/bin/env bash
# Run a previously reviewed official installer with explicit user confirmation.
set -euo pipefail

INSTALLER="${1:-./pds-installer-review.sh}"
if [[ ! -f "$INSTALLER" ]]; then
  printf 'Installer not found: %s\n' "$INSTALLER" >&2
  printf 'Download it with scripts/prepare-installer.sh first.\n' >&2
  exit 1
fi
printf 'This will run the installer with elevated privileges and modify this server.\n'
printf 'Review the file first: %s\n' "$INSTALLER"
read -r -p 'Type I_HAVE_REVIEWED to continue: ' CONFIRM
if [[ "$CONFIRM" != "I_HAVE_REVIEWED" ]]; then
  echo "Cancelled."
  exit 1
fi
exec sudo bash "$INSTALLER"
