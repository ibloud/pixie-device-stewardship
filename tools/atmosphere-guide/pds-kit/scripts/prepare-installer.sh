#!/usr/bin/env bash
# Download a pinned official PDS installer for review; do not execute it.
set -euo pipefail

DEST="${1:-./pds-installer-review.sh}"
PDS_COMMIT="86cff638bde58612fe04c09211e44b4a453e212a"
SOURCE="https://raw.githubusercontent.com/bluesky-social/pds/${PDS_COMMIT}/installer.sh"

if [[ -e "$DEST" ]]; then
  printf 'Refusing to overwrite: %s\n' "$DEST" >&2
  exit 1
fi
command -v curl >/dev/null || { echo "curl is required" >&2; exit 1; }
curl --fail --show-error --location --proto '=https' --tlsv1.2 "$SOURCE" --output "$DEST"
chmod 600 "$DEST"
printf 'Downloaded installer from pinned PDS commit %s\n' "$PDS_COMMIT"
printf 'Source: %s\n' "$SOURCE"
if command -v sha256sum >/dev/null 2>&1; then sha256sum "$DEST"; fi
printf 'Review the downloaded file and compare its commit/source before running it. This script does NOT execute the installer.\n'
