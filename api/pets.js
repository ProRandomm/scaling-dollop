let snapshot = {
  pets: [],
  joinLink: "",
  placeId: null,
  jobId: null,
  players: { current: 0, max: 0 },
  updatedAt: 0
};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    try {
      const b = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const pets = Array.isArray(b.pets) ? b.pets : [];
      const joinLink = typeof b.joinLink === "string" ? b.joinLink : "";
      const placeId = b.placeId || null;
      const jobId = b.jobId || null;
      const players = b.players && typeof b.players === "object" ? b.players : { current: 0, max: 0 };
      snapshot = {
        pets: pets.map(p => ({
          name: String(p.name || ""),
          count: Number(p.count || 0),
          image: String(p.image || "")
        })),
        joinLink,
        placeId,
        jobId,
        players: { current: Number(players.current || 0), max: Number(players.max || 0) },
        updatedAt: Date.now()
      };
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(snapshot);
  }

  res.status(405).end();
}
