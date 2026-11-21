export type Media = {
  type: "image" | "video";
  /** Path under /public, e.g. "/images/live/hero.png" or "/videos/live/flow.mp4". Leave empty for a placeholder. */
  src?: string;
  /** Alt text, and the placeholder label while src is empty. */
  label: string;
  /** CSS aspect-ratio, e.g. "16/9". */
  aspect: string;
  /** Optional poster frame for videos. */
  poster?: string;
  /** No longer needed: every video now plays muted on a loop while on screen. Kept so existing entries still type-check. */
  autoplay?: boolean;
  /** "contain" shows the whole image or video instead of cropping it to fill the frame. */
  fit?: "cover" | "contain";
  /** Frame color behind a "contain" image or video (white by default), e.g. the video's own background. */
  background?: string;
  /** Space between the frame's edge and an image, as CSS padding, e.g. "5%". */
  padding?: string;
};

/** Before vs after: the left side is greyed out, the right side gets the accent. */
export type Compare = {
  left: { title: string; quote: string; note: string };
  right: { title: string; lead: string; items: string[] };
  takeaway?: string;
};

export type Block =
  /** In `body`, a string is a paragraph and a string[] is a bullet list. */
  | { kind: "heading"; eyebrow?: string; title?: string; body?: (string | string[])[]; small?: boolean }
  | { kind: "media"; media: Media }
  | { kind: "pair"; items: [Media, Media] }
  | {
      kind: "cards";
      withMedia?: boolean;
      items: { title: string; body: string; media?: Media }[];
    }
  | {
      kind: "captioned";
      media: Media;
      title?: string;
      body: string;
      alignCaption?: "end";
      /** Short labels listed under the caption, e.g. the design highlights behind this flow. */
      highlights?: string[];
      /** A text link under the caption, e.g. to a section further down ("#highlight-filters"). */
      link?: { label: string; href: string };
    }
  | { kind: "stats"; items: { value: string; label: string }[] }
  /**
   * Headline metrics in one bordered card: a label, a big number, then what it measures. Two or three
   * sit in a row, four make a 2×2 grid. `link` adds a "view more" link, e.g. to a section ("#ask-capy").
   */
  | { kind: "metrics"; items: { label: string; value: string; body: string; link?: { label: string; href: string } }[] }
  /**
   * Clickable slides, each with its own caption; image slides share the first image's aspect.
   * Leave out `media` on every slide for a text-only carousel. `label` names the slides, e.g. "Insight".
   */
  | {
      kind: "carousel";
      label?: string;
      /** A narrower image column, leaving more room for the caption. */
      compact?: boolean;
      /**
       * A slide shows `media`, or a `compare` card drawn in code instead of an image. `title` heads the
       * caption; `note` adds a labeled block under it (like `opportunity`, with your own label).
       */
      items: {
        media?: Media;
        compare?: Compare;
        title?: string;
        body: string;
        opportunity?: string;
        note?: { label: string; body: string };
      }[];
    }
  /** A plain table with a header row; the first column reads as a label, the last as the outcome. */
  | { kind: "table"; columns: string[]; rows: string[][] }
  /** A short summary as labeled rows, e.g. Problem / My role / Impact. */
  | { kind: "tldr"; items: { label: string; body: string }[] }
  /** Numbered takeaways (01, 02…), each a short title with an optional sentence or two, split by rules. */
  | { kind: "learnings"; items: { title: string; body?: string }[] }
  /**
   * A left-to-right flow drawn in code. Consecutive steps that share a `group` sit inside one
   * labeled box (e.g. "TAP agency"). `redundant` steps are struck through and tinted, and
   * `time` shows under each step. `total` prints a summary line under the flow.
   */
  | {
      kind: "flow";
      title?: string;
      steps: { label: string; detail?: string; group?: string; time?: string; redundant?: boolean; icon?: "store" | "creator" }[];
      total?: string;
    }
  /**
   * A persona: who they are, then columns such as Decision-making logic / Working habits /
   * Pain points. An `ordered` column numbers its items (e.g. the order they decide in).
   */
  | {
      kind: "persona";
      name: string;
      role: string;
      summary: string;
      avatar?: Media;
      /** An `ordered` column spans the full card as ranked blocks (1, 2, 3…); items can carry a detail line. */
      columns: { title: string; items: (string | { label: string; detail?: string })[]; ordered?: boolean }[];
    }
  /** Side-by-side product pools (or any two parts of a solution): who it's for, its goal, its features. */
  | { kind: "pools"; items: { name: string; user: string; goal: string; features?: string[] }[] }
  /** Interactive: feature cards grouped by pool; clicking one reveals the pain point it answers. */
  | {
      kind: "featureMap";
      groups: { pool: string; items: { feature: string; detail?: string; pain: string; who: string }[] }[];
    }
  /**
   * A design highlight: numbered title, media, the reasoning, and the metric it moved.
   * `levels` optionally shows an information hierarchy as two columns (e.g. first level / second level).
   */
  | {
      kind: "highlight";
      number: string;
      pool: string;
      title: string;
      media: Media;
      /** Optional second media shown right under the first, e.g. a diagram under a design video. */
      media2?: Media;
      body: (string | string[])[];
      levels?: { title: string; items: string[] }[];
      metric?: { value: string; label: string; quote?: string };
    }
  /** Interactive: tabs that switch between sets of flows, e.g. Before / After. The last view shows first. */
  | {
      kind: "flowToggle";
      views: {
        label: string;
        caption?: string;
        flows: {
          title?: string;
          steps: { label: string; detail?: string; group?: string; time?: string; redundant?: boolean; icon?: "store" | "creator" }[];
          total?: string;
          variant?: "filled" | "outline";
        }[];
      }[];
    }
  /** Research quotes, each with who said it (role, not name). */
  | { kind: "quotes"; items: { quote: string; who: string }[] }
  /** A bordered callout, e.g. to label a section as speculative / not shipped. */
  | { kind: "note"; label: string; body: string }
  /** A single button that jumps to another part of the page. */
  | { kind: "cta"; label: string; href: string }
  /** A working prototype rendered in code. Add new ones to components/prototypes/index.tsx. */
  | { kind: "prototype"; name: "agent-pick-list"; caption?: string };

export type CaseSection = {
  id: string;
  /** Label in the sidebar; null keeps the section out of the sidebar. */
  nav: string | null;
  /** Nests this sidebar item under a group label; consecutive sections share one group. */
  navGroup?: string;
  blocks: Block[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  sidebarBlurb: string;
  hero: Media;
  meta: { label: string; value: string[] }[];
  sections: CaseSection[];
};
