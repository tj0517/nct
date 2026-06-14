"use client";

import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./GsapProvider";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "submit" | "button";
  variant?: "filled" | "outline" | "inverse";
  size?: "default" | "small";
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  href,
  type,
  variant = "filled",
  size = "default",
  className = "",
  onClick,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const label1Ref = useRef<HTMLSpanElement>(null);
  const label2Ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reduced) return;
      const btn = wrapRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.15,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [reduced]
  );

  const handleMouseEnter = useCallback(() => {
    if (reduced) return;

    // Fill sweep
    if (fillRef.current) {
      gsap.fromTo(
        fillRef.current,
        { scale: 0, opacity: 1 },
        { scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }

    // Subtle scale
    if (wrapRef.current) {
      gsap.to(wrapRef.current, {
        scale: 1.04,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    // Text swap: first label slides up and out, second label slides up into view
    if (label1Ref.current) {
      gsap.to(label1Ref.current, {
        yPercent: -100,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
    if (label2Ref.current) {
      gsap.to(label2Ref.current, {
        yPercent: -100,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced) return;

    // Reset magnetic pull
    if (wrapRef.current) {
      gsap.to(wrapRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    }

    // Shrink fill back
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        scale: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    // Text swap back: both labels slide back down
    if (label1Ref.current) {
      gsap.to(label1Ref.current, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
    if (label2Ref.current) {
      gsap.to(label2Ref.current, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [reduced]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;

    wrap.addEventListener("mousemove", handleMouseMove);
    wrap.addEventListener("mouseenter", handleMouseEnter);
    wrap.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrap.removeEventListener("mousemove", handleMouseMove);
      wrap.removeEventListener("mouseenter", handleMouseEnter);
      wrap.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduced, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const sizeClasses =
    size === "small"
      ? "text-base px-7 py-2.5"
      : "font-light text-2xl h-[75px] w-[300px]";

  const variantClasses = {
    filled: "bg-main text-main-bg border-main",
    outline: "bg-transparent text-main border-main",
    inverse: "bg-main-bg text-main border-main-bg",
  };

  const fillColors = {
    filled: "bg-main-bg",
    outline: "bg-main",
    inverse: "bg-main",
  };

  const hoverTextColors = {
    filled: "group-hover:text-main",
    outline: "group-hover:text-main-bg",
    inverse: "group-hover:text-main-bg",
  };

  const baseClasses = `group relative font-fraunces ${sizeClasses} rounded-bl-[100px] rounded-tr-[100px] border flex items-center justify-center cursor-pointer overflow-hidden ${variantClasses[variant]} ${className}`;

  const inner = (
    <>
      {/* Fill circle that expands from bottom-left on hover */}
      <span
        ref={fillRef}
        className={`absolute rounded-full pointer-events-none ${fillColors[variant]}`}
        style={{
          width: "200%",
          paddingBottom: "200%",
          bottom: "-50%",
          left: "-50%",
          transform: "scale(0)",
          transformOrigin: "center center",
        }}
      />
      {/* Text swap container — two stacked labels */}
      <span className="relative z-10 overflow-hidden flex items-center justify-center">
        <span className="block relative">
          {/* First label: visible by default, slides up/out on hover */}
          <span
            ref={label1Ref}
            className={`block transition-colors duration-300 ${hoverTextColors[variant]}`}
          >
            {children}
          </span>
          {/* Second label: starts below, slides up into view on hover */}
          <span
            ref={label2Ref}
            aria-hidden
            className={`block absolute top-0 left-0 w-full transition-colors duration-300 ${hoverTextColors[variant]}`}
            style={{ transform: "translateY(100%)" }}
          >
            {children}
          </span>
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <div ref={wrapRef} className="inline-block" style={{ willChange: "transform" }}>
        <a
          ref={btnRef as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          onClick={onClick}
        >
          {inner}
        </a>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="inline-block" style={{ willChange: "transform" }}>
      <button
        ref={btnRef as React.Ref<HTMLButtonElement>}
        type={type || "button"}
        className={baseClasses}
        onClick={onClick}
      >
        {inner}
      </button>
    </div>
  );
}
