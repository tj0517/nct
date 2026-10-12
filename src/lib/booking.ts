// Where every "Book now" / "Book your free assessment" CTA on the site points:
// the school's Google Calendar appointment schedule (Anthony 2026-10-12).
//
// This supersedes the 2026-09-20 decision to route enquiries through the
// contact form first. All six CTAs read this constant and spread
// `bookingLinkProps` (Header x2, Hero, Pricing, CourseHero on the five course
// pages), so pointing them elsewhere is a one-line change.
//
// The "Contact" link in the header is deliberately separate and still goes to
// the form (Anthony 2026-10-07), so the form stays reachable.
export const BOOKING_URL = "https://calendar.app.google/R3duMzzaJQBKy8Lc6";

/** True while the CTAs jump within the page rather than off to a scheduler. */
export const isInPageBooking = BOOKING_URL.startsWith("#");

/**
 * Spread onto every booking CTA's `<a>`. An in-page anchor needs nothing; an
 * external scheduler opens in a new tab, so a visitor who books does not lose
 * the page they were reading.
 */
export const bookingLinkProps = isInPageBooking
  ? ({} as const)
  : ({ target: "_blank", rel: "noopener noreferrer" } as const);
