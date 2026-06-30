import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/Button";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import SectionBgReveal from "@/components/SectionBgReveal";

export const metadata: Metadata = {
  title: "Maths in English — A Nice Cup of Tea",
  description:
    "Exam confidence for IB students. Maths taught online by Dr Rishi Handa, an English native speaker with a degree from UCL.",
};

const services = [
  { name: "IB Maths: Analysis & Approaches", desc: "SL and HL preparation" },
  { name: "IB Maths: Applications & Interpretation", desc: "SL and HL preparation" },
  { name: "International school Maths", desc: "British, American, and IB curricula" },
  { name: "Exam preparation and revision", desc: "Focused, structured practice" },
  { name: "Students who have hit a block", desc: "Clarity from confusion" },
  { name: "High-achievers who need stretch", desc: "Challenge beyond the syllabus" },
];

export default function MathsPage() {
  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <PageHero
          label="MATHS IN ENGLISH"
          title="Maths in"
          titleItalic="English"
          subtitle="Exam confidence for IB students. Taught online by Dr Rishi Handa, an English native speaker with a degree in Mathematics with Theoretical Physics from UCL."
          accentWord="Prove."
          illustration="/images/tenniel-maths.jpg"
        />

        {/* About — justified paragraph */}
        <SectionBgReveal className="w-full bg-second-bg">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16 py-16 md:py-24">
            <AnimatedSection direction="up">
              <p className="font-fraunces font-normal text-xl md:text-[36px] text-main text-left md:text-justify leading-normal">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For
                IB and international school students, the challenge is not only
                the mathematics. It is reading the question precisely, using the
                right terminology, and thinking naturally in the language of the
                exam. Dr&nbsp;Handa teaches both: the Maths, and the English
                of&nbsp;Maths.
              </p>
              <div className="flex flex-wrap items-end justify-end w-full gap-4 md:gap-6 mt-8">
                <a href="/#pricing">
                  <Button variant="outline">See pricing</Button>
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
                WHAT WE HELP WITH
              </p>
              <h2 className="font-fraunces font-bold text-[clamp(32px,6vw,64px)] text-main-bg leading-tight mb-10 md:mb-16">
                From algebra to confidence.
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
                    <span className="font-fraunces font-normal text-base md:text-[24px] text-main-bg flex-1 group-hover:translate-x-3 transition-transform duration-300">
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

        {/* Dr Handa section */}
        <div className="w-full bg-second-bg pt-[28rem] pb-16 md:pb-24">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16">
            <AnimatedSection direction="up">
              <p className="font-inter text-sm md:text-base text-accent-text mb-4">
                YOUR TEACHER
              </p>
              <h2 className="font-fraunces font-bold text-[clamp(32px,6vw,64px)] text-main leading-tight mb-6">
                Dr Rishi Handa
              </h2>

              <p className="font-fraunces font-normal text-xl md:text-2xl text-main leading-relaxed max-w-[720px] mb-8">
                Teacher at St&nbsp;James Independent School in London.
                Degree in Mathematics with Theoretical Physics from UCL.
                An unusual blend of precision, imagination, and patience.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                {["UCL", "SOAS", "St James School"].map((inst) => (
                  <span
                    key={inst}
                    className="font-inter text-sm md:text-base text-main/60 border border-main/20 rounded-full px-5 py-2"
                  >
                    {inst}
                  </span>
                ))}
              </div>

              <a href="#contact">
                <Button variant="filled" size="small">Book a consultation</Button>
              </a>
            </AnimatedSection>
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
