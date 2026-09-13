# Brand assets

The Theo Logic mark: a gold circle (Truth), a paper-white frame cross, and a
cyan diagonal (Logic) on the near-black ground.

## Here now

| File | Use |
|---|---|
| `favicon.svg` | Browser tab icon. Strokes are deliberately heavier than the in-page logo so the shape survives at 16px. |

The in-page logo is **inline SVG** in the markup, not a file — it inherits
color and needs no extra request. It appears in `index.html` (nav and footer)
and in the header of each page under `pages/`. Editing the mark means editing
those copies; keep them in sync with `favicon.svg`.

## Still needed

| File | Size | Why |
|---|---|---|
| `favicon.ico` | 32×32 | Older browsers that ignore SVG favicons |
| `apple-touch-icon.png` | 180×180 | iOS home-screen bookmarks |
| `logo-mark.png` | 512×512 | Press kits, social profiles, anywhere SVG is refused |

These need raster tooling that was not installed on the build machine
(`sips` cannot rasterize SVG; neither `cwebp` nor Pillow was present). Any
vector editor or an online converter will produce them from `favicon.svg`.

Once added, reference them in the `<head>` of `index.html` and each page in
`pages/`:

```html
<link rel="icon" href="assets/brand/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/brand/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png">
```

Paths shown are from the site root; pages under `pages/` need `../assets/...`.

## Colors

Taken from `assets/css/styles.css` `:root` — change them there, not here.

| Token | Hex | Meaning |
|---|---|---|
| `--truth` | `#E7B54F` | Gold — Guided by Truth |
| `--logic` | `#7ECAD8` | Cyan — Driven by Logic |
| `--ink` | `#07080A` | Near-black — the frame |
| `--paper` | `#F5F2EB` | Warm white — type |
