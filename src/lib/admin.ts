import { randomUUID } from "crypto";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getProducts } from "@/lib/catalog";
import type { Database } from "@/types/database";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];

const inquirySelect =
  "id, product_id, product_slug, name, phone, email, message, status, source, created_at, updated_at";
const productImageBucket = "product-images";

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseList(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = getOptionalString(formData, key);
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`${key} must be a valid number.`);
  }

  return parsed;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function normalizeImages(images: string[]) {
  return [...new Set(images.map((image) => image.trim()).filter(Boolean))];
}

function parsePublicStoragePath(url: string) {
  const marker = `/storage/v1/object/public/${productImageBucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) {
    return null;
  }

  return decodeURIComponent(url.slice(index + marker.length));
}

async function uploadProductImage(slug: string, file: File) {
  const supabase = getSupabaseClient();
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "";
  const safeName = slugify(file.name.replace(/\.[^/.]+$/, "")) || "image";
  const timestamp = Date.now();
  const uuid = randomUUID();
  const objectPath = `${slug}/${timestamp}-${uuid}-${safeName}${extension ? `.${extension}` : ""}`;
  const bytes = await file.arrayBuffer();

  const { error } = await supabase.storage.from(productImageBucket).upload(objectPath, Buffer.from(bytes), {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(`Unable to upload ${file.name}: ${error.message}`);
  }

  const { data } = supabase.storage.from(productImageBucket).getPublicUrl(objectPath);
  return data.publicUrl;
}

async function uploadProductImages(slug: string, files: File[]) {
  const uploads = await Promise.all(files.map((file) => uploadProductImage(slug, file)));
  return uploads;
}

function buildProductPayload(
  formData: FormData,
  uploadedImages: string[],
  existingId?: string,
): ProductInsert {
  const name = getRequiredString(formData, "name");
  const slugInput = getOptionalString(formData, "slug");
  const slug = slugify(slugInput || name);
  const category = getRequiredString(formData, "category");
  const categorySlug = slugify(category);
  const tags = normalizeImages([...parseList(formData.get("tags")), category, categorySlug]);
  const imageUrls = parseList(formData.get("image_urls"));
  const images = normalizeImages([...imageUrls, ...uploadedImages]);

  if (images.length === 0) {
    throw new Error("At least one product image is required.");
  }

  return {
    id: existingId || randomUUID(),
    slug,
    name,
    category,
    category_slug: categorySlug,
    description: getRequiredString(formData, "description"),
    material: getRequiredString(formData, "material"),
    dimensions: getRequiredString(formData, "dimensions"),
    featured: getBoolean(formData, "featured"),
    images,
    folder: slugify(getOptionalString(formData, "folder") || category),
    style: getRequiredString(formData, "style"),
    price: getOptionalNumber(formData, "price"),
    tags,
    whatsapp_number: getRequiredString(formData, "whatsapp_number"),
  };
}

export async function getAdminProducts() {
  return getProducts();
}

export async function getAdminInquiries(limit = 50): Promise<InquiryRow[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select(inquirySelect)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Unable to load inquiries: ${error.message}`);
  }

  return data ?? [];
}

export async function getAdminProductById(id: string): Promise<ProductRow | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load product: ${error.message}`);
  }

  return data;
}

export async function saveAdminProduct(formData: FormData) {
  const id = getOptionalString(formData, "id");
  const existingImageUrls = parseList(formData.get("existing_image_urls"));
  const files = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File && value.size > 0);
  const slugInput = getOptionalString(formData, "slug");
  const name = getRequiredString(formData, "name");
  const slug = slugify(slugInput || name);

  const uploadedImages = files.length > 0 ? await uploadProductImages(slug, files) : [];

  const fd = new FormData();
  for (const [key, value] of formData) {
    if (key !== "images" && key !== "existing_image_urls") {
      fd.append(key, value);
    }
  }

  const payload = buildProductPayload(fd, uploadedImages, id || undefined);

  const combinedImages = normalizeImages([...existingImageUrls, ...uploadedImages]);
  if (combinedImages.length === 0) {
    throw new Error("At least one product image is required.");
  }

  const supabase = getSupabaseClient();
  const record = {
    ...payload,
    images: combinedImages,
  };

  if (id) {
    const { error } = await supabase.from("products").update(record).eq("id", id);
    if (error) {
      throw new Error(`Unable to update product: ${error.message}`);
    }
  } else {
    const { error } = await supabase.from("products").insert(record);
    if (error) {
      throw new Error(`Unable to add product: ${error.message}`);
    }
  }

  return { slug };
}

export async function deleteAdminProduct(id: string) {
  const product = await getAdminProductById(id);
  if (!product) {
    throw new Error("Product not found.");
  }

  const storagePaths = normalizeImages(
    product.images.map(parsePublicStoragePath).filter(Boolean) as string[],
  );

  if (storagePaths.length > 0) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.storage.from(productImageBucket).remove(storagePaths);
    if (error) {
      throw new Error(`Unable to remove product images: ${error.message}`);
    }
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(`Unable to delete product: ${error.message}`);
  }

  return product.slug;
}
