import { defineType, defineField } from "sanity";

export const teacher = defineType({
  name: "teacher",
  title: "Teacher",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "credential",
      title: "Credential",
      type: "localizedString",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "localizedText",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "hasVideo",
      title: "Has Video",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
