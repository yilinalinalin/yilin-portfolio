import type { CaseStudy } from "./types";
import { liveDiagnosis } from "./live-diagnosis";
import { capybaraAi } from "./capybara-ai";
import { tapProductPool } from "./tap-product-pool";
import { datasense } from "./datasense";

// Add new case studies here, keyed by the project slug in site.ts.
export const caseStudies: Record<string, CaseStudy> = {
  [liveDiagnosis.slug]: liveDiagnosis,
  [capybaraAi.slug]: capybaraAi,
  [tapProductPool.slug]: tapProductPool,
  [datasense.slug]: datasense,
};
