import Image from "next/image";
import Link from "next/link";
import { productCategories, products } from "@/data/products";
import { SectionHeader } from "@/components/ui/section-header";

function getCategoryImage(slug: string) {
  const match = products.find((p) => p.categorySlug === slug);
  return match?.images[0] ?? "/images/hero-interior.png";
}

export function CategoriesSection() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Shop by room"
        title="Explore every category"
        description="From bath accessories and curtains to mattresses, sofas, and wallpapers — each collection is curated for quiet luxury."
        align="center"
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {productCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/collection?category=${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-cream/50 shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:shadow-luxury"
          >
            <div className="relative aspect-[5/4] overflow-hidden bg-background">
              <Image
                src={getCategoryImage(cat.slug)}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/65 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg leading-snug text-cream">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
