---
id: NCT-1.02
title: "Aktualizacja CLAUDE.md do stanu repo"
status: review
difficulty: S
model: sonnet
model_approved: null
effort: low
branch: chore/claude-md
due: 2026-09-30
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 11
---

## Cel
`CLAUDE.md` ładuje się do każdej sesji agenta i dziś wprowadza w błąd: każe uruchamiać komendy z `web/`
(nie ma takiego katalogu), wymienia `WhatsAppFloat` (jest `PhoneFloat`) i nie wspomina o Sanity ani o tym,
że oba języki serwują angielski. Po zadaniu opis zgadza się z repo, a plik zostaje krótki.

## Zakres
- [ ] odczyt: `CLAUDE.md`, `AGENTS.md`, `package.json`, `src/app/[lang]/layout.tsx`, `src/dictionaries/index.ts`
- [ ] poprawić ścieżki i nazwy komponentów; dodać nazwę marki („A Nice Cup of Tea”, z `meta.title`)
- [ ] 2–4 zdania o: treść dziś w `src/dictionaries/en.json` (oba locale), Sanity jako docelowy CMS (`src/sanity/`, `/studio`)
- [ ] zasada: design zatwierdzony — bez zmian wyglądu bez polecenia

## Gotowe, gdy
- `grep -n "web/\|WhatsApp" CLAUDE.md` puste
- każda ścieżka wymieniona w `CLAUDE.md` istnieje — wklej wynik pętli `ls` po ścieżkach
- `wc -c CLAUDE.md` < 8000

## Poza zakresem
- zmiany w kodzie → brak
- `AGENTS.md` (reguły Next.js) → bez zmian

## Bramki STOP
- brak

## Kontekst
- `CLAUDE.md`, `AGENTS.md`

## Notatki z realizacji
