import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionBrowser } from "@/components/catalog/collection-browser";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Browse our luxury home decor catalogue — filter by category, material, and style. Bath accessories, curtains, mattresses, sofas, wallpapers, and more.",
};

function CollectionFallback() {
  return (
    <div className="space-y-8 pb-12">
      <div className="h-32 animate-pulse rounded-2xl bg-cream" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-cream" />
        ))}
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<CollectionFallback />}>
      <CollectionBrowser />
    </Suspense>
  );
}
