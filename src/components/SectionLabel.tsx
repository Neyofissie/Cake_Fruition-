type Props = {
  children: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
};

/** Small uppercase label with a hairline rule, used above section titles. */
export default function SectionLabel({ children, tone = "dark", align = "start", className = "" }: Props) {
  const color = tone === "dark" ? "text-stone" : "text-off-white/65";
  const rule = tone === "dark" ? "bg-ink/25" : "bg-off-white/30";

  return (
    <p className={`eyebrow flex items-center gap-4 ${color} ${align === "center" ? "justify-center" : ""} ${className}`}>
      {align === "center" && <span aria-hidden className={`h-px w-8 ${rule}`} />}
      <span>{children}</span>
      <span aria-hidden className={`h-px w-8 ${rule}`} />
    </p>
  );
}
