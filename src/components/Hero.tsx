"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";
import { useBookingModal } from "./BookingModalContext";
import Button from "./Button";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const openBooking = useBookingModal();

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
    <section ref={ref} className="w-full flex-1 px-5 md:px-16 pt-24 lg:pt-24 flex items-center">
      <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 w-full">
        {/* Left: headline + CTA */}
        <div className="relative z-10 flex flex-1 flex-col gap-[clamp(24px,3vh,56px)] items-start">
          <h1
            data-hero-headline
            className="font-fraunces font-bold text-[14vw] md:text-[8vw] leading-none text-main"
          >
            <span className="block">Speak the</span>
            <span>
              <span className="font-normal italic">King&apos;s</span>
              <span className="font-bold"> English</span>
            </span>
          </h1>

          <p
            data-hero-subtitle
            className="font-fraunces font-normal text-lg md:text-2xl text-main max-w-[561px] leading-normal text-justify"
          >
            Oxford-educated native speakers.
            <br />
            English lessons for children, adults, and business.
            <br />
            Warsaw and online.
          </p>

          <div data-hero-ctas className="flex flex-col lg:flex-row gap-4 lg:gap-[38px] items-stretch lg:items-center w-full lg:w-auto">
            <Button variant="filled" onClick={openBooking}>Book your free 60-minute introduction</Button>
            <a href="tel:+48453374984">
              <Button variant="outline">+48 453 374 984</Button>
            </a>
          </div>
        </div>

        {/* Alice — cream panel at all sizes */}
        <div
          data-hero-image
          className="w-full h-[280px] md:h-[340px] lg:w-[400px] lg:min-h-[480px] lg:h-auto lg:shrink-0 lg:self-stretch"
        >
          <div className="relative w-full h-full rounded-bl-[30px] rounded-tr-[30px] lg:rounded-bl-[40px] lg:rounded-tr-[40px] bg-[#F5F0E8] overflow-hidden shadow-[6px_6px_0px_var(--accent)] lg:shadow-[8px_8px_0px_var(--accent)] p-4 lg:p-6">
            <div className="relative w-full h-full">
              <Image
                src="/images/hero-bg.png"
                alt="Alice in Wonderland illustration"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain opacity-30"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
