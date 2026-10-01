import { defineType, defineField } from "sanity";

// The quotes in the homepage carousel. These are still fixed in
// Testimonials.tsx today; moving them here is NCT-3.03/3.04
// (recorded in docs/deferred-tasks.md).
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author",
      description: "A person's name — not translated.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role", title: "Role / affiliation", type: "localizedString" }),
    defineField({ name: "quote", title: "Quote", type: "localizedText" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Position in the carousel",
      description: "Lower numbers come first.",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Position in the carousel",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "author", subtitle: "role.en", media: "image" },
  },
});
