---
id: NCT-3.01
title: "Sanity: podpięcie projektu i działające /studio"
status: done
difficulty: S
model: sonnet
model_approved: null
effort: medium
branch: feat/sanity-setup
due: 2026-09-30
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 1
---

## Cel
Kod Sanity leży w repo od pierwszego commita, ale nie ma projektu ani zmiennych, więc `/studio` nie
działa. tj zakłada projekt na swoim koncie (O-03, przeniesienie do klienta przy oddaniu). Po zadaniu
`/studio` działa lokalnie, logowanie wpuszcza tylko członków projektu, a nazwy zmiennych są w `.env.example`.

## Zakres
- [ ] odczyt: `src/sanity/env.ts`, `sanity.config.ts`, `src/app/studio/`, `package.json` (wersje sanity/next-sanity)
- [ ] `.env.example`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- [ ] `.gitignore`: wyjątek `!.env.example` (dziś `.env*` ignoruje też przykład)
- [ ] `src/proxy.ts`: `/studio` omija przekierowanie języka (dziś przepisywane na `/pl/studio` → 404); reszta routingu bez zmian
- [ ] czytelny błąd przy braku `NEXT_PUBLIC_SANITY_PROJECT_ID` zamiast cichego `undefined` (`env.ts` ma `!`)
- [ ] `/studio` ładuje się lokalnie z projektem tj; narzędzie Vision tylko w trybie deweloperskim
- [ ] lista kroków dla tj w raporcie: CORS origins (localhost + adres Vercela), zaproszenie klienta później

## Gotowe, gdy
- `test -n "$NEXT_PUBLIC_SANITY_PROJECT_ID"` w `.env.local` (bez wypisywania wartości) i zrzut `/studio` po zalogowaniu
- red proof: bez zmiennej `npm run dev` / wejście na `/studio` daje czytelny komunikat — wklej
- `grep -n SANITY .env.example` — obie nazwy
- strona publiczna bez zmian: pętla `curl` po 7 ścieżkach `/en…` → 200 — wklej

## Poza zakresem
- zmiany schematów → NCT-3.02
- pobieranie treści z Sanity → NCT-3.04/3.05

## Bramki STOP
- założenie projektu Sanity, CORS, tokeny, deploy Studio — robi tj; agent podaje listę kroków i czeka
- zmienne na Vercelu — robi tj

## Kontekst
- `src/sanity/` — konfiguracja
- `src/app/studio/[[...tool]]/` — trasa Studio

## Notatki z realizacji
- 2026-09-29 tj: O-03 → projekt na koncie tj, przeniesienie do klienta przy oddaniu.
- 2026-09-29 tj: brak zmiennej nie może psuć `next build` (Vercel nie ma jeszcze zmiennych) — dowód `npm run build` bez zmiennej.
- 2026-09-29 tj: zrzut `/studio` po zalogowaniu — tj loguje się w oknie Playwright, agent robi zrzut.
- 2026-09-29 tj: effort medium (zamiast low).
- 2026-09-29 tj: odstępstwo tylko dla tego zadania — praca przy `kern.memorystatus_vm_pressure_level` = 2;
  dev server i build uruchamiane pojedynczo (nigdy naraz), pomiar przed każdym uruchomieniem, stop przy 4.
  Błąd builda z powodu pamięci raportować jako taki, nie „naprawiać" kodem.
- 2026-09-29 agent: Studio wymagało `basePath: "/studio"` w `sanity.config.ts` — bez tego router Sanity
  czytał segment `studio` jako nazwę narzędzia i pokazywał „Tool not found: studio" (wykryte po zalogowaniu).
- 2026-09-29 tj: odbiór PR #1 — wszystkie kryteria udowodnione (zrzuty Studio zalogowane/brak zmiennej, build bez zmiennej EXIT=0, 7× /en 200); hex #012169 w komunikacie Studio przyjęty jako wyjątek (layout /studio bez globals.css).
