import ContactForm, { type ContactFormDict } from "./ContactForm";
import ContactLinks from "./ContactLinks";

export default function BookingBanner({ dict }: { dict: ContactFormDict }) {
  return (
    <section id="contact" className="border-t border-main w-full py-12 md:py-24 bg-second-bg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex flex-col gap-12 md:gap-20">
        {/* Top row: copy + form */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr] gap-10 md:gap-16 items-start">
          {/* Left: copy */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="font-fraunces font-bold text-3xl md:text-[64px] text-main leading-tight">
              {dict.heading}
            </h2>
            <ContactLinks className="pt-2" />
          </div>

          {/* Right: form */}
          <ContactForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
