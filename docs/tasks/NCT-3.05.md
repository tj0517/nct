---
id: NCT-3.05
title: "Podstrony kursów i FAQ czytają treść z Sanity; odbiór CMS"
status: review
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
pr: 6
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
- **2026-10-02 (tj)** — `src/dictionaries/en.json`: dodano `"imageKind": "photo"` pod
  `testimonial` na stronach adults/children/maths/university (business miał je już wcześniej).
  Cztery klucze czysto dodane, żadna istniejąca wartość nie zmieniona. Powód: wspólna funkcja
  mapująca (`mapCoursePage` w `src/lib/get-content.ts`) potrzebuje jednego typu TS dla
  wszystkich pięciu stron kursowych, a bez tego pola `Dictionary["adults"]` i `Dictionary["business"]`
  różniły się kształtem. Nie wpływa na widoczny tekst (pole steruje tylko wyborem
  kadru/kółko vs logo w `CourseTestimonial.tsx`, nieużywane poza `=== "logo"`).
- **2026-10-02 (tj)** — live-edit potwierdzony: (1) zmiana `hero.subtitle` w Studio na
  `mathsPage` widoczna na `/en/maths` w ≤ 60 s; (2) zmiana `footer.visitLabel` widoczna w
  stopce na `/en/maths`. Oba pola przywrócone i ponownie opublikowane. To tylko live-edit
  check, nie odbiór całego zadania — status zostaje `review`, nie `done`.
- **2026-10-02 (tj)** — zgoda jednorazowa (opcja B) na uruchomienie live red proof zapasu dla
  `/en/maths` przy `kern.memorystatus_vm_pressure_level` = 2 (zamiast wymaganego 1), wyłącznie
  dla punktu 1 pierwszej rundy review PR #6. Wykonano: restart dev servera z
  `NEXT_PUBLIC_SANITY_PROJECT_ID=nonexistent000` → `/en/maths` 200, treść widoczna identyczna
  z `before-3.05-maths.txt` (porównanie po `<body>`, bo pod błędnym `projectId` `<title>`
  trafia do streamu HTML *po* pierwszym `self.__next_r=` — ten sam efekt co w pierwszym red
  proofie tego zadania); zrzut `.playwright-mcp/NCT-3.05-fallback-maths-1440.png`;
  przywrócono prawdziwy `projectId`, restart, `/en/maths` 200 z treścią z Sanity (zdjęcie
  opinii znów z `cdn.sanity.io/images/w7vc4ijx/...`); serwer dev zatrzymany po zakończeniu.
  Brak niestabilności przy poziomie 2 — serwer i curl odpowiadały normalnie przez cały czas.
