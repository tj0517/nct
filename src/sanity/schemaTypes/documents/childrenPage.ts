import { defineType, defineField } from "sanity";

// The children's page has its own layout: a label-and-title hero rather than
// headline parts, an about paragraph, an exam list, and a closing quote.
export const childrenPage = defineType({
  name: "childrenPage",
  title: "Children & Teens",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "exams", title: "Exam preparation" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "label", title: "Small label", type: "localizedString" }),
        defineField({ name: "title", title: 'Title ("Lessons for")', type: "localizedString" }),
        defineField({
          name: "titleItalic",
          title: 'Title, italic part ("Children")',
          type: "localizedString",
        }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localizedText" }),
      ],
    }),
    defineField({ name: "aboutBody", title: "About paragraph", type: "localizedText", group: "about" }),
    defineField({
      name: "meetTeachers",
      title: "Meet teachers button",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "bookConsultation",
      title: "Book consultation button",
      type: "localizedString",
      group: "about",
    }),
    defineField({ name: "examLabel", title: "Small label", type: "localizedString", group: "exams" }),
    defineField({ name: "examHeading", title: "Heading", type: "localizedString", group: "exams" }),
    defineField({
      name: "examPrep",
      title: "What we prepare for",
      type: "array",
      of: [{ type: "namedItem" }],
      group: "exams",
    }),
    defineField({ name: "quote", title: "Closing quote", type: "localizedText", group: "exams" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { subtitle: "seo.title.en" },
    prepare: ({ subtitle }) => ({ title: "Children & Teens", subtitle }),
  },
});
