import Image from "next/image";
import { bubbles, projects, recognitions } from "@/content/site";
import { WorkGrid, type WorkItem } from "@/components/ProjectRow";
import { Reveal } from "@/components/Reveal";
import { SongNote } from "@/components/SongNote";

// Products (the case studies) first, then awards. Creative work gets its own tag once it's added.
const work: WorkItem[] = [
  ...projects
    .filter((p) => !p.unlisted)
    .map((p) => ({
      key: p.slug,
      tag: "products" as const,
      title: p.title.replace(" 🚧", ""),
      meta: p.meta,
      description: p.description,
      cover: p.covers[0],
      poster: p.poster,
      coverBackground: p.coverBackground,
      href: p.hasCaseStudy ? `/work/${p.slug}` : undefined,
      inProgress: !p.hasCaseStudy,
    })),
  ...recognitions.map((r) => ({
    key: `award-${r.title}`,
    tag: "awards" as const,
    title: r.title,
    meta: r.meta,
    description: r.description,
    cover: r.cover,
    coverBackground: r.coverBackground,
    placeholder: r.award,
    href: r.href || undefined,
  })),
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-[90px]">
        <div className="flex min-h-[477px] flex-col-reverse items-start justify-center gap-10 py-16 md:flex-row md:items-center md:justify-between md:py-0 md:pt-[18px]">
          <Reveal>
            <h1 className="max-w-[580px] font-serif text-[24px] leading-[1.2] md:text-[28px]">
              Yilin is a product designer who solves real problems in ways people actually enjoy using.
            </h1>
            <p className="mt-[30px] text-[15px] leading-[20px] md:text-[16px]">
              Studies HCI @NYU
              <br />
              Previously shaping e-commerce and AI experiences @TikTok &amp; @Phia
            </p>
          </Reveal>
          <Reveal delay={0.15} className="relative shrink-0 self-center md:mr-[93px] md:self-auto">
            {/* Logo bubbles for the places Yilin has worked, bobbing around the illustration */}
            <ul aria-label="Worked with" className="pointer-events-none absolute inset-0">
              {bubbles.map((b, i) => (
                <li
                  key={b.name}
                  className="bubble absolute"
                  style={{
                    top: b.top,
                    left: b.left,
                    right: b.right,
                    width: `calc(${b.size}px * var(--bubble-scale))`,
                    animation: `bubble-float ${b.float}s ease-in-out ${-i * 1.3}s infinite`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- small pre-sized images */}
                  <img src={b.src} alt={b.name} className="w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)]" />
                </li>
              ))}
            </ul>
            <Image
              src="/images/avatar.png"
              alt="Illustrated portrait of Yilin with her guinea pig"
              width={241}
              height={266}
              priority
              className="w-[180px] origin-bottom transition-transform duration-500 hover:-rotate-2 md:w-[241px]"
            />
            <SongNote />
          </Reveal>
        </div>
      </section>

      {/* Projects: products and awards in one grid, with tags to light up each kind */}
      <section className="mx-auto max-w-[1200px] px-5 pb-32 pt-6 md:px-[30px]">
        <h2 className="sr-only">Selected Projects</h2>
        <WorkGrid items={work} />
      </section>
    </main>
  );
}
