"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import type { Database } from "@/types/database";
import { saveProductAction } from "@/app/admin/dashboard/actions";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

interface ProductFormProps {
  product?: ProductRow;
}

export function ProductForm({ product }: ProductFormProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>(product?.images ?? []);
  const [error, formAction, isPending] = useActionState(saveProductAction, null);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.currentTarget.files ?? []);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  }

  function removeImage(index: number) {
    setPreviewUrls((prev) => {
      const newUrls = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index]);
      return newUrls;
    });
  }

  function removeExistingImage(index: number) {
    setPreviewUrls((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      return filtered;
    });
  }

  const existingCount = product?.images.length ?? 0;

  return (
    <form action={formAction} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error instanceof Error ? error.message : String(error)}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="block text-sm font-medium text-dark">Name *</span>
          <input
            required
            type="text"
            name="name"
            defaultValue={product?.name}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-dark">Slug</span>
          <input
            type="text"
            name="slug"
            placeholder="auto-generated from name"
            defaultValue={product?.slug}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="block text-sm font-medium text-dark">Category *</span>
          <input
            required
            type="text"
            name="category"
            defaultValue={product?.category}
            placeholder="e.g., Sofas, Mattresses"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-dark">Material *</span>
          <input
            required
            type="text"
            name="material"
            defaultValue={product?.material}
            placeholder="e.g., Memory Foam, Velvet"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="block text-sm font-medium text-dark">Style *</span>
          <input
            required
            type="text"
            name="style"
            defaultValue={product?.style}
            placeholder="e.g., Modern, Classic"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-dark">Dimensions *</span>
          <input
            required
            type="text"
            name="dimensions"
            defaultValue={product?.dimensions}
            placeholder="e.g., 6′ × 8′ sectional"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>

      <label>
        <span className="block text-sm font-medium text-dark">Description *</span>
        <textarea
          required
          name="description"
          rows={3}
          defaultValue={product?.description}
          className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="block text-sm font-medium text-dark">Price (optional)</span>
          <input
            type="number"
            name="price"
            step="0.01"
            defaultValue={product?.price ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-dark">Folder</span>
          <input
            type="text"
            name="folder"
            placeholder="optional folder path"
            defaultValue={product?.folder}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>

      <label>
        <span className="block text-sm font-medium text-dark">WhatsApp Number *</span>
        <input
          required
          type="tel"
          name="whatsapp_number"
          placeholder="919081622516"
          defaultValue={product?.whatsapp_number}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={product?.featured}
          className="rounded border-border"
        />
        <span className="text-sm font-medium text-dark">Featured product</span>
      </label>

      <label>
        <span className="block text-sm font-medium text-dark">Tags (comma or line separated)</span>
        <textarea
          name="tags"
          rows={2}
          placeholder="tag1, tag2, tag3"
          defaultValue={product?.tags.join(",\n")}
          className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </label>

      <div>
        <span className="block text-sm font-medium text-dark">Product Images *</span>
        <input
          type="hidden"
          name="existing_image_urls"
          value={previewUrls.slice(0, existingCount).join("\n")}
        />

        {previewUrls.length > 0 && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-cream">
                <Image src={url} alt="preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => (idx < existingCount ? removeExistingImage(idx) : removeImage(idx - existingCount))}
                  className="absolute right-1 top-1 rounded bg-dark/80 px-2 py-1 text-xs text-background hover:bg-dark"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="mt-3 block cursor-pointer rounded-lg border-2 border-dashed border-border bg-cream/30 p-4 text-center transition-colors hover:border-accent hover:bg-cream/50">
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <span className="block text-sm font-medium text-dark">Click to upload or drag and drop</span>
          <span className="block text-xs text-dark/60">PNG, JPG, WebP</span>
        </label>
      </div>

      <label>
        <span className="block text-sm font-medium text-dark">Image URLs (one per line, optional)</span>
        <textarea
          name="image_urls"
          rows={3}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono outline-none focus:border-accent"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-dark px-4 py-2.5 font-medium text-background transition-colors hover:bg-accent disabled:opacity-60"
      >
        {isPending ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
