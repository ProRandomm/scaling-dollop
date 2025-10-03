export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    // Use Google Translate TTS (free, no key required)
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      text
    )}&tl=en&client=tw-ob`;

    // Return JSON with the playable URL
    res.status(200).json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS failed" });
  }
}
