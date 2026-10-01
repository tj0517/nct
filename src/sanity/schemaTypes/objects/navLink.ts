import { defineType, defineField } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({
      name: "href",
      title: "Address",
      description: 'A path on this site, e.g. "/adults" or "/#contact".',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "href" },
  },
});
