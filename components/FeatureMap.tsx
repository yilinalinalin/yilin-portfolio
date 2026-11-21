"use client";
import { useState } from "react";

export type FeatureMapGroup = {
  pool: string;
  items: { feature: string; detail?: string; pain: string; who: string }[];
};

// Feature cards grouped by pool. Clicking a card reveals the pain point behind it.
export function FeatureMap({ groups }: { groups: FeatureMapGroup[] }) {
  const ids = groups.flatMap((g, gi) => g.items.map((_, i) => `${gi}-${i}`));
  const [open, setOpen] = useState<Set<string>>(new Set());
  const allOpen = open.size === ids.length;

  const toggle = (id: string) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(allOpen ? new Set() : new Set(ids))}
          className="rounded-full border border-rule px-3 py-1 text-[12px] text-ink transition-colors hover:border-ink"
        >
          {allOpen ? "Hide all pain points" : "Reveal all the pain points behind them"}
        </button>
      </div>

      <div className="mt-6 space-y-8">
        {groups.map((g, gi) => (
          <div key={g.pool}>
            <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">{g.pool}</p>
            <ul className="mt-3 grid grid-cols-1 gap-[6px] sm:grid-cols-2">
              {g.items.map((it, i) => {
                const id = `${gi}-${i}`;
                const isOpen = open.has(id);
                return (
                  <li key={id}>
                    <button
                      onClick={() => toggle(id)}
                      aria-expanded={isOpen}
                      className={`group flex h-full w-full flex-col rounded-[4px] border px-5 py-4 text-left transition-colors duration-300 ${
                        isOpen ? "border-accent/40 bg-white" : "border-transparent bg-well hover:bg-[#e3e3e3]"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-[15px] leading-[1.3] text-ink">{it.feature}</span>
                        <span
                          aria-hidden
                          className={`mt-[2px] shrink-0 text-[14px] leading-none text-subtle transition-transform duration-300 ${
                            isOpen ? "rotate-45 text-accent" : "group-hover:text-ink"
                          }`}
                        >
                          +
                        </span>
                      </span>
                      {it.detail && <span className="mt-1 text-[13px] leading-[1.4] text-muted">{it.detail}</span>}

                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block border-t border-rule pt-3">
                            <span className="text-[11px] uppercase tracking-[0.08em] text-accent">
                              Pain point · {it.who}
                            </span>
                            <span className="mt-1 block font-serif text-[17px] leading-[1.35] text-ink">“{it.pain}”</span>
                          </span>
                        </span>
                      </span>

                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
