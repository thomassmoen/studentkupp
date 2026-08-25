import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADDREVENUE_TOKEN = process.env.ADDREVENUE_API_TOKEN;
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
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
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

async function fetchCampaigns() {
  const res = await fetch("https://addrevenue.io/api/v2/campaigns", {
    headers: {
      Authorization: `Bearer ${ADDREVENUE_TOKEN}`,
      "Content-type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Addrevenue API error: ${res.status}`);
  const data = await res.json();
  return data.results ?? [];
}

function mapCampaignToDeal(campaign) {
  const slug = slugify(`${campaign.advertiserName}-${campaign.id}`);
  return {
    id: `ar-${campaign.id}`,
    slug,
    title: campaign.description,
    brand: campaign.advertiserName,
    brand_color: "bg-slate-700",
    category: FALLBACK_CATEGORY,
    discount: campaign.discountCode,
    description: `Hos ${campaign.advertiserName}: ${campaign.description}`,
    terms: campaign.terms || "Se vilkår hos butikken.",
    featured: false,
    expires: formatDate(campaign.validTo),
    code: campaign.discountCode,
    website_url: campaign.url || campaign.advertiserUrl,
  };
}

function isNorwayFocused(campaign) {
  const domain = (campaign.advertiserUrl || "").toLowerCase();
  const isNoDomain = domain.includes(".no/") || domain.endsWith(".no");
  const isNarrowMarket = (campaign.markets?.length ?? 0) <= 5;
  return isNoDomain || isNarrowMarket;
}

async function main() {
  await ensureFallbackCategory();

  const campaigns = await fetchCampaigns();
  const norwegian = campaigns.filter(
    (c) =>
      c.markets?.includes("NO") &&
      c.status === "active" &&
      c.type === "coupon" &&
      c.discountCode &&
      isNorwayFocused(c)
  );

  console.log(`Found ${norwegian.length} genuinely Norway-focused coupons.`);

  const deals = norwegian.map(mapCampaignToDeal);

  // Remove previously synced Addrevenue deals that no longer qualify
  const { error: deleteError } = await supabase
    .from("deals")
    .delete()
    .like("id", "ar-%");
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
