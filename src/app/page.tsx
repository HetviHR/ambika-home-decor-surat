import { HeroPlaceholder } from "@/components/sections/hero-placeholder";
import { SectionHeader } from "@/components/ui/section-header";

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroPlaceholder />
      <section className="space-y-6 rounded-3xl border border-border bg-card p-8 sm:p-10">
        <SectionHeader
          title="Bespoke Interiors, Thoughtful Details"
          description="Homepage structure ready for featured collections, testimonials, and artisan process storytelling."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Signature Pieces", "Seasonal Edit", "Custom Styling"].map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-border bg-background p-5"
            >
              <h3 className="font-display text-xl">{item}</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Content placeholder for future visual and editorial modules.
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
