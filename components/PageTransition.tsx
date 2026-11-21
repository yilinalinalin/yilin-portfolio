"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

// Moving between pages: a light veil fades in with a loading indicator, the route changes
// underneath, then the new page slides up from below as the veil fades away.
//   idle → covering (veil fades in) → navigate → revealing (veil out, page up) → idle
type Phase = "idle" | "covering" | "revealing";

const ease = [0.22, 1, 0.36, 1] as const;
/** The loader always stays up this long (from the click), however fast the next page is ready. */
const HOLD_MS = 1500;
/** The loader pigs, taking turns from one page change to the next. */
const PIGS = ["running", "pooping"] as const;
const L = "/images/loader";
const TransitionContext = createContext<{ phase: Phase; go: (href: string) => void }>({
  phase: "idle",
  go: () => {},
});

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const target = useRef<string | null>(null);
  const startedAt = useRef(0);
  const [pig, setPig] = useState(PIGS.length - 1); // the first page change gets the orange pig

  const go = useCallback(
    (href: string) => {
      if (reduce) return router.push(href);
      router.prefetch(href); // load it while the veil fades in, so the loading pause stays short
      target.current = href;
      startedAt.current = performance.now();
      setPig((n) => (n + 1) % PIGS.length);
      setPhase("covering");
    },
    [reduce, router]
  );

  // Once the new route has rendered under the veil (and the loader has had its full 1.5s), reveal it.
  useEffect(() => {
    if (phase === "covering" && target.current && pathname === target.current.split("#")[0]) {
      const wait = Math.max(0, HOLD_MS - (performance.now() - startedAt.current));
      const t = window.setTimeout(() => {
        target.current = null;
        setPhase("revealing");
      }, wait);
      return () => window.clearTimeout(t);
    }
  }, [pathname, phase]);

  return (
    <TransitionContext.Provider value={{ phase, go }}>
      {children}
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas text-ink"
        style={{ pointerEvents: phase === "idle" ? "none" : "auto" }}
        initial={false}
        animate={{ opacity: phase === "covering" ? 1 : 0 }}
        transition={{ duration: phase === "covering" ? 0.45 : 0.6, delay: phase === "revealing" ? 0.1 : 0, ease }}
        onAnimationComplete={() => {
          if (phase === "covering" && target.current) {
            router.push(target.current);
            window.scrollTo(0, 0);
          } else if (phase === "revealing") {
            setPhase("idle");
          }
        }}
      >
        {/* The pig stays mounted (so its drawings are already loaded) but only runs mid-transition. */}
        <div role="status" className="flex flex-col items-center gap-2">
          {/* Every pig is mounted so all drawings are loaded; only the one whose turn it is shows. */}
          <span aria-hidden className="relative block h-[53px] w-[90px]">
            {/* The orange pig: two drawings shown in turn so it looks like it's running */}
            <span
              className={`absolute bottom-0 left-0 h-[48px] w-full ${PIGS[pig] === "running" ? "" : "invisible"} ${PIGS[pig] === "running" && phase !== "idle" ? "pig-run" : ""}`}
            >
              <img src={`${L}/pig-run-1.png`} alt="" className="pig-frame-a absolute inset-0 h-full w-full" />
              <img src={`${L}/pig-run-2.png`} alt="" className="pig-frame-b absolute inset-0 h-full w-full" />
            </span>
            {/* The white pig: squishes down and leaves three droppings behind, one after another */}
            <span
              className={`absolute inset-0 ${PIGS[pig] === "pooping" ? "" : "invisible"} ${PIGS[pig] === "pooping" && phase !== "idle" ? "pig-poop" : ""}`}
            >
              <img src={`${L}/pig-poop-body.png`} alt="" className="pig-poop-body absolute inset-0 h-full w-full" />
              {[1, 2, 3].map((n) => (
                <img key={n} src={`${L}/pig-poop-poop-${n}.png`} alt="" className={`pig-pellet-${n} absolute inset-0 h-full w-full`} />
              ))}
            </span>
          </span>
          <span className="text-[14px] text-muted">{phase !== "idle" ? "Loading…" : ""}</span>
        </div>
      </motion.div>
    </TransitionContext.Provider>
  );
}

/** Wraps each page (from app/template.tsx): slides it up from below while the veil fades away. */
export function PageReveal({ children }: { children: ReactNode }) {
  const { phase } = useContext(TransitionContext);
  // Read once on mount: only pages arrived at through a transition slide up, not a fresh load.
  const [arrived] = useState(() => phase !== "idle");
  return (
    <motion.div
      initial={arrived ? { y: 140, opacity: 0.4 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.05, ease }}
    >
      {children}
    </motion.div>
  );
}

/** A next/link that plays the page transition. New-tab clicks and same-page links behave as usual. */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const { go } = useContext(TransitionContext);
  const pathname = usePathname();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (href.split("#")[0] === pathname) return;
    e.preventDefault();
    go(href);
  };
  return <Link href={href} onClick={handle} {...props} />;
}
