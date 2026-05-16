import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { ProductInquiryForm } from "@/components/catalog/product-inquiry-form";
import { ProductCard } from "@/components/catalog/product-card";
import { buildWhatsAppUrl, getProductBySlug, getRelatedProducts, products } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const whatsapp = buildWhatsAppUrl(product);

  return (
    <article className="space-y-16 pb-16">
      <Link
        href="/collection"
        className="inline-flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-accent transition-colors hover:text-dark"
      >
        ← Back to collection
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col">
          <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.32em] text-accent">
            {product.category}
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-dark sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>
          <p className="mt-6 font-sans text-base leading-relaxed text-dark/75">
            {product.description}
          </p>

          <dl className="mt-8 grid gap-4 border-y border-border py-8 sm:grid-cols-2">
            <div>
              <dt className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/50">
                Material
              </dt>
              <dd className="mt-1 font-sans text-sm text-dark">{product.material}</dd>
            </div>
            <div>
              <dt className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/50">
                Dimensions
              </dt>
              <dd className="mt-1 font-sans text-sm text-dark">{product.dimensions}</dd>
            </div>
            <div>
              <dt className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/50">
                Style
              </dt>
              <dd className="mt-1 font-sans text-sm text-dark">{product.style}</dd>
            </div>
            <div>
              <dt className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/50">
                Availability
              </dt>
              <dd className="mt-1 font-sans text-sm text-dark">Showroom inquiry</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-col gap-3 sm:flex-row">
            <a
              href="#inquiry"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-dark bg-dark px-6 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-background transition-colors hover:border-accent hover:bg-accent"
            >
              Send inquiry
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-cream px-6 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-dark transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <ProductInquiryForm product={product} />

      {related.length > 0 ? (
        <section className="space-y-8 border-t border-border pt-12">
          <h2 className="font-display text-2xl text-dark sm:text-3xl">Related pieces</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
