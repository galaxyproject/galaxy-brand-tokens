# Galaxy Brand -- Base Design System

The canonical brand layer for Galaxy web properties: the color palette, the
roles each color plays, and the typography choice. Individual properties (the
Hub, the Keycloak theme, IWC, GTN, ...) build on top of this and keep only a
short property-specific overrides doc for what's unique to them.

The tokens described here ship as `@galaxyproject/brand-tokens`
(`theme.css` for Tailwind consumers, `tokens.css` for plain CSS). This document
is the *why*; the package is the *what*.

## 1. Color Palette & Roles

The color system is defined around **Galaxy brand tokens** (`galaxy-*`, `light-bg`, `medium-bg`, etc.) which are for brand-facing surfaces: hero sections, page headers, cards, prose content, navigation.

> **Palette decision -- Galaxy gold**
>
> `#ffd700` is the Galaxy accent gold. It is exposed as `galaxy-gold` and `gold-500`, and it is the gold to use for CTAs, active states, accent bars, highlighted hero text, and other high-attention moments.
>
> `#d19e00` (`galaxy-gold-dark` / `gold-600`) is the darker hover/shadow companion for gold surfaces.
>
> `#d0bd2a` (`hokey-pokey-500`) remains available as a **support token** for cross-property compatibility. It is not the primary Galaxy accent and should not replace `galaxy-gold` in new work.
>
> Practical rule: if the UI element is meant to read as the site's signature accent, use `#ffd700`. If a broader filled surface needs a quieter yellow-olive tone, `hokey-pokey-*` can be used deliberately, but never as a second "primary gold" on the same surface.

### Galaxy Brand Tokens

| Token | Hex | Tailwind | IWC alias | Usage |
|-------|-----|----------|-----------|-------|
| Galaxy Dark | `#2c3143` | `galaxy-dark` | `ebony-clay` | Sidebar, headers, dark backgrounds, heading text |
| Galaxy Primary | `#25537b` | `galaxy-primary` | `bay-of-many` | Links, interactive elements, table headers |
| Galaxy Gold | `#ffd700` | `galaxy-gold` | `gold-500` | Accents, active states, primary CTAs, border highlights |
| Galaxy Gold Dark | `#d19e00` | `galaxy-gold-dark` | `gold-600` | Hover state on gold-background buttons |
| Accent Hover | `#ffe60d` | `accent-hover` | `gold-400` | Hover state on gold-colored text links |
| Chicago | `#58585a` | `galaxy-grey` | `chicago` | Body text, muted content |
| Hokey-Pokey | `#d0bd2a` | (not yet) | `hokey-pokey-500` | Support gold for cross-property compatibility; not the primary accent |

## 2. Ecosystem Palette Alignment (Cross-Property)

Properties ship the same **full 50-950 Tailwind-standard scales** under the same Pantone-style names. Both properties can reference either the semantic aliases (`galaxy-primary`, `galaxy-dark`, `galaxy-grey`, `galaxy-gold`) or the Pantone scales (`bay-of-many-*`, `ebony-clay-*`, `chicago-*`, `gold-*`, `hokey-pokey-*`) interchangeably.

When to reach for which:

- **Semantic aliases** -- when the usage maps clearly to brand roles: "this is the primary link color", "this is the page dark", "this is the gold accent". Most styled Galaxy pages stay here.
- **Pantone scales** -- when you need a shade between the base and white/black: subtle borders (`border-ebony-clay-100`), tinted section backgrounds (`bg-bay-of-many-50`), hover states (`hover:bg-ebony-clay-50`), muted text (`text-chicago-500`). These unlock the migration away from generic gray tones.

Replacement patterns for generic grays:

- `text-gray-600` → `text-chicago-600`
- `text-gray-700` → `text-chicago-700`
- `text-gray-500` → `text-chicago-500`
- `border-gray-200` → `border-ebony-clay-100`
- `bg-gray-50` / `bg-gray-100` → `bg-ebony-clay-50` or `bg-bay-of-many-50` (depending on tint intent)
- `hover:bg-gray-100` → `hover:bg-ebony-clay-50`

The palette contract is fixed: `galaxy-gold` / `gold-500` is the primary accent; `hokey-pokey-*` is optional support color only.

## 3. Background Surfaces

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Dark BG | `#2c3143` | `dark-bg` | Sidebar, hero sections, dark panels |
| Medium BG | `#3c435c` | `medium-bg` | Sidebar borders, search inputs, dark-section alternation |
| Light BG | `#edf4fa` | `light-bg` | Page backgrounds (subtle blue-gray tint) |
| Card BG | `#5d678d` | `card-bg` | Muted card surfaces on dark backgrounds |

## 4. The Gold Accent

Gold (`#ffd700`) is Galaxy's visual signature. Use it for:

- **Primary CTAs**: Gold buttons with dark text
- **Active states**: Tab underlines, selected filter items, current page indicators
- **Left border accents**: Page header title bars, blockquotes, featured content
- **Title underlines**: Section headers where a left bar feels too heavy (`border-b-2 border-galaxy-gold`)
- **Hero text**: Key headlines on dark backgrounds
- **Hover reveals**: Animated gold bars on interactive items, link hover states
- **Stats/numbers**: Gold numerals in hero stats for emphasis

**Rule**: Gold should feel special. If everything is gold, nothing is gold.

**When NOT to use gold borders**: On cards sitting on dark backgrounds (hero sections), the white card already provides contrast -- adding a gold border is redundant.

**Gold palette roles**:
- Gold-background buttons darken on hover: `hover:bg-galaxy-gold-dark` (`#d19e00`)
- Gold-colored text links brighten on hover: `hover:text-accent-hover` (`#ffe60d`)
- Softer olive-gold alternative for cross-property compatibility: `hokey-pokey-500` (`#d0bd2a`)

## 5. Typography

### Font Family

- **Primary**: Atkinson Hyperlegible (400, 700)
- **Stack**: `'Atkinson Hyperlegible', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Why**: Designed by the Braille Institute specifically for character distinction and readability. Characters like `Il1` and `O0` are visually distinct, benefiting researchers scanning data-heavy content.

## 6. Quick Color Reference

| Token | Hex | When to Use |
|-------|-----|-------------|
| `galaxy-dark` | `#2c3143` | Sidebar bg, header bg, heading text |
| `galaxy-primary` | `#25537b` | Links, table headers, interactive elements |
| `galaxy-gold` | `#ffd700` | CTAs, active states, accent borders, hero highlights |
| `galaxy-gold-dark` | `#d19e00` | Hover on gold-bg buttons |
| `accent-hover` | `#ffe60d` | Hover on gold-colored text links |
| `galaxy-grey` | `#58585a` | Body text, muted content |
| `light-bg` | `#edf4fa` | Page background |
| `medium-bg` | `#3c435c` | Sidebar borders, dark-section alternation |
| White | `#ffffff` | Content cards, reading surfaces |

## 7. Do's and Don'ts (brand level)

### Do

- Use Galaxy brand tokens (`galaxy-dark`, `galaxy-primary`, `galaxy-gold`, `galaxy-grey`) for all brand-facing surfaces
- Reserve gold for high-impact moments: CTAs, active states, accent borders, hero text
- Use `rounded-lg` + `shadow-sm` consistently on content cards
- Make all links `text-galaxy-primary` with `hover:text-galaxy-gold` transitions
- Use `text-galaxy-dark` for heading text color
- Use Atkinson Hyperlegible -- never substitute another font
- Apply `bg-grid-dark` overlay on dark hero/section backgrounds
- Use the gradient pattern (`galaxy-dark → galaxy-primary` at 135°) for page headers

### Don't

- Don't use generic Tailwind grays (`gray-500`, `slate-600`) for brand-facing text or backgrounds
- Don't use `text-blue-*` or `text-indigo-*` on links -- always `text-galaxy-primary`
- Don't overuse gold -- if every element has a gold accent, the signature is lost
- Don't add gold borders to cards on dark backgrounds -- the white card IS the contrast
- Don't use `bg-primary` expecting Galaxy blue -- `primary` is the near-black token; use `bg-galaxy-primary` for brand blue
- Don't hardcode hex values where a token exists (use `bg-galaxy-primary`, not `bg-[#25537b]`)
