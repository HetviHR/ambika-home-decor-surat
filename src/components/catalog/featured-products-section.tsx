import Link from "next/link";
import { featuredProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/product-card";
import { SectionHeader } from "@/components/ui/section-header";

export function FeaturedProductsSection() {
  const items = featuredProducts.slice(0, 8);

  return (
    <section className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="Featured"
          title="Pieces we love right now"
          description="Hand-selected from our Bardoli showrooms — tap any piece to view details, materials, and send a private inquiry."
        />
        <Link
          href="/collection"
          className="shrink-0 self-start rounded-full border border-dark px-6 py-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.22em] text-dark transition-colors hover:border-accent hover:text-accent sm:self-auto"
        >
          View catalogue
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </section>
  );
}
