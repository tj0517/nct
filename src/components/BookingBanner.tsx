import Button from "./Button";

export default function BookingBanner() {
  return (
    <section id="contact" className="border-t border-main w-full px-16 py-24 bg-second-bg">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20">
        {/* Top row: copy + form */}
        <div className="grid grid-cols-[1fr_0.85fr] gap-16 items-start">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <p className="font-inter text-base text-accent-text">GET STARTED</p>
            <h2 className="font-fraunces font-bold text-[64px] text-main leading-tight">
              Book your free
              <br />
              60-minute introduction
            </h2>
            <p className="font-fraunces font-light text-2xl text-main leading-normal max-w-[520px]">
              Level assessment, needs analysis, diagnostic teaching, and teacher
              recommendation. No obligation to continue.
            </p>
            <p className="font-fraunces font-light text-lg text-main/70 leading-relaxed max-w-[520px]">
              We are always happy to welcome students at Słupecka 4 in Warsaw,
              but online introductory sessions are also available.
            </p>
          </div>

          {/* Right: form */}
          <div className="bg-main rounded-bl-[100px] rounded-tr-[100px] p-12 flex flex-col gap-5">
            <input
              type="text"
              placeholder="Name"
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-6 py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-6 py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-6 py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
            />

            {/* Meeting preference */}
            <div className="flex gap-3">
              <label className="flex-1 flex items-center gap-3 bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-6 py-4 cursor-pointer has-[:checked]:bg-main-bg has-[:checked]:ring-2 has-[:checked]:ring-main-bg transition-colors">
                <input
                  type="radio"
                  name="meeting"
                  value="in-person"
                  className="accent-main-bg w-4 h-4"
                  defaultChecked
                />
                <span className="font-inter text-base text-main">In person</span>
              </label>
              <label className="flex-1 flex items-center gap-3 bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-6 py-4 cursor-pointer has-[:checked]:bg-main-bg has-[:checked]:ring-2 has-[:checked]:ring-main-bg transition-colors">
                <input
                  type="radio"
                  name="meeting"
                  value="online"
                  className="accent-main-bg w-4 h-4"
                />
                <span className="font-inter text-base text-main">Online</span>
              </label>
            </div>

            <textarea
              placeholder="Message (optional)"
              rows={3}
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-6 py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors resize-none"
            />
            <Button variant="inverse" className="!w-full !h-auto !py-4 !font-normal mt-2">
              Book your free introduction
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
