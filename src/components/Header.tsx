"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./Button";
import type { Locale } from "@/dictionaries";
import { localePath } from "@/lib/locale-path";
import { BOOKING_URL, bookingLinkProps } from "@/lib/booking";

interface HeaderDict {
  coursesLabel: string;
  courseLinks: { label: string; href: string }[];
  navLinks: { label: string; href: string }[];
  bookNow: string;
}

/* Flags are drawn inline: the repo has no icon package and these are the only
   two it needs. Both sit in the same 3:2 box so swapping one for the other
   never shifts the bar — the Union Flag's true ratio is 1:2, and its diagonals are drawn without the
   counterchange; neither reads at 22px. */
function FlagPL({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" width="22" height="15" className={className} aria-hidden>
      <rect width="60" height="20" fill="#ffffff" />
      <rect y="20" width="60" height="20" fill="#DC143C" />
    </svg>
  );
}

function FlagGB({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" width="22" height="15" className={className} aria-hidden>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#ffffff" strokeWidth="8" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3.2" />
      <path d="M30 0v40M0 20h60" stroke="#ffffff" strokeWidth="13.3" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}

/* One flag, pointing at the other language: the Polish flag on the English
   site, the Union Flag on the Polish one (Anthony 2026-10-28 — it replaced the
   PL/EN slider). Links to the same page in that language.

   Both the server (which renders the rewritten /pl/... path) and the browser
   (which shows the unprefixed one) strip the locale before building the href,
   so the two always agree and hydration never mismatches.

   While the Polish version is switched off in Sanity there is nothing to
   switch to, so the Polish flag is not shown at all. */
function LocaleFlag({ lang, polishLive }: { lang: Locale; polishLive: boolean }) {
  const pathname = usePathname() ?? "/";
  const target: Locale = lang === "en" ? "pl" : "en";
  if (target === "pl" && !polishLive) return null;
  // "/", "/pl" and "/en" all reduce to "" — the homepage is "/en", not "/en/".
  const page = pathname.replace(/^\/(pl|en)(?=\/|$)/, "").replace(/\/$/, "");
  const href = localePath(page, target, polishLive) || "/";
  const Flag = target === "pl" ? FlagPL : FlagGB;

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={target === "pl" ? "Wersja polska" : "English version"}
      className="flex shrink-0 opacity-90 hover:opacity-100 transition-opacity"
    >
      <Flag className="rounded-[2px] ring-1 ring-main/25" />
    </a>
  );
}

/* The contact form sits at the foot of every page and "Book now" already goes
   there, so the desktop bar drops Contact (Anthony 2026-10-28). The mobile menu
   keeps it, pointed — like "Book now" — at the form on the page being read
   rather than the homepage's, so it never waits on a second page load. Both
   handled here because the link list itself comes from Sanity ("/#contact"). */
const isContactLink = (href: string) => href.endsWith("#contact");

export default function Header({
  dict,
  lang,
  phone,
  polishLive,
}: {
  dict: HeaderDict;
  lang: Locale;
  /** Shown as plain, selectable text in the desktop bar — not a tel: link. */
  phone: string;
  /** Sanity's "Polish version live" switch — see locale-content.ts. */
  polishLive: boolean;
}) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-main-bg/70 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-3 min-[400px]:px-5 md:px-16 py-4 flex items-center justify-between gap-2">
          <a
            href={localePath("/", lang, polishLive)}
            className="font-cormorant-garamond font-semibold text-[15px] min-[400px]:text-base sm:text-xl lg:text-2xl text-main tracking-tight whitespace-nowrap shrink min-w-0 overflow-hidden text-ellipsis"
          >
            A Nice Cup of Tea
          </a>

          {/* Mobile: always-visible Book now CTA + hamburger */}
          <div className="flex items-center gap-2 lg:hidden ml-auto shrink-0">
            <a href={BOOKING_URL} {...bookingLinkProps}>
              <Button
                variant="filled"
                size="small"
                className="!px-3.5 !py-2 !text-[13px] min-[400px]:!text-sm"
              >
                {dict.bookNow}
              </Button>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="flex flex-col gap-[5px] cursor-pointer p-2.5 rounded-lg bg-main/10"
            >
              <span className={`block w-6 h-[2px] bg-main transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-6 h-[2px] bg-main transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[2px] bg-main transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <LocaleFlag lang={lang} polishLive={polishLive} />

            {/* Courses dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 hover:text-accent-text transition-colors flex items-center gap-1 cursor-pointer">
                {dict.coursesLabel}
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className={`transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {coursesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-main-bg border border-main/15 rounded-bl-[20px] rounded-tr-[20px] py-3 px-2 min-w-[220px] shadow-lg">
                    {dict.courseLinks.map((link) => (
                      <a
                        key={link.href}
                        href={localePath(link.href, lang, polishLive)}
                        className="block px-4 py-2.5 font-inter text-[13px] text-main/70 hover:text-accent-text hover:bg-accent-text/5 rounded-lg transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {dict.navLinks
              .filter((link) => !isContactLink(link.href))
              .map((link) => (
                <a
                  key={link.href}
                  href={localePath(link.href, lang, polishLive)}
                  className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 hover:text-accent-text transition-colors"
                >
                  {link.label}
                </a>
              ))}

            <span className="font-inter text-[13px] tracking-[0.08em] text-main/70 whitespace-nowrap">
              {phone}
            </span>

            <a href={BOOKING_URL} {...bookingLinkProps}>
              <Button variant="filled" size="small">{dict.bookNow}</Button>
            </a>
          </nav>
        </div>

        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div className="lg:hidden bg-main-bg/95 backdrop-blur-md border-t border-main/10">
            <nav className="flex flex-col px-5 py-6 gap-1">
              {/* Courses — links shown immediately, no extra tap to expand */}
              <p className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/40 py-2">
                {dict.coursesLabel}
              </p>
              <div className="flex flex-col pl-4 gap-1 pb-2">
                {dict.courseLinks.map((link) => (
                  <a
                    key={link.href}
                    href={localePath(link.href, lang, polishLive)}
                    onClick={() => setMobileOpen(false)}
                    className="font-inter text-sm text-main/80 py-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {dict.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={isContactLink(link.href) ? "#contact" : localePath(link.href, lang, polishLive)}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 py-3"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-main/10 mt-2">
                <LocaleFlag lang={lang} polishLive={polishLive} />
              </div>
            </nav>
          </div>
        )}
      </header>

    </>
  );
}
