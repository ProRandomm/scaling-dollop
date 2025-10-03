// /api/pets.js
// Snapshot-style API: every POST replaces current pets; POST with [] clears.
// GET returns { pets, updatedAt }.

let latestPets = [];
let updatedAt = 0;

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "POST") {
      const body = req.body;

      if (!body || !Array.isArray(body.pets)) {
        return res.status(400).json({ error: "Body must be { pets: [] }" });
      }

      // Replace snapshot (can be empty to clear)
      const now = Date.now();
      latestPets = body.pets.map((p) => ({
        name: String(p.name || "").trim(),
        count: Number.isFinite(p.count) ? p.count : 1,
        image: String(p.image || ""),
      }));
      updatedAt = now;

      console.log(
        latestPets.length
          ? `✅ Snapshot updated: ${latestPets.map((p) => p.name).join(", ")}`
          : "🗑️ Snapshot cleared (no pets)"
      );

      return res.status(200).json({ ok: true, pets: latestPets, updatedAt });
    }

    if (req.method === "GET") {
      return res.status(200).json({ pets: latestPets, updatedAt });
    }

    return res.status(405).end();
  } catch (err) {
    console.error("❌ pets.js error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
