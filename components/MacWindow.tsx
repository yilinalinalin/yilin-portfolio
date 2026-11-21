"use client";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A macOS-style window over a dimmed page: traffic-light title bar, scrolling body, optional footer.
 * Closes with the red light, Esc, or a click outside.
 */
export function MacWindow({
  open,
  title,
  onClose,
  footer,
  className = "max-h-[85vh] w-[min(520px,100%)]",
  bodyClassName = "overflow-y-auto",
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  /** Size of the window. */
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/15 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={`flex ${className} flex-col overflow-hidden rounded-[12px] border border-black/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.25)]`}
          >
            {/* Title bar */}
            <div className="relative flex h-[38px] shrink-0 items-center border-b border-black/[0.08] bg-[#f6f6f6] px-3">
              <div className="group flex gap-2">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="flex size-3 items-center justify-center rounded-full bg-[#ff5f57] ring-[0.5px] ring-black/10"
                >
                  <svg viewBox="0 0 8 8" className="size-[6px] opacity-0 group-hover:opacity-100" aria-hidden>
                    <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
                <span aria-hidden className="size-3 rounded-full bg-[#febc2e] ring-[0.5px] ring-black/10" />
                <span aria-hidden className="size-3 rounded-full bg-[#28c840] ring-[0.5px] ring-black/10" />
              </div>
              <p className="pointer-events-none absolute inset-x-0 text-center text-[13px] font-medium text-ink/80">
                {title}
              </p>
            </div>

            {/* Body */}
            <div className={`relative min-h-0 flex-1 bg-white ${bodyClassName}`}>{children}</div>

            {footer && (
              <div className="shrink-0 border-t border-black/[0.08] bg-[#fafafa] px-4 py-2.5">{footer}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
