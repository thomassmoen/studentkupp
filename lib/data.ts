import { supabase } from "./supabase";
import type { Category, Deal } from "./types";

function mapDeal(row: any): Deal {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    brand: row.brand,
    brandColor: row.brand_color,
    logoUrl: row.logo_url,
    category: row.category,
    discount: row.discount,
    description: row.description,
    terms: row.terms,
    featured: row.featured,
    expires: row.expires,
    code: row.code,
    websiteUrl: row.website_url,
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from("categories").select("*");
  return data ?? [];
}

export async function getDeals(): Promise<Deal[]> {
  const { data } = await supabase.from("deals").select("*");
  return (data ?? []).map(mapDeal);
}

export async function getDealBySlug(slug: string): Promise<Deal | undefined> {
  const { data } = await supabase
    .from("deals")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data ? mapDeal(data) : undefined;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data ?? undefined;
}

export async function getDealsByCategory(slug: string): Promise<Deal[]> {
  const { data } = await supabase
    .from("deals")
    .select("*")
    .eq("category", slug);
  return (data ?? []).map(mapDeal);
}

export async function getFeaturedDeals(): Promise<Deal[]> {
  const { data } = await supabase
    .from("deals")
    .select("*")
    .eq("featured", true);
  return (data ?? []).map(mapDeal);
}
