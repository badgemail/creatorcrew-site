# Creator Crew — companion site (creatorcrew.com.au)

The website for **Creator Crew**, the free email newsletter that comes with
every title in *The Creator Starter Kit* series (Luke Badger, LJB Press).
Creator Crew is series-wide: each title is a **specialisation** with its
own section of the site. *Content* is available now; *Music* and *Apps &
Games* are coming soon (working titles, no dates). Series titles are never
called "editions": that word is reserved for revisions of a title.

It holds:

- **Home** (`/`): what Creator Crew is, the Specialisations, and the
  sign-up form (Buttondown).
- **Content** (`/content/`): `pages/content/index.md`, with
  - **Current Apps & AI Tools** (`/content/apps-and-ai-tools/`):
    `pages/content/apps-and-ai-tools.md`.
- **Regulation Watch** (`/regulation-watch/`, series-wide):
  `pages/regulation-watch.md`.
- **Privacy notice** (`/privacy/`, series-wide): `pages/privacy.md`.
  **Final for launch** (Luke's own review, 12 October 2026).

It's a plain static site: no framework and no JavaScript on the page. It's
hosted on **Cloudflare Workers with static assets** (not Pages, not Wix,
not a redirect). The brand, fonts and wording rules come from the book
repo (`CreatorStarterKit`: `style/visual-style-guide.md`,
`creator-crew/signup-data-handling.md`, `PROJECT_INSTRUCTIONS.md`).

> **Live on creatorcrew.com.au** since 12 October 2026 (ahead of the
> book's 2 November publication date), sign-up form included. Every push
> to `main`, and every `wrangler deploy`, now updates the live site. The
> holding version below wasn't needed.

---

## What's where

```
pages/             ← the editable pages, in markdown; folders mirror URLs
  content/         ← the Content specialisation (/content/…)
    index.md
    apps-and-ai-tools.md
  regulation-watch.md   ← series-wide
  privacy.md            ← series-wide
src/
  layout.html      ← shared header, nav, footer
  home.html        ← home page, including the sign-up form
  404.html
static/            ← copied to the site as-is
  css/site.css     ← all styles
  fonts/           ← self-hosted Montserrat + Inter (WOFF2, Latin subset) + OFL licences
  img/             ← Crew icon, pillar icons
  _headers         ← security + caching headers (Cloudflare reads this)
  _redirects       ← old URLs → new ones (Cloudflare reads this)
site.config.json   ← site-wide values, including the placeholders to fill
build.mjs          ← the build: no dependencies, Node 18+
wrangler.jsonc     ← Cloudflare Workers config (static assets only)
```

`dist/` is build output. It isn't committed.

## Editing content

Edit the markdown files in `pages/`. Each starts with a short header:

```
---
title: Regulation Watch
description: One sentence for search results.
updated: 28 September 2026
---
```

- `updated` shows at the bottom of the page as "Last checked: …".
  **Change it every time you check the facts on that page.**
- `status` (privacy only) shows a banner at the top; delete the line when
  the notice is final.
- `noindex: true` (privacy only, while it's a draft) keeps the page out
  of search engines and the sitemap. Delete it at launch.

The markdown supported is deliberately small:
- `#`, `##`, `###` headings;
- paragraphs;
- `-` bullet and `1.` numbered lists;
- `**bold**`, `*italic*`;
- `[links](https://…)`;
- `> ` for a highlighted callout box.

Anything fancier needs a change to `build.mjs`.

**Wording rules**, the same as the book's:
- no "join", "belong", "community" or "membership";
- no "kid"/"kids";
- no Discord, in any context.

**The build fails if any of these appear**, and it tells you where.
- **Age wording:** keep it light (e.g. "CapCut's terms are written for
  13 and up…"), and never say an app's terms allow something they
  don't.
- **Regulatory facts:** check them against esafety.gov.au before
  changing them. Don't write them from memory.

To change the site name, domain or placeholders, edit
`site.config.json`.

### Site structure: specialisations and stable URLs

- **Specialisation pages sit under their section**:
  `/content/apps-and-ai-tools/` and so on. **Regulation Watch** and
  **Privacy** are series-wide and stay at the top level.
- **Adding a page to a specialisation**: create
  `pages/<section>/<page>.md` and add it to `PAGES` in `build.mjs` with
  `section: "/<section>/"`. That gives it the breadcrumb, and highlights
  its section in the nav. Link it from the section's `index.md`.
- **Launching a new specialisation** (e.g. Music, when announced):
  1. Add `pages/music/index.md` and its pages.
  2. Add the section to `PAGES` with `nav: "Music"`.
  3. On Home, change its card from "Coming soon" to "Available now" and
     link it.
  4. Add its option to the interests field, if that field is live.
  Use the published title, and no dates until they're firm.
- **Never break a URL that's been shared** (in print, email or links). When
  a page moves, add a line to `static/_redirects` (`/old/ /new/ 301`) and
  never remove it. `/current-apps/` → `/content/apps-and-ai-tools/` is
  the first, from 28 September 2026. It was tested on the local Workers
  runtime (`wrangler dev`): both `/current-apps` and `/current-apps/`
  return 301 to the new page, and `_redirects` itself isn't served.
- **The book prints one address**: the `[CREW URL]` placeholder in the
  book repo. Once that's printed, that URL is permanent.

## Build and preview locally

Needs [Node.js](https://nodejs.org) 18 or later. Nothing to install:
`build.mjs` has no dependencies, and Wrangler runs through `npx`.

```sh
node build.mjs          # builds dist/; warns about unfilled placeholders
npx wrangler dev        # builds, then serves http://localhost:8787 exactly as Cloudflare will
```

## Deploy

The Worker is **assets-only**: `wrangler.jsonc` points Cloudflare at
`dist/` and has no script. `wrangler deploy` runs the build first
(`build.command`).

**Option A — from your computer**

```sh
npx wrangler login      # once, opens the browser
npx wrangler deploy     # builds and uploads; prints the workers.dev URL
```

**Option B — automatic deploys from GitHub (Cloudflare dashboard)**

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a
   repository** → connect GitHub and pick `creatorcrew-site`.
2. **Build command:** leave it **empty (None)**. **Deploy command:**
   `npx wrangler deploy`. The project name must match `"name"` in
   `wrangler.jsonc`, which is `creatorcrew-site`.
3. Save. Every push to `main` then builds and deploys, and pull requests
   get preview URLs.

**How the build runs on Cloudflare** (verified 28 September 2026 with
`wrangler deploy --dry-run` on a clean export with no `dist/`):
- `dist/` is **not committed** (it's in `.gitignore`).
- `wrangler deploy` runs `node build.mjs` itself, because `"build"` in
  `wrangler.jsonc` tells it to. Every deploy regenerates the markdown
  pages and re-runs the vocabulary check; no dashboard build command is
  needed. (Entering `node build.mjs` there as well is harmless: it just
  builds twice.)
- **A banned word stops the deploy.** `build.mjs` exits 1 and empties
  `dist/`. Wrangler then reports "Running custom build `node build.mjs`
  failed" and exits 1 without uploading anything, so the live site keeps
  its last good version. The build log names the page and the word.

## Attach creatorcrew.com.au (at launch only)

The domain's DNS is already on Cloudflare (same account), so the Worker
can take it over directly. Either:

- **In the dashboard:** Workers & Pages → `creatorcrew-site` → **Settings →
  Domains & Routes → Add → Custom domain** → `creatorcrew.com.au`.
  Repeat for `www.creatorcrew.com.au`.
- **Or in config:** uncomment the `"routes"` block in `wrangler.jsonc`
  (both hostnames, `"custom_domain": true`), add the comma it mentions,
  and deploy.

Cloudflare creates the DNS records and the certificate itself. Delete any
old A/CNAME records for those hostnames first, or it will refuse. Then
send `www` to the bare domain with a **Redirect Rule** (Rules →
Redirect Rules → "Redirect from WWW to root" template) so there's one
canonical address.

## Buttondown (sign-up)

The form on the home page posts straight to Buttondown's embed endpoint
(`https://buttondown.com/api/emails/embed-subscribe/<username>`). No
script runs on this site.

### Live form: lean launch on the free plan (decided 28 September 2026)

| On the form | Sent to Buttondown as |
|---|---|
| Parent or guardian's email (required) | `email` |
| "Send me the free Creator Crew newsletter" (unticked; must be ticked to submit; "monthly" removed 29 September 2026) | not sent: it only unlocks the button, and Buttondown's confirmation email records the consent |

`embed=1` is also sent (a hidden technical flag, not a field). Both work
on Buttondown's free plan, which caps at **100 subscribers**.

**Buttondown username: `creatorcrew`** (confirmed 28 September 2026). The
form posts to `https://buttondown.com/api/emails/embed-subscribe/creatorcrew`,
the same endpoint as Buttondown's own form at buttondown.com/creatorcrew.

**Form copy (28 September 2026):**
- **Label:** "Parent or guardian's email" (plus "(required)").
- **Helper text**, linked to the input with `aria-describedby`: "Creator
  Crew goes to a parent's inbox. Under 18? Ask a parent to sign up, and
  they can forward it to you."
- **Consent box**, unticked: "Send me the free Creator Crew
  newsletter." ("Monthly" removed 29 September 2026: the newsletter has
  no set frequency, so none is promised anywhere.)
- **Small print** under the button (revised 12 October 2026): "You'll
  get an email to confirm your address. We use it only to send the Creator
  Crew newsletter. We never sell or rent it, or share it with anyone
  except our email provider, which sends the emails for us. By signing
  up, you confirm you're 18 or over. Unsubscribe any time." It's followed
  by a link to the Privacy notice, and matches it.
- **Naming Buttondown:** site copy says "our email provider". Only the
  privacy notice names Buttondown, LLC, once, so a change of provider
  means editing one line.

### Parked fields: re-enable on a paid plan (at ~100 subscribers)

The full field set in the book repo's `creator-crew/signup-data-handling.md`
comes back when Creator Crew moves to a paid Buttondown plan, which it
needs at ~100 subscribers anyway. These fields need Buttondown's paid
**metadata** (first name, state) and **tags** (interests, book news)
features. **Interests map to the series' specialisations** (Content,
Music, Apps & Games), not to topics. On the free plan Buttondown wouldn't keep them, so they're off
the live form.

**To re-enable:**
1. Upgrade Buttondown to a plan with metadata and tags.
2. Update the privacy notice (`pages/privacy.md`) to list the extra
   fields and what each is for. The notice promises this happens
   **before** the form changes.
3. Paste the markup below into `src/home.html`. It goes after the email
   field, and the book-news box goes inside the "Your choice" fieldset,
   whose legend becomes "Your choices".
4. Update `signup-data-handling.md` in the book repo, and add a
   Decisions log entry.

```html
<!-- RE-ENABLE ON PAID PLAN (at ~100 subscribers): optional fields -->
<div class="field">
  <label for="first-name">Your first name <span class="opt">(optional)</span></label>
  <input id="first-name" name="metadata__first_name" type="text" autocomplete="given-name" maxlength="60" aria-describedby="first-name-hint">
  <p class="hint" id="first-name-hint">Only used to say hello in the email.</p>
</div>

<div class="field">
  <label for="state">State or territory <span class="opt">(optional)</span></label>
  <select id="state" name="metadata__state" aria-describedby="state-hint">
    <option value="">Prefer not to say</option>
    <option value="ACT">Australian Capital Territory</option>
    <option value="NSW">New South Wales</option>
    <option value="NT">Northern Territory</option>
    <option value="QLD">Queensland</option>
    <option value="SA">South Australia</option>
    <option value="TAS">Tasmania</option>
    <option value="VIC">Victoria</option>
    <option value="WA">Western Australia</option>
  </select>
  <p class="hint" id="state-hint">Only used to flag rules that differ between states — like the NSW point in Chapter 10. We never ask for a suburb or address.</p>
</div>

<!-- Interests = the series' specialisations (decided 28 September 2026).
     One box per specialisation on the Home page at the time: include a
     "Coming soon" one only if its card is still up, and add a box when a
     new specialisation is announced. Tag values are stable — never rename one. -->
<fieldset class="field" aria-describedby="interests-hint">
  <legend>Interests <span class="opt">(optional)</span></legend>
  <p class="hint" id="interests-hint">Which Creator Starter Kit specialisations you'd like first in each email.</p>
  <div class="checks">
    <div class="check"><input id="i-content" type="checkbox" name="tag" value="interest-content"><label for="i-content">Content</label></div>
    <div class="check"><input id="i-music" type="checkbox" name="tag" value="interest-music"><label for="i-music">Music</label></div>
    <div class="check"><input id="i-apps-games" type="checkbox" name="tag" value="interest-apps-and-games"><label for="i-apps-games">Apps &amp; Games</label></div>
  </div>
</fieldset>

<!-- RE-ENABLE ON PAID PLAN: second consent box, inside the consent fieldset -->
<div class="check">
  <input id="consent-books" type="checkbox" name="tag" value="ljb-press-book-news">
  <label for="consent-books">I'd also like to hear about new books from LJB Press.</label>
</div>
<!-- …and change that fieldset's hint to: "Both boxes start unticked. The
     first is needed to sign up; the second is entirely separate and optional." -->
```

The CSS for all of this (`.checks`, `.check`, `select`) is still in
`static/css/site.css`, so nothing else is needed.

**Before launch, in Buttondown:**
- ~~Put the username in `site.config.json` → `buttondownUsername`.~~ Done:
  `creatorcrew` (28 September 2026).
- Keep **double opt-in (confirmation email) on**. The privacy notice
  treats confirming that email as the record of consent.
- **Retention (12 October 2026):** leave unsubscribes as Buttondown's
  default soft delete ("made inactive"), which the privacy notice
  describes: the address is kept only as a record of the unsubscribe.
  Delete an address completely only when its owner asks.
- **Open and click tracking off.** The privacy notice says it is.

## Holding version (plan only, 12 October 2026)

> **Not needed (12 October 2026):** Luke's own review of the privacy
> notice is done, and the form launches with the site on 2 November 2026.
> The plan is kept below for reference only.

**Why:** the book's publication date is now **2 November 2026**, and
creatorcrew.com.au must be live by then, because the book prints that
address and a QR code for it. The sign-up form can't launch until the
privacy notice has been professionally reviewed. If the review isn't
done in time, a **holding version** goes on the domain with no sign-up
form, and the full site replaces it after the review. **Not built and
not deployed yet.** Decide in the week of 26 October.

**What changes in the holding version:**
- **Home, sign-up section:** the whole `<form>` (email field, consent
  box, small print) is left out. In its place, under the same heading
  and `id="sign-up"` so `/#sign-up` links still land: "Sign-up opening
  soon. The newsletter starts shortly; check back here." Suggested
  wording, for Luke to approve. No email address is collected anywhere,
  not even by `mailto:`.
- **Home, hero button:** "Get the newsletter" (to `#sign-up`) stays, so
  it lands on the "opening soon" note. Or relabel it "Sign-up opening
  soon" (Luke to choose).
- **Other pages:** check that nothing promises a sign-up that works
  today. `pages/content/index.md` says "[Get the newsletter](/#sign-up)":
  fine, since it lands on the note.
- **Privacy notice:** still a draft, so it's **not published** in the
  holding version: left out of `PAGES` (no page, no nav link, not in
  the sitemap). With no form, nothing is collected, so there's nothing
  for it to cover yet. The 404 page handles `/privacy/` until then.
- **Unchanged:** Content, Current Apps & AI Tools, Regulation Watch
  (their `updated:` dates rechecked first), the vocabulary check, the
  headers and the redirects. The CSP's `form-action` for buttondown.com
  can stay; it allows nothing on its own.

**How to build it (proposed):**
1. A `"signupOpen": false` switch in `site.config.json`.
2. In `src/home.html`, wrap the form in `<!-- SIGNUP:OPEN -->` …
   `<!-- /SIGNUP:OPEN -->` and the holding note in `<!-- SIGNUP:SOON -->`
   … `<!-- /SIGNUP:SOON -->`. `build.mjs` keeps one block and drops the
   other, according to the switch.
3. In `build.mjs`, skip the privacy page when `signupOpen` is false.
4. A build guard: with `signupOpen` false, fail if `dist/` contains a
   `<form`, `embed-subscribe` or `/privacy/` link. With it true, fail if
   `pages/privacy.md` still has its `status:` line, so the form can't
   ship before the review.

**Test before deploying:** `npx wrangler dev`, then check:
- no form on Home;
- `/#sign-up` lands on the note;
- `/privacy/` returns the 404 page;
- the sitemap doesn't list `/privacy/`;
- the QR code on the printed proof opens the page;
- no sideways scrolling at 320px.

**After the review:** set `"signupOpen": true`, finish the Launch
checklist below, and deploy. The domain stays attached throughout, so
the printed URL never breaks.

## Launch checklist

- [x] Privacy notice: own review done (12 October 2026). Attach creatorcrew.com.au to the Worker: done 12 October 2026, ahead of the 2 November launch.
- [x] `status:` line (the DRAFT banner) and the **[Reviewer]** notes removed
      from `pages/privacy.md` (12 October 2026). `build.mjs` still strips
      any `[Reviewer]` note and `<!-- … -->` comment from page markdown,
      and fails the build if a `[Reviewer]` note would ship. The notice
      keeps `noindex: true`.
- [ ] privacy@creatorcrew.com.au routing set up (Cloudflare Email Routing) and tested with a real email.
- [ ] Buttondown email footer shows LJB Press as sender and a working unsubscribe link.
- [ ] Buttondown open and click tracking confirmed OFF (the notice says it is).
- [ ] Buttondown unsubscribes stay as the default soft delete ("made inactive"). Don't request hard deletion.
- [ ] Children's Online Privacy Code: due to be registered by 10 December 2026.
      Recheck the notice against the final code.
- [ ] Launch on Buttondown's free plan with the lean form (decided 28 September 2026); plan the upgrade and re-enable the parked fields at ~100 subscribers (see "Parked fields").
- [x] `buttondownUsername` filled in `site.config.json`: `creatorcrew`
      (28 September 2026).
- [x] `privacyContactEmail` filled in `site.config.json`:
      `privacy@creatorcrew.com.au` (28 September 2026). It uses Cloudflare
      Email Routing to Luke's inbox, and was tested. `hello@creatorcrew.com.au`
      also routes there (tested). `node build.mjs` now prints no
      placeholder warnings.
- [ ] Test sign-up end to end: confirmation email arrives, the address lands
      in Buttondown, unsubscribe works, deletion on request works.
- [ ] Regulation Watch and Current Apps rechecked, and `updated:` dates set.
- [x] Custom domain attached (above): creatorcrew.com.au and www.creatorcrew.com.au, 12 October 2026.
- [ ] `www` redirected: dashboard Redirect Rule ("Redirect from WWW to root", 301) still to add.

## Accessibility and performance notes

- **Mobile-first.** Tested with no sideways scrolling at 320px and 360px.
  Touch targets are at least 44px, and form controls use 16px text so
  iPhones don't zoom.
- **Contrast (WCAG):**
  - body text is navy on Off White (15.3:1);
  - Electric Blue is used only for link underlines and focus rings, not
    text (4.2:1);
  - Coral is never text on Off White (2.9:1). It appears only as a button
    with navy text (5.3:1), or on navy.
- **Structure:** a skip link; landmarks; every field labelled; hints
  linked with `aria-describedby`; grouped checkboxes in
  `fieldset`/`legend`; visible focus rings; reduced-motion respected.
- **Weight and loading:**
  - no JavaScript, no external requests;
  - five WOFF2 fonts, each 15–18 KB, preloaded where it matters;
  - the CSS is fingerprinted and cached long-term.
- **Content Security Policy** (`static/_headers`) allows only this site's
  own files, plus form posts to buttondown.com.
