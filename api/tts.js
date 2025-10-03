// api/tts.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // ⚡ Fake form request to ttsmp3.com
    const response = await fetch("https://ttsmp3.com/makemp3_new.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        msg: text,
        lang: "Joanna", // pick a female voice like Joanna, Ivy, etc.
        source: "ttsmp3"
      })
    });

    const data = await response.json();

    if (data.URL) {
      res.status(200).json({ url: data.URL });
    } else {
      res.status(500).json({ error: "TTS failed", raw: data });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
