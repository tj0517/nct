import { defineType, defineField } from "sanity";

export const adultsPage = defineType({
  name: "adultsPage",
  title: "Adults Page",
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
    defineField({ name: "promiseLabel", title: "Promise Label", type: "localizedString" }),
    defineField({ name: "promiseQuote", title: "Promise Quote", type: "localizedText" }),
    defineField({ name: "goalsLabel", title: "Goals Label", type: "localizedString" }),
    defineField({ name: "goalsHeading", title: "Goals Heading", type: "localizedString" }),
    defineField({
      name: "goals",
      title: "Goals",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "localizedString" },
          { name: "desc", title: "Description", type: "localizedString" },
        ],
      }],
    }),
  ],
});
