import { defineType, defineField } from "sanity";

export const courseCategory = defineType({
  name: "courseCategory",
  title: "Course",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "localizedString" }),
    defineField({
      name: "href",
      title: "Address",
      description: 'The subpage this card links to, e.g. "/children".',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "localizedString" }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "href" },
  },
});
