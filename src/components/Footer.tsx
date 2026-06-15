const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Teachers", href: "#teachers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-main w-full pb-16">
      <div className="max-w-[1440px] mx-auto px-16 py-20 flex flex-col gap-16">
        {/* Top: brand + nav */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3 max-w-[400px]">
            <p className="font-fraunces font-bold text-[40px] text-main-bg leading-tight">
              A Nice Cup of Tea
            </p>
            <p className="font-fraunces font-light text-lg text-main-bg/60 leading-relaxed">
              Oxford-educated native speakers. English lessons for children,
              adults, and business.
            </p>
          </div>

          <nav className="flex gap-8 pt-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-[13px] uppercase tracking-[0.08em] text-main-bg/50 hover:text-main-bg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact details grid */}
        <div className="grid grid-cols-4 gap-12 border-t border-main-bg/15 pt-10">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              Phone
            </p>
            <a
              href="tel:+48453374984"
              className="font-fraunces text-lg text-main-bg hover:underline"
            >
              +48 453 374 984
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              Email
            </p>
            <a
              href="mailto:hello@anicecupoftea.pl"
              className="font-fraunces text-lg text-main-bg hover:underline"
            >
              hello@anicecupoftea.pl
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              Social
            </p>
            <div className="flex flex-col gap-1">
              <a
                href="https://wa.me/48453374984"
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-lg text-main-bg/70 hover:text-main-bg transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://m.me/anicecupoftea"
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-lg text-main-bg/70 hover:text-main-bg transition-colors"
              >
                Messenger
              </a>
              <a
                href="https://instagram.com/anicecupoftea.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-lg text-main-bg/70 hover:text-main-bg transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-main-bg/40">
              Visit us
            </p>
            <p className="font-fraunces text-lg text-main-bg">
              Słupecka 4
            </p>
            <p className="font-fraunces text-lg text-main-bg/70">
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
            Designed in Warsaw
          </p>
        </div>
      </div>
    </footer>
  );
}
