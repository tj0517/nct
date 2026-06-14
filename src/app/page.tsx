import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import WhoWeTeach from "@/components/WhoWeTeach";
import Teachers from "@/components/Teachers";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import TrustBarAnimated from "@/components/TrustBarAnimated";
import WhoWeTeachAnimated from "@/components/WhoWeTeachAnimated";
import TeachersAnimated from "@/components/TeachersAnimated";
import PricingAnimated from "@/components/PricingAnimated";
import SectionBgReveal from "@/components/SectionBgReveal";

export default function Home() {
  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <div className="h-screen flex flex-col w-full">
          <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col">
            <Hero />
          </div>
          <div className="max-w-[1440px] mx-auto w-full pb-8">
            <TrustBarAnimated>
              <TrustBar />
            </TrustBarAnimated>
          </div>
        </div>
        <div id="about" className="max-w-[1440px] mx-auto w-full mt-16">
          <AnimatedSection direction="up">
            <About />
          </AnimatedSection>
        </div>
        <div className="w-full mt-16">
          <WhoWeTeachAnimated>
            <WhoWeTeach />
          </WhoWeTeachAnimated>
        </div>
        <SectionBgReveal className="w-full">
          <div id="teachers" className="w-full">
            <TeachersAnimated>
              <Teachers />
            </TeachersAnimated>
          </div>
        </SectionBgReveal>
        <div className="max-w-[1440px] mx-auto w-full mt-16">
          <Testimonials />
        </div>
        <div id="pricing" className="max-w-[1440px] mx-auto w-full mt-16">
          <PricingAnimated>
            <Pricing />
          </PricingAnimated>
        </div>
        <SectionBgReveal className="w-full mt-16">
          <div id="faq" className="w-full">
            <FAQ />
          </div>
        </SectionBgReveal>
      </main>
      <SectionBgReveal>
        <AnimatedSection direction="up">
          <BookingBanner />
        </AnimatedSection>
      </SectionBgReveal>
      <AnimatedSection direction="up" delay={0.1}>
        <Footer />
      </AnimatedSection>
    </>
  );
}
