import { defineType } from "sanity";

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    {
      name: "pl",
      title: "Polish",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "en",
      title: "English",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
});
