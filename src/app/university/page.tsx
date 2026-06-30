import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/Button";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import SectionBgReveal from "@/components/SectionBgReveal";

export const metadata: Metadata = {
  title: "University Applications — A Nice Cup of Tea",
  description:
    "Oxford. Stanford. Our students have won places at some of the world\u2019s most demanding universities. Application support in Warsaw and online.",
};

const services = [
  { name: "International university applications", desc: "UK, USA, and Europe" },
  { name: "UCAS personal statements", desc: "Structure, voice, and spark" },
  { name: "Oxbridge-style interview preparation", desc: "Think clearly under pressure" },
  { name: "Admissions essays", desc: "Make your thinking visible" },
  { name: "Scholarship applications", desc: "Stand out in a competitive field" },
  { name: "Academic interviews", desc: "Speak with precision and curiosity" },
  { name: "IB Diploma: IAs, EEs, and TOK essays", desc: "Rigour meets clarity" },
  { name: "MBA application, GMAT, and interview prep", desc: "The next stage of your career" },
];

const universities = ["Oxford", "Stanford", "Groningen", "School of Visual Arts"];

export default function UniversityPage() {
  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <PageHero
          label="UNIVERSITY APPLICATIONS"
          title="Apply to"
          titleItalic="the best."
          subtitle="Oxford. Stanford. New York's School of Visual Arts. Our students have won places at some of the world's most demanding universities."
          accentWord="Apply."
          illustration="/images/tenniel-university.jpg"
        />

        {/* About — justified paragraph */}
        <SectionBgReveal className="w-full bg-second-bg">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16 py-16 md:py-24">
            <AnimatedSection direction="up">
              <p className="font-fraunces font-normal text-xl md:text-[36px] text-main text-left md:text-justify leading-normal">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A
                strong application is not just correct English. It is structure,
                voice, evidence, and spark. It is the ability to make your thinking
                visible. At NCT, we help students prepare applications, essays, and
                interviews with clarity and seriousness. We do not teach students to
                apologise for ambition. We help them sound ready. Ready to study the
                subject. Ready to answer difficult questions. Ready to speak with
                precision, curiosity, and confidence.
              </p>
              <div className="flex flex-wrap items-end justify-end w-full gap-4 md:gap-6 mt-8">
                <a href="/#teachers">
                  <Button variant="outline">Meet our teachers</Button>
                </a>
                <a href="#contact">
                  <Button variant="filled">Book your free consultation</Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </SectionBgReveal>

        {/* Services — dark section */}
        <SectionBgReveal className="w-full bg-second-bg px-5 md:px-16 relative z-10 -mb-[24rem]">
          <div className="bg-main rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[150px] md:rounded-tr-[150px] py-16 md:py-24 px-5 md:px-16">
            <div className="max-w-[1440px] mx-auto">
              <p className="font-inter text-sm md:text-base text-second-bg/60 mb-4">
                WE HELP WITH
              </p>
              <h2 className="font-fraunces font-bold text-[clamp(32px,6vw,64px)] text-main-bg leading-tight mb-10 md:mb-16">
                From personal statement to podium.
              </h2>

              <div className="flex flex-col">
                {services.map((service, i) => (
                  <div
                    key={service.name}
                    className="flex items-center border-b border-main-bg/15 py-5 md:py-7 group cursor-default"
                  >
                    <span className="font-fraunces text-lg md:text-[24px] text-main-bg/20 w-10 md:w-16 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-fraunces font-normal text-lg md:text-[28px] text-main-bg flex-1 group-hover:translate-x-3 transition-transform duration-300">
                      {service.name}
                    </span>
                    <span className="font-fraunces font-light text-lg text-main-bg/40 max-w-[320px] text-right hidden md:block">
                      {service.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionBgReveal>

        {/* Where our students go */}
        <div className="w-full bg-second-bg pt-[28rem] pb-16 md:pb-24">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16">
            <AnimatedSection direction="up">
              <p className="font-inter text-sm md:text-base text-accent-text mb-4">
                OUR STUDENTS
              </p>
              <h2 className="font-fraunces font-bold text-[clamp(32px,6vw,64px)] text-main leading-tight mb-10 md:mb-16">
                Where they&apos;ve been accepted.
              </h2>
            </AnimatedSection>
          </div>

          <div className="w-full overflow-hidden group">
            {/* Row 1 — scrolls left */}
            <div
              className="flex whitespace-nowrap py-4 group-hover:[animation-play-state:paused]"
              style={{ animation: "marquee 30s linear infinite" }}
            >
              {[...universities, ...universities].map((name, i) => (
                <span key={`r1-${i}`} className="inline-flex items-center shrink-0">
                  <span className="font-fraunces font-bold text-5xl md:text-7xl text-main/20 hover:text-main hover:scale-105 transition-all duration-300 cursor-default px-4 md:px-6">
                    {name}
                  </span>
                  <span className="text-main/10 text-3xl md:text-5xl select-none">·</span>
                </span>
              ))}
            </div>

            {/* Row 2 — scrolls right */}
            <div
              className="flex whitespace-nowrap py-4 group-hover:[animation-play-state:paused]"
              style={{ animation: "marquee-reverse 35s linear infinite" }}
            >
              {[...universities, ...universities].map((name, i) => (
                <span key={`r2-${i}`} className="inline-flex items-center shrink-0">
                  <span className="font-fraunces font-bold text-5xl md:text-7xl text-main/20 hover:text-main hover:scale-105 transition-all duration-300 cursor-default px-4 md:px-6">
                    {name}
                  </span>
                  <span className="text-main/10 text-3xl md:text-5xl select-none">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
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
