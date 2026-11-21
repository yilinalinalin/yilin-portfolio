import type { CaseStudy } from "./types";

// Media with no `src` renders as a labeled placeholder.
// Drop your exports into /public/images or /public/videos and add the path.

export const capybaraAi: CaseStudy = {
  slug: "capybara-ai",
  title: "Capybara.AI",
  tagline: "Turning market noise into answers for retail investors",
  sidebarBlurb: "Turning market noise into answers for retail investors",
  hero: {
    type: "video",
    label: "Capybara.AI app opening",
    aspect: "970/487",
    src: "/videos/capybara/app-opening.mp4",
    autoplay: true,
  },
  meta: [
    { label: "Collaborator", value: ["Yilin Wang", "3 Product Managers", "8 AI Engineers"] },
    { label: "Timeline", value: ["2023 - 2025"] },
    { label: "Scope", value: ["Brand → AI product design"] },
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
              label: "User retention",
              value: "40% / 32% / 24%",
              body: "Day 1, Day 7, and Day 30 retention.",
            },
            {
              label: "Follow-up rate",
              value: "20.8% → 35.3%",
              body: "After adding AI data visualization skills to the conversational AI feature.",
              link: { label: "View Ask Capy", href: "#ask-capy-painpoint" },
            },
            {
              label: "Daily active users",
              value: "10K",
              body: "DAU within one month of launching the MVP.",
            },
            {
              label: "Design system",
              value: "40+",
              body: "Reusable components built for the product.",
              link: { label: "View design system", href: "#brand-identity" },
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
          title: "Retail investors have more financial news than ever, but no easy way to connect it to their own holdings.",
          body: [
            "To understand a single market move, they jump between news sites, brokerage apps, and social media, then piece together the story themselves.",
          ],
        },
      ],
    },
    {
      id: "core-flow",
      nav: "Core Flow",
      blocks: [
        { kind: "heading", eyebrow: "Solution" },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Portfolio and news overview",
            aspect: "1/1",
            src: "/videos/capybara/core-flow-1.mp4",
          },
          title: "Catch up on what happened within a minute",
          body: "Open the app to see how your portfolio moved, and the news behind it.",
        },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Ask Capy walkthrough",
            aspect: "1/1",
            src: "/videos/capybara/core-flow-2.mp4",
          },
          title: "Understand what the news means for you",
          body: "Ask Capy turns the numbers into clear answers, so you get the story at a glance.",
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Research",
          title: "What 20+ investor interviews told us about who we’re designing for",
          body: [
            "Working with the founder and 3 engineers, I used internal AI tools to synthesize transcripts from 20+ retail investor interviews, and the outcome revealed who we are designing for and their respective pain points.",
          ],
        },
        {
          kind: "carousel",
          label: "Insight",
          items: [
            {
              media: {
                type: "image",
                label: "News sources scattered across an investor’s holdings",
                aspect: "1/1",
                src: "/images/capybara/insight-sources-square.jpg",
              },
              body: "Investors found news comes from multiple sources all the time. Because their holdings are scattered and various, it’s harder to find the related news.",
              opportunity: "synthesize all the information online, surface what matters to investors.",
            },
            {
              media: {
                type: "image",
                label: "Funnel: read the headline 100%, understood the terms 60%, knew the impact 30%, knew what to do next 15%",
                aspect: "1/1",
                src: "/images/capybara/insight-funnel-square.jpg",
              },
              body: "Even when investors read the headline, jargon and missing context make it hard to judge what it means for them or how to act.",
              opportunity: "translate news into plain-language, personal implications.",
            },
            {
              media: {
                type: "image",
                label: "Price checks speed up as overconfidence turns to FOMO at the peak and panic at the bottom",
                aspect: "1/1",
                src: "/images/capybara/insight-price-swings.jpg",
              },
              body: "Price swings trigger panic, FOMO, and overconfidence, and constant checking adds anxiety.",
              opportunity: "provide calm context, e.g., “a 6% move is normal for this stock.”",
            },
            {
              compare: {
                left: {
                  title: "Black box",
                  quote: "“Intel dropped because of weak guidance.”",
                  note: "No source, no date, no context",
                },
                right: {
                  title: "Glass box",
                  lead: "Same sentence, plus:",
                  items: ["5 sources with publisher logos", "Updated 11 minutes ago", "AI-powered, not advice"],
                },
                takeaway: "Investors trust what they can verify.",
              },
              body: "Investors are skeptical of influencers, of apps that profit from trading, and of AI explanations they can’t verify.",
              opportunity: "be transparent with sources, sentiment, and clear limits.",
            },
          ],
        },
      ],
    },
    {
      id: "news-painpoint",
      nav: "Painpoint",
      navGroup: "News that matters",
      blocks: [
        {
          kind: "heading",
          eyebrow: "User Painpoint 1",
          title: "Retail investors often struggle to get a full picture of market changes in a short time.",
        },
        {
          kind: "captioned",
          media: {
            type: "image",
            label: "News card wireframe — headline, sentiment, time frame, summary",
            aspect: "2619/2151",
            src: "/images/capybara/news-card-wireframe.jpg",
          },
          body: "To tackle this problem, we decided to pull news from verified financial sources and then structure the summaries by companies.",
        },
        {
          kind: "heading",
          eyebrow: "Design Challenge",
          title: "How might we surface the information that matters most to the retail investors?",
        },
      ],
    },
    {
      id: "news-exploration",
      nav: "Exploration",
      navGroup: "News that matters",
      blocks: [
        { kind: "heading", eyebrow: "Exploration" },
        {
          kind: "captioned",
          media: {
            type: "image",
            label: "News grouped by company",
            aspect: "1/1",
            src: "/images/capybara/explore-by-company.jpg",
          },
          body: "Display news summaries by company, sorted by each stock’s weight in the investor’s portfolio",
        },
        {
          kind: "heading",
          eyebrow: "Usability Testing",
          title: "Are we showing users what actually matters?",
        },
        {
          kind: "table",
          columns: ["Source", "Feedback", "Design next step"],
          rows: [
            [
              "Retail investor Amy",
              "Retail investors also follow stocks they don’t own or watch.",
              "Include broader market news and high-volatility stocks.",
            ],
            [
              "Retail investor Luke",
              "Users read headlines first and check price performance second.",
              "Prioritize the news headlines, make price data secondary.",
            ],
            [
              "AI engineer",
              "Major news can affect several companies at once.",
              "Visualize the relationship between a single news and multiple tickers.",
            ],
            [
              "AI engineer",
              "News about the same stock vary in importance and sentiment.",
              "Rank by individual news priority, surface sentiment.",
            ],
          ],
        },
      ],
    },
    {
      id: "news-solution",
      nav: "Solution",
      navGroup: "News that matters",
      blocks: [
        { kind: "heading", eyebrow: "Solution" },
        {
          kind: "captioned",
          media: {
            type: "image",
            label: "News feed cards, one per headline, each with its tickers and sentiment",
            aspect: "1/1",
            src: "/images/capybara/news-feed-by-headline.jpg",
          },
          body: "Display by each headline, sort based on the impact to the investors’ portfolios and the market.",
        },
        {
          kind: "captioned",
          media: {
            type: "image",
            label: "News detail page with an Also impacted row of META, NVDA and TSLA",
            aspect: "1/1",
            src: "/images/capybara/news-detail-also-impacted.jpg",
          },
          body: "In each news individual page, investors can see the other stocks impacted by the single news.",
        },
      ],
    },
    {
      id: "ask-capy-painpoint",
      nav: "Painpoint",
      navGroup: "Ask Capy",
      blocks: [
        {
          kind: "heading",
          eyebrow: "User Painpoint 2",
          title: "Retail investors know something changed, but not what it means for their portfolio and what to do next.",
        },
        {
          kind: "captioned",
          media: {
            type: "image",
            label: "Ask Capy draws on the portfolio, viewed stocks, top news and live market data to suggest questions and structure answers",
            aspect: "1125/844",
            src: "/images/capybara/ask-capy-inputs-outputs-cream.jpg",
          },
          body: "To tackle this problem, we designed a conversational AI assistant “Ask Capy”.",
        },
        {
          kind: "heading",
          eyebrow: "Design Challenge",
          title: "How and where should Ask Capy appear to stay discoverable while reducing cognitive load?",
        },
      ],
    },
    {
      id: "ask-capy-exploration",
      nav: "Exploration",
      navGroup: "Ask Capy",
      blocks: [
        { kind: "heading", eyebrow: "Exploration" },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Ask Capy as its own tab in the bottom navigation bar",
            aspect: "1/1",
            fit: "contain",
            background: "#1F1D19",
            src: "/videos/capybara/ask-capy-bottom-tab.mp4",
          },
          body: "A dedicated tab in the bottom navigation bar.",
        },
        {
          kind: "heading",
          eyebrow: "Usability Testing",
          title: "Users’ questions come up while reading news, tracking stock prices, and viewing their portfolio performance, not when they first open the app.",
        },
      ],
    },
    {
      id: "ask-capy-solution",
      nav: "Solution",
      navGroup: "Ask Capy",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Solution",
          body: [
            "Add an Ask Capy section with question prompts that tie directly to the user’s portfolio, their stocks, and the day’s top news.",
          ],
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "Ask Capy prompts on the Portfolio, stock and Explore screens",
            aspect: "2400/1697",
            src: "/images/capybara/ask-capy-prompts-3up.jpg",
          },
        },
      ],
    },
    {
      id: "ask-capy-ai-design",
      nav: "AI & Design",
      navGroup: "Ask Capy",
      blocks: [
        {
          kind: "heading",
          eyebrow: "AI & Design",
          title: "However, the AI output is very lengthy and dense. How to make AI answers easier to scan and understand?",
          body: ["Therefore, I built an AI skill that turns key data comparisons into visual charts."],
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "AI output pipeline: design-time rules feed a run-time loop that fills, validates, repairs and renders answer cards",
            aspect: "775/526",
            src: "/images/capybara/ask-capy-ai-output-pipeline.png",
          },
        },
        {
          kind: "captioned",
          media: {
            type: "video",
            label: "Ask Capy answering why Intel fell, with a chart comparing it to peers and the Nasdaq 100",
            aspect: "1/1",
            fit: "contain",
            background: "#1F1D19",
            src: "/videos/capybara/ask-capy-solution.mp4",
          },
          body: "After applying the AI skill, the output contains data visualizations that make it easier to understand.",
        },
      ],
    },
    {
      id: "brand-identity",
      nav: "Design System",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Design System",
          title: "Brand & Visual Identity",
          body: [
            "Building the brand, visual language, and design system from scratch to give a new product a credible, trustworthy voice.",
          ],
        },
        {
          kind: "pair",
          items: [
            {
              type: "image",
              label: "Design system — light theme",
              aspect: "4640/4016",
              src: "/images/capybara/brand-light.jpg",
            },
            {
              type: "image",
              label: "Design system — dark theme",
              aspect: "4640/4016",
              src: "/images/capybara/brand-dark.jpg",
            },
          ],
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
          items: [
            {
              title: "The system’s logic isn’t the user’s logic.",
              body: "I learned to question designs that feel natural to the system but not to the user.",
            },
            { title: "The best moment to offer help is the moment the question arises." },
          ],
        },
      ],
    },
  ],
};
