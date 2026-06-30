const categories = [
  {
    name: "Children & Teens",
    href: "/children",
    description:
      "Stories, questions, rhymes, and conversations. We help children speak clearly, write boldly, and use English with confidence.",
  },
  {
    name: "Adults",
    href: "/adults",
    description:
      "Richer vocabulary, clearer pronunciation, true confidence when you speak. We correct gently, without making you smaller.",
  },
  {
    name: "Business English",
    href: "/business",
    description:
      "Meetings, presentations, negotiations, interviews. Confident English for the room you want to be in.",
  },
  {
    name: "University Applications",
    href: "/university",
    description:
      "Personal statements, admissions essays, interview preparation. Our students have won places at Oxford, Stanford, and beyond.",
  },
  {
    name: "Maths in English",
    href: "/maths",
    description:
      "IB, international school, and exam Maths taught online by Dr Rishi Handa. The Maths and the English of Maths.",
  },
];

export default function WhoWeTeach() {
  return (
    <section className="w-full px-5 md:px-16 relative z-10 -mb-32">
      <div className="bg-main rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[150px] md:rounded-tr-[150px] p-6 md:p-16 flex flex-col gap-[10px]">
        <div data-wwt-heading>
          <p className="font-inter text-base text-second-bg">WHO WE TEACH</p>
          <h2 className="font-fraunces font-bold text-3xl md:text-[64px] text-main-bg leading-tight md:leading-normal">
            English for every stage of life
          </h2>
        </div>

        <div className="flex flex-col pt-8 md:pt-16">
          {categories.map((cat, i) => (
            <a
              key={i}
              href={cat.href}
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
    </section>
  );
}
