"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";

gsap.registerPlugin(ScrollTrigger);

export default function PricingAnimated({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const freeCard = ref.current.querySelector("[data-pricing-free]");
      const rows = ref.current.querySelectorAll("[data-pricing-row]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (freeCard) {
        tl.from(freeCard, { opacity: 0, x: -50, duration: 0.7, ease: "power2.out" });
      }

      if (rows.length) {
        tl.from(
          rows,
          { opacity: 0, x: 30, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        );
      }
    },
    { scope: ref, dependencies: [reduced] }
  );

  return <div ref={ref}>{children}</div>;
}
