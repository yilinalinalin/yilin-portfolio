"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TransitionLink } from "./PageTransition";

const ease = [0.22, 1, 0.36, 1] as const;

/** End-of-case-study panel: the next project's cover slides in from the right as it scrolls into view. */
export function NextProject({
  slug,
  title,
  tagline,
  meta,
  cover,
}: {
  slug: string;
  title: string;
  tagline: string;
  meta: string;
  cover: string | null;
}) {
  const reduce = useReducedMotion();
  const href = `/work/${slug}`;
  return (
    <section aria-label="Next project" className="mt-32 border-t border-rule pt-8">
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-[30px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col gap-6 md:pb-2"
        >
          <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">Next project</p>
          <TransitionLink href={href} className="group block">
            <h2 className="font-serif text-[28px] leading-[1.15] transition-colors group-hover:text-accent md:text-[32px]">
              {title}
            </h2>
            <p className="mt-2 text-[14px] leading-[1.4] text-muted">{tagline}</p>
            <p className="mt-3 text-[13px] text-subtle">{meta}</p>
          </TransitionLink>
          <TransitionLink href="/" className="group inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink">
            <span className="transition-transform group-hover:-translate-x-1">←</span> View all projects
          </TransitionLink>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <TransitionLink
            href={href}
            aria-label={`Next project: ${title}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-[8px] bg-[#333]"
          >
            {cover && (
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                {/\.(mp4|webm)$/i.test(cover) ? (
                  <video src={cover} className="h-full w-full object-cover" autoPlay loop muted playsInline />
                ) : (
                  <Image src={cover} alt="" fill sizes="(min-width: 1200px) 560px, 100vw" className="object-cover" />
                )}
              </div>
            )}
            <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-transform group-hover:scale-110">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                <path d="M1.5 6.5H11.5M11.5 6.5L7 2M11.5 6.5L7 11" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
