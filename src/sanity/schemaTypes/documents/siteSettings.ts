import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "A Nice Cup of Tea",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp URL",
      type: "url",
    }),
    defineField({
      name: "messenger",
      title: "Messenger URL",
      type: "url",
    }),
    defineField({
      name: "instagram",
      title: "Instagram Handle",
      type: "string",
    }),
  ],
});
