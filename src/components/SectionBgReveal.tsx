"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";

gsap.registerPlugin(ScrollTrigger);

interface SectionBgRevealProps {
  children: ReactNode;
  className?: string;
}

export default function SectionBgReveal({
  children,
  className = "",
}: SectionBgRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      gsap.from(ref.current, {
        clipPath: "inset(8% 4% 8% 4% round 40px)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 0.6,
        },
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
    >
      {children}
    </div>
  );
}
