import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import CourseHero from "@/components/CourseHero";
import CourseTestimonial from "@/components/CourseTestimonial";
import CourseHelp from "@/components/CourseHelp";
import CourseContact from "@/components/CourseContact";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";

// Trimmed transparent cut-out; the ratio drives the hero's aspect box.
const LION = { src: "/images/lion-hero.png", width: 829, height: 1522 };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.adults.meta.title,
    description: dict.adults.meta.description,
  };
}

/**
 * Course landing page (Google Ads entry point) — a mini homepage:
 * what we offer → who it's for → why trust us → what to do next.
 * Template for Children & Teens, University, Business and Maths.
 */
export default async function AdultsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.adults;

  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <div className="max-w-[1440px] mx-auto w-full">
          <CourseHero dict={d.hero} illustration={LION} />
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
