export default async function handler(req, res) {
  if (req.method !== "POST") 
    return res.status(405).json({ error: "This Method Is Not Allowed!" })
  let body = {}
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString()
  try { body = JSON.parse(raw) } catch { body = {} }
  const u = body.userid || "0"
  const m = body.message || ""
  const e = body.executor || "Spoofed Or Skidded Or Unknown"
  const s = body.script || "Sp00fed" 
  const clean = m.replace(/@everyone|@here/g, "").replace(/<@&?\d+>/g, "[mention]")
  const webhook = process.env.FEEDBACK_HOOK
  if (!webhook) return res.status(500).json({ error: "No WebHook" })
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        content: "<@1138813124946956298>",
        embeds: [
          {
            title: `Someone Suggested An New Feature Or Sent An FeedBack`,
            description: clean,
            fields: [
                { name: "Their UserID (Used To Ban Them)", value: String(u), inline: false },
                { name: "Their Executor (Used To Know Bugs Better)", value: String(e), inline: false },
                { name: "Which Script Was Used", value: String(s), inline: false }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      })
    })
  } catch (err) {
    console.error("Error: ", err)
  }
  return res.status(200).json({ ok: true })
}
