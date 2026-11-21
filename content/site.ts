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
  /** Keep off the homepage grid and the next-project rotation (e.g. a page linked from Recognitions). */
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
  /** The award or event, e.g. "Red Dot Design Award". */
  award: string;
  /** Placement or category, e.g. "Winner · Interface Design". */
  result: string;
  /** The project it recognized. */
  project: string;
  year: string;
  /** Link to the award page or project entry; leave empty until you have it. */
  href: string;
};

// Homepage "Recent Recognitions". Replace the [bracketed] values with the real details.
export const recognitions: Recognition[] = [
  { award: "Red Dot Design Award", result: "Winner · Brands & Communication Design", project: "Globbbe, a gamified edutainment app", year: "2024", href: "https://www.red-dot.org/project/globbbe-72907" },
  { award: "A' Design Award", result: "Silver", project: "The Game of Equality", year: "2024", href: "" },
  { award: "PitchBook Data × NYU Product Hackathon", result: "3rd Prize", project: "DataSense", year: "2024", href: "/work/datasense" },
];
