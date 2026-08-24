import Image from "next/image";
import SoundCloudEmbed from "./SoundCloudEmbed";

interface TrustBarDict {
  badges: { heading: string; cta?: string; description?: string }[];
}

export default function TrustBar({ dict }: { dict: TrustBarDict }) {
  const [bbc, cambridge] = dict.badges;

  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-6 w-full">
      {/* BBC Radio 4 — embeds the interview, seeking to the relevant timestamp */}
      <div
        data-trust-item
        className="bg-second-bg rounded-2xl md:rounded-3xl px-8 py-8 md:px-14 md:py-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 flex-1"
      >
        <div className="shrink-0">
          <Image
            src="/images/logo-bbc-radio-4.svg"
            alt="BBC Radio 4 logo"
            width={140}
            height={60}
            className="h-10 md:h-12 w-auto"
          />
        </div>
        <div className="flex flex-col items-center lg:items-start gap-4 w-full">
          <h3 className="font-fraunces font-bold text-xl md:text-2xl text-white text-center lg:text-left">
            {bbc.heading}
          </h3>
          <div className="w-full lg:max-w-[320px] flex justify-center lg:justify-start">
            <SoundCloudEmbed ctaLabel={bbc.cta ?? ""} />
          </div>
        </div>
      </div>

      {/* Cambridge University Press — no outbound link, keeps visitors on site */}
      <div
        data-trust-item
        className="bg-second-bg rounded-2xl md:rounded-3xl px-8 py-8 md:px-14 md:py-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 flex-1"
      >
        <div className="shrink-0">
          <Image
            src="/images/logo-cambridge.png"
            alt="University of Cambridge logo"
            width={160}
            height={34}
            className="h-10 md:h-12 w-auto"
          />
        </div>
        <div className="flex flex-col items-center lg:items-start gap-2">
          <h3 className="font-fraunces font-bold text-xl md:text-2xl text-white text-center lg:text-left">
            {cambridge.heading}
          </h3>
          <p className="font-inter text-sm text-white/75 text-center lg:text-left">
            {cambridge.description}
          </p>
        </div>
      </div>
    </div>
  );
}
