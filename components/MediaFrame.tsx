import Image from "next/image";
import type { Media } from "@/content/types";
import { AutoVideo } from "./AutoVideo";

export function MediaFrame({ media, className = "" }: { media: Media; className?: string }) {
  const contain = media.fit === "contain";
  const style = { aspectRatio: media.aspect, ...(contain && { backgroundColor: media.background ?? "#fff" }) };
  if (!media.src) {
    return (
      <div
        style={style}
        className={`flex w-full items-center justify-center rounded-[8px] bg-well p-6 ${className}`}
      >
        <span className="rounded-full border border-dashed border-subtle px-3 py-1 text-center text-[12px] text-subtle">
          {media.type === "video" ? "▶ " : ""}
          {media.label}
        </span>
      </div>
    );
  }
  if (media.type === "video" && media.padding) {
    return (
      <div
        style={{ aspectRatio: media.aspect, padding: media.padding, backgroundColor: media.background ?? "#fff" }}
        className={`w-full overflow-hidden rounded-[8px] ${className}`}
      >
        <AutoVideo
          className="h-full w-full rounded-[4px] object-contain"
          src={media.src}
          poster={media.poster}
          label={media.label}
        />
      </div>
    );
  }
  if (media.type === "video") {
    return (
      // Every video plays muted on a loop while it's on screen.
      <AutoVideo
        style={style}
        className={`w-full rounded-[8px] ${contain ? "object-contain" : "bg-well object-cover"} ${className}`}
        src={media.src}
        poster={media.poster}
        label={media.label}
      />
    );
  }
  return (
    <div
      style={{ ...style, padding: media.padding }}
      className={`relative w-full overflow-hidden rounded-[8px] ${contain ? "" : "bg-well"} ${className}`}
    >
      <div className="relative h-full w-full">
        <Image
          src={media.src}
          alt={media.label}
          fill
          sizes="(min-width: 1200px) 970px, 100vw"
          className={contain ? "object-contain" : "object-cover"}
        />
      </div>
    </div>
  );
}
