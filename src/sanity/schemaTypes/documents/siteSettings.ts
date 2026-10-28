import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact details", default: true },
    { name: "seo", title: "Default SEO" },
    { name: "language", title: "Polish version" },
  ],
  fields: [
    defineField({
      name: "polishLive",
      title: "Polish version live",
      description:
        "On: the Polish site is the homepage at anicecupoftea.pl, with a flag to switch " +
        "to English. Any text without a Polish version shows in English. Off: visitors " +
        "only see the English site. Changes take a minute or two to appear. " +
        "Anthony 2026-10-28.",
      type: "boolean",
      initialValue: false,
      group: "language",
    }),
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
    defineField({ name: "facebook", title: "Facebook page", type: "url", group: "contact" }),
    defineField({
      name: "nip",
      title: "NIP",
      description: "Polish tax identification number, shown in the footer.",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "bankAccount",
      title: "PLN bank account",
      description: "Shown in the footer. Anthony 2026-10-07.",
      type: "string",
      group: "contact",
    }),
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
