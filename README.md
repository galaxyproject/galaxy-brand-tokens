# @galaxyproject/brand-tokens

Canonical Galaxy brand design tokens -- the color palette and font stack shared
across Galaxy web properties (the Hub, the Keycloak login/email theme, and more).

## What's here

- `src/theme.css` -- the single source of truth: a Tailwind `@theme {}` block
  with the semantic `--color-galaxy-*` aliases, the five IWC 50-950 scales
  (`bay-of-many`, `ebony-clay`, `gold`, `chicago`, `hokey-pokey`), background
  surfaces, accent vars, and `--font-sans`.
- `dist/theme.css` -- published `@theme` form, for Tailwind consumers.
- `dist/tokens.css` -- published `:root` form, generated from the source, for
  plain-CSS consumers.
- `DESIGN.md` -- the canonical base Galaxy design system that brand properties
  build on.

## Consuming it

**Tailwind (e.g. galaxy-hub):**

```css
@import 'tailwindcss';
@import '@galaxyproject/brand-tokens/theme.css';
```

**Plain CSS / no build (e.g. galaxy-keycloak-theme):** fetch the `:root` flavor
from jsdelivr at a pinned version:

```
https://cdn.jsdelivr.net/npm/@galaxyproject/brand-tokens@0.1.0/dist/tokens.css
```

## Developing

`src/theme.css` is the only file you hand-edit. Run `npm run build` to
regenerate `dist/`. CI fails if `dist/` is out of sync with the source.
