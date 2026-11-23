import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const client = path.resolve(here, "../dist/client");
const publicCss = path.resolve(client, "assets/atmosphere.css");
const sourceCss = path.resolve(here, "../src/guide.css");
await mkdir(path.dirname(publicCss), { recursive: true });
await copyFile(sourceCss, publicCss);

const required = [
  "field-notes/index.html",
  "field-notes/an-artist-should-be-a-node-not-a-tenant/index.html",
  "field-notes/your-infrastructure-is-a-business-decision/index.html",
];
for (const rel of required) {
  const file = path.join(client, rel);
  const html = await readFile(file, "utf8");
  if (!/<title>[^<]+<\/title>/i.test(html) || !/<h1\b/i.test(html)) {
    throw new Error("Field Notes page is missing a title or heading: " + rel);
  }
  if (!/href="\\/assets\\/atmosphere\\.css(?:\\?[^"]*)?"/.test(html)) {
    throw new Error("Field Notes page is not using the shared Atmosphere stylesheet: " + rel);
  }
  const refs = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!ref.startsWith("/") || ref.startsWith("//") || ref.startsWith("/#")) continue;
    const pathname = ref.split(/[?#]/, 1)[0];
    let target = path.join(client, pathname.replace(/^\//, ""));
    if (pathname.endsWith("/")) target = path.join(target, "index.html");
    else {
      try { await stat(target); }
      catch { target = path.join(target, "index.html"); }
    }
    try { await stat(target); }
    catch { throw new Error("Broken local link or asset in " + rel + ": " + ref); }
  }
}
const css = await readFile(publicCss, "utf8");
if (!css.includes("Shared Field Notes publication components")) {
  throw new Error("Generated shared stylesheet lacks Field Notes components.");
}
console.log("Field Notes publication verified: routes, titles, shared CSS, and local links/assets.");
