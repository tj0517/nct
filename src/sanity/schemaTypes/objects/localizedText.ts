import { defineType, defineField } from "sanity";

// Multi-line counterpart of localizedString. Line breaks are meaningful: the
// site renders them as line breaks (e.g. the hero subtitle).
export const localizedText = defineType({
  name: "localizedText",
  title: "Long text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pl",
      title: "Polski (optional)",
      type: "text",
      rows: 3,
    }),
  ],
});
