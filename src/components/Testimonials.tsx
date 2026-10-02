import Image from "next/image";
import SectionLabel from "./SectionLabel";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface TestimonialsDict {
  label: string;
  heading: string;
  list: Testimonial[];
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-second-bg border border-main/75 rounded-bl-[30px] rounded-tr-[30px] p-6 md:p-8 flex flex-col gap-5 h-full">
      <p className="font-fraunces font-normal text-base md:text-lg text-main leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className={`relative size-20 md:size-24 rounded-full overflow-hidden shrink-0 flex items-center justify-center ${t.image ? "bg-second-bg" : "bg-second-bg border-2 border-main/30"}`}>
          {t.image ? (
            <Image
              src={t.image}
              alt={t.author}
              fill
              sizes="96px"
              className="object-cover grayscale"
            />
          ) : (
            <span className="text-xl" aria-label="Director's chair">🎬</span>
          )}
        </div>
        <div>
          <p className="font-fraunces font-bold text-base md:text-lg text-main leading-tight">
            {t.author}
          </p>
          <p className="font-inter text-sm text-main/60">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
  return (
    <section className="py-10 md:py-20 w-full bg-main-bg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex flex-col gap-8 md:gap-12">
        <SectionLabel title={dict.heading} titleColor="main" />

        {/* Desktop: 3 across, hovered card grows wider and the others yield */}
        <div className="hidden lg:flex gap-6">
          {dict.list.map((t) => (
            <div
              key={t.author}
              className="min-w-0 flex-1 hover:flex-[1.4] transition-[flex-grow] duration-500 ease-out"
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* Mobile/tablet: stacked vertically */}
        <div className="lg:hidden flex flex-col gap-6">
          {dict.list.map((t) => (
            <TestimonialCard key={t.author} t={t} />
          ))}
        </div>
  </div>
    </section>
  );
}
