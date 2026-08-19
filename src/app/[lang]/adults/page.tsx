import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import { localePath } from "@/lib/locale-path";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/Button";
import BookingBanner from "@/components/BookingBanner";
import Footer from "@/components/Footer";
import SectionBgReveal from "@/components/SectionBgReveal";

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

export default async function AdultsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const d = dict.adults;

  return (
    <>
      <main className="bg-main-bg flex flex-col items-center w-full">
        <PageHero
          label={d.hero.label}
          title={d.hero.title}
          titleItalic={d.hero.titleItalic}
          subtitle={d.hero.subtitle}
        />

        <SectionBgReveal className="w-full bg-second-bg">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16 py-16 md:py-24">
            <AnimatedSection direction="up">
              <p className="font-fraunces font-normal text-xl md:text-[36px] text-main text-left md:text-justify leading-normal">
                {d.aboutBody}
              </p>
              <div className="flex flex-wrap items-end justify-end w-full gap-4 md:gap-6 mt-8">
                <a href={localePath("/#teachers", locale)}>
                  <Button variant="outline">{d.meetTeachers}</Button>
                </a>
                <a href="#contact">
                  <Button variant="filled">{d.bookConsultation}</Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </SectionBgReveal>

        <SectionBgReveal className="w-full bg-second-bg px-5 md:px-16 relative z-10 -mb-[10rem]">
          <div className="bg-main rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[150px] md:rounded-tr-[150px] py-16 md:py-24 px-5 md:px-16">
            <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
              <p className="font-inter text-sm md:text-base text-second-bg/60 mb-6">
                {d.promiseLabel}
              </p>
              <div className="flex items-start gap-4 md:gap-8">
                <span className="font-fraunces font-bold text-[80px] md:text-[120px] leading-none text-main-bg/10 shrink-0 -mt-4">
                  &ldquo;
                </span>
                <p className="font-fraunces font-normal text-[clamp(28px,3.5vw,44px)] text-main-bg leading-[1.2]">
                  {d.promiseQuote}
                </p>
                <span className="font-fraunces font-bold text-[80px] md:text-[120px] leading-none text-main-bg/10 shrink-0 self-end -mb-4">
                  &rdquo;
                </span>
              </div>
            </div>
          </div>
        </SectionBgReveal>

        <div className="w-full bg-second-bg pt-[14rem] pb-16 md:pb-24">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-16">
            <AnimatedSection direction="up">
              <p className="font-inter text-sm md:text-base text-accent-text mb-4">
                {d.goalsLabel}
              </p>
              <h2 className="font-fraunces font-bold text-[clamp(32px,6vw,64px)] text-main leading-tight mb-10 md:mb-16">
                {d.goalsHeading}
              </h2>

              <div className="flex flex-col">
                {d.goals.map((goal: { name: string; desc: string }, i: number) => (
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
          <BookingBanner dict={dict.contactForm} />
        </AnimatedSection>
      </SectionBgReveal>
      <AnimatedSection direction="up" delay={0.1}>
        <Footer dict={dict.footer} lang={locale} />
      </AnimatedSection>
    </>
  );
}
