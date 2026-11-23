#!/usr/bin/env bash
# Read-only checks for a PDS host. This script does not install or modify software.
set -u

fail=0
pass() { printf 'PASS: %s\n' "$1"; }
warn() { printf 'CHECK: %s\n' "$1"; }
failmsg() { printf 'FAIL: %s\n' "$1"; fail=1; }

printf 'Atmosphere Independence Kit — PDS preflight\n\n'
if [[ -r /etc/os-release ]]; then
  . /etc/os-release
  printf 'OS: %s %s\n' "${PRETTY_NAME:-unknown}" "${VERSION_ID:-}"
  case "${ID:-}" in ubuntu|debian) pass "Ubuntu/Debian family detected";; *) warn "Confirm this OS is supported by the current official PDS installer";; esac
else
  warn "Could not read /etc/os-release"
fi

if command -v free >/dev/null 2>&1; then
  free -h
else
  warn "free command unavailable"
fi
if command -v df >/dev/null 2>&1; then
  df -h /
else
  warn "df command unavailable"
fi
if command -v nproc >/dev/null 2>&1; then
  printf 'CPU cores: %s\n' "$(nproc)"
fi

if [[ "$(id -u)" -eq 0 ]]; then
  pass "Running as root"
else
  warn "Not root; official installer may require sudo"
fi

for cmd in curl; do
  if command -v "$cmd" >/dev/null 2>&1; then pass "$cmd available"; else failmsg "$cmd missing"; fi
done

if command -v systemctl >/dev/null 2>&1; then pass "systemd available"; else warn "systemd not found; confirm deployment method"; fi
if command -v docker >/dev/null 2>&1; then
  docker --version
else
  warn "Docker not installed yet; official installer may install/configure it"
fi

printf '\nNetwork and DNS checks are intentionally not automatic: enter your chosen PDS hostname and verify DNS, public IPv4, TLS, and inbound 80/443 using the provider console and official instructions.\n'
printf 'This preflight makes no changes and does not inspect secrets.\n'
exit "$fail"
