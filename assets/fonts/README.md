# Fonts

**This folder is empty, and that is a problem worth fixing before launch.**

## The issue

The site loads no web fonts at all. Every stack in `assets/css/styles.css`
`:root` resolves against whatever is already installed on the visitor's machine:

```css
--serif: "Didot","Bodoni 72","Playfair Display",Georgia,"Times New Roman",serif;
--sans:  "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
--mono:  "SF Mono",ui-monospace,"JetBrains Mono","Roboto Mono",Menlo,Consolas,monospace;
```

`Didot` and `Bodoni 72` ship with macOS. They ship with nothing else.
`Playfair Display` is a Google font that is not being loaded. So the fallback
order in practice is:

| Visitor | Display serif they actually see |
|---|---|
| macOS / iOS | **Didot** — the intended design |
| Windows | Georgia |
| Android | Times / Noto Serif |
| Linux | whatever `serif` maps to |

The high-contrast Didot display face carries the identity of this design — the
hero, every section heading, the motto. On Windows it silently becomes Georgia,
a sturdy but completely different low-contrast face. The design the client
approved is the macOS rendering, and most desktop visitors will not see it.

The same applies to `--sans`: macOS gets SF, Windows gets Segoe UI. That one is
a much smaller difference and is defensible as a deliberate system-font stack.

## Fixing it

Self-host a display serif and reference it here. Self-hosting is preferred over
the Google Fonts CDN: no third-party request, no privacy disclosure, and no
dependency on another origin staying up.

1. Pick the face. **Playfair Display** is already named in the stack, is free
   under the SIL Open Font License, and is the closest free Didot-class face.
   If the client wants the real thing, licensing Didot for web use is a
   commercial purchase and a budget conversation.
2. Put the `.woff2` files in this folder. Subset to Latin and to the weights
   actually used — headings use a single weight, so one or two files is enough.
3. Declare them in `styles.css` above `:root`:

   ```css
   @font-face{
     font-family:"Playfair Display";
     src:url("../fonts/playfair-display-400.woff2") format("woff2");
     font-weight:400; font-style:normal; font-display:swap;
   }
   ```
   Add a second `@font-face` with `font-style:italic` — the hero sets "Truth."
   and "Logic." in italic, and a synthesized italic looks wrong on a display
   serif.
4. Move it ahead of the Mac-only names in `--serif`, so every platform gets the
   same face:

   ```css
   --serif: "Playfair Display",Didot,"Bodoni 72",Georgia,serif;
   ```
5. Preload it in `index.html`, since the hero headline is the largest text on
   the page and you do not want it reflowing:

   ```html
   <link rel="preload" href="assets/fonts/playfair-display-400.woff2"
         as="font" type="font/woff2" crossorigin>
   ```

`font-display:swap` shows fallback text immediately and swaps when the font
lands — the text is never invisible, at the cost of a visible reflow. Check the
result on Windows, not just on a Mac.

## Check before shipping

Confirm the license permits web embedding, and keep the license file alongside
the font files. The OFL requires the license to travel with the font.
