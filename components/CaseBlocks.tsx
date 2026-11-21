import type { Block } from "@/content/types";
import { Carousel } from "./Carousel";
import { MediaFrame } from "./MediaFrame";
import { Reveal } from "./Reveal";
import { Prototype } from "./prototypes";
import { FeatureMap } from "./FeatureMap";
import { Flow } from "./Flow";
import { FlowToggle } from "./FlowToggle";

const eyebrow = "text-[11px] uppercase tracking-[0.08em] text-subtle";
const body = "text-[14px] leading-[1.4] text-muted";

// Sections sit 110px apart (mt-[110px] on <section>). An eyebrow heading partway through a
// section starts a new part too, so it gets the same gap: 20px from space-y-5 + 90px.
export function CaseBlock({ block, first }: { block: Block; first?: boolean }) {
  switch (block.kind) {
    case "heading":
      return (
        <Reveal className={block.small ? "pt-10" : block.eyebrow && !first ? "pt-[90px]" : ""}>
          {block.eyebrow && <p className={eyebrow}>{block.eyebrow}</p>}
          {block.title && (
            <h2
              className={`font-serif text-ink ${
                block.small ? "text-[22px]" : "mt-3 text-[22px] md:text-[24px]"
              } leading-[1.25]`}
            >
              {block.title}
            </h2>
          )}
          {block.body?.map((p, i) =>
            Array.isArray(p) ? (
              // A bullet list sits tight under the paragraph that introduces it.
              <ul key={i} className={`${body} mt-0.5 list-disc pl-5`}>
                {p.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={i} className={`${body} ${i === 0 ? "mt-1" : "mt-3"}`}>
                {p}
              </p>
            )
          )}
        </Reveal>
      );
    case "media":
      return (
        <Reveal>
          <MediaFrame media={block.media} />
        </Reveal>
      );
    case "pair":
      return (
        <Reveal className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MediaFrame media={block.items[0]} />
          <MediaFrame media={block.items[1]} />
        </Reveal>
      );
    case "cards":
      return (
        <Reveal className="grid grid-cols-1 gap-[6px] sm:grid-cols-2">
          {block.items.map((c) =>
            block.withMedia ? (
              <div key={c.title}>
                {c.media && <MediaFrame media={c.media} />}
                <div className="px-[3px] pt-3">
                  <p className="text-[14px] leading-[1.35] text-ink">{c.title}</p>
                  <p className={`${body} mt-2`}>{c.body}</p>
                </div>
              </div>
            ) : (
              <div key={c.title} className="rounded-[3px] bg-well px-6 py-7">
                <p className="text-[14px] text-ink">{c.title}</p>
                <p className={`${body} mt-2`}>{c.body}</p>
              </div>
            )
          )}
        </Reveal>
      );
    case "captioned":
      return (
        <Reveal className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,580px)_1fr] md:gap-[30px]">
          <MediaFrame media={block.media} />
          <div className={`flex flex-col ${block.alignCaption === "end" ? "justify-end" : "justify-center md:justify-end md:pb-14"}`}>
            {block.title && <p className="text-[14px] text-ink">{block.title}</p>}
            <p className={`${body} mt-1`}>{block.body}</p>
            {block.highlights && (
              <div className="mt-4">
                <p className={eyebrow}>Design highlights</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {block.highlights.map((h) => (
                    <li key={h} className="rounded-full bg-well px-3 py-1 text-[13px] leading-[1.3] text-ink">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {block.link && (
              <a
                href={block.link.href}
                className="group mt-4 inline-flex items-center gap-1.5 self-start text-[14px] text-accent"
              >
                {block.link.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            )}
          </div>
        </Reveal>
      );
    case "table":
      return (
        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-y border-rule">
                {block.columns.map((c) => (
                  <th key={c} scope="col" className={`${eyebrow} py-3 pr-6 font-normal`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-rule align-top">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`py-4 pr-6 text-[14px] leading-[1.4] ${
                        c === 0 ? "w-[110px] text-muted" : c === row.length - 1 ? "text-ink" : "text-muted"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      );
    case "tldr":
      return (
        <Reveal>
          <dl className="border-t border-rule">
            {block.items.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-1 gap-1 border-b border-rule py-4 md:grid-cols-[140px_1fr] md:gap-[30px]"
              >
                <dt className={`${eyebrow} md:pt-[3px]`}>{item.label}</dt>
                <dd className="text-[14px] leading-[1.4] text-ink">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );
    case "learnings":
      return (
        <Reveal>
          <ol className="border-t border-rule">
            {block.items.map((l, i) => (
              <li
                key={l.title}
                className="grid grid-cols-[44px_1fr] gap-x-4 border-b border-rule py-6 md:grid-cols-[72px_1fr] md:gap-x-[30px]"
              >
                <span className="font-serif text-[22px] leading-none text-accent md:text-[26px]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-serif text-[18px] leading-[1.3] text-ink md:text-[20px]">{l.title}</p>
                  {l.body && <p className={`${body} mt-2 max-w-[620px]`}>{l.body}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      );
    case "flow":
      return (
        <Reveal>
          <Flow title={block.title} steps={block.steps} total={block.total} />
        </Reveal>
      );
    case "flowToggle":
      return (
        <Reveal>
          <FlowToggle views={block.views} />
        </Reveal>
      );
    case "persona":
      return (
        <Reveal className="rounded-[4px] border border-rule bg-white/60 p-5 md:p-7">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-well md:h-16 md:w-16">
              {block.avatar?.src && <MediaFrame media={{ ...block.avatar, aspect: "1/1" }} />}
            </div>
            <div>
              <p className={eyebrow}>{block.role}</p>
              <p className="mt-1 font-serif text-[22px] leading-[1.2] text-ink">{block.name}</p>
              <p className={`${body} mt-2 max-w-[620px]`}>{block.summary}</p>
            </div>
          </div>
          <div
            className={`mt-6 grid grid-cols-1 gap-[6px] ${
              block.columns.filter((c) => !c.ordered).length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {block.columns.map((col) => {
              const label = (it: (typeof col.items)[number]) => (typeof it === "string" ? it : it.label);
              const detail = (it: (typeof col.items)[number]) => (typeof it === "string" ? undefined : it.detail);
              if (col.ordered) {
                // Ranked: one block per item, left to right from most to least important.
                return (
                  <div key={col.title} className="rounded-[3px] bg-well px-5 py-5 md:col-span-full">
                    <p className={eyebrow}>{col.title}</p>
                    <ol className={`mt-3 grid grid-cols-1 gap-[6px] sm:grid-cols-2 ${col.items.length >= 4 ? "lg:grid-cols-4" : col.items.length === 3 ? "lg:grid-cols-3" : ""}`}>
                      {col.items.map((it, i) => (
                        <li key={i} className="rounded-[3px] bg-white px-4 py-4">
                          <span className="font-serif text-[26px] leading-none text-accent">{i + 1}</span>
                          <p className="mt-3 text-[14px] leading-[1.35] text-ink">{label(it)}</p>
                          {detail(it) && <p className="mt-1 text-[12px] leading-[1.4] text-muted">{detail(it)}</p>}
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              }
              return (
                <div key={col.title} className="rounded-[3px] bg-well px-5 py-5">
                  <p className={eyebrow}>{col.title}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-4">
                    {col.items.map((it, i) => (
                      <li key={i} className="text-[14px] leading-[1.4] text-ink">
                        {label(it)}
                        {detail(it) && <span className="text-muted"> · {detail(it)}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Reveal>
      );
    case "highlight":
      return (
        <Reveal className={first ? "" : "pt-10"}>
          <p className={eyebrow}>
            Highlight {block.number} · {block.pool}
          </p>
          <h3 className="mt-2 font-serif text-[22px] leading-[1.25] text-ink md:text-[24px]">{block.title}</h3>
          <div className="mt-5 space-y-3">
            <MediaFrame media={block.media} />
            {block.media2 && <MediaFrame media={block.media2} />}
          </div>
          <div className={`mt-5 grid grid-cols-1 gap-5 md:gap-[30px] ${block.metric && !block.metric.quote ? "md:grid-cols-[1fr_220px]" : ""}`}>
            <div>
              {block.body.map((p, i) =>
                Array.isArray(p) ? (
                  <ul key={i} className={`${body} mt-1 list-disc pl-5`}>
                    {p.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className={`${body} ${i === 0 ? "" : "mt-3"}`}>
                    {p}
                  </p>
                )
              )}
              {block.levels && (
                <div className="mt-5 grid grid-cols-1 gap-[6px] sm:grid-cols-2">
                  {block.levels.map((lv) => (
                    <div key={lv.title} className="rounded-[3px] bg-well px-5 py-4">
                      <p className={eyebrow}>{lv.title}</p>
                      <ul className="mt-2 space-y-1">
                        {lv.items.map((it) => (
                          <li key={it} className="text-[14px] leading-[1.4] text-ink">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {block.metric &&
              (block.metric.quote ? (
                // With a quote, the tile runs full width: the number on the left, the quote on the right.
                <div className="grid grid-cols-1 gap-5 rounded-[3px] bg-teal-tile px-6 py-6 md:grid-cols-[minmax(0,240px)_1fr] md:gap-8 md:px-8">
                  <div>
                    <p className="font-serif text-[34px] leading-none text-ink">{block.metric.value}</p>
                    <p className="mt-2 text-[13px] leading-[1.35] text-ink/80">{block.metric.label}</p>
                  </div>
                  <p className="border-t border-ink/15 pt-5 font-serif text-[18px] leading-[1.35] text-ink md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    “{block.metric.quote}”
                    <span className="mt-2 block font-sans text-[12px] text-ink/60">Affiliate agency user</span>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-center rounded-[3px] bg-teal-tile px-6 py-6 md:self-start">
                  <p className="font-serif text-[34px] leading-none text-ink">{block.metric.value}</p>
                  <p className="mt-2 text-[13px] leading-[1.35] text-ink/80">{block.metric.label}</p>
                </div>
              ))}
          </div>
        </Reveal>
      );
    case "featureMap":
      return (
        <Reveal>
          <FeatureMap groups={block.groups} />
        </Reveal>
      );
    case "pools":
      return (
        <Reveal className="grid grid-cols-1 gap-[6px] md:grid-cols-2">
          {block.items.map((pool, i) => (
            <div key={pool.name} className="flex flex-col rounded-[4px] border border-rule bg-white/60 p-5 md:p-7">
              <p className={eyebrow}>
                Pool {i + 1} · for {pool.user}
              </p>
              <p className="mt-1 font-serif text-[22px] leading-[1.2] text-ink">{pool.name}</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.08em] text-accent">Goal</p>
              <p className="mt-1 text-[14px] leading-[1.4] text-ink">{pool.goal}</p>
              {pool.features && pool.features.length > 0 && <p className={`${eyebrow} mt-5`}>Features</p>}
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {pool.features?.map((f) => (
                  <li key={f} className="rounded-full bg-well px-3 py-1 text-[13px] leading-[1.3] text-ink">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      );
    case "quotes":
      return (
        <Reveal className="grid grid-cols-1 gap-[6px] sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((q, i) => (
            <figure key={i} className="flex flex-col justify-between rounded-[3px] bg-well px-6 py-7">
              <blockquote className="font-serif text-[18px] leading-[1.35] text-ink">“{q.quote}”</blockquote>
              <figcaption className={`${eyebrow} mt-5`}>{q.who}</figcaption>
            </figure>
          ))}
        </Reveal>
      );
    case "cta":
      return (
        <Reveal>
          <a href={block.href} className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-[13px] text-white shadow-sm transition-opacity hover:opacity-90">
            {block.label} <span aria-hidden>↓</span>
          </a>
        </Reveal>
      );
    case "note":
      return (
        <Reveal className="rounded-[4px] border border-dashed border-accent/50 px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.08em] text-accent">{block.label}</p>
          <p className={`${body} mt-1`}>{block.body}</p>
        </Reveal>
      );
    case "prototype":
      return (
        <Reveal>
          <Prototype name={block.name} />
          {block.caption && <p className={`${body} mt-3`}>{block.caption}</p>}
        </Reveal>
      );
    case "carousel":
      return (
        <Reveal>
          <Carousel items={block.items} label={block.label} compact={block.compact} />
        </Reveal>
      );
    case "metrics":
      return (
        <Reveal>
          {/* A 1px gap over a rule-colored card draws the lines between cells, in any grid shape */}
          <div
            className={`grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-rule bg-rule shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
              block.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {block.items.map((m) => (
              <div key={m.label} className="flex flex-col bg-[#f4f8ff] px-7 py-8 md:px-9 md:py-10">
                {/* The cell is a size container, so the number scales to fit its cell on any screen */}
                <div className="@container flex flex-1 flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{m.label}</p>
                  <p className="mt-4 whitespace-nowrap font-serif text-[clamp(24px,12.5cqw,48px)] leading-none text-accent">{m.value}</p>
                  <p className="mt-4 max-w-[300px] text-[14px] leading-[1.45] text-muted">{m.body}</p>
                  {m.link && (
                    <a
                      href={m.link.href}
                      className="group mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-[14px] font-medium text-accent"
                    >
                      <span className="underline-offset-4 group-hover:underline">{m.link.label}</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      );
    case "stats":
      return (
        <Reveal className={`grid grid-cols-1 gap-[6px] ${block.items.length === 2 ? "sm:grid-cols-2" : block.items.length === 4 ? "sm:grid-cols-2 md:grid-cols-4" : "sm:grid-cols-3"}`}>
          {block.items.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center rounded-[3px] bg-teal-tile px-6 py-10 text-center"
            >
              <p className="whitespace-nowrap font-serif text-[clamp(28px,3.4vw,40px)] leading-none text-ink">{s.value}</p>
              <p className="mt-3 max-w-[220px] text-[13px] leading-[1.3] text-ink/80">{s.label}</p>
            </div>
          ))}
        </Reveal>
      );
  }
}
