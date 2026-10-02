"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";

export interface ContactFormDict {
  heading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  consent: string;
  submitCta: string;
  sendingCta: string;
  successMessage: string;
  errorMessage: string;
}

type Status = "idle" | "sending" | "success" | "error";

const inputClasses =
  "bg-union-white/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-union-blue placeholder:text-union-blue/40 outline-none focus:bg-union-white transition-colors";

/* The enquiry form card — always a Union Blue card with white fields, so it
   reads identically on the navy homepage and the white course pages. */
export default function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [renderedAt] = useState(() => Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          consent: consented,
          company: data.get("company"),
          startedAt: renderedAt,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) throw new Error("request_failed");

      setStatus("success");
      form.reset();
      setConsented(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-union-blue rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[100px] md:rounded-tr-[100px] p-6 md:p-12 flex flex-col gap-4 md:gap-5"
    >
      {/* Honeypot — real visitors never see or fill this; a bot that does gets
          a normal-looking success with nothing sent (see route.ts). */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="text" name="name" required placeholder={dict.namePlaceholder} className={inputClasses} />
      <input type="email" name="email" required placeholder={dict.emailPlaceholder} className={inputClasses} />
      <input type="tel" name="phone" placeholder={dict.phonePlaceholder} className={inputClasses} />

      <textarea
        name="message"
        required
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
        disabled={!consented || status === "sending"}
      >
        {status === "sending" ? dict.sendingCta : dict.submitCta}
      </Button>

      {status === "success" && (
        <p className="font-inter text-sm text-union-white/90">{dict.successMessage}</p>
      )}
      {status === "error" && (
        <p className="font-inter text-sm text-union-white/90">{dict.errorMessage}</p>
      )}
    </form>
  );
}
