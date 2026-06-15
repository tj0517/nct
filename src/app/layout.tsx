import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GsapProvider from "@/components/GsapProvider";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ThemeProvider from "@/components/ThemeProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces-var",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Nice Cup of Tea — English Lessons",
  description:
    "Oxford-educated native speakers. English lessons for children, adults, and business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <GsapProvider>
            <CustomCursor />
            <Header />
            {children}
            <WhatsAppFloat />
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
