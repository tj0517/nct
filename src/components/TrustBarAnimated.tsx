"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./GsapProvider";

gsap.registerPlugin(ScrollTrigger);

export default function TrustBarAnimated({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const items = ref.current.querySelectorAll("[data-trust-item]");
      if (!items.length) return;

      gsap.from(items, {
        opacity: 0,
        x: -40,
        duration: 0.6,
        stagger: 0.15,
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

  return <div ref={ref}>{children}</div>;
}
