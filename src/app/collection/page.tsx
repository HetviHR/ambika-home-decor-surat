import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Collection",
  description: "Explore curated luxury decor collections crafted for refined spaces.",
};

const collectionCategories = ["Living", "Bedroom", "Dining", "Accent Decor"];

export default function CollectionPage() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Collection"
        description="A scalable collection page structure for curated product families and editorial lookbooks."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collectionCategories.map((category) => (
          <article
            key={category}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="font-display text-2xl">{category}</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Showcase placeholder for premium {category.toLowerCase()} range.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
