import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { PageTransitionProvider } from "@/components/PageTransition";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas">
        <PageTransitionProvider>
          <div className="overflow-x-clip">{children}</div>
          <Footer />
        </PageTransitionProvider>
        {/* Vercel Web Analytics: cookie-free page views, shown in the project's Analytics tab */}
        <Analytics />
      </body>
    </html>
  );
}
