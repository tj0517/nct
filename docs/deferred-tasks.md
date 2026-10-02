# Odłożone (noticed, not touched) — NCT

- `package.json` — `@formatjs/intl-localematcher`, `negotiator` i `@types/negotiator` były używane wyłącznie przez `getPreferredLocale()` w `src/proxy.ts`, usuniętą w NCT-2.01 (była martwa — nigdy nie wywoływana, patrz istniejący warning lintera sprzed NCT-3.01). Po tym PR-ze żaden plik w repo ich nie importuje (sprawdzone grepem). Do usunięcia z `package.json`, jeśli nic innego ich nie zacznie używać (z NCT-2.01)

- `node scripts/build-content-map.mjs` dziś odmawia zapisu `docs/sanity-content-map.md` (exit 1):
  15 liści `en.json` bez reguły mapowania — `teachers.list[*].image` i cały
  `testimonials.list[*].{quote,author,role,image}` (zdjęcia nauczycieli/opinii i trzy cytaty
  przeniesione do `en.json` w NCT-3.04, decyzja B2, ale nigdy nie dodane do `RULES` w tym
  skrypcie). Dokument w repo jest więc nieaktualny od NCT-3.04 i pozostaje nieaktualny po
  NCT-3.05: nowe pole `*.testimonial.imageKind` na stronach adults/children/maths/university
  (dodane w tym zadaniu, żeby zrównać typ TS ze schematem — patrz Notatki) ma już regułę w
  skrypcie i zmapowałoby się czysto, gdyby 15 starszych liści też miało reguły. Do zrobienia:
  dopisać reguły dla `teachers.list[$1].image` i `testimonials.list[$1].*`, potem
  `node scripts/build-content-map.mjs` (z NCT-3.05)

- **Przed startem produkcji:** konto Resend, `RESEND_API_KEY` i `CONTACT_TO_EMAIL` na Vercelu + testowa wysyłka — tj (bramka STOP; O-01)
- **Przed startem produkcji:** formularz kontaktowy wysyła dziś z adresu sandboxowego Resend `onboarding@resend.dev` (domena szkoły niezweryfikowana, patrz niżej). Wg dokumentacji Resend „You can only send testing emails to your own email address" (https://resend.com/docs/knowledge-base/403-error-resend-dev-domain) — ten adres dostarcza wyłącznie na adres właściciela konta Resend. Realny test wysyłki przy starcie (O-01) wymaga albo `CONTACT_TO_EMAIL` = ten sam adres właściciela konta Resend, albo zweryfikowanej domeny szkoły w Resend (z NCT-1.01)
- Nadawca maili z domeny szkoły + weryfikacja domeny w Resend — po podpięciu oficjalnej domeny (z NCT-1.01)
- Podpięcie oficjalnej domeny na Vercelu, Google Search Console, zgłoszenie sitemap — tj (bramka STOP)
- Polska wersja treści (tłumaczenia od klienta), włączenie `hreflang` — po 7.10 (O-02)
- Przeniesienie projektu Sanity do klienta i zaproszenie klienta jako właściciela — przy oddaniu (O-03)
- Webhook Sanity → natychmiastowe odświeżenie strony (dziś do 60 s) — jeśli klient zgłosi potrzebę
- CI — świadomie pominięte (security.accepted_risks w project.md)
- `siteSettings` pola kontaktowe (`phone`, `email`, `address`, `whatsapp`, `messenger`, `instagram`) — brak źródła w `en.json`/mapie treści, import (NCT-3.03) zostawia je puste. Do uzupełnienia ręcznie w Studio albo przy przekazaniu projektu klientowi (O-03) (z NCT-3.03)
- `scripts/import-content.mjs` importuje `@sanity/client`, który jest dziś tylko zależnością przechodnią (przez `next-sanity`) — nie ma go wprost w `package.json`. Zadeklarować bezpośrednio, jeśli skrypt zostanie na dłużej albo `next-sanity` zostanie podbity (decyzja tj 2026-10-01: nie dodawać w tym PR) (z NCT-3.03)
- ~~`src/sanity/client.ts` — `createClient` rzuca przy pustym `projectId`; dziś nikt go nie importuje, więc build jest bezpieczny. Zabezpieczyć przy pierwszym realnym użyciu (z NCT-3.01 → NCT-3.04/3.05)~~ **zrobione w NCT-3.04**: klient tworzony leniwie przez `getClient()`, przy braku/zepsutym `projectId` zwraca `null`, `sanityFetch` zwraca `null` zamiast rzucać
- `hasVideo` nie istnieje w schemacie `teacher` w Sanity — przycisk „Watch intro" pod kartą nauczyciela zostaje zaszyty w `src/components/Teachers.tsx` (`teacherHasVideo`, pozycyjnie jak wcześniej) i **nie jest edytowalny przez klienta**. Jeśli ma być: dodać pole `hasVideo` (boolean) do `teacher` + link do nagrania (z NCT-3.04)
- Zdjęcia nauczycieli i opinii idą teraz przez CDN Sanity, więc są przekodowane inaczej niż lokalne PNG-i: różnica do 25/255 na kanał wewnątrz samych kółek ze zdjęciami, bez zmiany geometrii (zmierzone, `origin/main` vs `after`: 33 850 px w dwóch pasmach, reszta strony 0 px). Gdyby kiedyś przeszkadzało — `urlFor(...).quality(100)` albo trzymanie zdjęć lokalnie (z NCT-3.04)
- Podstrony kursów i FAQ nadal czytają `getDictionary` (en.json), więc ich stopka i formularz kontaktowy biorą tekst z `en.json`, a strona główna z Sanity. Tekst jest dziś identyczny, więc nic nie widać → domknąć w NCT-3.05 (z NCT-3.04)
- `next.config.ts` → `images.remotePatterns` dopuszcza `cdn.sanity.io/images/**`. Można zawęzić do `/images/<projectId>/<dataset>/**`, ale wtedy konfiguracja zaczyna zależeć od zmiennych środowiskowych — świadomie zostawione szerzej (z NCT-3.04)
- `src/components/GsapProvider.tsx` — `reduced` startuje jako `false` i dopiero efekt ustawia `true`, więc przy `prefers-reduced-motion: reduce` animacje hero/sekcji **i tak odpalają na pierwszej klatce** i dopiero potem są cofane. To ta sama przyczyna co zaakceptowany błąd lintera w tym pliku; pliku nie ruszam (decyzja tj 2026-10-01) (z NCT-3.04)
- `src/dictionaries/pl.json` — rozjechany z `en.json`: 248 liści vs 209, brakuje 66 kluczy EN (m.in. całe `faq.meta`, `*.testimonial`, `*.help`, nowe hero podstron), a ma 105 kluczy nieistniejących już w EN (stara struktura `*.goals`, `*.services`, `footer.links`, `hero.ctaPhone`). PL nie jest dziś renderowane jako pełna wersja — do uporządkowania razem z tłumaczeniami po 7.10 (z NCT-3.02)
- Teksty zaszyte w komponentach, poza `en.json` i poza CMS-em — do przeniesienia przy okazji NCT-3.04/3.05 (z NCT-3.02):
  - `src/components/Testimonials.tsx:6-20` — trzy cytaty opinii (Katarzyna Bonda, Marek Tejchman, Anna Gielewska) + `aria-label` L47; słownik daje tylko `label`/`heading`
  - `src/components/Footer.tsx` — nazwa marki L15, telefon L29, e-mail L42, `Messenger` L58, `Instagram` L66, adres L77/L80, copyright L88
  - `src/components/Header.tsx` — `PL`/`EN` L29/L53, `aria-label` L35, nazwa marki L76, `Toggle menu` L92
  - `src/components/Hero.tsx:89,133` — `alt` ilustracji (zduplikowany)
  - `src/components/TrustBar.tsx:21,45` — `alt` logotypów BBC i Cambridge
  - `src/components/ContactLinks.tsx`, `PhoneFloat.tsx`, `BookingModal.tsx:54`, `TeacherCard.tsx:44`, `SoundCloudEmbed.tsx:60`, `MapSection.tsx:33` — `aria-label`, `title` i etykiety przycisków
- `src/sanity/schemaTypes/objects/namedItem.ts` — stracił jedynego użytkownika, gdy `childrenPage` przeszedł na wspólny `coursePage` (stary układ miał listę `examPrep`). Typ nadal zarejestrowany w `schemaTypes/index.ts`; decyzja o usunięciu: tj (z NCT-1.03)
- Komponenty bez importerów (martwy kod, w całości zaszyte teksty): `src/components/WhyUs.tsx`, `StickyPhoneBar.tsx`, a także bez tekstu `CustomCursor.tsx`, `MagneticButton.tsx` — decyzja o usunięciu: tj (z NCT-3.02)
- Konto zalogowane w Sanity CLI nie ma dostępu do projektu NCT (`projects list` pokazuje tylko `y0kc7fj6 / hydra-arms`; zapytanie do projektu z `.env.local` zwraca `project user not found`). Odczyt datasetu trzeba dziś robić przez Vision w `/studio` na loginie tj — do rozważenia przy przekazaniu projektu (O-03) (z NCT-3.02)
- Lint: `npm run lint` zwraca 1 błąd i 2 ostrzeżenia — kryterium „0 błędów" w NCT-3.02 **nie zostało spełnione**.
  Przyjęte przez tj 2026-10-01 jako istniejący dług, bo wszystkie trzy pliki są bajtowo identyczne z `origin/main`
  (sprawdzone `git diff --quiet origin/main -- <plik>`), więc żaden problem nie powstał w NCT-3.02:
  - `src/components/GsapProvider.tsx:18` — błąd `react-hooks/set-state-in-effect` (`setState` w ciele efektu).
    **Nie dotykać tego pliku** (decyzja tj 2026-10-01)
  - `src/lib/get-content.ts:49` — ostrzeżenie: `testimonials` przypisane, nigdy nieużyte
  - `src/proxy.ts:9` — ostrzeżenie: `getPreferredLocale` zdefiniowane, nigdy nieużyte (→ NCT-2.01)
  (z NCT-3.02)
