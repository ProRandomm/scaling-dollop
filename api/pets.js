let latestPets = [];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    try {
      const body = req.body;
      if (body && body.pets) {
        latestPets = body.pets;
        console.log("✅ Updated pets:", latestPets);
      }
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({ pets: latestPets });
  }

  res.status(405).end();
}
