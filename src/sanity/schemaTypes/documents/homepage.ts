import { defineType, defineField } from "sanity";

// Sections appear here in the same order as on the page, so the tabs read
// top-to-bottom the way the homepage does. The homepage has no SEO tab of its
// own — it inherits Site settings -> Default SEO (tj 2026-09-30, C1).
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "trustBar", title: "Trust bar" },
    { name: "whoWeTeach", title: "Who we teach" },
    { name: "teachers", title: "Teachers" },
    { name: "pricing", title: "Pricing" },
    { name: "testimonials", title: "Testimonials" },
    { name: "map", title: "Map" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "headlineLine1",
          title: 'Headline, first part ("Speak the")',
          type: "localizedString",
        }),
        defineField({
          name: "headlineItalic",
          title: 'Headline, italic part ("King’s")',
          type: "localizedString",
        }),
        defineField({
          name: "headlineBold",
          title: 'Headline, bold part ("English")',
          type: "localizedString",
        }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localizedText" }),
        defineField({ name: "ctaPrimary", title: "Button text", type: "localizedString" }),
        defineField({
          name: "ctaPrimaryShort",
          title: "Button text on phones",
          type: "localizedString",
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
        defineField({ name: "body", title: "Body", type: "localizedText" }),
        defineField({ name: "cta", title: "Button text", type: "localizedString" }),
        defineField({ name: "imageAlt", title: "Photo description", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "trustBar",
      title: "Trust bar",
      type: "object",
      group: "trustBar",
      fields: [
        defineField({
          name: "badges",
          title: "Badges",
          type: "array",
          of: [{ type: "trustBadge" }],
        }),
      ],
    }),
    defineField({
      name: "whoWeTeach",
      title: "Who we teach",
      type: "object",
      group: "whoWeTeach",
      fields: [
        defineField({ name: "label", title: "Small label", type: "localizedString" }),
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
        defineField({
          name: "categories",
          title: "Course cards",
          type: "array",
          of: [{ type: "courseCategory" }],
        }),
      ],
    }),
    defineField({
      name: "teachersSection",
      title: "Teachers section",
      description: "Only the heading. The teachers themselves live under Teachers.",
      type: "object",
      group: "teachers",
      fields: [
        defineField({ name: "label", title: "Small label", type: "localizedString" }),
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "object",
      group: "pricing",
      fields: [
        defineField({ name: "label", title: "Small label", type: "localizedString" }),
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
        defineField({ name: "freePrice", title: "Free lesson — price", type: "localizedString" }),
        defineField({
          name: "freeDesc",
          title: "Free lesson — description",
          type: "localizedString",
        }),
        defineField({ name: "freeCta", title: "Free lesson — button", type: "localizedString" }),
        defineField({ name: "price", title: "Paid lesson — price", type: "localizedString" }),
        defineField({
          name: "priceDesc",
          title: "Paid lesson — description",
          type: "localizedString",
        }),
      ],
    }),
    defineField({
      name: "testimonialsSection",
      title: "Testimonials section",
      description: "Only the heading. The quotes themselves live under Testimonials.",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({ name: "label", title: "Small label", type: "localizedString" }),
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "mapSection",
      title: "Map",
      type: "object",
      group: "map",
      fields: [
        defineField({ name: "label", title: "Small label", type: "localizedString" }),
        defineField({ name: "heading", title: "Heading (the address)", type: "localizedString" }),
        defineField({ name: "description", title: "Description", type: "localizedText" }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: "hero.headlineLine1.en" },
    prepare: ({ subtitle }) => ({ title: "Homepage", subtitle }),
  },
});
