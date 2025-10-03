let latestPets = [];
let lastLeft = false;

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Expire old pets (older than 10s)
  const now = Date.now();
  latestPets = latestPets.filter(p => now - p.timestamp < 10000);

  if (req.method === "POST") {
    try {
      const body = req.body;

      if (body && Array.isArray(body.pets)) {
        if (body.pets.length === 0) {
          // ✅ Clear pets and mark "player left"
          latestPets = [];
          lastLeft = true;
          console.log("🗑️ Pets cleared, player left");
        } else {
          // ✅ Replace pets with new ones
          latestPets = body.pets.map(p => ({
            name: p.name,
            count: p.count,
            image: p.image,
            timestamp: now
          }));
          lastLeft = false; // reset flag since pets exist
          console.log("✅ Pets updated:", latestPets.map(p => p.name));
        }
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("❌ Invalid JSON", err);
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({
      pets: latestPets,
      left: lastLeft && latestPets.length === 0 // only true if last clear was a leave
    });
  }

  res.status(405).end();
}
