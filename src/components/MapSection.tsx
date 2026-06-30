import SectionLabel from "./SectionLabel";

export default function MapSection() {
  return (
    <section className="flex flex-col gap-6 md:gap-8 py-10 md:py-20 px-5 md:px-16 w-full">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <SectionLabel label="VISIT US" title="Słupecka 4, Warsaw" labelColor="accent-text" />
        <p className="font-fraunces font-light text-base md:text-lg text-main/70 max-w-[480px]">
          In the heart of Ochota — a real school with real teachers you can sit across from. Online lessons also available.
        </p>
      </div>

      <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-bl-[25px] rounded-tr-[25px] overflow-hidden border-2 border-main">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.0!2d20.9855!3d52.2175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471932e0a5f5b8c1%3A0x2e1b0f3c8a9d7e6b!2sS%C5%82upecka%204%2C%2002-309%20Warszawa!5e0!3m2!1sen!2spl!4v1700000000000!5m2!1sen!2spl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="A Nice Cup of Tea — Słupecka 4, Warsaw"
        />
      </div>
    </section>
  );
}
