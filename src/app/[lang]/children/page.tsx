import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/dictionaries";
import { getContent } from "@/lib/get-content";
import type { Locale } from "@/dictionaries";
import { localeMetadata, socialMetadata } from "@/lib/seo-locale";
import CourseHero from "@/components/CourseHero";
import CourseTestimonial from "@/components/CourseTestimonial";
import CourseHelp from "@/components/CourseHelp";
import CourseContact from "@/components/CourseContact";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";

// The whole Tenniel scene — Alice drawing back the curtain on the little door,
// as the alt text has always described and as Anthony's 2026-10-07 mock-up
// shows. Near-square, so the hero gives her the "wide" lane. The ratio drives
// the hero's aspect box.
const ALICE = {
  src: "/images/heroes/alice-curtain-hero.png",
  width: 1124,
  height: 1134,
  fit: "wide",
} as const;

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
    ...(await localeMetadata(lang as Locale, "/children")),
    ...socialMetadata(lang as Locale, dict.children.meta.title, dict.children.meta.description),
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
          <CourseContact dict={dict.contactForm} site={dict.site} />
        </AnimatedSection>
      </main>

      <AnimatedSection direction="up" delay={0.1}>
        <Footer dict={dict.footer} site={dict.site} />
      </AnimatedSection>
    </>
  );
}
