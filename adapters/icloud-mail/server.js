import http from "node:http";
import { ImapFlow } from "imapflow";

const PORT = Number(process.env.PORT || 3000);
const email = process.env.ICLOUD_EMAIL || "";
const password = process.env.ICLOUD_APP_PASSWORD || "";

async function folders() {
  if (!email || !password) throw new Error("iCloud credentials not configured");
  const client = new ImapFlow({
    host: "imap.mail.me.com",
    port: 993,
    secure: true,
    auth: { user: email, pass: password },
    logger: false
  });
  await client.connect();
  try {
    const rows = await client.list();
    return rows.map(x => ({ path: x.path, specialUse: x.specialUse || null }));
  } finally {
    await client.logout().catch(() => {});
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");
  if (req.url === "/health") {
    res.end(JSON.stringify({
      ok: true,
      service: "PIXIE iCloud Mail Adapter",
      mode: "read-only",
      credentialsConfigured: Boolean(email && password)
    }));
    return;
  }
  if (req.url === "/probe/folders") {
    try {
      res.end(JSON.stringify({ folders: await folders() }));
    } catch (error) {
      res.statusCode = 503;
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("PIXIE iCloud Mail Adapter listening", PORT);
});
