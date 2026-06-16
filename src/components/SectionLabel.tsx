interface SectionLabelProps {
  label: string;
  title: string;
  titleColor?: "accent" | "main" | "main-bg";
  labelColor?: "main" | "second-bg" | "accent-text";
}

export default function SectionLabel({
  label,
  title,
  titleColor = "main",
  labelColor = "main",
}: SectionLabelProps) {
  return (
    <div className="flex flex-col items-start">
      <p className={`font-inter text-base text-${labelColor}`}>{label}</p>
      <h2
        className={`font-fraunces font-bold text-[64px] leading-normal text-${titleColor}`}
      >
        {title}
      </h2>
    </div>
  );
}
