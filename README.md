# Theo Logic, LLC — Website Concepts

Two complete single-page website concepts for Theo Logic, LLC, prepared for
concept review. Both answer the same brief; they differ in what they argue the
company *is*.

Prepared by Jose Hancock. Stage: concept review — nothing here is contracted work.

## Live

Served by GitHub Pages from the `main` branch, root folder:

| Page | Path |
|---|---|
| Design review board — **start here** | `/` |
| Direction A — "The Frame and the Light" | `/direction-a/` |
| Direction B — "Daylight" | `/direction-b/` |

The review board links out to both concepts, so it is the only link a reviewer needs.

## Layout

```
index.html            review board (neutral grey; takes no side)
direction-a/          Direction A — near-black, gold/cyan, Didot-class serif
direction-b/          Direction B — warm paper, clay/ochre/forest, old-style serif
robots.txt            disallow all crawlers
.nojekyll             serve files as-is, skip Jekyll processing
```

Every page is a single self-contained HTML file. All CSS is inline and every
image is an embedded base64 data URI — no build step, no external assets, no
network requests. Open any file directly in a browser and it renders complete.

## Notes for reviewers

- **The imagery is placeholder.** Every image is generated artwork composed from
  light, sky, and architecture in each direction's palette. None of it claims
  anything about the client's portfolio. Real stills, production photography, and
  headshots replace it during the build.
- **The two concepts are identical in substance.** Same mission, vision, motto,
  and tagline, word for word as supplied. Same four capabilities. The choice is
  about identity, not features — and it does not change scope or cost.
- Pages carry `noindex, nofollow` and the repo ships a disallow-all `robots.txt`.
  A GitHub Pages site on a public repo is reachable by anyone with the URL, so
  treat these links as unlisted, not private.
