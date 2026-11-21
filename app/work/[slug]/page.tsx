import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, site } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { CaseSidebar } from "@/components/CaseSidebar";
import { CaseBlock } from "@/components/CaseBlocks";
import { MediaFrame } from "@/components/MediaFrame";
import { NextProject } from "@/components/NextProject";
import { TransitionLink } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.filter((p) => p.hasCaseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — ${site.name}` : site.title, description: p?.description };
}

export default async function CasePage({ params }: { params: Params }) {
  const { slug } = await params;
  const summary = projects.find((p) => p.slug === slug);
  if (!summary) notFound();
  const cs = caseStudies[slug];

  if (!cs) {
    return (
      <main className="mx-auto max-w-[1200px] px-5 py-40 md:px-[90px]">
        <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">{summary.meta}</p>
        <h1 className="mt-3 font-serif text-[32px]">{summary.title}</h1>
        <p className="mt-3 max-w-[560px] text-muted">Case study in progress — check back soon.</p>
        <TransitionLink href="/" className="mt-8 inline-block underline underline-offset-4">
          ← Back to work
        </TransitionLink>
      </main>
    );
  }

  const nav = cs.sections
    .filter((s) => s.nav)
    .map((s) => ({ id: s.id, label: s.nav as string, group: s.navGroup }));

  // The next written-up case study in home page order, wrapping around to the first.
  const written = projects.filter((p) => caseStudies[p.slug] && !p.unlisted);
  const next = written.length > 1 ? written[(written.findIndex((p) => p.slug === slug) + 1) % written.length] : null;

  return (
    <main className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-[64px] px-5 pb-40 pt-12 md:grid-cols-[160px_1fr] md:px-[30px] md:pt-[97px]">
      <CaseSidebar title={cs.title} blurb={cs.sidebarBlurb} items={nav} />

      <article className="min-w-0">
        <Reveal>
          <MediaFrame media={cs.hero} />
          <h1 className="mt-[34px] font-serif text-[28px] leading-[1.15] md:text-[36px]">{cs.tagline}</h1>
        </Reveal>

        <Reveal className="mt-8 grid grid-cols-1 gap-6 border-t border-rule pt-6 sm:grid-cols-3">
          {cs.meta.map((m) => (
            <div key={m.label}>
              <p className="text-[11px] uppercase tracking-[0.08em] text-subtle">{m.label}</p>
              {m.value.map((v) => (
                <p key={v} className="mt-1.5 text-[14px] leading-[1.4]">
                  {v}
                </p>
              ))}
            </div>
          ))}
        </Reveal>

        {cs.sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-[110px] scroll-mt-28 space-y-5">
            {s.blocks.map((b, i) => (
              <CaseBlock key={i} block={b} first={i === 0} />
            ))}
          </section>
        ))}

        {next && (
          <NextProject
            slug={next.slug}
            title={next.title}
            tagline={caseStudies[next.slug].tagline}
            meta={next.meta}
            cover={next.poster ?? next.covers[0] ?? ""}
          />
        )}
      </article>
    </main>
  );
}
