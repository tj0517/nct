import { defineType, defineField } from "sanity";

// Only the column headings live here. The phone number, email, address, NIP,
// bank account and social links themselves come from Site settings; the brand
// name and the social link labels are still fixed in Footer.tsx.
export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "phoneLabel", title: "Phone heading", type: "localizedString" }),
    defineField({ name: "emailLabel", title: "Email heading", type: "localizedString" }),
    defineField({ name: "socialLabel", title: "Social heading", type: "localizedString" }),
    defineField({ name: "visitLabel", title: "Visit us heading", type: "localizedString" }),
    defineField({ name: "nipLabel", title: "NIP heading", type: "localizedString" }),
    defineField({ name: "bankLabel", title: "Bank account heading", type: "localizedString" }),
    defineField({ name: "designedIn", title: "Bottom line", type: "localizedString" }),
  ],
  preview: {
    select: { subtitle: "designedIn.en" },
    prepare: ({ subtitle }) => ({ title: "Footer", subtitle }),
  },
});
