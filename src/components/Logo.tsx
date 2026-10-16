import logoMark from "../assets/logo-mark.png";

type Props = {
  tone?: "dark" | "light";
  className?: string;
  withWordmark?: boolean;
};

/** The circular CF monogram plus the serif wordmark. The mark is a transparent black PNG, inverted on dark grounds. */
export default function Logo({ tone = "dark", className = "", withWordmark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logoMark}
        alt=""
        width={48}
        height={48}
        className={`h-11 w-11 sm:h-12 sm:w-12 ${tone === "light" ? "invert" : ""}`}
      />
      {withWordmark && (
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="font-serif text-[1.45rem] tracking-[0.02em]">Cake Fruition</span>
          <span className={`mt-1 text-[0.55rem] uppercase tracking-[0.34em] ${tone === "light" ? "text-off-white/60" : "text-stone"}`}>
            Custom Cake Studio
          </span>
        </span>
      )}
    </span>
  );
}
