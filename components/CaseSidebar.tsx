"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { TransitionLink } from "./PageTransition";

type Item = { id: string; label: string; group?: string };
type Entry = Item | { label: string; children: Item[] };

// Folds consecutive items that share a `group` under one label.
function groupItems(items: Item[]): Entry[] {
  const out: Entry[] = [];
  for (const item of items) {
    const last = out[out.length - 1];
    if (!item.group) out.push(item);
    else if (last && "children" in last && last.label === item.group) last.children.push(item);
    else out.push({ label: item.group, children: [item] });
  }
  return out;
}

function NavLink({
  id,
  label,
  active,
  current,
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  current: boolean;
  onClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => onClick(e, id)}
      aria-current={current ? "location" : undefined}
      className={`transition-colors duration-300 ${active ? "text-accent" : "text-subtle hover:text-ink"}`}
    >
      {label}
    </a>
  );
}

/**
 * A sidebar group (e.g. "Ask Capy"): collapsed to its label until one of its sections is on screen.
 * Clicking the label jumps to the first section, which opens it too.
 */
function GroupNav({
  entry,
  active,
  onClick,
}: {
  entry: { label: string; children: Item[] };
  active: string | null;
  onClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const open = entry.children.some((c) => c.id === active);
  return (
    <>
      <span className="inline-flex items-center gap-1.5">
        <NavLink id={entry.children[0].id} label={entry.label} active={open} current={false} onClick={onClick} />
        <svg
          viewBox="0 0 10 10"
          aria-hidden
          className={`size-[9px] transition-transform duration-300 ${open ? "rotate-90 text-accent" : "text-subtle"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 2 L6.5 5 L3.5 8" />
        </svg>
      </span>
      {/* Animating grid rows from 0fr to 1fr slides the list open to its natural height */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        inert={!open}
      >
        <ul className="min-h-0 space-y-[10px] overflow-hidden pl-[13px]">
          {entry.children.map((c, i) => (
            <li key={c.id} className={i === 0 ? "pt-[10px]" : ""}>
              <NavLink id={c.id} label={c.label} active={active === c.id} current={active === c.id} onClick={onClick} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function CaseSidebar({
  title,
  blurb,
  items,
}: {
  title: string;
  blurb: string;
  items: { id: string; label: string; group?: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  // While a click-triggered scroll is running, keep the clicked item highlighted.
  const lockedRef = useRef(false);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        if (lockedRef.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // The last section can be too short to reach the observer band; highlight it at page bottom.
    const onScroll = () => {
      if (lockedRef.current || !items.length) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(items[items.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    lockedRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);

    let timer: ReturnType<typeof setTimeout>;
    const release = () => {
      lockedRef.current = false;
      clearTimeout(timer);
      window.removeEventListener("scrollend", release);
    };
    window.addEventListener("scrollend", release, { once: true });
    timer = setTimeout(release, 1200);
  };

  return (
    <aside className="hidden md:block">
      <div className="sticky top-[160px]">
        {/* Back to the homepage grid, with the usual page transition */}
        <TransitionLink
          href="/"
          className="group mb-6 inline-flex items-center gap-1.5 text-[14px] text-subtle transition-colors hover:text-ink"
        >
          <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5">
            ←
          </span>
          All projects
        </TransitionLink>
        <p className="font-serif text-[16px]">{title}</p>
        <p className="mt-2 text-[14px] leading-[1.35] text-subtle">{blurb}</p>
        <ul className="mt-[22px] space-y-[10px] text-[14px]">
          {groupItems(items).map((entry) =>
            "children" in entry ? (
              <li key={entry.label}>
                <GroupNav entry={entry} active={active} onClick={goTo} />
              </li>
            ) : (
              <li key={entry.id}>
                <NavLink id={entry.id} label={entry.label} active={active === entry.id} current={active === entry.id} onClick={goTo} />
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
}
