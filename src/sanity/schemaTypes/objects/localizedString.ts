import { defineType, defineField } from "sanity";

// English is the live language; Polish stays empty until the PL version exists
// (tj 2026-09-29, O-02), so `pl` must not block publishing.
export const localizedString = defineType({
  name: "localizedString",
  title: "Text",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pl",
      title: "Polski (optional)",
      type: "string",
    }),
  ],
});
