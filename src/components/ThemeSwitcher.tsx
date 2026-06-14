"use client";

import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"classic" | "british">("classic");

  useEffect(() => {
    if (theme === "british") {
      document.documentElement.setAttribute("data-theme", "british");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2 font-inter text-xs">
      <span className="text-main-bg/60 mr-1">Theme:</span>
      <button
        onClick={() => setTheme("classic")}
        className={`rounded-full px-3 py-0.5 transition-colors ${
          theme === "classic"
            ? "bg-main-bg text-accent"
            : "bg-main-bg/10 text-main-bg hover:bg-main-bg/20"
        }`}
      >
        Classic Green
      </button>
      <button
        onClick={() => setTheme("british")}
        className={`rounded-full px-3 py-0.5 transition-colors ${
          theme === "british"
            ? "bg-main-bg text-accent"
            : "bg-main-bg/10 text-main-bg hover:bg-main-bg/20"
        }`}
      >
        British Blue &amp; Red
      </button>
    </div>
  );
}
