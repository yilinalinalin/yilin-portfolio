import type { CaseStudy } from "./types";

// Media with no `src` renders as a labeled placeholder.
// Drop your exports into /public/images or /public/videos and add the path.

export const liveDiagnosis: CaseStudy = {
  slug: "live-diagnosis",
  title: "LIVE Diagnosis",
  tagline: "Turning live-stream data into actionable items for creators.",
  sidebarBlurb: "Turning live-stream data into actionable items for creators.",
  hero: {
    type: "video",
    label: "LIVE suggestion — pinning a product from the live console",
    aspect: "970/487",
    src: "/videos/live-diagnosis/hero-pin-product-demo.mp4",
    autoplay: true,
  },
  meta: [
    { label: "Collaborator", value: ["Yilin Wang", "Jingyi Zhou (sr. designer)"] },
    { label: "Timeline", value: ["2 month, 2024"] },
    { label: "Scope", value: ["Solution ideation, UX design, usability testing"] },
  ],
  sections: [
    {
      id: "key-metrics",
      nav: "Key Metrics",
      blocks: [
        { kind: "heading", eyebrow: "Key design metrics", title: "What the design moved" },
        {
          kind: "metrics",
          items: [
            {
              label: "Suggestion adoption",
              value: "20.8% → 26.9%",
              body: "Adoption rate after going from multiple suggestion cards to a single card.",
            },
            {
              label: "Livestream length",
              value: "+1.5%",
              body: "Longer livestreams for creators with the suggestion card feature.",
            },
          ],
        },
      ],
    },
    {
      id: "problem",
      nav: "Problem",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Problem",
          title:
            "TikTok Shop gives sellers detailed LIVE analytics, but for entry-level teams, more data isn't leading to better streams.",
          body: [
            "As a result, streams generate lower GMV, and many new creators give up on TikTok LIVE altogether.",
          ],
        },
        { kind: "media", media: {
            type: "image",
            label: "LIVE analytics dashboard",
            aspect: "2000/1275",
            src: "/images/live-diagnosis/analytics-dashboard.jpg",
          } },
      ],
    },
    {
      id: "user-research",
      nav: "User Research",
      blocks: [
        {
          kind: "heading",
          eyebrow: "User Research",
          title: "Working with a PM and 3 user researchers, we found two reasons the data wasn't helping.",
        },
        {
          kind: "cards",
          withMedia: true,
          items: [
            {
              media: {
                type: "image",
                label: "Research photo — sellers on LIVE",
                aspect: "4/3",
                src: "/images/live-diagnosis/research-sellers.jpg",
              },
              title: "They don't know what the numbers mean, or what to do about them",
              body: "Entry-level sellers can't tell whether a metric is good or bad, and don't know which actions would improve it.",
            },
            {
              media: {
                type: "image",
                label: "Research photo — studio setup",
                aspect: "4/3",
                src: "/images/live-diagnosis/research-studio.jpg",
              },
              title: "There's no time to analyze data during a LIVE",
              body: "While they're running the stream, managing products and chat, teams can't stop to read complex data and decide what to do next.",
            },
          ],
        },
      ],
    },
    {
      id: "hmw",
      nav: null,
      blocks: [
        {
          kind: "heading",
          eyebrow: "Problem",
          title:
            "How might we turn LIVE data into clear next steps that sellers can act on in seconds, without adding to their cognitive burden?",
        },
        {
          kind: "cards",
          items: [
            { title: "Primary success metric", body: "GMV per stream, average watch time, and conversion rate." },
            {
              title: "Leading indicators",
              body: "How often solutions are acted on, the time from problem to action, and the share of creators who complete the solution flow.",
            },
          ],
        },
      ],
    },
    {
      id: "solution-ideation",
      nav: "Solution Ideation",
      blocks: [
        { kind: "heading", eyebrow: "Solution Ideation", title: "During LIVE or After LIVE?" },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Direction 1 — LIVE Pulse walkthrough",
            aspect: "1/1",
            src: "/videos/live-diagnosis/direction-1-live-pulse.mp4",
          },
          title: "Direction 1 - LIVE Pulse",
          body: "Display key metrics that need attention after each live-stream for creators to learn and review.",
        },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Direction 2 — LIVE Actions walkthrough",
            aspect: "1/1",
            src: "/videos/live-diagnosis/direction-2-live-actions.mp4",
          },
          title: "Direction 2 - LIVE Actions",
          body: "Notify users when key metrics need attention during the live stream, with actionable solutions.",
        },
      ],
    },
    {
      id: "design-exploration",
      nav: "Design Exploration",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Design Evolution",
          title: "Multiple suggestions vs. single suggestion",
          body: [
            "During a LIVE, the moderator is already juggling chat, products, and promotions. At the beginning, we showed a suggestion for every underperforming metric. Testing showed that sellers spent longer deciding which to act on, and often acted on none.",
            "So we show only the highest-impact suggestion at a time, ranked by how far the metric has fallen.",
          ],
        },
        {
          kind: "pair",
          items: [
            {
              type: "image",
              label: "Before — stacked suggestions",
              aspect: "1/1",
              src: "/images/live-diagnosis/stacked-suggestions.jpg",
            },
            {
              type: "image",
              label: "After — single suggestion",
              aspect: "1/1",
              src: "/images/live-diagnosis/single-suggestion.jpg",
            },
          ],
        },
        {
          kind: "heading",
          small: true,
          title: "Where to place the feature?",
          body: [
            "We needed a suggestion card to be seen without being intrusive.",
            "Among the three options, the popover hid the suggestion behind a click, and the banner covered the stream. Eventually, we decided to add a fixed slot beside the chat. This ensures visibility without disruption.",
          ],
        },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Option A — popover",
            aspect: "1/1",
            src: "/videos/live-diagnosis/option-a-popover.mp4",
          },
          body: "When a metric falls behind, its tile in the top bar turns red, and one click opens a recommendation right where the team is already looking, without leaving the live console.",
        },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Option B — banner",
            aspect: "1/1",
            src: "/videos/live-diagnosis/option-b-banner.mp4",
          },
          body: "A suggestion banner slides in over the live video, right where the team is watching, with one click to act or dismiss.",
        },
        {
          kind: "captioned",
          media: {
            type: "image",
            label: "Option C — fixed module above chat",
            aspect: "1/1",
            src: "/images/live-diagnosis/module-above-chat.jpg",
          },
          body: "Suggestions live in a dedicated module above LIVE chat, so the next action is always in view without switch tap and covering the video.",
        },
      ],
    },
    {
      id: "final-design",
      nav: "Final Design",
      blocks: [
        { kind: "heading", eyebrow: "Final design" },
        {
          kind: "media",
          media: {
            type: "video",
            label: "Final flow walkthrough",
            aspect: "16/9",
            src: "/videos/live-diagnosis/final-flow.mp4",
          },
        },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Suggestion type variations",
            aspect: "580/520",
            src: "/videos/live-diagnosis-live-suggestion.mp4",
          },
          body: "Compatible for different suggestion types.",
          alignCaption: "end",
        },
      ],
    },
    {
      id: "key-learnings",
      nav: "Key Learnings",
      blocks: [
        { kind: "heading", eyebrow: "Key learnings", title: "What I took away" },
        {
          kind: "learnings",
          // Drafted from the sections above. Edit freely.
          items: [
            {
              title: "One clear action beats a list of options",
              body: "Going from multiple suggestion cards to a single one lifted adoption from 20.8% to 26.9%. Mid-stream, every extra choice is a decision the team has no time to make.",
            },
            {
              title: "Design for the moment, not the dashboard",
              body: "Teams can't stop to analyze data while they're running a LIVE. Guidance had to arrive in real time, beside chat, where they were already looking.",
            },
            {
              title: "Data only helps when it says what to do next",
              body: "Entry-level sellers couldn't tell whether a number was good or bad. Pairing a metric with one concrete action mattered more than showing more metrics.",
            },
          ],
        },
      ],
    },
  ],
};
