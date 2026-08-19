import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletonTypes } from "./schemaTypes";
import { projectId, dataset } from "./env";

const singletonLabels: Record<string, string> = {
  siteSettings: "Site Settings",
  homepage: "Homepage",
  header: "Header",
  footer: "Footer",
  adultsPage: "Adults Page",
  businessPage: "Business English Page",
  childrenPage: "Children Page",
  mathsPage: "Maths Page",
  universityPage: "University Applications Page",
};

export default defineConfig({
  name: "nct-english",
  title: "NCT English",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons
            ...Array.from(singletonTypes).map((type) =>
              S.listItem()
                .title(singletonLabels[type] || type)
                .id(type)
                .child(S.document().schemaType(type).documentId(type))
            ),
            S.divider(),
            // Collections
            S.documentTypeListItem("teacher").title("Teachers"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action)
          )
        : input,
  },
});
