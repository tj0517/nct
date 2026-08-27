interface FooterDict {
  phoneLabel: string;
  emailLabel: string;
  socialLabel: string;
  visitLabel: string;
  designedIn: string;
}

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="bg-white w-full pb-16">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10 md:py-20 flex flex-col gap-10 md:gap-16">
        {/* Brand only — no tagline, no nav links */}
        <p className="font-fraunces font-bold text-2xl md:text-[40px] text-main-bg leading-tight">
          A Nice Cup of Tea
        </p>

        {/* Contact details grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-main-bg/15 pt-8 md:pt-10">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              {dict.phoneLabel}
            </p>
            <a
              href="tel:+48453374984"
              className="font-fraunces text-base md:text-lg text-main-bg hover:underline"
            >
              +48 453 374 984
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              {dict.emailLabel}
            </p>
            <a
              href="mailto:hello@anicecupoftea.pl"
              className="font-fraunces text-base md:text-lg text-main-bg hover:underline break-all"
            >
              hello@anicecupoftea.pl
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              {dict.socialLabel}
            </p>
            <div className="flex flex-col gap-1">
              <a
                href="https://m.me/anicecupoftea"
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-base md:text-lg text-main-bg/70 hover:text-main-bg transition-colors"
              >
                Messenger
              </a>
              <a
                href="https://instagram.com/anicecupoftea.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-base md:text-lg text-main-bg/70 hover:text-main-bg transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              {dict.visitLabel}
            </p>
            <p className="font-fraunces text-base md:text-lg text-main-bg">
              Słupecka 4
            </p>
            <p className="font-fraunces text-base md:text-lg text-main-bg/70">
              Warsaw, Poland
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-main-bg/15 pt-6 flex items-center justify-between">
          <p className="font-inter text-xs text-main-bg/40">
            &copy; {new Date().getFullYear()} A Nice Cup of Tea
          </p>
          <p className="font-inter text-xs text-main-bg/40">
            {dict.designedIn}
          </p>
        </div>
      </div>
    </footer>
  );
}
