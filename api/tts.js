export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      text
    )}&tl=en&client=tw-ob`;

    // Fetch from Google TTS
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    // Set audio headers so browser can play
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS failed" });
  }
}
