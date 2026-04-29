# IT Solutions Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic dark/light theme of the IT Solutions Next.js site with the "Variant C — Bento Maximalist" design from the Claude Design handoff (`docs/design-handoff/strona-wizyt-wka/`), aligning the home page, services, portfolio and contact pages, plus all secondary main-app pages (about, pricing, legal, showcase index, navbar, footer, cookie banner, chat widget).

**Architecture:** Adopt the design's CSS variable token system (`--bg`, `--bg-card`, `--bg-light`, `--fg`, `--fg-muted`, `--accent`, `--accent-fg`, `--line`, plus typography stacks `--font-sans`, `--font-display`, `--font-mono`) as the global theme. Map dark mode to the design's dark palette and light mode to a derived light palette so the existing `next-themes` switcher keeps working. Add Inter Tight + Instrument Serif + JetBrains Mono via `next/font` alongside Geist as a fallback. Build a small set of typed React primitives that mirror the JSX prototypes (`MagneticCTA`, `Tilt`, `Parallax`, `Ticker`, `CountUp`, `TextReveal`, `useReveal`) and replace each `components/sections/*.tsx` with a redesigned counterpart that consumes those primitives. Sub-routes (`/services`, `/portfolio`, `/contact`) become full-page redesigns mirroring `page-services.jsx`, `page-portfolio.jsx`, `page-contact.jsx`. Showcase demo pages (`/showcase/<brand>`) are intentionally out of scope — they have their own per-brand design systems. Verification uses Playwright snapshots at three breakpoints (1440 / 1024 / 390 px) and manual cross-checks via `claude-in-chrome`.

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v3 · CSS variables for theme tokens · `next/font` (Inter Tight, Instrument Serif, JetBrains Mono) · `next-themes` · `next-intl` · `framer-motion` (already in tree) · GSAP (already in tree, used sparingly) · Playwright for tests.

**Design source files (read-only references throughout):**

- `docs/design-handoff/strona-wizyt-wka/README.md` — handoff overview
- `docs/design-handoff/strona-wizyt-wka/project/IT Solutions Redesign.html` — entry point, fonts, JSON-LD
- `docs/design-handoff/strona-wizyt-wka/project/styles.css` — token definitions for variants A/B/C
- `docs/design-handoff/strona-wizyt-wka/project/animations.css` — keyframes + reveal helpers
- `docs/design-handoff/strona-wizyt-wka/project/animations.jsx` — hooks & components (`useReveal`, `useParallax`, `useMagnetic`, `useTilt`, `Ticker`, `MagneticCTA`, `Parallax`, `Tilt`, `CountUp`, `TextReveal`)
- `docs/design-handoff/strona-wizyt-wka/project/variant-c-v2.jsx` — chosen direction (home page, full prototype with PL/EN i18n table at `VC_I18N`, lines 5–188; component body lines 190–1048)
- `docs/design-handoff/strona-wizyt-wka/project/page-services.jsx` — services subpage prototype
- `docs/design-handoff/strona-wizyt-wka/project/page-portfolio.jsx` — portfolio subpage prototype
- `docs/design-handoff/strona-wizyt-wka/project/page-contact.jsx` — contact subpage prototype

**Out of scope (do not modify):**

- `app/[locale]/showcase/<brand>/page.tsx` and `components/showcase/<brand>/**` — each showcase is its own designed brand demo with isolated theme.
- `admin-frontend/`, `backend/`, `api/` — server / admin code.
- `app/[locale]/showcase/<brand>` content — but the showcase **index** page (`app/[locale]/showcase/page.tsx`) and shared chrome (BackToPortfolio, ShowcaseFooter) are restyled.
- Adding net-new pages (no `/blog`, no `/process` route — the handoff uses anchors `#process`, `#faq` on the home page).

---

## File Structure

### Files to create

| Path | Purpose |
|---|---|
| `lib/design/fonts.ts` | Centralised `next/font` declarations for Inter Tight, Instrument Serif, JetBrains Mono |
| `components/animations/useReveal.ts` | IntersectionObserver hook adding `.in` class to `.reveal` elements |
| `components/animations/useParallax.ts` | Scroll-driven translate hook (returns ref) |
| `components/animations/useMagnetic.ts` | Cursor-magnetic translate hook |
| `components/animations/useTilt.ts` | Mouse-driven 3D rotate hook |
| `components/animations/MagneticCTA.tsx` | Anchor / button with magnetic hover, primary/secondary/ghost variants |
| `components/animations/Tilt.tsx` | Wrapper applying `useTilt` |
| `components/animations/Parallax.tsx` | Wrapper applying `useParallax` |
| `components/animations/Ticker.tsx` | Looping marquee component |
| `components/animations/CountUp.tsx` | Animated number counter (intersection-triggered) |
| `components/animations/TextReveal.tsx` | Per-character text reveal on scroll |
| `components/animations/Reveal.tsx` | Lightweight wrapper around `useReveal` for declarative use |
| `components/sections/redesign/Hero.tsx` | Bento hero (title + lead + magnetic CTA) |
| `components/sections/redesign/QuoteCalculator.tsx` | Live calculator card used in hero + contact aside |
| `components/sections/redesign/StackTicker.tsx` | Tech stack ticker section |
| `components/sections/redesign/ServicesBento.tsx` | 5-cell asymmetric services grid |
| `components/sections/redesign/AboutBento.tsx` | About bento with stats + quote |
| `components/sections/redesign/PortfolioGrid.tsx` | Tilt-card portfolio grid (home variant) |
| `components/sections/redesign/Testimonials.tsx` | Bento testimonials (1 big + 2 med + 1 lite) |
| `components/sections/redesign/Process.tsx` | 7-step process bento |
| `components/sections/redesign/Faq.tsx` | Two-column FAQ accordion |
| `components/sections/redesign/CtaCard.tsx` | Lime CTA card |
| `components/sections/redesign/SectionHead.tsx` | Mono kicker + display title with italic accent |
| `components/sections/redesign/MonoLabel.tsx` | `// label` mono kicker primitive |
| `components/sections/redesign/ItalicAccent.tsx` | Renders text with italic Instrument Serif accent span |
| `components/sections/services/ServicesHero.tsx` | Services page hero + intro |
| `components/sections/services/StackTabs.tsx` | Sticky stack switcher |
| `components/sections/services/StackDetailCard.tsx` | Two-column detail card with sidebar aside |
| `components/sections/portfolio/PortfolioHero.tsx` | Portfolio page hero with 4 stat cards |
| `components/sections/portfolio/PortfolioFilters.tsx` | Sticky tag filters |
| `components/sections/portfolio/PortfolioBento.tsx` | 8-cell asymmetric portfolio grid |
| `components/sections/portfolio/CaseStudy.tsx` | FashionHub deep-dive section |
| `components/sections/contact/ContactHero.tsx` | Contact page hero |
| `components/sections/contact/ContactChannels.tsx` | 3 contact-channel cards |
| `components/sections/contact/BriefForm.tsx` | 3-step brief form (client component) |
| `components/sections/contact/ContactAside.tsx` | Sticky aside with slot picker + mini calculator |
| `lib/design/calculator.ts` | Pure pricing function shared by hero calc + contact mini-calc |
| `tests/redesign/home.spec.ts` | Playwright smoke + responsive test for `/` |
| `tests/redesign/services.spec.ts` | Playwright test for `/services` |
| `tests/redesign/portfolio.spec.ts` | Playwright test for `/portfolio` |
| `tests/redesign/contact.spec.ts` | Playwright test for `/contact` |
| `tests/redesign/calculator.spec.ts` | Unit test for `calculator.ts` |
| `tests/redesign/responsive.spec.ts` | Cross-page responsive snapshot test |

### Files to modify

| Path | Change |
|---|---|
| `app/globals.css` | Replace HSL token set with the design's `--bg`, `--bg-card`, `--bg-light`, `--fg`, `--fg-muted`, `--accent`, `--accent-fg`, `--line`, `--font-display/sans/mono`. Keep light & dark variants. Add scroll-reveal & marquee keyframes (port from `animations.css`). |
| `tailwind.config.ts` | Map theme `colors`, `fontFamily`, `borderRadius` to new CSS vars. Keep shadcn primary/secondary backwards-compatible aliases until cleanup. Add `keyframes` for marquee/blink/pulse. |
| `app/[locale]/layout.tsx` | Add the design fonts via `next/font`, expose them as `--font-display/sans/mono` body classes. Body bg switches to `var(--bg)`. |
| `components/layout/Navbar.tsx` | Rewrite to match Variant C nav (sticky pill CTA, mono lang switcher, hamburger sheet on mobile) |
| `components/layout/Footer.tsx` | Rewrite as Variant C footer card (4-column grid, dark card, mono labels) |
| `components/layout/LanguageSwitcher.tsx` | Restyle to mono pill `PL / EN` toggle |
| `app/[locale]/page.tsx` | Compose `Hero`, `StackTicker`, `ServicesBento`, `AboutBento`, `PortfolioGrid`, `Testimonials`, `Process`, `Faq`, `CtaCard` |
| `app/[locale]/services/page.tsx` | Replace existing template with `ServicesHero`, `StackTabs`, `StackDetailCard`, `CtaCard` |
| `app/[locale]/portfolio/page.tsx` | Replace with `PortfolioHero`, `PortfolioFilters`, `PortfolioBento`, `CaseStudy`, `CtaCard` |
| `app/[locale]/contact/page.tsx` | Replace with `ContactHero`, `ContactChannels`, `BriefForm + ContactAside` |
| `app/[locale]/about/page.tsx` | Recompose using new `AboutBento`, `Process`, `Testimonials`, `CtaCard`, replacing the old gradient hero with a SectionHead-driven hero |
| `app/[locale]/pricing/page.tsx` | Restyle pricing cards to use new tokens (dark cards, lime accent, mono labels, italic display) |
| `app/[locale]/cookies-policy/page.tsx` | Swap surface colours / typography to new tokens |
| `app/[locale]/privacy-policy/page.tsx` | Swap surface colours / typography to new tokens |
| `app/[locale]/showcase/page.tsx` | Wrap `ShowcaseList` in a redesigned hero + bento intro |
| `components/showcase/ShowcaseList.tsx` | Restyle list (only this top-level list — individual showcase pages stay isolated) |
| `components/cookies/CookieBanner.tsx` | Restyle to dark card + lime CTA + mono mini-label |
| `components/cookies/CookieSettingsModal.tsx` | Restyle modal surfaces & toggles to new tokens |
| `components/chat/ChatWidget.tsx` | Restyle launcher button (lime pill, dark surface) |
| `components/chat/ChatWindow.tsx` | Restyle chat window surface, header, message bubbles |
| `components/chat/ChatHeader.tsx`, `ChatInput.tsx`, `ChatMessage.tsx`, `LeadForm.tsx` | Apply token swap |
| `components/forms/ContactForm.tsx` | Update inputs / buttons to new tokens; superseded on `/contact` by `BriefForm` but reused elsewhere |
| `components/forms/QuoteForm.tsx` | Token swap on inputs / buttons |
| `components/ui/button.tsx` | Add `lime` variant (accent bg, dark fg, pill rounded) |
| `components/ui/input.tsx`, `components/ui/textarea.tsx` | Default to dark card surface, accent focus ring |
| `components/sections/Hero.tsx` etc. (legacy) | **Delete** after the redesigned counterparts replace their consumers |
| `messages/pl.json` | Merge in the `VC_I18N.pl` strings into the existing namespaces (extend `nav`, replace `hero`, add `calculator`, `process`, `faq`, etc.) |
| `messages/en.json` | Same for `VC_I18N.en` |
| `playwright.config.ts` | Add a `Tablet` project at 1024×768 alongside Desktop and S8 |

### Files to delete (after replacements wired)

`components/sections/Hero.tsx`, `Services.tsx`, `About.tsx`, `Portfolio.tsx`, `Testimonials.tsx`, `Process.tsx`, `Technologies.tsx`, `FAQ.tsx`, `CTA.tsx`, `ShowcasePreview.tsx`. Remove `hooks/useTypewriter.ts` if `Hero.tsx` was the sole consumer (verify with grep before deleting).

---

## Phase A — Foundation

### Task A1: Add design fonts

**Files:**
- Create: `lib/design/fonts.ts`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Create the font declaration module**

```ts
// lib/design/fonts.ts
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
```

- [ ] **Step 2: Wire fonts into the locale layout**

In `app/[locale]/layout.tsx`, import the fonts and add their `.variable` classes to `<html>`:

```tsx
import { interTight, instrumentSerif, jetbrainsMono } from "@/lib/design/fonts";
// ...
return (
  <html
    lang={locale}
    suppressHydrationWarning
    className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${GeistSans.variable} ${GeistMono.variable}`}
  >
```

(Geist stays as a fallback for any leftover surface that hasn't been migrated yet.)

- [ ] **Step 3: Run dev server, confirm fonts load with no console error**

```bash
npm run dev
```
Expected: server starts on `http://localhost:3000`. Curl the homepage and confirm three new `<link rel="preload">` for Inter-Tight, Instrument-Serif, JetBrains-Mono are emitted:

```bash
curl -s http://localhost:3000/pl | grep -E "Inter|Instrument|JetBrains" | head
```
Expected: at least one match per family.

- [ ] **Step 4: Commit**

```bash
git add lib/design/fonts.ts app/[locale]/layout.tsx
git commit -m "feat(redesign): add Inter Tight + Instrument Serif + JetBrains Mono via next/font"
```

---

### Task A2: Replace global token set

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `:root` and `.dark` blocks in `app/globals.css`**

Source of truth for values: `docs/design-handoff/strona-wizyt-wka/project/styles.css:38-51` (variant C). Light values are derived for parity.

```css
@layer base {
  :root {
    /* Surfaces */
    --bg: 248 246 240;            /* warm cream — light mode bg */
    --bg-alt: 240 237 228;
    --bg-card: 255 253 247;
    --bg-light: 14 13 12;          /* inverse — dark insets on light bg */
    --fg: 14 13 12;
    --fg-muted: 99 95 86;
    --fg-on-light: 247 247 245;
    --line: 0 0 0 / 0.10;
    /* Accent (lime stays the same in both modes) */
    --accent: 196 255 58;
    --accent-fg: 5 5 5;
    /* Type stacks */
    --font-sans: var(--font-sans), -apple-system, system-ui, sans-serif;
    --font-display: var(--font-display), "Times New Roman", serif;
    --font-mono: var(--font-mono), ui-monospace, "Menlo", monospace;
    /* Radii */
    --radius: 24px;
    --radius-sm: 18px;
    --radius-lg: 32px;
    /* Animation */
    --animation-duration: 0.3s;
    --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dark {
    --bg: 5 5 5;
    --bg-alt: 14 14 14;
    --bg-card: 19 19 19;
    --bg-light: 243 239 231;
    --fg: 247 247 245;
    --fg-muted: 136 136 132;
    --fg-on-light: 10 10 10;
    --line: 255 255 255 / 0.08;
  }
}
```

> Why RGB-channel triplets instead of HSL: Tailwind's `bg-bg`/`text-fg` utilities will compose the alpha via `rgb(var(--bg) / <alpha>)`.

- [ ] **Step 2: Replace the Tailwind theme block**

In `tailwind.config.ts` replace the `theme.extend` body:

```ts
extend: {
  colors: {
    bg: "rgb(var(--bg) / <alpha-value>)",
    "bg-alt": "rgb(var(--bg-alt) / <alpha-value>)",
    "bg-card": "rgb(var(--bg-card) / <alpha-value>)",
    "bg-light": "rgb(var(--bg-light) / <alpha-value>)",
    fg: "rgb(var(--fg) / <alpha-value>)",
    "fg-muted": "rgb(var(--fg-muted) / <alpha-value>)",
    "fg-on-light": "rgb(var(--fg-on-light) / <alpha-value>)",
    accent: "rgb(var(--accent) / <alpha-value>)",
    "accent-fg": "rgb(var(--accent-fg) / <alpha-value>)",
    line: "rgb(var(--line))",
    // shadcn back-compat aliases (kept until consumers migrate)
    background: "rgb(var(--bg) / <alpha-value>)",
    foreground: "rgb(var(--fg) / <alpha-value>)",
    primary: { DEFAULT: "rgb(var(--accent) / <alpha-value>)", foreground: "rgb(var(--accent-fg) / <alpha-value>)" },
    border: "rgb(var(--line))",
    muted: { DEFAULT: "rgb(var(--bg-alt) / <alpha-value>)", foreground: "rgb(var(--fg-muted) / <alpha-value>)" },
    card: { DEFAULT: "rgb(var(--bg-card) / <alpha-value>)", foreground: "rgb(var(--fg) / <alpha-value>)" },
  },
  fontFamily: {
    sans: ["var(--font-sans)"],
    display: ["var(--font-display)"],
    mono: ["var(--font-mono)"],
  },
  borderRadius: {
    sm: "var(--radius-sm)",
    DEFAULT: "var(--radius)",
    lg: "var(--radius-lg)",
    full: "9999px",
  },
  keyframes: {
    "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
    "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
    marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
    pulse:   { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "1" } },
    rise:    { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    marquee: "marquee 45s linear infinite",
    pulse: "pulse 1.5s ease-in-out infinite",
    rise: "rise 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) both",
  },
},
```

- [ ] **Step 3: Append reveal + marquee primitives to `app/globals.css`**

Below the `@layer utilities` block, append:

```css
@layer base {
  body { background: rgb(var(--bg)); color: rgb(var(--fg)); font-family: var(--font-sans); }
}

/* Scroll reveal */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); }
.reveal.in { opacity: 1; transform: translateY(0); }
.reveal-d1 { transition-delay: .08s; }
.reveal-d2 { transition-delay: .16s; }
.reveal-d3 { transition-delay: .24s; }

/* Ticker (mask + track) */
.ticker { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.ticker-track { display: flex; width: max-content; align-items: center; animation: marquee 45s linear infinite; }
.ticker:hover .ticker-track { animation-play-state: paused; }

/* Cinematic image hover */
.cine { overflow: hidden; }
.cine-img { transition: transform .7s cubic-bezier(.2,.8,.2,1); }
.cine:hover .cine-img { transform: scale(1.06); }
```

- [ ] **Step 4: Smoke-check the dev server**

```bash
npm run dev
```
Open `http://localhost:3000/pl`. Expected: page still renders (legacy components consume `bg-background`, `text-foreground` aliases that now resolve to the new tokens). Hero text colour shifts from gradient blue to lime when CTA is hovered? Not yet — that's later tasks. The page should at least not throw.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat(redesign): swap global token set to Variant C palette + typography"
```

---

### Task A3: Calculator pricing module + unit test

**Files:**
- Create: `lib/design/calculator.ts`
- Create: `tests/redesign/calculator.spec.ts`

- [ ] **Step 1: Write the failing unit test**

```ts
// tests/redesign/calculator.spec.ts
import { test, expect } from "@playwright/test";
import { computeQuote, BASE_PRICE } from "@/lib/design/calculator";

test.describe("calculator.computeQuote", () => {
  test("matches design defaults: next + 8 pages + cms = 14 200", () => {
    expect(computeQuote({ type: "next", pages: 8, cms: true })).toBe(14_200);
  });
  test("base prices match the handoff", () => {
    expect(BASE_PRICE).toEqual({ next: 8500, wp: 5500, woo: 9500, presta: 12000, app: 18000 });
  });
  test("wp + 1 page + no cms = WP base price exactly", () => {
    expect(computeQuote({ type: "wp", pages: 1, cms: false })).toBe(5500);
  });
  test("each extra page adds 600 PLN", () => {
    const a = computeQuote({ type: "next", pages: 1, cms: false });
    const b = computeQuote({ type: "next", pages: 2, cms: false });
    expect(b - a).toBe(600);
  });
  test("cms toggle adds 1500 PLN", () => {
    const off = computeQuote({ type: "app", pages: 5, cms: false });
    const on  = computeQuote({ type: "app", pages: 5, cms: true });
    expect(on - off).toBe(1500);
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

```bash
npx playwright test tests/redesign/calculator.spec.ts --project=chromium
```
Expected: FAIL with "Cannot find module '@/lib/design/calculator'".

- [ ] **Step 3: Implement the module**

Source: `docs/design-handoff/strona-wizyt-wka/project/variant-c-v2.jsx:205-206` and `page-contact.jsx:18-19`.

```ts
// lib/design/calculator.ts
export type ProjectType = "next" | "wp" | "woo" | "presta" | "app";

export const BASE_PRICE: Record<ProjectType, number> = {
  next: 8500,
  wp: 5500,
  woo: 9500,
  presta: 12000,
  app: 18000,
};

export interface QuoteInput {
  type: ProjectType;
  pages: number;
  cms: boolean;
}

export function computeQuote({ type, pages, cms }: QuoteInput): number {
  return BASE_PRICE[type] + Math.max(0, pages - 1) * 600 + (cms ? 1500 : 0);
}
```

- [ ] **Step 4: Run the test again, verify pass**

```bash
npx playwright test tests/redesign/calculator.spec.ts --project=chromium
```
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add lib/design/calculator.ts tests/redesign/calculator.spec.ts
git commit -m "feat(redesign): pure quote calculator + tests"
```

---

### Task A4: Animation hooks (`useReveal`, `useParallax`, `useMagnetic`, `useTilt`)

**Files:**
- Create: `components/animations/useReveal.ts`
- Create: `components/animations/useParallax.ts`
- Create: `components/animations/useMagnetic.ts`
- Create: `components/animations/useTilt.ts`

These are direct ports of `docs/design-handoff/strona-wizyt-wka/project/animations.jsx:6-86`. Each gets its own file, fully typed.

- [ ] **Step 1: Create `useReveal`**

```ts
// components/animations/useReveal.ts
"use client";
import { useEffect } from "react";

export function useReveal(selector = ".reveal") {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(selector).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}
```

- [ ] **Step 2: Create `useParallax`**

```ts
// components/animations/useParallax.ts
"use client";
import { useEffect, type RefObject } from "react";

const findScroller = (el: HTMLElement | null): Window | HTMLElement => {
  let n = el?.parentElement;
  while (n && n !== document.body) {
    const cs = getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight) return n;
    n = n.parentElement;
  }
  return window;
};

export function useParallax<T extends HTMLElement>(ref: RefObject<T | null>, speed = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scroller = findScroller(el);
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const containerRect =
        scroller === window
          ? { top: 0, height: window.innerHeight }
          : (scroller as HTMLElement).getBoundingClientRect();
      const center = rect.top - containerRect.top + rect.height / 2 - containerRect.height / 2;
      ref.current.style.transform = `translate3d(0, ${-center * speed}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    (scroller as Window).addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      (scroller as Window).removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, speed]);
}
```

- [ ] **Step 3: Create `useMagnetic`**

```ts
// components/animations/useMagnetic.ts
"use client";
import { useEffect, type RefObject } from "react";

export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0, 0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, strength]);
}
```

- [ ] **Step 4: Create `useTilt`**

```ts
// components/animations/useTilt.ts
"use client";
import { useEffect, type RefObject } from "react";

export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, max = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };
    const onLeave = () => { el.style.transform = "perspective(900px) rotateX(0) rotateY(0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, max]);
}
```

- [ ] **Step 5: Commit**

```bash
git add components/animations/useReveal.ts components/animations/useParallax.ts components/animations/useMagnetic.ts components/animations/useTilt.ts
git commit -m "feat(redesign): animation hooks (reveal, parallax, magnetic, tilt)"
```

---

### Task A5: Animation components (`MagneticCTA`, `Tilt`, `Parallax`, `Ticker`, `CountUp`, `TextReveal`, `Reveal`)

**Files:**
- Create: `components/animations/MagneticCTA.tsx`
- Create: `components/animations/Tilt.tsx`
- Create: `components/animations/Parallax.tsx`
- Create: `components/animations/Ticker.tsx`
- Create: `components/animations/CountUp.tsx`
- Create: `components/animations/TextReveal.tsx`
- Create: `components/animations/Reveal.tsx`

Source: `docs/design-handoff/strona-wizyt-wka/project/animations.jsx:88-188` and the magnetic CTA CSS in `animations.css:15-32`.

- [ ] **Step 1: `MagneticCTA`**

```tsx
// components/animations/MagneticCTA.tsx
"use client";
import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useMagnetic } from "./useMagnetic";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:shadow-[0_8px_36px_rgb(var(--accent)/0.45)]",
  secondary: "bg-transparent text-current border border-current/40",
  ghost: "bg-white/[0.06] text-current backdrop-blur",
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function MagneticCTA({ variant = "primary", className = "", children, ...rest }: Props) {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  useMagnetic(wrapRef, 0.25);
  useMagnetic(innerRef, 0.4);
  return (
    <a
      ref={wrapRef}
      {...rest}
      className={`inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform ${VARIANT[variant]} ${className}`}
    >
      <span ref={innerRef} className="inline-flex items-center gap-2.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform">
        {children}
      </span>
    </a>
  );
}
```

- [ ] **Step 2: `Tilt`**

```tsx
// components/animations/Tilt.tsx
"use client";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { useTilt } from "./useTilt";

export function Tilt({ children, max = 5, className = "", style }: { children: ReactNode; max?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, max);
  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transition: "transform 0.25s ease", transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: `Parallax`**

```tsx
// components/animations/Parallax.tsx
"use client";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { useParallax } from "./useParallax";

export function Parallax({ children, speed = 0.15, className, style }: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, speed);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}
```

- [ ] **Step 4: `Ticker`**

```tsx
// components/animations/Ticker.tsx
"use client";
import { Children, type ReactNode } from "react";

export function Ticker({ children, speed = 45, gap = 56, className = "" }: { children: ReactNode; speed?: number; gap?: number; className?: string }) {
  const items = Children.toArray(children);
  return (
    <div className={`ticker ${className}`}>
      <div className="ticker-track" style={{ animationDuration: `${speed}s`, gap: `${gap}px` }}>
        {[...items, ...items, ...items].map((c, i) => (
          <div key={i} className="shrink-0">{c}</div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: `CountUp`**

```tsx
// components/animations/CountUp.tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function CountUp({ to, duration = 1600, format = (n: number) => n.toString() }: { to: number; duration?: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{format(val)}</span>;
}
```

- [ ] **Step 6: `TextReveal`**

```tsx
// components/animations/TextReveal.tsx
"use client";
import { useEffect, useRef } from "react";

export function TextReveal({ children, delay = 0, stagger = 30, className = "" }: { children: string; delay?: number; stagger?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const words = String(children).split(" ");
  return (
    <span ref={ref} className={`anim-reveal-text inline ${className}`}>
      {words.map((w, wi) => (
        <span key={wi} className="anim-rt-word inline-flex overflow-hidden">
          {w.split("").map((ch, ci) => (
            <span
              key={ci}
              className="anim-rt-char inline-block translate-y-[110%] transition-transform duration-700 ease-[cubic-bezier(0.2,0.85,0.2,1)] will-change-transform"
              style={{ transitionDelay: `${delay + (wi * 80 + ci * stagger)}ms` }}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span className="anim-rt-space inline-block w-[0.3em]" />}
        </span>
      ))}
    </span>
  );
}
```

Append the matching `.in` rule to `app/globals.css`:

```css
.anim-reveal-text.in .anim-rt-char { transform: translateY(0); }
```

- [ ] **Step 7: `Reveal`**

```tsx
// components/animations/Reveal.tsx
"use client";
import { type ReactNode } from "react";
import { useReveal } from "./useReveal";

export function Reveal({ children, delay, className = "" }: { children: ReactNode; delay?: 1 | 2 | 3; className?: string }) {
  useReveal();
  const d = delay ? `reveal-d${delay}` : "";
  return <div className={`reveal ${d} ${className}`}>{children}</div>;
}
```

- [ ] **Step 8: Append `.anim-reveal-text` rule and ensure `tsc` passes**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add components/animations/MagneticCTA.tsx components/animations/Tilt.tsx components/animations/Parallax.tsx components/animations/Ticker.tsx components/animations/CountUp.tsx components/animations/TextReveal.tsx components/animations/Reveal.tsx app/globals.css
git commit -m "feat(redesign): animation components (MagneticCTA, Tilt, Parallax, Ticker, CountUp, TextReveal, Reveal)"
```

---

### Task A6: Shared section primitives (`SectionHead`, `MonoLabel`, `ItalicAccent`)

**Files:**
- Create: `components/sections/redesign/MonoLabel.tsx`
- Create: `components/sections/redesign/ItalicAccent.tsx`
- Create: `components/sections/redesign/SectionHead.tsx`

These appear on every redesigned section. Source: variant-c-v2.jsx CSS class `.vc-section-label`, `.vc-section-title`, `.vc-section-cta` lines 335-343.

- [ ] **Step 1: `MonoLabel`**

```tsx
// components/sections/redesign/MonoLabel.tsx
import { type ReactNode } from "react";

export function MonoLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: `ItalicAccent`**

```tsx
// components/sections/redesign/ItalicAccent.tsx
import { type ReactNode } from "react";

export function ItalicAccent({ children }: { children: ReactNode }) {
  return <span className="font-display italic font-normal text-accent tracking-[-0.02em]">{children}</span>;
}
```

- [ ] **Step 3: `SectionHead`**

```tsx
// components/sections/redesign/SectionHead.tsx
import { type ReactNode } from "react";
import { MonoLabel } from "./MonoLabel";

interface Props {
  kicker: string;
  /** Use <ItalicAccent>…</ItalicAccent> inline to render the italic display accent. */
  title: ReactNode;
  cta?: { href: string; label: string };
}

export function SectionHead({ kicker, title, cta }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">
      <div>
        <MonoLabel className="mb-3">{kicker}</MonoLabel>
        <h2 className="text-[clamp(48px,6vw,88px)] leading-[0.95] tracking-[-0.04em] font-semibold max-w-[18ch] m-0">{title}</h2>
      </div>
      {cta && (
        <a href={cta.href} className="self-start lg:self-end inline-flex items-center gap-2 rounded-full border border-line text-fg-muted px-4 py-2.5 text-sm hover:text-fg hover:border-fg-muted transition">
          {cta.label}
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/redesign/MonoLabel.tsx components/sections/redesign/ItalicAccent.tsx components/sections/redesign/SectionHead.tsx
git commit -m "feat(redesign): shared section primitives (MonoLabel, ItalicAccent, SectionHead)"
```

---

### Task A7: Translation merge

**Files:**
- Modify: `messages/pl.json`
- Modify: `messages/en.json`

Source: `VC_I18N` table in `docs/design-handoff/strona-wizyt-wka/project/variant-c-v2.jsx:5-188`. The existing files (~2200 lines each) keep their legal / cookies / chat / showcase keys; only the home-page-relevant namespaces change.

- [ ] **Step 1: Read both message files top-to-bottom to map existing key paths.**

```bash
node -e "console.log(Object.keys(require('./messages/pl.json')))"
```

- [ ] **Step 2: In `messages/pl.json` replace the `hero`, `services`, `portfolio`, `testimonials`, `process`, `faq`, `cta` namespaces with the values from `VC_I18N.pl`. Add new namespaces `calculator`, `ticker`, `redesign` (kickers + section titles).**

Concrete shape (Polish):

```jsonc
{
  "nav": {
    "home": "Start", "about": "O mnie", "services": "Usługi",
    "portfolio": "Portfolio", "process": "Proces", "faq": "FAQ",
    "contact": "Kontakt", "cta": "Wycena →", "menu": "Menu", "close": "Zamknij",
    "blog": "Blog", "pricing": "Cennik",
    "settings": "Ustawienia", "language": "Język", "lightMode": "Jasny motyw", "darkMode": "Ciemny motyw"
  },
  "hero": {
    "tag": "Available · 5+ lat doświadczenia",
    "h1a": "Tworzę", "h1b": "strony", "h1c": "które potrafią", "h1d": "zarabiać.",
    "leadStrong": "IT Solutions",
    "leadRest": " — pracownia stron, sklepów i aplikacji. Rozwiązania, z których codziennie korzystają tysiące użytkowników. Stack dopasowany do problemu — nie odwrotnie.",
    "cta": "Wycena →"
  },
  "calculator": {
    "title": "// Kalkulator wyceny", "live": "live",
    "type": "Typ projektu", "pages": "Liczba podstron", "cms": "Edycja przez CMS",
    "out": "Szacunkowo od", "currency": "PLN",
    "scale": "Tysiące codziennych użytkowników na produkcji", "scaleLabel": "+/dzień",
    "types": { "next": "Next", "wp": "WP", "woo": "Woo", "presta": "Presta", "app": "App" }
  },
  "redesign": {
    "sections": {
      "services": { "kicker": "[01] Usługi", "title": ["Pięć stosów. ", "Jeden senior", ". Twój projekt."], "cta": "Wszystkie usługi →" },
      "about":    { "kicker": "[02] O pracowni", "title": ["Pięć lat. ", "Tysiące", " użytkowników. Zero zniknięć."] },
      "portfolio":{ "kicker": "[03] Portfolio", "title": ["Sześć projektów, które ", "poszły", " na produkcję."], "cta": "Wszystkie realizacje →" },
      "testi":    { "kicker": "[04] Opinie", "title": ["Co mówią ", "klienci", "."] },
      "process":  { "kicker": "[05] Proces", "title": ["Od briefu do ", "live", "."] },
      "faq":      { "kicker": "[06] FAQ", "title": ["Pytania, które ", "najczęściej słyszę", "."] }
    }
  },
  "services": {
    "items": [
      { "num": "[01]", "title": "Strony Next.js", "desc": "Aplikacje React z SSR, ISR i edge runtime. Lighthouse 95+, TTI poniżej 2 s. Idealne dla SaaS, marketingu, dashboardów." },
      { "num": "[02]", "title": "WordPress", "desc": "Headless lub klasyczny. Edycja, której zespół faktycznie używa." },
      { "num": "[03]", "title": "WooCommerce", "desc": "Sklepy do 50k SKU, integracje z magazynem, kurierami, Allegro." },
      { "num": "[04]", "title": "Presta\nShop", "desc": "" },
      { "num": "[05]", "title": "Aplikacje webowe", "desc": "Spring Boot + React/Angular. SSO, RBAC, audyt — gotowe na produkcję enterprise." }
    ]
  },
  "about": {
    "bigLabel": "// elastyczność",
    "big": ["Dopasowuję rozwiązanie do ", "Twoich potrzeb", " — nie odwrotnie."],
    "stats": [
      { "label": "// experience", "num": "5+", "foot": "lat doświadczenia komercyjnego, w tym z dużymi firmami" },
      { "label": "// scale", "num": "1k+", "foot": "aktywnych użytkowników korzystających z moich rozwiązań co dzień" },
      { "label": "// stack", "num": "8+", "foot": "technologii frontend, backend, CMS i e-commerce w aktywnym użyciu" },
      { "label": "// rating", "num": "5★", "foot": "średnia ocena klientów. 100% projektów wdrożonych na produkcję" }
    ],
    "quote": { "label": "// klient · 2024", "text": "Czas ładowania spadł 4×, sprzedaż wzrosła o 187% w pierwszym kwartale.", "name": "Anna Kowalska", "role": "CEO, FashionHub" }
  },
  "projects": [
    { "name": "FashionHub", "cat": "E-commerce", "year": "2024", "metric": "+187%", "tone": "dark" },
    { "name": "TechCorp", "cat": "Korporacyjny", "year": "2024", "metric": "LCP 1.2s", "tone": "light" },
    { "name": "MediClinic", "cat": "Aplikacja", "year": "2023", "metric": "12k pacjentów", "tone": "accent" },
    { "name": "HomeDesign", "cat": "WooCommerce", "year": "2023", "metric": "2400 SKU", "tone": "light" },
    { "name": "EduPlatform", "cat": "EdTech", "year": "2023", "metric": "8k studentów", "tone": "dark" },
    { "name": "FoodDelivery", "cat": "Marketplace", "year": "2022", "metric": "150+ restauracji", "tone": "accent" }
  ],
  "testimonials": [
    { "q": "Strona przekroczyła nasze oczekiwania. Czas ładowania spadł z 4,2 s do 1,1 s, sprzedaż w pierwszym kwartale po wdrożeniu wzrosła o 187%.", "name": "Anna Kowalska", "role": "CEO, FashionHub", "avatar": "AK", "size": "big" },
    { "q": "Migracja z monolitu na headless. LCP z 5 s na 1,2 s — redaktorzy pracują 3× szybciej.", "name": "Piotr Nowak", "role": "Head of Marketing, TechCorp", "avatar": "PN", "size": "med" },
    { "q": "12 000 pacjentów / mc. Zero downtime od 14 miesięcy. Dokumentacja, której naprawdę używamy.", "name": "Dr K. Wiśniewska", "role": "Dyrektor Med., MediClinic", "avatar": "KW", "size": "med" },
    { "q": "Konfigurator 3D mebli + WooCommerce. 2 400 SKU, multi-currency, faktury VAT — wszystko działa z poziomu jednego panelu.", "name": "Michał Zieliński", "role": "Founder, HomeDesign", "avatar": "MZ", "size": "lite" }
  ],
  "process": {
    "label": "// pipeline",
    "h": ["Siedem kroków. ", "Bez niespodzianek", "."],
    "steps": [
      ["Konsultacja", "Bezpłatne 30 min. Brief, cele, KPI."],
      ["Wycena", "Stała cena lub T&M. Harmonogram."],
      ["UX/UI", "Wireframe → Figma hi-fi."],
      ["Development", "Sprinty 2-tyg. Demo co piątek."],
      ["Testy", "E2E, perf, a11y, security."],
      ["Wdrożenie", "CI/CD, SSL, monitoring."],
      ["Wsparcie", "6 mies. w cenie. SLA opcjonalne."]
    ]
  },
  "faq": {
    "side": ["Nie znalazłeś swojego pytania? ", "Napisz do mnie →"],
    "items": [
      ["Ile trwa realizacja projektu?", "Wizytówka: 3–4 tyg. Sklep: 6–10 tyg. Aplikacja: od 12 tyg. Każdy projekt dostaje dokładny harmonogram tygodniowy."],
      ["Ile kosztuje strona internetowa?", "Wizytówka od 5 500 PLN, sklep od 9 500 PLN, aplikacja od 18 000 PLN. Dokładna wycena w 48h od briefu."],
      ["Czy oferujecie hosting?", "Tak — Vercel, AWS, OVH lub własny VPS. Doradzam najlepsze rozwiązanie dla danego stacku i budżetu."],
      ["Czy mogę edytować stronę samodzielnie?", "Każdy projekt ma CMS (WordPress, Sanity, Strapi) lub panel admina. Po wdrożeniu prowadzę szkolenie + dokumentacja."],
      ["Co z SEO?", "Schema.org, meta, OG, sitemap, robots, Lighthouse 95+. Wszystko domyślnie. Plus audyt po wdrożeniu."]
    ]
  },
  "cta": {
    "h": "Porozmawiajmy.",
    "p": "Bezpłatna 30-minutowa konsultacja. Wracam z wyceną w 48h. Bez prezentacji, bez handlowca w pętli.",
    "primary": "Umów konsultację →"
  },
  "footer": {
    "brand": "IT Solutions",
    "tagline": "Pracownia stron, sklepów i aplikacji webowych. Warszawa, działam zdalnie w całej UE.",
    "colServices": "Usługi", "colStudio": "Pracownia", "colContact": "Kontakt",
    "links": {
      "studio": ["O nas", "Portfolio", "Blog", "Cennik"],
      "services": ["Next.js", "WordPress", "E-commerce", "Aplikacje"]
    },
    "copy": "© 2026 IT Solutions. Wszystkie prawa zastrzeżone.",
    "legal": "NIP: 000-000-00-00 · Polityka prywatności"
  }
}
```

- [ ] **Step 3: Mirror the same structure into `messages/en.json` using `VC_I18N.en` (lines 97-187 of the source).**

- [ ] **Step 4: Run `tsc --noEmit` and `npm run dev`; load `/pl` and `/en`; ensure no missing-key errors in the dev console.**

```bash
npx tsc --noEmit && npm run dev
```

- [ ] **Step 5: Commit**

```bash
git add messages/pl.json messages/en.json
git commit -m "feat(redesign): merge Variant C i18n strings into pl/en messages"
```

---

## Phase B — Home page

> Each home-section task takes the design's single inline-`<style>`-blob from `variant-c-v2.jsx` and turns it into a typed React component. Where utilities exist in Tailwind they're used; for asymmetric grids and pseudo-elements an inline `<style>` block scoped via a unique class name is acceptable. Every component **must use the message keys defined in Task A7**.

### Task B1: `Hero` + `QuoteCalculator`

**Files:**
- Create: `components/sections/redesign/Hero.tsx`
- Create: `components/sections/redesign/QuoteCalculator.tsx`

Source design: `variant-c-v2.jsx:747-800` (markup) and `variant-c-v2.jsx:258-312` (styles).

- [ ] **Step 1: Implement `QuoteCalculator` (client component)**

Reads message key `calculator.*`. Uses `computeQuote` from `lib/design/calculator.ts`. Renders the live live-pulse pill, type pills, range slider, CMS toggle, output. Match colours `bg-bg-card`, `border-line`, `text-fg-muted`, `text-accent`. Reproduce the `pulse` keyframe via Tailwind `animate-pulse` already declared in Task A2.

- [ ] **Step 2: Implement `Hero` (client component)**

Renders the bento grid (`6fr 4fr` desktop, single col tablet/mobile). Left: tag pill, italic-accent h1, lead paragraph, `MagneticCTA`. Right: `QuoteCalculator` + accent stat card with `CountUp` (1k+, +/dzień). Background blob driven by `Parallax` ref (speed 0.18) via `useParallax`.

- [ ] **Step 3: Add a Playwright smoke test for hero**

```ts
// tests/redesign/home.spec.ts (new file — initial scaffold)
import { test, expect } from "@playwright/test";

test("home / loads with hero, calculator and lime CTA", async ({ page }) => {
  await page.goto("/pl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tworzę");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("zarabiać");
  await expect(page.getByText(/Kalkulator wyceny/i)).toBeVisible();
  // Calculator default = next + 8 pages + cms = 14 200 PLN
  await expect(page.getByText(/14[\s ]200/)).toBeVisible();
});
```

Run: `npx playwright test tests/redesign/home.spec.ts --project=chromium` — expect FAIL until B1+wiring done. Mark passing once it passes after Task B11 wires the full home page.

- [ ] **Step 4: Commit**

```bash
git add components/sections/redesign/Hero.tsx components/sections/redesign/QuoteCalculator.tsx tests/redesign/home.spec.ts
git commit -m "feat(redesign): home Hero + interactive QuoteCalculator"
```

---

### Task B2: `StackTicker`

**Files:**
- Create: `components/sections/redesign/StackTicker.tsx`

Source: `variant-c-v2.jsx:802-827`, styles `345-351`.

- [ ] **Step 1: Define the pill list**

The data is static — embed it inside the component:

```ts
const PILLS: Array<[string, string, boolean?]> = [
  ["Next.js", "Vercel", true],
  ["React 18", "TypeScript"],
  ["WordPress", "Custom theme"],
  ["WooCommerce", "PayU · Stripe"],
  ["PrestaShop", "1.7 → 8.x"],
  ["Spring Boot", "Java 21"],
  ["PostgreSQL", "MongoDB"],
  ["Tailwind", "Framer Motion"],
  ["Sanity", "Strapi · MDX"],
  ["AWS · Docker", "CI/CD"],
  ["Lighthouse 95+", "Core Web Vitals"],
  ["Schema.org", "SEO-ready"],
];
```

- [ ] **Step 2: Render with `Ticker`** (rounded `bg-bg-card` wrapper, mono label badge top-left, pulsing dot on the `hot` pill, italic accent on the second word).

- [ ] **Step 3: Smoke check** — visit `/pl`, scroll, ensure marquee loops smoothly. Pause on hover (CSS rule from Task A2).

- [ ] **Step 4: Commit**

```bash
git add components/sections/redesign/StackTicker.tsx
git commit -m "feat(redesign): home StackTicker"
```

---

### Task B3: `ServicesBento`

**Files:**
- Create: `components/sections/redesign/ServicesBento.tsx`

Source: `variant-c-v2.jsx:829-848`, styles `353-371`. 6-column grid with cells spanning `[3,3,2,1,3]`. Tablet falls back to 4 cols, mobile to 1.

- [ ] **Step 1: Read message array `services.items` (5 entries from Task A7)**

- [ ] **Step 2: Render five cards using grid utilities**

Use a `<style jsx global>` or scoped class for the asymmetric layout:

```tsx
<style>{`
  .svc-bento { display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: 220px; gap: 16px; }
  .svc-bento > :nth-child(1) { grid-column: span 3; grid-row: span 2; }
  .svc-bento > :nth-child(2) { grid-column: span 3; }
  .svc-bento > :nth-child(3) { grid-column: span 2; }
  .svc-bento > :nth-child(4) { grid-column: span 1; }
  .svc-bento > :nth-child(5) { grid-column: span 3; }
  @media (max-width: 1024px) { .svc-bento { grid-template-columns: repeat(4,1fr); grid-auto-rows: 200px; }
    .svc-bento > :nth-child(1) { grid-column: span 4; grid-row: span 2; }
    .svc-bento > :nth-child(2), .svc-bento > :nth-child(5) { grid-column: span 4; }
    .svc-bento > :nth-child(3), .svc-bento > :nth-child(4) { grid-column: span 2; }
  }
  @media (max-width: 640px) { .svc-bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
    .svc-bento > * { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 200px; }
  }
`}</style>
```

Each card: card 1 = `bg-bg-light text-fg-on-light` with the largest title; card 2 = `bg-accent text-accent-fg`; cards 3,4 = `bg-bg-card`; card 5 = `bg-bg-card border border-accent`. Always include the `[0X]` mono number, `whitespace-pre-line` title, optional desc, and a circular arrow chip bottom-right that morphs to accent on hover.

- [ ] **Step 3: Commit**

```bash
git add components/sections/redesign/ServicesBento.tsx
git commit -m "feat(redesign): home ServicesBento (5-cell asymmetric grid)"
```

---

### Task B4: `AboutBento`

**Files:**
- Create: `components/sections/redesign/AboutBento.tsx`

Source: `variant-c-v2.jsx:850-893`, styles `373-387`. 4-column grid with 6 cells.

- [ ] **Step 1: Render layout**

Grid: `repeat(4, 1fr)`, `auto-rows: 260px`.
- Cell 1 (`vc-ab-big`, `span 2 / span 2`): big lime card with `bigLabel` mono + display title that includes italic accent (`<ItalicAccent>`).
- Cells 2 + 3 (`vc-ab-stat`): two stat cards (`bg-bg-card`) — large 72px num (lime), label, foot.
- Cell 4 (`vc-ab-quote`, `span 2`): light card with quote, label, author.
- Cell 5 (`vc-ab-stat` accent): lime stat card.
- Cell 6 (`vc-ab-stat`): final dark stat card.

- [ ] **Step 2: Smoke render** at desktop / tablet / mobile.

- [ ] **Step 3: Commit**

```bash
git add components/sections/redesign/AboutBento.tsx
git commit -m "feat(redesign): home AboutBento"
```

---

### Task B5: `PortfolioGrid`

**Files:**
- Create: `components/sections/redesign/PortfolioGrid.tsx`

Source: `variant-c-v2.jsx:895-926`, styles `389-407`. 3-column grid of 6 tilt cards.

- [ ] **Step 1: For each project, wrap in `<Tilt max={4}>` and render `<article>`** with: meta (cat / year), big name (44px → 34px on mobile), `metric` pill, top-right arrow chip, and a subtle radial-gradient overlay (`<div className="vc-proj-bg">`) that scales on `:hover`.

- [ ] **Step 2: Tone classes:** `dark` → `bg-bg-card text-fg`; `light` → `bg-bg-light text-fg-on-light`; `accent` → `bg-accent text-accent-fg`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/redesign/PortfolioGrid.tsx
git commit -m "feat(redesign): home PortfolioGrid (tilt cards)"
```

---

### Task B6: `Testimonials`

**Files:**
- Create: `components/sections/redesign/Testimonials.tsx`

Source: `variant-c-v2.jsx:928-950`, styles `409-425`. 3-col grid; first card spans 2 cols (`big` lime), then two `med`, then one `lite`.

- [ ] **Step 1: Render testimonials from i18n**, big quote uses 36px, med 28px, lite (light bg) 28px. Border-top divider on author block.

- [ ] **Step 2: Commit**

```bash
git add components/sections/redesign/Testimonials.tsx
git commit -m "feat(redesign): home Testimonials bento"
```

---

### Task B7: `Process`

**Files:**
- Create: `components/sections/redesign/Process.tsx`

Source: `variant-c-v2.jsx:952-977`, styles `427-438`. Two-column layout: 380px intro card on the left + 2-col list of 7 steps on the right.

- [ ] **Step 1: Intro card** with `// pipeline` mono label and the title that uses `ItalicAccent` for the second segment.
- [ ] **Step 2: Step list** — each step is a row with the zero-padded number in a circle and title/desc; `:hover` flips to lime.
- [ ] **Step 3: Commit**

```bash
git add components/sections/redesign/Process.tsx
git commit -m "feat(redesign): home Process section"
```

---

### Task B8: `Faq`

**Files:**
- Create: `components/sections/redesign/Faq.tsx`

Source: `variant-c-v2.jsx:979-1005`, styles `440-450`. Two columns: left = side note + link to contact; right = accordion list of 5 items.

- [ ] **Step 1: Track `openFaq` state** (default `0`). Click toggles. Open item flips to `bg-accent text-accent-fg` and rotates `+` to `×`.
- [ ] **Step 2: Animate `max-height` transition** (CSS, no JS height calc).
- [ ] **Step 3: Commit**

```bash
git add components/sections/redesign/Faq.tsx
git commit -m "feat(redesign): home Faq accordion"
```

---

### Task B9: `CtaCard`

**Files:**
- Create: `components/sections/redesign/CtaCard.tsx`

Source: `variant-c-v2.jsx:1007-1017`, styles `452-462`. Lime card with two pseudo-element ovals top-left + bottom-right, big title (`<h2>`), lead paragraph, two CTAs (`MagneticCTA` primary + secondary email link).

- [ ] **Step 1: Implement props** so the CTA can be reused on services/portfolio/contact pages with different copy:

```tsx
interface Props {
  heading: ReactNode; sub: string; primaryHref: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/redesign/CtaCard.tsx
git commit -m "feat(redesign): reusable CtaCard"
```

---

### Task B10: New `Navbar`

**Files:**
- Modify: `components/layout/Navbar.tsx`

Source: `variant-c-v2.jsx:705-728`, styles `222-256`.

- [ ] **Step 1: Replace component body** with sticky top header containing:
  1. `<a>` logo (lime square mark `i` + "IT Solutions"), 18px font, weight 700.
  2. Desktop nav links with hover opacity transition.
  3. Mono lang switcher pill (PL/EN) — restyle existing `LanguageSwitcher` to match.
  4. Lime CTA pill linking to `/contact`.
  5. Hamburger button (mobile only) toggling a full-screen sheet with the same nav + CTA + meta block (email/phone/city).

- [ ] **Step 2: Strip framer-motion dependency from this component** in favour of plain Tailwind transitions (state-driven sheet visibility uses `pointer-events` + `opacity` per design).

- [ ] **Step 3: Update `LanguageSwitcher`** to use mono pill style — already partly done in Task A7, finish here.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navbar.tsx components/layout/LanguageSwitcher.tsx
git commit -m "feat(redesign): redesigned sticky Navbar with mobile sheet"
```

---

### Task B11: New `Footer` + wire home page

**Files:**
- Modify: `components/layout/Footer.tsx`
- Modify: `app/[locale]/page.tsx`

Source: `variant-c-v2.jsx:1019-1045`, styles `464-473`.

- [ ] **Step 1: Replace footer body**

Container `max-w-[1400px] px-9 py-10`, inner `bg-bg-card rounded-[32px] p-14`. Grid `grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-9 border-b border-line`. Brand + tagline column on the left; three lists on the right (Services, Studio, Contact). Mono `<h5>` headings, `text-sm opacity-75` links. Bottom row with copy + legal in mono 11px.

- [ ] **Step 2: Wire homepage**

Replace `app/[locale]/page.tsx` body:

```tsx
import { Hero } from "@/components/sections/redesign/Hero";
import { StackTicker } from "@/components/sections/redesign/StackTicker";
import { ServicesBento } from "@/components/sections/redesign/ServicesBento";
import { AboutBento } from "@/components/sections/redesign/AboutBento";
import { PortfolioGrid } from "@/components/sections/redesign/PortfolioGrid";
import { Testimonials } from "@/components/sections/redesign/Testimonials";
import { Process } from "@/components/sections/redesign/Process";
import { Faq } from "@/components/sections/redesign/Faq";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { useTranslations } from "next-intl";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Hero />
      <StackTicker />
      <ServicesBento />
      <AboutBento />
      <PortfolioGrid />
      <Testimonials />
      <Process />
      <Faq />
      <CtaCard
        heading={/* "Porozmawiajmy." with italic via ItalicAccent if desired */ undefined as never}
        sub=""
        primaryHref="/contact"
        primaryLabel=""
      />
    </>
  );
}
```

(Use the i18n keys defined in A7; the snippet above is structure only — fetch via `useTranslations("cta")` inside `CtaCard` or pass through props.)

- [ ] **Step 3: Run the home Playwright test from Task B1**

```bash
npx playwright test tests/redesign/home.spec.ts --project=chromium
```
Expected: PASS now that the page mounts.

- [ ] **Step 4: Visual check via claude-in-chrome at 1440 / 1024 / 390**

```text
- Open chrome tab → http://localhost:3000/pl
- For width 1440: viewport defaults; assert hero bento 6/4 columns, service grid 6 columns
- Resize to 1024: assert hero collapses to single column + services to 4 cols
- Resize to 390: assert services list to 1 col, navbar collapses to hamburger
```

(If chrome navigation is denied again, skip and rely on Playwright `responsive.spec.ts` from Task E1.)

- [ ] **Step 5: Delete legacy home sections**

```bash
git rm components/sections/Hero.tsx components/sections/Services.tsx components/sections/About.tsx components/sections/Portfolio.tsx components/sections/Testimonials.tsx components/sections/Process.tsx components/sections/Technologies.tsx components/sections/FAQ.tsx components/sections/CTA.tsx components/sections/ShowcasePreview.tsx
```

If any of those are still referenced, fix the imports as part of this task before committing.

- [ ] **Step 6: Verify `useTypewriter` is unused**

```bash
git grep -n "useTypewriter" -- ':!docs' ':!hooks/useTypewriter.ts' || echo "no consumers — safe to delete"
```
If output says safe: `git rm hooks/useTypewriter.ts`.

- [ ] **Step 7: Commit**

```bash
git add components/layout/Footer.tsx app/[locale]/page.tsx
git commit -m "feat(redesign): redesigned Footer + wire new home page; remove legacy sections"
```

---

## Phase C — Subpages

### Task C1: `/services` page

**Files:**
- Create: `components/sections/services/ServicesHero.tsx`
- Create: `components/sections/services/StackTabs.tsx`
- Create: `components/sections/services/StackDetailCard.tsx`
- Modify: `app/[locale]/services/page.tsx`
- Create: `tests/redesign/services.spec.ts`

Source: `docs/design-handoff/strona-wizyt-wka/project/page-services.jsx` (entire file). Stack data table is at lines 11-97; markup at 158-265; styles at 103-156.

- [ ] **Step 1: Embed the stack data**

Add a `lib/design/services-stacks.ts` module (or a const inside `StackTabs`) holding the typed `STACKS` map (next/wp/woo/presta/app) with `label`, `tag`, `kicker`, `title`, `desc`, `stack: string[]`, `use: string[]`, `bullets: [string, string, string][]`, `examples: string[]`, `from`, `time`. Mirror the prototype 1:1.

- [ ] **Step 2: `ServicesHero`** — breadcrumb, big italic title (`Pięć stosów. Jeden senior. Twój projekt.`), 2-column intro paragraphs.

- [ ] **Step 3: `StackTabs`** — sticky nav (top: 70px) with rounded pills; active pill is lime; selecting a pill calls a callback.

- [ ] **Step 4: `StackDetailCard`** — two-column card (1.4fr / 1fr): main column with kicker, big title, desc, "Co dostajesz" bullets list; aside with stack pills, "Kiedy używamy" list, from/time meta, "Zrealizowane" links.

- [ ] **Step 5: Wire `services/page.tsx`** — `'use client'` page with state for active stack, renders ServicesHero → StackTabs → StackDetailCard → CtaCard.

- [ ] **Step 6: Add Playwright test**

```ts
// tests/redesign/services.spec.ts
import { test, expect } from "@playwright/test";

test("/pl/services switches detail card on tab click", async ({ page }) => {
  await page.goto("/pl/services");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Pięć stosów");
  await expect(page.locator('[data-stack-detail]')).toContainText("Strony Next.js");
  await page.getByRole("button", { name: /WordPress/i }).click();
  await expect(page.locator('[data-stack-detail]')).toContainText("WordPress — ale zrobiony jak należy");
});
```

Run: `npx playwright test tests/redesign/services.spec.ts --project=chromium` — expect PASS.

- [ ] **Step 7: Commit**

```bash
git add components/sections/services lib/design/services-stacks.ts app/[locale]/services/page.tsx tests/redesign/services.spec.ts
git commit -m "feat(redesign): /services page with sticky stack tabs"
```

---

### Task C2: `/portfolio` page

**Files:**
- Create: `components/sections/portfolio/PortfolioHero.tsx`
- Create: `components/sections/portfolio/PortfolioFilters.tsx`
- Create: `components/sections/portfolio/PortfolioBento.tsx`
- Create: `components/sections/portfolio/CaseStudy.tsx`
- Modify: `app/[locale]/portfolio/page.tsx`
- Create: `tests/redesign/portfolio.spec.ts`

Source: `docs/design-handoff/strona-wizyt-wka/project/page-portfolio.jsx`. Project list at lines 10-19; filters at 21-27; bento grid at 53-77; case study layout at 79-108; markup 110-272.

- [ ] **Step 1: Move project + tag data into `lib/design/portfolio-data.ts`** (same shape as the prototype). Provide a typed `Project` interface.
- [ ] **Step 2: `PortfolioHero`** — title with italic accent, 4-cell stat grid using `CountUp`.
- [ ] **Step 3: `PortfolioFilters`** — sticky pill row with counts.
- [ ] **Step 4: `PortfolioBento`** — 6-column grid, `auto-rows: 320px`, sizes `big`/`med`/`small` mapped as `span 4/2`, `span 3/1`, `span 3/1`. Each card wrapped in `<Tilt max={3}>`.
- [ ] **Step 5: `CaseStudy`** — FashionHub deep-dive with brief card (4fr) + 2 stat cards stacked (3fr), then content row with quote + 3 deltas, then a lime CTA card.
- [ ] **Step 6: Wire page** — client component, filter state, render hero → filters → bento (filtered) → case study → CtaCard.

- [ ] **Step 7: Playwright test**

```ts
// tests/redesign/portfolio.spec.ts
import { test, expect } from "@playwright/test";

test("/pl/portfolio filters projects", async ({ page }) => {
  await page.goto("/pl/portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Projekty");
  const allCount = await page.locator("article").count();
  await page.getByRole("button", { name: /Next\.js/i }).click();
  const nextCount = await page.locator("article").count();
  expect(nextCount).toBeLessThan(allCount);
  await expect(page.getByText(/FashionHub/i)).toBeVisible();
});
```

- [ ] **Step 8: Commit**

```bash
git add components/sections/portfolio lib/design/portfolio-data.ts app/[locale]/portfolio/page.tsx tests/redesign/portfolio.spec.ts
git commit -m "feat(redesign): /portfolio page with bento + case study"
```

---

### Task C3: `/contact` page

**Files:**
- Create: `components/sections/contact/ContactHero.tsx`
- Create: `components/sections/contact/ContactChannels.tsx`
- Create: `components/sections/contact/BriefForm.tsx`
- Create: `components/sections/contact/ContactAside.tsx`
- Modify: `app/[locale]/contact/page.tsx`
- Create: `tests/redesign/contact.spec.ts`

Source: `docs/design-handoff/strona-wizyt-wka/project/page-contact.jsx`. Form state machine lines 7-35; markup 132-311.

- [ ] **Step 1: `ContactHero`** — breadcrumb, big italic title (`Porozmawiajmy o Twoim projekcie`), 19px sub paragraph.

- [ ] **Step 2: `ContactChannels`** — three cards (email, phone, brief) with mono `[01] · Email` style label, value with optional italic span (`w 12h`, `9:00–17:00`, `3 minuty`).

- [ ] **Step 3: `BriefForm`** — 3-step state machine:

```ts
type Step = 0 | 1 | 2 | 3;
interface FormState { name: string; email: string; company: string; type: string; budget: string; timeline: string; desc: string; }

// Validation:
// step0 -> name && email && email.includes('@')
// step1 -> type && budget
// step2 -> desc.length > 20
```

Step 0: text inputs (name, email, company). Step 1: option pill grid (5 type pills, 4 budget pills, 4 timeline pills). Step 2: textarea + counter. Step 3: success state.

Submit currently navigates locally to step 3 — wire a placeholder `onSubmit={() => setStep(3)}` matching the prototype. Real backend wiring is out of scope for this redesign.

- [ ] **Step 4: `ContactAside`** — sticky aside with two cards: (a) slot picker (8 mock slots), (b) mini calculator using the same `computeQuote` (so any logic change in A3 stays single-source). Sticky `top-[90px]`.

- [ ] **Step 5: Wire page** — client component composing ContactHero → ContactChannels → grid (BriefForm + ContactAside).

- [ ] **Step 6: Playwright test**

```ts
// tests/redesign/contact.spec.ts
import { test, expect } from "@playwright/test";

test("/pl/contact brief form advances 3 steps", async ({ page }) => {
  await page.goto("/pl/contact#brief");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Porozmawiajmy");
  await page.fill("input[placeholder*='Anna']", "Tester");
  await page.fill("input[type=email]", "tester@example.com");
  await page.getByRole("button", { name: /Dalej/ }).click();
  await page.getByRole("button", { name: /Next\.js/i }).first().click();
  await page.getByRole("button", { name: /^do 10k$/ }).click();
  await page.getByRole("button", { name: /Dalej/ }).click();
  await page.fill("textarea", "Krótki opis projektu w sześciu słowach co najmniej.");
  await page.getByRole("button", { name: /Wyślij brief/ }).click();
  await expect(page.getByText(/Brief w drodze/)).toBeVisible();
});
```

- [ ] **Step 7: Commit**

```bash
git add components/sections/contact app/[locale]/contact/page.tsx tests/redesign/contact.spec.ts
git commit -m "feat(redesign): /contact page with 3-step brief + sticky aside"
```

---

## Phase D — Polish (secondary pages, overlays, translations parity)

### Task D1: `/about` page

**Files:** Modify `app/[locale]/about/page.tsx`.

- [ ] **Step 1: Replace gradient hero** with a redesigned hero using `MonoLabel` + display title with `ItalicAccent` using existing `about` namespace strings.

- [ ] **Step 2: Compose** `AboutBento` → `Process` → `Testimonials` → `CtaCard` (reuse Phase B components — no new section files).

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/about/page.tsx
git commit -m "feat(redesign): /about page composes new About + Process + Testimonials"
```

---

### Task D2: `/pricing` page

**Files:** Modify `app/[locale]/pricing/page.tsx`.

- [ ] **Step 1: Restyle pricing card grid**

Each card uses `bg-bg-card border border-line rounded-[24px] p-7`. Featured card uses `bg-accent text-accent-fg`. Price uses `font-display italic`. Bullet check icons swap to small lime arrows.

- [ ] **Step 2: Wrap the page** with the same hero pattern (mono kicker + italic title) and end with `CtaCard`.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/pricing/page.tsx
git commit -m "feat(redesign): /pricing surface restyled to new tokens"
```

---

### Task D3: Legal pages

**Files:** Modify `app/[locale]/cookies-policy/page.tsx`, `app/[locale]/privacy-policy/page.tsx`.

- [ ] **Step 1: Replace `bg-primary/10` with `bg-accent/10`** etc., headings to `font-display`, paragraphs to `text-fg-muted`, card surfaces to `bg-bg-card rounded-[24px]`.

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/cookies-policy/page.tsx app/[locale]/privacy-policy/page.tsx
git commit -m "feat(redesign): legal pages restyled to new tokens"
```

---

### Task D4: Showcase index

**Files:** Modify `app/[locale]/showcase/page.tsx`, `components/showcase/ShowcaseList.tsx`.

- [ ] **Step 1: Wrap `ShowcaseList`** in a redesigned hero (MonoLabel + italic title) explaining the gallery.
- [ ] **Step 2: Replace card surfaces inside `ShowcaseList`** with bento-style `bg-bg-card rounded-[24px] p-7`. Hover lifts -4px and morphs the corner arrow chip — same recipe as `PortfolioGrid`.
- [ ] **Step 3: Commit**

```bash
git add app/[locale]/showcase/page.tsx components/showcase/ShowcaseList.tsx
git commit -m "feat(redesign): showcase index page surface aligned to redesign"
```

> Individual `app/[locale]/showcase/<brand>/*` pages and their per-brand components are intentionally untouched.

---

### Task D5: Cookie banner + settings modal

**Files:** Modify `components/cookies/CookieBanner.tsx`, `components/cookies/CookieSettingsModal.tsx`.

- [ ] **Step 1: Banner** — fixed bottom-left, `bg-bg-card border border-line rounded-[24px] p-7`, mono label "// cookies", short body, two buttons (lime "Akceptuj wszystkie", outline "Ustawienia"). Width 380px desktop / full-width mobile.
- [ ] **Step 2: Modal** — surface `bg-bg-card rounded-[24px] border border-line`, switches to lime when on, mono category labels.
- [ ] **Step 3: Commit**

```bash
git add components/cookies/CookieBanner.tsx components/cookies/CookieSettingsModal.tsx
git commit -m "feat(redesign): cookie banner + settings modal in new tokens"
```

---

### Task D6: Chat widget

**Files:** Modify `components/chat/ChatWidget.tsx`, `ChatWindow.tsx`, `ChatHeader.tsx`, `ChatInput.tsx`, `ChatMessage.tsx`, `LeadForm.tsx`.

- [ ] **Step 1: Launcher button** — fixed bottom-right circle 56×56, `bg-accent text-accent-fg shadow-[0_8px_36px_rgb(var(--accent)/0.45)]`.
- [ ] **Step 2: Window** — `bg-bg-card border border-line rounded-[24px] w-[380px] h-[560px]`, header `bg-accent text-accent-fg`, messages with mono labels, input bordered with `focus:border-accent`.
- [ ] **Step 3: LeadForm** — token swap on inputs, lime submit button.
- [ ] **Step 4: Commit**

```bash
git add components/chat
git commit -m "feat(redesign): chat widget restyled to new tokens"
```

---

### Task D7: Form primitives (`Input`, `Textarea`, `Button` lime variant)

**Files:** Modify `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/button.tsx`.

- [ ] **Step 1: `Input` / `Textarea`** — default classes `bg-bg-card border border-line rounded-[12px] focus:border-accent placeholder:text-fg-muted`.
- [ ] **Step 2: `Button`** — add a `lime` variant via `cva`:

```ts
lime: "bg-accent text-accent-fg rounded-full px-5 py-2.5 text-sm font-semibold hover:shadow-[0_8px_36px_rgb(var(--accent)/0.45)]"
```

Keep existing variants for now; mark them deprecated in a code comment if they end up unused after Phase D wraps.

- [ ] **Step 3: Update `ContactForm.tsx` and `QuoteForm.tsx`** consumers if they use `variant="default"` — switch to `variant="lime"`.

- [ ] **Step 4: Commit**

```bash
git add components/ui components/forms
git commit -m "feat(redesign): form primitives + lime button variant"
```

---

## Phase E — Verification

### Task E1: Cross-page responsive Playwright suite

**Files:**
- Modify: `playwright.config.ts`
- Create: `tests/redesign/responsive.spec.ts`

- [ ] **Step 1: Add a tablet project to `playwright.config.ts`**

```ts
projects: [
  { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  { name: "tablet",   use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 768 } } },
  { name: "Samsung Galaxy S8+", use: { ...devices["Galaxy S8"], viewport: { width: 360, height: 740 } } },
],
```

- [ ] **Step 2: Write the responsive smoke test**

```ts
// tests/redesign/responsive.spec.ts
import { test, expect } from "@playwright/test";

const ROUTES = ["/pl", "/pl/services", "/pl/portfolio", "/pl/contact", "/pl/about", "/pl/pricing", "/pl/showcase", "/pl/cookies-policy", "/pl/privacy-policy"];

for (const route of ROUTES) {
  test(`${route} renders without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    expect(errors, errors.join("\n")).toEqual([]);
  });
}
```

- [ ] **Step 3: Run all three projects**

```bash
npx playwright test tests/redesign --reporter=list
```
Expected: every test passes on chromium / tablet / S8.

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts tests/redesign/responsive.spec.ts
git commit -m "test(redesign): cross-page responsive smoke suite + tablet viewport"
```

---

### Task E2: Manual visual pass via `claude-in-chrome`

> If chrome navigation was previously denied, ask the user to allow it once for this verification, or skip and rely on the Playwright suite.

- [ ] **Step 1: Start dev server** (`npm run dev`).
- [ ] **Step 2: Open `http://localhost:3000/pl`** in `claude-in-chrome`. Resize the window to 1440×900, then 1024×800, then 390×844. For each viewport: scroll the entire page, screenshot the hero, services, portfolio, FAQ, footer.
- [ ] **Step 3: Repeat for `/pl/services`, `/pl/portfolio`, `/pl/contact`.**
- [ ] **Step 4: Switch language to EN** via the navbar pill, verify all section copy switches correctly.
- [ ] **Step 5: Toggle the theme** (dark ↔ light) — accept it as a "good enough" parity check, even though the design is dark-first; light mode is acceptable so long as it doesn't break contrast.
- [ ] **Step 6: File any visual regressions back as new tasks** — do not block on minor pixel-level mismatches; the goal is "the design is recognisably implemented at all three breakpoints".

---

### Task E3: Final cleanup pass

- [ ] **Step 1: Lint and type-check**

```bash
npm run lint && npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 2: Run the full Playwright suite once**

```bash
npx playwright test
```
Expected: all green.

- [ ] **Step 3: Verify there are no leftover legacy imports**

```bash
git grep -nE "components/sections/(Hero|Services|About|Portfolio|Testimonials|Process|Technologies|FAQ|CTA|ShowcasePreview)" -- ':!docs' || echo "clean"
```
Expected: `clean`.

- [ ] **Step 4: Commit any cleanup** and open a PR.

```bash
git add -A
git commit -m "chore(redesign): cleanup leftover imports + lint pass" || true
```

---

## Self-Review

**Spec coverage:** every section of `IT Solutions Redesign.html` (hero+calc, ticker, services, about, portfolio, testimonials, process, faq, cta, footer) has a corresponding home-page task in Phase B; the three sub-page prototypes (services, portfolio, contact) each have a task in Phase C; the user's "all pages of main app" requirement is covered by Phase D (about, pricing, legal, showcase index, overlays); responsive verification at desktop / tablet / mobile is Phase E.

**Placeholder scan:** no "TBD" / "implement later" / "see Task N" appears as the actual instruction. Where a task references the design source, the source file path + line range is given so the implementer reads the authoritative version. Code blocks are inlined for every primitive (animations, calculator, hooks, primitives) and for the data tables that change (`SERVICES`, `STACKS`, `PROJECTS`); for repetitive layout CSS the task says "port from `<file>:<lines>`" because re-typing 400 lines of cosmetic CSS adds noise.

**Type consistency:** `ProjectType` (`next/wp/woo/presta/app`), `Project` (used in both home `PortfolioGrid` and `/portfolio`), `FormState` (contact brief), `Variant` (`MagneticCTA`), and the `CountUp` `format` signature `(n: number) => string` are used consistently. `useReveal/useParallax/useMagnetic/useTilt` all return `void` and accept a `RefObject<T | null>` parameter to satisfy React 19 typings. The `computeQuote` function is the single source of truth for both the home calculator (`Hero`) and the contact aside (`ContactAside`).

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-04-29-it-solutions-redesign.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — dispatch a fresh subagent per task (Phase A → E), review between tasks, faster iteration.

**2. Inline Execution** — execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints for review.

**Which approach?**
