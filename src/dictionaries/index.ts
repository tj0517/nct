import "server-only";

import { plOverrides } from "./pl-overrides";

const dictionaries = {
  // The old pl.json was a word-for-word translation and looked bad, so "pl"
  // is the English dictionary with the Polish copy written so far laid over
  // it, section by section (see pl-overrides.ts).
  pl: () =>
    import("./en.json").then(({ default: en }) => ({
      ...en,
      header: { ...en.header, ...plOverrides.header },
      hero: { ...en.hero, ...plOverrides.hero },
      trustBar: { ...en.trustBar, ...plOverrides.trustBar },
      map: { ...en.map, ...plOverrides.map },
      about: { ...en.about, ...plOverrides.about },
      teachers: { ...en.teachers, ...plOverrides.teachers },
      contactForm: { ...en.contactForm, ...plOverrides.contactForm },
      footer: { ...en.footer, ...plOverrides.footer },
      phoneFloat: { ...en.phoneFloat, ...plOverrides.phoneFloat },
    })),
  // italicLast is a Polish-only layout flag (see pl-overrides.ts).
  en: () =>
    import("./en.json").then(({ default: en }) => ({
      ...en,
      hero: { ...en.hero, italicLast: false },
    })),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["pl", "en"];
export const defaultLocale: Locale = "pl";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
