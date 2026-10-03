import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/dictionaries";
import { getContent } from "@/lib/get-content";
import type { Locale } from "@/dictionaries";
import { localeMetadata } from "@/lib/seo-locale";
import FAQ from "@/components/FAQ";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SectionBgReveal from "@/components/SectionBgReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getContent(lang as Locale);
  return {
    title: dict.faq.meta.title,
    description: dict.faq.meta.description,
    ...localeMetadata(lang as Locale, "/faq"),
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getContent(lang as Locale);

  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <div className="w-full">
          <FAQ dict={dict.faq} />
        </div>
      </main>

      <SectionBgReveal>
        <AnimatedSection direction="up">
          <BookingBanner dict={dict.contactForm} />
        </AnimatedSection>
      </SectionBgReveal>
      <AnimatedSection direction="up" delay={0.1}>
        <Footer dict={dict.footer} />
      </AnimatedSection>
    </>
  );
}
