import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/Button";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import SectionBgReveal from "@/components/SectionBgReveal";

export const metadata: Metadata = {
  title: "English for Adults — A Nice Cup of Tea",
  description:
    "Richer vocabulary, clearer pronunciation, and true confidence when you speak. English lessons for adults in Warsaw and online.",
};

const goals = [
  { name: "Conversation", desc: "Speak freely and naturally in any situation" },
  { name: "Pronunciation", desc: "Sound clear, confident, and at ease" },
  { name: "Accent", desc: "Refine your spoken English" },
  { name: "Culture", desc: "Understand the world behind the words" },
  { name: "Writing", desc: "Express yourself with precision on the page" },
  { name: "Confidence", desc: "Find your real voice in English" },
];

export default function AdultsPage() {
  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <PageHero
          label="ADULTS"
          title="English for"
          titleItalic="Adults"
          subtitle="Oxford-educated native speakers help you find the right word, the right rhythm, and the right voice. Warsaw and online."
          accentWord="Speak."
          illustration="/images/tenniel-adults.jpg"
        />

        {/* About — single justified paragraph like homepage */}
        <SectionBgReveal className="w-full bg-second-bg">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16 py-16 md:py-24">
            <AnimatedSection direction="up">
              <p className="font-fraunces font-normal text-xl md:text-[36px] text-main text-left md:text-justify leading-normal">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Many
                adults fear being wrong. The wrong word. The wrong tense. The wrong
                construction. The classroom where every mistake felt public. At NCT,
                we do the opposite. We encourage your expression. We listen for your
                real voice. We correct gently, without making you smaller. No beige
                ChatGPT flattery. Just richer vocabulary, clearer pronunciation, and
                true confidence when you speak.
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

        {/* Promise strip */}
        <SectionBgReveal className="w-full bg-second-bg px-5 md:px-16 relative z-10 -mb-[10rem]">
          <div className="bg-main rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[150px] md:rounded-tr-[150px] py-16 md:py-24 px-5 md:px-16">
            <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
              <p className="font-inter text-sm md:text-base text-second-bg/60 mb-6">
                THE PROMISE
              </p>
              <div className="flex items-start gap-4 md:gap-8">
                <span className="font-fraunces font-bold text-[80px] md:text-[120px] leading-none text-main-bg/10 shrink-0 -mt-4">
                  &ldquo;
                </span>
                <p className="font-fraunces font-normal text-[clamp(28px,3.5vw,44px)] text-main-bg leading-[1.2]">
                  The effortless superiority of a sentence that knows where it is
                  going.
                </p>
                <span className="font-fraunces font-bold text-[80px] md:text-[120px] leading-none text-main-bg/10 shrink-0 self-end -mb-4">
                  &rdquo;
                </span>
              </div>
            </div>
          </div>
        </SectionBgReveal>

        {/* Goals — numbered list */}
        <div className="w-full bg-second-bg pt-[14rem] pb-16 md:pb-24">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16">
            <AnimatedSection direction="up">
              <p className="font-inter text-sm md:text-base text-accent-text mb-4">
                YOUR GOALS
              </p>
              <h2 className="font-fraunces font-bold text-[clamp(32px,6vw,64px)] text-main leading-tight mb-10 md:mb-16">
                Lessons shaped around you.
              </h2>

              <div className="flex flex-col">
                {goals.map((goal, i) => (
                  <div
                    key={goal.name}
                    className="flex items-center border-b border-main/15 py-5 md:py-7 group cursor-default"
                  >
                    <span className="font-fraunces text-lg md:text-[24px] text-main/20 w-10 md:w-16 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-fraunces font-normal text-xl md:text-[32px] text-main flex-1 group-hover:translate-x-3 transition-transform duration-300">
                      {goal.name}
                    </span>
                    <span className="font-fraunces font-light text-lg text-main/50 max-w-[360px] text-right hidden md:block">
                      {goal.desc}
                    </span>
                  </div>
                ))}
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
