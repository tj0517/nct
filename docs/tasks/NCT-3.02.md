---
id: NCT-3.02
title: "Schematy Sanity dopasowane do obecnej treści strony"
status: todo
difficulty: L
model: opus
model_approved: null
effort: high
branch: feat/sanity-schemas
due: 2026-10-01
depends_on: [NCT-3.01]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: null
---

## Cel
Schematy powstały przed 11 zmianami strony (nowe podstrony, FAQ, nowy hero) i nie pasują do dzisiejszej
treści. Decyzje tj 2026-09-29: w CMS mają być **wszystkie teksty** strony, a pola PL/EN (PL puste do czasu
polskiej wersji). Po zadaniu każdy tekst z `en.json` ma swoje pole w Sanity, a Studio jest ułożone tak,
żeby klient bez instrukcji znalazł stronę i sekcję.

## Zakres
- [ ] odczyt: pełna struktura `src/dictionaries/en.json` i obecne schematy `src/sanity/schemaTypes/`
- [ ] mapa klucz `en.json` → typ/pole Sanity (w raporcie jako tabela; plik `docs/sanity-content-map.md`)
- [ ] schematy: strona główna, 5 podstron kursów, FAQ (nowy), nagłówek, stopka, ustawienia (kontakt, SEO domyślne), nauczyciele, opinie
- [ ] pola SEO (tytuł, opis) na każdej stronie
- [ ] pola tekstowe `localizedString`/`localizedText` z EN wymaganym, PL opcjonalnym
- [ ] Studio: struktura po stronach, sekcje w grupach/zakładkach, podglądy nazw

## Gotowe, gdy
- każdy liść `en.json` ma pole w mapie — skrypt porównujący liczbę kluczy `en.json` z mapą: 0 brakujących — wklej
- `npx sanity schema validate` (lub odpowiednik w tej wersji) bez błędów — wklej
- `npx tsc --noEmit` i `npm run lint` bez błędów — wklej końcówkę
- zrzuty Studio: lista dokumentów i jedna podstrona kursu otwarta w edycji
- strona publiczna bez zmian (schematy nie są jeszcze czytane): 7 × `/en…` → 200

## Poza zakresem
- import treści → NCT-3.03
- zmiana stron na odczyt z Sanity → NCT-3.04/3.05
- polskie teksty → po 7.10

## Bramki STOP
- deploy schematów/Studio do hostingu Sanity — tj
- schemat usuwający/zmieniający typ istniejących dokumentów — w tym momencie dataset pusty, więc tylko potwierdź to odczytem

## Kontekst
- `src/dictionaries/en.json` — źródło struktury
- `src/sanity/schemaTypes/` — obecne schematy (do przebudowy)
- `src/lib/get-content.ts` — stare mapowanie (tylko do wglądu)

## Notatki z realizacji
- 2026-09-29 tj: zakres CMS = wszystkie teksty; O-02 → pola PL/EN.
