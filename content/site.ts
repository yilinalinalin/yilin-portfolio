// Site-wide settings. Edit these and the whole site updates.

export const site = {
  name: "Yilin Wang",
  title: "Yilin Wang — Product Designer",
  description:
    "Yilin is a product designer who solves real problems in ways people actually enjoy using.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yilin-wang-design" },
    { label: "Twitter", href: "https://x.com/yilin_wang_" },
  ],
};

export type ProjectSummary = {
  slug: string;
  title: string;
  meta: string;
  description: string;
  /** Two covers shown side by side (image, or .mp4/.webm video that autoplays muted). `null` renders an empty dark tile. */
  covers: [string | null, string | null];
  /** Fit the first cover inside the square, filling the rest with this color (e.g. the video's own background). */
  coverBackground?: string;
  /** A still used where a video can't play, like the next-project panel. */
  poster?: string;
  /** Set false to hide "Read more" (e.g. work in progress). */
  hasCaseStudy: boolean;
  /** Keep off the homepage product list and the next-project rotation (e.g. a page shown as an award card). */
  unlisted?: boolean;
};

export const projects: ProjectSummary[] = [
  // Homepage order: the first project gets the top-left spot.
  {
    slug: "tap-product-selection-pool",
    title: "TAP Product Selection Pool",
    meta: "TikTok/2024",
    description: "Two product pools designed to shorten TikTok Shop affiliate agencies' workflow by 40%.",
    covers: ["/images/covers/tap-pools.jpg", "/images/tap-2.png"],
    hasCaseStudy: true,
  },
  {
    slug: "capybara-ai",
    title: "Capybara.AI",
    meta: "Startup 0→1/2025",
    description:
      "A mobile AI-powered stock news app that reached 10K DAU post-launch.",
    covers: ["/videos/capybara-cover.mp4", "/images/capybara-2.png"],
    hasCaseStudy: true,
  },
  {
    slug: "live-diagnosis",
    title: "LIVE Diagnosis",
    meta: "TikTok/2024",
    description:
      "A live-stream data analysis and diagnosis feature that increased live-stream length by 1.5%.",
    covers: ["/videos/live-diagnosis-product-pin.mp4", "/images/live-diagnosis-2.png"],
    poster: "/images/covers/live-diagnosis-poster.jpg",
    hasCaseStudy: true,
  },
  {
    slug: "alerts-center",
    title: "Alerts Center 🚧",
    meta: "Phia/2026",
    description: "A notification center designed from scratch that led to 20% GMV growth.",
    covers: ["/videos/alerts-center-cover.mp4", null],
    hasCaseStudy: false,
  },
  {
    slug: "datasense",
    title: "DataSense",
    meta: "NYU Hackathon/2024",
    description: "A 24-hour pitch for PitchBook Data: faster bulk data entry and more accurate entity matching.",
    covers: ["/images/datasense/hero.png", null],
    hasCaseStudy: true,
    unlisted: true,
  },
];

export type Recognition = {
  /** Card title: the project that was recognized. */
  title: string;
  /** The award or event, e.g. "Red Dot Design Award". */
  award: string;
  /** Small tag on the card, e.g. "Red Dot · 2024". */
  meta: string;
  description: string;
  /** Square cover; leave null to show a dark tile with the award name until you have one. */
  cover: string | null;
  /** Color behind a cover that should show whole instead of cropped (e.g. a transparent PNG). */
  coverBackground?: string;
  /** A page on this site ("/work/...") or an outside link; leave empty for no link. */
  href: string;
};

// Awards, shown in the homepage grid under the "Awards" tag.
export const recognitions: Recognition[] = [
  {
    title: "Globbbe",
    award: "Red Dot Design Award",
    meta: "Red Dot/2024",
    description: "Red Dot winner, Brands & Communication Design. A gamified edutainment app that helps children explore the world.",
    cover: "/images/covers/globbbe.jpg",
    href: "https://www.red-dot.org/project/globbbe-72907",
  },
  {
    title: "The Game of Equality",
    award: "A' Design Award",
    meta: "A' Design/2024",
    description: "A' Design Award, Silver.",
    cover: "/images/covers/game-of-equality.jpg",
    href: "",
  },
  {
    title: "DataSense",
    award: "PitchBook Data × NYU Product Hackathon",
    meta: "Hackathon/2024",
    description: "3rd Prize at the PitchBook Data × NYU Product Hackathon: faster bulk data entry and entity matching, pitched in 24 hours.",
    cover: "/images/covers/datasense.jpg",
    href: "/work/datasense",
  },
];

// Glass logo bubbles floating around the hero illustration. Positions are percentages of the
// avatar's box (negative = outside it); `size` is the width in px on desktop (phones use ~70%).
export const bubbles: { name: string; src: string; size: number; top: string; left?: string; right?: string; float: number }[] = [
  { name: "TikTok", src: "/images/bubbles/tiktok.webp", size: 68, top: "4%", left: "-36%", float: 6.2 },
  { name: "Phia", src: "/images/bubbles/phia.webp", size: 82, top: "-6%", right: "-42%", float: 7.4 },
  { name: "Y Combinator", src: "/images/bubbles/ycombinator.webp", size: 62, top: "46%", right: "-36%", float: 5.6 },
  { name: "Micron", src: "/images/bubbles/micron.webp", size: 60, top: "44%", left: "-32%", float: 6.8 },
];
