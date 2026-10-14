// Uploads the teachers' intro films to Sanity and points each `teacher.video`
// at the uploaded asset.
//
// They live in Sanity rather than `public/videos/` so the repo stays light
// (3 files, ~15 MB, would otherwise sit in git history forever) and so Anthony
// can swap a film himself in Studio. `teachersQuery` already resolves
// `coalesce(video.asset->url, videoUrl)`, so nothing in the app changes.
//
// The local files are the re-encoded ones: H.264 / AAC / yuv420p / +faststart.
// Two of the three arrived as VP9 in an .mp4 container, which Safari will not
// play — the originals are kept in `artwork/videos/`.
//
// Modes:
//  - --dry-run (default): prints what would be uploaded, writes nothing.
//  - --write: uploads and patches.
//
// Run: node --env-file=.env.local scripts/upload-teacher-videos.mjs [--write]
import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const FILMS = [
  { doc: "teacher-anthony-goltz", file: "public/videos/anthony-goltz-intro.mp4" },
  { doc: "teacher-dr-alan-bryson", file: "public/videos/alan-bryson-intro.mp4" },
  { doc: "teacher-dr-rishi-handa", file: "public/videos/rishi-handa-intro.mp4" },
];

let currentToken;
const scrub = (t) =>
  currentToken && typeof t === "string" ? t.split(currentToken).join("[REDACTED]") : t;

const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;

async function main() {
  const WRITE = process.argv.includes("--write");

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  console.log(`Target: project=${projectId || "(missing)"} dataset=${dataset} write=${WRITE}\n`);

  let token;
  if (WRITE) {
    token = process.env.SANITY_WRITE_TOKEN;
    currentToken = token;
    if (!projectId || !token) {
      console.error("NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_WRITE_TOKEN missing. Refusing to write.");
      process.exit(1);
    }
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });

  let missing = false;
  for (const f of FILMS) {
    const abs = path.join(ROOT, f.file);
    if (!existsSync(abs)) {
      console.error(`  MISSING  ${f.file}`);
      missing = true;
      continue;
    }
    const current = await client.fetch(
      `*[_id == $id][0]{ name, "url": video.asset->url }`,
      { id: f.doc }
    );
    console.log(`${current?.name ?? f.doc}`);
    console.log(`  before: ${current?.url ?? "(no film)"}`);
    console.log(`  after:  ${f.file}  ${mb(statSync(abs).size)}\n`);
  }
  if (missing) process.exit(1);

  if (!WRITE) {
    console.log("Dry run — nothing uploaded. Re-run with --write to apply.");
    return;
  }

  for (const f of FILMS) {
    const abs = path.join(ROOT, f.file);
    const asset = await client.assets.upload("file", readFileSync(abs), {
      filename: path.basename(abs),
      contentType: "video/mp4",
    });
    await client
      .patch(f.doc)
      .set({ video: { _type: "file", asset: { _type: "reference", _ref: asset._id } } })
      .commit();
    console.log(`uploaded ${f.file} -> ${asset._id}`);
  }

  console.log("\nDone. The site revalidates within 60s.");
}

main().catch((err) => {
  console.error(scrub(err?.message ?? String(err)));
  process.exit(1);
});
