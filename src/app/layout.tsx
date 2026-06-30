import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GsapProvider from "@/components/GsapProvider";

import WhatsAppFloat from "@/components/WhatsAppFloat";
import ThemeProvider from "@/components/ThemeProvider";
import { BookingModalProvider } from "@/components/BookingModalContext";

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
          <BookingModalProvider>
            <GsapProvider>
              <Header />
              {children}
              <WhatsAppFloat />
            </GsapProvider>
          </BookingModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
