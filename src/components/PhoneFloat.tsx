"use client";

import { useState } from "react";

export default function PhoneFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 md:bottom-20 md:right-8 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 bg-main-bg rounded-bl-[20px] rounded-tr-[20px] border border-main-bg/20 shadow-lg overflow-hidden">
          <a
            href="tel:+48453374984"
            className="flex items-center gap-3 px-5 py-3 font-inter text-sm text-main hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call
          </a>
          <a
            href="sms:+48453374984"
            className="flex items-center gap-3 px-5 py-3 font-inter text-sm text-main hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            SMS
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Call or text us"
        aria-expanded={open}
        className="size-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </button>
    </div>
  );
}
