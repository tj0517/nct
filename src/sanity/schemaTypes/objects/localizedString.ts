import { defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    {
      name: "pl",
      title: "Polish",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "en",
      title: "English",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
});
