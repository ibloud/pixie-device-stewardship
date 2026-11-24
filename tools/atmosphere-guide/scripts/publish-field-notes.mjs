import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const client = path.resolve(here, "../dist/client");
const publicCss = path.resolve(client, "assets/atmosphere.css");
const sourceCss = path.resolve(here, "../src/guide.css");
await mkdir(path.dirname(publicCss), { recursive: true });
await copyFile(sourceCss, publicCss);

const breadcrumbData = {
  "field-notes/the-architecture-of-silence/index.html": [["Loptr Lab", "https://atmosphere.loptrlab.com/"], ["Field Notes", "https://atmosphere.loptrlab.com/field-notes/"], ["The Architecture of Silence", "https://atmosphere.loptrlab.com/field-notes/the-architecture-of-silence/"]],
  "field-notes/who-owns-the-record/index.html": [["Loptr Lab", "https://atmosphere.loptrlab.com/"], ["Field Notes", "https://atmosphere.loptrlab.com/field-notes/"], ["Who Owns the Record?", "https://atmosphere.loptrlab.com/field-notes/who-owns-the-record/"]],
  "field-notes/accessibility-is-not-a-favor/index.html": [["Loptr Lab", "https://atmosphere.loptrlab.com/"], ["Field Notes", "https://atmosphere.loptrlab.com/field-notes/"], ["Accessibility Is Not a Favor", "https://atmosphere.loptrlab.com/field-notes/accessibility-is-not-a-favor/"]],
  "field-notes/the-reality-of-change/index.html": [["Loptr Lab", "https://atmosphere.loptrlab.com/"], ["Field Notes", "https://atmosphere.loptrlab.com/field-notes/"], ["The Reality of Change", "https://atmosphere.loptrlab.com/field-notes/the-reality-of-change/"]],
  "field-notes/index.html": [["Loptr Lab", "https://atmosphere.loptrlab.com/"], ["Field Notes", "https://atmosphere.loptrlab.com/field-notes/"]],
  "field-notes/an-artist-should-be-a-node-not-a-tenant/index.html": [["Loptr Lab", "https://atmosphere.loptrlab.com/"], ["Field Notes", "https://atmosphere.loptrlab.com/field-notes/"], ["An Artist Should Be a Node, Not a Tenant", "https://atmosphere.loptrlab.com/field-notes/an-artist-should-be-a-node-not-a-tenant/"]],
  "field-notes/your-infrastructure-is-a-business-decision/index.html": [["Loptr Lab", "https://atmosphere.loptrlab.com/"], ["Field Notes", "https://atmosphere.loptrlab.com/field-notes/"], ["Your Infrastructure Is a Business Decision", "https://atmosphere.loptrlab.com/field-notes/your-infrastructure-is-a-business-decision/"]],
};

const required = [
  "field-notes/the-architecture-of-silence/index.html",
  "field-notes/who-owns-the-record/index.html",
  "field-notes/accessibility-is-not-a-favor/index.html",
  "field-notes/the-reality-of-change/index.html",
  "field-notes/index.html",
  "field-notes/an-artist-should-be-a-node-not-a-tenant/index.html",
  "field-notes/your-infrastructure-is-a-business-decision/index.html",
];
for (const rel of required) {
  const file = path.join(client, rel);
  let html = await readFile(file, "utf8");
  const crumbs = breadcrumbData[rel];
  if (!crumbs) throw new Error("Missing SEO breadcrumb definition: " + rel);
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map(([name, item], position) => ({ "@type": "ListItem", position: position + 1, name, item })) };
  html = html.replace("</head>", `<script type="application/ld+json" data-field-notes-breadcrumbs>${JSON.stringify(schema)}</script></head>`);
  await writeFile(file, html);
  if (!/<title>[^<]+<\/title>/i.test(html) || !/<h1\b/i.test(html)) {
    throw new Error("Field Notes page is missing a title or heading: " + rel);
  }
  if (!/href=["']\/assets\/atmosphere\.css(?:[?#][^"']*)?["']/i.test(html)) {
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
