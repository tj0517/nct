import { defineType, defineField } from "sanity";

export const trustBadge = defineType({
  name: "trustBadge",
  title: "Badge",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localizedString" }),
    defineField({
      name: "cta",
      title: "Link text (optional)",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description (optional)",
      type: "localizedString",
    }),
  ],
  preview: {
    select: { title: "heading.en", subtitle: "description.en" },
  },
});
