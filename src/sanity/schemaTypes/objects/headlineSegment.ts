import { defineType, defineField } from "sanity";

// Course page headings are built from parts so single words can be italic,
// e.g. "English" + *for* + "Adults".
export const headlineSegment = defineType({
  name: "headlineSegment",
  title: "Headline part",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Text", type: "localizedString" }),
    defineField({
      name: "italic",
      title: "Italic",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "text.en", italic: "italic" },
    prepare: ({ title, italic }) => ({
      title: title || "(empty)",
      subtitle: italic ? "italic" : "regular",
    }),
  },
});
