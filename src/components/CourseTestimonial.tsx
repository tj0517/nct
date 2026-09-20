import Image from "next/image";

export interface CourseTestimonialDict {
  quote: string;
  author: string;
  role: string;
  image: string;
  imageAlt: string;
}

/* Single, full-width pull quote with a black-and-white portrait — the
   "why trust us" beat of a course landing page. */
export default function CourseTestimonial({ dict }: { dict: CourseTestimonialDict }) {
  return (
    <section className="w-full px-5 md:px-16 py-16 md:py-28">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] gap-10 md:gap-20 items-center">
        {/* Portrait */}
        <div className="relative w-[62%] max-w-[300px] md:w-full md:max-w-none aspect-square rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[80px] md:rounded-tr-[80px] overflow-hidden bg-main/5">
          <Image
            src={dict.image}
            alt={dict.imageAlt}
            fill
            sizes="(max-width: 768px) 62vw, 34vw"
            className="object-cover grayscale"
          />
        </div>

        {/* Quote */}
        <figure className="flex flex-col gap-8 md:gap-10">
          <blockquote>
            <p className="font-fraunces font-normal text-[clamp(24px,3.1vw,46px)] leading-[1.25] text-main [hanging-punctuation:first]">
              &ldquo;{dict.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex items-center gap-4">
            <span aria-hidden className="h-[2px] w-10 bg-accent shrink-0" />
            <span className="font-inter text-sm md:text-base text-main">
              <span className="font-semibold">{dict.author}</span>
              <span className="text-main/55">, {dict.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
