// Builds the Creator Crew site into dist/ — no dependencies, Node 18+.
//
//   node build.mjs
//
// - pages/**/*.md -> content pages (a small, deliberate markdown subset);
//                    folders mirror URLs: pages/content/ -> /content/
// - src/*.html    -> hand-written pages (home, 404)
// - static/       -> copied as-is (fonts, images, css, _headers, favicons)
// - site.config.json values are substituted as {{key}} into pages
//
// The build FAILS if the rendered copy uses banned vocabulary (the book's
// rules: no join/belong/community/membership, no kid/kids, no Discord),
// and WARNS while any REPLACE_WITH_ placeholder is still unfilled.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";

const ROOT = dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const DIST = join(ROOT, "dist");
const cfg = JSON.parse(readFileSync(join(ROOT, "site.config.json"), "utf8"));
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// ---------- pages (order = nav order) ----------
// Creator Crew covers the whole series. Each title is a specialisation with
// its own section (/content/, later /music/, /apps-and-games/); pages in a
// section set `section` to its landing path, which gives them a breadcrumb
// and highlights the section in the nav. Regulation Watch and Privacy are
// series-wide, at the top level. Moved pages keep their old URL working
// through static/_redirects.
const PAGES = [
  { src: "src/home.html", out: "index.html", path: "/", nav: "Home", title: null },
  { src: "pages/content/index.md", out: "content/index.html", path: "/content/", nav: "Content" },
  { src: "pages/content/apps-and-ai-tools.md", out: "content/apps-and-ai-tools/index.html", path: "/content/apps-and-ai-tools/", section: "/content/" },
  { src: "pages/regulation-watch.md", out: "regulation-watch/index.html", path: "/regulation-watch/", nav: "Regulation Watch" },
  { src: "pages/privacy.md", out: "privacy/index.html", path: "/privacy/", nav: "Privacy" },
  { src: "src/404.html", out: "404.html", path: null, title: "Page not found", noindex: true },
];

// ---------- tiny markdown subset ----------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function inline(text) {
  let t = esc(text);
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    const ext = /^https?:\/\//.test(url);
    return `<a href="${url}"${ext ? ' rel="noopener"' : ""}>${label}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  return t;
}

function frontMatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return [{}, md];
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^"|"$/g, "");
  }
  return [meta, md.slice(m[0].length)];
}

function markdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  const isBlank = (l) => !l.trim();
  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) { i++; continue; }
    let m;
    if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
      const lvl = m[1].length, html = inline(m[2]);
      out.push(`<h${lvl} id="${slug(html)}">${html}</h${lvl}>`); i++; continue;
    }
    if (/^---\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    if (/^>\s?/.test(line)) {                       // callout block
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<aside class="callout">${markdown(buf.join("\n"))}</aside>`); continue;
    }
    if ((m = line.match(/^(\s*)([-*]|\d+\.)\s+/))) { // list (with wrapped continuation lines)
      const ordered = /\d/.test(m[2]);
      const items = [];
      while (i < lines.length && !isBlank(lines[i])) {
        const it = lines[i].match(/^\s*([-*]|\d+\.)\s+(.*)$/);
        if (it) items.push(it[2]); else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</${tag}>`); continue;
    }
    const buf = [];                                   // paragraph
    while (i < lines.length && !isBlank(lines[i]) && !/^(#{1,3}\s|>|\s*([-*]|\d+\.)\s|---\s*$)/.test(lines[i])) buf.push(lines[i++].trim());
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}

// ---------- helpers ----------
function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    const a = join(from, name), b = join(to, name);
    statSync(a).isDirectory() ? copyDir(a, b) : copyFileSync(a, b);
  }
}
const fill = (s) => s.replace(/\{\{(\w+)\}\}/g, (all, k) => (k in cfg ? esc(String(cfg[k])) : all));

// ---------- build ----------
// Empty dist/ rather than deleting it: on Windows, a folder that's another
// process's working directory (a local preview server, an editor) can't be
// removed, but its contents can.
mkdirSync(DIST, { recursive: true });
for (const name of readdirSync(DIST)) rmSync(join(DIST, name), { recursive: true, force: true });
copyDir(join(ROOT, "static"), DIST);

const cssHash = createHash("sha256").update(readFileSync(join(DIST, "css", "site.css"))).digest("hex").slice(0, 10);
const layout = read("src/layout.html");
const nav = (page) => PAGES.filter((p) => p.nav).map((p) => {
  const cur = p.path === page.path ? ' aria-current="page"' : p.path === page.section ? ' aria-current="true"' : "";
  return `<li><a href="${p.path}"${cur}>${esc(p.nav)}</a></li>`;
}).join("");
const crumbs = (page) => {
  const parent = page.section && PAGES.find((p) => p.path === page.section);
  return parent ? `<nav class="crumbs" aria-label="Breadcrumb"><a href="${parent.path}">${esc(parent.nav)}</a></nav>` : "";
};

const problems = [], warnings = [], indexed = [];
const BANNED = [
  [/\bjoin\w*/i, "join"], [/\bbelong\w*/i, "belong"], [/\bcommunit\w*/i, "community"],
  [/\bmembers?(hip)?\b/i, "member(ship)"], [/\bkids?\b/i, "kid/kids"], [/\bdiscord\b/i, "Discord"],
];

for (const page of PAGES) {
  let body, meta = {};
  if (page.src.endsWith(".md")) {
    const [m, md] = frontMatter(read(page.src));
    meta = m;
    const updated = meta.updated ? `<p class="updated">Last checked: ${esc(meta.updated)}</p>` : "";
    const draft = meta.status ? `<p class="status">${esc(meta.status)}</p>` : "";
    body = `<article class="wrap prose">${draft}${crumbs(page)}${markdown(md)}${updated}</article>`;
  } else {
    body = read(page.src);
  }
  const title = page.title === null ? `${cfg.siteName} — the companion update for ${cfg.seriesTitle}`
    : `${meta.title || page.title || page.nav} — ${cfg.siteName}`;
  const html = fill(layout
    .replace("{{page_title}}", esc(title))
    .replace("{{description}}", esc(meta.description || `Free monthly updates for readers of ${cfg.seriesTitle} series — apps, AI tools and Australian rules, kept current between editions.`))
    .replace("{{canonical}}", page.path ? `<link rel="canonical" href="https://${cfg.domain}${page.path}">` : "")
    .replace("{{robots}}", page.noindex || meta.noindex === "true" ? '<meta name="robots" content="noindex">' : "")
    .replace("{{css_href}}", `/css/site.css?v=${cssHash}`)
    .replace("{{nav}}", nav(page))
    .replace("{{content}}", fill(body)));

  // Internal notes live in HTML comments in src/; never ship them.
  const shipped = html.replace(/<!--[\s\S]*?-->\n?/g, "");

  // vocabulary check on the visible copy only (tags, URLs and comments stripped)
  const visible = html.replace(/<!--[\s\S]*?-->/g, " ").replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ");
  for (const [re, label] of BANNED) {
    const m = visible.match(re);
    if (m) problems.push(`${page.out}: banned word "${label}" in "…${visible.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, " ")}…"`);
  }
  for (const m of html.matchAll(/REPLACE_WITH_\w+/g)) warnings.push(`${page.out}: placeholder ${m[0]}`);

  if (page.path && !page.noindex && meta.noindex !== "true") indexed.push(page.path);

  const outPath = join(DIST, page.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, shipped);
}

writeFileSync(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: https://${cfg.domain}/sitemap.xml\n`);
writeFileSync(join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  indexed.map((p) => `  <url><loc>https://${cfg.domain}${p}</loc></url>`).join("\n") +
  `\n</urlset>\n`);

const uniq = [...new Set(warnings)];
if (uniq.length) console.warn(`\n⚠ ${uniq.length} placeholder(s) still to fill before launch:\n  ` + uniq.join("\n  "));
if (problems.length) {
  // Leave nothing deployable behind: a failed build must never ship.
  for (const name of readdirSync(DIST)) rmSync(join(DIST, name), { recursive: true, force: true });
  console.error(`\n✖ Vocabulary check failed — dist/ emptied, nothing to deploy:\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`\n✔ Built ${PAGES.length} pages into dist/ (css ${cssHash})`);
