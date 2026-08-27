import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import WhoWeTeach from "@/components/WhoWeTeach";
import Teachers from "@/components/Teachers";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import TrustBarAnimated from "@/components/TrustBarAnimated";
import WhoWeTeachAnimated from "@/components/WhoWeTeachAnimated";
import TeachersAnimated from "@/components/TeachersAnimated";
import PricingAnimated from "@/components/PricingAnimated";
import MapSection from "@/components/MapSection";
import SectionBgReveal from "@/components/SectionBgReveal";
import FAQ from "@/components/FAQ";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        {/* No forced full-screen height — the BBC trust bar should peek above the fold */}
        <div className="flex flex-col w-full">
          <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col">
            <Hero dict={dict.hero} />
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto w-full py-4 md:py-6 px-5 md:px-16">
          <TrustBarAnimated>
            <TrustBar dict={dict.trustBar} />
          </TrustBarAnimated>
        </div>
        <div id="about" className="max-w-[1440px] mx-auto w-full mt-8 md:mt-16">
          <AnimatedSection direction="up">
            <About dict={dict.about} />
          </AnimatedSection>
        </div>
        <div className="w-full mt-8 md:mt-16">
          <WhoWeTeachAnimated>
            <WhoWeTeach dict={dict.whoWeTeach} lang={lang as Locale} />
          </WhoWeTeachAnimated>
        </div>
        <SectionBgReveal className="w-full">
          <div id="teachers" className="w-full">
            <TeachersAnimated>
              <Teachers dict={dict.teachers} />
            </TeachersAnimated>
          </div>
        </SectionBgReveal>
        <div id="pricing" className="w-full">
          <PricingAnimated>
            <Pricing dict={dict.pricing} />
          </PricingAnimated>
        </div>
        <div className="w-full">
          <Testimonials dict={dict.testimonials} />
        </div>
        <div className="max-w-[1440px] mx-auto w-full mt-8 md:mt-16">
          <AnimatedSection direction="up">
            <MapSection dict={dict.map} />
          </AnimatedSection>
        </div>
        <div id="faq" className="w-full mt-8 md:mt-16">
          <AnimatedSection direction="up">
            <FAQ dict={dict.faq} />
          </AnimatedSection>
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
