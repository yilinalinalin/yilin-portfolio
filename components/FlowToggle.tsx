"use client";
import { useState } from "react";
import { Flow, type FlowData } from "./Flow";

export type FlowView = { label: string; caption?: string; flows: FlowData[] };

// Tabs that switch between sets of flows, e.g. the flow before and after the redesign.
export function FlowToggle({ views }: { views: FlowView[] }) {
  const [active, setActive] = useState(views.length - 1);
  const view = views[active];

  return (
    <div className="rounded-[4px] border border-rule bg-white/60 p-4 md:p-6">
      <div role="tablist" aria-label="Flow" className="inline-flex gap-1 rounded-full bg-well p-1">
        {views.map((v, i) => (
          <button
            key={v.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
              i === active ? "bg-accent text-white shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      {view.caption && <p className="mt-4 text-[14px] leading-[1.4] text-muted">{view.caption}</p>}
      <div key={active} className="mt-5 space-y-8 motion-safe:animate-[fadeIn_300ms_ease-out]">
        {view.flows.map((f, i) => (
          <Flow key={i} {...f} />
        ))}
      </div>
    </div>
  );
}
