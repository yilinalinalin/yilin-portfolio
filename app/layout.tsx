import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/Nav";
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
          <Nav />
          {/* Room for the dock: left edge on desktop, bottom on phones. */}
          <div className="overflow-x-clip pb-[84px] md:pb-0 md:pl-[72px]">{children}</div>
        </PageTransitionProvider>
        {/* Vercel Web Analytics: cookie-free page views, shown in the project's Analytics tab */}
        <Analytics />
      </body>
    </html>
  );
}
