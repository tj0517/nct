import Button from "./Button";

export default function WhyUs() {
  return (
    <section id="why-us" className="w-full px-16 py-24">
      <div className="max-w-[1440px] mx-auto flex gap-16 items-start">
        {/* Left: founder video placeholder */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="aspect-video w-full bg-main/10 border-2 border-main rounded-bl-[60px] rounded-tr-[60px] flex items-center justify-center overflow-hidden relative group cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <div className="size-20 rounded-full bg-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M24 14L0 28V0L24 14Z"
                    className="fill-main-bg"
                  />
                </svg>
              </div>
              <p className="font-inter text-sm text-main/60 uppercase tracking-wider">
                Meet Anthony Goltz
              </p>
            </div>
          </div>
          <p className="font-inter text-xs text-main/40">
            Founder introduction — video coming soon
          </p>
        </div>

        {/* Right: why us copy */}
        <div className="flex-1 flex flex-col gap-8 pt-4">
          <div>
            <p className="font-inter text-base text-main">WHY US</p>
            <h2 className="font-fraunces font-bold text-[56px] text-main leading-tight">
              So much depends upon the right teacher.
            </h2>
          </div>
          <p className="font-fraunces font-light text-2xl text-main leading-relaxed">
            We do not teach English the way most schools teach English. There is
            no mechanical march through a textbook. No plastic conversation. No
            pretending that grammar drills are the same as learning to speak.
          </p>
          <p className="font-fraunces font-light text-2xl text-main leading-relaxed">
            Our teachers are Oxford and Cambridge educated native speakers who
            correct carefully, listen closely, and meet you exactly where you
            are.
          </p>
          <div className="pt-4">
            <a href="#contact">
              <Button variant="filled">Book your free 60-minute introduction</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
