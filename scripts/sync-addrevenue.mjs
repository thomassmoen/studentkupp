import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADDREVENUE_TOKEN = process.env.ADDREVENUE_API_TOKEN;
const ADDREVENUE_CHANNEL_ID = process.env.ADDREVENUE_CHANNEL_ID;
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
  const url = `https://addrevenue.io/api/v2/campaigns?channelId=${ADDREVENUE_CHANNEL_ID}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ADDREVENUE_TOKEN}`,
      "Content-type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Addrevenue API error: ${res.status}`);
  const data = await res.json();
  return data.results ?? [];
}

async function fetchAdvertiserLogos() {
  const res = await fetch("https://addrevenue.io/api/v2/advertisers", {
    headers: {
      Authorization: `Bearer ${ADDREVENUE_TOKEN}`,
      "Content-type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Addrevenue API error: ${res.status}`);
  const data = await res.json();
  const advertisers = data.results ?? data ?? [];
  const logos = {};
  for (const a of advertisers) {
    if (a.logoImageFilename) logos[a.id] = a.logoImageFilename;
  }
  return logos;
}

function extractDiscountLabel(campaign) {
  const text = `${campaign.description || ""} ${campaign.terms || ""}`;

  const percentMatch = text.match(/\d{1,3}\s?%/);
  if (percentMatch) return percentMatch[0].replace(/\s+/, "");

  const forMatch = text.match(/(\d+)\s*(?:for|på)\s*(\d+)/i);
  if (forMatch) return `${forMatch[1]} for ${forMatch[2]}`;

  const amountMatch = text.match(/\d+\s?(?:kr|nok|€|\$)/i);
  if (amountMatch) return amountMatch[0];

  if (/gratis frakt|free shipping|frifrakt/i.test(text)) return "Gratis frakt";

  return "Rabatt";
}

function mapCampaignToDeal(campaign, logos) {
  const slug = slugify(`${campaign.advertiserName}-${campaign.id}`);
  return {
    id: `ar-${campaign.id}`,
    slug,
    title: campaign.description,
    brand: campaign.advertiserName,
    brand_color: "bg-slate-700",
    logo_url: logos[campaign.advertiserId],
    category: FALLBACK_CATEGORY,
    discount: extractDiscountLabel(campaign),
    description: `Hos ${campaign.advertiserName}: ${campaign.description}`,
    terms: campaign.terms || "Se vilkår hos butikken.",
    featured: false,
    expires: formatDate(campaign.validTo),
    code: campaign.discountCode,
    website_url: campaign.trackingLink || campaign.url || campaign.advertiserUrl,
  };
}

function isNorwayFocused(campaign) {
  const domain = (campaign.advertiserUrl || "").toLowerCase();
  const isNoDomain = domain.includes(".no/") || domain.endsWith(".no");
  const isNarrowMarket = (campaign.markets?.length ?? 0) <= 5;
  return isNoDomain || isNarrowMarket;
}

function parseLimitArg() {
  const arg = process.argv.find((a) => a.startsWith("--limit="));
  return arg ? parseInt(arg.split("=")[1], 10) : null;
}

async function main() {
  await ensureFallbackCategory();

  const limit = parseLimitArg();

  const [campaigns, logos] = await Promise.all([
    fetchCampaigns(),
    fetchAdvertiserLogos(),
  ]);
  const norwegian = campaigns.filter(
    (c) =>
      c.markets?.includes("NO") &&
      c.status === "active" &&
      c.type === "coupon" &&
      c.discountCode &&
      isNorwayFocused(c)
  );

  console.log(`Found ${norwegian.length} genuinely Norway-focused coupons.`);

  let deals = norwegian.map((c) => mapCampaignToDeal(c, logos));

  if (limit) {
    const { data: existing, error: existingError } = await supabase
      .from("deals")
      .select("id")
      .like("id", "ar-%");
    if (existingError) throw existingError;

    const existingIds = new Set((existing ?? []).map((d) => d.id));
    deals = deals.filter((d) => !existingIds.has(d.id)).slice(0, limit);

    console.log(`Adding ${deals.length} new deals (limit ${limit}, no deletions).`);
  } else {
    // Remove previously synced Addrevenue deals that no longer qualify
    const { error: deleteError } = await supabase
      .from("deals")
      .delete()
      .like("id", "ar-%");
    if (deleteError) throw deleteError;
  }

  if (deals.length === 0) {
    console.log("Nothing to sync.");
    return;
  }

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
