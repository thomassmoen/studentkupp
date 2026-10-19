import type { MetadataRoute } from "next";
import { getCategories, getDeals } from "@/lib/data";

const BASE_URL = "https://studentkupp.no";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, deals] = await Promise.all([getCategories(), getDeals()]);

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categories.map((c) => ({
      url: `${BASE_URL}/kategori/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...deals.map((d) => ({
      url: `${BASE_URL}/tilbud/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.5,
    })),
  ];
}
