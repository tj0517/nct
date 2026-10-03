---
id: NCT-2.03
title: "Dane strukturalne dla Google (szkoła, FAQ)"
status: review
difficulty: S
model: sonnet
model_approved: null
effort: low
branch: feat/seo-jsonld
due: 2026-10-04
depends_on: [NCT-2.02]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 10
---

## Cel
Opis szkoły (nazwa, kontakt, adres, oferta) i FAQ w formacie, który Google czyta wprost — szansa na
bogatsze wyniki wyszukiwania i wyniki lokalne. Dane biorą się z tych samych tekstów co strona.

## Zakres
- [ ] odczyt: dane kontaktowe i adres w `en.json` (`footer`, `map`, `faq`)
- [ ] JSON-LD szkoły (typ organizacji edukacyjnej / lokalnej firmy) w layoutcie
- [ ] JSON-LD FAQ na stronie FAQ z pytań w treści
- [ ] dane tylko z treści strony — żadnych wymyślonych (godzin, ocen, cen spoza cennika)

## Gotowe, gdy
- `curl -s localhost:3000/en | grep -o '<script type="application/ld+json">[^<]*'` zwraca poprawny JSON (`| python3 -m json.tool` bez błędu) — wklej
- to samo dla `/en/faq`; liczba pytań w JSON-LD = liczba pytań na stronie — wklej obie liczby
- każda wartość w JSON-LD występuje w `en.json` — w raporcie tabela pole → klucz w `en.json`

## Poza zakresem
- oceny/opinie jako `Review` w JSON-LD → ryzyko zasad Google, nie robimy
- Google Business Profile → tj/klient

## Bramki STOP
- brak

## Kontekst
- `src/dictionaries/en.json` — `footer`, `map`, `faq`, `pricing`

## Notatki z realizacji
- 2026-10-03, tj: wartości tylko z treści widocznej na stronie; brak offers/cen; kryteria 1-4 doprecyzowane w promptcie zadania (nie w tym pliku).
- 2026-10-03, tj: typ schematu szkoły — oba naraz: `["EducationalOrganization", "LocalBusiness"]`.
