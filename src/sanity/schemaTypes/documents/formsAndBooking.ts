import { defineType, defineField } from "sanity";

// Text that appears on every page: the booking pop-up (mounted in the shared
// layout) and the contact form block (all seven pages). tj 2026-09-30 (B2).
export const formsAndBooking = defineType({
  name: "formsAndBooking",
  title: "Forms & booking",
  type: "document",
  groups: [
    { name: "booking", title: "Booking pop-up", default: true },
    { name: "contact", title: "Contact form" },
  ],
  fields: [
    defineField({
      name: "bookingModal",
      title: "Booking pop-up",
      description: "Opens from the Book now buttons anywhere on the site.",
      type: "object",
      group: "booking",
      fields: [
        defineField({ name: "label", title: "Small label above", type: "localizedString" }),
        defineField({ name: "heading", title: "Heading", type: "localizedText" }),
        defineField({ name: "body", title: "Body", type: "localizedText" }),
        defineField({ name: "locationNote", title: "Location note", type: "localizedText" }),
        defineField({ name: "namePlaceholder", title: "Name field", type: "localizedString" }),
        defineField({ name: "emailPlaceholder", title: "Email field", type: "localizedString" }),
        defineField({ name: "phonePlaceholder", title: "Phone field", type: "localizedString" }),
        defineField({ name: "inPerson", title: "In person option", type: "localizedString" }),
        defineField({ name: "online", title: "Online option", type: "localizedString" }),
        defineField({
          name: "messagePlaceholder",
          title: "Message field",
          type: "localizedString",
        }),
        defineField({ name: "submitCta", title: "Submit button", type: "localizedString" }),
        defineField({ name: "modalHeading", title: "Pop-up title", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "contactForm",
      title: "Contact form",
      description: "The form block at the bottom of all seven pages.",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "localizedString" }),
        defineField({ name: "namePlaceholder", title: "Name field", type: "localizedString" }),
        defineField({ name: "emailPlaceholder", title: "Email field", type: "localizedString" }),
        defineField({ name: "phonePlaceholder", title: "Phone field", type: "localizedString" }),
        defineField({
          name: "messagePlaceholder",
          title: "Message field",
          type: "localizedString",
        }),
        defineField({ name: "consent", title: "Consent text", type: "localizedText" }),
        defineField({ name: "submitCta", title: "Submit button", type: "localizedString" }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: "contactForm.heading.en" },
    prepare: ({ subtitle }) => ({ title: "Forms & booking", subtitle }),
  },
});
