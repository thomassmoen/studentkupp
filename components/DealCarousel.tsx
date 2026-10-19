"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Deal } from "@/lib/types";
import DealCard from "./DealCard";

export default function DealCarousel({
  title,
  emoji,
  deals,
  viewAllHref,
}: {
  title: string;
  emoji?: string;
  deals: Deal[];
  viewAllHref?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (deals.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
          {emoji && <span>{emoji}</span>}
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Se alle →
          </Link>
        )}
      </div>

      <div className="relative mt-5">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {deals.map((d) => (
            <div key={d.id} className="w-64 shrink-0">
              <DealCard deal={d} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Forrige"
          onClick={() => scrollBy(-300)}
          className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white p-2 shadow-md hover:bg-slate-50 sm:grid"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Neste"
          onClick={() => scrollBy(300)}
          className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white p-2 shadow-md hover:bg-slate-50 sm:grid"
        >
          →
        </button>
      </div>
    </section>
  );
}
