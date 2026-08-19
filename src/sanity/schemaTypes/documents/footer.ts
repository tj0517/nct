import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localizedText",
    }),
    defineField({
      name: "links",
      title: "Links",
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
      name: "phoneLabel",
      title: "Phone Label",
      type: "localizedString",
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label",
      type: "localizedString",
    }),
    defineField({
      name: "socialLabel",
      title: "Social Label",
      type: "localizedString",
    }),
    defineField({
      name: "visitLabel",
      title: "Visit Label",
      type: "localizedString",
    }),
    defineField({
      name: "designedIn",
      title: "Designed In",
      type: "localizedString",
    }),
  ],
});
