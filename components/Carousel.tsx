"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Compare, Media } from "@/content/types";
import { CompareCard } from "./CompareCard";
import { MediaFrame } from "./MediaFrame";

const body = "text-[14px] leading-[1.4] text-muted";
const ease = [0.22, 1, 0.36, 1] as const;

type Slide = {
  media?: Media;
  compare?: Compare;
  title?: string;
  body: string;
  opportunity?: string;
  note?: { label: string; body: string };
};

export function Carousel({
  items,
  label = "Slides",
  compact,
}: {
  items: Slide[];
  label?: string;
  /** A narrower image column, leaving more room for the caption. */
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const count = items.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const controls = <Controls count={count} index={index} setIndex={setIndex} go={go} />;

  // Text-only slides: one card, every slide stacked in the same grid cell so the card
  // keeps the height of the longest slide instead of jumping as you click through.
  if (items.every((s) => !s.media && !s.compare)) {
    return (
      <div role="region" aria-roledescription="carousel" aria-label={label}>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={`Next slide (${index + 1} of ${count})`}
          className="block w-full cursor-pointer rounded-[3px] bg-well px-7 py-9 text-left md:px-12 md:py-12"
        >
          <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">
            {label} {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <div className="mt-5 grid">
            {items.map((s, i) => (
              <motion.p
                key={i}
                aria-hidden={i !== index}
                className="font-serif text-[22px] leading-[1.3] text-ink [grid-area:1/1] md:text-[26px]"
                initial={false}
                animate={i === index ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : i < index ? -24 : 24 }}
                transition={{ duration: 0.45, ease }}
              >
                {s.body}
              </motion.p>
            ))}
          </div>
        </button>
        <div className="mt-4">{controls}</div>
      </div>
    );
  }

  const slide = items[index];
  const aspect = items.find((s) => s.media)!.media!.aspect;
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`grid grid-cols-1 gap-4 md:gap-[30px] ${compact ? "md:grid-cols-[minmax(0,420px)_1fr]" : "md:grid-cols-[minmax(0,580px)_1fr]"}`}
    >
      {/* Clicking the image also advances, so the whole visual reads as clickable. */}
      <button
        type="button"
        onClick={() => go(1)}
        aria-label={`Next slide (${index + 1} of ${count})`}
        className="relative block w-full cursor-pointer overflow-hidden rounded-[8px] text-left"
        style={{ aspectRatio: aspect }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease }}
          >
            {slide.media ? (
              <MediaFrame media={{ ...slide.media, aspect }} className="h-full" />
            ) : slide.compare ? (
              <CompareCard compare={slide.compare} />
            ) : (
              <div className="h-full bg-well" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      <div className="flex flex-col justify-end md:pb-14">
        {/* Every caption sits in the same grid cell, so the column keeps the longest one's height. */}
        <div className="grid items-end" aria-live="polite">
          {items.map((s, i) => (
            <motion.div
              key={i}
              aria-hidden={i !== index}
              className={`[grid-area:1/1] ${i === index ? "" : "pointer-events-none"}`}
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {s.title && <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-subtle">{s.title}</p>}
              {/* Titled slides (e.g. the TAP pools) read in ink; untitled ones keep the muted caption. */}
              <p className={s.title ? "text-[14px] leading-[1.4] text-ink" : body}>{s.body}</p>
              {s.note && (
                <div className="mt-4 border-t border-rule pt-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">{s.note.label}</p>
                  <p className="mt-1.5 text-[14px] leading-[1.4] text-ink">{s.note.body}</p>
                </div>
              )}
              {s.opportunity && (
                <div className="mt-4 border-t border-rule pt-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-accent">Design Opportunity</p>
                  <p className="mt-1.5 text-[14px] leading-[1.4] text-ink">{s.opportunity}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-5">{controls}</div>
      </div>
    </div>
  );
}

function Controls({
  count,
  index,
  setIndex,
  go,
}: {
  count: number;
  index: number;
  setIndex: (i: number) => void;
  go: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-accent" : "w-[6px] bg-rule hover:bg-subtle"
            }`}
          />
        ))}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-rule text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Arrow flip />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105"
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden className={flip ? "rotate-180" : ""}>
      <path d="M1.5 6.5H11.5M11.5 6.5L7 2M11.5 6.5L7 11" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
