import "server-only";
import type { Locale, Dictionary } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { sanityFetch } from "@/sanity/fetch";
import {
  homepageQuery,
  headerQuery,
  footerQuery,
  teachersQuery,
  testimonialsQuery,
  adultsPageQuery,
  businessPageQuery,
  childrenPageQuery,
  mathsPageQuery,
  universityPageQuery,
} from "@/sanity/queries";

/* ── helpers ── */

type L = { pl?: string; en?: string };

function l(field: L | null | undefined, locale: Locale): string {
  return field?.[locale] ?? field?.pl ?? "";
}

function lArr<T extends Record<string, unknown>>(
  arr: (T & Record<string, L | string | unknown>)[] | null | undefined,
  locale: Locale,
  keys: string[]
): Record<string, string>[] {
  if (!arr) return [];
  return arr.map((item) => {
    const out: Record<string, string> = {};
    for (const k of keys) {
      const v = item[k];
      if (v && typeof v === "object" && ("pl" in v || "en" in v)) {
        out[k] = l(v as L, locale);
      } else {
        out[k] = (v as string) ?? "";
      }
    }
    return out;
  });
}

/* ── main ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityDoc = Record<string, any>;

export async function getContent(locale: Locale): Promise<Dictionary> {
  try {
    const [hp, hd, ft, teachers, testimonials, adults, business, children, maths, university] =
      await Promise.all([
        sanityFetch<SanityDoc | null>({ query: homepageQuery, tags: ["homepage"] }),
        sanityFetch<SanityDoc | null>({ query: headerQuery, tags: ["header"] }),
        sanityFetch<SanityDoc | null>({ query: footerQuery, tags: ["footer"] }),
        sanityFetch<SanityDoc[] | null>({ query: teachersQuery, tags: ["teacher"] }),
        sanityFetch<SanityDoc[] | null>({ query: testimonialsQuery, tags: ["testimonial"] }),
        sanityFetch<SanityDoc | null>({ query: adultsPageQuery, tags: ["adultsPage"] }),
        sanityFetch<SanityDoc | null>({ query: businessPageQuery, tags: ["businessPage"] }),
        sanityFetch<SanityDoc | null>({ query: childrenPageQuery, tags: ["childrenPage"] }),
        sanityFetch<SanityDoc | null>({ query: mathsPageQuery, tags: ["mathsPage"] }),
        sanityFetch<SanityDoc | null>({ query: universityPageQuery, tags: ["universityPage"] }),
      ]);

    // If homepage is missing, Sanity hasn't been seeded yet — fall back
    if (!hp) return getDictionary(locale);

    return {
      header: {
        coursesLabel: l(hd?.coursesLabel, locale),
        courseLinks: lArr(hd?.courseLinks, locale, ["label", "href"]) as Dictionary["header"]["courseLinks"],
        navLinks: lArr(hd?.navLinks, locale, ["label", "href"]) as Dictionary["header"]["navLinks"],
        bookNow: l(hd?.bookNow, locale),
      },
      hero: {
        headlineLine1: l(hp.heroHeadlineLine1, locale),
        headlineItalic: l(hp.heroHeadlineItalic, locale),
        headlineBold: l(hp.heroHeadlineBold, locale),
        subtitle: l(hp.heroSubtitle, locale),
        ctaPrimary: l(hp.heroCtaPrimary, locale),
        ctaPrimaryShort: l(hp.heroCtaPrimaryShort, locale) || l(hp.heroCtaPrimary, locale),
        ctaPhone: hp.heroCtaPhone ?? "",
      },
      trustBar: {
        badges: lArr(hp.trustBarBadges, locale, ["heading", "cta", "description"]) as unknown as Dictionary["trustBar"]["badges"],
      },
      about: {
        heading: l(hp.aboutHeading, locale),
        body: l(hp.aboutBody, locale),
        cta: l(hp.aboutCta, locale),
        imageAlt: l(hp.aboutImageAlt, locale),
      },
      whoWeTeach: {
        label: l(hp.whoWeTeachLabel, locale),
        heading: l(hp.whoWeTeachHeading, locale),
        categories: lArr(hp.whoWeTeachCategories, locale, ["name", "href", "description"]) as Dictionary["whoWeTeach"]["categories"],
      },
      teachers: {
        label: l(hp.metaTitle, locale) ? l({ pl: "NATIVE SPEAKERZY", en: "NATIVE SPEAKERS" }, locale) : "",
        heading: l({ pl: "Poznaj naszych nauczycieli", en: "Meet our Teachers" }, locale),
        list: (teachers ?? []).map((t) => ({
          name: t.name ?? "",
          credential: l(t.credential, locale),
          bio: l(t.bio, locale),
        })),
      },
      testimonials: {
        label: l(hp.faqLabel, locale) ? l({ pl: "OPINIE", en: "TESTIMONIALS" }, locale) : "",
        heading: l({ pl: "Co mówią o nas", en: "What they say" }, locale),
      },
      pricing: {
        label: l(hp.pricingLabel, locale),
        heading: l(hp.pricingHeading, locale),
        freeLabel: l(hp.pricingFreeLabel, locale),
        freePrice: l(hp.pricingFreePrice, locale),
        freeDesc: l(hp.pricingFreeDesc, locale),
        freeBody: l(hp.pricingFreeBody, locale),
        freeCta: l(hp.pricingFreeCta, locale),
        price: l(hp.pricingPrice, locale),
        priceDesc: l(hp.pricingPriceDesc, locale),
      },
      booking: {
        label: l(hp.bookingLabel, locale),
        heading: l(hp.bookingHeading, locale),
        body: l(hp.bookingBody, locale),
        locationNote: l(hp.bookingLocationNote, locale),
        namePlaceholder: l(hp.bookingNamePlaceholder, locale),
        emailPlaceholder: l(hp.bookingEmailPlaceholder, locale),
        phonePlaceholder: l(hp.bookingPhonePlaceholder, locale),
        inPerson: l(hp.bookingInPerson, locale),
        online: l(hp.bookingOnline, locale),
        messagePlaceholder: l(hp.bookingMessagePlaceholder, locale),
        submitCta: l(hp.bookingSubmitCta, locale),
        modalHeading: l(hp.bookingModalHeading, locale),
      },
      contactForm: {
        heading: l(hp.bookingHeading, locale),
        namePlaceholder: l(hp.bookingNamePlaceholder, locale),
        emailPlaceholder: l(hp.bookingEmailPlaceholder, locale),
        phonePlaceholder: l(hp.bookingPhonePlaceholder, locale),
        messagePlaceholder: l(hp.bookingMessagePlaceholder, locale),
        consent: l(hp.bookingSubmitCta, locale),
        submitCta: l(hp.bookingSubmitCta, locale),
      },
      map: {
        label: l(hp.mapLabel, locale),
        heading: l(hp.mapHeading, locale),
        description: l(hp.mapDescription, locale),
      },
      faq: {
        label: l(hp.faqLabel, locale),
        heading: l(hp.faqHeading, locale),
        items: lArr(hp.faqItems, locale, ["question", "answer"]) as Dictionary["faq"]["items"],
      },
      footer: {
        tagline: l(ft?.tagline, locale),
        links: lArr(ft?.links, locale, ["label", "href"]) as Dictionary["footer"]["links"],
        phoneLabel: l(ft?.phoneLabel, locale),
        emailLabel: l(ft?.emailLabel, locale),
        socialLabel: l(ft?.socialLabel, locale),
        visitLabel: l(ft?.visitLabel, locale),
        designedIn: l(ft?.designedIn, locale),
      },
      meta: {
        title: l(hp.metaTitle, locale),
        description: l(hp.metaDescription, locale),
      },
      adults: buildSubpage(adults, locale, "adults"),
      business: buildSubpage(business, locale, "business"),
      children: buildSubpage(children, locale, "children"),
      maths: buildSubpage(maths, locale, "maths"),
      university: buildSubpage(university, locale, "university"),
      languageSwitcher: { pl: "PL", en: "EN" },
    } as Dictionary;
  } catch {
    // Fallback to static JSON if Sanity is unreachable
    return getDictionary(locale);
  }
}

function buildSubpage(doc: SanityDoc | null, locale: Locale, type: string): Dictionary[keyof Dictionary] {
  if (!doc) {
    // Will be filled by fallback dict when needed
    return {} as Dictionary[keyof Dictionary];
  }

  const base = {
    meta: {
      title: l(doc.metaTitle, locale),
      description: l(doc.metaDescription, locale),
    },
    hero: {
      label: l(doc.heroLabel, locale),
      title: l(doc.heroTitle, locale),
      titleItalic: l(doc.heroTitleItalic, locale),
      subtitle: l(doc.heroSubtitle, locale),
    },
    aboutBody: l(doc.aboutBody, locale),
    meetTeachers: l(doc.meetTeachers, locale),
    bookConsultation: l(doc.bookConsultation, locale),
  };

  switch (type) {
    case "adults":
      return {
        ...base,
        promiseLabel: l(doc.promiseLabel, locale),
        promiseQuote: l(doc.promiseQuote, locale),
        goalsLabel: l(doc.goalsLabel, locale),
        goalsHeading: l(doc.goalsHeading, locale),
        goals: lArr(doc.goals, locale, ["name", "desc"]) as { name: string; desc: string }[],
      };
    case "business":
      return {
        ...base,
        servicesLabel: l(doc.servicesLabel, locale),
        servicesHeading: l(doc.servicesHeading, locale),
        services: lArr(doc.services, locale, ["name", "desc"]) as { name: string; desc: string }[],
        credentialsLabel: l(doc.credentialsLabel, locale),
        credentialsHeading: l(doc.credentialsHeading, locale),
      };
    case "children":
      return {
        ...base,
        examLabel: l(doc.examLabel, locale),
        examHeading: l(doc.examHeading, locale),
        examPrep: lArr(doc.examPrep, locale, ["name", "desc"]) as { name: string; desc: string }[],
        quote: l(doc.quote, locale),
      };
    case "maths":
      return {
        ...base,
        seePricing: l(doc.seePricing, locale),
        servicesLabel: l(doc.servicesLabel, locale),
        servicesHeading: l(doc.servicesHeading, locale),
        services: lArr(doc.services, locale, ["name", "desc"]) as { name: string; desc: string }[],
        teacherLabel: l(doc.teacherLabel, locale),
        teacherName: l(doc.teacherName, locale),
        teacherBio: l(doc.teacherBio, locale),
        bookAConsultation: l(doc.bookAConsultation, locale),
      };
    case "university":
      return {
        ...base,
        servicesLabel: l(doc.servicesLabel, locale),
        servicesHeading: l(doc.servicesHeading, locale),
        services: lArr(doc.services, locale, ["name", "desc"]) as { name: string; desc: string }[],
        studentsLabel: l(doc.studentsLabel, locale),
        studentsHeading: l(doc.studentsHeading, locale),
      };
    default:
      return base as Dictionary[keyof Dictionary];
  }
}
