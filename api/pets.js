export default function handler(req, res) {
  if (req.method === "POST") {
    // Roblox sends pet sightings here
    const body = req.body;

    // Save to memory (works only while serverless fn is alive)
    // Better: connect to database like Supabase or Firebase
    global.pets = global.pets || [];
    global.pets.push({
      ...body,
      timestamp: Date.now()
    });

    return res.status(200).json({ success: true, msg: "Pet logged" });
  }

  if (req.method === "GET") {
    // Website requests the sightings
    return res.status(200).json(global.pets || []);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
