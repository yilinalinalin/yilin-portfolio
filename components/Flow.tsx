import type { CSSProperties, ReactNode } from "react";

export type FlowIcon = "store" | "creator";
export type FlowStep = {
  label: string;
  detail?: string;
  group?: string;
  time?: string;
  redundant?: boolean;
  /** A small icon above the label. */
  icon?: FlowIcon;
};
export type FlowData = {
  title?: string;
  steps: FlowStep[];
  /** A short line under the flow, e.g. a note or a total. */
  total?: string;
  /** "outline" draws unfilled steps with a gray border instead of filled ones. */
  variant?: "filled" | "outline";
};

const eyebrow = "text-[11px] uppercase tracking-[0.08em] text-subtle";

const iconPaths: Record<FlowIcon, ReactNode> = {
  // A storefront.
  store: (
    <>
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M4 9.5h16v1a2.7 2.7 0 0 1-5.3 0 2.7 2.7 0 0 1-5.4 0 2.7 2.7 0 0 1-5.3 0z" />
      <path d="M5 12.5V20h14v-7.5" />
      <path d="M10 20v-4.5h4V20" />
    </>
  ),
  // A phone playing a video.
  creator: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" />
    </>
  ),
};

function StepIcon({ icon }: { icon: FlowIcon }) {
  return (
    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent">
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {iconPaths[icon]}
      </svg>
    </span>
  );
}

function Step({ st, outline }: { st: FlowStep; outline?: boolean }) {
  return (
    <div
      className={`min-w-[100px] flex-1 rounded-[3px] px-3 py-3 md:px-4 ${
        st.redundant
          ? "border border-dashed border-[#e0a49a] bg-[#fbeeeb]"
          : outline
            ? "border border-rule bg-transparent"
            : "bg-well"
      }`}
    >
      {st.icon && <StepIcon icon={st.icon} />}
      <p className={`text-[14px] leading-[1.3] ${st.redundant ? "text-[#a8463a] line-through decoration-1" : "text-ink"}`}>
        {st.label}
      </p>
      {st.detail && <p className="mt-1 text-[12px] leading-[1.35] text-muted">{st.detail}</p>}
      {st.time && <p className="mt-2 text-[11px] uppercase tracking-[0.06em] text-subtle">{st.time}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center text-subtle md:px-1">
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </span>
  );
}

// A left-to-right flow. Consecutive steps that share a `group` sit inside one labeled box.
export function Flow({ title, steps, total, variant }: FlowData) {
  const outline = variant === "outline";
  const runs: { group?: string; steps: FlowStep[] }[] = [];
  for (const st of steps) {
    const last = runs[runs.length - 1];
    if (last && st.group && last.group === st.group) last.steps.push(st);
    else runs.push({ group: st.group, steps: [st] });
  }
  return (
    <div>
      {title && <p className={`${eyebrow} mb-3`}>{title}</p>}
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:overflow-x-auto md:pb-1">
        {runs.map((run, r) => (
          <div key={r} className="contents">
            {r > 0 && <Arrow />}
            {run.group ? (
              <div
                className="flex flex-col rounded-[4px] border border-rule p-2"
                style={{ flex: run.steps.length } as CSSProperties}
              >
                <p className={`${eyebrow} px-2 pb-2 pt-1`}>{run.group}</p>
                <div className="flex flex-1 flex-col gap-2 md:flex-row">
                  {run.steps.map((st, i) => (
                    <div key={i} className="contents">
                      {i > 0 && <Arrow />}
                      <Step st={st} outline={outline} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Step st={run.steps[0]} outline={outline} />
            )}
          </div>
        ))}
      </div>
      {total && <p className="mt-3 text-[14px] leading-[1.4] text-muted">{total}</p>}
    </div>
  );
}
