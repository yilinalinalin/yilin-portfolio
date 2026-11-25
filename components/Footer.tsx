import { site } from "@/content/site";

const linkedin = site.links.find((l) => l.label === "LinkedIn")!;

/** Site footer on every page: name on the left, LinkedIn on the right. */
export function Footer() {
  return (
    <footer className="mx-auto max-w-[1200px] px-5 md:px-[30px]">
      <div className="flex items-center justify-between gap-4 border-t border-rule py-8 text-[14px]">
        <p className="text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <a
          href={linkedin.href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
        >
          LinkedIn
          <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            ↗
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
