import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADTRACTION_TOKEN = process.env.ADTRACTION_API_TOKEN;
const ADTRACTION_CHANNEL_ID = process.env.ADTRACTION_CHANNEL_ID;
const FALLBACK_CATEGORY = "annet";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(dateStr) {
  if (!dateStr) return "Ingen utløpsdato";
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${d.getFullYear()}`;
}

function stripMarketSuffix(name) {
  return name.replace(/\s+NO$/, "");
}

async function ensureFallbackCategory() {
  const { error } = await supabase.from("categories").upsert(
    {
      slug: FALLBACK_CATEGORY,
      name: "Andre tilbud",
      emoji: "🎁",
      color: "from-gray-500 to-slate-400",
    },
    { onConflict: "slug" }
  );
  if (error) throw error;
}

async function fetchOffers() {
  const res = await fetch(
    `https://api.adtraction.net/v2/partner/offers/?token=${ADTRACTION_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        market: "NO",
        channelId: Number(ADTRACTION_CHANNEL_ID),
      }),
    }
  );
  if (!res.ok) throw new Error(`Adtraction API error: ${res.status}`);
  return res.json();
}

function extractDiscountLabel(offer) {
  const text = `${offer.offerDescription || ""} ${offer.offerTerms || ""}`;

  const percentMatch = text.match(/\d{1,3}\s?%/);
  if (percentMatch) return percentMatch[0].replace(/\s+/, "");

  const forMatch = text.match(/(\d+)\s*(?:for|på)\s*(\d+)/i);
  if (forMatch) return `${forMatch[1]} for ${forMatch[2]}`;

  const amountMatch = text.match(/\d+\s?(?:kr|nok|€|\$)/i);
  if (amountMatch) return amountMatch[0];

  if (/gratis frakt|free shipping|frifrakt/i.test(text)) return "Gratis frakt";

  return "Rabatt";
}

function mapOfferToDeal(offer) {
  const brand = stripMarketSuffix(offer.programName);
  const slug = slugify(`${brand}-${offer.offerId}`);
  return {
    id: `at-${offer.offerId}`,
    slug,
    title: offer.offerDescription,
    brand,
    brand_color: "bg-slate-700",
    logo_url: offer.logoURL,
    category: FALLBACK_CATEGORY,
    discount: extractDiscountLabel(offer),
    description: `Hos ${brand}: ${offer.offerDescription}`,
    terms: offer.offerTerms || "Se vilkår hos butikken.",
    featured: false,
    expires: formatDate(offer.validTo),
    code: offer.offerCoupon,
    website_url: offer.trackingURL,
  };
}

async function main() {
  await ensureFallbackCategory();

  const offers = await fetchOffers();

  // Only sync offers with a working tracking link — offers for programs
  // that aren't approved yet come back without one and can't be monetized.
  const trackable = offers.filter((o) => o.market === "NO" && o.trackingURL);

  console.log(`Found ${trackable.length} trackable Norway offers.`);

  const deals = trackable.map(mapOfferToDeal);

  // Remove previously synced Adtraction deals that no longer qualify
  const { error: deleteError } = await supabase
    .from("deals")
    .delete()
    .like("id", "at-%");
  if (deleteError) throw deleteError;

  const { error } = await supabase
    .from("deals")
    .upsert(deals, { onConflict: "slug" });

  if (error) throw error;

  console.log(`Synced ${deals.length} deals into Supabase.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
