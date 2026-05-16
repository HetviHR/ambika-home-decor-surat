"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/catalog";

export function ProductCard({
  product,
  onPreview,
  priority = false,
}: {
  product: Product;
  onPreview?: (image: string, name: string) => void;
  priority?: boolean;
}) {
  const href = `/collection/${product.slug}`;
  const whatsapp = buildWhatsAppUrl(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream/50 shadow-soft transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:shadow-luxury">
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
        {onPreview ? (
          <button
            type="button"
            onClick={() => onPreview(product.images[0], product.name)}
            className="absolute right-3 top-3 z-20 rounded-full border border-cream/40 bg-background/80 px-3 py-1.5 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-dark opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            Preview
          </button>
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.26em] text-cream/85">
            {product.category}
          </p>
          <h3 className="mt-1.5 line-clamp-2 font-display text-lg leading-snug text-cream sm:text-xl">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <p className="line-clamp-2 font-sans text-sm leading-relaxed text-dark/70">
          {product.description}
        </p>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Link
            href={href}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-dark bg-dark px-4 py-2.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:border-accent hover:bg-accent"
          >
            Inquiry
          </Link>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-dark transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
