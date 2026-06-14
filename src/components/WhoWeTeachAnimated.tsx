"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeTeachAnimated({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const heading = ref.current.querySelector("[data-wwt-heading]");
      const rows = ref.current.querySelectorAll("[data-wwt-row]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (heading) {
        tl.from(heading, { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" });
      }

      if (rows.length) {
        tl.from(
          rows,
          { opacity: 0, x: -30, duration: 0.5, stagger: 0.12, ease: "power2.out" },
          "-=0.3"
        );
      }
    },
    { scope: ref, dependencies: [reduced] }
  );

  return <div ref={ref}>{children}</div>;
}
