import { PageReveal } from "@/components/PageTransition";

// Next re-mounts a template on every navigation, which lets each new page play its entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageReveal>{children}</PageReveal>;
}
