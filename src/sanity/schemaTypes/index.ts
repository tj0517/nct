// Objects
import { localizedString } from "./objects/localizedString";
import { localizedText } from "./objects/localizedText";
import { seo } from "./objects/seo";
import { navLink } from "./objects/navLink";
import { headlineSegment } from "./objects/headlineSegment";
import { namedItem } from "./objects/namedItem";
import { courseCategory } from "./objects/courseCategory";
import { trustBadge } from "./objects/trustBadge";
import { faqItem } from "./objects/faqItem";
import { helpBlock } from "./objects/helpBlock";
import { pageTestimonial } from "./objects/pageTestimonial";
import { courseHero } from "./objects/courseHero";
// Site-wide
import { siteSettings } from "./documents/siteSettings";
import { header } from "./documents/header";
import { footer } from "./documents/footer";
import { formsAndBooking } from "./documents/formsAndBooking";
// Pages
import { homepage } from "./documents/homepage";
import { childrenPage } from "./documents/childrenPage";
import { adultsPage } from "./documents/adultsPage";
import { universityPage } from "./documents/universityPage";
import { businessPage } from "./documents/businessPage";
import { mathsPage } from "./documents/mathsPage";
import { faqPage } from "./documents/faqPage";
// Collections
import { teacher } from "./documents/teacher";
import { testimonial } from "./documents/testimonial";

export const schemaTypes = [
  localizedString,
  localizedText,
  seo,
  navLink,
  headlineSegment,
  namedItem,
  courseCategory,
  trustBadge,
  faqItem,
  helpBlock,
  pageTestimonial,
  courseHero,
  siteSettings,
  header,
  footer,
  formsAndBooking,
  homepage,
  childrenPage,
  adultsPage,
  universityPage,
  businessPage,
  mathsPage,
  faqPage,
  teacher,
  testimonial,
];

// One document each — never a list to pick from.
export const singletonTypes = new Set([
  "siteSettings",
  "header",
  "footer",
  "formsAndBooking",
  "homepage",
  "childrenPage",
  "adultsPage",
  "universityPage",
  "businessPage",
  "mathsPage",
  "faqPage",
]);

// Pages in the order they appear in the site's own navigation, so the Studio
// list reads the way the site does.
export const pageTypes: { type: string; title: string }[] = [
  { type: "homepage", title: "Homepage" },
  { type: "childrenPage", title: "Children & Teens" },
  { type: "adultsPage", title: "Adults" },
  { type: "universityPage", title: "University applications" },
  { type: "businessPage", title: "Business English" },
  { type: "mathsPage", title: "Maths in English" },
  { type: "faqPage", title: "FAQ" },
];

export const siteWideTypes: { type: string; title: string }[] = [
  { type: "siteSettings", title: "Site settings" },
  { type: "header", title: "Header" },
  { type: "footer", title: "Footer" },
  { type: "formsAndBooking", title: "Forms & booking" },
];
