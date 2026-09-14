# Brand assets

The Theo Logic logo: a beveled gold "T" formed from two mirrored halves, with a
point of light where they meet, inside an open gold ring — above the THEO LOGIC
wordmark and the line "Guided by Truth, Driven by Logic".

## Files

| File | Size | Background | Used for |
|---|---|---|---|
| `logo-mark-192.png` | 192×192, 31 KB | transparent | The emblem on the site: nav, footer, `pages/` headers (shown at 36px), and the 404 page (96px) |
| `logo-mark-512.png` | 512×512, 182 KB | transparent | Social profiles, press, anywhere a larger emblem is needed |
| `logo-full.png` | 1199×887, 419 KB | transparent | Full lockup with wordmark and tagline. Referenced as the `logo` in the home page's structured data |
| `favicon-32.png` | 32×32 | black | Browser tab icon |
| `favicon-16.png` | 16×16 | black | Browser tab icon at small sizes |
| `apple-touch-icon.png` | 180×180 | black | iOS home-screen bookmark |

On the site, the emblem sits beside the HTML "THEO LOGIC / LLC" text rather than
using the logo's own wordmark: at nav size the lettering and tagline in the
artwork would be unreadable, and live text stays sharp and accessible. The
emblem image has `alt=""` because that adjacent text already names the link.

## How these were made

All six files were generated from `THEO LOGIC LOGO.png` — a 1254×1254 RGB PNG on
a pure black background, supplied 2026-09-13. **That original is not stored in
this repo**; keep it with the client's brand files.

- The **emblem** is a 600×600 crop centered on the ring and T; the favicons use
  a tighter 560×560 crop so the T fills more of the tiny square.
- Resizing is area-averaged, applied before transparency is extracted, which
  keeps edges free of dark fringes.
- **Transparency** was extracted from the black background: each pixel's
  brightest channel becomes its alpha. Placed over black, the result matches
  the original exactly.

## Limits — ask the designer for a proper master

- **The transparent files are for dark backgrounds only.** Because transparency
  was derived from black, the darker shading in the bevels became
  semi-transparent gold. On the site's near-black ground that is invisible and
  correct. On white or a light photo it looks washed out. A light-background
  version needs a real transparent master from the designer. This is why every
  logo on the site sits on the dark frame — nav, footer, legal-page header, and
  404 — even though the content sections are now light. Don't place these files
  inside a `.theme-light` section.
- **There is no vector.** The largest full lockup is 1199px wide, which is
  enough for the web and social but not for print, signage, or merchandise.
  Request the logo as SVG, AI, EPS, or PDF.
- **The favicons are necessarily simplified by size.** At 16px the thin ring
  mostly disappears and the T carries the icon.

## Colors

The logo is gold only. The site palette in `assets/css/styles.css` still uses
cyan for "Logic" accents elsewhere in the UI — change tokens there, not here.
The brand constants below are identical in both themes; on light content,
text uses darker role tokens (`--accent-text` `#7F5C16`, `--cool-text`
`#2A6773`) so it stays readable. See the THEMES block in the stylesheet.

| Token | Hex | Meaning |
|---|---|---|
| `--truth` | `#E7B54F` | Gold — Guided by Truth |
| `--logic` | `#7ECAD8` | Cyan — Driven by Logic |
| `--ink` | `#07080A` | Near-black — the frame |
| `--paper` | `#F5F2EB` | Warm white — type |
