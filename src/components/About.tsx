import Image from "next/image";
import VideoLightbox from "./VideoLightbox";

interface AboutDict {
  heading: string;
  body: string;
  cta: string;
  imageAlt: string;
  /** Anthony's film. Empty means the CTA is not rendered at all. */
  videoUrl: string;
}

/* Official YouTube play badge — red rounded rectangle, white triangle */
function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 28 20"
      aria-hidden
      className="h-[1.1em] w-auto shrink-0"
    >
      <path
        d="M27.4 3.1a3.5 3.5 0 0 0-2.5-2.5C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10c0 2.3.2 4.6.6 6.9a3.5 3.5 0 0 0 2.5 2.5c2.2.6 10.9.6 10.9.6s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5c.4-2.3.6-4.6.6-6.9 0-2.3-.2-4.6-.6-6.9Z"
        fill="#FF0000"
      />
      <path d="M11.2 14.3 18.5 10l-7.3-4.3v8.6Z" fill="#FFFFFF" />
    </svg>
  );
}

export default function About({ dict }: { dict: AboutDict }) {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start px-5 py-10 md:p-16 w-full">
      {/* Founder image */}
      <div className="relative w-full md:w-1/2 aspect-[5/4] rounded-bl-[50px] rounded-tr-[50px] overflow-hidden flex-shrink-0 bg-second-bg">
        <Image
          src="/images/founder.jpg"
          alt={dict.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>

      {/* Text content */}
      {/* With a film to open, the CTA anchors the bottom of the column; without
          one the copy centres against the photo instead of leaving its hole. */}
      <div
        className={`flex flex-col gap-6 md:w-1/2 self-stretch ${
          dict.videoUrl ? "justify-between" : "justify-center"
        }`}
      >
        <h2 className="font-fraunces font-bold text-3xl md:text-[48px] text-main leading-tight">
          {dict.heading}
        </h2>
        <p className="font-fraunces font-light text-lg md:text-2xl text-main leading-relaxed">
          {dict.body}
        </p>
        {dict.videoUrl && (
          <div>
            {/* The YouTube badge promises a film, so the CTA only exists once
                there is one to open (set in Sanity, Anthony 2026-10-07). */}
            <VideoLightbox url={dict.videoUrl} title={dict.cta} as="cta">
              <span className="inline-flex items-center gap-3">
                <YouTubeIcon />
                {dict.cta}
              </span>
            </VideoLightbox>
          </div>
        )}
      </div>
    </section>
  );
}
