import { defineType, defineField } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ",
  type: "document",
  groups: [
    { name: "content", title: "Questions", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "label", title: "Small label", type: "localizedString", group: "content" }),
    defineField({ name: "heading", title: "Heading", type: "localizedString", group: "content" }),
    defineField({
      name: "items",
      title: "Questions and answers",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "content",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { subtitle: "seo.title.en" },
    prepare: ({ subtitle }) => ({ title: "FAQ", subtitle }),
  },
});
