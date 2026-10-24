"use strict";

/**
 * PIXIE artist-signup routing pilot.
 * No network requests, credentials, storage, or automated enrollment.
 * Never treat a purchase, visit, public follow, or event RSVP as marketing consent.
 */
const PILOT = Object.freeze({
  artist: "I.B.Loud",
  work: "50 Ways to Leave Another",
  project: "50-ways-to-leave-another",
  source: "artist-owned-signup"
});
const ALLOWED = new Set(["contact.opted_in", "contact.unsubscribed"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function routeSignup(event, { destination = "laylo", now = () => new Date().toISOString() } = {}) {
  if (!event || typeof event !== "object" || Array.isArray(event)) throw new TypeError("Event must be an object");
  if (!event.event_id || typeof event.event_id !== "string") throw new Error("event_id required for idempotency");
  if (!ALLOWED.has(event.type)) return { status: "ignored", reason: "not-a-consent-event" };
  if (event.project !== PILOT.project || event.artist !== PILOT.artist) return { status: "blocked", reason: "artist-project-mismatch" };
  if (event.destination !== destination) return { status: "blocked", reason: "destination-not-authorized" };
  if (!event.provenance || !event.provenance.source || !event.provenance.recorded_at) return { status: "blocked", reason: "missing-provenance" };
  if (event.type === "contact.unsubscribed") {
    // A suppression event is deliberately NOT a signup API call.
    return { status: "requires-provider-suppression", reason: "unsubscribe-must-be-honored-before-further-sends", event_id: event.event_id };
  }
  if (event.consent?.granted !== true || event.consent?.purpose !== "artist-marketing" ||
      event.consent?.destination !== destination || !event.consent?.evidence_ref ||
      !event.consent?.notice_version || !event.consent?.recorded_at) {
    return { status: "blocked", reason: "explicit-destination-consent-required" };
  }
  if (event.consent.revoked_at) return { status: "blocked", reason: "consent-revoked" };
  if (!event.contact?.email || !EMAIL.test(event.contact.email)) return { status: "blocked", reason: "valid-email-required" };
  // Default to preview. Callers must implement authenticated provider transport,
  // durable idempotency, suppression, retry and signed/audited operator approval.
  return {
    status: "ready-for-review",
    event_id: event.event_id,
    destination,
    preview: { email: event.contact.email.trim().toLowerCase(), project: PILOT.project, artist: PILOT.artist },
    audit: {
      event_id: event.event_id, action: "preview-opt-in", status: "pending-human-review",
      source: event.provenance.source, recorded_at: now(), consent_evidence_ref: event.consent.evidence_ref
    }
  };
}

module.exports = { PILOT, routeSignup };
