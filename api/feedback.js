export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Only POST Requests Allowed!")

  let body = {}
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString()
  try { body = JSON.parse(raw) } catch { body = {} }

  const userid = body.userid || "0"
  const message = body.message || ""
  const clean = message.replace(/@everyone|@here/g, "").replace(/<@&?\d+>/g, "[mention]")

  const webhook = process.env.FEEDBACK_HOOK
  if (!webhook) return res.status(500).json({ error: "no webhook" })

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        content: "<@1138813124946956298>",
        embeds: [
          {
            title: "somebody suggested a new features or ui changes",
            description: clean,
            fields: [{ name: "their userid (used to ban them)", value: String(userid), inline: false }],
            timestamp: new Date().toISOString()
          }
        ]
      })
    })
  } catch (err) {
    console.error("webhook error", err)
  }

  return res.status(200).json({ ok: true })
}
