"use client";
import Image from "next/image";
import { TransitionLink as Link } from "./PageTransition";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

function Cover({
  src,
  alt,
  aspect,
  poster,
  background,
  placeholder,
}: {
  src: string | null;
  alt: string;
  aspect: string;
  poster?: string;
  background?: string;
  /** Shown centered on the dark tile while there's no cover image yet. */
  placeholder?: string;
}) {
  const fit = background ? "object-contain" : "object-cover";
  return (
    <div className="relative overflow-hidden rounded-[8px] bg-[#333]" style={{ aspectRatio: aspect, backgroundColor: background }}>
      {!src && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <span className="font-serif text-[22px] leading-[1.25] text-white/70 md:text-[26px]">{placeholder}</span>
        </div>
      )}
      {src && (
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {isVideo(src) ? (
            <video src={src} poster={poster} aria-label={alt} className={`h-full w-full ${fit}`} autoPlay loop muted playsInline />
          ) : (
            <Image src={src} alt={alt} fill sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw" className={fit} />
          )}
        </motion.div>
      )}
    </div>
  );
}

export type WorkTag = "products" | "awards" | "creatives";

/** One card in the homepage grid: a product case study, an award, or (later) creative work. */
export type WorkItem = {
  key: string;
  tag: WorkTag;
  title: string;
  /** "TikTok/2024" style; shown as small caps tags on the right. */
  meta: string;
  description?: string;
  cover: string | null;
  poster?: string;
  coverBackground?: string;
  /** Dark-tile label when there's no cover yet. */
  placeholder?: string;
  /** "/work/..." opens in place with the page transition; "https://..." opens in a new tab. */
  href?: string;
  inProgress?: boolean;
};

// "All" (null) shows everything in the original order; the others light up one kind.
// Add { id: "creatives", label: "Creatives", icon: "🎨" } once there are creative projects.
const TAGS: { id: WorkTag | null; label: string; icon: string }[] = [
  { id: null, label: "All", icon: "🌐" },
  { id: "products", label: "Products", icon: "📱" },
  { id: "awards", label: "Awards", icon: "🏆" },
];

// Soft raised pill; the selected one looks pressed in.
const chipRaised =
  "bg-gradient-to-b from-white to-[#f7f7f7] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.06),inset_0_-2px_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_18px_rgba(0,0,0,0.08),inset_0_-2px_0_rgba(0,0,0,0.04)]";
const chipPressed = "bg-[#e8e8e8] text-ink shadow-[inset_0_2px_6px_rgba(0,0,0,0.14),inset_0_-1px_0_rgba(255,255,255,0.7)]";

function WorkCard({ item, dimmed }: { item: WorkItem; dimmed: boolean }) {
  const tags = item.meta.split("/").join(" · ");
  const body = (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="group">
      <Cover
        src={item.cover}
        poster={item.poster}
        background={item.coverBackground}
        placeholder={item.placeholder}
        alt={`${item.title} cover`}
        aspect="1 / 1"
      />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[18px] leading-[1.3] text-ink">
          {item.title}
          {item.inProgress && <span className="ml-2 align-middle font-sans text-[12px] text-subtle">In progress</span>}
          {item.href?.startsWith("http") && (
            <span aria-hidden className="ml-1.5 inline-block font-sans text-[14px] text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          )}
        </h3>
        <p className="shrink-0 font-mono text-[12px] uppercase tracking-[0.06em] text-subtle">{tags}</p>
      </div>
      {item.description && <p className="mt-1.5 max-w-[520px] text-[14px] leading-[1.45] text-muted">{item.description}</p>}
    </motion.div>
  );

  const link = !item.href ? (
    body
  ) : item.href.startsWith("/") ? (
    <Link href={item.href} aria-label={`Open ${item.title}`} className="block">
      {body}
    </Link>
  ) : (
    <a href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.title} (opens in a new tab)`} className="block">
      {body}
    </a>
  );

  return (
    <Reveal>
      {/* Dimmed cards fade back while another tag is lit, but stay clickable. */}
      <div className={`transition-[opacity,filter] duration-500 ${dimmed ? "opacity-25 grayscale" : "opacity-100"}`}>{link}</div>
    </Reveal>
  );
}

/**
 * Every project as square cards, two to a row (one on phones), with Products / Awards / Creatives tags
 * on top. Picking a tag lights up its cards, moves them to the top, and dims the rest; "All" restores
 * everything in its original order.
 */
export function WorkGrid({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<WorkTag | null>(null);
  // A lit tag pulls its cards to the top, keeping each group's own order; no tag keeps the original order.
  const ordered = active ? [...items.filter((i) => i.tag === active), ...items.filter((i) => i.tag !== active)] : items;
  return (
    <>
      {/* Chips only make sense with more than one kind of project in the grid. */}
      {new Set(items.map((i) => i.tag)).size > 1 && (
      <div role="group" aria-label="Highlight projects by type" className="flex flex-wrap gap-2.5">
        {TAGS.map((t) => {
          const empty = t.id !== null && !items.some((i) => i.tag === t.id);
          const on = active === t.id;
          return (
            <button
              key={t.label}
              type="button"
              disabled={empty}
              aria-pressed={on}
              onClick={() => setActive(t.id)}
              className={`inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[14px] transition-[box-shadow,background-color] duration-200 ${
                on ? chipPressed : empty ? `${chipRaised} cursor-default opacity-50 hover:shadow-none` : chipRaised
              }`}
            >
              <span aria-hidden className="text-[16px] leading-none">
                {t.icon}
              </span>
              {t.label}
              {empty && <span className="text-[12px] text-subtle">Soon</span>}
            </button>
          );
        })}
      </div>
      )}
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {ordered.map((i) => (
          // `layout` slides each card to its new spot when a tag reorders the grid.
          <motion.div key={i.key} layout transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <WorkCard item={i} dimmed={active !== null && i.tag !== active} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
