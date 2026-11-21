"use client";
import Image from "next/image";
import { MacWindow } from "./MacWindow";

export type Profile = "linkedin" | "twitter";

// LinkedIn and X refuse to load inside other sites' frames, and their official embeds come up
// blank for signed-out visitors, so the window shows a card built from the real profile and the
// button opens the live profile in a small browser pop-up. Update the text here when a profile changes.
type ProfileData = {
  title: string;
  url: string;
  handle?: string;
  headline: string;
  meta: string[];
  about?: string[];
  skills?: string[];
  button: string;
};

const profiles: Record<Profile, ProfileData> = {
  linkedin: {
    title: "LinkedIn — Yilin Wang",
    url: "https://www.linkedin.com/in/yilin-wang-design",
    headline: "Product Designer | AI-Driven Consumer Products (Ex-TikTok, Phia) | Red Dot Winner",
    meta: ["New York City Metropolitan Area", "500+ connections"],
    about: [
      "I'm a Product Designer crafting AI-driven consumer products.",
      "At TikTok's global e-commerce org, I shipped 7 end-to-end projects and ran 20+ A/B tests, including features used by 20,000+ agencies. At Capybara.AI, I designed an AI-powered fintech app 0-to-1.",
    ],
    skills: ["Product Design", "Product Management", "User Research", "Data Analysis", "Agile Project Management"],
    button: "#0a66c2",
  },
  twitter: {
    title: "X — @yilin_wang_",
    url: "https://x.com/yilin_wang_",
    handle: "@yilin_wang_",
    headline: "Prev. Design @TikTok, Phia | Red Dot Winner | NYU 26'",
    meta: ["Brooklyn, NY", "Joined July 2025"],
    button: "#0f1419",
  },
};

/** Opens the real profile in a small browser window; returns false if a blocker stopped it. */
function openPopup(url: string) {
  const w = 480;
  const h = Math.min(780, window.screen.availHeight - 80);
  const left = window.screenX + (window.outerWidth - w) / 2;
  const top = window.screenY + (window.outerHeight - h) / 2;
  const win = window.open(url, "profile", `popup=yes,width=${w},height=${h},left=${left},top=${top}`);
  return !!win;
}

const Verified = ({ profile }: { profile: Profile }) =>
  profile === "twitter" ? (
    <svg viewBox="0 0 22 22" className="size-[18px]" aria-label="Verified">
      <path
        fill="#1d9bf0"
        d="M20.4 11c0-1.3-.8-2.4-2-2.9.4-1.2.1-2.6-.8-3.5-.9-.9-2.3-1.2-3.5-.8C13.5 2.6 12.3 1.8 11 1.8s-2.4.8-2.9 2c-1.2-.4-2.6-.1-3.5.8-.9.9-1.2 2.3-.8 3.5-1.2.5-2 1.6-2 2.9s.8 2.4 2 2.9c-.4 1.2-.1 2.6.8 3.5.9.9 2.3 1.2 3.5.8.5 1.2 1.6 2 2.9 2s2.4-.8 2.9-2c1.2.4 2.6.1 3.5-.8.9-.9 1.2-2.3.8-3.5 1.2-.5 2-1.6 2-2.9z"
      />
      <path d="M9.6 14.6 6.5 11.5l1.3-1.3 1.8 1.8 4.6-4.6 1.3 1.3z" fill="#fff" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="size-[20px]" fill="none" stroke="#56687a" strokeWidth="1.6" aria-label="Verified">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.6" />
    </svg>
  );

function ProfileCard({ profile }: { profile: Profile }) {
  const p = profiles[profile];
  return (
    <div className="pb-6">
      <div className="relative h-[130px] w-full">
        <Image src="/images/dock/profile-banner.jpg" alt="" fill sizes="520px" className="object-cover" />
      </div>
      <div className="px-5">
        <div className="-mt-[52px] size-[104px] overflow-hidden rounded-full border-4 border-white bg-white">
          <Image
            src="/images/dock/profile-photo.jpg"
            alt="Yilin Wang"
            width={212}
            height={212}
            className="h-full w-full scale-[1.06] object-cover"
          />
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <h2 className="text-[22px] font-bold leading-tight text-ink">Yilin Wang</h2>
          <Verified profile={profile} />
        </div>
        {p.handle && <p className="text-[15px] text-[#536471]">{p.handle}</p>}
        <p className="mt-2 text-[15px] leading-[1.4] text-ink">{p.headline}</p>
        <p className="mt-2 text-[13px] text-[#536471]">{p.meta.join("  ·  ")}</p>

        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            if (openPopup(p.url)) e.preventDefault(); // blocked? fall back to a normal new tab
          }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: p.button }}
        >
          {profile === "linkedin" ? "View on LinkedIn" : "View on X"} ↗
        </a>

        {p.about && (
          <section className="mt-6 border-t border-black/[0.08] pt-5">
            <h3 className="text-[17px] font-semibold text-ink">About</h3>
            <div className="mt-2 space-y-2.5 text-[14px] leading-[1.5] text-ink/85">
              {p.about.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </section>
        )}

        {p.skills && (
          <section className="mt-5 rounded-[10px] border border-black/[0.08] p-4">
            <h3 className="text-[14px] font-semibold text-ink">Top skills</h3>
            <p className="mt-1 text-[13px] leading-[1.5] text-ink/80">{p.skills.join(" · ")}</p>
          </section>
        )}
      </div>
    </div>
  );
}

/** A macOS-style window showing a social profile. */
export function ProfileWindow({ profile, onClose }: { profile: Profile | null; onClose: () => void }) {
  return (
    <MacWindow
      open={!!profile}
      title={profile ? profiles[profile].title : ""}
      onClose={onClose}
      footer={
        profile && (
          <p className="truncate text-center text-[12px] text-subtle">{profiles[profile].url.replace("https://", "")}</p>
        )
      }
    >
      {profile && <ProfileCard profile={profile} />}
    </MacWindow>
  );
}
