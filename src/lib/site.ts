import type { Dictionary } from "@/dictionaries";

/**
 * The school's own contact details — phone, e-mail, address, NIP, bank account
 * and social profiles. One source for the footer, the icon row beside the
 * contact form and the JSON-LD, filled from `siteSettings` in Sanity and
 * falling back to `en.json` (see `getContent()`).
 */
export type SiteDict = Dictionary["site"];

/** `tel:` href — the dialler wants digits and a leading +, nothing else. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/**
 * Splits the single address string ("Słupecka 4/45, Warsaw, 02-309") into the
 * parts the footer sets on two lines and the JSON-LD needs separately. Anything
 * that doesn't look like a Polish post code is treated as part of the locality,
 * and a comma-less address simply becomes the street.
 */
export function parseAddress(address: string): {
  street: string;
  locality: string;
  postalCode: string;
  /** Everything after the street, as the footer's muted second line. */
  rest: string;
} {
  const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
  const [street = "", ...tail] = parts;
  const postalCode = tail.find((p) => /^\d{2}-\d{3}$/.test(p)) ?? "";
  const locality = tail.filter((p) => p !== postalCode).join(", ");
  return { street, locality, postalCode, rest: tail.join(", ") };
}
