// Where every "Book now" / "Book your free assessment" CTA on the site points:
// the contact form (id="contact") at the foot of whichever page the visitor
// is on — homepage and all five course pages, phone and desktop alike.
//
// Anthony settled this twice. It was the original decision (2026-09-20), was
// briefly pointed at his Google Calendar appointment schedule (2026-10-12),
// and he reverted it on 2026-10-14: he would rather receive the enquiry and
// agree a time himself than let visitors book straight into his calendar. He
// will review conversion after two or three months.
//
// All six CTAs read this constant and spread `bookingLinkProps`, so moving
// them is a one-line change — but it is a decision, not a detail.
export const BOOKING_URL = "#contact";

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
