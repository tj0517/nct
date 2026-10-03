---
id: NCT-2.02
title: "SEO techniczne: sitemap, robots, canonical, Open Graph"
status: review
difficulty: M
model: sonnet
model_approved: null
effort: medium
branch: feat/seo-technical
due: 2026-10-03
depends_on: [NCT-2.01]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 9
---

## Cel
Google i media społecznościowe mają dostać komplet: mapę strony, reguły indeksowania (bez `/studio`),
bazowy adres strony i podglądy linków. Adres bazowy bierzemy z tego, co Vercel daje automatycznie
(`VERCEL_PROJECT_PRODUCTION_URL`), więc zmiana na oficjalną domenę nie wymaga zmian w kodzie.

## Zakres
- [ ] odczyt: `generateMetadata` w layoutcie i podstronach, `src/proxy.ts` (matcher), stan po NCT-2.01
- [ ] `sitemap` (tylko strony indeksowane — wersje angielskie) i `robots` (blokada `/studio`, link do sitemap)
- [ ] `metadataBase` z adresu produkcyjnego Vercela, lokalnie `http://localhost:3000`
- [ ] Open Graph i Twitter: tytuł, opis, obraz (istniejąca grafika z `public/images/` albo prosty generowany obraz w stylu marki — do wyboru w raporcie)
- [ ] `/studio` z `noindex`
- [ ] unikalny tytuł i opis każdej strony (sprawdzić, uzupełnić w `en.json` tylko jeśli brak)

## Gotowe, gdy
- `curl -s localhost:3000/sitemap.xml` zawiera 7 adresów angielskich i żadnego `/pl` ani `/studio` — wklej
- `curl -s localhost:3000/robots.txt` blokuje `/studio` i wskazuje sitemap — wklej
- `og:title`, `og:description`, `og:image` (pełny URL) na `/en` i `/en/maths`: `curl -s … | grep -o '<meta property="og:[^>]*>'` — wklej
- `/studio` ma `noindex` — wklej
- tytuły 7 stron unikalne: pętla `curl | grep -o '<title>[^<]*'` — wklej
- wygląd bez zmian — zrzuty Playwright przed/po (1440 i 390 px) w `.playwright-mcp/`, w raporcie ścieżki i jedno zdanie o różnicach (ma być: brak)

## Poza zakresem
- dane strukturalne (JSON-LD) → NCT-2.03
- pola SEO edytowane w CMS → NCT-3.02/3.04 (tu źródłem jest `en.json`)
- zgłoszenie do Google Search Console → tj po podpięciu domeny (deferred)

## Bramki STOP
- zmiana env lub ustawień Vercela → tj

## Kontekst
- `src/app/[lang]/layout.tsx`, `src/app/[lang]/*/page.tsx` — metadata
- `node_modules/next/dist/docs/` — `sitemap`, `robots`, `metadataBase` w Next 16

## Notatki z realizacji
- 2026-10-02 tj: metadataBase already added in NCT-2.01 (tj 2026-10-02), source: VERCEL_PROJECT_PRODUCTION_URL, fallback http://localhost:3000; skip that scope item here.
- 2026-10-03: OG image = generated brand card (`src/app/[lang]/opengraph-image.tsx`, `next/og`
  `ImageResponse`, 1200×630, navy/crimson from globals.css), not an existing `public/images/*`
  illustration — pre-delegated choice per task file, rationale and rejected alternative in the PR
  report. Extracted `metadataBase`'s URL expression into `src/lib/site-url.ts` (reused by
  `sitemap.ts`/`robots.ts`) — same value, not a behaviour change.
- 2026-10-03 tj: OG tagline made lighter for legibility (option B); text stays hard-coded in opengraph-image.tsx
