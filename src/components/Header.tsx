"use client";

import { useState } from "react";
import Button from "./Button";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-main-bg/70 backdrop-blur-md">
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
            <button className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 hover:text-main transition-colors flex items-center gap-1 cursor-pointer">
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
                      className="block px-4 py-2.5 font-inter text-[13px] text-main/70 hover:text-main hover:bg-main/5 rounded-lg transition-colors"
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
              className="font-inter text-[13px] uppercase tracking-[0.08em] text-main/70 hover:text-main transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact">
            <Button variant="filled" size="small">Book now</Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
