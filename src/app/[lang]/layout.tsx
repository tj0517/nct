import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import GsapProvider from "@/components/GsapProvider";
import PhoneFloat from "@/components/PhoneFloat";
import ThemeProvider from "@/components/ThemeProvider";
import { BookingModalProvider } from "@/components/BookingModalContext";
import { hasLocale } from "@/dictionaries";
import { getContent } from "@/lib/get-content";
import type { Locale } from "@/dictionaries";
import { notFound } from "next/navigation";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { servedLocale } from "@/lib/locale-content";
import { localeMetadata, socialMetadata } from "@/lib/seo-locale";
import { siteUrl } from "@/lib/site-url";

const fraunces = Fraunces({
  variable: "--font-fraunces-var",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond-var",
  subsets: ["latin"],
  weight: "600",
});

export async function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getContent(lang as Locale);
  return {
    // Vercel provides this automatically — no env var or Vercel setting
    // added here.
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    ...localeMetadata(lang as Locale, ""),
    ...socialMetadata(lang as Locale, dict.meta.title, dict.meta.description),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getContent(lang as Locale);

  // Describes the school for Google (name, contact, address) — same values
  // the page already shows (NCT-2.03). Contact details and social links are
  // hard-coded here to match Footer.tsx/ContactLinks.tsx, which are
  // themselves hard-coded rather than sourced from content (see
  // docs/deferred-tasks.md).
  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "A Nice Cup of Tea",
    description: dict.meta.description,
    url: `${siteUrl}/${servedLocale(lang)}`,
    telephone: "+48 453 374 984",
    email: "hello@anicecupoftea.pl",
    address: {
      "@type": "PostalAddress",
      streetAddress: dict.map.heading,
      addressLocality: "Warsaw",
    },
    sameAs: ["https://m.me/anicecupoftea", "https://instagram.com/anicecupoftea.pl"],
  };

  return (
    <html
      lang={servedLocale(lang)}
      className={`${fraunces.variable} ${inter.variable} ${cormorantGaramond.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets data-theme before first paint so light-theme routes never
            flash navy. Runs synchronously during HTML parsing. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schoolJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <BookingModalProvider bookingDict={dict.booking}>
            <GsapProvider>
              <Header dict={dict.header} lang={lang as Locale} />
              {children}
              <PhoneFloat />
            </GsapProvider>
          </BookingModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
