"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { themeForPath, type SiteTheme } from "@/lib/theme";

const ThemeContext = createContext<{ theme: SiteTheme }>({ theme: "blue" });

export function useTheme() {
  return useContext(ThemeContext);
}

// The palettes themselves live in globals.css, keyed off `data-theme` on
// <html>. A hard load is handled by THEME_INIT_SCRIPT in the layout (before
// first paint); this effect keeps the attribute in sync on soft navigations.
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const theme = themeForPath(pathname);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
