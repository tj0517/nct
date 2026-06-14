const categories = [
  {
    name: "Children & Teens",
    description:
      "Stories, questions, rhymes, and conversations. We help children speak clearly, write boldly, and use English with confidence.",
  },
  {
    name: "Adults",
    description:
      "Richer vocabulary, clearer pronunciation, true confidence when you speak. We correct gently, without making you smaller.",
  },
  {
    name: "Business English",
    description:
      "Meetings, presentations, negotiations, interviews. Confident English for the room you want to be in.",
  },
  {
    name: "University Applications",
    description:
      "Personal statements, admissions essays, interview preparation. Our students have won places at Oxford, Stanford, and beyond.",
  },
  {
    name: "Maths in English",
    description:
      "IB, international school, and exam Maths taught online by Dr Rishi Handa. The Maths and the English of Maths.",
  },
];

export default function WhoWeTeach() {
  return (
    <section className="w-full px-16 relative z-10 -mb-32">
      <div className="bg-main rounded-bl-[150px] rounded-tr-[150px] p-16 flex flex-col gap-[10px]">
        <div data-wwt-heading>
          <p className="font-inter text-base text-second-bg">WHO WE TEACH</p>
          <h2 className="font-fraunces font-bold text-[64px] text-main-bg leading-normal">
            English for every stage of life
          </h2>
        </div>

        <div className="flex flex-col pt-16">
          {categories.map((cat, i) => (
            <div
              key={i}
              data-wwt-row
              className={`flex items-center gap-[10px] py-4 border-second-bg overflow-hidden ${
                i === 0 ? "border-t border-b" : "border-b"
              }`}
            >
              <div className="flex-1">
                <p className="font-fraunces font-normal text-[28px] text-main-bg">
                  {cat.name}
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="font-fraunces font-light text-lg text-second-bg text-center w-full">
                  {cat.description}
                </p>
              </div>
              <div className="flex-1 flex items-center justify-end">
                <div className="border border-main-bg rounded-bl-[10px] rounded-tr-[10px] w-[44px] flex items-center justify-center">
                  <span className="font-fraunces font-black text-[36px] text-main-bg">
                    &gt;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
