import { defineType, defineField } from "sanity";

export const teacher = defineType({
  name: "teacher",
  title: "Teacher",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "A person's name — not translated.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "credential", title: "University", type: "localizedString" }),
    defineField({ name: "bio", title: "Subject / bio", type: "localizedText" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Position in the list",
      description: "Lower numbers come first.",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Position in the list",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "credential.en", media: "image" },
  },
});
