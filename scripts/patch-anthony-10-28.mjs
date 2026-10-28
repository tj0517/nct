// One-off: writes the Polish homepage headline (Anthony 2026-10-28,
// "Angielski godny korony") to the `pl` side of the hero fields in the Sanity
// `production` dataset.
//
// Why Sanity and not only src/dictionaries/pl-overrides.ts: get-content.ts
// reads Sanity "pl", then Sanity "en", then the dictionary. The hero's "en"
// fields are filled, so without a "pl" value the Polish page would show
// "Speak the King's English". Only the three `.pl` keys are set; the English
// text and every other field are left alone.
//
// The values are repeated from pl-overrides.ts (Node 20 cannot import .ts);
// keep the two in step.
//
// Modes: --dry-run (default) prints before/after and writes nothing; --write applies.
// Run: node --env-file=.env.local scripts/patch-anthony-10-28.mjs [--write]
import { createClient } from "@sanity/client";

const HEADLINE_PL = {
  headlineLine1: "Angielski",
  headlineItalic: "godny",
  headlineBold: " korony",
};

async function main() {
  const WRITE = process.argv.includes("--write");
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = WRITE ? process.env.SANITY_WRITE_TOKEN : undefined;

  console.log(`Target: project=${projectId || "(missing)"} dataset=${dataset} write=${WRITE}\n`);
  if (WRITE && (!projectId || !token)) {
    console.error("NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN must be set. Refusing to write.");
    process.exit(1);
  }

  const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: false, token });
  const hero = await client.fetch(`*[_id == "homepage"][0].hero`);

  for (const [field, value] of Object.entries(HEADLINE_PL)) {
    console.log(`homepage.hero.${field}.pl`);
    console.log("  en:    ", JSON.stringify(hero?.[field]?.en ?? null));
    console.log("  before:", JSON.stringify(hero?.[field]?.pl ?? null));
    console.log("  after: ", JSON.stringify(value), "\n");
  }

  if (!WRITE) {
    console.log("Dry run — nothing written. Re-run with --write to apply.");
    return;
  }

  await client
    .patch("homepage")
    .set(Object.fromEntries(Object.entries(HEADLINE_PL).map(([f, v]) => [`hero.${f}.pl`, v])))
    .commit();
  console.log("patched homepage.hero.{headlineLine1,headlineItalic,headlineBold}.pl");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
