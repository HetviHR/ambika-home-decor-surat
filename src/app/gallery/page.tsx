import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Visual inspiration from our handcrafted luxury home decor compositions.",
};

export default function GalleryPage() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Gallery"
        description="Grid placeholders for editorial room styling shots, before/after stories, and featured installations."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={`gallery-${index}`}
            className="aspect-[4/3] rounded-2xl border border-border bg-muted"
          />
        ))}
      </div>
    </section>
  );
}
