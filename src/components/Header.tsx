"use client";

import { useState } from "react";
import Button from "./Button";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Teachers", href: "#teachers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
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
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-main-bg/70 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-16 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-fraunces font-bold text-2xl text-main tracking-tight"
        >
          A Nice Cup of Tea
        </a>

        <nav className="flex items-center gap-10">
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
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle colour scheme"
            className="relative w-[52px] h-[28px] rounded-full border border-main/20 cursor-pointer transition-colors duration-500 flex-shrink-0"
            style={{
              background: theme === "light" ? "var(--second-bg)" : "rgba(255,255,255,0.15)",
            }}
          >
            <span
              className="absolute top-[3px] w-[20px] h-[20px] rounded-full transition-all duration-300 ease-[cubic-bezier(.19,1,.22,1)] flex items-center justify-center text-[11px]"
              style={{
                left: theme === "light" ? "3px" : "27px",
                background: theme === "light" ? "var(--main)" : "#FFFFFF",
              }}
            >
              {theme === "light" ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme === "light" ? "#FFFFFF" : "#012169"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#012169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </span>
          </button>

          <a href="#contact">
            <Button variant="filled" size="small">Book now</Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
