"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";
import Button from "./Button";
import { BOOKING_URL } from "@/lib/booking";

interface HeroDict {
  headlineLine1: string;
  headlineItalic: string;
  headlineBold: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryShort: string;
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
    <section ref={ref} className="w-full min-h-[100svh] md:min-h-0 px-[6vw] md:px-16 pt-20 md:pt-24 pb-8 md:pb-10 lg:pb-12 flex items-stretch md:items-start lg:items-center">
      <div className="relative flex flex-col gap-8 w-full">
        {/* Left: headline + subtitle + CTAs, stacked with normal spacing. Capped
            from md so the column never runs under the absolutely-positioned King;
            slightly wider at lg where the CTAs need room to sit inline. */}
        <div className="relative z-10 flex flex-1 min-w-0 flex-col md:justify-start gap-0 md:gap-8 items-start md:max-w-[55%] lg:max-w-[58%]">
          {/* Phone-only spacers, weighted 1 : 1 : 2. Free height splits a quarter
              above the headline, a quarter between subtitle and CTA, and half
              below — so the CTA sits where a centred block would put it while
              the headline + subtitle ride higher. Hidden from md. */}
          <div aria-hidden className="grow md:hidden" />
          <div className="relative w-full md:contents">
            <h1
              data-hero-headline
              className="pr-[min(40vw,300px)] md:pr-0 font-fraunces font-bold text-[min(12vw,84px)] md:text-[8vw] leading-none text-main"
            >
              {/* Phones: every word owns its own line (block) with the King beside
                  it. From md the words flow inline again ("Speak the" / "King's
                  English") and the two-column layout takes over. */}
              <span className="block md:inline">
                {dict.headlineLine1.split(" ").map((word, i) => (
                  <span key={i} className="block md:inline">
                    {word}
                    <span className="hidden md:inline"> </span>
                  </span>
                ))}
              </span>
              <span className="block">
                <span className="block md:inline font-normal italic">{dict.headlineItalic}</span>
                <span className="block md:inline font-bold">{dict.headlineBold}</span>
              </span>
            </h1>

            {/* King illustration — phones only (below md). Absolutely positioned
                top-right beside the headline (out of flow, so he never stretches
                this row or pushes the subtitle down); he scales with the headline
                height, so he stays proportionally large across the whole range.
                The headline reserves space for him via its right padding. From md
                the content-height King takes over. */}
            <div
              data-hero-image
              className="pointer-events-none absolute top-0 right-0 h-full aspect-874/1101 md:hidden"
            >
              <Image
                src="/images/king-hero.png"
                alt="Illustration of the King of Hearts reading a letter"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <p
            data-hero-subtitle
            className="mt-9 md:mt-0 font-fraunces font-normal text-[5.4vw] sm:text-xl lg:text-2xl text-main max-w-[561px] leading-relaxed sm:leading-normal"
          >
            {/* Each fact on its own line at every breakpoint — sentences never wrap mid-line */}
            {dict.subtitle.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>

          {/* Single CTA: full-width on phones (capped), auto-width from md.
              On phones it sits after the middle spacer (see above). */}
          <div aria-hidden className="grow md:hidden" />
          <div data-hero-ctas className="mt-9 md:mt-0 flex w-full max-w-[440px] md:max-w-none">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
              <Button variant="filled" className="!w-full md:!text-lg xl:!text-2xl lg:!px-8">{dict.ctaPrimaryShort}</Button>
            </a>
          </div>
          <div aria-hidden className="grow-[2] md:hidden" />
        </div>

        {/* King illustration — md and up (below md the inline King beside the
            headline is shown instead, so he's never hidden at any breakpoint).
            inset-y-0 pins him to the exact height of the text column — crown level
            with the headline, base level with the CTAs — and aspect-ratio derives
            his width from that height, so he scales with the content itself. The
            42% cap keeps him clear of the text on narrow screens; when it binds he
            stays top-anchored, crown level with the headline. */}
        <div
          data-hero-image
          className="pointer-events-none absolute inset-y-0 right-0 hidden md:block aspect-874/1101 max-w-[42%]"
        >
          <Image
            src="/images/king-hero.png"
            alt="Illustration of the King of Hearts reading a letter"
            fill
            sizes="42vw"
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
