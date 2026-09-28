# Creator Crew — companion site (creatorcrew.com.au)

The website for **Creator Crew**, the free monthly update that comes with
*The Creator Starter Kit: Content* (Luke Badger, LJB Press). It holds:

- **Home**: what Creator Crew is, and the sign-up form (Buttondown).
- **Current Apps & AI Tools**: `content/current-apps.md`.
- **Regulation Watch**: `content/regulation-watch.md`.
- **Privacy notice**: `content/privacy.md`. **DRAFT, pending
  professional review.**

It's a plain static site: no framework and no JavaScript on the page. It's
hosted on **Cloudflare Workers with static assets** (not Pages, not Wix,
not a redirect). The brand, fonts and wording rules come from the book
repo (`CreatorStarterKit`: `style/visual-style-guide.md`,
`creator-crew/signup-data-handling.md`, `PROJECT_INSTRUCTIONS.md`).

> **Not launched.** See the **Launch checklist** below. Until it's done,
> deploy only to the `workers.dev` preview URL, never to creatorcrew.com.au.

---

## What's where

```
content/           ← the three editable pages, in markdown
  current-apps.md
  regulation-watch.md
  privacy.md
src/
  layout.html      ← shared header, nav, footer
  home.html        ← home page, including the sign-up form
  404.html
static/            ← copied to the site as-is
  css/site.css     ← all styles
  fonts/           ← self-hosted Montserrat + Inter (WOFF2, Latin subset) + OFL licences
  img/             ← Crew icon, pillar icons
  _headers         ← security + caching headers (Cloudflare reads this)
site.config.json   ← site-wide values, including the placeholders to fill
build.mjs          ← the build: no dependencies, Node 18+
wrangler.jsonc     ← Cloudflare Workers config (static assets only)
```

`dist/` is build output. It isn't committed.

## Editing content

Edit the markdown files in `content/`. Each starts with a short header:

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
2. **Build command:** `node build.mjs` · **Deploy command:** `npx wrangler deploy`
   (the defaults are usually right; the project name must match
   `"name"` in `wrangler.jsonc`, which is `creatorcrew-site`).
3. Save. Every push to `main` then builds and deploys, and pull requests
   get preview URLs.

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
script runs on this site. The fields match
`creator-crew/signup-data-handling.md` in the book repo **exactly**:

| On the form | Sent to Buttondown as | Buttondown feature |
|---|---|---|
| Parent or guardian's email (required) | `email` | all plans |
| First name (optional) | `metadata__first_name` | **metadata — paid** |
| State or territory (optional dropdown) | `metadata__state` | **metadata — paid** |
| Interests: gaming, comedy, music, tutorials | `tag` = `interest-gaming` … | **tags — paid** |
| "Send me the free monthly Creator Crew update" (unticked; must be ticked to submit) | not sent: it only unlocks the button; Buttondown's confirmation email records the consent | all plans |
| "I'd also like to hear about new books from LJB Press" (unticked) | `tag` = `ljb-press-book-news` | **tags — paid** |

`embed=1` is also sent (a hidden technical flag, not a field).

> **Gap (checked 28 September 2026):** Buttondown's docs mark subscriber
> **metadata** and **tags** as paid features, and the free plan is capped
> at 100 subscribers. On the free plan, only the email would be kept.
> First name, state, interests and the book-news opt-in need a paid
> plan (tagging is listed as a ~US$9/month add-on). No workaround is
> built. Decide the plan before launch.

**Before launch, in Buttondown:**
- Put the username in `site.config.json` → `buttondownUsername`.
- Keep **double opt-in (confirmation email) on**; the form promises it.
- Tags are created automatically on first use. Only email people tagged
  `ljb-press-book-news` about new books.
- **Retention:** the privacy notice promises data is kept only while the
  subscription is active, so **delete unsubscribed subscribers** rather
  than leaving them in the list.

## Launch checklist

- [ ] Privacy notice professionally reviewed, and the **[Reviewer]** notes
      resolved and removed.
- [ ] `status:` and `noindex:` lines removed from `content/privacy.md`.
- [ ] Children's Online Privacy Code: due to be registered by 10 December 2026.
      Recheck the notice against the final code.
- [ ] Buttondown plan chosen, with the features the form needs (see above).
- [ ] `buttondownUsername` and `privacyContactEmail` filled in
      `site.config.json`. `node build.mjs` then prints no placeholder
      warnings.
- [ ] Test sign-up end to end: confirmation email arrives, fields and tags
      land in Buttondown, unsubscribe works, deletion on request works.
- [ ] Regulation Watch and Current Apps rechecked, and `updated:` dates set.
- [ ] Custom domain attached (above) and `www` redirected.

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
