import "server-only";

const dictionaries = {
  // Polish copy was a word-for-word translation and looked bad, so the "pl"
  // locale now serves the English dictionary too. The language switch stays
  // visually interactive (see Header.tsx) but both options render English.
  pl: () => import("./en.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["pl", "en"];
export const defaultLocale: Locale = "pl";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
