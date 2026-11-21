import Image from "next/image";
import { projects, recognitions } from "@/content/site";
import { ProjectGrid } from "@/components/ProjectRow";
import { Reveal } from "@/components/Reveal";
import { SongNote } from "@/components/SongNote";
import { TransitionLink } from "@/components/PageTransition";

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
          <Reveal delay={0.15} className="relative shrink-0 md:mr-[93px]">
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

      {/* Projects */}
      <section className="mx-auto max-w-[1200px] px-5 pt-6 md:px-[30px]">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.15] md:text-[32px]">Selected Projects</h2>
          <p className="mt-1.5 text-[16px]">Previous projects from TikTok, Phia, and startups.</p>
        </Reveal>
        <div className="mt-10">
          <ProjectGrid projects={projects.filter((p) => !p.unlisted)} />
        </div>
      </section>

      {/* Recognitions */}
      <section className="mx-auto max-w-[1200px] px-5 pb-32 pt-28 md:px-[30px]">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.15] md:text-[32px]">Recent Recognitions</h2>
        </Reveal>
        <Reveal>
          <ul className="mt-8 border-t border-rule">
            {recognitions.map((r) => {
              const row = (
                <>
                  <span className="font-serif text-[20px] leading-[1.25] text-ink md:text-[22px]">{r.award}</span>
                  <span className="text-[14px] leading-[1.4] text-muted">
                    {r.result} · {r.project}
                  </span>
                  <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.06em] text-subtle md:justify-end">
                    {r.year}
                    {r.href && (
                      <span aria-hidden className="text-[14px] text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    )}
                  </span>
                </>
              );
              const cls = "grid grid-cols-1 gap-1 py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_120px] md:items-baseline md:gap-8";
              return (
                <li key={r.award} className="border-b border-rule">
                  {r.href.startsWith("/") ? (
                    // A page on this site (e.g. a hackathon write-up) opens in place with the page transition.
                    <TransitionLink href={r.href} className={`group ${cls} transition-colors hover:bg-black/[0.02]`}>
                      {row}
                    </TransitionLink>
                  ) : r.href ? (
                    <a href={r.href} target="_blank" rel="noreferrer" className={`group ${cls} transition-colors hover:bg-black/[0.02]`}>
                      {row}
                    </a>
                  ) : (
                    <div className={cls}>{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>
    </main>
  );
}
