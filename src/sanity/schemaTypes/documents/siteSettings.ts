import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact details", default: true },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "School name",
      type: "string",
      initialValue: "A Nice Cup of Tea",
      group: "contact",
    }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "address", title: "Address", type: "string", group: "contact" }),
    defineField({ name: "whatsapp", title: "WhatsApp link", type: "url", group: "contact" }),
    defineField({ name: "messenger", title: "Messenger link", type: "url", group: "contact" }),
    defineField({ name: "instagram", title: "Instagram", type: "string", group: "contact" }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      description:
        "Used by the homepage, and as the fallback for any page without its own SEO. " +
        "tj 2026-09-30 (C1).",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { subtitle: "siteName" },
    prepare: ({ subtitle }) => ({ title: "Site settings", subtitle }),
  },
});
