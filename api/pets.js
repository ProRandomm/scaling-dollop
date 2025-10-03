export default function handler(req, res) {
  if (req.method === 'POST') {
    // Save the incoming data into memory or a DB
    global.petData = req.body;
    return res.status(200).json({ ok: true });
  }
  if (req.method === 'GET') {
    // Serve latest data to your HTML frontend
    return res.status(200).json(global.petData || {});
  }
}
