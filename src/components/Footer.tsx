import { parseAddress, telHref, type SiteDict } from "@/lib/site";

interface FooterDict {
  phoneLabel: string;
  emailLabel: string;
  socialLabel: string;
  visitLabel: string;
  nipLabel: string;
  bankLabel: string;
  designedIn: string;
}

export default function Footer({ dict, site }: { dict: FooterDict; site: SiteDict }) {
  const { street, rest } = parseAddress(site.address);

  return (
    <footer className="bg-union-white w-full pb-16">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10 md:py-20 flex flex-col gap-10 md:gap-16">
        {/* Brand only — no tagline, no nav links */}
        <p className="font-fraunces font-bold text-2xl md:text-[40px] text-union-blue leading-tight">
          A Nice Cup of Tea
        </p>

        {/* Contact details grid. On phones the two columns are too narrow for
            the e-mail address, so it drops to its own full-width row and the
            social column moves up beside the phone. From md the four columns
            are back in their original order. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-union-blue/15 pt-8 md:pt-10">
          {/* Phone */}
          <div className="order-1 md:order-none flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-union-blue/40">
              {dict.phoneLabel}
            </p>
            <a
              href={telHref(site.phone)}
              className="font-fraunces text-[15px] md:text-lg text-union-blue hover:underline whitespace-nowrap"
            >
              {site.phone}
            </a>
          </div>

          {/* Email */}
          <div className="order-3 md:order-none col-span-2 md:col-span-1 flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-union-blue/40">
              {dict.emailLabel}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="font-fraunces text-[15px] md:text-lg text-union-blue hover:underline whitespace-nowrap"
            >
              {site.email}
            </a>
          </div>

          {/* Social */}
          <div className="order-2 md:order-none flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-union-blue/40">
              {dict.socialLabel}
            </p>
            <div className="flex flex-col gap-1">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-base md:text-lg text-union-blue/70 hover:text-union-blue transition-colors"
              >
                Facebook
              </a>
              <a
                href={site.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-base md:text-lg text-union-blue/70 hover:text-union-blue transition-colors"
              >
                Messenger
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces text-base md:text-lg text-union-blue/70 hover:text-union-blue transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="order-4 md:order-none col-span-2 md:col-span-1 flex flex-col gap-2">
            <p className="font-inter text-xs uppercase tracking-wider text-union-blue/40">
              {dict.visitLabel}
            </p>
            <p className="font-fraunces text-base md:text-lg text-union-blue">
              {street}
            </p>
            {rest && (
              <p className="font-fraunces text-base md:text-lg text-union-blue/70">
                {rest}
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar. The registration details sit here rather than in the
            contact grid: they are legal small print, not a way to reach the
            school, and they are set as quietly as the copyright line. */}
        <div className="border-t border-union-blue/15 pt-6 flex flex-col gap-3 font-inter text-xs text-union-blue/40">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <p>
              {dict.nipLabel} {site.nip}
            </p>
            <p>
              {dict.bankLabel} {site.bankAccount}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} A Nice Cup of Tea</p>
            <p>{dict.designedIn}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
