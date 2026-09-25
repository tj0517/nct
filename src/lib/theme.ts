// Course sub-pages (Google Ads landing pages) use the light "Union Jack"
// palette: white ground, Union Blue text, Union Crimson CTAs. Everything else
// keeps the navy homepage palette. Paths are matched without the locale prefix.
export const LIGHT_THEME_ROUTES = ["/adults", "/maths", "/university", "/business"] as const;

export type SiteTheme = "blue" | "light";

export function themeForPath(pathname: string): SiteTheme {
  const bare = pathname.replace(/^\/(en|pl)(?=\/|$)/, "") || "/";
  return LIGHT_THEME_ROUTES.some((r) => bare === r || bare.startsWith(`${r}/`))
    ? "light"
    : "blue";
}

// Inline script run while the HTML is parsed, so a hard load of a light-theme
// route paints white on the very first frame (see ThemeProvider for soft navs).
export const THEME_INIT_SCRIPT = `(function(){var r=${JSON.stringify(
  LIGHT_THEME_ROUTES
)};var p=location.pathname.replace(/^\\/(en|pl)(?=\\/|$)/,"")||"/";var l=r.some(function(x){return p===x||p.indexOf(x+"/")===0});document.documentElement.setAttribute("data-theme",l?"light":"blue")})()`;
