"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";
import Button from "./Button";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const headline = ref.current.querySelector("[data-hero-headline]");
      const subtitle = ref.current.querySelector("[data-hero-subtitle]");
      const ctas = ref.current.querySelector("[data-hero-ctas]");
      const image = ref.current.querySelector("[data-hero-image]");

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (headline) tl.from(headline, { opacity: 0, y: 30, duration: 0.7 });
      if (subtitle) tl.from(subtitle, { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
      if (ctas) tl.from(ctas, { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
      if (image) tl.from(image, { opacity: 0, scale: 0.95, duration: 0.8 }, "-=0.3");
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <section ref={ref} className="w-full flex-1 px-16 flex items-center">
      <div className="flex items-start justify-between gap-16 w-full">
        {/* Left: headline + CTA */}
        <div className="flex flex-1 flex-col gap-[clamp(24px,3vh,56px)] items-start">
          <h1
            data-hero-headline
            className="font-fraunces font-bold text-[8vw] leading-none text-main"
          >
            <span className="block">Speak the</span>
            <span>
              <span className="font-normal italic">King&apos;s</span>
              <span className="font-bold"> English</span>
            </span>
          </h1>

          <p
            data-hero-subtitle
            className="font-fraunces font-normal text-2xl text-main max-w-[561px] leading-normal"
          >
            Oxford-educated native speakers.
            <br />
            English lessons for children, adults, and business.
            <br />
            Warsaw and online.
          </p>

          <div data-hero-ctas className="flex gap-[38px] items-center">
            <a href="#contact">
              <Button variant="filled">Book your free 60-minute introduction</Button>
            </a>
            <a href="tel:+48453374984">
              <Button variant="outline">+48 453 374 984</Button>
            </a>
          </div>
        </div>

        {/* Right: hero image */}
        <div data-hero-image className="relative w-[424px] self-stretch shrink-0">
          <Image
            src="/images/hero-bg.png"
            alt="Victorian illustration"
            fill
            sizes="424px"
            className="object-cover opacity-20"
            priority
          />
        </div>
      </div>
    </section>
  );
}
