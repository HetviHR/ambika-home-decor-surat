export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  material: string;
  dimensions: string;
  featured: boolean;
  images: string[];
  folder: string;
  style: string;
  price: number | null;
  tags: string[];
  whatsappNumber: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
};

export type SortOption = "featured" | "name-asc" | "name-desc" | "category";

export type ProductFilters = {
  search: string;
  category: string | null;
  material: string | null;
  style: string | null;
  sort: SortOption;
};
