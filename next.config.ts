import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old Framer site's page addresses, sent to their pages on this site so existing links keep working.
  async redirects() {
    return [
      { source: "/live-diagnosis", destination: "/work/live-diagnosis", permanent: true },
      { source: "/capy", destination: "/work/capybara-ai", permanent: true },
      { source: "/tap", destination: "/work/tap-product-selection-pool", permanent: true },
      { source: "/datasense", destination: "/work/datasense", permanent: true },
      // Alerts Center (Phia) has no case study yet, so its old page goes to the homepage.
      { source: "/phia", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
