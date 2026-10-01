import { defineType, defineField } from "sanity";

export const courseHero = defineType({
  name: "courseHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      description: "Built from parts so single words can be italic.",
      type: "array",
      of: [{ type: "headlineSegment" }],
    }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localizedText" }),
    defineField({ name: "cta", title: "Button text", type: "localizedString" }),
    defineField({
      name: "illustrationAlt",
      title: "Illustration description",
      type: "localizedString",
    }),
  ],
});
