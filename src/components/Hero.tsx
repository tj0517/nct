"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";
import Button from "./Button";

const BOOKING_URL = "https://calendar.app.google/R3duMzzaJQBKy8Lc6";

interface HeroDict {
  headlineLine1: string;
  headlineItalic: string;
  headlineBold: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryShort: string;
  ctaPhone: string;
}

export default function Hero({ dict }: { dict: HeroDict }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const headline = ref.current.querySelector("[data-hero-headline]");
      const subtitle = ref.current.querySelector("[data-hero-subtitle]");
      const ctas = ref.current.querySelector("[data-hero-ctas]");
      const images = ref.current.querySelectorAll("[data-hero-image]");

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (headline) tl.from(headline, { opacity: 0, y: 30, duration: 0.7 });
      if (subtitle) tl.from(subtitle, { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
      if (images.length) tl.from(images, { opacity: 0, scale: 0.95, duration: 0.8 }, "-=0.3");
      if (ctas) tl.from(ctas, { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <section ref={ref} className="w-full flex-1 px-5 md:px-16 pt-20 md:pt-24 lg:pt-36 pb-20 lg:pb-0 flex items-start">
      <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-20 w-full">
        {/* Left: headline + subtitle + CTAs, stacked with normal spacing */}
        <div className="relative z-10 flex flex-1 min-w-0 flex-col gap-4 md:gap-8 items-start">
          <h1
            data-hero-headline
            className="font-fraunces font-bold text-[14vw] md:text-[8vw] leading-none text-main"
          >
            <span className="block">{dict.headlineLine1}</span>
            <span>
              <span className="font-normal italic">{dict.headlineItalic}</span>
              <span className="font-bold">{dict.headlineBold}</span>
            </span>
          </h1>

          <p
            data-hero-subtitle
            className="font-fraunces font-normal text-lg md:text-2xl text-main max-w-[561px] leading-normal"
          >
            {dict.subtitle.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && " "}
                {i > 0 && <br className="hidden md:inline" />}
                {line}
              </span>
            ))}
          </p>

          <div data-hero-ctas className="flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-[38px] items-stretch lg:items-center w-full lg:w-auto">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="filled">
                <span className="md:hidden lg:inline">{dict.ctaPrimaryShort}</span>
                <span className="hidden md:inline lg:hidden">{dict.ctaPrimary}</span>
              </Button>
            </a>
            <a href={`tel:${dict.ctaPhone.replace(/\s/g, "")}`}>
              <Button variant="outline">{dict.ctaPhone}</Button>
            </a>
          </div>
        </div>

        {/* King illustration — desktop only (lg+), sits beside the text. Hidden at
            tablet since the layout is still stacked there and the King would land
            under the CTAs instead of next to the text. */}
        <div
          data-hero-image
          className="relative hidden lg:block lg:w-[28vw] lg:max-w-[440px] aspect-[1024/1536] lg:shrink-0"
        >
          <Image
            src="/images/king-hero.png"
            alt="Illustration of the King of Hearts reading a letter"
            fill
            sizes="(max-width: 1024px) 100vw, 28vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
