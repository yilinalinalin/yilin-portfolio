import type { Compare } from "@/content/types";

// Capybara's market/gain green, from its design system.
const green = "#00D47B";
// The cream behind the other insight illustrations, so this card sits with them as a set.
const cream = "#F2F4E7";

/** A two-column "before vs after" card: the left side greyed out, the right side in the accent. */
export function CompareCard({ compare }: { compare: Compare }) {
  const { left, right, takeaway } = compare;
  return (
    <div
      className="flex h-full w-full flex-col justify-center p-[7%] text-left text-[clamp(11px,2.4vw,14px)] leading-[1.35]"
      style={{ backgroundColor: cream }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[6px] bg-white/60 p-4">
          <p className="font-medium text-subtle">{left.title}</p>
          <div className="mt-3 border-t border-rule pt-3 text-subtle">
            <p>{left.quote}</p>
            <p className="mt-3 italic">{left.note}</p>
          </div>
        </div>
        <div className="rounded-[6px] p-4" style={{ backgroundColor: `${green}1f`, boxShadow: `inset 0 0 0 1px ${green}66` }}>
          <p className="flex items-center gap-1.5 font-medium text-ink">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: green }} aria-hidden />
            {right.title}
          </p>
          <div className="mt-3 border-t pt-3 text-ink" style={{ borderColor: `${green}66` }}>
            <p>{right.lead}</p>
            <ul className="mt-2 space-y-1.5">
              {right.items.map((item) => (
                <li key={item} className="flex gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" className="mt-[3px] shrink-0" aria-hidden>
                    <path d="M2 6.5L4.8 9L10 3" fill="none" stroke={green} strokeWidth="1.8" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {takeaway && <p className="mt-5 text-center font-serif text-[1.15em] italic text-ink">{takeaway}</p>}
    </div>
  );
}
