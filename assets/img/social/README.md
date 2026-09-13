# Social share card

This folder holds the image used for Open Graph and Twitter cards — the preview
that appears when the site is pasted into Slack, iMessage, LinkedIn, or X.

**Nothing lives here yet.** `index.html` currently points `og:image` and
`twitter:image` at `assets/img/work/kindness-project-first-light.jpg`, a content
photo at roughly 1.59:1. It works, but it was not composed for the crop.

## What to add

| | |
|---|---|
| Filename | `og-card.jpg` |
| Size | 1200 × 630 px (1.91:1) |
| Format | JPEG, under ~300 KB |
| Safe area | Keep text ~100 px from every edge — platforms crop differently |

Design it to read at thumbnail size: the mark, the wordmark, and the motto.
Avoid small type; most impressions are under 400 px wide.

## After adding it

Update both absolute URLs in `index.html`:

```html
<meta property="og:image" content="https://<domain>/assets/img/social/og-card.jpg">
<meta name="twitter:image" content="https://<domain>/assets/img/social/og-card.jpg">
```

Also update `og:image:alt` to describe the new card. Absolute URLs are required —
relative paths do not resolve for scrapers.

Validate with Facebook's Sharing Debugger and X's Card Validator, both of which
cache aggressively; re-scrape after any change.
