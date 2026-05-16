import { products, featuredProducts, productCategories } from "@/data/products";
import type { Product, ProductFilters, SortOption } from "@/types/product";

export { products, featuredProducts, productCategories };

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function getFilterOptions() {
  const materials = [...new Set(products.map((p) => p.material))].sort();
  const styles = [...new Set(products.map((p) => p.style))].sort();
  return { materials, styles, categories: productCategories };
}

export function filterProducts(filters: ProductFilters): Product[] {
  let result = [...products];
  const q = filters.search.trim().toLowerCase();

  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.material.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q),
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.categorySlug === filters.category);
  }

  if (filters.material) {
    result = result.filter((p) => p.material === filters.material);
  }

  if (filters.style) {
    result = result.filter((p) => p.style === filters.style);
  }

  return sortProducts(result, filters.sort);
}

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const copy = [...items];
  switch (sort) {
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "category":
      return copy.sort(
        (a, b) =>
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
      );
    case "featured":
    default:
      return copy.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
      );
  }
}

export function buildWhatsAppUrl(product: Product, message?: string): string {
  const text =
    message ??
    `Hello Ambica Home Decor, I would like to inquire about: ${product.name} (${product.category}).`;
  return `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
