import { defineType, defineField } from "sanity";

export const businessPage = defineType({
  name: "businessPage",
  title: "Business English Page",
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
    defineField({ name: "credentialsLabel", title: "Credentials Label", type: "localizedString" }),
    defineField({ name: "credentialsHeading", title: "Credentials Heading", type: "localizedString" }),
    defineField({
      name: "credentials",
      title: "Credentials (Company Names)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
