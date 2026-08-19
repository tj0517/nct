import Image from "next/image";
import Button from "./Button";

interface AboutDict {
  heading: string;
  body: string;
  cta: string;
  imageAlt: string;
}

export default function About({ dict }: { dict: AboutDict }) {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start px-5 py-10 md:p-16 w-full">
      {/* Founder image */}
      <div className="relative w-full md:w-1/2 aspect-[5/4] rounded-bl-[50px] rounded-tr-[50px] overflow-hidden flex-shrink-0 bg-second-bg">
        <Image
          src="/images/founder.jpg"
          alt={dict.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-between gap-6 md:w-1/2 self-stretch">
        <h2 className="font-fraunces font-bold text-3xl md:text-[48px] text-main leading-tight">
          {dict.heading}
        </h2>
        <p className="font-fraunces font-light text-lg md:text-2xl text-main leading-relaxed">
          {dict.body}
        </p>
        <div>
          <a href="#founder-video">
            <Button variant="filled">{dict.cta}</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
