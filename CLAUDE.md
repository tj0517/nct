# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Next.js 16)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

All commands run from the repo root.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5** (strict)
- **Tailwind CSS 4** via PostCSS (no tailwind.config — theme is in `globals.css` `@theme inline {}`)
- **GSAP 3.15** with ScrollTrigger for animations, `@gsap/react` for the `useGSAP` hook
- GSAP agent skills are installed in `.agents/skills/` — reference them for animation patterns
- **Sanity** is the content backend (`src/sanity/`), with the Studio mounted at `/studio`

## Architecture

Brand: "A Nice Cup of Tea" (English lessons — children, adults, business), from `meta.title` in
`src/dictionaries/en.json`.

Routed under `src/app/[lang]/` (`pl` and `en`), with the home page plus course sub-pages
(`adults`, `business`, `children`, `maths`, `university`, `faq`). **Both locales currently serve
English content** — `src/dictionaries/index.ts` maps `pl` to the same `en.json` import as `en`.

**Content:** `src/lib/get-content.ts#getContent()` is the single read path every page/layout
calls. Per field: page-locale Sanity content, then English Sanity content, then
`src/dictionaries/en.json`. Sanity is the target CMS; `en.json` is only the fallback.

**Page composition:** `app/[lang]/page.tsx` assembles section components wrapped in animation
containers. `app/[lang]/layout.tsx` sets up fonts (Fraunces, Inter, Cormorant Garamond),
`ThemeProvider`, `BookingModalProvider`, `GsapProvider`, `Header`, and `PhoneFloat`.

**Color system:** CSS custom properties in `app/globals.css`, switched by `ThemeProvider` via
`data-theme` on `<html>` — not fixed per role. Default ("blue") theme: navy `--main-bg`, white
`--main`. `data-theme="light"` (course pages) flips it: white `--main-bg`, navy `--main`.
`--accent` (crimson `#C8102E`) stays constant across both. Mapped to Tailwind via `@theme
inline` as `text-main`, `bg-accent`, etc. — never hardcode hex values.

**Animation pattern:** Components needing animation are split into a static component (e.g.,
`Teachers.tsx`) and an animated wrapper (e.g., `TeachersAnimated.tsx`). Wrappers use
`"use client"`, register GSAP plugins, and set up ScrollTrigger. Always check
`useReducedMotion()` from `GsapProvider` before animating.

**Button system:** `Button.tsx` has three variants — `filled` (crimson CTA), `outline` (navy
border), `inverse` (white on dark). All have a sweep-fill hover animation.

**Design signatures:** Asymmetric border radius (`rounded-bl-[25px] rounded-tr-[25px]`),
grayscale profile images, drop shadows using `var(--main)`.

## Design is final

The visual design is approved. Do not change layout, spacing, typography, colours, or
animations unless explicitly instructed to.
