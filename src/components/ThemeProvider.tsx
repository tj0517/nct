"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

const ThemeContext = createContext<{ theme: "blue" }>({ theme: "blue" });

export function useTheme() {
  return useContext(ThemeContext);
}

const vars = {
  "--main": "#FFFFFF",
  "--accent": "#C8102E",
  "--accent-text": "#FFFFFF",
  "--main-bg": "#012169",
  "--second-bg": "#0A3080",
} as const;

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
    root.setAttribute("data-theme", "blue");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "blue" }}>
      {children}
    </ThemeContext.Provider>
  );
}
