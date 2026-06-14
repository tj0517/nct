"use client";

import { useState } from "react";

export default function StickyPhoneBar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+48 453 374 984");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-main border-t border-main-bg/20">
      <div className="max-w-[1440px] mx-auto px-16 py-3 flex items-center justify-between">
        {/* Phone number — click to call */}
        <a
          href="tel:+48453374984"
          className="flex items-center gap-3 group"
        >
          {/* Phone icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-main-bg shrink-0"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="font-inter text-base text-main-bg font-medium group-hover:underline">
            +48 453 374 984
          </span>
        </a>

        <div className="flex items-center gap-6">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-main-bg/70 hover:text-main-bg transition-colors cursor-pointer"
            title="Copy phone number"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-inter text-sm">Copied</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span className="font-inter text-sm">Copy</span>
              </>
            )}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="font-fraunces text-base text-main bg-main-bg px-6 py-2 rounded-bl-[15px] rounded-tr-[15px] hover:bg-main-bg/90 transition-colors"
          >
            Book your free introduction
          </a>
        </div>
      </div>
    </div>
  );
}
