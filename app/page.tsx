import { getCategories, getDeals } from "@/lib/data";
import DealCarousel from "@/components/DealCarousel";

export const revalidate = 60;

function sortNewestFirst(deals: Awaited<ReturnType<typeof getDeals>>) {
  return [...deals].sort((a, b) => {
    const numA = parseInt(a.id.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.id.replace(/\D/g, ""), 10) || 0;
    return numB - numA;
  });
}

export default async function Home() {
  const [categories, deals] = await Promise.all([
    getCategories(),
    getDeals(),
  ]);

  const newest = sortNewestFirst(deals).slice(0, 12);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-100">
            For studenter i Norge
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Rabatter, tips og fordeler for studenter
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Vi samler de beste studentrabattene fra kjente leverandører — helt
            gratis, ingen medlemskap nødvendig.
          </p>

          <form
            action="/sok"
            className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full bg-white p-2 shadow-lg"
          >
            <input
              type="text"
              name="q"
              placeholder="Søk etter merke eller kategori..."
              className="w-full rounded-full px-4 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Søk
            </button>
          </form>
        </div>
      </section>

      <div className="pb-10 pt-4">
        <DealCarousel title="Nye studentrabatter" emoji="🆕" deals={newest} />

        {categories.map((c) => {
          const categoryDeals = deals.filter((d) => d.category === c.slug);
          return (
            <DealCarousel
              key={c.slug}
              title={c.name}
              emoji={c.emoji}
              deals={categoryDeals}
              viewAllHref={`/kategori/${c.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
}
