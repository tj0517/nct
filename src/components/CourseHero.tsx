"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";
import Button from "./Button";
import { BOOKING_URL, bookingLinkProps } from "@/lib/booking";

export interface CourseHeroDict {
  /** Headline, one entry per line. `italic` lines render in the light italic cut. */
  headline: { text: string; italic?: boolean }[];
  /** Subtitle; each "\n"-separated line stays on its own line. */
  subtitle: string;
  cta: string;
  /** Shorter label for phones, like the homepage hero (falls back to `cta`). */
  ctaShort?: string;
  illustrationAlt: string;
}

export interface CourseIllustration {
  src: string;
  width: number;
  height: number;
  /** Lane the character stands in. "wide" is for near-square art — see IMAGE_FIT. */
  fit?: keyof typeof IMAGE_FIT;
  /**
   * How many trailing paragraphs keep the character's strip clear, overriding
   * the lane's default. This belongs to the copy, not the artwork: two pages
   * can share a lane and still need a different split because one has three
   * short paragraphs and the other two long ones.
   */
  besideParagraphs?: number;
}

/**
 * Landing-page hero for the course sub-pages (Adults, Children & Teens, …).
 * Mirrors the homepage hero: stacked headline on the left, a Tenniel-style
 * character standing beside it on the right, subtitle, one crimson CTA.
 * The illustration is out of flow and sized from the text it stands beside,
 * so it scales with the copy rather than pushing it around.
 */
/* Headline scale, chosen from the longest line so every line stays unbroken
   from md up (the text column is ~58% of the 1440px container). Fraunces
   Bold runs ≈0.55em per character. The "statement" tier lets long lines wrap
   across the character's lane; the other two keep clear of him. */
const HEADLINE_SCALE = {
  /* ≤ 9 chars — "English / for / Adults" */
  hero: "text-[min(12.5vw,88px)] md:text-[min(8.5vw,12vh)] xl:text-[min(124px,12vh)]",
  /* 10–13 chars — "University / applications" */
  wide: "text-[min(9.5vw,72px)] md:text-[min(6.8vw,10vh)] xl:text-[min(98px,10vh)]",
  /* ≥ 14 chars — "The boardroom presentation." */
  statement: "text-[min(8vw,44px)] md:text-[min(3.2vw,5.5vh)] xl:text-[min(50px,5.5vh)]",
} as const;

/* The character's lane: how much room the copy keeps clear on the right, and
   how wide his two slots may grow.

   The default lane reserves a strip down the whole headline + subtitle block.
   That is right only when the character is tall enough to fill it. He rarely
   is: with the width cap binding on a phone, his drawn height is
   `laneWidth / ratio`, so a 36vw lane at ratio 0.68 is ~53vw tall against a
   block twice that — the copy ends up in a narrow gutter beside a lot of
   nothing. The "wide" and "tall" lanes fix that by reserving only the trailing
   paragraphs he actually stands beside and letting everything above run full
   width; `min-h` gives that group his height as a floor so short copy can
   never let him creep upwards.

   Written out in full because Tailwind only generates classes it can see as
   literals — the floors are `laneWidth / ratio` rounded up. */
const IMAGE_FIT = {
  /* Tall portraits (ratios 0.47–0.75). The slot is the full height of the
     headline + subtitle row, so the character stands beside all of it and the
     whole block keeps the same strip clear. */
  default: {
    besideParagraphs: 0,
    headlineReserve: "pr-[38vw] md:pr-0",
    blockReserve: "pr-[38vw] md:pr-0",
    besideReserve: "",
    mobileBox: "h-full max-w-[36vw]",
    mobileSizes: "36vw",
    desktop: "max-w-[40%]",
    desktopSizes: "40vw",
    align: "object-bottom",
  },
  /* Near-square art — Alice and the whole curtain-and-door scene (0.99). She
     is only as tall as she is wide, so on a phone she stands beside the final
     paragraph and nothing else: the headline and every earlier paragraph run
     full width, and only the last one keeps her strip clear. `min-h` gives
     that paragraph her height as a floor, so a short closing line can never
     let her creep up into the copy above. Written out in full because
     Tailwind only generates classes it can see as literals. */
  wide: {
    besideParagraphs: 1,
    headlineReserve: "pr-0",
    blockReserve: "",
    besideReserve: "pr-[46vw] min-h-[43vw] md:pr-0 md:min-h-0",
    mobileBox: "w-[42vw]",
    mobileSizes: "42vw",
    desktop: "max-w-[42%]",
    desktopSizes: "42vw",
    align: "object-right-bottom",
  },
  /* A tall portrait that still only reaches the foot of the copy. At 36vw wide
     and a 0.68 ratio the herald is ~53vw tall, about the height of the last two
     paragraphs — so those two keep his strip clear and everything above runs
     full width. Same idea as "wide", different arithmetic: the floor matches
     his height, not his width. */
  tall: {
    besideParagraphs: 2,
    headlineReserve: "pr-0",
    blockReserve: "",
    besideReserve: "pr-[38vw] min-h-[53vw] md:pr-0 md:min-h-0",
    mobileBox: "w-[36vw]",
    mobileSizes: "36vw",
    desktop: "max-w-[40%]",
    desktopSizes: "40vw",
    align: "object-bottom",
  },
} as const;

/* Phone CTA size. The button's hover sweep clips its label to a single line,
   so a longer sentence has to be set smaller rather than wrap. The label runs
   ≈20.2px wide per px of font size, against a button of 88vw — "long" keeps
   Anthony's full wording on a 320px phone. From md the label has room. */
const CTA_SCALE = {
  /* ≤ 38 chars — "Book your free 30-minute assessment" */
  default: "!text-[clamp(14px,4.8vw,18px)]",
  /* longer — "Book your child's free 30-minute assessment" */
  long: "!text-[clamp(12.5px,4.15vw,18px)]",
} as const;

function headlineScale(lines: CourseHeroDict["headline"]) {
  const longest = Math.max(...lines.map((l) => l.text.length));
  return longest <= 9 ? "hero" : longest <= 13 ? "wide" : "statement";
}

export default function CourseHero({
  dict,
  illustration,
}: {
  dict: CourseHeroDict;
  illustration: CourseIllustration;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const aspect = `${illustration.width} / ${illustration.height}`;
  const tier = headlineScale(dict.headline);
  const scale = HEADLINE_SCALE[tier];
  const fit = IMAGE_FIT[illustration.fit ?? "default"];

  /* Which paragraphs stand beside the character. A lane with
     `besideParagraphs: 0` keeps the old shape — the reserve sits on the whole
     block and nothing is grouped. Otherwise the trailing N are wrapped in one
     block that carries the reserve and his height as a floor, so a short
     closing paragraph can never let him creep into the copy above. */
  const subtitleLines = dict.subtitle.split("\n");
  const besideCount = illustration.besideParagraphs ?? fit.besideParagraphs;
  const besideFrom = besideCount
    ? Math.max(0, subtitleLines.length - besideCount)
    : subtitleLines.length;
  const subtitle = {
    lead: subtitleLines.slice(0, besideFrom),
    beside: subtitleLines.slice(besideFrom),
  };
  const ctaScale = CTA_SCALE[dict.cta.length <= 38 ? "default" : "long"];

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const headline = ref.current.querySelectorAll("[data-hero-line]");
      const rule = ref.current.querySelector("[data-hero-rule]");
      const subtitle = ref.current.querySelector("[data-hero-subtitle]");
      const ctas = ref.current.querySelector("[data-hero-ctas]");
      const images = ref.current.querySelectorAll("[data-hero-image]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headline.length)
        tl.from(headline, { opacity: 0, y: 40, duration: 0.8, stagger: 0.09 });
      if (rule) tl.from(rule, { scaleX: 0, transformOrigin: "left", duration: 0.6 }, "-=0.4");
      if (subtitle) tl.from(subtitle, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
      if (images.length) tl.from(images, { opacity: 0, x: 24, duration: 0.9 }, "-=0.6");
      if (ctas) tl.from(ctas, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <section
      ref={ref}
      className="w-full min-h-[100svh] md:min-h-0 px-[6vw] md:px-16 pt-24 md:pt-24 pb-8 md:pb-4 flex items-stretch md:items-start lg:items-center"
    >
      {/* The character is pinned to this wrapper's height. A three-line
          "statement" headline is short, so give him a floor to stand on. */}
      <div
        className={`relative flex flex-col w-full ${
          tier === "statement" ? "md:min-h-[min(600px,62vh)]" : ""
        }`}
      >
        {/* Text column. Capped from md so it never runs under the character. */}
        <div className="relative z-10 flex flex-1 min-w-0 flex-col items-start gap-0 md:gap-4 md:max-w-[56%] lg:max-w-[58%]">
          {/* Phone-only spacers (1 : 1 : 2) — headline block rides high, the CTA
              sits around the centre of the remaining space. Hidden from md. */}
          <div aria-hidden className="grow md:hidden" />

          {/* Phones: headline + subtitle share one row with the character, who
              stands beside them for the full height of the block. Both reserve
              room for him on the right. From md this wrapper dissolves. */}
          <div className="relative w-full md:contents">
            <h1
              className={`${tier === "statement" ? "" : `${fit.headlineReserve} `}${scale} font-fraunces font-bold leading-[0.95] tracking-tight text-main`}
            >
              {dict.headline.map((line, i) => (
                <span
                  key={i}
                  data-hero-line
                  className={`block ${line.italic ? "font-light italic" : "font-bold"}`}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            <span
              data-hero-rule
              aria-hidden
              className="block h-[3px] w-14 md:w-20 bg-accent mt-6 md:mt-0"
            />

            <p
              data-hero-subtitle
              className={`${fit.blockReserve} mt-5 md:mt-0 font-fraunces font-normal text-[4.6vw] sm:text-xl xl:text-2xl text-main max-w-[560px] leading-[1.45] sm:leading-normal`}
            >
              {subtitle.lead.map((line, i) => (
                <span key={i} className={`block ${i > 0 ? "mt-3" : ""}`}>
                  {line}
                </span>
              ))}
              {subtitle.beside.length > 0 && (
                <span
                  className={`block ${subtitle.lead.length > 0 ? "mt-3" : ""} ${
                    fit.besideReserve
                  }`}
                >
                  {subtitle.beside.map((line, i) => (
                    <span key={i} className={`block ${i > 0 ? "mt-3" : ""}`}>
                      {line}
                    </span>
                  ))}
                </span>
              )}
            </p>

            {/* Character — phones only. Bottom-anchored so he stands on the
                subtitle's baseline; width-capped so he never crowds the copy. */}
            <div
              data-hero-image
              className={`pointer-events-none absolute bottom-0 right-0 ${fit.mobileBox} md:hidden`}
              style={{ aspectRatio: aspect }}
            >
              <Image
                src={illustration.src}
                alt={dict.illustrationAlt}
                fill
                sizes={fit.mobileSizes}
                className={`object-contain ${fit.align}`}
                priority
              />
            </div>
          </div>

          <div aria-hidden className="grow md:hidden" />
          <div data-hero-ctas className="mt-9 md:mt-1 flex w-full md:w-auto">
            <a href={BOOKING_URL} {...bookingLinkProps} className="w-full md:w-auto">
              {/* Same sizing as the homepage hero. Below md the label scales
                  with the viewport so the full sentence fits on narrow phones. */}
              <Button
                variant="filled"
                className={`!w-full ${ctaScale} md:!text-lg xl:!text-2xl lg:!px-8`}
              >
                <span className="md:hidden">{dict.ctaShort ?? dict.cta}</span>
                <span className="hidden md:inline">{dict.cta}</span>
              </Button>
            </a>
          </div>
          <div aria-hidden className="grow-[2] md:hidden" />
        </div>

        {/* Character — md and up. Pinned to the text column's height; width
            follows from the aspect ratio, capped so he stays clear of the copy. */}
        <div
          data-hero-image
          className={`pointer-events-none absolute inset-y-0 right-0 hidden md:block ${fit.desktop}`}
          style={{ aspectRatio: aspect }}
        >
          <Image
            src={illustration.src}
            alt={dict.illustrationAlt}
            fill
            sizes={fit.desktopSizes}
            className={`object-contain ${fit.align}`}
            priority
          />
        </div>
      </div>
    </section>
  );
}
