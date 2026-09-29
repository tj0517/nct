"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";
import { projectId } from "@/sanity/env";

function MissingProjectId() {
  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.6,
        maxWidth: "42rem",
        margin: "4rem auto",
        padding: "0 1.5rem",
        color: "#012169",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Sanity Studio is not configured
      </h1>
      <p>
        <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> is not set, so the Studio
        cannot connect to a Sanity project.
      </p>
      <p>
        Copy <code>.env.example</code> to <code>.env.local</code>, fill in the
        project id and dataset from{" "}
        <a href="https://sanity.io/manage">sanity.io/manage</a>, then restart the
        dev server.
      </p>
      <p>
        On a deployment, set the same variables in the hosting project&rsquo;s
        environment settings.
      </p>
    </main>
  );
}

export default function StudioPage() {
  if (!projectId) return <MissingProjectId />;
  return <NextStudio config={config} />;
}
