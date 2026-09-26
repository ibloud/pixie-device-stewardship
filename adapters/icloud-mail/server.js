import http from "node:http";
import { writeFile } from "node:fs/promises";
import { ImapFlow } from "imapflow";

const PORT = Number(process.env.PORT || 3000);
const email = process.env.ICLOUD_EMAIL || "";
const password = process.env.ICLOUD_APP_PASSWORD || "";
const indexOnStart = process.env.PIXIE_MAIL_INDEX_ON_START === "true";

let indexState = {
  enabled: indexOnStart,
  state: indexOnStart ? "pending" : "disabled",
  startedAt: null,
  finishedAt: null,
  folders: 0,
  foldersCompleted: 0,
  messages: 0,
  candidates: 0,
  errors: []
};

function client() {
  if (!email || !password) throw new Error("iCloud credentials not configured");
  return new ImapFlow({
    host: "imap.mail.me.com",
    port: 993,
    secure: true,
    auth: { user: email, pass: password },
    logger: false
  });
}

function addresses(items = []) {
  return items.map(x => ({ name: x?.name || null, address: x?.address || null }));
}

function looksActionable(subject = "") {
  return /(action required|deadline|due|follow.?up|request|case|ticket|notice|hearing|appeal|complaint|invoice|payment|renewal|verification|recertification|application|grant|proposal|contract|records? request|status update|response required)/i.test(subject);
}

async function folders() {
  const c = client();
  await c.connect();
  try {
    const rows = await c.list();
    return rows.map(x => ({ path: x.path, specialUse: x.specialUse || null }));
  } finally {
    await c.logout().catch(() => {});
  }
}

async function buildMetadataIndex() {
  indexState = {
    enabled: true,
    state: "running",
    startedAt: new Date().toISOString(),
    finishedAt: null,
    folders: 0,
    foldersCompleted: 0,
    messages: 0,
    candidates: 0,
    errors: []
  };

  const candidates = [];
  const writeSnapshot = async partial => {
    await writeFile("/tmp/pixie-mail-candidates.json", JSON.stringify({
      generatedAt: new Date().toISOString(),
      mode: "read-only-metadata",
      partial,
      note: "Subjects and addressing metadata only. No message bodies or attachments.",
      errors: indexState.errors,
      candidates
    }, null, 2));
  };

  let folderRows = [];
  const listingClient = client();

  try {
    await listingClient.connect();
    folderRows = await listingClient.list();
    indexState.folders = folderRows.length;
  } catch (error) {
    indexState.errors.push({ stage: "list-folders", error: error.message });
    indexState.state = "failed";
    indexState.finishedAt = new Date().toISOString();
    await writeSnapshot(true).catch(() => {});
    return;
  } finally {
    await listingClient.logout().catch(() => {});
  }

  for (const folder of folderRows) {
    const c = client();
    try {
      await c.connect();
      const mailbox = await c.mailboxOpen(folder.path, { readOnly: true });

      if ((mailbox.exists || 0) > 0) {
        for await (const msg of c.fetch("1:*", { uid: true, envelope: true, internalDate: true })) {
          indexState.messages += 1;
          const subject = msg.envelope?.subject || "";
          if (!looksActionable(subject)) continue;

          candidates.push({
            folder: folder.path,
            uid: msg.uid,
            date: msg.envelope?.date || msg.internalDate || null,
            subject,
            from: addresses(msg.envelope?.from),
            to: addresses(msg.envelope?.to)
          });
          indexState.candidates += 1;
        }
      }

      indexState.foldersCompleted += 1;
    } catch (error) {
      indexState.errors.push({ folder: folder.path, error: error.message });
    } finally {
      await c.logout().catch(() => {});
      await writeSnapshot(true).catch(() => {});
    }
  }

  indexState.state = indexState.errors.length ? "complete_with_errors" : "complete";
  indexState.finishedAt = new Date().toISOString();
  await writeSnapshot(false).catch(error => {
    indexState.errors.push({ stage: "write-final-index", error: error.message });
    indexState.state = "complete_with_errors";
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");
  const pathname = new URL(req.url || "/", "http://localhost").pathname;

  if (pathname === "/health") {
    res.end(JSON.stringify({
      ok: true,
      service: "PIXIE iCloud Mail Adapter",
      mode: "read-only",
      credentialsConfigured: Boolean(email && password),
      mailboxIndex: { enabled: indexState.enabled, state: indexState.state }
    }));
    return;
  }

  if (pathname === "/probe/folders") {
    try {
      res.end(JSON.stringify({ folders: await folders() }));
    } catch (error) {
      res.statusCode = 503;
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  if (pathname === "/scan/status") {
    res.end(JSON.stringify(indexState));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("PIXIE iCloud Mail Adapter listening", PORT);
  if (indexOnStart) buildMetadataIndex();
});
