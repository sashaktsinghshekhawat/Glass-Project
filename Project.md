# Glass Project — project handbook (for humans & AI agents)

This document summarizes the **AD-Glass-Test** codebase: purpose, stack, file layout, components, configuration, and conventions so an agent can navigate the repo without guesswork.

---

## 1. What this project is

- **Product name (UI):** “Glass Project” — a **design lab / test site** for interactive web experiences (glass UI, motion, full-bleed hero imagery, bento-style UI).
- **Repository npm name:** `ad-glass-test` (see `package.json`). The folder may be named `AD-Glass-Test`; npm forbids mixed-case package names, so the published package name is lowercase.
- **Scope:** Single-page marketing-style landing on `/` only. No API routes, no auth backend, no database. Navigation links are placeholders (`href="#"`).

---

## 2. Technology stack (pinned as of repo state)

| Layer | Choice | Notes |
|--------|--------|--------|
| Framework | **Next.js 16.2.4** | App Router; dev uses **Turbopack** (`next dev`). |
| React | **19.2.4** | |
| TypeScript | **5.x** | `strict: true` |
| Styling | **Tailwind CSS v4** | `@import "tailwindcss"` in `app/globals.css`; PostCSS via `@tailwindcss/postcss`. |
| Animation | **framer-motion** (~12.38) | Used on the landing hero (`motion.h1`, `motion.div`, wrapper `motion.div`). |
| Icons | **lucide-react** | e.g. `Menu` in mobile header. |
| Utilities | **clsx**, **tailwind-merge** | Installed; not necessarily used in current page code — safe for future composition. |

**Agent note (Next.js version):** `AGENTS.md` states this may differ from training cutoffs — prefer reading `node_modules/next/dist/docs/` for current APIs.

---

## 3. NPM scripts & local development

From project root:

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `npm run dev` | Development server (default port **3000**; Turbopack). |
| `build` | `npm run build` | Production build. |
| `start` | `npm run start` | Serve production build. |
| `lint` | `npm run lint` | ESLint (Next core-web-vitals + TypeScript presets). |

**Config:** `devIndicators` is **`false`** in `next.config.ts` — Next.js corner dev-tool indicator is disabled.

---

## 4. Directory structure (sources that matter)

```
AD-Glass-Test/
├── app/
│   ├── layout.tsx       # Root layout, fonts, metadata, global CSS import
│   ├── page.tsx         # Single landing page (“use client”)
│   └── globals.css      # Tailwind v4 entry + @theme font tokens + body defaults
├── components/
│   └── glass-project-bento.tsx   # Exported GlassProjectBento
├── public/              # Static assets served at /
│   └── (expects Glass-Project.png for hero — see §9)
├── design.md             # Canonical design tokens & Tailwind patterns
├── Action-design-system.md # Original stakeholder color/type inputs (ancestor of design.md)
├── action-bento-ui.md    # Spec + source JSX for bento composition
├── AGENTS.md             # Next.js agent warning (breaking changes vs older Next)
├── CLAUDE.md             # Points to AGENTS.md
├── Project.md            # This file
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json         # `@/*` → repo root
└── package.json
```

**Notable:** Default `create-next-app` SVGs (`next.svg`, `vercel.svg`, etc.) may remain under `public/`; the live hero expects **`/Glass-Project.png`** (see §9).

---

## 5. Routing & rendering model

- **Router:** App Router (`app/`).
- **Active route:** `app/page.tsx` → **`/`**.
- **`app/layout.tsx`:** Server Component (default); loads Geist Sans, Geist Mono, Playfair Display via `next/font/google`; wraps `{children}` in `<html>` / `<body>`.
- **`app/page.tsx`:** **`"use client"`** — required for Framer Motion hooks/components on the landing.

**Implication:** New interactive sections on the same page can stay client-side; extracting presentational subtrees without hooks into Server Components requires passing children or splitting files carefully.

---

## 6. Page architecture (`app/page.tsx`)

Vertical order in the DOM (scroll top → bottom):

1. **Floating glass header** — `absolute`, `top-6` / `md:top-8`, `z-50`, horizontally centered capsule (`max-w-3xl`). Sits above both hero and bento visually.
2. **Hero `<main>`** — **Primary** block: `min-h-screen`, full-bleed background image + gradient overlay, serif headline (`font-serif` → Playfair), glass email field + “Get updates”, body copy about Glass Project. Uses **Framer Motion** entrance animations.
3. **Bento `<section>`** — **Secondary**: `aria-labelledby="bento-showcase-heading"`, `sr-only` H2 “Interactive bento UI showcase”, light wash **`bg-[#ece8e6]`** (see **`design.md`** “Light section wash”), generous top padding (`pt-28` / `md:pt-32`) so content clears the floating header when scrolled into view, `overflow-x-auto` for narrow viewports (see §8).
4. **Footer** — Light gray bar, branding, © year, social placeholder links.

**Z-index cheatsheet**

| Region | Typical z-index |
|--------|-----------------|
| Header | `z-50` |
| Bento section | `z-[20]` |
| Hero / footer content | `z-10` (hero overlay gradient `pointer-events-none`) |

**Motion wrapper**

- Outer `motion.div` (`opacity` fade-in on load) wraps header + hero + bento + footer inside the flex column shell.

---

## 7. Styling system

### Tailwind v4

- **`app/globals.css`:** `@import "tailwindcss"`; `@theme inline` maps:
  - `--font-sans` → `--font-geist-sans`
  - `--font-mono` → `--font-geist-mono`
  - `--font-serif` → `--font-playfair`

**Caveat:** `body { font-family: Arial, Helvetica, sans-serif }` remains in CSS; **`body` also has Tailwind class `font-sans`** from `layout.tsx` — Tailwind utilities generally override the stylesheet for font on `body`; use `globals.css` intentionally if aligning body font fully with Geist.

### Design authority

1. **`design.md`** — primary reference for tokens: `#b3a8a6`, **`#ece8e6`** (light section wash), `#282524`, `#363332`, `#1a1919`, accent `#FF5E3A`, text `#898483` on dark, grayscale text on light, hero serif vs UI sans rules, floating header + waitlist patterns, accessibility notes.
2. **`Action-design-system.md`** — earlier brief; **`design.md`** is the expanded normative doc.

**(Minor doc issue)** `design.md` contains two sections numbered “## 5”; treat **Accessibility** vs **Agent checklist** as separate sections when editing.

### Hero-specific patterns (documented in `design.md`)

- **Floating glass nav:** `rounded-full bg-black/10 backdrop-blur-xl border-white/20`, white link colors with hover to full white.
- **Waitlist row:** Frosted capsule + inner black pill button (see `design.md` §4).

---

## 8. Components

### `TaxCalculator` (`components/tax-calculator.tsx`)

- **Export:** Named export `TaxCalculator`.
- **Role:** Interactive comprehensive tax calculator for Australian residents. Inserted directly below the Bento UI section.
- **Key Features:**
  - **Framer Motion Animations:** Smooth layout transitions for conditionally rendered inputs and dynamically scaled components using `layout` props.
  - **Custom Animated Dropdowns:** Uses `AnimatePresence` for smooth opening/closing, carefully managing `z-index` to prevent clipping within overflow contexts.
  - **Real-time Number Rolling:** Custom `<AnimatedNumber />` component tracks raw numeric states with `useMotionValue` and `animate(..., { ease: "circOut", duration: 1.2 })`, avoiding costly React re-renders. Text is wrapped with `tabular-nums` Tailwind utility to avoid horizontal jitter.

### `GlassProjectBento` (`components/glass-project-bento.tsx`)

- **Export:** Named export `GlassProjectBento`.
- **Origin:** Recreated from `action-bento-ui.md` pixel layout; **`w-[958px]`** outer row with uniform **`gap-[36px]`** between adjacent cards (was 934px / 24px originally); colors remapped to `design.md`.
- **Layout constants (logical / pre-zoom):**
  - Row container: **`w-[958px]`**, **`gap-[36px]`** (same value between profile | right column, AILab | controls stack, controls | DICOM, and top row | chest), **`items-end`** so **`profile-card`** and **`chest-card`** share a **common bottom edge**.
  - Inner top row of the right column: **`items-start`** keeps **ailab** / **controls** / **dicom** from stretching oddly in the cross axis.
  - Profile column: **`w-[400px] h-[600px]`**, **`mt-[48px]`**, `rounded-[36px]`.
  - Right stack: **`w-[522px]`** (= 266 + gap + 220), internal cards (`ailab-card` **266×248**, **`p-5`**, **`-mt-[28px]`**; `controls-card` **220×236**, **`-mt-[60px]`**, **`z-30`**; DICOM 220 tall; chest row 220 tall; popup **464×260**, etc.).
- **Visual scale:** **`BENTO_VIEWPORT_ZOOM`** (typically **~1.1**) applied as inline **`style={{ zoom: … }}`** on the outer shell — preserves internal CSS dimensions while resizing the whole showcase; affects layout footprint in Blink/WebKit-class engines. Narrow screens rely on **`overflow-x-auto`** on the parent section in `page.tsx`.
- **Layers:**
  - **Layer 1:** Bento grid `z-10`.
  - **Layer 2:** Glass KPI card absolutely centered **`inset-0`** within the component root **`z-50`**, **`pointer-events-none`** on wrapper, **`pointer-events-auto`** on the card — so overlay stays scoped to the bento viewport, not the full page.

#### Bento card `id` anchors (`components/glass-project-bento.tsx`)

These DOM `id`s are stable hooks for readers, tests, and “edit this card” requests. **Do not remove** without updating this table and any automation that targets them.

| `id` | What to edit |
|------|----------------|
| `profile-card` | Left tall card — **Endy Rasmussen** profile, patient meta, “Add scan”, document tiles row. |
| `ailab-card` | **X-ray tracker** card — AILab label, image + measurement overlay SVG. |
| `controls-card` | **Invert / Flip / Area** toggles and the Low–Mod–High slider strip. |
| `dicom-card` | **Dr. Johnson** light card with “Added DICOM images” and two thumbnails. |
| `chest-card` | **Bottom wide** card — Chest copy, ADAMRAS-002, finding text, right image panel with controls. |
| `popup-card` | **Center glass overlay** — frosted KPI card (“AI cuts ER wait…”) and bar chart; layer 2 with **`translate-y-[36px]`** (nudged below true center). |

**Not id’d:** The two small **Report / Bill** document tiles are rendered by `DocumentTile` and have no top-level `id` (change within `profile-card` if needed).

**Imagery**

- Uses **external Unsplash `<img>`** URLs with `eslint-disable-next-line @next/next/no-img-element` comments (avoids configuring `images.remotePatterns` for `next/image`).
- **`DocumentTile`** is a small local subcomponent in the same file (PDF thumbnails row).

---

## 9. Static assets (`public/`)

- **Hero background:** referenced in CSS/Tailwind as **`/Glass-Project.png`** (expected at `public/Glass-Project.png`). If missing, hero background breaks; **ensure the file exists** in deployments.
- Other SVG placeholders from scaffolding may remain unused by the landing.

---

## 10. Fonts (`app/layout.tsx`)

| Font | Variable | Role |
|------|-----------|------|
| Geist | `--font-geist-sans` | Default UI (`font-sans` on body). |
| Geist Mono | `--font-geist-mono` | Monospace theme token (minimal use on landing). |
| Playfair Display | `--font-playfair` | **`font-serif`** for hero headline. |

Subset: `latin` for all Google fonts above.

---

## 11. TypeScript paths

```json
"@/*": ["./*"]
```

Examples:

- `@/components/glass-project-bento`

---

## 12. Linting & quality

- **ESLint:** flat config merging `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`; ignores `.next`, `out`, `build`.
- **`npm run build`** runs TypeScript check as part of the Next pipeline — treat a clean build as the bar for structural correctness after edits.

---

## 13. Specification & changelog markdown (not executable)

| File | Role |
|------|------|
| `action-bento-ui.md` | Original pasted React/HTML for medical bento demo; authoritative for **dimensions** before zoom; implementation lives in TSX component. |
| `Action-design-system.md` | Short color/type spec feeding `design.md`. |
| `design.md` | Living design system for agents — extend when adding new primitives. |

These files are guidance; **`app/page.tsx`** and **`components/glass-project-bento.tsx`** are the runtime truth.

---

## 14. Dependency & UX caveats for agents

1. **Single page:** No middleware, no i18n, no dynamic `[slug]` routes.
2. **Client bundle size:** Landing pulls `framer-motion` — acceptable for prototype; reconsider for strict perf budgets elsewhere.
3. **Email field:** Cosmetic only — no `action`, no newsletter API wired.
4. **Links:** `href="#"` — replace with routes when expanding the site.
5. **Bento `zoom`:** If cross-browser inconsistencies appear (older Firefox, etc.), consider replacing with explicit remultiplied Tailwind widths or CSS `scale()` + spacer technique.
6. **Images:** Migrating Unsplash URLs to **`next/image`** requires **`next.config.ts` `images.remotePatterns`** configuration (not currently set).
7. **Package naming:** Imports use `@/`; npm package **name** is `ad-glass-test` regardless of repo folder capitalization.

---

## 15. Suggested workflow for future agents

1. Read **`AGENTS.md`** + Next 16 docs under `node_modules/next/dist/docs/` before API changes.
2. For visual work, reconcile with **`design.md`** (tokens + checklist).
3. For bento tweaks, keep **`gap-[36px]`** uniform across the four outer flex wrappers and **`w-[958px]`** balanced with card widths; tune **`BENTO_VIEWPORT_ZOOM`** before rewriting inner sizes.
4. After substantive edits run **`npm run lint`** and **`npm run build`**.

---

## 16. File inventory (tracked source-ish files)

Core application:

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `components/glass-project-bento.tsx`

Config / tooling:

- `package.json`, `package-lock.json`
- `tsconfig.json`, `next-env.d.ts`
- `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`

Documentation:

- `README.md` (generic CRA-style Next readme)
- `design.md`, `Action-design-system.md`, `action-bento-ui.md`, `Project.md`
- `AGENTS.md`, `CLAUDE.md`

Editor:

- `.vscode/settings.json` (minimal; git ignore warning)

---

*Last synthesized from repository analysis. Update this file when architecture, routing, or major dependencies change.*
