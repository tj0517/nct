import { defineType, defineField } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "localizedString" }),
    defineField({ name: "answer", title: "Answer", type: "localizedText" }),
  ],
  preview: {
    select: { title: "question.en", subtitle: "answer.en" },
  },
});
