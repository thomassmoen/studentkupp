import Link from "next/link";
import { getCategories } from "@/lib/data";

export default async function Footer() {
  const categories = await getCategories();
  return (
    <footer className="border-t border-black/5 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500 text-base">
              🎓
            </span>
            <span className="text-base font-bold text-slate-900">
              Studentkupp.no
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-500">
            Rabatter og studentfordeler fra kjente leverandører, samlet på ett
            sted for norske studenter.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Kategorier</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/kategori/${c.slug}`}
                  className="hover:text-indigo-600"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Om oss</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>Om Studentkupp.no</li>
            <li>Kontakt oss</li>
            <li>For leverandører</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/5 px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
        © {new Date().getFullYear()} Studentkupp.no — Alle rettigheter
        reservert.
      </div>
    </footer>
  );
}
