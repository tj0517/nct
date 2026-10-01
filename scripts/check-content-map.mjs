// Verifies that every leaf of src/dictionaries/en.json appears in the
// `en.json key` column of docs/sanity-content-map.md.
// Exits 1 on any missing (or stale) entry. NCT-3.02.
import { readFileSync } from "node:fs";

const MAP = "docs/sanity-content-map.md";
const DICT = "src/dictionaries/en.json";

const leaves = [];
(function walk(v, p) {
  if (v === null || typeof v !== "object") return void leaves.push(p);
  if (Array.isArray(v)) return void v.forEach((x, i) => walk(x, `${p}[${i}]`));
  for (const k of Object.keys(v)) walk(v[k], p ? `${p}.${k}` : k);
})(JSON.parse(readFileSync(DICT, "utf8")), "");

// Table rows look like: | 12 | `hero.subtitle` | `homepage` | ... |
const mapped = new Set();
for (const line of readFileSync(MAP, "utf8").split("\n")) {
  const m = line.match(/^\|\s*\d+\s*\|\s*`([^`]+)`\s*\|/);
  if (m) mapped.add(m[1]);
}

const missing = leaves.filter((k) => !mapped.has(k));
const stale = [...mapped].filter((k) => !leaves.includes(k));

console.log(`${DICT}: ${leaves.length} leaves`);
console.log(`${MAP}: ${mapped.size} mapped keys`);
console.log(`missing (in en.json, not in map): ${missing.length}`);
missing.forEach((k) => console.log(`  MISSING  ${k}`));
console.log(`stale (in map, not in en.json): ${stale.length}`);
stale.forEach((k) => console.log(`  STALE    ${k}`));

if (missing.length || stale.length) process.exit(1);
console.log("OK — every en.json leaf has a map entry.");
