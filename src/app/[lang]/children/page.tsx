import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/dictionaries";
import { getContent } from "@/lib/get-content";
import type { Locale } from "@/dictionaries";
import { localeMetadata } from "@/lib/seo-locale";
import CourseHero from "@/components/CourseHero";
import CourseTestimonial from "@/components/CourseTestimonial";
import CourseHelp from "@/components/CourseHelp";
import CourseContact from "@/components/CourseContact";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";

// Trimmed transparent cut-out; the ratio drives the hero's aspect box.
const ALICE = { src: "/images/alice-door-hero.png", width: 413, height: 527 };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getContent(lang as Locale);
  return {
    title: dict.children.meta.title,
    description: dict.children.meta.description,
    ...localeMetadata(lang as Locale, "/children"),
  };
}

/** Course landing page — same structure as the Adults template. */
export default async function ChildrenPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getContent(lang as Locale);
  const d = dict.children;

  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <div className="max-w-[1440px] mx-auto w-full">
          <CourseHero dict={d.hero} illustration={ALICE} />
        </div>

        <AnimatedSection direction="up" className="w-full">
          <CourseTestimonial dict={d.testimonial} />
        </AnimatedSection>

        <AnimatedSection direction="up" className="w-full">
          <CourseHelp dict={d.help} />
        </AnimatedSection>

        <AnimatedSection direction="up" className="w-full">
          <CourseContact dict={dict.contactForm} />
        </AnimatedSection>
      </main>

      <AnimatedSection direction="up" delay={0.1}>
        <Footer dict={dict.footer} />
      </AnimatedSection>
    </>
  );
}
