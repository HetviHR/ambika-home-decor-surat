"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, SortOption } from "@/types/product";
import { filterProducts, getFilterOptions } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/product-card";
import { ImageLightbox } from "@/components/catalog/image-lightbox";
import { SectionHeader } from "@/components/ui/section-header";

const PAGE_SIZE = 12;

export function CollectionBrowser({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [material, setMaterial] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  const { materials, styles, categories } = useMemo(() => getFilterOptions(products), [products]);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        search,
        category,
        material,
        style,
        sort,
      }),
    [products, search, category, material, style, sort],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, material, style, sort]);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const clearFilters = () => {
    setSearch("");
    setCategory(null);
    setMaterial(null);
    setStyle(null);
    setSort("featured");
  };

  return (
    <div className="space-y-10 pb-12">
      <SectionHeader
        eyebrow="The Collection"
        title="A catalogue of considered home essentials"
        description={`Browse ${products.length} curated pieces across ${categories.length} categories — filter by room, material, or style for an editorial shopping experience.`}
      />

      <div className="space-y-6 rounded-2xl border border-border bg-cream/40 p-5 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <label className="flex-1">
            <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.22em] text-accent">
              Search
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, material, style…"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-sans text-sm text-dark outline-none transition-colors focus:border-accent"
            />
          </label>
          <label className="w-full lg:w-48">
            <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.22em] text-accent">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-sans text-sm text-dark outline-none focus:border-accent"
            >
              <option value="featured">Featured first</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="category">By category</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip active={!category} onClick={() => setCategory(null)} label="All" />
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              active={category === c.slug}
              onClick={() => setCategory(category === c.slug ? null : c.slug)}
              label={c.name}
            />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.22em] text-accent">
              Material
            </span>
            <select
              value={material ?? ""}
              onChange={(e) => setMaterial(e.target.value || null)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-sans text-sm text-dark outline-none focus:border-accent"
            >
              <option value="">All materials</option>
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.22em] text-accent">
              Style
            </span>
            <select
              value={style ?? ""}
              onChange={(e) => setStyle(e.target.value || null)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-sans text-sm text-dark outline-none focus:border-accent"
            >
              <option value="">All styles</option>
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="font-sans text-sm text-dark/65">
            Showing {visible.length} of {filtered.length} pieces
          </p>
          {(search || category || material || style || sort !== "featured") && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center font-sans text-dark/60">
          No catalogue items are available right now.
        </p>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center font-sans text-dark/60">
          No pieces match your filters. Try adjusting search or categories.
        </p>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 xl:columns-3 [&>article]:mb-5 [&>article]:break-inside-avoid">
          {visible.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
              onPreview={(src, alt) => setPreview({ src, alt })}
            />
          ))}
        </div>
      )}

      {hasMore ? (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full border border-border bg-cream px-8 py-3 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-dark transition-colors hover:border-accent"
          >
            Load more
          </button>
        </div>
      ) : null}

      {preview ? (
        <ImageLightbox src={preview.src} alt={preview.alt} onClose={() => setPreview(null)} />
      ) : null}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-sans text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
        active
          ? "border-dark bg-dark text-background"
          : "border-border bg-background text-dark/75 hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
