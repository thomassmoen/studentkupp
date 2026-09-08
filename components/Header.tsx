import Link from "next/link";
import { getCategories } from "@/lib/data";

export default async function Header() {
  const categories = await getCategories();
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 text-lg">
            🎓
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Studentkupp<span className="text-indigo-600">.no</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              className="transition-colors hover:text-indigo-600"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
