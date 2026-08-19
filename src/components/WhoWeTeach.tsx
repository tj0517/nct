import type { Locale } from "@/dictionaries";
import { localePath } from "@/lib/locale-path";

interface WhoWeTeachDict {
  label: string;
  heading: string;
  categories: { name: string; href: string; description: string }[];
}

export default function WhoWeTeach({
  dict,
  lang,
}: {
  dict: WhoWeTeachDict;
  lang: Locale;
}) {
  return (
    <section className="w-full relative z-10 -mb-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        <div className="bg-cambridge-blue rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[150px] md:rounded-tr-[150px] p-6 md:p-16 flex flex-col gap-[10px]">
          <div data-wwt-heading>
            <p className="font-inter text-base text-second-bg">{dict.label}</p>
            <h2 className="font-fraunces font-bold text-3xl md:text-[64px] text-main-bg leading-tight md:leading-normal">
              {dict.heading}
            </h2>
          </div>

          <div className="flex flex-col pt-8 md:pt-16">
            {dict.categories.map((cat, i) => (
              <a
                key={i}
                href={localePath(cat.href, lang)}
                data-wwt-row
                className={`flex flex-row items-center gap-4 md:gap-[10px] py-4 border-second-bg overflow-hidden ${
                  i === 0 ? "border-t border-b" : "border-b"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-[10px] flex-1 min-w-0">
                  <div className="md:flex-1">
                    <p className="font-fraunces font-normal text-xl md:text-[28px] text-main-bg">
                      {cat.name}
                    </p>
                  </div>
                  <div className="md:flex-1 flex items-center md:justify-center">
                    <p className="font-fraunces font-light text-sm md:text-lg text-second-bg md:text-center w-full">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end shrink-0">
                  <div className="border border-main-bg rounded-bl-[10px] rounded-tr-[10px] w-[36px] md:w-[44px] flex items-center justify-center">
                    <span className="font-fraunces font-black text-[28px] md:text-[36px] text-main-bg">
                      &gt;
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
