"use strict";
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { routeSignup, PILOT } = require("../integrations/artist-consent-router.js");
const valid = () => ({
 event_id: "test-event-1", type: "contact.opted_in", project: PILOT.project, artist: PILOT.artist,
 destination: "laylo", contact: { email: "fan@example.org" },
 provenance: { source: "artist-owned-signup", recorded_at: "2026-10-24T00:00:00Z" },
 consent: { granted: true, purpose: "artist-marketing", destination: "laylo",
  evidence_ref: "private-consent-log:1", notice_version: "pilot-v1", recorded_at: "2026-10-24T00:00:00Z" }
});
test("eligible explicit opt-in is only previewed", () => {
 const result = routeSignup(valid(), {now:()=> "2026-10-24T00:00:00Z"});
 assert.equal(result.status, "ready-for-review");
 assert.equal(result.preview.email, "fan@example.org");
 assert.equal(result.audit.status, "pending-human-review");
});
test("purchase cannot become marketing consent", () => {
 const e=valid(); e.type="release.purchased"; assert.equal(routeSignup(e).status,"ignored");
});
test("consent without affirmative evidence is blocked", () => {
 const e=valid(); delete e.consent.evidence_ref;
 assert.equal(routeSignup(e).status,"blocked");
});
test("opt-out is not a provider signup call", () => {
 const e=valid(); e.type="contact.unsubscribed";
 assert.equal(routeSignup(e).status,"requires-provider-suppression");
});
test("wrong artist blocked", () => {
 const e=valid(); e.artist="Other"; assert.equal(routeSignup(e).status,"blocked");
});
test("wrong provider blocked", () => {
 const e=valid(); e.destination="another"; assert.equal(routeSignup(e).status,"blocked");
});
test("revoked consent blocked", () => {
 const e=valid(); e.consent.revoked_at="2026-10-24T00:02:00Z";
 assert.equal(routeSignup(e).status,"blocked");
});
test("invalid email blocked", () => {
 const e=valid(); e.contact.email="bad"; assert.equal(routeSignup(e).status,"blocked");
});
