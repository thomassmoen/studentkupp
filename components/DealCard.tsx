import Link from "next/link";
import type { Deal } from "@/lib/types";

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/tilbud/${deal.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        {deal.logoUrl ? (
          <img
            src={deal.logoUrl}
            alt={deal.brand}
            className="h-11 w-11 rounded-xl object-contain bg-white ring-1 ring-slate-100"
          />
        ) : (
          <div
            className={`grid h-11 w-11 place-items-center rounded-xl text-sm font-bold text-white ${deal.brandColor}`}
          >
            {deal.brand.slice(0, 2).toUpperCase()}
          </div>
        )}
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {deal.code ? `Rabattkode ${deal.discount}` : deal.discount}
        </span>
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
        {deal.brand}
      </p>
      <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-indigo-600">
        {deal.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
        {deal.description}
      </p>
    </Link>
  );
}
