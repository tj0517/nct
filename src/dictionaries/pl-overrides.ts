// The Polish copy that exists so far. The "pl" dictionary is en.json with
// these sections laid over it, so everything not listed here stays English
// until Anthony writes it in Sanity (Studio -> the "pl" side of each field).
//
// This is only the bottom of the fallback chain (see get-content.ts): Sanity's
// "pl" value wins, then Sanity's "en", then this file. The headline is written
// to Sanity's "pl" fields by scripts/patch-anthony-10-28.mjs, so the live text
// comes from there; the illustration has no Sanity field and comes from here.
//
// Anthony 2026-10-28: the Polish homepage is Alice in her crown with
// "Angielski godny korony" instead of the King and "Speak the King's English".
// Anthony 2026-11-03: the tighter crop of Alice, "korony" (not "godny") is the
// italic word at every size, and on phones Alice is centred on the headline.
//
// 2026-11-09: the interface text that has no Sanity field — form status
// messages, footer small print, the phone button, labels for screen readers —
// and the footer's city, which puts the post code first ("02-309 Warszawa").
export const plOverrides = {
  header: {
    toggleMenu: "Otwórz menu",
  },
  about: {
    closeVideo: "Zamknij wideo",
  },
  teachers: {
    watchIntro: "Obejrzyj wideo",
    closeVideo: "Zamknij wideo",
  },
  contactForm: {
    sendingCta: "Wysyłanie...",
    successMessage: "Dziękujemy! Otrzymaliśmy Twoją wiadomość i odezwiemy się w ciągu 24 godzin.",
    errorMessage:
      "Coś poszło nie tak. Spróbuj ponownie albo skontaktuj się z nami bezpośrednio: +48 453 374 984, anthony@anicecupoftea.pl.",
    phoneLabel: "Telefon",
    emailLabel: "E-mail",
  },
  footer: {
    nipLabel: "NIP",
    bankLabel: "Konto PLN:",
    city: "Warszawa",
  },
  phoneFloat: {
    label: "Zadzwoń lub napisz SMS",
    call: "Zadzwoń",
    sms: "SMS",
  },
  hero: {
    headlineLine1: "Angielski",
    headlineItalic: "godny",
    headlineBold: " korony",
    italicLast: true,
    illustration: {
      src: "/images/heroes/alice-crown-crop-hero.png",
      width: 807,
      height: 1048,
      alt: "Ilustracja: Alicja poprawiająca koronę na głowie",
    },
  },
};
