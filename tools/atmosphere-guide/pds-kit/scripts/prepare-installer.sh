#!/usr/bin/env bash
# Download the official PDS installer to a reviewable file; do not execute it.
set -euo pipefail

DEST="${1:-./pds-installer-review.sh}"
SOURCE="https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh"

if [[ -e "$DEST" ]]; then
  printf 'Refusing to overwrite: %s\n' "$DEST" >&2
  exit 1
fi

command -v curl >/dev/null || { echo "curl is required" >&2; exit 1; }
curl --fail --show-error --location --proto '=https' --tlsv1.2 "$SOURCE" --output "$DEST"
chmod 600 "$DEST"
printf 'Downloaded official installer to %s\n' "$DEST"
printf 'Source: %s\n' "$SOURCE"
printf 'Review this file and verify the source/release before running it. This script does NOT execute the installer.\n'
