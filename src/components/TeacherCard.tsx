import Image from "next/image";

interface TeacherCardProps {
  name: string;
  credential: string;
  bio: string;
  image: string;
  hasVideo?: boolean;
}

export default function TeacherCard({ name, credential, bio, image, hasVideo }: TeacherCardProps) {
  return (
    <div data-teacher-card className="bg-white rounded-bl-[30px] rounded-tr-[30px] md:rounded-bl-[40px] md:rounded-tr-[40px] p-5 md:p-7 flex flex-col gap-4 shadow-[4px_4px_0px_var(--accent)] md:shadow-[6px_6px_0px_var(--accent)]">
      <div className="flex items-center gap-4">
        <div className="relative size-20 md:size-24 rounded-full overflow-hidden shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            sizes="96px"
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-fraunces font-bold text-xl md:text-2xl text-[#012169] leading-tight">
            {name}
          </h3>
          <p className="font-inter text-xs uppercase tracking-wider text-[#C8102E]">
            {credential}
          </p>
        </div>
      </div>
      <p className="font-fraunces font-normal text-base text-[#012169]/70 leading-relaxed">
        {bio}
      </p>
      {hasVideo && (
        <button className="flex items-center gap-2 group cursor-pointer self-start">
          <div className="size-9 rounded-full bg-[#012169] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
            <svg width="10" height="12" viewBox="0 0 24 28" fill="none" className="ml-0.5">
              <path d="M24 14L0 28V0L24 14Z" fill="white" />
            </svg>
          </div>
          <span className="font-inter text-xs uppercase tracking-wider text-[#012169]/50 group-hover:text-[#012169] transition-colors">
            Watch intro
          </span>
        </button>
      )}
    </div>
  );
}
