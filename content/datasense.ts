import type { CaseStudy } from "./types";

// Hackathon project, rebuilt from the DataSense page on the old Framer site.
// Linked from the homepage's "Recent Recognitions"; kept out of the Selected Projects grid.

export const datasense: CaseStudy = {
  slug: "datasense",
  title: "DataSense",
  tagline: "Faster bulk data entry and more accurate entity matching, pitched in 24 hours.",
  sidebarBlurb: "NYU Product Management Competition, sponsored by PitchBook Data. 3rd Prize.",
  hero: {
    type: "image",
    label: "DataSense data upload dashboard, with PitchBook and NYU logos",
    aspect: "2400/1350",
    fit: "contain",
    background: "#4c6971",
    src: "/images/datasense/hero.png",
  },
  meta: [
    { label: "Recognition", value: ["3rd Prize", "NYU Product Management Competition"] },
    { label: "Timeline", value: ["24-hour hackathon, 2024"] },
    { label: "Team", value: ["Yilin Wang", "3 other NYU students"] },
  ],
  sections: [
    {
      id: "overview",
      nav: "Overview",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Overview",
          title: "A product pitch for PitchBook Data, built from a prompt in 24 hours.",
          body: [
            "In 2024, I took part in the NYU Product Management Competition, sponsored by PitchBook Data, alongside three other students. The competition followed a hackathon format: we had 24 hours to develop a pitch based on a given prompt.",
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
          eyebrow: "The Problem",
          title:
            "Create a feature (or features) that streamlines bulk data entry and improves the accuracy of entity matching.",
          body: ["The tool should save users time and ensure quick access to high-quality data."],
        },
      ],
    },
    {
      id: "persona",
      nav: "Who it's for",
      navGroup: "Our Pitch",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Our Pitch",
          title: "Designing for Sarah, a small-business owner who enters her financial data by hand.",
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "Persona: Sarah owns a small jewelry business in New York and enters her sales and expenses manually",
            aspect: "2400/1350",
    fit: "contain",
    background: "#4c6971",
            src: "/images/datasense/persona-sarah.png",
          },
        },
      ],
    },
    {
      id: "bulk-upload",
      nav: "Bulk upload",
      navGroup: "Our Pitch",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Feature 1",
          title: "Guided bulk data upload",
          body: ["Users can upload multiple large databases at once by dragging and dropping them in."],
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "Data upload: drag and drop several files, with upload progress for each",
            aspect: "2400/1350",
    fit: "contain",
    background: "#4c6971",
            src: "/images/datasense/bulk-upload.png",
          },
        },
      ],
    },
    {
      id: "cleaning-matching",
      nav: "Cleaning & matching",
      navGroup: "Our Pitch",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Feature 2",
          title: "Automated data cleaning and matching",
          body: [
            "By standardizing data formats and automatically correcting common errors, the platform saves users from doing these tasks by hand. It also matches entities such as customer records, product information, and financial data automatically, reducing errors and keeping data consistent.",
          ],
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "Matching data types and validating records, with suggested fixes for each error",
            aspect: "2400/1350",
    fit: "contain",
    background: "#4c6971",
            src: "/images/datasense/cleaning-matching-1.png",
          },
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "Entity matching confidence breakdown and upload progress",
            aspect: "2400/1350",
    fit: "contain",
    background: "#4c6971",
            src: "/images/datasense/cleaning-matching-2.png",
          },
        },
      ],
    },
    {
      id: "user-validation",
      nav: "User validation",
      navGroup: "Our Pitch",
      blocks: [
        {
          kind: "heading",
          eyebrow: "Feature 3",
          title: "User validation",
          body: [
            "Data errors and low-confidence matches are flagged while the data is being uploaded, so users can fix them in the moment and the process stays accurate and efficient.",
            "Feedback from user validation goes back to the algorithm, improving its accuracy over time.",
          ],
        },
        {
          kind: "media",
          media: {
            type: "image",
            label: "Customer account table with an error details panel to accept or ignore each suggestion",
            aspect: "2400/1350",
    fit: "contain",
    background: "#4c6971",
            src: "/images/datasense/user-validation.png",
          },
        },
      ],
    },
  ],
};
