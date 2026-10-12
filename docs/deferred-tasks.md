# Odłożone (noticed, not touched) — NCT

- `package.json` — `@formatjs/intl-localematcher`, `negotiator` i `@types/negotiator` były używane wyłącznie przez `getPreferredLocale()` w `src/proxy.ts`, usuniętą w NCT-2.01 (była martwa — nigdy nie wywoływana, patrz istniejący warning lintera sprzed NCT-3.01). Po tym PR-ze żaden plik w repo ich nie importuje (sprawdzone grepem). Do usunięcia z `package.json`, jeśli nic innego ich nie zacznie używać (z NCT-2.01)

- `package.json` `name` to wciąż `"web"` — ślad po katalogu `web/`, który już nie istnieje (CLAUDE.md to naprawił w NCT-1.02, ale `package.json` jest poza zakresem tego zadania). Do zmiany przy następnej okazji edycji `package.json` (z NCT-1.02)

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
- `og:image` dla `/en` (strona główna, metadata tylko w layoucie) dostaje URL z hashem
  cache-bustingowym z konwencji plikowej Next (`/en/opengraph-image?<hash>`), a dla podstron,
  które ustawiają własny `openGraph` (np. `/en/maths`), URL jest bez hasha
  (`/en/opengraph-image`) — Next dokleja wygenerowany obraz z pliku tylko tam, gdzie żaden
  głębszy segment nie nadpisuje całego obiektu `openGraph` (patrz komentarz przy
  `socialMetadata()` w `src/lib/seo-locale.ts`). Oba URL-e wskazują na ten sam poprawny PNG
  1200×630, różnica wyłącznie w cache-bustingu. Do ujednolicenia, jeśli kiedyś przeszkodzi w
  cache'owaniu (z NCT-2.02)
- `og:locale`/`og:locale:alternate` nieustawione — nieistotne dopóki `pl` nie ma własnej treści
  (patrz wpis o hreflang wyżej); dodać razem z uruchomieniem polskiej wersji (z NCT-2.02)
- Tekst podtytułu obrazu OG „English Lessons in Warsaw" (`src/app/[lang]/opengraph-image.tsx`)
  jest zaszyty na stałe, poza `en.json` i poza Sanity — decyzja tj 2026-10-03 (opcja B: zostaje
  tak). Przenieść do pola w CMS, jeśli klient zechce go edytować albo przy starcie polskiej
  wersji (z NCT-2.02)
- Lint: `npm run lint` zwraca 1 błąd i 2 ostrzeżenia — kryterium „0 błędów" w NCT-3.02 **nie zostało spełnione**.
  Przyjęte przez tj 2026-10-01 jako istniejący dług, bo wszystkie trzy pliki są bajtowo identyczne z `origin/main`
  (sprawdzone `git diff --quiet origin/main -- <plik>`), więc żaden problem nie powstał w NCT-3.02:
  - `src/components/GsapProvider.tsx:18` — błąd `react-hooks/set-state-in-effect` (`setState` w ciele efektu).
    **Nie dotykać tego pliku** (decyzja tj 2026-10-01)
  - `src/lib/get-content.ts:49` — ostrzeżenie: `testimonials` przypisane, nigdy nieużyte
  - `src/proxy.ts:9` — ostrzeżenie: `getPreferredLocale` zdefiniowane, nigdy nieużyte (→ NCT-2.01)
  (z NCT-3.02)

- Adres szkoły rozjeżdża się między dwoma miejscami w kodzie: `en.json` `map.heading` mówi
  "Słupecka 4/45", a `src/components/Footer.tsx:77` mówi "Słupecka 4". JSON-LD szkoły (layout)
  użył formy z `map.heading` ("Słupecka 4/45"), bo to wartość z treści CMS/`en.json`, a nie
  zaszyta w komponencie — ale rozjazd sam w sobie nie jest naprawiony. Ujednolicenie telefonu/
  e-maila/adresu do jednego źródła (dziś zaszyte w `Footer.tsx`/`ContactLinks.tsx`, poza
  `en.json` i Sanity) odłożone do decyzji tj — patrz wpis o `Footer.tsx` wyżej (z NCT-2.03)

- Treść do potwierdzenia u Anthony'ego: nagłówek listy `children.help` „We can help your child with:”
  przy punktach zaczynających się od czasownika („Speak confidently…”) czyta się niegramatycznie;
  propozycja: „We can help your child:”. Dziś w `en.json` jest wersja 1:1 z maila (z NCT-1.03)

## Z poprawek Anthony'ego 2026-10-07 (gałąź `fix/anthony-07-10`)

- **Numer telefonu nadal zaszyty** w `src/components/PhoneFloat.tsx` (L13, L22) i w martwym
  `StickyPhoneBar.tsx`. Od tej gałęzi istnieje `dict.site.phone` (Sanity `siteSettings` →
  `en.json`), więc oba powinny go czytać. `PhoneFloat` renderuje się w `[lang]/layout.tsx`, więc
  wymaga przekazania propa — poza zakresem tej partii poprawek.
- **`<button>` wewnątrz `<a>`** — `Button.tsx:44` renderuje prawdziwy `<button>`, a każde CTA to
  `<a href="#contact"><button>…</button></a>` (`Header.tsx:82,152`, `Hero.tsx:113`,
  `CourseHero.tsx:173`, `Pricing.tsx:38`). Nieprawidłowy HTML. **Nie udało się odtworzyć** awarii
  zgłoszonej przez Anthony'ego ("Contact nie prowadzi do formularza na desktopie") ani na tym
  zagnieżdżeniu, ani na starym `/en/#contact` — lokalnie oba warianty dowożą do sekcji. Zostawione
  bez zmian; do rozstrzygnięcia po informacji od Anthony'ego, który przycisk i w jakiej
  przeglądarce.
- **CTA na `/children` przy 390 px** przelewa się o ~1 px (`innerScrollW` 327 vs `labelW` 326,2),
  a pływający przycisk telefonu (`PhoneFloat`) zasłania koniec etykiety. Stan sprzed tej gałęzi —
  `CTA_SCALE.long` w `CourseHero.tsx` było strojone na 320 px. Nietknięte, bo typografia jest
  zatwierdzona; do decyzji tj (wystarczy `4.15vw` → `4.1vw`).
- **Nagłówek `/children` przy 390 px** łamał się na 4 linie (stan sprzed tej gałęzi: mieścił się
  przy 375 px, nie mieścił przy 390). Naprawione przy okazji — pas `wide` w `IMAGE_FIT` nie
  rezerwuje miejsca pod nagłówkiem, bo Alice i tak sięga tylko stopy podtytułu.
- **Przełącznik języka** ma teraz flagi (PL / Union Jack) zamiast „PL"/„EN", ale **nadal nic nie
  robi** — decyzja tj 2026-10-09, bo polska treść nie jest gotowa (O-02). Flaga wygląda na bardziej
  klikalną niż napis, więc po uruchomieniu PL trzeba albo podpiąć przełączanie, albo ukryć kontrolkę.
  Union Jack narysowany bez kontrprzesunięcia (counterchange) przekątnych — niewidoczne przy 22 px.
- **`public/images/alice-door-hero.png` nie ma już importera** — `/children` używa teraz
  `alice-curtain-hero.png` (pełna scena). Stary wycinek zostaje w repo; decyzja o usunięciu: tj.
  Oryginał `Alice door.png` **nie jest** śledzony przez gita — leży w `public/images/` jak
  pozostałe pliki źródłowe od Anthony'ego, więc nie trafia do deployu. Do decyzji tj, czy
  źródła mają być wersjonowane (wtedy raczej poza `public/`).
- **`site.*` nie trafia do `scripts/import-content.mjs`** — nowe pola `siteSettings` (telefon, e-mail,
  adres, NIP, konto, Facebook, Messenger, Instagram) wypełnia jednorazowy
  `scripts/patch-anthony-07-10.mjs`. Jeśli import kiedyś będzie odtwarzany od zera, trzeba je tam dopisać.
- **Weryfikacja lokalna wymaga twardego restartu:** `pkill -f "next start"` **nie** zabija procesu
  potomnego `next-server`, a ten przy `revalidate: 1m` nadpisuje świeżo zbudowane
  `.next/server/app/*.html` renderem ze swojego starego bundla. Objaw: zmiana jest w źródle i w
  logu builda, ale nie w serwowanym HTML. Poprawnie: `lsof -ti :PORT | xargs kill -9` + `rm -rf .next`
  przed `npm run build`.

## Z poprawek Anthony'ego 2026-10-11 (ta sama gałąź)

- **Gdzie hostować pliki MP4 — decyzja otwarta (tj).** Kod gra z obu źródeł: wgranie pliku w
  Studio (`teacher.video` / `homepage.about.video` → URL z CDN Sanity) albo link YouTube/Vimeo.
  Trzeci wariant — `public/videos/` w repo — też działa po poprawce matchera w `src/proxy.ts`.
  Kompromis: Sanity = edytowalne przez klienta, ale limity transferu planu; `public/` = transfer
  Vercela, ale pliki wideo w gicie i w każdym deployu; YouTube unlisted = brak kosztu transferu
  i streaming adaptacyjny, ale branding YouTube. Rozstrzygnąć po zobaczeniu rozmiarów plików.
- **`src/proxy.ts` matcher** wykluczał tylko `images/`, więc **każdy** inny plik z `public/`
  (wideo, fonty, PDF) dostawał 307 na `/en/<ścieżka>` i 404. Dopisane `videos/`; przy kolejnym
  katalogu statycznym trzeba pamiętać o tym samym. Złapane red proofem: `curl /videos/x.mp4`
  → 307 przed poprawką, 200 po.
- **Grafiki Anthony'ego 2026-10-11: przyszły dwie z trzech.** `Sharp rabbit.png` → University
  (`rabbit-herald-hero.png`), `Sharp flamingo.png` → Maths (`alice-hero.png`) — podmienione.
  **Brakuje Business English** (królik w kamizelce z zegarkiem kieszonkowym,
  `rabbit-business-hero.png`), strona nadal na starej grafice.
- **Nowe grafiki użyte w nadesłanym kadrze**, bez przycinania (polecenie Anthony'ego), wykluczone
  tylko białe tło kluczem luminancji (`alpha = 255 - L`, biel ≥ 250 w pełni przezroczysta — papier
  skanu ma 253–255, więc bez tego zostałby widoczny prostokąt na czystej bieli strony). Skutek
  uboczny klucza: białe obszary **wewnątrz** rysunku też są przezroczyste. Na jasnym motywie
  podstron (białe `--main-bg`) wygląda identycznie, ale na ciemnym tle ilustracja byłaby „pusta" —
  tak samo jak pozostałe zasoby w repo.
- **Proporcje się zmieniły**, bo kadr jest Anthony'ego: University 0,753 → 0,684, Maths 0,719 →
  0,685. Na telefonie wiąże limit szerokości, więc postać jest o ~10% wyższa; na desktopie wiąże
  wysokość, więc jest o ~5–9% węższa. Układ bez zmian. Gdyby miała być większa, potrzebny ciaśniejszy
  kadr od Anthony'ego — sami nie przycinamy.
- **Nowa grafika Maths nie ma już jeża** u dołu kadru, którego miała poprzednia wersja
  (`alice-hero.png` sprzed 2026-10-11). To treść pliku Anthony'ego, nie nasze cięcie.
- `alice-door-hero.png` i `rabbit-business-hero.png` — stare wycinki bez importera / do wymiany;
  usunięcie po domknięciu Business, decyzja tj.

- **Po zapisie do Sanity build przez ~60 s widzi starą treść.** `src/sanity/client.ts` tworzy
  klienta z `useCdn: true`, więc zapytania idą na `apicdn.sanity.io` z cache'em 60 s. Objaw:
  patch przeszedł, `api.sanity.io` zwraca nową wartość, a `npm run build` wciąż wkompilowuje
  starą. Przy weryfikacji poczekać, aż `apicdn` zwróci nową wartość, dopiero potem budować.
  Na produkcji nie ma to znaczenia — strony i tak rewalidują się co 60 s.
- **Zdjęcie Katarzyny Bondy wgrane do Sanity 2026-10-12** (`--only photo`): kadr kwadratowy
  660x660, w kółku widać całą głowę. Stary asset 440x567 zostaje w datasecie, więc cofnięcie to
  przepięcie referencji. Pozostałe dwa patche z 07.10 (3. linia hero, `siteSettings`) **nadal
  niepuszczone** — czekają na osobną zgodę tj.

- **`CourseHero` ma teraz trzy pasy postaci** (`IMAGE_FIT`): `default` (rezerwa na całym bloku —
  adults, business), `wide` (Alice z kotarą, ~kwadrat) i `tall` (herold z University, Alice
  z flamingiem). Ile końcowych akapitów trzyma strip wolny ustawia pas, ale **strona może to
  nadpisać** (`illustration.besideParagraphs`) — to zależy od treści, nie od rysunku: University
  ma trzy akapity i rezerwuje dwa, Maths ma dwa i rezerwuje jeden.
  Podłoga `min-h` to `szerokość pasa / proporcja` zaokrąglone w górę — przy zmianie grafiki
  **trzeba ją przeliczyć**, inaczej postać wejdzie w akapit wyżej. Dziś: wide 42vw / 0,99 → 43vw;
  tall 36vw / 0,68 → 53vw. Do rozważenia: liczyć podłogę w locie ze zmiennej CSS zamiast literału.
- **Adults i Business celowo zostają na `default`** — zmierzone przy 390 px: lew ma 258 px tuszu
  przy podtytule 220 px, królik z zegarkiem 301 px przy 308 px. Obie postacie są na tyle wąskie
  i wysokie, że realnie stoją obok całego bloku, więc rezerwa na całości jest tu poprawna.
  Pas `tall` dałby im tylko puste miejsce.
- **Zrzuty hero nie nadają się do diffa pikselowego** — wejście GSAP (`opacity`/`x`) sprawia, że
  dwa zrzuty tego samego builda różnią się bardziej niż przed/po zmianie (zmierzone: 8818 px
  między dwoma zrzutami tego samego builda vs 8481 px przed/po). Regresje w hero sprawdzać
  pomiarem geometrii w DOM, nie diffem obrazów.

## 2026-10-12

- **CTA prowadzą teraz do kalendarza Google** (`https://calendar.app.google/R3duMzzaJQBKy8Lc6`,
  Anthony 2026-10-12) — odwraca decyzję z 20.09 („zapytania przez formularz"). Wszystkie sześć
  przycisków czyta `BOOKING_URL`; link „Contact" w nagłówku dalej prowadzi do `#contact`, więc
  formularz zostaje osiągalny. **Do sprawdzenia przez tj:** czy harmonogram nie wymaga od gościa
  logowania na konto Google — to realna strata konwersji i był to powód pierwotnej decyzji.
- **Sekcje `#contact` nie mają już wejścia z CTA.** Pięć podstron kursowych nadal renderuje pełny
  formularz, do którego nic nie prowadzi poza nagłówkiem i stopką. Zostawione (design zatwierdzony),
  ale warto przy okazji rozstrzygnąć, czy mają zostać.
- **Nowa grafika Business jest o ~24% szersza niż rysunek** (marginesy boczne L101/R137 przy 1014 px
  szerokości, bo kadr mieści laskę). Przy stałym limicie `max-w-[36vw]` figura schodzi na telefonie
  z 140×300 px do **107×210 px** — zmierzone. Na desktopie bez zmian (wiąże wysokość). Użyte
  „w przesłanej postaci" zgodnie z poleceniem Anthony'ego; gdyby miała wrócić do dawnej wielkości,
  najtaniej poprosić go o eksport z ciaśniejszymi marginesami (to jego kadr, nie nasze cięcie) —
  alternatywa to poszerzenie pasa w `IMAGE_FIT`, ale wtedy zwęża się kolumna tekstu.
- **Business zostaje na pasie `default`** mimo że figura (210 px) jest niższa od podtytułu (308 px).
  Pas `tall` nic by tu nie dał: akapity są z założenia krótkie („The pitch." / „The interview."),
  więc puszczenie ich na pełną szerokość niczego nie skraca.

## Porządki w `public/` + filmy (2026-10-12)

- **Układ `public/images/`**: `heroes/` (6 ilustracji), `logos/` (BBC, Cambridge), `teachers/`,
  `testimonials/`, plus `founder.jpg` w korzeniu. Oryginały od Anthony'ego wyjechały z `public/`
  do **`artwork/`** (w `.gitignore`) — nie były serwowane świadomie, tylko leżały luzem.
- **Usunięte (śledzone, bez odwołań — wracają `git checkout`)**: boilerplate Next.js
  (`file/globe/next/vercel/window.svg`), `alice-door-hero.png`, `testimonial-avatar.png`,
  `tenniel-*.jpg` ×5 oraz cztery zdjęcia opinii bez użycia: `aleksandra-oniszczuk`,
  `jan-kisielewski`, `marta-kielczyk`, `przemyslaw-kosinski`. **Do potwierdzenia przez tj** — to
  prawdziwi ludzie od Anthony'ego, mogły być pod przyszłe opinie.
- **Filmy przekodowane na H.264** (`artwork/videos/` trzyma oryginały). Dwa z trzech przyszły jako
  **VP9 w kontenerze .mp4** — Safari tego nie odtwarza, więc na iPhonie byłby czarny prostokąt.
  To znane ograniczenie kodeka, **nie zweryfikowane tu pomiarem** (Chromium gra oba warianty).
  Anthony: 33,6 → 12,0 MB (crf 30, PSNR 36 dB, wizualnie nieodróżnialne w 1:1; wyświetla się
  i tak przy 430 px szerokości). Razem 15,2 MB. Wszystkie `+faststart`.
- **Filmy hostowane w Sanity** (decyzja tj 2026-10-12) — `scripts/upload-teacher-videos.mjs`,
  pole `teacher.video`, `teachersQuery` robi `coalesce(video.asset->url, videoUrl)`.
  `public/videos/` jest w `.gitignore`: kopie lokalne służą tylko do wgrania, repo zostaje lekkie,
  a Anthony podmienia film w Studio bez naszego udziału.
- **Cache Sanity jest per ciąg zapytania.** Trzeci raz w tym zadaniu build wkompilował starą treść,
  bo sprawdzałem `apicdn` uproszczonym zapytaniem, a aplikacja wysyła inny ciąg — to osobny wpis
  w cache. Weryfikując zmianę w Sanity: wyciągnąć **dokładny** query z `src/sanity/queries.ts`
  i czekać na niego, nie na własny skrót.
- **Film Alana trwa 7,9 s** przy 26 s i 73 s pozostałych — wygląda na ucięty eksport.
  Do potwierdzenia przez Anthony'ego.
