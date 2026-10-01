import { defineType, defineField } from "sanity";

// Every course page shares one shape: SEO, a hero built from headline parts,
// one testimonial, and a "we can help you with" list.
export function coursePage(name: string, title: string) {
  return defineType({
    name,
    title,
    type: "document",
    groups: [
      { name: "hero", title: "Hero", default: true },
      { name: "testimonial", title: "Testimonial" },
      { name: "help", title: "What we help with" },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({ name: "hero", title: "Hero", type: "courseHero", group: "hero" }),
      defineField({
        name: "testimonial",
        title: "Testimonial",
        type: "pageTestimonial",
        group: "testimonial",
      }),
      defineField({
        name: "help",
        title: "What we help with",
        type: "helpBlock",
        group: "help",
      }),
      defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    ],
    preview: {
      select: { subtitle: "seo.title.en" },
      prepare: ({ subtitle }) => ({ title, subtitle }),
    },
  });
}
