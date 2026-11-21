"use client";
import { useEffect, useRef, useState } from "react";
import { Reenie_Beanie } from "next/font/google";

const hand = Reenie_Beanie({ weight: "400", subsets: ["latin"] });

// Apple's official 30-second preview, streamed from Apple (no audio is hosted on this site).
const track = {
  title: "Pet's Work",
  artist: "MoruGororin",
  preview:
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/58/d7/12/58d7120d-18b8-d980-78c2-f0be2bd73636/mzaf_15895214916946971161.plus.aac.p.m4a",
};

/**
 * A handwritten note by the guinea pig in the hero illustration. Click it to play (or stop) the song;
 * little music notes float up from the pig while it plays.
 */
export function SongNote() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    a.addEventListener("ended", onEnd);
    return () => a.removeEventListener("ended", onEnd);
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.volume = 0.6;
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audio} src={track.preview} preload="none" />

      {/* Music notes rising from the guinea pig while the song plays */}
      {playing && (
        <span aria-hidden className="pointer-events-none absolute bottom-[34px] right-[18px] md:bottom-[46px] md:right-[24px]">
          {["♪", "♫", "♪"].map((n, i) => (
            <span
              key={i}
              className="absolute text-[18px] text-ink/70"
              style={{ left: `${i * 12 - 10}px`, animation: `float-note 2.4s ease-out ${i * 0.8}s infinite` }}
            >
              {n}
            </span>
          ))}
        </span>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${track.title} by ${track.artist}` : `Play ${track.title} by ${track.artist}`}
        aria-pressed={playing}
        className={`${hand.className} group absolute left-[14px] top-[190px] flex items-end whitespace-nowrap text-[28px] leading-none text-ink transition-colors hover:text-accent md:left-[34px] md:top-[268px] md:text-[36px]`}
      >
        <span className="inline-block -rotate-[3deg] transition-transform duration-300 group-hover:-rotate-[6deg] group-hover:scale-105">
          {playing ? "mute me, friend ♪" : "unmute me, friend"}
        </span>
        {/* A hand-drawn arrow rising from the note and hooking left into the guinea pig */}
        <svg
          viewBox="0 0 30 34"
          className="absolute left-[150px] top-[-24px] h-[28px] w-[25px] md:left-[194px] md:top-[-32px] md:h-[36px] md:w-[32px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M22 32 C 24 22, 21 11, 9 7" />
          <path d="M14 2.5 L8 7 L14 11.5" />
        </svg>
      </button>
    </>
  );
}
