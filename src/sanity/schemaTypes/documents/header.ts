import { defineType, defineField } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  groups: [
    { name: "nav", title: "Navigation", default: true },
    { name: "lang", title: "Language switcher" },
  ],
  fields: [
    defineField({
      name: "coursesLabel",
      title: "Courses menu label",
      type: "localizedString",
      group: "nav",
    }),
    defineField({
      name: "courseLinks",
      title: "Courses menu",
      type: "array",
      of: [{ type: "navLink" }],
      group: "nav",
    }),
    defineField({
      name: "navLinks",
      title: "Other links",
      type: "array",
      of: [{ type: "navLink" }],
      group: "nav",
    }),
    defineField({
      name: "bookNow",
      title: "Button text",
      type: "localizedString",
      group: "nav",
    }),
    defineField({
      name: "languageSwitcher",
      title: "Language switcher",
      description:
        "Not shown on the site yet — the header still has PL/EN fixed in code. " +
        "tj 2026-09-30 (D1).",
      type: "object",
      group: "lang",
      options: { columns: 2 },
      fields: [
        defineField({ name: "pl", title: "Polish label", type: "string", initialValue: "PL" }),
        defineField({ name: "en", title: "English label", type: "string", initialValue: "EN" }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: "bookNow.en" },
    prepare: ({ subtitle }) => ({ title: "Header", subtitle }),
  },
});
