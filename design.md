# Design system — AD Glass site

Living reference for **colors**, **typography**, and **Tailwind-aligned usage**. Prefer these tokens/classes so layouts stay consistent across pages and contributions.

---

## Foundations

### Color philosophy

- **App shell** rests on a warm neutral background (`#b3a8a6`).
- **Primary surfaces** skew dark (`#282524`, `#363332`, deep variants) with **high-contrast primary text** on dark UI (`#FFFFFF`) and restrained secondary (`#898483`).
- **Accent `#FF5E3A`** is the **only** accent; use sparingly for CTAs, focus states, and key emphasis — not for large fills unless intentional (e.g. primary button).

### Typography philosophy

- **Stack:** system UI sans-serif only — **`font-sans`** in Tailwind (maps to Tailwind theme; ensure stacks include Inter, Roboto, system-ui).
- **Hero exception:** The primary large hero headline utilizes an elegant editorial serif — **`font-serif`** in Tailwind (mapped to Playfair Display) to create a premium, award-winning feel.
- **Default weight** for most UI is **medium (500)**; step up semibold/bold only as specified below.

---

## 1. Colors (Tailwind)

Use **arbitrary values** until/unless project `@theme` maps these to named tokens. Examples use literal hex for zero ambiguity.

### Backgrounds

| Role | Hex | Typical Tailwind | Notes |
|------|-----|-------------------|--------|
| App background | `#b3a8a6` | `bg-[#b3a8a6]` | Full-page wash behind content |
| Light section wash | `#ece8e6` | `bg-[#ece8e6]` | Same hue family as app background **but markedly lighter** — use behind large demos (e.g. bento) so chrome reads softer than `#b3a8a6` |
| Main cards | `#282524` | `bg-[#282524]` | Primary elevated panels |
| Secondary surfaces | `#363332` | `bg-[#363332]` | Nested rows, subtler panels |
| Deep surfaces | `#1a1919` or `#1e1c1c` | `bg-[#1a1919]` / `bg-[#1e1c1c]` | Footers, modals backdrop-adjacent, dense chrome |
| Light cards | `#FFFFFF` | `bg-white` or `bg-[#FFFFFF]` | Light UI strips on dark contexts |

### Accent (single only)

| Role | Hex | Typical Tailwind | Notes |
|------|-----|-------------------|--------|
| Primary accent | `#FF5E3A` | `text-[#FF5E3A]` `bg-[#FF5E3A]` `border-[#FF5E3A]` `ring-[#FF5E3A]` | **Do not introduce** secondary accent hues (no extra oranges, blues, greens for “accent”) |

**Examples**

- Solid CTA button: `bg-[#FF5E3A] text-white font-medium rounded-lg px-4 py-2 hover:opacity-90`
- Outline / ghost emphasis: `border border-[#FF5E3A] text-[#FF5E3A]` on dark surfaces
- Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E3A]/80`

### Text

**Dark UI** (foreground on `#282524`, `#363332`, deep surfaces)

| Role | Hex | Typical Tailwind |
|------|-----|-------------------|
| Primary | `#FFFFFF` | `text-white` |
| Secondary | `#898483` | `text-[#898483]` |

**Light UI** (foreground on `#FFFFFF` / `#b3a8a6` / `#ece8e6`)

| Role | Tailwind utility | Hex / scale |
|------|------------------|--------------|
| Primary | `text-gray-900` or `text-gray-800` | Strong body/headlines |
| Secondary | `text-gray-700` or `text-gray-500` | Supporting copy |

Pairs to avoid confusion:

- Dark card body: `bg-[#282524] text-white` with subtitles `text-[#898483]`.
- Light card on warm bg: `bg-white text-gray-900` with meta `text-gray-500`.

### Optional Tailwind `@theme` (for maintainability)

Agents may add semantic aliases in `app/globals.css` under `@theme inline` once agreed, for example:

```css
--color-app-bg: #b3a8a6;
--color-section-wash: #ece8e6;
--color-card: #282524;
--color-surface-secondary: #363332;
--color-deep: #1a1919;
--color-accent: #FF5E3A;
--color-muted-on-dark: #898483;
```

Then document `bg-card`, `text-muted-on-dark`, etc. alongside this file. Until then, keep hex arbitrary classes above.

---

## 2. Typography (Tailwind)

### Font family

| Usage | Tailwind |
|-------|----------|
| All UI body, headings | `font-sans` |
| Hero primary headline | `font-serif` |

**Recommended `tailwind` / `@theme`** `fontFamily.sans`:

`ui-sans-serif, system-ui, "Inter", "Roboto", "SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif`

(If `@font-face` Inter is added later, keep loading minimal weights: 400, 500, 600, 700.)

### Type scale (px → typical Tailwind)

| Role | Size | Typical Tailwind | Line height suggestion |
|------|------|-------------------|-------------------------|
| Hero | 28px | `text-[28px]` leading-tight (`leading-snug` or `leading-none` for stacked heroes) |
| Section titles | 20–22px | `text-[22px]` or `text-xl` (~20px default; prefer `text-[22px]` to match spec) |
| Subheadings | 17–18px | `text-[17px]` or `text-[18px]` |
| Body | 14–15px | `text-sm` (14px) or `text-[15px]` |
| Small labels | 11–12px | `text-xs` (12px) or `text-[11px]` |
| Micro | 10px | `text-[10px]` |

### Font weights

| Weight | Numeric | Tailwind | When |
|--------|---------|----------|------|
| Medium (default UI) | 500 | `font-medium` | Buttons, nav, form labels, most headings body emphasis |
| Semibold | 600 | `font-semibold` | Important labels, card titles |
| Bold | 700 | `font-bold` | Sparse highlights only (hero keywords, KPI numbers) |

**Do not default to `font-bold` for headings** unless the headline is deliberately key-scene; prefer `font-medium` / `font-semibold` per table.

---

## 3. Combining patterns (copy-paste examples)

### Dark card on app background

```html
<section className="bg-[#b3a8a6] min-h-screen p-8">
  <div className="rounded-2xl bg-[#282524] p-6 text-white">
    <h2 className="text-[22px] font-semibold leading-snug">
      Section title
    </h2>
    <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#898483]">
      Secondary explanatory copy on dark surfaces.
    </p>
    <button
      type="button"
      className="mt-6 rounded-lg bg-[#FF5E3A] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
    >
      Primary action
    </button>
  </div>
</section>
```

### Hero block

```html
<h1 className="text-[28px] font-semibold leading-tight tracking-tight text-gray-900">
  <!-- If hero sits on light card -->
</h1>
```

On **dark hero** shells, swap title to `text-white` and subcopy to `text-[#898483]`.

### Small label / micro

```html
<span className="text-[11px] font-medium uppercase tracking-wide text-[#898483]">
  Label
</span>
```

## 4. UI Components (New Additions)

The following custom components were introduced to match the award-winning glass aesthetic. Follow these exact Tailwind combinations to replicate them.

### Floating Glass Header
A pill-shaped, frosted navigation bar that floats over the content.
- **Container:** `rounded-full bg-black/10 backdrop-blur-xl border border-white/20 shadow-lg`
- **Inner items:** Use white with opacity (`text-white/80`) that transitions to solid white (`hover:text-white`) for links.

### Waitlist Field (Glass Input + Button)
A unified, frosted field containing an email input and a solid dark submit button.
- **Wrapper:** `p-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg`
- **Input:** `bg-transparent border-none outline-none text-white placeholder:text-white/70 px-5 text-[15px] font-medium`
- **Submit Button:** `bg-black text-white px-6 py-3 rounded-full text-[14px] font-medium hover:bg-black/80 shadow-[0_0_20px_rgba(0,0,0,0.5)]`

### Custom Select Dropdown
A fully custom, accessible dropdown using `framer-motion` for smooth scale and fade animations.
- **Trigger:** `bg-[#363332] text-white rounded-xl shadow-sm focus:ring-2 focus:ring-[#FF5E3A]/80`
- **Dropdown List:** `absolute z-20 bg-[#282524] border border-white/10 rounded-xl shadow-2xl`
- **Animation:** `AnimatePresence` with `opacity`, `y`, and `scaleY` transitions. Requires explicit `z-index` management on parent rows to avoid clipping (no `overflow-hidden` on parent container).

### Animated Number Component
Used to provide real-time cinematic "rolling" numbers without triggering heavy React re-renders.
- **Hooks:** Uses `useMotionValue`, `animate`, and `useMotionValueEvent` from `framer-motion`.
- **Easing:** `circOut` over `1.2` seconds for a fast-start, slow-finish effect.
- **Styling:** Wraps the display value in a `span` with `tabular-nums` to prevent horizontal jitter as numbers change.

---

## 5. Accessibility & contrast

- On `#282524`, white (`#FFFFFF`) text passes large/body targets for normal copy; keep secondary at `#898483` only for non-essential text or larger sizes.
- Accent `#FF5E3A` on white: verify contrast for small text; prefer **white text on accent fill** for buttons rather than orange text on white for small labels.
- Focus states should use **visible rings** (`ring-2 ring-[#FF5E3A]`) on interactive elements.

---

## 5. Agent checklist (before shipping UI)

1. **Backgrounds** use only the listed hex roles (or future `@theme` aliases).
2. **Single accent** `#FF5E3A` — no extra brand colors for emphasis.
3. **Typography** sizes and weights match the scale; default UI weight is **medium (500)**.
4. **Dark vs light text** rules respected for the surface behind the text.
5. **Dark cards** use white + `#898483`; **light cards** use gray-900/800 and gray-700/500.

---

*Generated from product inputs in `Action.md`. Update this file when design decisions change.*
