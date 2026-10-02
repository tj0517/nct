---
id: NCT-2.01
title: "Jedna wersja każdej strony dla Google (język, canonical)"
status: review
difficulty: M
model: sonnet
model_approved: null
effort: medium
branch: feat/seo-locales
due: 2026-10-02
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 8
---

## Cel
Dziś `/` i `/pl/*` pokazują angielski tekst oznaczony jako polski (`lang="pl"`), a `/en/*` to ta sama treść
pod drugim adresem — Google widzi duplikaty w złym języku. Decyzja tj 2026-09-29 (O-02): angielski teraz,
polski później. Po zadaniu każda strona ma jeden adres kanoniczny w języku angielskim z `lang="en"`, a
struktura `/pl` zostaje gotowa na przyszłą polską treść.

## Zakres
- [ ] odczyt: `src/proxy.ts`, `src/app/[lang]/layout.tsx`, `src/dictionaries/index.ts`, przełącznik języka w `Header.tsx`
- [ ] strony serwujące angielską treść mają `lang="en"` niezależnie od ścieżki
- [ ] dopóki `pl` nie ma własnej treści: strony `pl` wskazują `canonical` na angielski odpowiednik i mają `noindex`; bez `hreflang` do czasu polskiej wersji
- [ ] przełącznik języka: bez zmian wyglądu; zachowanie opisane w raporcie
- [ ] jedno miejsce w kodzie mówiące „czy locale ma własną treść” (by włączenie PL było jedną zmianą)

## Gotowe, gdy
- `curl -s localhost:3000/ | grep -o '<html lang="[a-z]*"'` → `en`; to samo dla `/en` i jednej podstrony — wklej
- `curl -s localhost:3000/pl/adults | grep -oE '<link rel="canonical"[^>]*>|<meta name="robots"[^>]*>'` → canonical na wersję angielską + `noindex` — wklej
- strony angielskie: canonical na siebie, bez `noindex` — wklej dla `/en` i `/en/business`
- żadna strona nie zwraca 404/500 po zmianie: pętla `curl -o /dev/null -w '%{http_code}'` po wszystkich 14 ścieżkach (7 × pl/en) — wklej
- wygląd bez zmian — zrzuty Playwright przed/po (1440 i 390 px) w `.playwright-mcp/`, w raporcie ścieżki i jedno zdanie o różnicach (ma być: brak)

## Poza zakresem
- sitemap, robots, Open Graph → NCT-2.02
- polskie tłumaczenia → po 7.10 (deferred)

## Bramki STOP
- zmiana domeny / ustawień Vercela → tj

## Kontekst
- `src/proxy.ts` — przepisywanie `/` na `/pl`
- `src/dictionaries/index.ts` — oba locale ładują `en.json`
- `node_modules/next/dist/docs/` — metadata/`alternates` w Next 16

## Notatki z realizacji
- 2026-09-29 tj: O-02 → EN teraz, PL później (pola PL/EN w CMS).
- 2026-10-02 tj: unprefixed addresses (/, /adults, …) redirect temporarily (307) to /en/... while pl has no own content; /pl/... get canonical to /en + noindex; acceptance criteria 1 and 6 changed accordingly (curl -L; 21 paths) and criteria 2 and 7 added.
- 2026-10-02 tj: metadataBase set in NCT-2.01 (Option A) — `https://${VERCEL_PROJECT_PRODUCTION_URL}` with `http://localhost:3000` fallback, no env var or Vercel setting added; NCT-2.02 skips that scope item (see its notes).
