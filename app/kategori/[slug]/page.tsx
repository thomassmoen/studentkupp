import { notFound } from "next/navigation";
import { categories, getCategoryBySlug, getDealsByCategory } from "@/lib/data";
import DealCard from "@/components/DealCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const dealsInCategory = getDealsByCategory(slug);

  return (
    <div>
      <section
        className={`bg-gradient-to-br ${category.color} px-4 py-14 text-center text-white sm:px-6`}
      >
        <span className="text-4xl">{category.emoji}</span>
        <h1 className="mt-3 text-3xl font-bold">{category.name}</h1>
        <p className="mt-2 text-sm text-white/80">
          {dealsInCategory.length} tilbud tilgjengelig
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {dealsInCategory.length === 0 ? (
          <p className="text-slate-500">
            Ingen tilbud i denne kategorien ennå. Kom tilbake senere!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {dealsInCategory.map((d) => (
              <DealCard key={d.id} deal={d} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
