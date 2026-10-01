import { defineType, defineField } from "sanity";

// Only the column headings live here. The phone number, email and address
// themselves come from Site settings; the brand name and social labels are
// still fixed in Footer.tsx (recorded in docs/deferred-tasks.md).
export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "phoneLabel", title: "Phone heading", type: "localizedString" }),
    defineField({ name: "emailLabel", title: "Email heading", type: "localizedString" }),
    defineField({ name: "socialLabel", title: "Social heading", type: "localizedString" }),
    defineField({ name: "visitLabel", title: "Visit us heading", type: "localizedString" }),
    defineField({ name: "designedIn", title: "Bottom line", type: "localizedString" }),
  ],
  preview: {
    select: { subtitle: "designedIn.en" },
    prepare: ({ subtitle }) => ({ title: "Footer", subtitle }),
  },
});
