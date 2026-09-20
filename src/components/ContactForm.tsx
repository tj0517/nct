"use client";

import { useState } from "react";
import Button from "./Button";

export interface ContactFormDict {
  heading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  consent: string;
  submitCta: string;
}

const inputClasses =
  "bg-union-white/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-union-blue placeholder:text-union-blue/40 outline-none focus:bg-union-white transition-colors";

/* The enquiry form card — always a Union Blue card with white fields, so it
   reads identically on the navy homepage and the white course pages. */
export default function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [consented, setConsented] = useState(false);

  return (
    <div className="bg-union-blue rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[100px] md:rounded-tr-[100px] p-6 md:p-12 flex flex-col gap-4 md:gap-5">
      <input type="text" placeholder={dict.namePlaceholder} className={inputClasses} />
      <input type="email" placeholder={dict.emailPlaceholder} className={inputClasses} />
      <input type="tel" placeholder={dict.phonePlaceholder} className={inputClasses} />

      <textarea
        placeholder={dict.messagePlaceholder}
        rows={3}
        className={`${inputClasses} resize-none`}
      />

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="accent-accent w-4 h-4 mt-0.5 shrink-0"
        />
        <span className="font-inter text-sm text-union-white/80">{dict.consent}</span>
      </label>

      <Button
        variant="filled"
        className="!w-full !h-auto !py-4 !font-normal mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!consented}
      >
        {dict.submitCta}
      </Button>
    </div>
  );
}
