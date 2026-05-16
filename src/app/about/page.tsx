import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ambika Home Decor's design ethos and craftsmanship.",
};

export default function AboutPage() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="About"
        description="Ambika Home Decor blends timeless silhouettes, artisanal finishes, and modern sensibilities."
      />
      <div className="rounded-2xl border border-border bg-card p-6 text-foreground/80">
        <p>
          About page placeholder ready for brand story, studio philosophy, and
          team highlights.
        </p>
      </div>
    </section>
  );
}
