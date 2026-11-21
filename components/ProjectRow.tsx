"use client";
import Image from "next/image";
import { TransitionLink as Link } from "./PageTransition";
import { motion } from "framer-motion";
import type { ProjectSummary } from "@/content/site";
import { Reveal } from "./Reveal";

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

function Cover({ src, alt, aspect, poster, background }: { src: string | null; alt: string; aspect: string; poster?: string; background?: string }) {
  const fit = background ? "object-contain" : "object-cover";
  return (
    <div className="relative overflow-hidden rounded-[8px] bg-[#333]" style={{ aspectRatio: aspect, backgroundColor: background }}>
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

/** One project card: a cover, then the title with its tags on the right, then the description. */
export function ProjectCard({ project, aspect }: { project: ProjectSummary; aspect: string }) {
  const href = `/work/${project.slug}`;
  const title = project.title.replace(" 🚧", "");
  // "TikTok/2024" → "TikTok · 2024", shown as small caps-style tags.
  const tags = project.meta.split("/").join(" · ");

  const body = (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="group">
      <Cover src={project.covers[0]} poster={project.poster} background={project.coverBackground} alt={`${title} cover`} aspect={aspect} />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[18px] leading-[1.3] text-ink">
          {title}
          {!project.hasCaseStudy && <span className="ml-2 align-middle font-sans text-[12px] text-subtle">In progress</span>}
        </h3>
        <p className="shrink-0 font-mono text-[12px] uppercase tracking-[0.06em] text-subtle">{tags}</p>
      </div>
      {project.description && (
        <p className="mt-1.5 max-w-[520px] text-[14px] leading-[1.45] text-muted">{project.description}</p>
      )}
    </motion.div>
  );

  return (
    <Reveal>
      {project.hasCaseStudy ? (
        <Link href={href} aria-label={`Read the ${title} case study`} className="block">
          {body}
        </Link>
      ) : (
        body
      )}
    </Reveal>
  );
}

/** Projects as square cards, two to a row in order (one column on phones). */
export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} aspect="1 / 1" />
      ))}
    </div>
  );
}
