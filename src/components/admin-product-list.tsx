"use client";

import Image from "next/image";
import { useActionState } from "react";
import type { Product } from "@/types/product";
import { deleteProductAction } from "@/app/admin/dashboard/actions";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const [, formAction, isPending] = useActionState(deleteProductAction, null);

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-cream/40 p-8 text-center">
        <p className="text-sm text-dark/60">No products yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <article key={product.id} className="flex flex-col gap-3 rounded-lg border border-border bg-cream/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3 sm:flex-1">
            {product.images[0] && (
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-border">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-dark">{product.name}</h3>
              <p className="text-xs text-dark/60">{product.category}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <form action={formAction} className="contents">
              <input type="hidden" name="id" value={product.id} />
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-60"
              >
                Delete
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
