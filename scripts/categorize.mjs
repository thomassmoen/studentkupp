const RULES = [
  {
    slug: "elektronikk",
    keywords: [
      "elektronikk", "data", "laptop", "pc", "mobil", "telefon", "iphone",
      "samsung", "apple", "sony", "lg", "asus", "lenovo", "hp", "dell",
      "kamera", "hodetelefon", "høyttaler", "gaming", "spillkonsoll",
      "playstation", "xbox", "nintendo", "tv", "skjerm", "smartklokke",
      "adobe", "software", "programvare", "teknologi", "tech", "dyson",
      "black+decker", "black & decker", "verktøy", "drill",
    ],
  },
  {
    slug: "mote",
    keywords: [
      "klær", "klaer", "mote", "sko", "jakke", "bukse", "kjole", "skjorte",
      "genser", "smykke", "veske", "accessoir", "fashion", "tøy", "toy",
      "zalando", "asos", "nelly", "boozt", "h&m", "nike", "adidas",
      "undertøy", "undertoy", "collection",
    ],
  },
  {
    slug: "mat-og-drikke",
    keywords: [
      "mat", "drikke", "restaurant", "meny", "dagligvare", "kaffe", "food",
      "snack", "dessert", "matbutikk", "foodora", "wolt", "kokk", "oppskrift",
      "vin", "øl", "ol", "måltid", "maaltid", "middag", "bakeri", "knife",
      "kniv", "kjøkken", "kjokken", "global",
    ],
  },
  {
    slug: "reise",
    keywords: [
      "reise", "fly", "hotell", "tog", "buss", "leiebil", "ferie", "travel",
      "feriereise", "flybillett", "sas", "norwegian", "vy", "booking",
      "hostel", "cruise", "resort", "flyreise",
    ],
  },
  {
    slug: "underholdning",
    keywords: [
      "film", "serie", "musikk", "spotify", "netflix", "kino", "bok",
      "bøker", "boker", "spill", "streaming", "konsert", "podcast",
      "storytel", "audiobok", "hbo", "disney", "viaplay", "tv4", "anytime",
    ],
  },
  {
    slug: "helse-og-trening",
    keywords: [
      "trening", "sport", "helse", "kosthold", "vitamin", "treningssenter",
      "yoga", "protein", "sats", "fitness", "løp", "lop", "sykkel",
      "skin", "hud", "hudpleie", "skincare", "kropp", "velvære", "velvaere",
    ],
  },
];

export function categorizeDeal(brand, text) {
  const haystack = `${brand} ${text}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) {
      return rule.slug;
    }
  }
  return "annet";
}
