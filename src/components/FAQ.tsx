"use client";

import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./GsapProvider";

const faqs = [
  {
    question: "What is A Nice Cup of Tea?",
    answer:
      "A Nice Cup of Tea, or NCT, is a premium English tutoring school based in Warsaw and online. We offer English lessons with native-speaker teachers for adults, children, teenagers, business professionals, students applying to universities abroad, and students who need Maths support in English.",
  },
  {
    question: "What happens during the free consultation?",
    answer:
      "The free consultation is a full 60-minute lesson with Anthony Goltz, the founder of NCT. It includes a level assessment, needs analysis, diagnostic teaching, and a recommendation about the best teacher and lesson plan. It can take place online or face-to-face. It is always free and there is no obligation to continue.",
  },
  {
    question: "How much do lessons cost?",
    answer:
      "The first 60-minute consultation lesson is free. Children\u2019s lessons are 225 PLN per 60-minute lesson. Adults and Business English are 250 PLN per 60-minute lesson. Small groups start from 300 PLN per 60-minute session per group. University application programmes and Maths tuition are priced after consultation.",
  },
  {
    question: "How is NCT different from a normal language school?",
    answer:
      "NCT is smaller, more personal, and more tailored than a standard language school. Lessons are not based on a mechanical textbook march. Students work with experienced native-speaker teachers who correct carefully, adapt to the student\u2019s goals, and focus on real English for real situations.",
  },
  {
    question: "Do you offer online lessons?",
    answer:
      "Yes. NCT offers online English lessons across Poland and internationally. Lessons can take place on Zoom, Google Meet, Microsoft Teams, WhatsApp video, or another platform preferred by the student.",
  },
  {
    question: "How can I book a free consultation?",
    answer:
      "You can book your free consultation by WhatsApp, phone, or the contact form. You can write in Polish or English. The Polish phone number is +48 453 374 984.",
  },
];

export default function FAQ() {
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
    <section className="bg-second-bg pt-16 pb-32 w-full flex flex-col gap-[10px] px-16">
      <p className="font-inter text-base text-accent-text">FAQ</p>
      <h2 className="font-fraunces font-bold text-[64px] text-main leading-normal">
        Got questions? We&apos;ve got answers.
      </h2>

      <div className="flex flex-col pt-16">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-main">
              <button
                onClick={() => toggle(i)}
                className="flex items-center gap-[10px] p-4 w-full cursor-pointer group transition-colors duration-300 hover:bg-main/5 rounded-lg"
              >
                {/* Number circle — inverts on hover */}
                <div
                  className={`rounded-full size-16 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-main scale-110"
                      : "bg-main-bg group-hover:bg-main group-hover:scale-110"
                  }`}
                >
                  <span
                    className={`font-fraunces font-normal text-[28px] transition-colors duration-300 ${
                      isOpen
                        ? "text-main-bg"
                        : "text-main group-hover:text-main-bg"
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Question */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="font-fraunces font-normal text-2xl text-main text-center w-full transition-transform duration-300 group-hover:translate-x-2">
                    {faq.question}
                  </p>
                </div>

                {/* Arrow button — scales and rotates on hover */}
                <div
                  className={`bg-main rounded-full size-16 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "scale-110"
                      : "group-hover:scale-110 group-hover:bg-main-bg group-hover:ring-2 group-hover:ring-main"
                  }`}
                >
                  <span
                    className={`font-fraunces font-black text-[36px] transition-all duration-300 inline-block ${
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
                  <p className="font-fraunces font-light text-lg text-main leading-relaxed px-4 pl-[90px] pr-[90px]">
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
