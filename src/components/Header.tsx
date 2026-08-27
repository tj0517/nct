"use client";

import { useState } from "react";
import Button from "./Button";
import type { Locale } from "@/dictionaries";
import { localePath } from "@/lib/locale-path";
import { BOOKING_URL } from "@/lib/booking";

interface HeaderDict {
  coursesLabel: string;
  courseLinks: { label: string; href: string }[];
  navLinks: { label: string; href: string }[];
  bookNow: string;
}

function LanguageSwitcher({ lang }: { lang: Locale }) {
  const [pending, setPending] = useState<Locale | null>(null);

  function switchLocale(targetLocale: Locale) {
    // Polish copy isn't ready yet — the toggle stays interactive/animated,
    // but doesn't actually navigate or change the site's language.
    setPending(targetLocale);
  }

  const isEn = (pending ?? lang) === "en";

  return (
    <div className="flex items-center gap-2 font-inter text-[11px] font-bold tracking-[0.08em]">
      <span className={`transition-colors duration-300 ${!isEn ? "text-main" : "text-main/40"}`}>PL</span>

      <button
        type="button"
        role="switch"
        aria-checked={isEn}
        aria-label={isEn ? "Przełącz na polski" : "Switch to English"}
        onClick={() => switchLocale(isEn ? "pl" : "en")}
        className={`relative w-16 h-8 shrink-0 border-2 border-main-bg/70 shadow-[0_6px_12px_rgba(1,33,105,0.25)] cursor-pointer transition-[border-radius,background-color] duration-700 ease-[cubic-bezier(.19,1,.22,1)] ${
          isEn
            ? "bg-accent rounded-tl-[32px] rounded-tr-[32px] rounded-br-[10px] rounded-bl-[32px]"
            : "bg-main rounded-tl-[10px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[32px]"
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-1/2 -translate-y-1/2 size-[22px] border-2 border-main-bg/70 transition-[left,border-radius,background-color] duration-700 ease-[cubic-bezier(.19,1,.22,1)] ${
            isEn
              ? "left-[calc(100%-26px)] bg-main rounded-tl-[32px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px]"
              : "left-1 bg-accent rounded-tl-[8px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[32px]"
          }`}
        />
      </button>

      <span className={`transition-colors duration-300 ${isEn ? "text-main" : "text-main/40"}`}>EN</span>
    </div>
  );
}

export default function Header({
  dict,
  lang,
}: {
  dict: HeaderDict;
  lang: Locale;
}) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-main-bg/70 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-3 min-[400px]:px-5 md:px-16 py-4 flex items-center justify-between gap-2">
          <a
            href={localePath("/", lang)}
            className="font-cormorant-garamond font-semibold text-[15px] min-[400px]:text-base sm:text-xl lg:text-2xl text-main tracking-tight whitespace-nowrap shrink min-w-0 overflow-hidden text-ellipsis"
          >
            A Nice Cup of Tea
          </a>

          {/* Mobile: always-visible Book now CTA + hamburger */}
          <div className="flex items-center gap-2 lg:hidden ml-auto shrink-0">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
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
                        href={localePath(link.href, lang)}
                        className="block px-4 py-2.5 font-inter text-[13px] text-main/70 hover:text-accent-text hover:bg-accent-text/5 rounded-lg transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {dict.navLinks.map((link) => (
              <a
                key={link.href}
                href={localePath(link.href, lang)}
                className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 hover:text-accent-text transition-colors"
              >
                {link.label}
              </a>
            ))}

            <LanguageSwitcher lang={lang} />

              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
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
                    href={localePath(link.href, lang)}
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
                  href={localePath(link.href, lang)}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 py-3"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-main/10 mt-2">
                <LanguageSwitcher lang={lang} />
              </div>
            </nav>
          </div>
        )}
      </header>

    </>
  );
}
