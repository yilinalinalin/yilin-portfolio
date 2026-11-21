"use client";
import { useCallback, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { TransitionLink } from "./PageTransition";
import { ProfileWindow, type Profile } from "./ProfileWindow";
import { MapWindow } from "./MapWindow";
import { PodcastWindow } from "./PodcastWindow";

type DockItem = {
  label: string;
  href: string;
  external?: boolean;
  /** Drop an icon (SVG or <Image>) in here; until then the tile shows a placeholder. */
  icon?: ReactNode;
  isActive?: (path: string) => boolean;
  /** Opens a pop-up window (a social profile or one of the apps) instead of navigating. */
  opens?: Profile | "map" | "podcasts";
};

const iconImg = (src: string) => <Image src={src} alt="" width={128} height={128} className="h-full w-full" />;

const items: DockItem[] = [
  {
    label: "Work",
    href: "/",
    icon: <Image src="/images/dock/work.png" alt="" width={128} height={128} className="h-full w-full" />,
    isActive: (p) => p === "/" || p.startsWith("/work") },
  {
    label: "Map",
    href: "#map",
    opens: "map",
    icon: <Image src="/images/dock/map.svg" alt="" width={128} height={128} className="h-full w-full" unoptimized />,
  },
  {
    label: "Thinking",
    href: "#thinking",
    opens: "podcasts",
    icon: iconImg("/images/dock/thinking.png"),
  },
  { label: "Twitter", href: "https://x.com/yilin_wang_", opens: "twitter", icon: iconImg("/images/dock/twitter.png") },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yilin-wang-design", opens: "linkedin", icon: iconImg("/images/dock/linkedin.png") },
];

const BASE = 44; // tile size at rest
const MAX = 62; // tile size right under the pointer
const RANGE = 130; // how far from the pointer tiles still grow

/**
 * A macOS-style dock: frosted glass, rounded tiles that magnify toward the pointer,
 * a label beside the hovered tile and a dot under the current page.
 * It sits on the left edge on desktop and along the bottom on phones.
 */
export function Nav() {
  const pointer = useMotionValue(Infinity);
  const path = usePathname();
  const [open, setOpen] = useState<Profile | "map" | "podcasts" | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-3 z-50 flex justify-center md:inset-x-auto md:bottom-0 md:left-4 md:top-0 md:items-center"
    >
      <motion.ul
        onMouseMove={(e) => pointer.set(window.matchMedia("(min-width: 768px)").matches ? e.clientY : e.clientX)}
        onMouseLeave={() => pointer.set(Infinity)}
        className="flex items-end gap-2 rounded-[18px] border border-white/70 bg-white/55 p-[7px] shadow-[0_8px_30px_rgba(0,0,0,0.10),inset_0_0_0_0.5px_rgba(0,0,0,0.06)] backdrop-blur-xl md:flex-col md:items-start"
      >
        {items.map((item) => (
          <DockTile
            key={item.label}
            item={item}
            pointer={pointer}
            active={item.opens ? open === item.opens : (item.isActive?.(path) ?? false)}
            onOpen={item.opens ? () => setOpen(item.opens!) : undefined}
          />
        ))}
      </motion.ul>
      <ProfileWindow profile={open === "twitter" || open === "linkedin" ? open : null} onClose={close} />
      <MapWindow open={open === "map"} onClose={close} />
      <PodcastWindow open={open === "podcasts"} onClose={close} />
    </nav>
  );
}

function DockTile({
  item,
  pointer,
  active,
  onOpen,
}: {
  item: DockItem;
  pointer: MotionValue<number>;
  active: boolean;
  onOpen?: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // Distance from the pointer to this tile's centre, along the dock's axis.
  const distance = useTransform(pointer, (v) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !Number.isFinite(v)) return RANGE;
    const vertical = window.matchMedia("(min-width: 768px)").matches;
    return v - (vertical ? r.top + r.height / 2 : r.left + r.width / 2);
  });
  const size = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE], { clamp: true }), {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  const tile = (
    <motion.span
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-[11px] ${item.icon ? "" : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)]"}`}
    >
      {/* An icon is a finished app tile, so it fills the slot; otherwise a white tile with a placeholder. */}
      {item.icon ?? (
        <span aria-hidden className="size-[55%] rounded-[6px] border border-dashed border-subtle" />
      )}
    </motion.span>
  );

  const shared = { "aria-label": item.label, className: "block outline-none" };

  return (
    <li ref={ref} className="group relative flex items-center">
      {onOpen ? (
        // A real link, so ⌘/Ctrl-click still opens the profile in a new tab.
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-haspopup="dialog"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            onOpen();
          }}
          {...shared}
        >
          {tile}
        </a>
      ) : item.external ? (
        <a href={item.href} target="_blank" rel="noreferrer" {...shared}>
          {tile}
        </a>
      ) : (
        <TransitionLink href={item.href} {...shared}>
          {tile}
        </TransitionLink>
      )}

      {/* Label: above the tile on phones, beside it on desktop. */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-[6px] border border-black/5 bg-white/90 px-2 py-[3px] text-[12px] text-ink opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 md:bottom-auto md:left-full md:mb-0 md:ml-3 md:translate-x-0"
      >
        {item.label}
      </span>

      {/* Current page: a dot under the tile on phones, to its left on desktop. */}
      {active && (
        <span
          aria-hidden
          className="absolute -bottom-[5px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink/70 md:-left-[5px] md:bottom-auto md:translate-x-0"
        />
      )}
    </li>
  );
}
