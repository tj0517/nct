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
    <div data-teacher-card className="bg-main-bg rounded-bl-[30px] rounded-tr-[30px] md:rounded-bl-[40px] md:rounded-tr-[40px] p-5 md:p-7 flex flex-col gap-4 shadow-[4px_4px_0px_var(--main)] md:shadow-[6px_6px_0px_var(--main)]">
      <div className="flex items-center gap-4 md:gap-5">
        <div className="relative size-28 md:size-32 rounded-full overflow-hidden shrink-0 bg-white">
          <Image
            src={image}
            alt={name}
            fill
            sizes="128px"
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-fraunces font-bold text-xl md:text-2xl text-main leading-tight">
            {name}
          </h3>
          <p className="font-inter text-xs uppercase tracking-wider text-accent-text">
            {credential}
          </p>
        </div>
      </div>
      <p className="font-fraunces font-normal text-base text-main/70 leading-relaxed">
        {bio}
      </p>
      {hasVideo && (
        <button className="flex items-center gap-2 group cursor-pointer self-start mt-auto">
          <div className="size-9 rounded-full bg-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
            <svg width="10" height="12" viewBox="0 0 24 28" fill="none" className="ml-0.5">
              <path d="M24 14L0 28V0L24 14Z" fill="var(--main-bg)" />
            </svg>
          </div>
          <span className="font-inter text-xs uppercase tracking-wider text-main/50 group-hover:text-main transition-colors">
            Watch intro
          </span>
        </button>
      )}
    </div>
  );
}
