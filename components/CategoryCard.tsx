import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/kategori/${category.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-5 text-white shadow-sm transition-transform hover:-translate-y-0.5`}
    >
      <span className="text-3xl">{category.emoji}</span>
      <span className="mt-6 text-base font-semibold">{category.name}</span>
    </Link>
  );
}
