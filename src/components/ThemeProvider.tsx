"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type Theme = "light" | "blue";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const themes = {
  light: {
    "--main": "#012169",
    "--accent": "#C8102E",
    "--main-bg": "#FFFFFF",
    "--second-bg": "#E8ECF2",
  },
  blue: {
    "--main": "#FFFFFF",
    "--accent": "#C8102E",
    "--main-bg": "#012169",
    "--second-bg": "#0A3080",
  },
} as const;

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const applyTheme = useCallback((t: Theme) => {
    const vars = themes[t];
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "blue" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
