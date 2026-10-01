import { defineType, defineField } from "sanity";

// Title and description for the browser tab and the Google result.
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      description: "Shown in the browser tab and as the Google result headline.",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Meta description",
      description: "The grey summary under the Google result. Around 155 characters.",
      type: "localizedText",
    }),
  ],
});
