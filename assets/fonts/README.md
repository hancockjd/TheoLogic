# Fonts

The display serif is **self-hosted Playfair Display**, so every platform renders
the same headings.

| File | Face | Size |
|---|---|---|
| `playfair-display-400.woff2` | Regular, upright | 22 KB |
| `playfair-display-400-italic.woff2` | Regular, italic | 22 KB |
| `OFL-playfair-display.txt` | SIL Open Font License 1.1 | — |

Source: `@fontsource/playfair-display` 5.3.0, Latin subset.

## Why it's here

Before this, the site loaded no web fonts. The serif stack began with Didot and
Bodoni 72, which only ship with macOS, so the high-contrast headings the design
depends on appeared on Macs alone. Windows and Android visitors got Georgia or
Times, which read as a different brand.

Playfair now comes first in the stack, **on Macs too** — a deliberate choice so
the client approves exactly what every visitor sees. Didot and Bodoni 72 remain
in the stack only as fallbacks if the font files fail to load.

## How it's wired

- **`assets/css/styles.css`** — two `@font-face` rules at the top of the file,
  and `--serif` in `:root` lists `"Playfair Display"` first. URLs are relative
  to the stylesheet, so pages in `pages/` pick them up with no changes.
- **`index.html`** — both files are preloaded in the `<head>`, because the hero
  headline is the largest text on the page. `crossorigin` on those preload tags
  is required even on the same origin, or the browser downloads each font twice.
- **`404.html`** — declares the upright face inline with a root-absolute URL
  (`/TheoLogic/assets/fonts/…`), because that page is self-contained. Change the
  path when the custom domain goes live; if it's wrong the page falls back to a
  system serif rather than breaking.

`font-display:swap` shows fallback text immediately and swaps in Playfair when it
arrives, so text is never invisible.

## Only what's used

The site uses the serif at weight 400 only, upright and italic. Headings,
the wordmark, the motto, the marquee, division titles, contact details, and the
footer motto all use those two faces. No bold serif appears anywhere.

The `unicode-range` covers Latin plus common punctuation (em dash, curly quotes,
©, ·). Arrow characters (→ ↗) fall outside it, which is fine: every arrow on the
site is set in the sans or mono face, not the serif.

## Adding a weight

Only add one if the design actually calls for it — every file is another
download on first visit.

1. Get the `.woff2` from `@fontsource/playfair-display` (under `files/`), Latin
   subset, the weight and style you need.
2. Save it here as `playfair-display-<weight>[-italic].woff2`.
3. Add a matching `@font-face` block beside the existing two in `styles.css`,
   copying the `unicode-range`.
4. Preload it in `index.html` only if it appears above the fold.

## The sans and mono faces

These are intentionally **not** self-hosted. `--sans` resolves to the platform's
system UI face (SF on Apple, Segoe UI on Windows) and `--mono` to the platform
monospace (SF Mono, Consolas). The differences between those are small and
normal for system-font stacks, unlike the serif, where the fallback changed the
character of the design. If the client wants pixel-identical eyebrows and
buttons everywhere, self-host a mono (JetBrains Mono is already named in the
stack) the same way.

## License

Playfair Display is licensed under the SIL Open Font License 1.1, which permits
web embedding and self-hosting. The license file must stay in this folder with
the fonts. The name "Playfair Display" is a Reserved Font Name: if the files are
ever modified (re-subset, converted), the modified font must be renamed.
