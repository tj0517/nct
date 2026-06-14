"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./GsapProvider";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Hide on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    if (!dot) return;

    dot.style.opacity = "1";

    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(dot, { scale: 2.5, duration: 0.3 });
    };
    const onLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button");
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-main pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 opacity-0"
      style={{ willChange: "transform" }}
    />
  );
}
