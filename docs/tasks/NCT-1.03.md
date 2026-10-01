---
id: NCT-1.03
title: "Podstrona Children & Teens na szablonie kursowym"
status: review
difficulty: M
model: opus
model_approved: null
effort: medium
branch: feat/children-page
due: 2026-10-01
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 3
---

## Cel
Children & Teens była ostatnią podstroną na starym układzie (`PageHero`, `aboutBody`, lista egzaminów).
Anthony przysłał 2026-10-01 treść i dwa zdjęcia w tym samym formacie co pozostałe kursy.
Po zadaniu `/children` jest zbudowana na tym samym szablonie co Adults, Maths, University i Business.

## Zakres
- [x] `children` w `en.json` → kształt `{meta, hero, testimonial, help}`, treść Anthony'ego 1:1
- [x] ilustracja: Alice odsłaniająca kotarę (Tenniel) wycięta maską wielokąta → `public/images/alice-door-hero.png`
- [x] zdjęcie opinii: kadr kwadratowy z „Karol and Jan.jpg" → `public/images/testimonials/karol-bialoblocki.jpg`
- [x] `src/app/[lang]/children/page.tsx` przepisana z szablonu Maths
- [x] `/children` dopisane do `LIGHT_THEME_ROUTES`
- [x] `get-content.ts`: `children` z `staticDict`; `buildSubpage()` i `childrenPageQuery` już niepotrzebne
- [x] Sanity: `childrenPage` → `coursePage("childrenPage", ...)`, reguły mapy i `docs/sanity-content-map.md`
- [x] CTA dłuższe niż na pozostałych stronach („Book your child's…") — rozmiar na telefonie dobierany z długości etykiety

## Gotowe, gdy
- `npm run build` przechodzi, `/pl/children` i `/en/children` prerenderowane — **tak**
- `npx tsc --noEmit` bez błędów — **tak**
- `npm run lint` bez nowych problemów (zostają 3 istniejące z `docs/deferred-tasks.md`) — **tak**
- `node scripts/check-content-map.mjs` → 0 missing, 0 stale — **tak** (208 liści)
- zrzuty 320 / 390 / 768 / 1024 / 1440 / 1920 + sekcje po przewinięciu — **tak**
- Adults i Maths bez zmian wizualnych (regresja CTA) — **tak**, zrzuty 320

## Poza zakresem
- treść PL (O-02)
- odczyt `children` z Sanity → NCT-3.05
- usunięcie oryginałów zdjęć z `public/images/` (nieśledzone) — decyzja tj

## Bramki STOP
- brak (bez bazy, bez produkcji)

## Kontekst
- `src/components/CourseHero.tsx`, `CourseTestimonial.tsx`, `CourseHelp.tsx`
- `docs/sanity-content-map.md`

## Notatki z realizacji
- 2026-10-01: nagłówek łamany tak, jak podał Anthony („English for / children / & teens"); kursywa
  na ostatniej linii, jak „applications" na University i „English" na Business.
- 2026-10-01: CTA Anthony'ego ma 43 znaki wobec 35 na pozostałych stronach. Etykieta przycisku jest
  przycinana do jednej linii (animacja wypełnienia w `Button.tsx` wymaga `h-[1.2em]`), więc przy
  `4.8vw` wychodziła poza przycisk na 320–430 px. `CourseHero` wybiera teraz rozmiar z długości
  etykiety (`CTA_SCALE`): ≤38 znaków bez zmian, dłuższe schodzą do `clamp(12.5px,4.15vw,18px)`.
  Zmierzone w przeglądarce: etykieta 269 px w przycisku 280 px przy 320 px szerokości.
- 2026-10-01: `namedItem` (obiekt Sanity) stracił jedynego użytkownika razem ze starym `childrenPage`
  — zapisane w `docs/deferred-tasks.md`, bez usuwania.
- 2026-10-01: **do potwierdzenia u Anthony'ego** — nagłówek listy „We can help your child with:"
  z punktami zaczynającymi się od czasownika („Speak confidently…") czyta się niegramatycznie.
  Treść zostawiona 1:1 wg maila; propozycja: „We can help your child:".
