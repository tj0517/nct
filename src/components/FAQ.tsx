"use client";

import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./GsapProvider";

interface FAQDict {
  label: string;
  heading: string;
  items: { question: string; answer: string }[];
}

export default function FAQ({ dict }: { dict: FAQDict }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  const toggle = useCallback(
    (i: number) => {
      const isOpen = openIndex === i;
      const el = answerRefs.current[i];

      if (isOpen) {
        // Close
        if (el) {
          if (reduced) {
            el.style.height = "0px";
            el.style.overflow = "hidden";
          } else {
            gsap.to(el, {
              height: 0,
              duration: 0.35,
              ease: "power2.inOut",
              onComplete: () => {
                el.style.overflow = "hidden";
              },
            });
          }
        }
        setOpenIndex(null);
      } else {
        // Close previous
        if (openIndex !== null) {
          const prev = answerRefs.current[openIndex];
          if (prev) {
            if (reduced) {
              prev.style.height = "0px";
              prev.style.overflow = "hidden";
            } else {
              gsap.to(prev, {
                height: 0,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => {
                  prev.style.overflow = "hidden";
                },
              });
            }
          }
        }

        // Open new
        if (el) {
          el.style.overflow = "hidden";
          if (reduced) {
            el.style.height = "auto";
          } else {
            gsap.fromTo(
              el,
              { height: 0 },
              { height: "auto", duration: 0.4, ease: "power2.out" }
            );
          }
        }
        setOpenIndex(i);
      }
    },
    [openIndex, reduced]
  );

  return (
    <section className="bg-second-bg pt-28 md:pt-40 pb-16 md:pb-32 w-full flex flex-col gap-[10px] px-5 md:px-16">
      <h2 className="font-fraunces font-bold text-3xl md:text-[64px] text-main leading-tight md:leading-normal">
        {dict.heading}
      </h2>

      <div className="flex flex-col pt-8 md:pt-16">
        {dict.items.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-main">
              <button
                onClick={() => toggle(i)}
                className="flex items-center gap-2 md:gap-[10px] p-3 md:p-4 w-full cursor-pointer group transition-colors duration-300 hover:bg-main/5 rounded-lg"
              >
                {/* Number circle */}
                <div
                  className={`rounded-full size-10 md:size-16 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-main scale-110"
                      : "bg-main-bg group-hover:bg-main group-hover:scale-110"
                  }`}
                >
                  <span
                    className={`font-fraunces font-normal text-lg md:text-[28px] transition-colors duration-300 ${
                      isOpen
                        ? "text-main-bg"
                        : "text-main group-hover:text-main-bg"
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Question */}
                <div className="flex-1 flex items-center md:justify-center">
                  <p className="font-fraunces font-normal text-base md:text-2xl text-main text-left md:text-center w-full transition-transform duration-300 group-hover:translate-x-2">
                    {faq.question}
                  </p>
                </div>

                {/* Arrow button */}
                <div
                  className={`bg-main rounded-full size-10 md:size-16 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "scale-110"
                      : "group-hover:scale-110 group-hover:bg-main-bg group-hover:ring-2 group-hover:ring-main"
                  }`}
                >
                  <span
                    className={`font-fraunces font-black text-2xl md:text-[36px] transition-all duration-300 inline-block ${
                      isOpen
                        ? "text-main-bg rotate-90"
                        : "text-main-bg group-hover:text-main"
                    }`}
                  >
                    &gt;
                  </span>
                </div>
              </button>

              {/* Answer - GSAP animated height */}
              <div
                ref={(el) => {
                  answerRefs.current[i] = el;
                }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="pb-6">
                  <p className="font-fraunces font-light text-base md:text-lg text-main leading-relaxed px-4 pl-14 pr-14 md:pl-[90px] md:pr-[90px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
