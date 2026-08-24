import Button from "./Button";

interface PricingDict {
  label: string;
  heading: string;
  freePrice: string;
  freeDesc: string;
  freeCta: string;
  price: string;
  priceDesc: string;
}

export default function Pricing({ dict }: { dict: PricingDict }) {
  return (
    <section className="bg-second-bg py-10 md:py-16 w-full">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col items-start">
          <p className="font-inter text-base text-accent-text">{dict.label}</p>
          <h2 className="font-fraunces font-bold text-3xl md:text-[64px] text-main leading-tight md:leading-normal">
            {dict.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-9 items-stretch">
          {/* Free assessment — the primary conversion path, called out with an accent border + shadow */}
          <div
            data-pricing-free
            className="relative bg-accent rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[100px] md:rounded-tr-[100px] p-8 md:p-16 flex flex-col gap-4 border-2 border-main-bg shadow-[6px_6px_0px_var(--main-bg)] md:shadow-[10px_10px_0px_var(--main-bg)]"
          >
            <span className="absolute top-6 right-6 md:top-10 md:right-10 font-inter text-xs md:text-sm font-bold tracking-wide text-white bg-main-bg rounded-full px-3 py-1">
              START HERE
            </span>
            <p className="font-fraunces font-bold text-4xl md:text-[64px] text-white leading-tight md:leading-normal">
              {dict.freePrice}
            </p>
            <p className="font-fraunces font-light text-xl md:text-2xl text-white/75 leading-normal">
              {dict.freeDesc}
            </p>
            <div className="pt-4 mt-auto">
              <a href="#contact" className="block w-full">
                <Button variant="inverse" className="!w-full !px-4">
                  {dict.freeCta}
                </Button>
              </a>
            </div>
          </div>

          {/* Per-lesson price */}
          <div
            data-pricing-row
            className="bg-main-bg rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[100px] md:rounded-tr-[100px] p-8 md:p-16 flex flex-col justify-center gap-4 shadow-[6px_6px_0px_var(--main)] md:shadow-[10px_10px_0px_var(--main)]"
          >
            <p className="font-fraunces font-bold text-4xl md:text-[64px] text-main leading-tight md:leading-normal">
              {dict.price}
            </p>
            <p className="font-fraunces font-light text-xl md:text-2xl text-main/70 leading-normal">
              {dict.priceDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
