import { products as localProducts } from "@/data/products";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";
import type { Product, ProductFilters, SortOption } from "@/types/product";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];
type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];

const productSelect =
  "id, slug, name, category, category_slug, description, material, dimensions, featured, images, folder, style, price, tags, whatsapp_number, created_at, updated_at";
const inquirySelect =
  "id, product_id, product_slug, name, phone, email, message, status, source, created_at, updated_at";

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categorySlug: row.category_slug,
    description: row.description,
    material: row.material,
    dimensions: row.dimensions,
    featured: row.featured,
    images: row.images,
    folder: row.folder,
    style: row.style,
    price: row.price === null ? null : Number(row.price),
    tags: row.tags,
    whatsappNumber: row.whatsapp_number,
  };
}

function mapInquiry(row: InquiryRow) {
  return row;
}

function ensureSlug(slug: string) {
  const value = slug.trim();
  if (!value) {
    throw new Error("Product slug is required.");
  }
  return value;
}

function hasSupabaseCredentials() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function ensureSupabaseError(action: string, message: string) {
  throw new Error(`Unable to ${action}: ${message}`);
}

async function queryProducts(
  query: (supabase: ReturnType<typeof getSupabaseClient>) => Promise<{
    data: ProductRow[] | null;
    error: { message: string } | null;
  }>,
) {
  const supabase = getSupabaseClient();
  const { data, error } = await query(supabase);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}

export async function getProducts(): Promise<Product[]> {
  if (!hasSupabaseCredentials()) {
    return sortProducts([...localProducts], "featured");
  }

  return queryProducts(async (supabase) =>
    supabase
      .from("products")
      .select(productSelect)
      .order("featured", { ascending: false })
      .order("name", { ascending: true }),
  ).catch((error: unknown) => {
    if (error instanceof Error) {
      ensureSupabaseError("load products", error.message);
    }
    throw error;
  });
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  if (!hasSupabaseCredentials()) {
    return [...localProducts]
      .filter((product) => product.featured)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, limit);
  }

  return queryProducts(async (supabase) =>
    supabase
      .from("products")
      .select(productSelect)
      .eq("featured", true)
      .order("name", { ascending: true })
      .limit(limit),
  ).catch((error: unknown) => {
    if (error instanceof Error) {
      ensureSupabaseError("load featured products", error.message);
    }
    throw error;
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const normalizedSlug = ensureSlug(slug);

  if (!hasSupabaseCredentials()) {
    return localProducts.find((product) => product.slug === normalizedSlug) ?? null;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", normalizedSlug)
    .maybeSingle();

  if (error) {
    ensureSupabaseError(`load product "${normalizedSlug}"`, error.message);
  }

  return data ? mapProduct(data) : null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!hasSupabaseCredentials()) {
    return [...localProducts]
      .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
      .sort((a, b) => {
        const featuredDiff = Number(b.featured) - Number(a.featured);
        return featuredDiff || a.name.localeCompare(b.name);
      })
      .slice(0, limit);
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("category_slug", product.categorySlug)
    .neq("id", product.id)
    .order("featured", { ascending: false })
    .order("name", { ascending: true })
    .limit(limit);

  if (error) {
    ensureSupabaseError(`load related products for "${product.slug}"`, error.message);
  }

  return (data ?? []).map(mapProduct);
}

export type CreateInquiryInput = {
  productId?: string | null;
  productSlug?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  message: string;
  source?: string;
};

export async function createInquiry(input: CreateInquiryInput): Promise<InquiryRow> {
  const name = input.name.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name) {
    throw new Error("Inquiry name is required.");
  }
  if (!phone) {
    throw new Error("Inquiry phone is required.");
  }
  if (!message) {
    throw new Error("Inquiry message is required.");
  }

  const payload: InquiryInsert = {
    product_id: input.productId ?? null,
    product_slug: input.productSlug ?? null,
    name,
    phone,
    email: input.email?.trim() ? input.email.trim() : null,
    message,
    source: input.source ?? "website",
  };

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("inquiries")
    .insert(payload)
    .select(inquirySelect)
    .single();

  if (error) {
    ensureSupabaseError("create inquiry", error.message);
  }

  return mapInquiry(data);
}

export function getProductCategories(items: Product[]) {
  const seen = new Map<string, string>();

  for (const item of items) {
    if (!seen.has(item.categorySlug)) {
      seen.set(item.categorySlug, item.category);
    }
  }

  return Array.from(seen, ([slug, name]) => ({ slug, name }));
}

export function getFilterOptions(items: Product[]) {
  const materials = [...new Set(items.map((item) => item.material))].sort();
  const styles = [...new Set(items.map((item) => item.style))].sort();
  const categories = getProductCategories(items);
  return { materials, styles, categories };
}

export function filterProducts(items: Product[], filters: ProductFilters): Product[] {
  let result = [...items];
  const q = filters.search.trim().toLowerCase();

  if (q) {
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.material.toLowerCase().includes(q) ||
        item.style.toLowerCase().includes(q),
    );
  }

  if (filters.category) {
    result = result.filter((item) => item.categorySlug === filters.category);
  }

  if (filters.material) {
    result = result.filter((item) => item.material === filters.material);
  }

  if (filters.style) {
    result = result.filter((item) => item.style === filters.style);
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
      return copy.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    case "featured":
    default:
      return copy.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
      );
  }
}

export function buildWhatsAppUrl(product: Product, message?: string): string {
  const text =
    message ??
    `Hello Ambica Home Decor, I would like to inquire about: ${product.name} (${product.category}).`;
  return `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
