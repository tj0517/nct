// Imports today's site content (src/dictionaries/en.json, EN only) plus the
// teacher photos and the 3 homepage-carousel testimonials (hard-coded in
// Testimonials.tsx) into the Sanity `production` dataset. NCT-3.03.
//
// Three modes:
//  - --dry-run (default): builds every document and prints its _id, type and
//    field count, writes nothing.
//  - --write (default write mode): creates documents that don't exist yet
//    (createIfNotExists) and leaves existing ones untouched — reported as
//    "created" vs "skipped (exists)". Safe to re-run once the client has
//    started editing content in Studio: it can never clobber their edits.
//  - --write --overwrite: replaces EVERY document whole (createOrReplace),
//    including any edits made in Studio since the last import. Use only to
//    deliberately re-sync from en.json; never as the routine re-run.
//
// Every document uses a stable, deterministic _id (never a `drafts.` id).
// Image uploads are unaffected by the mode: Sanity de-duplicates uploads by
// content hash, so re-uploading the same file returns the existing asset
// instead of creating a new one.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const en = JSON.parse(readFileSync(path.join(ROOT, "src/dictionaries/en.json"), "utf8"));

// ---- data that lives only in components, not in en.json (NCT-3.03 scope decision, tj 2026-10-01) ----

const TEACHER_IMAGES = [
  "/images/teachers/anthony-goltz.png",
  "/images/teachers/alan-bryson.png",
  "/images/teachers/rishi-handa.png",
];

// Copied verbatim from src/components/Testimonials.tsx — the 3 homepage
// carousel quotes; there is no en.json source for these.
const CAROUSEL_TESTIMONIALS = [
  {
    text: "Probably the best language school in Poland.",
    author: "Katarzyna Bonda",
    role: "Author",
    image: "/images/testimonials/katarzyna-bonda.png",
  },
  {
    text: "Anthony is the teacher you remember years later because you didn’t wish to disillusion them.",
    author: "Marek Tejchman",
    role: "News Anchor",
    image: "/images/testimonials/marek-tejchman.png",
  },
  {
    text: "British humour included; there’s no other place like it in Poland.",
    author: "Anna Gielewska",
    role: "VSquare Editor-in-Chief and Stanford Fellow",
    image: "/images/testimonials/anna-gielewska.png",
  },
];

// ---- small helpers ----

const ls = (v) => ({ en: v });
const lt = (v) => ({ en: v });
const key = (i) => `k${i}`;

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Counts leaf values in a built document (everything but the pure structural
// `_type` / `_key` keys), so an image field counts as 1 whether it is still a
// dry-run placeholder or a real asset reference.
function countFields(value) {
  if (value === null || value === undefined) return 0;
  if (Array.isArray(value)) return value.reduce((n, v) => n + countFields(v), 0);
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([k]) => k !== "_type" && k !== "_key" && k !== "_id")
      .reduce((n, [, v]) => n + countFields(v), 0);
  }
  return 1;
}

// ---- document builders ----

function buildHeader() {
  const h = en.header;
  return {
    _id: "header",
    _type: "header",
    coursesLabel: ls(h.coursesLabel),
    courseLinks: h.courseLinks.map((l, i) => ({
      _type: "navLink",
      _key: key(i),
      label: ls(l.label),
      href: l.href,
    })),
    navLinks: h.navLinks.map((l, i) => ({
      _type: "navLink",
      _key: key(i),
      label: ls(l.label),
      href: l.href,
    })),
    bookNow: ls(h.bookNow),
    languageSwitcher: { pl: en.languageSwitcher.pl, en: en.languageSwitcher.en },
  };
}

function buildFooter() {
  const f = en.footer;
  return {
    _id: "footer",
    _type: "footer",
    phoneLabel: ls(f.phoneLabel),
    emailLabel: ls(f.emailLabel),
    socialLabel: ls(f.socialLabel),
    visitLabel: ls(f.visitLabel),
    designedIn: ls(f.designedIn),
  };
}

function buildFormsAndBooking() {
  const b = en.booking;
  const c = en.contactForm;
  return {
    _id: "formsAndBooking",
    _type: "formsAndBooking",
    bookingModal: {
      label: ls(b.label),
      heading: lt(b.heading),
      body: lt(b.body),
      locationNote: lt(b.locationNote),
      namePlaceholder: ls(b.namePlaceholder),
      emailPlaceholder: ls(b.emailPlaceholder),
      phonePlaceholder: ls(b.phonePlaceholder),
      inPerson: ls(b.inPerson),
      online: ls(b.online),
      messagePlaceholder: ls(b.messagePlaceholder),
      submitCta: ls(b.submitCta),
      modalHeading: ls(b.modalHeading),
    },
    contactForm: {
      heading: ls(c.heading),
      namePlaceholder: ls(c.namePlaceholder),
      emailPlaceholder: ls(c.emailPlaceholder),
      phonePlaceholder: ls(c.phonePlaceholder),
      messagePlaceholder: ls(c.messagePlaceholder),
      consent: lt(c.consent),
      submitCta: ls(c.submitCta),
    },
  };
}

function buildSiteSettings() {
  return {
    _id: "siteSettings",
    _type: "siteSettings",
    // Not an en.json leaf — the content map has no source for this field, so
    // createOrReplace would otherwise leave it empty ("Untitled" in Studio).
    // Decision: tj 2026-10-01 (NCT-3.03) — use the brand name as it appears
    // in en.json (meta.title, about.body, contactForm.consent) and as the
    // schema's own `initialValue`.
    siteName: "A Nice Cup of Tea",
    defaultSeo: { title: ls(en.meta.title), description: lt(en.meta.description) },
  };
}

function buildFaqPage() {
  const f = en.faq;
  return {
    _id: "faqPage",
    _type: "faqPage",
    label: ls(f.label),
    heading: ls(f.heading),
    items: f.items.map((it, i) => ({
      _type: "faqItem",
      _key: key(i),
      question: ls(it.question),
      answer: lt(it.answer),
    })),
    seo: { title: ls(f.meta.title), description: lt(f.meta.description) },
  };
}

function buildHomepage() {
  return {
    _id: "homepage",
    _type: "homepage",
    hero: {
      headlineLine1: ls(en.hero.headlineLine1),
      headlineItalic: ls(en.hero.headlineItalic),
      headlineBold: ls(en.hero.headlineBold),
      subtitle: lt(en.hero.subtitle),
      ctaPrimary: ls(en.hero.ctaPrimary),
      ctaPrimaryShort: ls(en.hero.ctaPrimaryShort),
    },
    about: {
      heading: ls(en.about.heading),
      body: lt(en.about.body),
      cta: ls(en.about.cta),
      imageAlt: ls(en.about.imageAlt),
    },
    trustBar: {
      badges: en.trustBar.badges.map((b, i) => ({
        _type: "trustBadge",
        _key: key(i),
        heading: ls(b.heading),
        ...(b.cta !== undefined ? { cta: ls(b.cta) } : {}),
        ...(b.description !== undefined ? { description: ls(b.description) } : {}),
      })),
    },
    whoWeTeach: {
      label: ls(en.whoWeTeach.label),
      heading: ls(en.whoWeTeach.heading),
      categories: en.whoWeTeach.categories.map((c, i) => ({
        _type: "courseCategory",
        _key: key(i),
        name: ls(c.name),
        href: c.href,
        description: ls(c.description),
      })),
    },
    teachersSection: {
      label: ls(en.teachers.label),
      heading: ls(en.teachers.heading),
    },
    pricing: {
      label: ls(en.pricing.label),
      heading: ls(en.pricing.heading),
      freePrice: ls(en.pricing.freePrice),
      freeDesc: ls(en.pricing.freeDesc),
      freeCta: ls(en.pricing.freeCta),
      price: ls(en.pricing.price),
      priceDesc: ls(en.pricing.priceDesc),
    },
    testimonialsSection: {
      label: ls(en.testimonials.label),
      heading: ls(en.testimonials.heading),
    },
    mapSection: {
      label: ls(en.map.label),
      heading: ls(en.map.heading),
      description: lt(en.map.description),
    },
  };
}

function buildChildrenPage() {
  const c = en.children;
  return {
    _id: "childrenPage",
    _type: "childrenPage",
    hero: {
      label: ls(c.hero.label),
      title: ls(c.hero.title),
      titleItalic: ls(c.hero.titleItalic),
      subtitle: lt(c.hero.subtitle),
    },
    aboutBody: lt(c.aboutBody),
    meetTeachers: ls(c.meetTeachers),
    bookConsultation: ls(c.bookConsultation),
    examLabel: ls(c.examLabel),
    examHeading: ls(c.examHeading),
    examPrep: c.examPrep.map((it, i) => ({
      _type: "namedItem",
      _key: key(i),
      name: ls(it.name),
      desc: ls(it.desc),
    })),
    quote: lt(c.quote),
    seo: { title: ls(c.meta.title), description: lt(c.meta.description) },
  };
}

// Adults, Business, Maths and University share one shape (coursePage.ts).
function buildCoursePage(docType, src, resolveImage) {
  return {
    _id: docType,
    _type: docType,
    hero: {
      headline: src.hero.headline.map((seg, i) => ({
        _type: "headlineSegment",
        _key: key(i),
        text: ls(seg.text),
        ...(seg.italic !== undefined ? { italic: seg.italic } : {}),
      })),
      subtitle: lt(src.hero.subtitle),
      cta: ls(src.hero.cta),
      illustrationAlt: ls(src.hero.illustrationAlt),
    },
    testimonial: {
      quote: lt(src.testimonial.quote),
      author: src.testimonial.author,
      role: ls(src.testimonial.role),
      image: resolveImage(src.testimonial.image),
      imageAlt: ls(src.testimonial.imageAlt),
      ...(src.testimonial.imageKind ? { imageKind: src.testimonial.imageKind } : {}),
    },
    help: {
      heading: ls(src.help.heading),
      items: src.help.items.map((t, i) => ({ _type: "localizedString", _key: key(i), en: t })),
    },
    seo: { title: ls(src.meta.title), description: lt(src.meta.description) },
  };
}

function buildTeachers(resolveImage) {
  return en.teachers.list.map((t, i) => ({
    _id: `teacher-${slugify(t.name)}`,
    _type: "teacher",
    name: t.name,
    credential: ls(t.credential),
    bio: lt(t.bio),
    image: resolveImage(TEACHER_IMAGES[i]),
    order: i,
  }));
}

function buildCarouselTestimonials(resolveImage) {
  return CAROUSEL_TESTIMONIALS.map((t, i) => ({
    _id: `testimonial-${slugify(t.author)}`,
    _type: "testimonial",
    author: t.author,
    role: ls(t.role),
    quote: lt(t.text),
    image: resolveImage(t.image),
    order: i,
  }));
}

function buildDocuments(resolveImage) {
  return [
    buildSiteSettings(),
    buildHeader(),
    buildFooter(),
    buildFormsAndBooking(),
    buildHomepage(),
    buildChildrenPage(),
    buildCoursePage("adultsPage", en.adults, resolveImage),
    buildCoursePage("universityPage", en.university, resolveImage),
    buildCoursePage("businessPage", en.business, resolveImage),
    buildCoursePage("mathsPage", en.maths, resolveImage),
    buildFaqPage(),
    ...buildTeachers(resolveImage),
    ...buildCarouselTestimonials(resolveImage),
  ];
}

// ---- main ----

// Set once the write token is read, so the top-level catch can scrub it out
// of any error message before printing (never log the token).
let currentToken;

function scrub(text) {
  if (!currentToken || typeof text !== "string") return text;
  return text.split(currentToken).join("[REDACTED]");
}

async function uploadImage(client, relPath) {
  const absPath = path.join(ROOT, "public", relPath.replace(/^\//, ""));
  const buffer = readFileSync(absPath);
  const asset = await client.assets.upload("image", buffer, { filename: path.basename(absPath) });
  return asset._id;
}

async function main() {
  const WRITE = process.argv.includes("--write");
  const OVERWRITE = process.argv.includes("--overwrite");

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = "2024-01-01";

  console.log(
    `Target: project=${projectId || "(missing)"} dataset=${dataset} write=${WRITE} overwrite=${OVERWRITE}`
  );
  if (WRITE && OVERWRITE) {
    console.warn(
      "\n⚠ --overwrite replaces EVERY document whole (createOrReplace), including any " +
        "edits made in Studio since the last import. This is not the routine re-run mode.\n"
    );
  }

  let token;
  if (WRITE) {
    if (!projectId) {
      console.error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local. Refusing to write.");
      process.exit(1);
    }
    token = process.env.SANITY_WRITE_TOKEN;
    currentToken = token;
    if (!token) {
      console.error(
        "SANITY_WRITE_TOKEN is not set in .env.local. Refusing to write — run with " +
          "`node --env-file=.env.local scripts/import-content.mjs --write` after adding it."
      );
      process.exit(1);
    }
  }

  const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

  const allImagePaths = [
    ...TEACHER_IMAGES,
    ...CAROUSEL_TESTIMONIALS.map((t) => t.image),
    en.adults.testimonial.image,
    en.university.testimonial.image,
    en.business.testimonial.image,
    en.maths.testimonial.image,
  ];

  const assetMap = new Map();
  if (WRITE) {
    for (const relPath of allImagePaths) {
      const assetId = await uploadImage(client, relPath);
      assetMap.set(relPath, assetId);
      console.log(`asset: ${relPath} -> ${assetId}`);
    }
  }

  const plannedImages = [];
  function resolveImage(relPath) {
    plannedImages.push(relPath);
    if (!WRITE) return { _type: "image", _dryRunPath: relPath };
    const assetId = assetMap.get(relPath);
    if (!assetId) throw new Error(`No uploaded asset for ${relPath}`);
    return { _type: "image", asset: { _type: "reference", _ref: assetId } };
  }

  const documents = buildDocuments(resolveImage);

  let totalFields = 0;
  for (const doc of documents) {
    const fieldCount = countFields(doc);
    totalFields += fieldCount;
    console.log(`${doc._id}  (${doc._type})  fields=${fieldCount}`);
  }
  console.log(
    `\n${documents.length} documents, ${totalFields} total fields, ${plannedImages.length} image references.`
  );

  if (!WRITE) {
    console.log("\nDry run — nothing written.");
    return;
  }

  const existingIds = new Set(
    await client.fetch("*[_id in $ids]._id", { ids: documents.map((d) => d._id) })
  );

  let created = 0;
  let skipped = 0;
  let overwritten = 0;
  for (const doc of documents) {
    if (OVERWRITE) {
      await client.createOrReplace(doc);
      console.log(`overwrote ${doc._id}`);
      overwritten++;
    } else if (existingIds.has(doc._id)) {
      console.log(`skipped (exists) ${doc._id}`);
      skipped++;
    } else {
      await client.createIfNotExists(doc);
      console.log(`created ${doc._id}`);
      created++;
    }
  }
  console.log(`\n${created} created, ${skipped} skipped (exists), ${overwritten} overwritten.`);
}

main().catch((err) => {
  console.error("FAILED:", scrub(err && err.message ? err.message : String(err)));
  process.exit(1);
});
