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
export const plOverrides = {
  hero: {
    headlineLine1: "Angielski",
    headlineItalic: "godny",
    headlineBold: " korony",
    illustration: {
      src: "/images/heroes/alice-crown-hero.png",
      width: 988,
      height: 1527,
      alt: "Ilustracja: Alicja poprawiająca koronę na głowie",
    },
  },
};
