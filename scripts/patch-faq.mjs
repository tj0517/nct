// Replaces the FAQ on the `faqPage` document with the set Anthony sent on
// 2026-10-12 (42 questions, up from 6) and shortens the heading to "FAQ".
//
// The live site reads Sanity before `en.json`, so updating the dictionary
// alone would change nothing visitors see — en.json is only the fallback.
// Source of truth for the run is `src/dictionaries/en.json` → `faq`, which is
// imported from his CSV, so the two can never disagree.
//
// Modes:
//  - --dry-run (default): prints the diff and writes nothing.
//  - --write: replaces `heading.en` and the whole `items` array. No other
//    field on the document is read or touched.
//
// Run: node --env-file=.env.local scripts/patch-faq.mjs [--write]
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const en = JSON.parse(readFileSync(path.join(ROOT, "src/dictionaries/en.json"), "utf8"));

let currentToken;
const scrub = (t) =>
  currentToken && typeof t === "string" ? t.split(currentToken).join("[REDACTED]") : t;

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

  const before = await client.fetch(
    `*[_id == "faqPage"][0]{ "heading": heading.en, "count": count(items) }`
  );

  // `_key` must be stable and unique within the array; the index is enough
  // because the whole array is replaced in one go.
  const items = en.faq.items.map((item, i) => ({
    _type: "faqItem",
    _key: `q${i}`,
    question: { en: item.question },
    answer: { en: item.answer },
  }));

  console.log("faqPage.heading.en");
  console.log(`  before: ${JSON.stringify(before?.heading ?? null)}`);
  console.log(`  after:  ${JSON.stringify(en.faq.heading)}\n`);
  console.log("faqPage.items");
  console.log(`  before: ${before?.count ?? 0} questions`);
  console.log(`  after:  ${items.length} questions`);
  console.log(`  first:  ${items[0].question.en}`);
  console.log(`  last:   ${items.at(-1).question.en}\n`);

  if (!WRITE) {
    console.log("Dry run — nothing written. Re-run with --write to apply.");
    return;
  }

  await client
    .patch("faqPage")
    .set({ "heading.en": en.faq.heading, items })
    .commit();

  console.log("patched faqPage heading + items");
  console.log("\nDone. The site revalidates within 60s.");
}

main().catch((err) => {
  console.error(scrub(err?.message ?? String(err)));
  process.exit(1);
});
