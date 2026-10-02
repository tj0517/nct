---
id: NCT-3.05
title: "Podstrony kursów i FAQ czytają treść z Sanity; odbiór CMS"
status: in_progress
difficulty: M
model: sonnet
model_approved: null
effort: medium
branch: feat/sanity-subpages
due: 2026-10-06
depends_on: [NCT-3.04]
blocked_by_questions: []
touches_db: true
touches_prod: false
pr: null
---

## Cel
Ostatni krok przed oddaniem: pięć podstron kursów i FAQ korzysta z tego samego mechanizmu co strona główna.
Po zadaniu cała strona jest edytowalna w Studio, a wygląd i treść są identyczne jak przed CMS.

## Zakres
- [ ] odczyt: stan po NCT-3.04, `src/app/[lang]/{adults,business,children,maths,university,faq}/page.tsx`
- [ ] te same zasady pierwszeństwa i zapasu co w NCT-3.04
- [ ] SEO podstron z pól CMS
- [ ] krótka instrukcja dla klienta (`docs/cms-guide.md`): logowanie, gdzie co edytować, ile czeka zmiana

## Gotowe, gdy
- treść bez zmian — `for p in /en/adults /en/business /en/children /en/maths /en/university /en/faq; do curl -s localhost:3000$p | sed 's/<[^>]*>//g' | tr -s ' \n'; done > after.txt` przed i po zmianie; `diff before.txt after.txt` puste (wklej wynik)
- red proof zapasu jak w NCT-3.04, dla `/en/maths` — wklej
- tj zmienia pole na jednej podstronie → widoczne w ≤ 60 s (tj potwierdza)
- `npx tsc --noEmit`, `npm run lint` bez błędów
- wygląd bez zmian — zrzuty Playwright przed/po (1440 i 390 px) w `.playwright-mcp/`, w raporcie ścieżki i jedno zdanie o różnicach (ma być: brak)

## Poza zakresem
- polskie treści → po 7.10
- przeniesienie projektu Sanity do klienta → deferred

## Bramki STOP
- zapis do datasetu — tylko tj w Studio

## Kontekst
- stan po NCT-3.04, `docs/sanity-content-map.md`

## Notatki z realizacji

- **2026-10-02 (tj)** — `childrenPage` w Sanity miał stare pole `hero.subtitle` i `seo.title`/`seo.description`
  sprzed przebudowy na wspólnym szablonie (NCT-1.03): import (NCT-3.03) używa `createIfNotExists`,
  więc pominął ten dokument, bo już istniał. tj poprawia te trzy pola ręcznie w Studio
  (Hero → Subtitle; SEO → Page title, Meta description) na treść z `en.json`; agent czeka i
  potwierdzi odczytem przed domknięciem zadania.
- **2026-10-02 (tj)** — przekodowanie zdjęcia opinii na `/en/adults` (Dr Joachim Popek) przez CDN
  Sanity zaakceptowane: 120 284 z 4 880 625 pikseli (2,5%), maks. 25/255→62/255 na kanał, wyłącznie
  wewnątrz kółka ze zdjęciem, bez zmiany geometrii. Większe niż w D2a (NCT-3.04: 33 850 px, maks.
  25/255), ale ta sama przyczyna; pozostałe cztery zdjęcia opinii wyszły pikselowo identyczne.
- **2026-10-02 (tj)** — `docs/cms-guide.md` po angielsku.
