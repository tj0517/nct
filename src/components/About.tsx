import Image from "next/image";
import Button from "./Button";

export default function About() {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start px-5 py-10 md:p-16 w-full">
      {/* Founder image */}
      <div className="relative w-full md:w-1/2 aspect-[5/4] rounded-bl-[50px] rounded-tr-[50px] overflow-hidden flex-shrink-0 bg-second-bg">
        <Image
          src="/images/founder.jpg"
          alt="Anthony — Founder of A Nice Cup of Tea"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-between gap-6 md:w-1/2 self-stretch">
        <h2 className="font-fraunces font-bold text-3xl md:text-[48px] text-main leading-tight">
          About Us
        </h2>
        <p className="font-fraunces font-light text-lg md:text-2xl text-main leading-relaxed text-justify">
          A Nice Cup of Tea was founded by Anthony, an Oxford University graduate
          who has spent over a decade helping Polish students unlock their
          confidence in English. Our native-speaking teachers prepare children,
          adults, and university applicants for the classroom, the conversation,
          the exam, and the interview.
        </p>
        <div>
          <a href="#founder-video">
            <Button variant="filled">Meet the Founder</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
