// Content for the dock's "Podcasts" app.

export type Podcast = {
  /** Episode title. */
  title: string;
  /** Short show name, shown above the title. */
  show: string;
  url: string;
  /** Square artwork in /public/images/podcasts/. */
  cover: string;
  /** Card background, picked to sit with the artwork. */
  color: string;
  date: string;
  /** Running time for episodes; leave out for written pieces, which show "Read" instead. */
  duration?: string;
  description?: string;
};

export const podcasts: Podcast[] = [
  {
    title: "#175 AI Made Designers Faster. So Why Aren't We Happier?",
    show: "Future of UX",
    url: "https://podcasts.apple.com/us/podcast/future-of-ux-your-design-tech-and-user/id1480706373?i=1000800040226",
    cover: "/images/podcasts/future-of-ux.jpg",
    color: "#b4552a",
    date: "Nov 5",
    duration: "23m",
    description: "Nielsen Norman Group asked 521 UX practitioners how AI is changing their work.",
  },
  {
    title: "101. 离开职场快车道，我决定重新设计一间教室：一个设计师的职业转向（重访 Joyce 刘珺婕）",
    show: "UX Coffee 设计咖",
    url: "https://podcasts.apple.com/us/podcast/ux-coffee-%E8%AE%BE%E8%AE%A1%E5%92%96/id1099551615?i=1000799990595",
    cover: "/images/podcasts/ux-coffee.jpg",
    color: "#3d3b36",
    date: "Nov 5",
    duration: "1h 11m",
    description: "UX Coffee 是一档和设计师、创作者聊天的播客节目。",
  },
  {
    title: "Why PMs are suddenly valuable again | Tulsee Doshi (Head of Product, Gemini)",
    show: "Lenny's Podcast",
    url: "https://podcasts.apple.com/us/podcast/lennys-podcast-product-career-growth/id1627920305?i=1000800565224",
    cover: "/images/podcasts/lennys-podcast.jpg",
    color: "#9a6446",
    date: "Nov 8",
    duration: "59m",
    description: "Tulsee Doshi leads product for Google's frontier AI models, including Gemini.",
  },
  {
    title: "In Conversation: Dylan Field and David Friedberg on the Human Role in Creating with AI",
    show: "Figma Blog",
    url: "https://www.figma.com/blog/in-conversation-dylan-field-and-david-friedberg/",
    cover: "/images/podcasts/figma-shortcut.jpg",
    color: "#2b2b30",
    date: "Nov 6",
    description: "On why design is the new code, shaping AI's creative output, and the human judgment behind what we make.",
  },
  {
    title: "The New UX Skill Nobody Taught Us: Designing for AI Mistakes",
    show: "Muzli · Sowjanya Pichikala",
    url: "https://medium.muz.li/aithe-new-ux-skill-nobody-taught-us-designing-for-ai-mistakes-a99a203ae5ee",
    cover: "/images/podcasts/muzli-designing-for-ai-mistakes.jpg",
    color: "#5d4c93",
    date: "Nov 9",
    description: "AI won't always get it right, so UX has to design for failure, not just the perfect experience.",
  },
];
