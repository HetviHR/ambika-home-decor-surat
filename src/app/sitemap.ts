import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const routes = ["", "/collection", "/gallery", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ambikahomedecor.in";
  const now = new Date();

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
