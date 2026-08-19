import { defineType, defineField } from "sanity";

export const childrenPage = defineType({
  name: "childrenPage",
  title: "Children Page",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Meta Title", type: "localizedString" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "localizedText" }),
    defineField({ name: "heroLabel", title: "Hero Label", type: "localizedString" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "localizedString" }),
    defineField({ name: "heroTitleItalic", title: "Hero Title Italic", type: "localizedString" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localizedText" }),
    defineField({ name: "aboutBody", title: "About Body", type: "localizedText" }),
    defineField({ name: "meetTeachers", title: "Meet Teachers CTA", type: "localizedString" }),
    defineField({ name: "bookConsultation", title: "Book Consultation CTA", type: "localizedString" }),
    defineField({ name: "examLabel", title: "Exam Label", type: "localizedString" }),
    defineField({ name: "examHeading", title: "Exam Heading", type: "localizedString" }),
    defineField({
      name: "examPrep",
      title: "Exam Prep Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "localizedString" },
          { name: "desc", title: "Description", type: "localizedString" },
        ],
      }],
    }),
    defineField({ name: "quote", title: "Quote", type: "localizedText" }),
  ],
});
