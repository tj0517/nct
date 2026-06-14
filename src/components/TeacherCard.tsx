import Image from "next/image";

interface TeacherCardProps {
  name: string;
  bio: string;
  image: string;
  hasVideo?: boolean;
}

export default function TeacherCard({ name, bio, image, hasVideo }: TeacherCardProps) {
  return (
    <div data-teacher-card className="bg-main-bg border-2 border-main rounded-[50px] p-9 flex flex-col gap-4 drop-shadow-[8px_8px_0px_var(--main)]">
      <div className="flex items-center gap-4">
        <div className="relative size-20 rounded-full overflow-hidden shrink-0 grayscale">
          <Image
            src={image}
            alt={name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        {hasVideo && (
          <button className="flex items-center gap-2 group cursor-pointer">
            <div className="size-10 rounded-full bg-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
              <svg
                width="12"
                height="14"
                viewBox="0 0 24 28"
                fill="none"
                className="ml-0.5"
              >
                <path d="M24 14L0 28V0L24 14Z" className="fill-main-bg" />
              </svg>
            </div>
            <span className="font-inter text-xs uppercase tracking-wider text-main/50 group-hover:text-main transition-colors">
              Watch intro
            </span>
          </button>
        )}
      </div>
      <h3 className="font-fraunces font-bold text-[32px] text-main leading-normal">
        {name}
      </h3>
      <p className="font-fraunces font-normal text-lg text-main text-justify leading-normal">
        {bio}
      </p>
    </div>
  );
}
