# Theo Logic, LLC — Website

Production build of the Theo Logic, LLC single-page site. Direction A, *"The
Frame and the Light"* — near-black frame, gold for Truth, cyan for Logic.

Prepared by Jose Hancock.

> **Status: unlisted.** The site is complete as a front end but is not indexed
> and not yet connected to any backend. See [Pre-launch checklist](#pre-launch-checklist)
> for what has to happen before it goes live.

## Running it

There is no build step and no dependencies. Open `index.html` in a browser, or
serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

A server is preferable to opening the file directly — `file://` origins treat
every asset as cross-origin, which can block the stylesheet and script.

## Layout

```
index.html                     the home page — structure and copy only
404.html                       not-found page; deliberately self-contained (see below)
robots.txt                     currently disallow-all; launch swap is in its header
sitemap.xml                    inert until launch; placeholder domain inside
.nojekyll                      serve files as-is, skip Jekyll processing
.gitignore

assets/                        everything the browser loads
  css/
    styles.css                 all styles — one file, organized by section
  js/
    main.js                    all behavior — one file, no dependencies
  brand/
    favicon.svg                the mark, thickened to survive 16px
    README.md                  raster icons still needed, and the color tokens
  fonts/
    playfair-display-400.woff2         display serif, upright
    playfair-display-400-italic.woff2  display serif, italic
    OFL-playfair-display.txt   license; must ship with the fonts
    README.md                  how to add a weight or swap the face
  img/
    hero/                      1 image
    work/                      5 images
    store/                     4 images
    impact/                    1 image
    social/
      README.md                EMPTY — spec for the 1200×630 share card

pages/                         subpages, one flat level
  _template.html               copy this to start a new page
  privacy.html                 ┐
  terms.html                   │ scaffolded structure;
  submission-policy.html       │ body copy awaits counsel
  accessibility.html           ┘

archive/                       not linked from the live site
  design-review-board.html     the original concept-review board
  direction-a/                 Direction A as presented (now promoted to root)
  direction-b/                 Direction B — "Daylight", not selected
```

### Conventions

- **Images are grouped by the section that uses them**, and named for their
  subject alone — the folder already says where they belong, so the file is
  `work/city-skyline-dusk.jpg`, not `work-city-skyline-dusk.jpg`. A new Work
  image needs no rename to fit.
- **All paths are relative**, never root-absolute. `index.html` uses
  `assets/…`; files in `pages/` use `../assets/…`. This is what lets the same
  commit serve correctly from a GitHub Pages project URL
  (`user.github.io/TheoLogic/`) and from a custom domain at the root. A single
  `/assets/…` would break the former.
- **`404.html` is the deliberate exception** and inlines its own CSS. A host
  serves it for any unmatched path, but the browser still resolves relative URLs
  against the requested path — from `/work/missing/`, a relative stylesheet link
  would 404 in turn and leave an unstyled error page. Inlining makes it render
  from any depth. Keep its palette in sync with `:root` by hand; it is the only
  intentional duplication in the project.
- **The logo is inline SVG**, not a file, so it inherits color and costs no
  request. It appears in the nav and footer of `index.html` and in each page
  under `pages/`. Editing the mark means editing those copies.
- **Files starting with `_` are templates**, not pages. `.nojekyll` is what
  keeps a host from skipping them, though nothing links to them either way.

`archive/` is kept for provenance. `archive/direction-a/index.html` is the
pre-production copy of the chosen direction; the root `index.html` supersedes it.
Delete the folder whenever the concept history stops being useful — git retains
it either way.

### Adding a page

Copy `pages/_template.html`, replace the title and the `<article>` contents,
then link it from the footer of `index.html`. The template already carries the
right relative paths, the shared header and footer, the skip link, and the
`noindex` tag to remove at launch. Add it to `sitemap.xml` too.

### How the CSS is organized

`assets/css/styles.css` runs in this order: design tokens (`:root`) → base and
reset → focus and skip-link → shared type and utilities → components, section by
section, each under a comment banner matching the HTML → responsive breakpoints →
`prefers-reduced-motion`.

Two things worth knowing before editing:

- **Design tokens live in `:root`.** Colors, fonts, page padding, max width, and
  the shared easing curve are variables. Change the brand there, not inline.
- **The `u-*` classes are a spacing shim.** They replace what used to be 31
  inline `style=""` attributes, one declaration each. They exist so the HTML
  carries no styling; prefer a semantic class for anything new.

### How the JS is organized

`assets/js/main.js` is one IIFE in seven numbered blocks — marquee, scroll
progress, mobile menu, reveal-on-scroll, dashboard bars, Vault tabs, inquiry
form. Every block guards for its elements being absent, so you can delete a
section from the HTML without the script throwing. It loads with `defer`.

The Vault's five-step copy is data at the top of block 6 (`STEPS`), not markup —
edit that array to change step content.

## Accessibility

Implemented: skip link, landmarks (`nav` / `main` / `footer`), `aria-labelledby`
on every section, keyboard focus rings via `:focus-visible`, the Vault steps as a
proper ARIA tab pattern with arrow-key navigation and roving tabindex, a mobile
menu that leaves the tab order when closed and closes on Escape, labelled form
fields with validation and a live status region, alt text on all 12 images, and
`prefers-reduced-motion` honored in both CSS and JS.

Not yet done — needs a real audit: contrast has not been measured with a
checker. The muted greys (`--muted-2` `#6C737D`) on near-black are used at small
sizes for eyebrows and metadata and are the likeliest failures. Verify against
WCAG AA before launch.

## Known issues

### Headings changed from Didot to Playfair Display — show the client

The client approved the design on a Mac, where headings rendered in Didot. That
font only exists on macOS, so Windows and Android visitors were seeing Georgia.
The site now self-hosts Playfair Display and uses it on **every** platform,
Macs included, so the whole audience sees one design.

Playfair is the same high-contrast style as Didot but not identical: slightly
heavier strokes, taller lowercase letters, and a more flowing italic. The client
should see the updated hero before launch, because it is not pixel-for-pixel
what they signed off on. Details in `assets/fonts/README.md`.

### The hero CTAs fall below the fold on common laptops

**The hero's two call-to-action buttons fall below the fold on ~800px-tall
viewports**, which includes the very common 1440×900 laptop. Measured at that
size with Playfair Display, `.hero-meta` spans y≈788–839 against an 813px
viewport — the bottom half of the buttons is below the fold. Because the buttons
are `.reveal` elements, they start at `opacity:0` and only animate in when
scrolled to — so on first paint a visitor sees the headline and the lede, and
"View the Work" / "Secure IP Exchange" are not on screen at all.

This is pre-existing, not introduced by the refactor (verified against the
original file, which behaves identically). It is a layout question rather than a
bug in the reveal logic: `.hero` combines `min-height:100svh` with
`padding:150px 0 70px` and a headline that scales to 82px across four lines.

Fixing it means lifting the buttons about 46px, enough to sit clear of the
reveal trigger (which ignores the bottom 8% of the viewport) — trimming the hero's top padding,
tightening the `h1` clamp, or reducing the `.l3` sub-line — all of which change
the approved composition, so it was left for a design decision rather than
changed unilaterally.

## Known placeholders

Nothing in this list is broken — each is content or infrastructure the client
still has to supply. They are also flagged with `TODO` comments in the HTML.

| What | Where | Needs |
|---|---|---|
| Inquiry form is inert | `index.html` → `#inquiry` | An endpoint. Add `action` + `method`, drop `data-demo`. A hosted service (Formspree, Basin) needs no server and works on Pages. |
| Project titles | Work section | Real titles, years, stills, credits — currently "Project Title One–Five". |
| Imagery | `assets/img/` | All 12 are generated placeholder artwork. None represents the client's portfolio. |
| Email addresses | Contact + footer | `hello@` / `vault@` / `press@theologic.com` are unconfirmed. |
| Legal pages | `pages/` | Structure and headings are in place and linked from the footer; body copy is drafting guidance, not legal language. Needs the client's attorney. |
| Social card | `assets/img/social/` | Empty. `og:image` borrows a content photo at the wrong ratio. |
| Raster icons | `assets/brand/` | `favicon.ico` and `apple-touch-icon.png` still needed. |
| Store | Store section | Prices and products are placeholders; no cart, no checkout, no payment provider. |
| The Vault | Vault section | Describes encryption, NDAs, and audit logging that no system behind this page performs. |
| Intelligence dashboard | Intel section | Sample data, labelled as such on the page. No analytics are collected. |
| Hero play button | Hero | Decorative. No video is wired up. |

The Vault and Store copy describes capabilities that do not exist yet. Both make
specific claims — encryption at rest, countersigned NDAs, PCI compliance — that
should not be published until the systems behind them are real.

## Pre-launch checklist

1. **Confirm the domain.** `https://www.theologic.com` is a placeholder inferred
   from the email addresses, not a confirmed domain. It appears in `index.html`
   (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD) and in
   `sitemap.xml`. Replace every occurrence, and add the `Sitemap:` line to
   `robots.txt`.
2. **Turn on indexing.** Delete `<meta name="robots" content="noindex, nofollow">`
   from `index.html` **and from all four files in `pages/`**, then replace
   `robots.txt` with the allow rules in its header comment. `404.html` keeps its
   `noindex`.
3. **Verify `sitemap.xml`** — real domain, real `lastmod` dates, and every page
   that should be indexed listed.
4. **Check the typography on Windows and Android.** Playfair Display is now
   self-hosted, so every platform should render the same display serif, but it
   has only been verified in Chrome on macOS. Look at the hero, the motto, and a
   `pages/` heading on real devices.
5. **Connect the form** (see the table above) and confirm delivery end to end.
6. **Replace placeholder content** — titles, imagery, email addresses, prices.
7. **Get the four `pages/` documents drafted by counsel**, then delete the
   `.doc-draft` banner and every `.todo` marker from each. The Submission Policy
   is the one with real exposure behind it.
8. **Add raster icons** — `favicon.ico` (32×32) and `apple-touch-icon.png`
   (180×180) in `assets/brand/`, then reference them in every `<head>`. Needs
   raster tooling that was not installed here.
9. **Build a purpose-made social card** at 1200×630 in `assets/img/social/`;
   spec is in that folder's README.
10. **Check contrast** against WCAG AA (see Accessibility above), then update
    `pages/accessibility.html` — it currently states the audit has not happened,
    which must stay true until it has.
11. **Decide on custom-domain files.** A `CNAME` file is required for a custom
    domain on GitHub Pages and is not present. The "Back to Theo Logic" link in
    `404.html` currently points to `/TheoLogic/` to suit the project URL
    (`hancockjd.github.io/TheoLogic/`), and so does the `@font-face` URL in that
    file's inline `<style>`. When the custom domain goes live at the root,
    change both back to start at `/`.
12. **Review the claims** in the Vault and Store sections against what actually
    exists.

## Performance notes

Images are plain JPEGs, 641 KB across 12 files, deliberately kept dependency-free
so the repo needs no build step. Every `<img>` carries explicit `width`/`height`
to prevent layout shift; everything below the fold is `loading="lazy"`, and the
hero carries `fetchpriority="high"`.

If image weight becomes a concern, converting to WebP with a `<picture>` JPEG
fallback saves roughly 25–35%, and `srcset` would help more — the store thumbnails
are served at 760px for a ~300px slot. Both need image tooling (`cwebp` or
Pillow) and reintroduce a build step, which is why neither was done.
