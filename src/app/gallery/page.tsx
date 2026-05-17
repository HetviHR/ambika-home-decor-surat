import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getFeaturedProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Visual inspiration from Ambica Home Decor — curated product styling across our showroom collections.",
};

function GalleryFallback() {
  return (
    <div className="space-y-14 pb-8">
      <div className="h-24 animate-pulse rounded-2xl bg-cream" />
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>div]:mb-5 [&>div]:break-inside-avoid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-cream" />
        ))}
      </div>
    </div>
  );
}

async function GalleryContent() {
  const items = await getFeaturedProducts(12);

  return (
    <div className="space-y-14 pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="Gallery"
          title="Editorial compositions from our showroom"
          description="Tap any piece to view full details, materials, and send a private inquiry — no cart, just curated conversation."
        />
        <Link
          href="/collection"
          className="shrink-0 self-start rounded-full border border-dark px-6 py-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.22em] text-dark transition-colors hover:border-accent hover:text-accent"
        >
          Full catalogue
        </Link>
      </div>
      {items.length > 0 ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>article]:mb-5 [&>article]:break-inside-avoid">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-border bg-cream/40 p-8 text-center font-sans text-sm text-dark/60">
          No gallery pieces are available right now.
        </p>
      )}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryContent />
    </Suspense>
  );
}
