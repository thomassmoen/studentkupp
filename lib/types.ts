export interface Category {
  slug: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Deal {
  id: string;
  slug: string;
  title: string;
  brand: string;
  brandColor: string;
  logoUrl?: string;
  category: string;
  discount: string;
  description: string;
  terms: string;
  featured?: boolean;
  expires: string;
  code?: string;
  websiteUrl?: string;
}
