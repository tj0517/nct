import Button from "./Button";

const pricingRows = [
  { name: "Children\u2019s Lessons", type: "1:1, 60 min", price: "225 PLN" },
  { name: "Adults & Business English", type: "1:1, 60 min", price: "250 PLN" },
  { name: "Small Groups (2\u20133)", type: "Group, 60 min", price: "from 300 PLN" },
  { name: "University Applications", type: "Tailored", price: "After consultation" },
  { name: "Translation & Editing", type: "Per 1800-char page", price: "On request" },
];

export default function Pricing() {
  return (
    <section className="bg-second-bg px-5 md:px-16 py-10 md:py-16 flex flex-col gap-10 md:gap-16 w-full">
      <div className="flex flex-col items-start">
        <p className="font-inter text-base text-accent-text">PRICING</p>
        <h2 className="font-fraunces font-bold text-3xl md:text-[64px] text-main leading-tight md:leading-normal">
          Simple, transparent pricing.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1fr] gap-8 md:gap-x-9">
        {/* Free intro card */}
        <div data-pricing-free className="bg-main rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[100px] md:rounded-tr-[100px] p-8 md:p-16 flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col">
            <p className="font-inter text-base text-second-bg">START HERE</p>
            <p className="font-fraunces font-bold text-4xl md:text-[64px] text-main-bg leading-tight md:leading-normal">
              Free
            </p>
          </div>
          <p className="font-fraunces font-normal text-xl md:text-2xl text-main-bg">
            First 60-minute consultation
          </p>
          <p className="font-fraunces font-light text-lg md:text-2xl text-second-bg leading-normal">
            Level assessment, needs analysis, diagnostic teaching, and teacher
            recommendation. No obligation to continue.
          </p>
          <div className="pt-4">
            <a href="#contact" className="block w-full">
              <Button variant="inverse" className="!w-full">
                Book your free introduction
              </Button>
            </a>
          </div>
        </div>

        {/* Pricing table */}
        <div className="flex flex-col">
          {pricingRows.map((row, i) => (
            <div
              key={i}
              data-pricing-row
              className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-[10px] border-b border-main p-4 overflow-hidden"
            >
              <div className="md:flex-1">
                <p className="font-fraunces font-bold text-lg md:text-2xl text-main leading-normal">
                  {row.name}
                </p>
              </div>
              <div className="md:flex-1 flex items-center md:justify-center">
                <p className="font-inter text-sm md:text-lg text-main/70 md:text-main">{row.type}</p>
              </div>
              <div className="md:flex-1 flex items-center md:justify-center">
                <p className="font-fraunces font-bold text-lg md:text-2xl text-main">
                  {row.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
