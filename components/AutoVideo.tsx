"use client";
import { useEffect, useRef, type CSSProperties } from "react";

/**
 * A muted, looping video that plays only while it's on screen and pauses when scrolled away,
 * so a long case study doesn't download and run every video at once.
 */
export function AutoVideo({
  src,
  poster,
  label,
  className,
  style,
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      // Start a little before it scrolls in, so it's already moving when it appears.
      { rootMargin: "200px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      className={className}
      style={style}
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}
