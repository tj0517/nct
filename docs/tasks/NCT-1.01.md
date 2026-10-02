---
id: NCT-1.01
title: "Formularz kontaktowy wysyła zapytanie mailem"
status: done
difficulty: M
model: sonnet
model_approved: null
effort: medium
branch: feat/contact-form
due: 2026-10-01
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 7
---

## Cel
Każde CTA „Book now” prowadzi do formularza `#contact`, który dziś niczego nie wysyła — zapytania giną.
Po zadaniu wypełniony formularz dochodzi mailem do szkoły (przez Resend, decyzja tj 2026-09-29),
użytkownik widzi potwierdzenie albo czytelny błąd, a boty nie przechodzą. Minimum backendu.

## Zakres
- [x] odczyt stanu: `ContactForm.tsx` i miejsca użycia (`BookingBanner.tsx`, `CourseContact.tsx`), `booking.ts`
- [x] obsługa wysyłki po stronie serwera (server action lub route handler), walidacja pól (imię, e-mail, wiadomość wymagane; telefon opcjonalny; zgoda wymagana)
- [x] ochrona przed spamem bez zewnętrznej usługi: ukryte pole-pułapka + minimalny czas wypełnienia
- [x] wysyłka przez Resend; klucz tylko w `RESEND_API_KEY` (server-only), adres odbiorcy w `CONTACT_TO_EMAIL`
- [x] stany formularza: wysyłanie, sukces, błąd — w istniejącym stylu (bez zmian wyglądu poza komunikatem)
- [x] `.env.example` z nazwami obu zmiennych

## Gotowe, gdy
- [x] bez `RESEND_API_KEY` w trybie deweloperskim: poprawne zgłoszenie → log serwera „dry-run: would send” z adresatem i tematem (bez klucza) + zrzut komunikatu sukcesu — wklej log
- [x] red proof braku klucza na produkcji: `npm run build && npm run start` bez `RESEND_API_KEY` → formularz pokazuje błąd z telefonem/mailem szkoły jako alternatywą, log serwera zgłasza brak konfiguracji; zapytanie nie „znika” jako fałszywy sukces — wklej odpowiedź i log
- [x] ścieżka z kluczem pokryta kodem wywołującym Resend SDK; realny test wysyłki robi tj przy starcie produkcji (O-01) — **nieprzetestowana do tego czasu**
- [x] red proof walidacji: zgłoszenie z błędnym e-mailem i bez zgody odrzucone **po stronie serwera** (żądanie wysłane z pominięciem UI, np. `curl`) — wklej odpowiedź
- [x] red proof anty-spam: wypełnione pole-pułapka → brak wysyłki (odpowiedź „sukces” dla bota, brak wywołania Resend w logu serwera)
- [x] klucz nie trafia do klienta: `grep -rn RESEND_API_KEY .next/static` puste po `npm run build` (build tylko przy normalnym ciśnieniu pamięci)
- [x] `npm run lint` i `npx tsc --noEmit` bez błędów — wklej końcówkę (baseline zmierzony na czysto: 1 błąd + 1 ostrzeżenie, identyczny po zmianach)
- [x] wygląd bez zmian — zrzuty Playwright przed/po (1440 i 390 px) w `.playwright-mcp/`, w raporcie ścieżki i jedno zdanie o różnicach (ma być: brak)

## Poza zakresem
- nadawca z domeny szkoły / weryfikacja domeny w Resend → po podpięciu oficjalnej domeny (deferred)
- zapis zgłoszeń do bazy, CRM, autoresponder → nie planowane
- modal rezerwacji (`BookingModal*.tsx`) → bez zmian, chyba że korzysta z tego samego formularza

## Bramki STOP
- przed wysyłką na adres inny niż testowy (prawdziwy odbiorca) — pokaż konfigurację i czekaj na tj
- ustawienie `RESEND_API_KEY` / `CONTACT_TO_EMAIL` na Vercelu — robi tj
- nowa zależność (`resend`, ewentualnie `zod`) — uzasadnienie w raporcie

## Kontekst
- `src/components/ContactForm.tsx` — formularz
- `src/lib/booking.ts` — dlaczego CTA prowadzą do `#contact`
- `src/dictionaries/en.json` → `contactForm` — teksty (nowe komunikaty dopisać tu)

## Notatki z realizacji
- 2026-09-29 tj: wysyłka własna przez Resend (nie usługa zewnętrzna).
- 2026-09-29 tj (O-01): kod teraz, klucz API i adres odbiorcy podpinane dopiero przy starcie produkcji. Do tego czasu tryb dry-run lokalnie; na produkcji bez klucza — jawny błąd, nigdy fałszywy sukces.
- 2026-10-02 tj: zatwierdzono dodanie zależności `resend` i `zod` (zamiast samego `resend` z ręczną walidacją).
- 2026-10-02 tj: zatwierdzono uruchomienie `npm run dev` / `npm run build` / `npm run start` przy `kern.memorystatus_vm_pressure_level` = 2 (nie 1/normal), wbrew domyślnej bramce z promptu zadania — jednorazowy override na potrzeby weryfikacji tego zadania.
- 2026-10-02 tj: accepted PR #7 — criteria 1, 2, 4, 5, 6, 7, 8 proven with pasted evidence (round 2: lint/tsc/build/grep tails, curl red proofs incl. over-long message → 400, like-for-like 390 px screenshots identical); criterion 3 (send with a key) unproven until the live test at production launch (O-01), see deferred-tasks.md for the Resend sandbox sender limitation.
