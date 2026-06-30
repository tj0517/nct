import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/Button";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import SectionBgReveal from "@/components/SectionBgReveal";

export const metadata: Metadata = {
  title: "English for Children — A Nice Cup of Tea",
  description:
    "At NCT, children do not just learn English. They explore it. Lessons for children aged 5 and upwards in Warsaw and online.",
};

const examPrep = [
  { name: "Reading, writing, listening, and speaking", desc: "The four foundations" },
  { name: "Egzamin ósmoklasisty", desc: "Year 8 exam preparation" },
  { name: "Konkurs kuratoryjny", desc: "Regional competition prep" },
  { name: "Olimpiada Języka Angielskiego Juniorów", desc: "National olympiad support" },
];

export default function ChildrenPage() {
  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <PageHero
          label="CHILDREN"
          title="Lessons for"
          titleItalic="Children"
          subtitle="A word can be small. A word can be grand. A word can lead to a faraway land. For children aged 5 and upwards."
          accentWord="Explore."
          illustration="/images/tenniel-children.jpg"
        />

        {/* About — justified paragraph */}
        <SectionBgReveal className="w-full bg-second-bg">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16 py-16 md:py-24">
            <AnimatedSection direction="up">
              <p className="font-fraunces font-normal text-xl md:text-[36px] text-main text-left md:text-justify leading-normal">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;At
                NCT, children do not just learn English. They explore it. Stories.
                Questions. Rhymes. Conversations. Books with strange doors.
                Sentences with wings. We help children speak clearly, write boldly,
                and use English with confidence. English is not just a subject at
                school. It is a key, a ladder, and a door you pass through.
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

        {/* Exam prep — dark section */}
        <SectionBgReveal className="w-full bg-second-bg px-5 md:px-16 relative z-10 -mb-[24rem]">
          <div className="bg-main rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[150px] md:rounded-tr-[150px] py-16 md:py-24 px-5 md:px-16">
            <div className="max-w-[1440px] mx-auto">
              <p className="font-inter text-sm md:text-base text-second-bg/60 mb-4">
                FOR CHILDREN AGED 5+
              </p>
              <h2 className="font-fraunces font-bold text-[clamp(32px,6vw,64px)] text-main-bg leading-tight mb-10 md:mb-16">
                We prepare children for
              </h2>

              <div className="flex flex-col">
                {examPrep.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center border-b border-main-bg/15 py-5 md:py-7 group cursor-default"
                  >
                    <span className="font-fraunces text-lg md:text-[24px] text-main-bg/20 w-10 md:w-16 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-fraunces font-normal text-lg md:text-[28px] text-main-bg flex-1 group-hover:translate-x-3 transition-transform duration-300">
                      {item.name}
                    </span>
                    <span className="font-fraunces font-light text-lg text-main-bg/40 max-w-[320px] text-right hidden md:block">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionBgReveal>

        {/* Visual quote section */}
        <div className="w-full bg-second-bg pt-[28rem] pb-16 md:pb-24">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16">
            <AnimatedSection direction="up">
              <div className="flex items-start gap-8 md:gap-16">
                <span className="font-fraunces font-bold text-[120px] leading-none text-accent-text/20 shrink-0 hidden lg:block">
                  &ldquo;
                </span>
                <div>
                  <p className="font-fraunces font-normal text-[clamp(28px,3.5vw,44px)] text-main leading-[1.2]">
                    English is not just a subject at school. It is a key, a ladder,
                    and a door you pass through.
                  </p>
                </div>
              </div>
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
