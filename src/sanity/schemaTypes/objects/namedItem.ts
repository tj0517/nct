import { defineType, defineField } from "sanity";

// A short name with a one-line explanation underneath.
export const namedItem = defineType({
  name: "namedItem",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "localizedString" }),
    defineField({ name: "desc", title: "Description", type: "localizedString" }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "desc.en" },
  },
});
