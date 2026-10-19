import { getCategories, getDeals, getFeaturedDeals } from "@/lib/data";
import CategoryCard from "@/components/CategoryCard";
import DealCard from "@/components/DealCard";

export const revalidate = 60;

export default async function Home() {
  const [categories, deals, featured] = await Promise.all([
    getCategories(),
    getDeals(),
    getFeaturedDeals(),
  ]);

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

      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">Populære tilbud</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">Alle tilbud</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {deals.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">Kategorier</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
