import { localizedString } from "./objects/localizedString";
import { localizedText } from "./objects/localizedText";
import { siteSettings } from "./documents/siteSettings";
import { homepage } from "./documents/homepage";
import { header } from "./documents/header";
import { footer } from "./documents/footer";
import { teacher } from "./documents/teacher";
import { testimonial } from "./documents/testimonial";
import { adultsPage } from "./documents/adultsPage";
import { businessPage } from "./documents/businessPage";
import { childrenPage } from "./documents/childrenPage";
import { mathsPage } from "./documents/mathsPage";
import { universityPage } from "./documents/universityPage";

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  // Singletons
  siteSettings,
  homepage,
  header,
  footer,
  // Collections
  teacher,
  testimonial,
  // Subpages
  adultsPage,
  businessPage,
  childrenPage,
  mathsPage,
  universityPage,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homepage",
  "header",
  "footer",
  "adultsPage",
  "businessPage",
  "childrenPage",
  "mathsPage",
  "universityPage",
]);
