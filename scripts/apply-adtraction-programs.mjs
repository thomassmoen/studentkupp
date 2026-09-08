const token = process.env.ADTRACTION_API_TOKEN;
const channelId = process.env.ADTRACTION_CHANNEL_ID;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function applyToProgram(programId) {
  const url = `https://api.adtraction.net/v2/partner/applications/?token=${token}&channelId=${channelId}&programId=${programId}`;
  while (true) {
    const r = await fetch(url, { method: "PUT" });
    if (r.status === 429) {
      const data = await r.json();
      const waitMs = Math.max(data.resetTime ?? data.reset ?? 0
        ? (data.resetTime ?? data.reset) - Date.now()
        : 15000, 1000);
      await sleep(waitMs + 500);
      continue;
    }
    const data = await r.json();
    return { ok: r.ok, status: r.status, data };
  }
}

async function main() {
  const [progRes, appRes] = await Promise.all([
    fetch(
      `https://api.adtraction.net/v2/partner/programs/?market=NO&channelId=${channelId}&token=${token}`
    ),
    fetch(
      `https://api.adtraction.net/v2/partner/applications/?channelId=${channelId}&token=${token}`
    ),
  ]);
  const programs = await progRes.json();
  const apps = await appRes.json();
  const appliedIds = new Set(apps.map((a) => a.programId));
  const needsApplication = programs.filter(
    (p) => p.pendingActive === true && !appliedIds.has(p.programId)
  );

  console.log(`Applying to ${needsApplication.length} programs...`);

  let approved = 0;
  let pending = 0;
  let failed = 0;
  let count = 0;

  for (const p of needsApplication) {
    count++;
    try {
      const result = await applyToProgram(p.programId);
      if (!result.ok) {
        failed++;
        console.log("FAIL", p.programName, result.status, JSON.stringify(result.data));
      } else if (result.data.status === 1) {
        approved++;
      } else {
        pending++;
      }
    } catch (e) {
      failed++;
      console.log("ERR", p.programName, e.message);
    }
    // 10 requests per window observed -> pace at ~1 req/sec to stay safe
    await sleep(1000);
    if (count % 20 === 0) {
      console.log(`...${count}/${needsApplication.length} processed`);
    }
  }

  console.log(
    `Done. Instantly approved: ${approved}, pending review: ${pending}, failed: ${failed}, total: ${needsApplication.length}`
  );
}

main();
