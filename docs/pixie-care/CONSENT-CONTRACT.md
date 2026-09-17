# PIXIE Care Consent Contract

**Status: PROPOSED**

Consent is action-specific. Consent to enter or use the exercise does not imply consent to storage, practitioner sharing, research use, or creator export.

## C1 — Generate the narrative spread

The person explicitly authorizes generation of the requested narrative spread.

If C1 is declined, no narrative is generated.

## C2 — Save the session locally

The person separately authorizes saving the session artifact locally.

If C2 is declined, the system must not retain the session as a saved artifact. Transient runtime state may exist only as technically necessary to complete the current interaction and must not become a saved session by default.

## C3 — Create a practitioner reference summary

The person separately authorizes creation of a `Practitioner Reference Summary` from the session.

If C3 is declined, no practitioner document is created.

## C4 — Transmit or share the practitioner reference summary

The person separately authorizes transmission and confirms the intended recipient or destination immediately before transmission.

If C4 is declined, the locally authorized practitioner document does not leave the current context.

## C5 — Export the narrative into a non-care workflow

The person separately authorizes export of the narrative text into a creator or other non-care workflow.

C5 is deliberately narrower than “export the session.” Only the person-facing narrative text may cross this boundary. Practitioner content, self-reported material, story-artifact properties, consent records, and session metadata do not cross.

## Secondary use

Session artifacts are not used for research, design iteration, model training, product analytics, or other secondary purposes without separate, explicit authorization independent of session consent. The existence of a session does not constitute consent to another use.

## Revocation and deletion

A person may revoke future permission for any consented action where the system still controls the artifact.

Deletion covers, where present:

- the person-facing narrative;
- the saved session artifact;
- the local practitioner reference summary;
- associated local session metadata.

A copy already transmitted to another recipient cannot be retrieved or deleted by this system. The system must not represent successful local deletion as deletion of a recipient's copy.

## No bundled consent language

The interface must not use a single “I consent” control to authorize C1–C5 together. Each consequential transition must identify what will happen, what data crosses a boundary, and what can be reversed before the action occurs.
