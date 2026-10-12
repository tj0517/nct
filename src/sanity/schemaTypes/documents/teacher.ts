import { defineType, defineField } from "sanity";

export const teacher = defineType({
  name: "teacher",
  title: "Teacher",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "A person's name — not translated.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "credential", title: "University", type: "localizedString" }),
    defineField({ name: "bio", title: "Subject / bio", type: "localizedText" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "video",
      title: "Intro film (upload)",
      description:
        "Upload the MP4 here. The \u201cWatch intro\u201d button appears on this teacher's " +
        "card as soon as either this or the link below is filled; the upload wins.",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "videoUrl",
      title: "Intro film (YouTube or Vimeo link)",
      description: "Use instead of an upload if the film is already on YouTube or Vimeo.",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Position in the list",
      description: "Lower numbers come first.",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Position in the list",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "credential.en", media: "image" },
  },
});
