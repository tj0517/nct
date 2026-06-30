"use client";

import { useState } from "react";
import Button from "./Button";
import { useBookingModal } from "./BookingModalContext";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Teachers", href: "/#teachers" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const courseLinks = [
  { label: "Children & Teens", href: "/children" },
  { label: "Adults", href: "/adults" },
  { label: "Business English", href: "/business" },
  { label: "University Applications", href: "/university" },
  { label: "Maths in English", href: "/maths" },
];

export default function Header() {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openBooking = useBookingModal();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-main-bg/70 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-4 flex items-center justify-between">
          <a
            href="/"
            className="font-fraunces font-bold text-3xl lg:text-2xl text-main tracking-tight"
          >
            <span className="lg:hidden">NCT</span>
            <span className="hidden lg:inline">A Nice Cup of Tea</span>
          </a>

          {/* Mobile: hamburger + book now */}
          <div className="flex items-center gap-3 lg:hidden ml-auto">
              <Button variant="filled" size="small" className="" onClick={openBooking}>Book now</Button>
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
                Courses
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
                    {courseLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 font-inter text-[13px] text-main/70 hover:text-accent-text hover:bg-accent-text/5 rounded-lg transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 hover:text-accent-text transition-colors"
              >
                {link.label}
              </a>
            ))}

            <a
              href="tel:+48453374984"
              className="font-inter text-[12px] text-main/50 hover:text-main/80 transition-colors hidden lg:block"
            >
              +48 453 374 984
            </a>

              <Button variant="filled" size="small" className="" onClick={openBooking}>Book now</Button>
          </nav>
        </div>

        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div className="lg:hidden bg-main-bg/95 backdrop-blur-md border-t border-main/10">
            <nav className="flex flex-col px-5 py-6 gap-1">
              {/* Courses section */}
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 py-3 flex items-center gap-1 cursor-pointer"
              >
                Courses
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
                <div className="flex flex-col pl-4 gap-1 pb-2">
                  {courseLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-inter text-[13px] text-main/70 py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 py-3"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

    </>
  );
}
