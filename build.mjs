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
// its own section (/content/, later /games/, /music/); pages in a
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
  // Sign-up redirects (12 October 2026): Buttondown sends people here after
  // the form (/thanks/) and after the confirm link (/confirmed/). No nav
  // link, noindex in their front matter, so not in the sitemap.
  // Games (22 October 2026): the Godot help guide the Games book prints as
  // creatorcrew.com.au/godot, so it lives at the top level, not under
  // /games/. Source in pages/games/. No nav link and no Home card until
  // Games launches (add `nav: "Games"` to a /games/ index then).
  { src: "pages/games/godot.md", out: "godot/index.html", path: "/godot/" },
  // Chapter 4 walkthrough (5 November 2026): the book's steps 1–9 and Try
  // This with screenshots, linked from /godot's "Your build, chapter by
  // chapter". One page per chapter, under /godot/.
  { src: "pages/games/godot-chapter-4.md", out: "godot/chapter-4/index.html", path: "/godot/chapter-4/" },
  { src: "pages/games/godot-chapter-6.md", out: "godot/chapter-6/index.html", path: "/godot/chapter-6/" },
  { src: "pages/games/godot-chapter-7.md", out: "godot/chapter-7/index.html", path: "/godot/chapter-7/" },
  // Bench Cat (2 November 2026): the Games book's free project (PROMISE-
  // REGISTER P11), linked from /godot. No nav link or Home card yet.
  { src: "pages/games/bench-cat.md", out: "bench-cat/index.html", path: "/bench-cat/" },
  { src: "pages/thanks.md", out: "thanks/index.html", path: "/thanks/" },
  { src: "pages/confirmed.md", out: "confirmed/index.html", path: "/confirmed/" },
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

// Reviewer notes are source-only (30 September 2026): a paragraph that
// starts with **[Reviewer]** is dropped whole, a **[Reviewer]** note at
// the end of a paragraph is cut from there, and <!-- … --> comments in a
// page's markdown are removed. The text stays in pages/*.md for the
// privacy reviewer; the build fails if any of it would still ship.
function stripSourceNotes(md) {
  return md
    .replace(/<!--[\s\S]*?-->\n?/g, "")
    .replace(/^\*\*\[Reviewer\]\*\*.*(?:\n(?!\s*\n).*)*\n?/gm, "")
    .replace(/[ \t]*\*\*\[Reviewer\]\*\*.*$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
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

// Screenshots (22 October 2026): `![alt text](/img/….webp)` on a line of its
// own becomes a lazy-loaded <figure>. Width and height are read from the
// WebP file in static/, so the page doesn't jump while images load; a
// missing file, or missing alt text, stops the build.
function webpSize(src) {
  const b = readFileSync(join(ROOT, "static", src));
  const fourcc = b.toString("ascii", 12, 16);
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    if (fourcc === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (fourcc === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (fourcc === "VP8L") { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
  }
  throw new Error(`${src}: not a WebP file`);
}

// Code blocks (24 October 2026): a ``` fence becomes <pre><code>, kept
// byte for byte (the Godot code is indented with tabs, as Godot expects),
// with a Copy button that COPY_SCRIPT switches on. Without the script the
// button stays hidden and the code can still be selected by hand.
const COPY_SCRIPT = `document.querySelectorAll(".code").forEach(function (box) {
  var b = box.querySelector(".copy"), c = box.querySelector("code");
  function done(text) { b.textContent = text; setTimeout(function () { b.textContent = "Copy"; }, 4000); }
  function select() {
    var r = document.createRange(); r.selectNodeContents(c);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    done("Selected: press Ctrl+C");
  }
  b.hidden = false;
  b.addEventListener("click", function () {
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(c.textContent).then(function () { done("Copied"); }, select);
    else select();
  });
});`;
const COPY_HASH = createHash("sha256").update(COPY_SCRIPT).digest("base64");

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
    if (/^```\w*\s*$/.test(line)) {                // fenced code, with a Copy button
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
      if (i++ >= lines.length) throw new Error("A ``` code block is never closed");
      out.push(`<div class="code"><button type="button" class="copy" hidden>Copy</button><pre><code>${esc(buf.join("\n"))}</code></pre></div>`);
      continue;
    }
    if (/^>\s?/.test(line)) {                       // callout block
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<aside class="callout">${markdown(buf.join("\n"))}</aside>`); continue;
    }
    if ((m = line.match(/^!\[([^\]]+)\]\((\/img\/[^)\s]+\.webp)\)\s*$/))) { // screenshot, on a line of its own
      const [w, h] = webpSize(m[2]);
      out.push(`<figure class="shot"><img src="${m[2]}" alt="${esc(m[1])}" width="${w}" height="${h}" loading="lazy" decoding="async"></figure>`);
      i++; continue;
    }
    if (/^!\[/.test(line)) throw new Error(`Image needs alt text and a /img/….webp path: ${line}`);
    // Download button (2 November 2026): a link to a file in /downloads/,
    // on a line of its own, becomes a button.
    if ((m = line.match(/^\[([^\]]+)\]\((\/downloads\/[^)\s]+)\)\s*$/))) {
      if (!existsSync(join(ROOT, "static", m[2]))) throw new Error(`Download missing: static${m[2]}`);
      out.push(`<p><a class="button" href="${m[2]}" download>${inline(m[1])}</a></p>`);
      i++; continue;
    }
    // Tables (2 November 2026): | header | header |, a |---| line, then
    // rows. Cells take inline markdown (`code`, **bold**).
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim()));
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(`<table><thead><tr>${head.map((c) => `<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>` +
        rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("") + `</tbody></table>`);
      continue;
    }
    if ((m = line.match(/^(\s*)([-*]|\d+\.)\s+/))) { // list (with wrapped continuation lines)
      const ordered = /\d/.test(m[2]);
      const start = ordered && parseInt(m[2], 10) !== 1 ? ` start="${parseInt(m[2], 10)}"` : "";
      const items = [];
      while (i < lines.length && !isBlank(lines[i])) {
        const it = lines[i].match(/^\s*([-*]|\d+\.)\s+(.*)$/);
        if (it) items.push(it[2]); else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}${start}>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</${tag}>`); continue;
    }
    const buf = [];                                   // paragraph
    while (i < lines.length && !isBlank(lines[i]) && !/^(#{1,3}\s|>|!\[|```|\||\s*([-*]|\d+\.)\s|---\s*$)/.test(lines[i])) buf.push(lines[i++].trim());
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

const problems = [], warnings = [], indexed = [], scripted = [];
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
    body = `<article class="wrap prose">${draft}${crumbs(page)}${markdown(stripSourceNotes(md))}${updated}</article>`;
    if (body.includes('<div class="code">')) { body += `<script>${COPY_SCRIPT}</script>`; scripted.push(page.path); }
  } else {
    body = read(page.src);
  }
  const title = page.title === null ? `${cfg.siteName} — the companion newsletter for ${cfg.seriesTitle}`
    : `${meta.title || page.title || page.nav} — ${cfg.siteName}`;
  const html = fill(layout
    .replace("{{page_title}}", esc(title))
    .replace("{{description}}", esc(meta.description || `A free email newsletter for readers of ${cfg.seriesTitle} series — apps, AI tools and Australian rules, kept current between editions.`))
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
  if (/\[Reviewer\]/.test(shipped)) problems.push(`${page.out}: a [Reviewer] note would ship (keep them source-only)`);

  if (page.path && !page.noindex && meta.noindex !== "true") indexed.push(page.path);

  const outPath = join(DIST, page.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, shipped);
}

// The site-wide CSP allows no scripts. A page with a Copy button gets the
// same policy with only COPY_SCRIPT's hash allowed, so the script and its
// header can't drift apart. "! Content-Security-Policy" drops the
// site-wide header for that path first.
if (scripted.length) {
  const headers = read("static/_headers");
  const csp = headers.match(/^\s*Content-Security-Policy: (.*)$/m)[1];
  if (!csp.includes("script-src 'none'")) problems.push("static/_headers: expected script-src 'none' in the site-wide CSP");
  const pageCsp = csp.replace("script-src 'none'", `script-src 'sha256-${COPY_HASH}'`);
  writeFileSync(join(DIST, "_headers"), headers.replace(/\s*$/, "\n") + scripted.map((p) =>
    `\n# Built: ${p} has Copy buttons (build.mjs, COPY_SCRIPT)\n${p}\n  ! Content-Security-Policy\n  Content-Security-Policy: ${pageCsp}\n`).join(""));
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
  console.error(`\n✖ Build check failed — dist/ emptied, nothing to deploy:\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`\n✔ Built ${PAGES.length} pages into dist/ (css ${cssHash})`);
