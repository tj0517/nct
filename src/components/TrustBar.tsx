import Image from "next/image";
import Button from "./Button";

const badges = [
  {
    logoSrc: "/images/logo-bbc-radio-4.svg",
    logoAlt: "BBC Radio 4 logo",
    logoWidth: 140,
    logoHeight: 60,
    heading: "Featured on BBC Radio 4",
    cta: "Listen on Soundcloud",
    href: "https://soundcloud.com/anthony-goltz/brits-abroad-230715",
  },
  {
    logoSrc: "/images/logo-cambridge.png",
    logoAlt: "University of Cambridge logo",
    logoWidth: 160,
    logoHeight: 34,
    heading: "Published by Cambridge University Press",
    cta: "Visit Cambridge University Press",
    href: "https://www.cambridge.org/core/journals/rural-history/article/conflicts-over-common-rights-to-cattle-grazing-on-common-lands-and-manorial-properties-in-austrian-galicia-17721918/8D30603CCD0470BD94EFAB725C38B2A7",
  },
];

export default function TrustBar() {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-6 w-full px-0 md:px-8">
      {badges.map((badge) => (
        <div
          key={badge.heading}
          data-trust-item
          className="bg-second-bg rounded-2xl md:rounded-3xl px-8 py-8 md:px-14 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 flex-1"
        >
          <div className="shrink-0">
            <Image
              src={badge.logoSrc}
              alt={badge.logoAlt}
              width={badge.logoWidth}
              height={badge.logoHeight}
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-fraunces font-bold text-xl md:text-2xl text-main text-center md:text-left">
              {badge.heading}
            </h3>
            <a href={badge.href} target="_blank" rel="noopener noreferrer">
              <Button variant="filled" size="small">
                {badge.cta}
              </Button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
