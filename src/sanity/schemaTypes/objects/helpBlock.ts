import { defineType, defineField } from "sanity";

// The "We can help you with:" list on the course subpages.
export const helpBlock = defineType({
  name: "helpBlock",
  title: "What we help with",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localizedString" }),
    defineField({
      name: "items",
      title: "List",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
  ],
});
