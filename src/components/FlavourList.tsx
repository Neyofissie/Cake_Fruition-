import type { Flavour } from "../lib/content";

type Props = { items: Flavour[]; tone?: "dark" | "light" };

/** Menu-style list: name, dotted leader, short note. */
export default function FlavourList({ items, tone = "dark" }: Props) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item.name} className="flex items-end">
          <span className="font-serif text-[1.3rem] leading-tight">{item.name}</span>
          {item.note && (
            <>
              <span aria-hidden className="leader" />
              <span className={`shrink-0 text-right text-[0.7rem] uppercase tracking-[0.16em] ${tone === "dark" ? "text-stone" : "text-off-white/60"}`}>
                {item.note}
              </span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
