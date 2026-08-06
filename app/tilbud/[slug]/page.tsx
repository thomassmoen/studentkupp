import { notFound } from "next/navigation";
import Link from "next/link";
import { getDeals, getCategoryBySlug, getDealBySlug } from "@/lib/data";

export async function generateStaticParams() {
  const deals = await getDeals();
  return deals.map((d) => ({ slug: d.slug }));
}

export default async function DealPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deal = await getDealBySlug(slug);
  if (!deal) notFound();

  const category = await getCategoryBySlug(deal.category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      {category && (
        <Link
          href={`/kategori/${category.slug}`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          ← {category.name}
        </Link>
      )}

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div
            className={`grid h-16 w-16 place-items-center rounded-2xl text-lg font-bold text-white ${deal.brandColor}`}
          >
            {deal.brand.slice(0, 2).toUpperCase()}
          </div>
          <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
            {deal.discount}
          </span>
        </div>

        <p className="mt-6 text-sm font-medium uppercase tracking-wide text-slate-400">
          {deal.brand}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          {deal.title}
        </h1>
        <p className="mt-4 text-slate-600">{deal.description}</p>

        <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          <p className="font-semibold text-slate-700">Vilkår</p>
          <p className="mt-1">{deal.terms}</p>
          <p className="mt-2">Gyldig til: {deal.expires}</p>
        </div>

        <button className="mt-8 w-full rounded-full bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700">
          Hent tilbud
        </button>
      </div>
    </div>
  );
}
