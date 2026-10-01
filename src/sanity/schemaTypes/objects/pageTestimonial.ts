import { defineType, defineField } from "sanity";

// The single quote shown on a course subpage (distinct from the `testimonial`
// collection used by the homepage carousel).
export const pageTestimonial = defineType({
  name: "pageTestimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "localizedText" }),
    defineField({
      name: "author",
      title: "Author",
      description: "A person's name — not translated.",
      type: "string",
    }),
    defineField({ name: "role", title: "Role / affiliation", type: "localizedString" }),
    defineField({
      name: "image",
      title: "Photo or logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image description", type: "localizedString" }),
    defineField({
      name: "imageKind",
      title: "Image kind",
      description: "A portrait photo is cropped round; a logo is shown as-is.",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Logo", value: "logo" },
        ],
        layout: "radio",
      },
      initialValue: "photo",
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "role.en", media: "image" },
  },
});
