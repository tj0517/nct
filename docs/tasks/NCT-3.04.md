---
id: NCT-3.04
title: "Strona główna, nagłówek i stopka czytają treść z Sanity"
status: review
difficulty: L
model: opus
model_approved: null
effort: high
branch: feat/sanity-home
due: 2026-10-04
depends_on: [NCT-3.03]
blocked_by_questions: []
touches_db: true
touches_prod: false
pr: 5
---

## Cel
Po zadaniu zmiana tekstu strony głównej, nagłówka lub stopki w Studio pojawia się na stronie w ciągu ok.
60 s, bez programisty. Gdy Sanity jest niedostępne albo pole puste, strona pokazuje treść z `en.json`,
więc awaria CMS nie psuje strony. Wygląd bez zmian.

## Zakres
- [ ] odczyt: `src/lib/get-content.ts`, `src/sanity/fetch.ts` (revalidate 60), `src/app/[lang]/page.tsx`, `layout.tsx`
- [ ] warstwa pobierania z mapą na obecny kształt `Dictionary` (komponenty bez zmian)
- [ ] pierwszeństwo: pole w języku strony → EN → `en.json`
- [ ] obrazy z Sanity (nauczyciele, opinie) przez CDN Sanity z wymiarami jak dziś
- [ ] SEO strony głównej z pól CMS

## Gotowe, gdy
- treść bez zmian — `for p in /en; do curl -s localhost:3000$p | sed 's/<[^>]*>//g' | tr -s ' \n'; done > after.txt` przed i po zmianie; `diff before.txt after.txt` puste (wklej wynik)
- red proof zapasu: z `NEXT_PUBLIC_SANITY_PROJECT_ID` ustawionym na nieistniejący projekt strona renderuje się (200) z treścią z `en.json` — wklej
- tj zmienia jedno pole w Studio → widoczne na `localhost:3000/en` w ≤ 60 s (tj potwierdza; agent daje instrukcję)
- `npx tsc --noEmit`, `npm run lint` bez błędów
- wygląd bez zmian — zrzuty Playwright przed/po (1440 i 390 px) w `.playwright-mcp/`, w raporcie ścieżki i jedno zdanie o różnicach (ma być: brak)

## Poza zakresem
- podstrony kursów i FAQ → NCT-3.05
- webhook natychmiastowego odświeżania → deferred (60 s wystarcza)

## Bramki STOP
- jakikolwiek zapis do datasetu (także „na próbę”) — tylko tj w Studio
- zmienne na Vercelu — tj

## Kontekst
- `src/lib/get-content.ts`, `src/sanity/`, `src/app/[lang]/page.tsx`, `src/app/[lang]/layout.tsx`
- `docs/sanity-content-map.md`

## Notatki z realizacji

- **2026-10-01 (tj)** — zgoda jednorazowa na `npm run dev` i przeglądarkę Playwright przy
  `kern.memorystatus_vm_pressure_level` = 2 (zamiast wymaganego 1), tylko dla NCT-3.04.
  Warunki: stop bez ponawiania przy poziomie 4 albo gdy serwer/przeglądarka zostaną ubite;
  baseline przed jakąkolwiek zmianą; jeden serwer i jedna karta naraz, przeglądarka zamykana
  między krokami dowodowymi; każdy zrzut na w pełni wyrenderowanej stronie; poziom 2
  odnotowany w raporcie.
- **2026-10-01 (tj)** — kryterium „pusty `diff before.txt after.txt`" (decyzja A1): komenda
  zostaje bez zmian. Powód: zrzut zawiera losowy token `self.__next_r="…"` generowany przy
  każdym żądaniu (dwa przebiegi na *niezmienionej* stronie już się różnią), więc dosłowny diff
  nigdy nie będzie pusty. W raporcie mają być oba: surowy diff (tylko ten token) i diff po
  wyzerowaniu `self.__next_r="…"` w obu plikach (musi być pusty). Ta sama normalizacja
  obowiązuje w red proofie.
- **2026-10-01 (tj)** — zapas dla opinii i zdjęć (decyzja B2): trzy cytaty opinii
  (`author`, `role`, `quote`) oraz ścieżki zdjęć trafiają do `src/dictionaries/en.json`
  (`testimonials.list`, `image` przy każdym `teachers.list`), żeby `en.json` był jedynym
  źródłem zapasowym; komponenty stają się w pełni sterowane propsami, a wartości z Sanity
  nadpisują pole po polu (język strony → EN → `en.json`). `hasVideo` nie istnieje w schemacie
  Sanity — zostaje w kodzie, przycisk „Watch intro" nie jest edytowalny przez klienta
  (odnotowane w `docs/deferred-tasks.md`). NCT-3.05 dziedziczy zasadę „zapas = `en.json`"
  dla opinii na podstronach kursów.
- **2026-10-01 (tj)** — kryterium „treść bez zmian" (decyzja D1a, zmiana decyzji A1 z tego
  samego dnia): kryterium ocenia się na **widocznym tekście**, czyli wszystkim przed
  `self.__next_r=` w zrzucie — ta część ma być bajtowo identyczna między `before.txt`
  a `after.txt` (zmierzone: 2784 znaki po obu stronach, identyczne). Surowy i znormalizowany
  diff całego zrzutu **nie muszą** być puste, bo ładunek RSC zawiera nazwy plików chunków
  z hashem treści — zmieniają się przy każdej edycji źródeł. Tekst kryteriów w „Gotowe, gdy"
  zostaje bez zmian; obowiązuje ta notatka. Dowody z raportu wystarczają, bez ponownego zrzutu.
- **2026-10-01 (tj)** — wygląd (decyzja D2a): przekodowanie zdjęć nauczycieli i opinii przez
  CDN Sanity jest **zaakceptowane** (33 850 pikseli różnicy, maks. 25/255 na kanał, wyłącznie
  wewnątrz kółek ze zdjęciami, bez zmiany geometrii; reszta strony 0 pikseli). Jako baseline
  dla 1440 px służy `.playwright-mcp/NCT-3.04-before-1440-warmcache.png` (pierwszy zrzut
  `NCT-3.04-before-1440.png` powstał na zimnym cache optymalizatora obrazów Next i różni się
  w obszarze ilustracji hero — nie jest to skutek tej zmiany: render zapasowy jest pikselowo
  identyczny z `origin/main`).
