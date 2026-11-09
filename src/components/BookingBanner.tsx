import type { SiteDict } from "@/lib/site";
import ContactForm, { type ContactFormDict } from "./ContactForm";
import ContactLinks from "./ContactLinks";

export default function BookingBanner({
  dict,
  site,
}: {
  dict: ContactFormDict;
  site: SiteDict;
}) {
  /* A word longer than "Contact" can't shrink to its column on a tablet, so a
     heading with one ("Formularz kontaktowy") is set smaller there; 5.3vw keeps
     "kontaktowy" inside the column from 768px and reaches 64px at 1208px. */
  const longWord = Math.max(...dict.heading.split(/\s+/).map((w) => w.length)) > 9;
  const headingSize = longWord ? "md:text-[min(64px,5.3vw)]" : "md:text-[64px]";

  return (
    <section id="contact" className="scroll-mt-20 border-t border-main w-full py-12 md:py-24 bg-second-bg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex flex-col gap-12 md:gap-20">
        {/* Top row: copy + form */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr] gap-10 md:gap-16 items-start">
          {/* Left: copy */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className={`font-fraunces font-bold text-3xl ${headingSize} text-main leading-tight`}>
              {dict.heading}
            </h2>
            <ContactLinks site={site} labels={dict} className="pt-2" />
          </div>

          {/* Right: form */}
          <ContactForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
