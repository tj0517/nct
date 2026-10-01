import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  schemaTypes,
  singletonTypes,
  pageTypes,
  siteWideTypes,
} from "./schemaTypes";
import { projectId, dataset, apiVersion } from "./env";

export default defineConfig({
  name: "nct-english",
  title: "NCT English",
  // Studio is mounted at /studio, not at the root — without this the router
  // reads "studio" as a tool name and renders "Tool not found"
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      // Grouped so the client opens a page by its own name, the way it appears
      // in the site navigation, rather than hunting through a flat list.
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Pages")
              .id("pages")
              .child(
                S.list()
                  .title("Pages")
                  .items(
                    pageTypes.map(({ type, title }) =>
                      S.listItem()
                        .title(title)
                        .id(type)
                        .child(S.document().schemaType(type).documentId(type))
                    )
                  )
              ),
            S.divider(),
            S.documentTypeListItem("teacher").title("Teachers"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.divider(),
            ...siteWideTypes.map(({ type, title }) =>
              S.listItem()
                .title(title)
                .id(type)
                .child(S.document().schemaType(type).documentId(type))
            ),
          ]),
    }),
    // Vision (GROQ playground) is a development-only tool
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
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
