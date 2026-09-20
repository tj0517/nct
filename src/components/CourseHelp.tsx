export interface CourseHelpDict {
  heading: string;
  items: string[];
}

/* "We can help you:" — the offer, as a numbered list with hairline rules. */
export default function CourseHelp({ dict }: { dict: CourseHelpDict }) {
  return (
    <section className="w-full px-5 md:px-16 py-16 md:py-28 border-t border-main/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 md:gap-20 items-start">
        <h2 className="font-fraunces font-bold text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-tight text-main md:sticky md:top-32">
          {dict.heading}
        </h2>

        <ol className="flex flex-col border-t border-main/15">
          {dict.items.map((item, i) => (
            <li
              key={item}
              className="group flex items-baseline gap-5 md:gap-8 border-b border-main/15 py-5 md:py-8 cursor-default"
            >
              <span className="font-inter text-xs md:text-sm tracking-[0.12em] text-accent-text shrink-0 w-8 md:w-12">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-fraunces font-normal text-[clamp(21px,2.5vw,36px)] leading-[1.25] text-main transition-transform duration-300 group-hover:translate-x-2">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
