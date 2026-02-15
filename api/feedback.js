export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!process.env.FEEDBACK_HOOK) return res.status(500).end();
  await fetch(process.env.FEEDBACK_HOOK, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      content: "<@1138813124946956298>",
      embeds: [
        {
          title: "Someone Suggested A New Feature Or Sent An FeedBack",
          description: (req.body?.message || "").replace(/@everyone|@here/g, "").replace(/<@&?\d+>/g, "[mention]"),
          fields: [
            { name: "Which Executor Was Used:", value: String(req.body?.executor || "Spoofed"), inline: false },
            { name: "Which Script Was Used:", value: String(req.body?.script || "Spoofed"), inline: false }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    })
  });
  res.end();
}
