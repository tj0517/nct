import ContactForm, { type ContactFormDict } from "./ContactForm";
import ContactLinks from "./ContactLinks";

/* Contact section for the white course pages — the same enquiry form as the
   homepage, sitting on white with a Union Blue card. Target of every CTA. */
export default function CourseContact({ dict }: { dict: ContactFormDict }) {
  return (
    <section id="contact" className="w-full py-16 md:py-28 border-t border-main/10 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-[1fr_0.85fr] gap-10 md:gap-16 items-start">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="font-fraunces font-bold text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-tight text-main">
            {dict.heading}
          </h2>
          <ContactLinks className="pt-2" />
        </div>
        <ContactForm dict={dict} />
      </div>
    </section>
  );
}
