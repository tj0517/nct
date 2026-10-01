---
id: NCT-3.03
title: "Import obecnej treści z en.json do Sanity"
status: done
difficulty: M
model: sonnet
model_approved: null
effort: medium
branch: feat/sanity-import
due: 2026-10-02
depends_on: [NCT-3.02]
blocked_by_questions: []
touches_db: true
touches_prod: true
pr: 4
---

## Cel
Klient ma zacząć od CMS wypełnionego tym, co jest dziś na stronie, a nie od pustych formularzy.
Po zadaniu dataset `production` zawiera całą treść z `en.json` (pola EN) i obrazy nauczycieli/opinii,
a import da się bezpiecznie powtórzyć.

## Zakres
- [ ] odczyt: `docs/sanity-content-map.md`, `en.json`, obrazy w `public/images/` używane w treści
- [ ] skrypt importu (`scripts/`) na mapie z NCT-3.02; stałe `_id` dokumentów → powtórne uruchomienie nie tworzy duplikatów
- [ ] tryb `--dry-run` (wypisuje dokumenty, niczego nie zapisuje) jako domyślny
- [ ] token zapisu tylko w `.env.local` (`SANITY_WRITE_TOKEN`), nigdy w kodzie ani logu
- [ ] upload obrazów jako assetów Sanity

## Gotowe, gdy
- `--dry-run`: lista dokumentów i liczba pól — wklej (przed bramką)
- po zgodzie tj i imporcie: zapytanie GROQ z liczbą dokumentów per typ = oczekiwana — wklej
- red proof idempotencji: drugi import → te same liczby, zero nowych dokumentów — wklej
- losowe 5 pól: wartość w Sanity = wartość w `en.json` — wklej porównanie
- `git grep -n "sk[A-Za-z0-9]\{20,\}"` bez trafień w diffie (brak tokenu w repo)
- po imporcie zrzut Studio pokazuje nazwy dokumentów zamiast „Untitled” (z NCT-3.02)

## Poza zakresem
- odczyt treści przez stronę → NCT-3.04/3.05
- polskie pola → puste

## Bramki STOP
- **przed zapisem do datasetu `production`** — pokaż wynik `--dry-run` i czekaj na tj
- utworzenie tokenu zapisu — tj (w panelu Sanity), agent nie widzi wartości

## Kontekst
- `docs/sanity-content-map.md` — z NCT-3.02
- `src/sanity/client.ts`

## Notatki z realizacji

- 2026-10-01, tj: zakres rozszerzony o 3 cytaty z homepage'owej karuzeli (`src/components/Testimonials.tsx`) — IN scope dla tego zadania (potwierdzone w promptcie zadania).
- 2026-10-01, tj: `siteSettings.siteName` nie ma źródła w mapie treści (209 liści `en.json`) — bez tego pola dokument `siteSettings` wyświetlałby się w Studio jako „Untitled". Decyzja: ustawić na "A Nice Cup of Tea" (nazwa marki występująca w `en.json`: `meta.title`, `about.body`, `contactForm.consent`, zgodna z `initialValue` w schemacie).
- 2026-10-01, tj: decyzja — zaakceptowane z uzupełnieniami. Dodano domyślny tryb `createIfNotExists` (dokumenty istniejące są pomijane, nie nadpisywane), żeby ponowne uruchomienie importu nie mogło nadpisać edycji klienta w Studio; pełne nadpisanie wymaga jawnej flagi `--overwrite`. Zależność `@sanity/client` (dziś tylko przechodnia przez `next-sanity`) odłożona — nie dodawać wprost do `package.json` w tym PR (zapisane w `docs/deferred-tasks.md`).
- 2026-10-01, odbiór: PR #4, zaakceptowane z uzupełnieniami; udowodnione — 17 dokumentów i 10 assetów w production, idempotencja (3 przebiegi), domyślny createIfNotExists chroni edycje klienta; kryteria zakresu zmienione decyzjami tj (3 cytaty z karuzeli w zakresie, tytuły przez GROQ + zrzut Studio po stronie tj).
