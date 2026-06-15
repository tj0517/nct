interface ButtonProps {
  children: React.ReactNode;
  variant?: "filled" | "outline" | "inverse";
  size?: "default" | "small";
  className?: string;
}

export default function Button({
  children,
  variant = "filled",
  size = "default",
  className = "",
}: ButtonProps) {
  const sizeClasses =
    size === "small"
      ? "text-base px-7 py-2.5"
      : "font-light text-2xl h-[75px] w-[300px]";

  const variantClasses = {
    filled: "bg-accent text-main-bg border-accent",
    outline: "bg-transparent text-main border-main",
    inverse: "bg-main-bg text-accent border-main-bg",
  };

  /* Fill sweep color — what slides in on hover */
  const fillClasses = {
    filled: "bg-main-bg",
    outline: "bg-main",
    inverse: "bg-accent",
  };

  /* Text color after fill has swept in */
  const hoverTextClasses = {
    filled: "group-hover:text-accent",
    outline: "group-hover:text-main-bg",
    inverse: "group-hover:text-main-bg",
  };

  return (
    <button
      className={`group relative font-fraunces ${sizeClasses} rounded-bl-[25px] rounded-tr-[25px] border flex items-center justify-center cursor-pointer overflow-hidden ${variantClasses[variant]} ${className}`}
    >
      {/* Background sweep — scales from 0 to full on hover */}
      <span
        className={`absolute inset-0 rounded-bl-[25px] rounded-tr-[25px] ${fillClasses[variant]} origin-bottom-left scale-0 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-100`}
      />

      {/* Label container — clips the sliding text */}
      <span className="relative z-10 overflow-hidden block h-[1.2em] leading-[1.2em]">
        {/* First label — visible, slides up & out on hover */}
        <span
          className={`block transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:-translate-y-full ${hoverTextClasses[variant]}`}
        >
          {children}
        </span>
        {/* Second label — hidden below, slides up into view on hover */}
        <span
          aria-hidden
          className={`block transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:-translate-y-full ${hoverTextClasses[variant]}`}
        >
          {children}
        </span>
      </span>
    </button>
  );
}
