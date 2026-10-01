import "server-only";
import type { Locale, Dictionary } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";
import {
  homepageQuery,
  headerQuery,
  footerQuery,
  siteSettingsQuery,
  formsAndBookingQuery,
  teachersQuery,
  testimonialsQuery,
} from "@/sanity/queries";

/**
 * Reads the homepage, header and footer from Sanity and maps them onto the
 * shape the components already consume (`Dictionary`), so no component needs
 * to know where its text came from.
 *
 * Precedence is per field: the page language, then English, then `en.json`.
 * An absent document, an absent field or an empty string all fall through to
 * `en.json`, and a Sanity outage falls through for everything — a CMS failure
 * can never blank the page.
 *
 * Field placement follows `docs/sanity-content-map.md`.
 */

/* ── localized value helpers ── */

type Localized = { en?: string | null; pl?: string | null };

function isFilled(v: unknown): v is string {
  return typeof v === "string" && v.trim() !== "";
}

/** Localized field -> string, falling back language -> EN -> `en.json`. */
function t(
  field: Localized | null | undefined,
  locale: Locale,
  fallback: string
): string {
  const inLocale = field?.[locale];
  if (isFilled(inLocale)) return inLocale;
  if (isFilled(field?.en)) return field.en;
  return fallback;
}

/** Plain (untranslated) field — hrefs, proper nouns. */
function s(value: unknown, fallback: string): string {
  return isFilled(value) ? value : fallback;
}

/**
 * Maps a Sanity array onto the matching `en.json` array. An absent or empty
 * array falls back wholesale; otherwise each item is mapped, with the
 * same-position `en.json` item as its per-field fallback.
 */
function list<S, F>(
  items: S[] | null | undefined,
  fallbacks: F[],
  map: (item: S, fallback: F | undefined) => F
): F[] {
  if (!items || items.length === 0) return fallbacks;
  return items.map((item, i) => map(item, fallbacks[i]));
}

/* ── Sanity document shapes (only the fields read below) ── */

type Img = SanityImageSource | null | undefined;

type HomepageDoc = {
  hero?: Record<string, Localized>;
  about?: Record<string, Localized>;
  trustBar?: { badges?: { heading?: Localized; cta?: Localized; description?: Localized }[] };
  whoWeTeach?: {
    label?: Localized;
    heading?: Localized;
    categories?: { name?: Localized; href?: string; description?: Localized }[];
  };
  teachersSection?: { label?: Localized; heading?: Localized };
  pricing?: Record<string, Localized>;
  testimonialsSection?: { label?: Localized; heading?: Localized };
  mapSection?: { label?: Localized; heading?: Localized; description?: Localized };
};

type HeaderDoc = {
  coursesLabel?: Localized;
  courseLinks?: { label?: Localized; href?: string }[];
  navLinks?: { label?: Localized; href?: string }[];
  bookNow?: Localized;
  languageSwitcher?: { pl?: string; en?: string };
};

type FooterDoc = Record<string, Localized>;

type FormsDoc = {
  bookingModal?: Record<string, Localized>;
  contactForm?: Record<string, Localized>;
};

type SiteSettingsDoc = {
  defaultSeo?: { title?: Localized; description?: Localized };
};

type TeacherDoc = { name?: string; credential?: Localized; bio?: Localized; image?: Img };
type TestimonialDoc = { author?: string; role?: Localized; quote?: Localized; image?: Img };

type Badge = Dictionary["trustBar"]["badges"][number];

/* The width requested from the Sanity CDN. The rendered box is fixed in CSS
   (`size-28 md:size-32` / `size-20 md:size-24`), so this only controls source
   resolution — roughly 2x the largest rendered size, as before. */
const TEACHER_IMAGE_WIDTH = 256;
const TESTIMONIAL_IMAGE_WIDTH = 192;

/* ── main ── */

export async function getContent(locale: Locale): Promise<Dictionary> {
  const fb = await getDictionary(locale);

  const [home, head, foot, forms, site, teachers, testimonials] = await Promise.all([
    sanityFetch<HomepageDoc>({ query: homepageQuery, tags: ["homepage"] }),
    sanityFetch<HeaderDoc>({ query: headerQuery, tags: ["header"] }),
    sanityFetch<FooterDoc>({ query: footerQuery, tags: ["footer"] }),
    sanityFetch<FormsDoc>({ query: formsAndBookingQuery, tags: ["formsAndBooking"] }),
    sanityFetch<SiteSettingsDoc>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
    sanityFetch<TeacherDoc[]>({ query: teachersQuery, tags: ["teacher"] }),
    sanityFetch<TestimonialDoc[]>({ query: testimonialsQuery, tags: ["testimonial"] }),
  ]);

  const hero = home?.hero;
  const about = home?.about;
  const pricing = home?.pricing;
  const booking = forms?.bookingModal;
  const contact = forms?.contactForm;
  const seo = site?.defaultSeo;

  return {
    ...fb,

    header: {
      coursesLabel: t(head?.coursesLabel, locale, fb.header.coursesLabel),
      courseLinks: list(head?.courseLinks, fb.header.courseLinks, (link, f) => ({
        label: t(link?.label, locale, f?.label ?? ""),
        href: s(link?.href, f?.href ?? ""),
      })),
      navLinks: list(head?.navLinks, fb.header.navLinks, (link, f) => ({
        label: t(link?.label, locale, f?.label ?? ""),
        href: s(link?.href, f?.href ?? ""),
      })),
      bookNow: t(head?.bookNow, locale, fb.header.bookNow),
    },

    hero: {
      headlineLine1: t(hero?.headlineLine1, locale, fb.hero.headlineLine1),
      headlineItalic: t(hero?.headlineItalic, locale, fb.hero.headlineItalic),
      headlineBold: t(hero?.headlineBold, locale, fb.hero.headlineBold),
      subtitle: t(hero?.subtitle, locale, fb.hero.subtitle),
      ctaPrimary: t(hero?.ctaPrimary, locale, fb.hero.ctaPrimary),
      ctaPrimaryShort: t(hero?.ctaPrimaryShort, locale, fb.hero.ctaPrimaryShort),
    },

    // The two badges have different shapes in `en.json` (one has a link, the
    // other a description); each keeps the shape of its fallback.
    trustBar: {
      badges: list(home?.trustBar?.badges, fb.trustBar.badges, (badge, f): Badge => {
        const heading = t(badge?.heading, locale, f?.heading ?? "");
        if (f?.cta !== undefined) return { heading, cta: t(badge?.cta, locale, f.cta) };
        return {
          heading,
          description: t(badge?.description, locale, f?.description ?? ""),
        };
      }),
    },

    about: {
      heading: t(about?.heading, locale, fb.about.heading),
      body: t(about?.body, locale, fb.about.body),
      cta: t(about?.cta, locale, fb.about.cta),
      imageAlt: t(about?.imageAlt, locale, fb.about.imageAlt),
    },

    whoWeTeach: {
      label: t(home?.whoWeTeach?.label, locale, fb.whoWeTeach.label),
      heading: t(home?.whoWeTeach?.heading, locale, fb.whoWeTeach.heading),
      categories: list(
        home?.whoWeTeach?.categories,
        fb.whoWeTeach.categories,
        (category, f) => ({
          name: t(category?.name, locale, f?.name ?? ""),
          href: s(category?.href, f?.href ?? ""),
          description: t(category?.description, locale, f?.description ?? ""),
        })
      ),
    },

    teachers: {
      label: t(home?.teachersSection?.label, locale, fb.teachers.label),
      heading: t(home?.teachersSection?.heading, locale, fb.teachers.heading),
      list: list(teachers, fb.teachers.list, (teacher, f) => ({
        name: s(teacher?.name, f?.name ?? ""),
        credential: t(teacher?.credential, locale, f?.credential ?? ""),
        bio: t(teacher?.bio, locale, f?.bio ?? ""),
        image:
          imageUrl(teacher?.image, TEACHER_IMAGE_WIDTH) ?? f?.image ?? "",
      })),
    },

    testimonials: {
      label: t(home?.testimonialsSection?.label, locale, fb.testimonials.label),
      heading: t(home?.testimonialsSection?.heading, locale, fb.testimonials.heading),
      list: list(testimonials, fb.testimonials.list, (testimonial, f) => ({
        quote: t(testimonial?.quote, locale, f?.quote ?? ""),
        author: s(testimonial?.author, f?.author ?? ""),
        role: t(testimonial?.role, locale, f?.role ?? ""),
        image:
          imageUrl(testimonial?.image, TESTIMONIAL_IMAGE_WIDTH) ?? f?.image ?? "",
      })),
    },

    pricing: {
      label: t(pricing?.label, locale, fb.pricing.label),
      heading: t(pricing?.heading, locale, fb.pricing.heading),
      freePrice: t(pricing?.freePrice, locale, fb.pricing.freePrice),
      freeDesc: t(pricing?.freeDesc, locale, fb.pricing.freeDesc),
      freeCta: t(pricing?.freeCta, locale, fb.pricing.freeCta),
      price: t(pricing?.price, locale, fb.pricing.price),
      priceDesc: t(pricing?.priceDesc, locale, fb.pricing.priceDesc),
    },

    booking: {
      label: t(booking?.label, locale, fb.booking.label),
      heading: t(booking?.heading, locale, fb.booking.heading),
      body: t(booking?.body, locale, fb.booking.body),
      locationNote: t(booking?.locationNote, locale, fb.booking.locationNote),
      namePlaceholder: t(booking?.namePlaceholder, locale, fb.booking.namePlaceholder),
      emailPlaceholder: t(booking?.emailPlaceholder, locale, fb.booking.emailPlaceholder),
      phonePlaceholder: t(booking?.phonePlaceholder, locale, fb.booking.phonePlaceholder),
      inPerson: t(booking?.inPerson, locale, fb.booking.inPerson),
      online: t(booking?.online, locale, fb.booking.online),
      messagePlaceholder: t(booking?.messagePlaceholder, locale, fb.booking.messagePlaceholder),
      submitCta: t(booking?.submitCta, locale, fb.booking.submitCta),
      modalHeading: t(booking?.modalHeading, locale, fb.booking.modalHeading),
    },

    contactForm: {
      heading: t(contact?.heading, locale, fb.contactForm.heading),
      namePlaceholder: t(contact?.namePlaceholder, locale, fb.contactForm.namePlaceholder),
      emailPlaceholder: t(contact?.emailPlaceholder, locale, fb.contactForm.emailPlaceholder),
      phonePlaceholder: t(contact?.phonePlaceholder, locale, fb.contactForm.phonePlaceholder),
      messagePlaceholder: t(contact?.messagePlaceholder, locale, fb.contactForm.messagePlaceholder),
      consent: t(contact?.consent, locale, fb.contactForm.consent),
      submitCta: t(contact?.submitCta, locale, fb.contactForm.submitCta),
    },

    map: {
      label: t(home?.mapSection?.label, locale, fb.map.label),
      heading: t(home?.mapSection?.heading, locale, fb.map.heading),
      description: t(home?.mapSection?.description, locale, fb.map.description),
    },

    // Only the column headings. The phone number, e-mail, address, brand name
    // and social labels are still fixed in Footer.tsx (docs/deferred-tasks.md).
    footer: {
      phoneLabel: t(foot?.phoneLabel, locale, fb.footer.phoneLabel),
      emailLabel: t(foot?.emailLabel, locale, fb.footer.emailLabel),
      socialLabel: t(foot?.socialLabel, locale, fb.footer.socialLabel),
      visitLabel: t(foot?.visitLabel, locale, fb.footer.visitLabel),
      designedIn: t(foot?.designedIn, locale, fb.footer.designedIn),
    },

    meta: {
      title: t(seo?.title, locale, fb.meta.title),
      description: t(seo?.description, locale, fb.meta.description),
    },
  };
}
