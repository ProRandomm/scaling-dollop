// /api/pets.js
export default function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Example pet data – replace with dynamic if needed
  const pets = [
    { name: "Graipuss Medussi", count: 1 },
    { name: "La Grande Combinasion", count: 2 },
    { name: "Chillin Chili", count: 3 }
  ];

  // ✅ Return JSON
  res.status(200).json({ pets });
}
