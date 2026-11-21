"use client";
import Image from "next/image";
import { podcasts } from "@/content/about";
import { MacWindow } from "./MacWindow";

const play = (
  <svg viewBox="0 0 12 12" className="size-[11px]" fill="currentColor" aria-hidden>
    <path d="M2.5 1.2v9.6c0 .5.5.8.9.5l7.4-4.8c.4-.3.4-.8 0-1.1L3.4.7c-.4-.3-.9 0-.9.5z" />
  </svg>
);

/** The dock's "Thinking" app: saved episodes (and the odd written conversation) as colored cards that open in a new tab. */
export function PodcastWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <MacWindow
      open={open}
      title="Thinking"
      onClose={onClose}
      className="h-[min(640px,86vh)] w-[min(920px,100%)]"
      bodyClassName="overflow-y-auto"
    >
      <div className="p-5 sm:p-8">
        <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-ink">Thinking</h2>
        <p className="mt-1 max-w-[560px] text-[13px] leading-[1.5] text-muted">
          Welcome to Yilin&apos;s inspo library. These are podcasts and pieces that have consistently shaped how I think and build.
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {podcasts.map((p) => (
            <li key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title}, ${p.show}${p.duration ? `, ${p.duration}` : ""}. Opens in a new tab`}
                className="group flex h-full flex-col rounded-[14px] p-5 text-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1"
                style={{ background: p.color }}
              >
                <div className="relative mx-auto aspect-square w-[64%] overflow-hidden rounded-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image src={p.cover} alt="" fill sizes="180px" className="object-cover" />
                </div>
                <p className="mt-5 text-[12px] font-medium text-white/65">
                  {p.show} · {p.date}
                </p>
                <p className="mt-1 line-clamp-2 text-[16px] font-bold leading-[1.3]">{p.title}</p>
                {p.description && <p className="mt-1 line-clamp-2 text-[13px] leading-[1.4] text-white/85">{p.description}</p>}
                {/* Pinned to the bottom so the play buttons line up across cards */}
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[14px] font-semibold backdrop-blur transition-colors group-hover:bg-white/30">
                    {p.duration ? play : <span aria-hidden>↗</span>}
                    {p.duration ?? "Read"}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </MacWindow>
  );
}
