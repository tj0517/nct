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

All commands run from the `web/` directory.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5** (strict)
- **Tailwind CSS 4** via PostCSS (no tailwind.config — theme is in `globals.css` `@theme inline {}`)
- **GSAP 3.15** with ScrollTrigger for animations, `@gsap/react` for the `useGSAP` hook
- GSAP agent skills are installed in `.agents/skills/` — reference them for animation patterns

## Architecture

Single-page marketing site for NCT English School. All source lives in `src/`.

**Page composition:** `app/page.tsx` assembles section components wrapped in animation containers. `app/layout.tsx` sets up fonts (Fraunces serif + Inter sans), `GsapProvider`, `CustomCursor`, `Header`, and `WhatsAppFloat`.

**Color system:** Four CSS custom properties in `app/globals.css` mapped to Tailwind via `@theme inline`:
- `--main` (#012169 Royal Blue) — structural text, dark section backgrounds
- `--accent` (#C8102E Crimson) — CTAs, accent lines, section labels
- `--main-bg` (#FFFFFF) — page background, text on dark sections
- `--second-bg` (#E8ECF2) — secondary section backgrounds, muted text on dark

Use Tailwind classes `text-main`, `bg-accent`, etc. — never hardcode hex values.

**Animation pattern:** Components needing animation are split into a static component (e.g., `Teachers.tsx`) and an animated wrapper (e.g., `TeachersAnimated.tsx`). Wrappers use `"use client"`, register GSAP plugins, and set up ScrollTrigger. Always check `useReducedMotion()` from `GsapProvider` before animating.

**Button system:** `Button.tsx` has three variants — `filled` (crimson CTA), `outline` (navy border), `inverse` (white on dark). All have a sweep-fill hover animation.

**Design signatures:** Asymmetric border radius (`rounded-bl-[25px] rounded-tr-[25px]`), grayscale profile images, drop shadows using `var(--main)`.
