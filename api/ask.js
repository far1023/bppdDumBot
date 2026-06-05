const WEBHOOK_URL = "https://n8n-tq7lebytvmnn.arman.sumopod.my.id/webhook/ask-for";

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(502).json({ error: "Bad Gateway" });
  }
};
