import type { CaseStudy } from "./types";

// TEMPLATE — every [bracketed] phrase is a blank to fill with real facts.
// Search this file for "[" to find them all. Don't leave a number in that you can't back up.
// Media with no `src` renders as a labeled placeholder; drop exports into /public and add the path.

export const tapProductPool: CaseStudy = {
  slug: "tap-product-selection-pool",
  title: "TAP Product Selection Pool",
  tagline: "Helping affiliate agencies find the right products and get them to creators, faster.",
  sidebarBlurb: "A product pool for TikTok Shop affiliate agencies, from campaign to creator.",
  hero: {
    type: "image",
    label: "TAP product pool — hero",
    aspect: "16/9",
    src: "/images/tap-1.png",
  },
  meta: [
    { label: "Team", value: ["Yilin Wang (designer)", "1 product manager, 2 engineers"] },
    { label: "Timeline", value: ["4 weeks, 2024", "Shipped August 2024"] },
    { label: "Scope", value: ["User research, feature ideation, information architecture, and interaction and UI design for both product pools"] },
  ],
  sections: [
    // 1. Key metrics ------------------------------------------------------------
    {
      id: "key-metrics",
      nav: "Key Metrics",
      blocks: [
        { kind: "heading", eyebrow: "Key design metrics", title: "What the design moved" },
        {
          kind: "metrics",
          // Keep these word for word with your resume bullet. Add a `link` to point at a section.
          items: [
            {
              label: "Task efficiency",
              value: "40%",
              body: "Improvement in task completion efficiency for agencies.",
            },
            {
              label: "Steps per task",
              value: "−50%",
              body: "Fewer steps per task for agencies, on average.",
            },
            {
              label: "Adoption",
              value: "90%",
              body: "Of agency daily active users use the pools instead of the old Campaign marketplace.",
            },
            {
              label: "Creators reached",
              value: "+18.9%",
              body: "More creators reached out to each week.",
            },
          ],
        },
      ],
    },

    // Problem ---------------------------------------------------------------------
    {
      id: "problem",
      nav: "Problem",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Problem",
          title: "Agency products were split across thousands of campaigns, so affiliate agencies couldn't compare, negotiate, or hand them off easily.",
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "The existing Campaign marketplace: 1,587 open campaigns listed by seller, not by product",
            aspect: "1814/1336",
            src: "/images/tap/campaign-marketplace-before.png",
            fit: "contain",
          },
        },
        {
          kind: "heading",
          small: true,
          title: "The current design: the Campaign marketplace",
          body: [
            "Before this project, agencies had to find products across thousands of campaigns. Product details lived inside each campaign, so to compare products, negotiate commission with a seller, or send a product to a creator, they had to open and join campaigns one by one and keep every detail in their heads.",
          ],
        },
        { kind: "cta", label: "Jump to the solutions", href: "#pool-goals" },
      ],
    },

    // 2. Context ----------------------------------------------------------------
    {
      id: "context",
      nav: "Context",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Context",
          title: "An affiliate agency connects high-quality products with potential creators.",
          body: [
            "TikTok Shop Affiliate Partners (TAP) are agencies that connect sellers with creators and earn commission on every sale. By helping both creators and sellers grow, they ultimately drive GMV for TikTok Shop.",
          ],
        },
        {
          kind: "flow",
          title: "The ecosystem",
          steps: [
            { label: "Seller", detail: "Submits products to campaigns, agrees commission" },
            { label: "Seller side", detail: "Selects products, negotiates commission", group: "Affiliate agency" },
            { label: "Creator side", detail: "Sets creator + agency commission, matches creators", group: "Affiliate agency" },
            { label: "Creator", detail: "Makes the shoppable video or LIVE" },
          ],
        },
      ],
    },

    // 3. Research + persona ---------------------------------------------------------
    // The personas are the research insight. One per side of the agency; each maps to the pool built for them.
    {
      id: "research",
      nav: "Research",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Research",
          title: "Together with the product manager, I talked to 22 people across 4 agencies and shadowed their daily workflow.",
          body: [
            "Sources:",
            [
              "22 agency interviews: 11 seller-side and 11 creator-side employees",
              "Data: the funnel from search to pitch, and drop-off at each step",
            ],
          ],
        },
        {
          kind: "heading",
          small: true,
          title: "Two roles inside one agency, one facing sellers and one facing creators",
        },
        {
          kind: "persona",
          role: "Seller-side employee",
          name: "Jessie",
          avatar: { type: "image", src: "/images/tap/persona-jessie.png", label: "Jessie, seller-side employee", aspect: "1/1" },
          summary:
            "Selects products from every campaign sellers submit, negotiates commission with each seller, then hands the adjusted products to the creator side.",
          columns: [
            {
              title: "Goals",
              items: [
                "Find ideal products to send to creators",
                "Win the agency a higher commission",
              ],
            },
            {
              title: "Pain points",
              items: [
                "Product info is split across thousands of campaigns and hard to compare",
                "Negotiation is long, with unnecessary steps, and multiplies with every extra product",
                "After a resubmit, they have to find the campaign and the product all over again",
                "When someone leaves, their in-progress work is hard to hand over",
              ],
            },
            {
              title: "Decision-making logic · ranked by importance",
              ordered: true,
              items: [
                { label: "Higher commission rate", detail: "What they care about most" },
                { label: "Sales performance", detail: "Is the product already selling?" },
                { label: "Free samples in stock", detail: "Can creators get a sample to try?" },
                { label: "Seller's credit", detail: "Product quality and shopping experience" },
              ],
            },
          ],
        },
        {
          kind: "persona",
          role: "Creator-side employee",
          name: "Ryan",
          avatar: { type: "image", src: "/images/tap/persona-ryan.png", label: "Ryan, creator-side employee", aspect: "1/1" },
          summary:
            "Sets commission rates for creators and the agency, and sends the products the seller side selected to the creators best suited to them.",
          columns: [
            {
              title: "Goals",
              items: [
                "Match products with creators who make high-quality shoppable videos or LIVEs",
                "Win the agency a higher commission",
              ],
            },
            {
              title: "Pain points",
              items: [
                "Hard to find the products the seller side selected",
                "Can't send creators one list of products from different campaigns",
                "Hard to manage shared products and track how they perform",
                "When someone leaves, their work is hard to hand over",
              ],
            },
            {
              title: "Decision-making logic · ranked by importance",
              ordered: true,
              items: [
                { label: "Commission rate for the creator", detail: "What they care about most" },
                {
                  label: "Product price, sample availability, total sales, product rating, seller info, and product status",
                  detail: "How these rank varies by agency: it depends on the industry they work in and what their creators are looking for.",
                },
              ],
            },
          ],
        },
      ],
    },

    // 5. Reframe + high-level solution ------------------------------------------
    {
      id: "reframe",
      nav: "Reframe",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Reframing the problem",
          title:
            "How might we bring products out of thousands of campaigns into one place, where the seller side can compare and negotiate, and the creator side can pick them up, share, and track them?",
        },
        {
          kind: "heading",
          small: true,
          title: "High-level solution: rebuild it as two product pools",
          body: [
            "One pool that gathers products from every campaign so they can be compared and selected, and one for managing what's been selected. The hand-off between them replaces copied links and memory.",
          ],
        },
        {
          kind: "flow",
          steps: [
            { label: "Sellers", detail: "Submit products to campaigns on the platform", icon: "store" },
            { label: "Opportunity Pool", detail: "Every campaign in one place: compare, select", group: "Two pools" },
            { label: "Pick-Up Pool", detail: "Selected products: manage, share, track", group: "Two pools" },
            { label: "Creators", detail: "Make shoppable e-commerce videos and LIVEs", icon: "creator" },
          ],
        },
        {
          kind: "flowToggle",
          views: [
            {
              label: "Before",
              flows: [
                {
                  title: "Seller side: selecting and negotiating one product",
                  variant: "outline",
                  steps: [
                    { label: "Join a campaign, note product details", time: "~10 min" },
                    { label: "Compare with products in other campaigns", time: "~10 min" },
                    { label: "Copy link to seller, negotiate offline" },
                    { label: "Wait for seller to resubmit" },
                    { label: "Find the campaign, then the product, again", time: "~10 min" },
                  ],
                  total: "Comparing many products across many campaigns takes even longer.",
                },
                {
                  title: "Creator side: distributing it",
                  variant: "outline",
                  steps: [
                    { label: "Find each selected product in its campaign", time: "~10 min" },
                    { label: "Set creator + agency commission", time: "~10 min" },
                    { label: "Send to creators one by one", time: "Longer with every product" },
                    { label: "Track performance by hand" },
                  ],
                },
              ],
            },
            {
              label: "After",
              flows: [
                {
                  title: "Seller side, in the Opportunity Pool",
                  variant: "outline",
                  steps: [
                    { label: "Search and filter products from every campaign", time: "~3 min" },
                    { label: "Compare on product cards, with seller and campaign info", time: "~3–5 min" },
                    { label: "Select the product" },
                    { label: "It moves to the Pick-Up Pool automatically" },
                  ],
                },
                {
                  title: "Creator side, in the Pick-Up Pool",
                  variant: "outline",
                  steps: [
                    { label: "Find selected products in one pool", time: "~1 min" },
                    { label: "Compare products", time: "~3–5 min" },
                    { label: "Create a product list", time: "~2 min" },
                    { label: "Share the list with creators", time: "~2 min" },
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "heading",
          small: true,
          title: "How success was measured",
        },
        {
          kind: "cards",
          items: [
            { title: "Time to select and send products", body: "How quickly the seller side finds and selects ideal products, and how quickly the creator side finds selected products in bulk and sends them to creators." },
            { title: "Products shared with creators", body: "How many selected products eventually reach creators." },
            { title: "Commission rate growth", body: "Whether the overall commission rate grew after the pools launched." },
            { title: "Agency feedback", body: "What agencies said about the new workflow after launch." },
          ],
        },
      ],
    },

    // 5b. What each pool is for -------------------------------------------------
    {
      id: "pool-goals",
      nav: "Two pools",
      blocks: [
        {
          kind: "heading",
          eyebrow: "The two pools",
          title: "One pool to find products, one to put them to work",
          body: [
            "Each pool serves one side of the agency, with its own goal.",
          ],
        },
        {
          kind: "pools",
          items: [
            {
              name: "Opportunity Pool",
              user: "the seller side",
              goal: "Help seller-side employees find ideal products and negotiate commission with sellers in the shortest time possible.",
            },
            {
              name: "Pick-Up Pool",
              user: "the creator side",
              goal: "Make getting selected products to the right creators faster and more effective.",
            },
          ],
        },
      ],
    },

    // 5c. Structure and display logic ---------------------------------------------
    {
      id: "structure",
      nav: "Structure",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Structure",
          title: "How the two pools are structured, and which products show up first",
        },
        {
          kind: "carousel",
          label: "Pool",
          compact: true,
          items: [
            {
              title: "Opportunity Pool: a grid for browsing",
              body: "Agencies here are mostly browsing and exploring products, so a grid of cards makes it easier to scan and compare them.",
              note: {
                label: "Display logic",
                body: "Products from ongoing campaigns, with higher commission, and with free samples rise to the top. Unavailable and out-of-stock products sink to the bottom of the pool.",
              },
              media: { type: "image", src: "/images/tap/structure-opportunity-grid.png", label: "Opportunity Product Pool wireframe: products in a grid of cards", aspect: "1/1", fit: "contain", background: "#e7e9e9", padding: "4%" },
            },
            {
              title: "Pick-Up Pool: a list for managing",
              body: "Agencies here are managing products they've already selected, so a list puts each product's details and actions (share, duplicate, delete) in one row.",
              media: { type: "image", src: "/images/tap/structure-pickup-list.png", label: "Pick-up Product Pool wireframe: products in a list with share, duplicate, and delete actions", aspect: "1/1", fit: "contain", background: "#e7e9e9", padding: "4%" },
            },
          ],
        },
      ],
    },

    // 6. Opportunity Pool: design highlights ---------------------------------
    {
      id: "highlight-filters",
      nav: "Filters",
      navGroup: "Opportunity Pool",
      blocks: [
        {
          kind: "highlight",
          number: "01",
          pool: "Opportunity Pool",
          title: "How to make it easier for agencies to find ideal products",
          media: { type: "video", src: "/videos/tap/filters-flow.mp4", label: "Filters: first level and advanced filters", aspect: "16/9", autoplay: true },
          body: [
            "The filters agencies use most sit on the first level, so most searches take a single click. Anything more specific lives behind Advanced filters, for when a search needs to be precise.",
          ],
          metric: {
            value: "90.4%",
            label: "of daily active users used these 6 filters to find ideal products",
            quote: "The filters literally saved my life! It's so much easier to find the products now.",
          },
        },
      ],
    },
    {
      id: "highlight-card",
      nav: "Product card",
      navGroup: "Opportunity Pool",
      blocks: [
        {
          kind: "highlight",
          number: "02",
          pool: "Opportunity Pool",
          title: "How to make it easier and quicker for agencies to compare products",
          media: { type: "video", src: "/videos/tap/product-hover-flow.mp4", label: "Product card: hover to see more information", aspect: "16/9", autoplay: true },
          body: [
            "Based on the insights from user research, I categorized all the information agencies need according to their decision logic, then chose what earns a place on the card's first level and what waits on the second.",
          ],
        },
      ],
    },
    // 7. Pick-Up Pool: design highlights --------------------------------------
    {
      id: "highlight-metrics",
      nav: "Custom metrics",
      navGroup: "Pick-Up Pool",
      blocks: [
        {
          kind: "highlight",
          number: "03",
          pool: "Pick-Up Pool",
          title: "How to help agencies compare products on the metrics they care about and find the right one",
          media: { type: "video", src: "/videos/tap/customize-metrics-flow.mp4", label: "Pick-Up Pool: customizing metrics", aspect: "16/9", autoplay: true },
          body: [
            "Research showed that, after commission, what agencies look for depends on the industry they work in and what their creators want. So instead of fixing which product metrics appear, the Pick-Up Pool lets each agency choose the ones that matter to them.",
          ],
        },
      ],
    },
    {
      id: "highlight-commission",
      nav: "Bulk commission",
      navGroup: "Pick-Up Pool",
      blocks: [
        {
          kind: "highlight",
          number: "04",
          pool: "Pick-Up Pool",
          title: "How to make it easier for agencies to set up commission for multiple products",
          media: { type: "video", src: "/videos/tap/bulk-commission-setup.mp4", label: "Pick-Up Pool: setting up commission in bulk", aspect: "16/9", autoplay: true },
          body: [
            "Before, the creator side set the creator and agency commission for each product one by one. Now they can select several products and set commission for all of them at once.",
          ],
          metric: { value: "−20%", label: "Time spent on creator outreach" },
        },
        {
          kind: "note",
          label: "More on the process",
          body: "Each of these went through several rounds of exploration. I’m happy to walk through the options I tried, and why I landed here, in a conversation.",
        },
      ],
    },
  ],
};
