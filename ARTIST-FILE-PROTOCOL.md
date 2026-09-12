# Artist File Protocol

## Principle

The artist describes what was made in plain language. The system translates that description into a filename, path, version, and manifest entry.

The artist never has to remember a machine convention in order to preserve creative work.

## Intake

The system asks only what it cannot derive safely:

1. **What project is this for?**
2. **Is this something you are developing, using as a reference, or treating as finished?**
3. **Who made it, or who else is part of it?**
4. **What do you want to remember about this moment?**
5. **Does this replace an earlier version, or is it a new direction?**

The device supplies the date. File type comes from the originating application. Version numbers come from the project manifest. A known project or collaborator should be suggested rather than requested again.

## Generated name

```text
YYYY-MM-DD_[project-slug]_[descriptor]_[feat-collaborator]_v[NN]_[state].[ext]
```

Example:

```text
2026-09-12_fifty-ways_bridge-take_feat-charlie_v02_draft.wav
```

Rules:

- lowercase descriptive segments;
- hyphens within segments and underscores between fields;
- ISO 8601 date;
- zero-padded version;
- state immediately before the source extension;
- original extension preserved;
- filename shown as a result, never as an input field.

## Default creative taxonomy

```text
projects/[project-slug]/
  audio/
    drafts/
    references/
    finals/
    stems/
  video/
  images/
  documents/
  exports/
  archive/
```

The taxonomy is a default, not a demand. PIXIE must learn and display the person's preferred vocabulary. It must not move an existing file merely to enforce its own neatness.

## Manifest

```csv
event_id,recorded_at,source_name,generated_name,project,descriptor,collaborators,state,version,note,current_path,previous_path,action,status,correction_of
```

The manifest is append-only. Corrections create new events referencing the earlier event. A human-readable activity view must be available; CSV is an interchange format, not the primary interface.

## Archive and deletion

- PIXIE may suggest archiving but never archive automatically.
- Superseded files remain recoverable and are marked in the manifest.
- Deletion is never inferred from age, duplication, inactivity, missed check-ins, or storage pressure.
- Every destructive action requires an exact preview and deliberate confirmation.

## Retrieval

People should be able to ask:

- “Where is the bridge take Charlie sent me?”
- “Show the last version before the final.”
- “What did I record after the session break?”
- “Which files have no clear source?”

Answers must include the file, current location, why it matched, and any uncertainty.

