"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";

interface PageHeroProps {
  label: string;
  title: string;
  titleItalic?: string;
  subtitle: string;
  accentWord?: string;
  illustration?: string;
  illustrationAlt?: string;
}

export default function PageHero({
  label,
  title,
  titleItalic,
  subtitle,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const headline = ref.current.querySelector("[data-page-headline]");
      const sub = ref.current.querySelector("[data-page-subtitle]");

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (headline) tl.from(headline, { opacity: 0, y: 60, duration: 0.9 });
      if (sub) tl.from(sub, { opacity: 0, y: 30, duration: 0.7 }, "-=0.4");
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <section
      ref={ref}
      className="w-full px-5 md:px-16 pt-28 md:pt-36 pb-16 md:pb-24"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <p className="font-inter text-sm md:text-base text-accent-text mb-6 md:mb-8">
          {label}
        </p>

        <h1
          data-page-headline
          className="font-fraunces font-bold text-[clamp(42px,8vw,110px)] leading-[0.95] tracking-tight text-main max-w-[1100px] mb-8 md:mb-12"
        >
          {title}
          {titleItalic && (
            <>
              <br />
              <span className="font-normal italic">{titleItalic}</span>
            </>
          )}
        </h1>

        <p
          data-page-subtitle
          className="font-fraunces font-normal text-lg md:text-2xl text-main max-w-[520px] md:ml-auto md:text-right leading-normal"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
