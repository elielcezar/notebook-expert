import type { MetadataRoute } from "next";
import { getAllPostSlugs, getAllSeminovoSlugs } from "@/lib/wordpress";

const BASE_URL = "https://notebookexpert.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/servicos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/franquia`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/para-empresas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compra-venda`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/dicas`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const [postSlugs, seminovoSlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllSeminovoSlugs(),
  ]);

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${BASE_URL}/dicas/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const seminovoRoutes: MetadataRoute.Sitemap = seminovoSlugs.map((slug) => ({
    url: `${BASE_URL}/compra-venda/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...seminovoRoutes];
}
