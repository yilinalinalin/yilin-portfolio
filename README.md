# Yilin Wang — Portfolio

Next.js 15 · Tailwind CSS 4 · Framer Motion · Montaga + Inter

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

| What | File |
| --- | --- |
| Nav links, homepage project list | `content/site.ts` |
| LIVE Diagnosis case study text + media | `content/live-diagnosis.ts` |
| Register a new case study | `content/case-studies.ts` |
| Colors, fonts | `app/globals.css` (the `@theme` block) |
| Homepage layout | `app/page.tsx` |
| Case study layout | `app/work/[slug]/page.tsx` |
| Images / videos | `public/images`, `public/videos` |

### Swapping a placeholder for your real image or video

Every gray box with a dashed label is a placeholder. Export the asset, drop it in `public/`, and add `src`:

```ts
{ type: "video", src: "/videos/live/direction-1.mp4", label: "Direction 1 — LIVE Pulse walkthrough", aspect: "580/440" }
```

The `label` becomes the alt text once the real file is in.

### Adding a new case study

1. Copy `content/live-diagnosis.ts` to e.g. `content/capybara-ai.ts` and edit it.
2. Add it to `content/case-studies.ts`.

Projects in `site.ts` without a case study file show a "case study in progress" page.

## Deploy to Vercel + connect your domain

1. Push this folder to a GitHub repo.
2. At vercel.com → **Add New → Project**, import the repo. Defaults are fine. Deploy.
3. In the Vercel project → **Settings → Domains**, add your domain. Vercel shows the DNS records to set.
4. At your domain registrar, replace the Framer DNS records with Vercel's.
5. Once the Vercel site loads on your domain, remove the domain from the Framer project.
