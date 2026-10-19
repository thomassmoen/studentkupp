import { createClient } from "@supabase/supabase-js";
import { categorizeDeal } from "./categorize.mjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data: deals, error } = await supabase
    .from("deals")
    .select("id,brand,description,terms,category");
  if (error) throw error;

  const counts = {};
  let changed = 0;

  for (const d of deals) {
    const newCategory = categorizeDeal(
      d.brand,
      `${d.description || ""} ${d.terms || ""}`
    );
    counts[newCategory] = (counts[newCategory] || 0) + 1;

    if (newCategory !== d.category) {
      const { error: updateError } = await supabase
        .from("deals")
        .update({ category: newCategory })
        .eq("id", d.id);
      if (updateError) throw updateError;
      changed++;
    }
  }

  console.log("Category counts:", counts);
  console.log(`Updated ${changed} of ${deals.length} deals.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
