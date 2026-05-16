import type { MetadataRoute } from "next";

const routes = ["", "/collection", "/gallery", "/about", "/contact", "/admin/dashboard"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ambikahomedecor.in";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
