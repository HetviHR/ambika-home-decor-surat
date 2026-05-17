import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";

const routes = ["", "/collection", "/gallery", "/about", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ambikahomedecor.in";
  const now = new Date();
  const products = await getProducts();

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/collection/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}
