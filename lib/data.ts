import type { Category, Deal } from "./types";

export const categories: Category[] = [
  {
    slug: "elektronikk",
    name: "Elektronikk",
    emoji: "💻",
    color: "from-blue-500 to-cyan-400",
  },
  {
    slug: "mote",
    name: "Mote",
    emoji: "👕",
    color: "from-pink-500 to-rose-400",
  },
  {
    slug: "mat-og-drikke",
    name: "Mat & Drikke",
    emoji: "🍔",
    color: "from-orange-500 to-amber-400",
  },
  {
    slug: "reise",
    name: "Reise",
    emoji: "✈️",
    color: "from-sky-500 to-indigo-400",
  },
  {
    slug: "underholdning",
    name: "Underholdning",
    emoji: "🎬",
    color: "from-purple-500 to-fuchsia-400",
  },
  {
    slug: "helse-og-trening",
    name: "Helse & Trening",
    emoji: "💪",
    color: "from-emerald-500 to-teal-400",
  },
];

export const deals: Deal[] = [
  {
    id: "1",
    slug: "apple-studentrabatt",
    title: "Studentrabatt på Mac og iPad",
    brand: "Apple",
    brandColor: "bg-slate-800",
    category: "elektronikk",
    discount: "Opptil 10%",
    description:
      "Få studentrabatt på Mac og iPad, samt gratis AirPods ved kjøp av utvalgte modeller.",
    terms: "Krever gyldig studentbevis. Gjelder ikke sammen med andre kampanjer.",
    featured: true,
    expires: "31.12.2026",
  },
  {
    id: "2",
    slug: "samsung-student-deal",
    title: "15% rabatt på Galaxy-serien",
    brand: "Samsung",
    brandColor: "bg-blue-900",
    category: "elektronikk",
    discount: "15%",
    description:
      "Studenter får 15% rabatt på nye Galaxy-telefoner, tabletter og bærbare PC-er.",
    terms: "Gjelder i Samsungs nettbutikk. Verifisering av studentstatus kreves.",
    featured: true,
    expires: "30.09.2026",
  },
  {
    id: "3",
    slug: "asos-studentrabatt",
    title: "20% rabatt på hele sortimentet",
    brand: "ASOS",
    brandColor: "bg-black",
    category: "mote",
    discount: "20%",
    description: "Studenter får 20% rabatt på alt hos ASOS, hele året.",
    terms: "Rabattkode kreves i kassen. Gjelder ikke gavekort.",
    featured: true,
    expires: "31.12.2026",
  },
  {
    id: "4",
    slug: "zalando-studentkort",
    title: "10% rabatt hver måned",
    brand: "Zalando",
    brandColor: "bg-orange-600",
    category: "mote",
    discount: "10%",
    description:
      "Få 10% studentrabatt hos Zalando på klær, sko og accessories hver måned.",
    terms: "Krever registrering med studentmail.",
    expires: "31.12.2026",
  },
  {
    id: "5",
    slug: "foodora-student",
    title: "Gratis levering i 3 måneder",
    brand: "Foodora",
    brandColor: "bg-pink-600",
    category: "mat-og-drikke",
    discount: "Gratis frakt",
    description:
      "Studenter får gratis levering på alle bestillinger over 200 kr i 3 måneder.",
    terms: "Gjelder nye Foodora-kunder med studentbevis.",
    featured: true,
    expires: "30.11.2026",
  },
  {
    id: "6",
    slug: "meny-student-rabatt",
    title: "5% rabatt på ukens varer",
    brand: "MENY",
    brandColor: "bg-red-700",
    category: "mat-og-drikke",
    discount: "5%",
    description: "5% studentrabatt på dagligvarer hver onsdag.",
    terms: "Gjelder i deltakende MENY-butikker mot studentbevis.",
    expires: "31.12.2026",
  },
  {
    id: "7",
    slug: "sas-student-fly",
    title: "Studentrabatt på flybilletter",
    brand: "SAS",
    brandColor: "bg-blue-700",
    category: "reise",
    discount: "Opptil 15%",
    description:
      "Book flybilletter med opptil 15% studentrabatt til over 100 destinasjoner.",
    terms: "Krever SAS Youth-medlemskap og gyldig studentbevis.",
    featured: true,
    expires: "31.12.2026",
  },
  {
    id: "8",
    slug: "nsb-vy-student",
    title: "40% rabatt på togbilletter",
    brand: "Vy",
    brandColor: "bg-green-700",
    category: "reise",
    discount: "40%",
    description: "Reis billigere med tog med 40% studentrabatt hos Vy.",
    terms: "Krever Vy Ung-medlemskap (under 30 år).",
    expires: "31.12.2026",
  },
  {
    id: "9",
    slug: "spotify-student",
    title: "Spotify Premium til halv pris",
    brand: "Spotify",
    brandColor: "bg-green-600",
    category: "underholdning",
    discount: "50%",
    description:
      "Få Spotify Premium og Netflix (annonsestøttet) i én pakke til halv pris.",
    terms: "Krever verifisering via SheerID. Fornyes automatisk.",
    featured: true,
    expires: "31.12.2026",
  },
  {
    id: "10",
    slug: "nordisk-film-kino",
    title: "30% rabatt på kinobilletter",
    brand: "Nordisk Film Kino",
    brandColor: "bg-red-900",
    category: "underholdning",
    discount: "30%",
    description: "Studenter får 30% rabatt på ordinære kinobilletter alle dager.",
    terms: "Gjelder ved kjøp i kinoen mot gyldig studentbevis.",
    expires: "31.12.2026",
  },
  {
    id: "11",
    slug: "sats-student-medlemskap",
    title: "Studentmedlemskap fra 299 kr/mnd",
    brand: "SATS",
    brandColor: "bg-teal-700",
    category: "helse-og-trening",
    discount: "Opptil 30%",
    description: "Tren på alle SATS-sentre med rabattert studentmedlemskap.",
    terms: "Krever gyldig studentbevis ved oppstart av medlemskap.",
    featured: true,
    expires: "31.12.2026",
  },
  {
    id: "12",
    slug: "adobe-creative-cloud",
    title: "Adobe Creative Cloud til 60% rabatt",
    brand: "Adobe",
    brandColor: "bg-red-600",
    category: "elektronikk",
    discount: "60%",
    description:
      "Få tilgang til hele Adobe Creative Cloud-pakken med stor studentrabatt.",
    terms: "Krever verifisering av studieplass ved en godkjent utdanningsinstitusjon.",
    expires: "31.12.2026",
  },
];

export function getDealBySlug(slug: string): Deal | undefined {
  return deals.find((d) => d.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getDealsByCategory(slug: string): Deal[] {
  return deals.filter((d) => d.category === slug);
}

export function getFeaturedDeals(): Deal[] {
  return deals.filter((d) => d.featured);
}
