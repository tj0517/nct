// Generates docs/sanity-content-map.md from src/dictionaries/en.json.
// The mapping below is the single source of truth for "en.json key -> Sanity field".
// Rules are matched in order; the first matching rule wins.
import { readFileSync, writeFileSync } from "node:fs";

const en = JSON.parse(readFileSync("src/dictionaries/en.json", "utf8"));

const leaves = [];
(function walk(v, p) {
  if (v === null || typeof v !== "object") return void leaves.push(p);
  if (Array.isArray(v)) return void v.forEach((x, i) => walk(x, `${p}[${i}]`));
  for (const k of Object.keys(v)) walk(v[k], p ? `${p}.${k}` : k);
})(en, "");

// [regex, document, field, sanity type, note]
// Placements for trustBar/pricing/map/booking/contactForm/meta/languageSwitcher
// were decided by tj on 2026-09-30 (A1, B2, C1, D1) — see docs/tasks/NCT-3.02.md.
const RULES = [
  // ---- header (singleton) ----
  [/^header\.coursesLabel$/, "header", "coursesLabel", "localizedString", ""],
  [/^header\.courseLinks\[(\d+)]\.label$/, "header", "courseLinks[$1].label", "localizedString", ""],
  [/^header\.courseLinks\[(\d+)]\.href$/, "header", "courseLinks[$1].href", "string", "route, not translated"],
  [/^header\.navLinks\[(\d+)]\.label$/, "header", "navLinks[$1].label", "localizedString", ""],
  [/^header\.navLinks\[(\d+)]\.href$/, "header", "navLinks[$1].href", "string", "route, not translated"],
  [/^header\.bookNow$/, "header", "bookNow", "localizedString", ""],

  // ---- homepage: hero ----
  [/^hero\.(headlineLine1|headlineItalic|headlineBold|ctaPrimary|ctaPrimaryShort)$/, "homepage", "hero.$1", "localizedString", ""],
  [/^hero\.subtitle$/, "homepage", "hero.subtitle", "localizedText", "newlines = line breaks"],

  // ---- homepage: trust bar (tj A1) ----
  [/^trustBar\.badges\[(\d+)]\.heading$/, "homepage", "trustBar.badges[$1].heading", "localizedString", "tj 2026-09-30 (A1): Homepage tab"],
  [/^trustBar\.badges\[(\d+)]\.(cta|description)$/, "homepage", "trustBar.badges[$1].$2", "localizedString", "tj 2026-09-30 (A1): Homepage tab"],

  // ---- homepage: about ----
  [/^about\.body$/, "homepage", "about.body", "localizedText", ""],
  [/^about\.(heading|cta|imageAlt)$/, "homepage", "about.$1", "localizedString", ""],

  // ---- homepage: who we teach ----
  [/^whoWeTeach\.(label|heading)$/, "homepage", "whoWeTeach.$1", "localizedString", ""],
  [/^whoWeTeach\.categories\[(\d+)]\.href$/, "homepage", "whoWeTeach.categories[$1].href", "string", "route, not translated"],
  [/^whoWeTeach\.categories\[(\d+)]\.(name|description)$/, "homepage", "whoWeTeach.categories[$1].$2", "localizedString", ""],

  // ---- homepage: section headings for teachers / testimonials ----
  [/^teachers\.(label|heading)$/, "homepage", "teachersSection.$1", "localizedString", "section heading; people live in `teacher` docs"],
  [/^testimonials\.(label|heading)$/, "homepage", "testimonialsSection.$1", "localizedString", "section heading; quotes are hard-coded -> deferred"],

  // ---- teacher collection ----
  [/^teachers\.list\[(\d+)]\.name$/, "teacher", "[doc $1].name", "string", "proper noun, not translated"],
  [/^teachers\.list\[(\d+)]\.credential$/, "teacher", "[doc $1].credential", "localizedString", ""],
  [/^teachers\.list\[(\d+)]\.bio$/, "teacher", "[doc $1].bio", "localizedText", ""],

  // ---- homepage: pricing (tj A1) ----
  [/^pricing\.(label|heading|freePrice|freeDesc|freeCta|price|priceDesc)$/, "homepage", "pricing.$1", "localizedString", "tj 2026-09-30 (A1): Homepage tab"],

  // ---- booking modal (tj B2 -> formsAndBooking, global) ----
  [/^booking\.(heading|body|locationNote)$/, "formsAndBooking", "bookingModal.$1", "localizedText", "tj 2026-09-30 (B2): Forms & booking; global modal"],
  [/^booking\.(.+)$/, "formsAndBooking", "bookingModal.$1", "localizedString", "tj 2026-09-30 (B2): Forms & booking; global modal"],

  // ---- contact form (tj B2 -> formsAndBooking, all 7 pages) ----
  [/^contactForm\.(consent)$/, "formsAndBooking", "contactForm.$1", "localizedText", "tj 2026-09-30 (B2): Forms & booking; all 7 pages"],
  [/^contactForm\.(.+)$/, "formsAndBooking", "contactForm.$1", "localizedString", "tj 2026-09-30 (B2): Forms & booking; all 7 pages"],

  // ---- homepage: map (tj A1) ----
  [/^map\.description$/, "homepage", "mapSection.description", "localizedText", "tj 2026-09-30 (A1): Homepage tab"],
  [/^map\.(label|heading)$/, "homepage", "mapSection.$1", "localizedString", "tj 2026-09-30 (A1): Homepage tab"],

  // ---- FAQ page (new singleton) ----
  [/^faq\.meta\.title$/, "faqPage", "seo.title", "localizedString", ""],
  [/^faq\.meta\.description$/, "faqPage", "seo.description", "localizedText", ""],
  [/^faq\.(label|heading)$/, "faqPage", "$1", "localizedString", ""],
  [/^faq\.items\[(\d+)]\.question$/, "faqPage", "items[$1].question", "localizedString", ""],
  [/^faq\.items\[(\d+)]\.answer$/, "faqPage", "items[$1].answer", "localizedText", ""],

  // ---- footer ----
  [/^footer\.(.+)$/, "footer", "$1", "localizedString", ""],

  // ---- site default SEO (tj C1) ----
  [/^meta\.title$/, "siteSettings", "defaultSeo.title", "localizedString", "tj 2026-09-30 (C1): Site settings default SEO"],
  [/^meta\.description$/, "siteSettings", "defaultSeo.description", "localizedText", "tj 2026-09-30 (C1): Site settings default SEO"],

  // ---- language switcher (tj D1) ----
  [/^languageSwitcher\.(pl|en)$/, "header", "languageSwitcher.$1", "string", "tj 2026-09-30 (D1): Header; not rendered yet, Header.tsx stays hard-coded"],

  // ---- course subpages, shared shape: adults / business / maths / university ----
  [/^(adults|business|maths|university)\.meta\.title$/, "$1Page", "seo.title", "localizedString", ""],
  [/^(adults|business|maths|university)\.meta\.description$/, "$1Page", "seo.description", "localizedText", ""],
  [/^(adults|business|maths|university)\.hero\.headline\[(\d+)]\.text$/, "$1Page", "hero.headline[$2].text", "localizedString", ""],
  [/^(adults|business|maths|university)\.hero\.headline\[(\d+)]\.italic$/, "$1Page", "hero.headline[$2].italic", "boolean", "styling flag"],
  [/^(adults|business|maths|university)\.hero\.subtitle$/, "$1Page", "hero.subtitle", "localizedText", "newlines = line breaks"],
  [/^(adults|business|maths|university)\.hero\.(cta|illustrationAlt)$/, "$1Page", "hero.$2", "localizedString", ""],
  [/^(adults|business|maths|university)\.testimonial\.quote$/, "$1Page", "testimonial.quote", "localizedText", ""],
  [/^(adults|business|maths|university)\.testimonial\.author$/, "$1Page", "testimonial.author", "string", "proper noun, not translated"],
  [/^(adults|business|maths|university)\.testimonial\.role$/, "$1Page", "testimonial.role", "localizedString", ""],
  [/^(adults|business|maths|university)\.testimonial\.image$/, "$1Page", "testimonial.image", "image", "path today -> Sanity image asset"],
  [/^(adults|business|maths|university)\.testimonial\.imageAlt$/, "$1Page", "testimonial.imageAlt", "localizedString", ""],
  [/^(adults|business|maths|university)\.testimonial\.imageKind$/, "$1Page", "testimonial.imageKind", "string (list: photo|logo)", ""],
  [/^(adults|business|maths|university)\.help\.heading$/, "$1Page", "help.heading", "localizedString", ""],
  [/^(adults|business|maths|university)\.help\.items\[(\d+)]$/, "$1Page", "help.items[$2]", "localizedString", ""],

  // ---- children page (different shape) ----
  [/^children\.meta\.title$/, "childrenPage", "seo.title", "localizedString", ""],
  [/^children\.meta\.description$/, "childrenPage", "seo.description", "localizedText", ""],
  [/^children\.hero\.subtitle$/, "childrenPage", "hero.subtitle", "localizedText", ""],
  [/^children\.hero\.(label|title|titleItalic)$/, "childrenPage", "hero.$1", "localizedString", ""],
  [/^children\.(aboutBody|quote)$/, "childrenPage", "$1", "localizedText", ""],
  [/^children\.(meetTeachers|bookConsultation|examLabel|examHeading)$/, "childrenPage", "$1", "localizedString", ""],
  [/^children\.examPrep\[(\d+)]\.(name|desc)$/, "childrenPage", "examPrep[$1].$2", "localizedString", ""],
];

const rows = [];
const unmapped = [];
for (const key of leaves) {
  const hit = RULES.find(([re]) => re.test(key));
  if (!hit) { unmapped.push(key); continue; }
  const [re, doc, field, type, note] = hit;
  rows.push({
    key,
    doc: key.replace(re, doc),
    field: key.replace(re, field),
    type,
    note,
  });
}

if (unmapped.length) {
  console.error("UNMAPPED en.json leaves:\n" + unmapped.map((k) => "  " + k).join("\n"));
  process.exit(1);
}

const md = `<!-- GENERATED by scripts/build-content-map.mjs — do not edit by hand. -->
# Sanity content map — NCT-3.02

Every leaf of \`src/dictionaries/en.json\` and the Sanity document + field that will hold it.
\`en.json\` is the source of truth for structure (\`pl.json\` is stale — see \`docs/deferred-tasks.md\`).

- **${rows.length} leaves mapped** (recounted from \`en.json\`, not from the task file).
- Placement of \`trustBar\`, \`pricing\`, \`map\`, \`booking\`, \`contactForm\`, \`meta\` and\n  \`languageSwitcher\` was decided by tj on 2026-09-30 (A1, B2, C1, D1).
- \`localizedString\` / \`localizedText\` = \`{ en (required), pl (optional) }\`.
- Array indices below show where today's values land; in Sanity these are editable arrays,
  not fixed slots.

Verify with: \`node scripts/check-content-map.mjs\`

| # | \`en.json\` key | Sanity document | Field | Type | Note |
|---|---|---|---|---|---|
${rows.map((r, i) => `| ${i + 1} | \`${r.key}\` | \`${r.doc}\` | \`${r.field}\` | ${r.type} | ${r.note} |`).join("\n")}
`;

writeFileSync("docs/sanity-content-map.md", md);
console.log(`Wrote docs/sanity-content-map.md — ${rows.length} rows, 0 unmapped.`);
