# Odłożone (noticed, not touched) — NCT

- **Przed startem produkcji:** konto Resend, `RESEND_API_KEY` i `CONTACT_TO_EMAIL` na Vercelu + testowa wysyłka — tj (bramka STOP; O-01)
- Nadawca maili z domeny szkoły + weryfikacja domeny w Resend — po podpięciu oficjalnej domeny (z NCT-1.01)
- Podpięcie oficjalnej domeny na Vercelu, Google Search Console, zgłoszenie sitemap — tj (bramka STOP)
- Polska wersja treści (tłumaczenia od klienta), włączenie `hreflang` — po 7.10 (O-02)
- Przeniesienie projektu Sanity do klienta i zaproszenie klienta jako właściciela — przy oddaniu (O-03)
- Webhook Sanity → natychmiastowe odświeżenie strony (dziś do 60 s) — jeśli klient zgłosi potrzebę
- CI — świadomie pominięte (security.accepted_risks w project.md)
- `src/sanity/client.ts` — `createClient` rzuca przy pustym `projectId`; dziś nikt go nie importuje, więc build jest bezpieczny. Zabezpieczyć przy pierwszym realnym użyciu (z NCT-3.01 → NCT-3.04/3.05)
- `src/proxy.ts` — `getPreferredLocale()` zdefiniowane, ale nigdy nie wywołane (istniejący warning lintera, sprzed NCT-3.01) → NCT-2.01
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
