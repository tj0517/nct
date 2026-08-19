import { defineType, defineField } from "sanity";

export const mathsPage = defineType({
  name: "mathsPage",
  title: "Maths Page",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Meta Title", type: "localizedString" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "localizedText" }),
    defineField({ name: "heroLabel", title: "Hero Label", type: "localizedString" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "localizedString" }),
    defineField({ name: "heroTitleItalic", title: "Hero Title Italic", type: "localizedString" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localizedText" }),
    defineField({ name: "aboutBody", title: "About Body", type: "localizedText" }),
    defineField({ name: "seePricing", title: "See Pricing CTA", type: "localizedString" }),
    defineField({ name: "bookConsultation", title: "Book Consultation CTA", type: "localizedString" }),
    defineField({ name: "servicesLabel", title: "Services Label", type: "localizedString" }),
    defineField({ name: "servicesHeading", title: "Services Heading", type: "localizedString" }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "localizedString" },
          { name: "desc", title: "Description", type: "localizedString" },
        ],
      }],
    }),
    defineField({ name: "teacherLabel", title: "Teacher Section Label", type: "localizedString" }),
    defineField({ name: "teacherName", title: "Teacher Name", type: "localizedString" }),
    defineField({ name: "teacherBio", title: "Teacher Bio", type: "localizedText" }),
    defineField({ name: "bookAConsultation", title: "Book A Consultation CTA", type: "localizedString" }),
  ],
});
