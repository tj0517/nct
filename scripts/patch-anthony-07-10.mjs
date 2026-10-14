// One-off: applies Anthony's 2026-10-07 content corrections to the Sanity
// `production` dataset. The live site reads Sanity first, so changing
// src/dictionaries/en.json alone would change nothing visitors can see —
// en.json is only the fallback.
//
// Three things:
//  1. homepage.hero.subtitle.en — 3rd line becomes "Face to face in Warsaw or online."
//  2. siteSettings — the school's contact details, NIP and bank account, which
//     the footer, the contact row and the JSON-LD now all read from.
//  3. the Katarzyna Bonda testimonial photo — re-framed as a square so the
//     round crop stops cutting her forehead and chin. The dataset holds its own
//     copy on the CDN, so the local file alone would not change the live site.
//
// Modes:
//  - --dry-run (default): prints every patch and writes nothing.
//  - --write: applies them. Only the fields listed here are touched; nothing
//    else in those documents is read or replaced.
//  - --only hero|settings|photo: narrows the write to one of the three, so one
//    item can be released while the others wait. The report always shows all
//    three; only the writing is narrowed.
//
// Run: node --env-file=.env.local scripts/patch-anthony-07-10.mjs [--write] [--only <step>]
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const en = JSON.parse(readFileSync(path.join(ROOT, "src/dictionaries/en.json"), "utf8"));

const BONDA_IMAGE = "/images/testimonials/katarzyna-bonda.png";
const BONDA_AUTHOR = "Katarzyna Bonda";

let currentToken;
const scrub = (text) =>
  currentToken && typeof text === "string" ? text.split(currentToken).join("[REDACTED]") : text;

async function main() {
  const WRITE = process.argv.includes("--write");

  // `--only hero|settings|photo` narrows the write to one of the three changes,
  // so a single item can be released without the other two. Omit for all three.
  const onlyFlag = process.argv.indexOf("--only");
  const ONLY = onlyFlag === -1 ? null : process.argv[onlyFlag + 1];
  const STEPS = ["hero", "settings", "photo"];
  if (ONLY && !STEPS.includes(ONLY)) {
    console.error(`--only must be one of: ${STEPS.join(", ")}`);
    process.exit(1);
  }
  const wants = (step) => !ONLY || ONLY === step;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = "2024-01-01";

  console.log(
    `Target: project=${projectId || "(missing)"} dataset=${dataset} ` +
      `write=${WRITE} steps=${ONLY ?? "hero, settings, photo"}\n`
  );

  let token;
  if (WRITE) {
    if (!projectId) {
      console.error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Refusing to write.");
      process.exit(1);
    }
    token = process.env.SANITY_WRITE_TOKEN;
    currentToken = token;
    if (!token) {
      console.error(
        "SANITY_WRITE_TOKEN is not set. Run with `node --env-file=.env.local " +
          "scripts/patch-anthony-07-10.mjs --write`."
      );
      process.exit(1);
    }
  }

  const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

  // ---- 1. hero subtitle -------------------------------------------------
  const homepage = await client.fetch(`*[_id == "homepage"][0]{ "subtitle": hero.subtitle.en }`);
  const before = homepage?.subtitle ?? "(absent — en.json fallback is in use)";
  const after = en.hero.subtitle;
  console.log("homepage.hero.subtitle.en");
  console.log("  before:", JSON.stringify(before));
  console.log("  after: ", JSON.stringify(after), "\n");

  // ---- 2. site settings -------------------------------------------------
  const settings = await client.fetch(`*[_id == "siteSettings"][0]`);
  const fields = [
    "phone",
    "email",
    "address",
    "nip",
    "bankAccount",
    "facebook",
    "messenger",
    "instagram",
  ];
  console.log("siteSettings");
  for (const f of fields) {
    console.log(
      `  ${f.padEnd(12)} ${JSON.stringify(settings?.[f] ?? null)}  ->  ${JSON.stringify(en.site[f])}`
    );
  }
  console.log();

  // ---- 3. Bonda portrait ------------------------------------------------
  const bonda = await client.fetch(
    `*[_type == "testimonial" && author == $author][0]{ _id, "asset": image.asset->url }`,
    { author: BONDA_AUTHOR }
  );
  console.log("testimonial — " + BONDA_AUTHOR);
  console.log("  doc:   ", bonda?._id ?? "(not found)");
  console.log("  before:", bonda?.asset ?? "(no image)");
  console.log("  after: re-upload of", BONDA_IMAGE, "(660x660 square)\n");

  if (!WRITE) {
    console.log("Dry run — nothing written. Re-run with --write to apply.");
    return;
  }

  if (wants("hero")) {
    await client.patch("homepage").set({ "hero.subtitle.en": after }).commit();
    console.log("patched homepage.hero.subtitle.en");
  }

  if (wants("settings")) {
    await client
      .patch("siteSettings")
      .set(Object.fromEntries(fields.map((f) => [f, en.site[f]])))
      .commit();
    console.log("patched siteSettings");
  }

  if (wants("photo") && bonda?._id) {
    const buffer = readFileSync(path.join(ROOT, "public", BONDA_IMAGE.replace(/^\//, "")));
    const asset = await client.assets.upload("image", buffer, {
      filename: path.basename(BONDA_IMAGE),
    });
    await client
      .patch(bonda._id)
      .set({ image: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
      .commit();
    console.log("patched", bonda._id, "image ->", asset._id);
  } else if (wants("photo")) {
    console.warn(`No testimonial found for ${BONDA_AUTHOR} — photo not patched.`);
  }

  console.log("\nDone. The site revalidates within 60s.");
}

main().catch((err) => {
  console.error(scrub(err?.message ?? String(err)));
  process.exit(1);
});
