"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const x = direction === "left" ? -60 : direction === "right" ? 60 : 0;
      const y = direction === "up" ? 40 : 0;

      gsap.from(ref.current, {
        opacity: 0,
        x,
        y,
        duration: 0.8,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
