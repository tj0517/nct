import { defineType, defineField } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "coursesLabel",
      title: "Courses Dropdown Label",
      type: "localizedString",
    }),
    defineField({
      name: "courseLinks",
      title: "Course Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "localizedString" },
            { name: "href", title: "Href", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "navLinks",
      title: "Nav Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "localizedString" },
            { name: "href", title: "Href", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "bookNow",
      title: "Book Now Button",
      type: "localizedString",
    }),
  ],
});
