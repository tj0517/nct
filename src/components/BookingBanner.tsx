import Button from "./Button";

export default function BookingBanner() {
  return (
    <section id="contact" className="border-t border-main w-full px-5 md:px-16 py-12 md:py-24 bg-second-bg">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-20">
        {/* Top row: copy + form */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr] gap-10 md:gap-16 items-start">
          {/* Left: copy */}
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="font-inter text-base text-accent-text">GET STARTED</p>
            <h2 className="font-fraunces font-bold text-3xl md:text-[64px] text-main leading-tight">
              Book your free
              <br />
              60-minute introduction
            </h2>
            <p className="font-fraunces font-light text-lg md:text-2xl text-main leading-normal max-w-[520px]">
              Level assessment, needs analysis, diagnostic teaching, and teacher
              recommendation. No obligation to continue.
            </p>
            <p className="font-fraunces font-light text-base md:text-lg text-main/70 leading-relaxed max-w-[520px]">
              We are always happy to welcome students at Słupecka 4 in Warsaw,
              but online introductory sessions are also available.
            </p>

            {/* Social / contact links */}
            <div className="flex items-center gap-5 pt-2">
              {/* Messenger */}
              <a
                href="https://m.me/anicecupoftea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger"
                className="text-main/50 hover:text-accent-text transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.37 2 2 6.13 2 11.7c0 2.96 1.2 5.5 3.16 7.3.16.15.26.36.27.58l.05 1.82c.02.56.6.93 1.11.7l2.04-.9c.17-.08.37-.1.55-.06.9.25 1.85.38 2.82.38 5.63 0 10-4.13 10-9.7S17.63 2 12 2zm5.95 7.57l-2.9 4.6c-.46.73-1.44.92-2.13.4l-2.3-1.73a.6.6 0 00-.72 0l-3.11 2.36c-.42.31-.96-.17-.7-.62l2.9-4.6c.46-.73 1.44-.92 2.13-.4l2.3 1.73a.6.6 0 00.72 0l3.11-2.36c.42-.31.96.17.7.62z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/anicecupoftea.pl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-main/50 hover:text-accent-text transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/48453374984"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-main/50 hover:text-accent-text transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.93-.27-.1-.46-.15-.66.14-.19.3-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.19 3.02.15.2 2.06 3.15 5  4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.2-.56-.34zM12.05 21.5h-.03c-1.76 0-3.49-.47-5-1.37l-.36-.21-3.73.98.99-3.63-.24-.37A9.43 9.43 0 012.5 12.05C2.5 6.79 6.79 2.5 12.05 2.5c2.57 0 4.98 1 6.79 2.82a9.52 9.52 0 012.82 6.79c0 5.26-4.29 9.54-9.56 9.56l-.05-.17zm8.13-17.63A11.44 11.44 0 0012.05.5C5.68.5.5 5.68.5 12.05c0 2.04.53 4.03 1.54 5.78L.5 23.5l5.83-1.53a11.4 11.4 0 005.72 1.54h.01c6.37 0 11.55-5.18 11.56-11.55a11.48 11.48 0 00-3.38-8.14l-.06.05z"/>
                </svg>
              </a>
              {/* Phone */}
              <a
                href="tel:+48453374984"
                aria-label="Phone"
                className="text-main/50 hover:text-accent-text transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:hello@anicecupoftea.pl"
                aria-label="Email"
                className="text-main/50 hover:text-accent-text transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-main rounded-bl-[50px] rounded-tr-[50px] md:rounded-bl-[100px] md:rounded-tr-[100px] p-6 md:p-12 flex flex-col gap-4 md:gap-5">
            <input
              type="text"
              placeholder="Name"
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
            />

            {/* Meeting preference */}
            <div className="flex gap-3">
              <label className="flex-1 flex items-center gap-3 bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 cursor-pointer has-[:checked]:bg-main-bg has-[:checked]:ring-2 has-[:checked]:ring-main-bg transition-colors">
                <input
                  type="radio"
                  name="meeting"
                  value="in-person"
                  className="accent-main-bg w-4 h-4"
                  defaultChecked
                />
                <span className="font-inter text-sm md:text-base text-main">In person</span>
              </label>
              <label className="flex-1 flex items-center gap-3 bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 cursor-pointer has-[:checked]:bg-main-bg has-[:checked]:ring-2 has-[:checked]:ring-main-bg transition-colors">
                <input
                  type="radio"
                  name="meeting"
                  value="online"
                  className="accent-main-bg w-4 h-4"
                />
                <span className="font-inter text-sm md:text-base text-main">Online</span>
              </label>
            </div>

            <textarea
              placeholder="Message (optional)"
              rows={3}
              className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors resize-none"
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
